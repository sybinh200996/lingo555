import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { ai } from '../../services/aiClient';
import { speech } from '../../services/speechService';
import { proSpeech } from '../../utils/proSpeechRecognizer';
import { sounds } from '../../services/soundEffects';
import { audioManager } from '../../utils/audioManager';
import { validateAnswer } from '../../utils/answerValidator';
import { sessionPersistence } from '../../utils/sessionPersistence';
import { HanziCanvas } from './HanziCanvas';
import { TonePitchCanvas } from './TonePitchCanvas';
import { StrokeOrderWriter } from '../writing/StrokeOrderWriter';
import { EnglishSpellingWriter } from '../writing/EnglishSpellingWriter';
import { questTracker } from '../../utils/questTracker';
import { cleanLessonCacheIfOutdated } from '../../utils/cacheSanitizer';
import { shuffleArray, shuffleRightColumn, shuffleWordBank } from '../../utils/shuffleUtils';
import { 
  X, 
  Heart, 
  Volume2, 
  Snail, 
  Mic, 
  MicOff, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Trophy, 
  ArrowRight,
  RotateCcw,
  Bot,
  AlertTriangle,
  Keyboard,
  SkipForward,
  Square,
  BookOpen,
  Lightbulb,
  MessageSquare,
  HelpCircle,
  Award
} from 'lucide-react';

/**
 * Automatic prompt normalizer to ensure proper language terminology:
 * For English: replaces 'Tiếng Trung' -> 'Tiếng Anh', 'chữ Hán' -> 'từ Tiếng Anh', 'Pinyin' -> 'Phiên âm IPA', etc.
 */
export const formatPromptByLanguage = (text, currentLang) => {
  if (!text || typeof text !== 'string') return text || '';
  if (currentLang === 'en' || currentLang === 'english') {
    return text
      .replace(/Tiếng Trung/gi, 'Tiếng Anh')
      .replace(/chữ Hán/gi, 'từ Tiếng Anh')
      .replace(/Hán tự/gi, 'Từ vựng Tiếng Anh')
      .replace(/Pinyin/gi, 'Phiên âm IPA')
      .replace(/Chiết tự & Bộ thủ/gi, 'Gốc từ & Cấu trúc (Etymology)')
      .replace(/Bộ thủ/gi, 'Gốc từ & Cấu trúc');
  }
  return text;
};

export const LessonModal = () => {
  const { activeLessonId, closeLesson, currentLang, userProfile, loseHeart, openAiTutor } = useApp();

  const [lesson, setLesson] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Exercise interaction states
  const [selectedOption, setSelectedOption] = useState(null); // for listening/cloze/roleplay
  const [assembledWords, setAssembledWords] = useState([]); // for word bank / dictation / translation / sentence_builder
  const [availableBank, setAvailableBank] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState({}); // for matching pairs
  const [selectedPairLeft, setSelectedPairLeft] = useState(null);
  const [matchingPairsLeft, setMatchingPairsLeft] = useState([]);
  const [matchingPairsRight, setMatchingPairsRight] = useState([]);
  const [isSpeakingListening, setIsSpeakingListening] = useState(false);
  const [speechResult, setSpeechResult] = useState(null);
  const [interimSpeechText, setInterimSpeechText] = useState('');
  const [micVolume, setMicVolume] = useState(0);
  const [hanziDone, setHanziDone] = useState(false);

  // Audio Dictation & Text input states
  const [typedDictation, setTypedDictation] = useState('');
  const [dictationRate, setDictationRate] = useState(1.0);

  // Microphone compatibility & text fallback states
  const [micError, setMicError] = useState(null);
  const [useTextFallback, setUseTextFallback] = useState(false);
  const [fallbackText, setFallbackText] = useState('');
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);

  // Evaluation & Feedback states
  const [evalState, setEvalState] = useState(null); // null | 'correct' | 'wrong' | 'completed'
  const [evalFeedback, setEvalFeedback] = useState(null);
  const [evalDiff, setEvalDiff] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalXP, setTotalXP] = useState(15);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  // Mastery Loop (Vòng lặp sửa sai)
  const [retryQueue, setRetryQueue] = useState([]);
  const [isRetryPhase, setIsRetryPhase] = useState(false);

  // Intercept browser / mobile edge-swipe Back gestures to protect learner progress
  useEffect(() => {
    if (!activeLessonId) return;

    window.history.pushState({ modal: 'lesson' }, '', window.location.href);

    const handlePopState = () => {
      if (evalState === 'completed') {
        closeLesson();
      } else {
        window.history.pushState({ modal: 'lesson' }, '', window.location.href);
        setShowQuitConfirm(true);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [activeLessonId, evalState]);

  useEffect(() => {
    if (activeLessonId) {
      loadLessonData();
    }
    return () => {
      proSpeech.stop();
      speech.stopListening();
      audioManager.stop();
    };
  }, [activeLessonId]);

  const loadLessonData = async () => {
    setLoading(true);
    try {
      cleanLessonCacheIfOutdated(activeLessonId);
      const data = await api.getLesson(activeLessonId);
      const isEnglish = currentLang === 'en' || currentLang === 'english' || (data?.id && data.id.startsWith('en_'));
      const activeLang = isEnglish ? 'en' : 'zh';

      const sanitizedExercises = (data?.exercises || []).map(ex => {
        const item = {
          ...ex,
          prompt: formatPromptByLanguage(ex.prompt, activeLang),
          hint: formatPromptByLanguage(ex.hint, activeLang),
          radicals: formatPromptByLanguage(ex.radicals, activeLang)
        };

        // 1. Shuffling Multiple Choice options for static / listening / cloze / roleplay
        if ((item.type === 'listening' || item.type === 'cloze_context' || item.type === 'mini_roleplay') && 
            Array.isArray(item.options) && item.options.length > 1) {
          item.options = shuffleArray(item.options);
          item.isOptionsShuffled = true;
        }

        // 2. Pre-shuffling matching pairs with anti-aligned right column
        if (item.type === 'matching' || item.type === 'matching_pairs') {
          const pairs = Array.isArray(item.options?.pairs) ? item.options.pairs : [];
          if (pairs.length > 0) {
            const leftList = shuffleArray(pairs);
            const rightList = shuffleRightColumn(leftList);
            item.shuffledPairsLeft = leftList;
            item.shuffledPairsRight = rightList;
          }
        }

        return item;
      });

      setLesson(data);
      setExercises(sanitizedExercises);
      setTotalXP(data?.xp_reward || 15);
      setEvalState(null);
      setRetryQueue([]);
      setIsRetryPhase(false);

      // Check session persistence for auto-resume
      const savedSession = sessionPersistence.load(activeLessonId);
      if (savedSession && typeof savedSession.currentIndex === 'number' && savedSession.currentIndex < sanitizedExercises.length) {
        setCurrentIndex(savedSession.currentIndex);
        setCorrectCount(savedSession.correctCount || 0);
        setRetryQueue(savedSession.retryQueue || []);
        if (sanitizedExercises[savedSession.currentIndex]) {
          initExercise(sanitizedExercises[savedSession.currentIndex]);
        }
      } else {
        setCurrentIndex(0);
        setCorrectCount(0);
        if (sanitizedExercises.length > 0) {
          initExercise(sanitizedExercises[0]);
        }
      }
    } catch (e) {
      console.warn('Failed to load lesson:', e);
    } finally {
      setLoading(false);
    }
  };

  const initExercise = (ex) => {
    if (!ex) return;
    setSelectedOption(null);
    setSpeechResult(null);
    setInterimSpeechText('');
    setEvalState(null);
    setEvalFeedback(null);
    setEvalDiff([]);
    setHanziDone(false);
    setSelectedPairLeft(null);
    setMatchedPairs({});
    setMicError(null);
    setFallbackText('');
    setTypedDictation('');
    setDictationRate(1.0);

    if (isSpeakingListening) {
      speech.stopListening();
      setIsSpeakingListening(false);
    }

    if (ex.type === 'speaking') {
      if (!speech.isRecognitionSupported()) {
        setMicError('Trình duyệt hiện tại chưa hỗ trợ Web Speech API nhận diện giọng nói. Bạn có thể nhập văn bản thay thế hoặc bấm bỏ qua để tiếp tục.');
        setUseTextFallback(true);
      } else {
        setUseTextFallback(false);
      }
    } else {
      setUseTextFallback(false);
    }

    // 1. Matching Pairs setup
    if (ex.type === 'matching' || ex.type === 'matching_pairs') {
      const pairs = Array.isArray(ex.options?.pairs) ? ex.options.pairs : [];
      let left = ex.shuffledPairsLeft;
      let right = ex.shuffledPairsRight;
      if (!left || !right || left.length === 0) {
        left = shuffleArray(pairs);
        right = shuffleRightColumn(left);
        ex.shuffledPairsLeft = left;
        ex.shuffledPairsRight = right;
      }
      setMatchingPairsLeft(left);
      setMatchingPairsRight(right);
    } else {
      setMatchingPairsLeft([]);
      setMatchingPairsRight([]);
    }

    // 2. Dictation / Translation / Sentence Builder Word Bank
    if (ex.type === 'dictation' || ex.type === 'translation' || ex.type === 'sentence_builder') {
      const words = Array.isArray(ex.options) ? [...ex.options] : [];
      const targetTokens = (ex.correct_answer || '').split(/\s+/).filter(Boolean);
      const shuffledWords = shuffleWordBank(words, targetTokens);
      setAvailableBank(shuffledWords);
      setAssembledWords([]);
    }

    // 3. Listening / Cloze / Roleplay options shuffle
    if ((ex.type === 'listening' || ex.type === 'cloze_context' || ex.type === 'mini_roleplay') && 
        Array.isArray(ex.options) && ex.options.length > 1) {
      if (!ex.isOptionsShuffled) {
        ex.options = shuffleArray(ex.options);
        ex.isOptionsShuffled = true;
      }
    }

    // Auto-play audio for listening & preview exercises
    if ((ex.type === 'listening' || ex.type === 'preview' || ex.type === 'flashcard_chunk') && 
        (ex.target_audio_text || ex.target_text)) {
      setTimeout(() => {
        audioManager.speak(ex.target_audio_text || ex.target_text, currentLang, 1.0);
      }, 300);
    }
  };

  const currentExercise = exercises[currentIndex];
  const progressPercent = exercises.length > 0 ? ((currentIndex) / exercises.length) * 100 : 0;

  // Speech input trigger with proSpeech engine
  const handleToggleMic = () => {
    if (isSpeakingListening) {
      sounds.playTap();
      proSpeech.stop();
      setIsSpeakingListening(false);
      setMicVolume(0);
      return;
    }

    if (!proSpeech.isSupported()) {
      setMicError('Trình duyệt hiện tại chưa hỗ trợ Web Speech API nhận diện giọng nói. Vui lòng nhập văn bản thay thế hoặc bỏ qua câu nói.');
      setUseTextFallback(true);
      return;
    }

    sounds.playTap();
    setIsSpeakingListening(true);
    setSpeechResult(null);
    setMicError(null);
    setInterimSpeechText('');
    setMicVolume(0);

    proSpeech.start({
      lang: currentLang,
      targetText: currentExercise.target_text,
      maxDuration: 25000,
      silenceTimeout: 2500,
      onVolumeChange: (vol) => {
        setMicVolume(vol);
      },
      onInterim: (liveText) => {
        setInterimSpeechText(liveText);
      },
      onResult: (transcript, evaluation) => {
        setIsSpeakingListening(false);
        setInterimSpeechText('');
        setMicVolume(0);
        setMicError(null);
        setSpeechResult(evaluation);
        if (evaluation && evaluation.score >= 85) {
          questTracker.increment('speaking', 1);
        }
      },
      onError: (err) => {
        setIsSpeakingListening(false);
        setInterimSpeechText('');
        setMicVolume(0);
        console.warn('Speech error:', err);
        if (err === 'not-allowed' || err === 'permission-denied') {
          setMicError('Quyền truy cập Microphone bị từ chối hoặc bị chặn trên trình duyệt. Vui lòng cấp quyền Micro hoặc nhập văn bản thay thế.');
          setUseTextFallback(true);
        } else if (err === 'no-speech') {
          setMicError('Không nhận được âm thanh. Hãy bấm lại mic và nói to, rõ ràng hơn.');
        } else {
          setMicError(`Lỗi Microphone (${err}). Bạn có thể nhập văn bản thay thế.`);
          setUseTextFallback(true);
        }
      },
      onEnd: () => {
        setIsSpeakingListening(false);
        setMicVolume(0);
      }
    });
  };

  // Submit typed text fallback when mic is unavailable or denied
  const handleSubmitFallbackText = (e) => {
    if (e) e.preventDefault();
    if (!fallbackText.trim()) return;
    sounds.playTap();
    const evalScore = proSpeech.evaluatePronunciation(
      fallbackText.trim(),
      currentExercise.target_text,
      currentLang
    );
    setSpeechResult(evalScore);
    if (evalScore && evalScore.score >= 85) {
      questTracker.increment('speaking', 1);
    }
  };

  // Safe skip button for speaking exercise so user is never stuck
  const handleSkipSpeaking = () => {
    sounds.playTap();
    const isZh = currentLang === 'zh';
    const words = isZh
      ? currentExercise.target_text.split('')
      : currentExercise.target_text.split(/\s+/).filter(Boolean);

    setSpeechResult({
      score: 100,
      isPass: true,
      spoken: '(Đã bỏ qua câu luyện nói)',
      target: currentExercise.target_text,
      words: words.map(w => ({
        word: w,
        status: 'correct',
        score: 100,
        note: 'Đã bỏ qua'
      })),
      diagnostics: ['Bạn đã chọn bỏ qua câu luyện nói này.'],
      critique: {
        category: 'Miễn trừ microphone',
        observation: 'Đã hoàn thành câu luyện nói này mà không cần dùng micro.',
        advice: 'Bạn có thể mở quyền micro hoặc dùng trình duyệt Chrome/Safari để thử lại sau.'
      },
      feedback: 'Đã bỏ qua câu luyện nói!'
    });
  };

  // Multi-tier Smart Answer Validator with Typo Tolerance & Mastery Loop
  const handleCheck = () => {
    if (!currentExercise) return;

    let isCorrect = false;
    let evalStatus = 'EXACT_MATCH';
    let feedbackMsg = '';
    let diffList = [];

    const isPreviewType = currentExercise.type === 'preview' || 
                          currentExercise.type === 'flashcard_chunk' || 
                          currentExercise.type === 'flashcard';

    if (isPreviewType) {
      isCorrect = true;
      evalStatus = 'EXACT_MATCH';
    } else if (currentExercise.type === 'listening' || 
               currentExercise.type === 'cloze_context' || 
               currentExercise.type === 'mini_roleplay') {
      const res = validateAnswer(selectedOption, currentExercise, currentLang);
      isCorrect = res.isCorrect;
      evalStatus = res.status;
      feedbackMsg = res.feedback;
      diffList = res.diff || [];
    } else if (currentExercise.type === 'dictation' || 
               currentExercise.type === 'translation' || 
               currentExercise.type === 'sentence_builder') {
      const assembledSentence = assembledWords.join(' ').trim();
      const res = validateAnswer(assembledSentence, currentExercise, currentLang);
      isCorrect = res.isCorrect;
      evalStatus = res.status;
      feedbackMsg = res.feedback;
      diffList = res.diff || [];
    } else if (currentExercise.type === 'audio_dictation') {
      const res = validateAnswer(typedDictation.trim(), currentExercise, currentLang);
      isCorrect = res.isCorrect;
      evalStatus = res.status;
      feedbackMsg = res.feedback;
      diffList = res.diff || [];
    } else if (currentExercise.type === 'speaking') {
      isCorrect = speechResult && speechResult.isPass;
    } else if (currentExercise.type === 'writing') {
      isCorrect = hanziDone;
    } else if (currentExercise.type === 'matching' || currentExercise.type === 'matching_pairs') {
      isCorrect = true;
    }

    if (isCorrect) {
      sounds.playCorrect();
      setEvalState('correct');
      setCorrectCount(prev => prev + 1);
      setEvalFeedback(evalStatus === 'TYPO_MATCH' ? feedbackMsg : null);
      setEvalDiff(diffList);
    } else {
      sounds.playWrong();
      setEvalState('wrong');
      setEvalFeedback(feedbackMsg || `Đáp án đúng là: "${currentExercise.correct_answer}"`);
      setEvalDiff(diffList);
      loseHeart();

      // Mastery Loop: Append failed exercise to retry queue so learner masters it!
      setRetryQueue(prev => {
        if (!prev.some(item => item.id === currentExercise.id)) {
          return [...prev, currentExercise];
        }
        return prev;
      });
    }
  };

  // Continue to next exercise or trigger Mastery Loop / Completion
  const handleContinue = async () => {
    sounds.playTap();

    if (currentIndex + 1 < exercises.length) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      initExercise(exercises[nextIndex]);
      sessionPersistence.save(activeLessonId, {
        currentIndex: nextIndex,
        correctCount,
        retryQueue
      });
    } else {
      // Check if there are mistakes queued in the Mastery Loop!
      if (retryQueue.length > 0) {
        setIsRetryPhase(true);
        const remainingQueue = [...retryQueue];
        setRetryQueue([]);
        setExercises(prev => [...prev, ...remainingQueue]);
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        initExercise(remainingQueue[0]);
        sounds.playTap();
      } else {
        // 100% Completed all exercises!
        sounds.playFanfare();
        triggerConfetti();
        setEvalState('completed');
        sessionPersistence.clear();

        const finalScore = Math.max(80, Math.round(((correctCount + 1) / (exercises.length || 1)) * 100));
        const stars = finalScore >= 90 ? 3 : finalScore >= 60 ? 2 : 1;

        try {
          await api.completeLesson(lesson.id, {
            userId: userProfile.id,
            score: finalScore,
            stars,
            xpGained: totalXP
          });
          questTracker.increment('lessons', 1);
        } catch (e) {
          console.warn('Failed to complete lesson on backend:', e);
        }
      }
    }
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 120,
        spread: 75,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }
  };

  // Can check button be enabled?
  const canCheck = () => {
    if (!currentExercise || evalState !== null) return false;
    if (currentExercise.type === 'preview' || currentExercise.type === 'flashcard_chunk' || currentExercise.type === 'flashcard') {
      return true;
    }
    if (currentExercise.type === 'listening' || currentExercise.type === 'cloze_context' || currentExercise.type === 'mini_roleplay') {
      return selectedOption !== null;
    }
    if (currentExercise.type === 'dictation' || currentExercise.type === 'translation' || currentExercise.type === 'sentence_builder') {
      return assembledWords.length > 0;
    }
    if (currentExercise.type === 'audio_dictation') {
      return typedDictation.trim().length > 0;
    }
    if (currentExercise.type === 'speaking') return speechResult !== null;
    if (currentExercise.type === 'writing') return hanziDone;
    if (currentExercise.type === 'matching' || currentExercise.type === 'matching_pairs') {
      let pairs = [];
      try {
        pairs = currentExercise.options?.pairs || [];
      } catch (e) {}
      return pairs.length > 0 && Object.keys(matchedPairs).length === pairs.length;
    }
    return true;
  };

  const handleConfirmQuit = () => {
    sounds.playTap();
    sessionPersistence.clear();
    setShowQuitConfirm(false);
    closeLesson();
  };

  // Generate fresh practice variation with Gemini AI
  const handleGenerateAiVariation = async () => {
    if (isGeneratingAi) return;
    setIsGeneratingAi(true);
    try {
      sounds.playTap();
      const words = lesson?.vocabularies || exercises.map(e => ({ word: e.target_text, meaningVi: e.vietnamese_meaning }));
      const res = await ai.generateLessonVariation({
        words,
        level: lesson?.levelBadge || lesson?.code || 'HSK 1',
        language: currentLang,
        currentExercises: exercises.map(e => ({ type: e.type, target: e.target_text }))
      });

      if (Array.isArray(res) && res.length > 0) {
        setExercises(res);
        setCurrentIndex(0);
        setEvalState(null);
        setCorrectCount(0);
        setRetryQueue([]);
        setIsRetryPhase(false);
        initExercise(res[0]);
        triggerConfetti();
      }
    } catch (e) {
      console.warn('Failed to generate AI variation:', e);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  if (!activeLessonId) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#F7F7F7] dark:bg-[#131F24] flex flex-col justify-between overflow-hidden select-none animate-in fade-in duration-200">
      {/* 1. Header Bài Học */}
      <header className="shrink-0 max-w-4xl w-full mx-auto p-4 flex items-center justify-between gap-4 z-10">
        <button
          onClick={() => {
            sounds.playTap();
            setShowQuitConfirm(true);
          }}
          className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          title="Thoát bài học"
        >
          <X className="w-6 h-6 stroke-[2.5]" />
        </button>

        {/* Thanh Tiến Trình Học Tập */}
        <div className="flex-1 bg-slate-200 dark:bg-slate-700 h-4 rounded-full overflow-hidden p-0.5 shadow-inner">
          <div
            className={`h-full rounded-full transition-all duration-300 shadow-xs ${
              isRetryPhase ? 'bg-amber-500' : 'bg-[#58CC02]'
            }`}
            style={{ width: `${Math.min(100, Math.max(5, progressPercent))}%` }}
          />
        </div>

        {/* Điểm Tim Trực Quan */}
        <div className="flex items-center gap-1.5 font-black text-rose-500 text-lg px-2">
          <Heart className="w-6 h-6 fill-rose-500" />
          <span>{userProfile?.hearts ?? 5}</span>
        </div>
      </header>

      {/* Mastery Loop Warning Banner if in retry phase */}
      {isRetryPhase && (
        <div className="max-w-xl mx-auto px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center gap-2 text-xs font-black text-amber-600 dark:text-amber-400 animate-in fade-in">
          <RotateCcw className="w-4 h-4 animate-spin-reverse" />
          <span>Vòng Lặp Thành Thạo (Mastery Loop): Ôn lại câu chưa chuẩn để làm chủ 100%!</span>
        </div>
      )}

      {/* 2. Thân Bài Học (Nội dung câu hỏi) */}
      <main className="flex-1 flex flex-col justify-center max-w-xl w-full mx-auto px-4 py-2 overflow-y-auto">
        <div className="w-full">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400 space-y-3">
            <div className="w-10 h-10 border-4 border-[#58CC02] border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-bold">Đang tải cấu trúc bài tập...</p>
          </div>
        ) : evalState === 'completed' ? (
          /* Lesson Completed Celebration View */
          <div className="text-center py-6 space-y-6 animate-in zoom-in-95">
            <div className="w-24 h-24 mx-auto rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-500 flex items-center justify-center shadow-lg">
              <Trophy className="w-12 h-12 fill-amber-500" />
            </div>

            <div>
              <h2 className="text-3xl font-black text-slate-800 dark:text-white">
                Chúc mừng bạn đã hoàn thành!
              </h2>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">
                Bạn đã làm chủ trọn vẹn bài học "{lesson?.title}"
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
              <div className="duo-card p-4">
                <span className="text-xs font-bold text-slate-400 uppercase">Kinh Nghiệm</span>
                <p className="text-2xl font-black text-amber-500 mt-1">+{totalXP} XP</p>
              </div>
              <div className="duo-card p-4">
                <span className="text-xs font-bold text-slate-400 uppercase">Độ Thành Thạo</span>
                <p className="text-2xl font-black text-emerald-500 mt-1">100%</p>
              </div>
            </div>

            <div className="max-w-sm mx-auto space-y-3">
              <button
                onClick={handleGenerateAiVariation}
                disabled={isGeneratingAi}
                className="duo-btn duo-btn-outline w-full py-3.5 rounded-2xl text-sm uppercase tracking-wider mx-auto flex items-center justify-center gap-2 border-purple-400 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/50 font-black cursor-pointer shadow-xs"
              >
                <Sparkles className={`w-4 h-4 text-purple-500 ${isGeneratingAi ? 'animate-spin' : ''}`} />
                <span>{isGeneratingAi ? 'Đang tạo câu hỏi bằng AI...' : '✨ Luyện Tập Vô Hạn Với AI'}</span>
              </button>

              <button
                onClick={closeLesson}
                className="duo-btn duo-btn-green w-full py-4 rounded-2xl text-base uppercase tracking-wider mx-auto cursor-pointer"
              >
                Tiếp Tục Lộ Trình
              </button>
            </div>
          </div>
        ) : exercises.length === 0 ? (
          <div className="text-center py-12 space-y-5 animate-in fade-in">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-100 dark:bg-amber-950/60 border-2 border-amber-300 dark:border-amber-700 flex items-center justify-center text-3xl shadow-sm">
              📝
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-800 dark:text-white">
                Bài học đang được cập nhật câu hỏi
              </h3>
            </div>
            <button
              onClick={closeLesson}
              className="btn-3d-green px-6 py-3.5 rounded-2xl text-xs uppercase font-black tracking-wider mx-auto shadow-md cursor-pointer"
            >
              Quay Lại Lộ Trình
            </button>
          </div>
        ) : (
          /* Interactive Question Stage */
          currentExercise && (
            <div className="space-y-6">
              {/* Prompt Title */}
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white tracking-tight">
                  {formatPromptByLanguage(currentExercise.prompt, currentLang)}
                </h3>
              </div>

              {/* 1. FLASHCARD_CHUNK / PREVIEW (WARM-UP PRE-TEACHING) */}
              {(currentExercise.type === 'preview' || currentExercise.type === 'flashcard_chunk' || currentExercise.type === 'flashcard') && (
                <div className="space-y-4 animate-in fade-in zoom-in-95">
                  <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 sm:p-7 border-2 border-slate-200 dark:border-slate-700 shadow-md text-center space-y-4">
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
                        {currentExercise.partOfSpeech || 'Khởi động kiến thức'}
                      </span>
                      {currentExercise.hanViet && currentLang === 'zh' && (
                        <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300">
                          Hán Việt: {currentExercise.hanViet}
                        </span>
                      )}
                    </div>

                    <div className="text-4xl sm:text-5xl font-black text-slate-800 dark:text-white tracking-wide py-1">
                      {currentExercise.target_text}
                    </div>

                    <div className="space-y-1">
                      {currentExercise.phonetic && (
                        <div className="text-xl sm:text-2xl font-bold text-sky-600 dark:text-sky-400">
                          [{currentExercise.phonetic}]
                        </div>
                      )}
                      <div className="text-base sm:text-lg font-bold text-slate-700 dark:text-slate-300">
                        {currentExercise.vietnamese_meaning}
                      </div>
                    </div>

                    {/* Dual Audio Buttons: 1.0x & 0.75x */}
                    <div className="flex items-center justify-center gap-3 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          sounds.playTap();
                          audioManager.speak(currentExercise.target_audio_text || currentExercise.target_text, currentLang, 1.0);
                        }}
                        className="duo-btn duo-btn-blue px-4 py-2.5 rounded-2xl flex items-center gap-2 font-bold text-xs sm:text-sm shadow-md cursor-pointer"
                      >
                        <Volume2 className="w-5 h-5 text-white" />
                        <span>Chuẩn 1.0x</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          sounds.playTap();
                          audioManager.speakSlow(currentExercise.target_audio_text || currentExercise.target_text, currentLang);
                        }}
                        className="duo-btn duo-btn-yellow px-4 py-2.5 rounded-2xl flex items-center gap-2 font-bold text-xs sm:text-sm shadow-md cursor-pointer"
                      >
                        <Snail className="w-5 h-5 text-amber-950" />
                        <span>Chậm 0.75x</span>
                      </button>
                    </div>

                    {/* Collocations Pills */}
                    {Array.isArray(currentExercise.collocations) && currentExercise.collocations.length > 0 && (
                      <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 text-left space-y-2">
                        <span className="text-xs font-black uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-sky-500" />
                          <span>Cụm từ thường dùng (Collocations):</span>
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {currentExercise.collocations.map((c, i) => (
                            <span key={i} className="px-2.5 py-1 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 shadow-xs">
                              {typeof c === 'string' ? c : `${c.target} (${c.meaning})`}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Pragmatic / Cultural Tip */}
                    {(currentExercise.pragmatic_tip || currentExercise.radicals) && (
                      <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-left text-xs space-y-1">
                        <div className="flex items-center gap-1.5 font-black text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                          <span>{currentLang === 'zh' ? 'Chiết tự & Gốc nghĩa:' : 'Mẹo Văn Hóa & Ngữ Dụng Học:'}</span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                          {formatPromptByLanguage(currentExercise.pragmatic_tip || currentExercise.radicals, currentLang)}
                        </p>
                      </div>
                    )}

                    {/* Example Sentence with Audio */}
                    {(currentExercise.example || currentExercise.exampleSentence) && (
                      <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 text-left text-xs space-y-2">
                        {(() => {
                          const exItem = currentExercise.example || currentExercise.exampleSentence;
                          const target = exItem.target || exItem.text;
                          return (
                            <>
                              <div className="flex items-center justify-between">
                                <span className="font-black text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                                  Ví dụ thực tế:
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    sounds.playTap();
                                    audioManager.speak(target, currentLang, 1.0);
                                  }}
                                  className="p-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg shadow-xs cursor-pointer"
                                  title="Nghe câu mẫu"
                                >
                                  <Volume2 className="w-4 h-4" />
                                </button>
                              </div>
                              <div className="text-sm sm:text-base font-black text-slate-800 dark:text-white">
                                {target}
                              </div>
                              {exItem.phonetic && (
                                <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                                  [{exItem.phonetic}]
                                </div>
                              )}
                              <div className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                                {exItem.meaning || exItem.meaningVi}
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 2. CLOZE_CONTEXT (FILL-IN-THE-BLANK IN CONVERSATION) */}
              {currentExercise.type === 'cloze_context' && (
                <div className="space-y-6">
                  <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase text-amber-600 dark:text-amber-400">
                        Ngữ cảnh hội thoại:
                      </span>
                      {currentExercise.target_audio_text && (
                        <button
                          type="button"
                          onClick={() => {
                            sounds.playTap();
                            audioManager.speak(currentExercise.target_audio_text, currentLang, 1.0);
                          }}
                          className="p-2 rounded-xl bg-sky-500 text-white"
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-relaxed">
                      {currentExercise.target_text.replace(/\[___\]/g, '______')}
                    </div>
                    {currentExercise.vietnamese_meaning && (
                      <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                        Nghĩa: {currentExercise.vietnamese_meaning}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentExercise.options?.map((option, idx) => {
                      const isSelected = selectedOption === option;
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            sounds.playTap();
                            setSelectedOption(option);
                          }}
                          className={`duo-card-interactive p-4 text-left font-bold text-base transition-all ${
                            isSelected
                              ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300'
                              : 'text-slate-700 dark:text-slate-200'
                          }`}
                        >
                          <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 inline-flex items-center justify-center text-xs font-black mr-2 text-slate-500">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 3. MINI_ROLEPLAY (DIALOGUE SIMULATION) */}
              {currentExercise.type === 'mini_roleplay' && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    {/* Character A Chat Bubble */}
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-lg font-black shrink-0 shadow-md">
                        {currentLang === 'zh' ? '李' : 'Alex'}
                      </div>
                      <div className="p-4 rounded-3xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 shadow-sm space-y-1.5 max-w-[85%]">
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-xs font-bold text-slate-400">
                            {currentLang === 'zh' ? 'Tiểu Lý:' : 'Alex:'}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              sounds.playTap();
                              audioManager.speak(currentExercise.target_text, currentLang, 1.0);
                            }}
                            className="p-1 text-sky-500 hover:text-sky-600"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-lg font-black text-slate-900 dark:text-white">
                          {currentExercise.target_text}
                        </p>
                        {currentExercise.vietnamese_meaning && (
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                            "{currentExercise.vietnamese_meaning}"
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="text-xs font-black uppercase text-slate-400 pl-13 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Chọn phản hồi tự nhiên nhất của bạn:</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5 pl-4 sm:pl-13">
                    {currentExercise.options?.map((option, idx) => {
                      const isSelected = selectedOption === option;
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            sounds.playTap();
                            setSelectedOption(option);
                          }}
                          className={`duo-card-interactive p-3.5 text-left font-bold text-sm sm:text-base transition-all ${
                            isSelected
                              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                              : 'text-slate-700 dark:text-slate-200'
                          }`}
                        >
                          <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 inline-flex items-center justify-center text-xs font-black mr-2 text-slate-500">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 4. AUDIO_DICTATION (DUAL SPEED LISTENING + TYPING) */}
              {currentExercise.type === 'audio_dictation' && (
                <div className="space-y-6 text-center">
                  <div className="duo-card p-6 inline-block w-full space-y-4">
                    <span className="text-xs font-black uppercase text-sky-600 dark:text-sky-400 flex items-center justify-center gap-1.5">
                      <Volume2 className="w-4 h-4" />
                      <span>Nghe và gõ lại câu đầy đủ:</span>
                    </span>

                    <div className="flex items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          sounds.playTap();
                          audioManager.speak(currentExercise.target_audio_text || currentExercise.target_text, currentLang, 1.0);
                        }}
                        className="duo-btn duo-btn-blue p-5 rounded-3xl shadow-lg"
                        title="Nghe tốc độ chuẩn (1.0x)"
                      >
                        <Volume2 className="w-10 h-10 text-white" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          sounds.playTap();
                          audioManager.speakSlow(currentExercise.target_audio_text || currentExercise.target_text, currentLang);
                        }}
                        className="duo-btn duo-btn-yellow p-5 rounded-3xl shadow-lg"
                        title="Nghe chậm rùa bò (0.75x)"
                      >
                        <Snail className="w-10 h-10 text-amber-950" />
                      </button>
                    </div>

                    {currentExercise.phonetic && (
                      <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        [{currentExercise.phonetic}]
                      </p>
                    )}
                  </div>

                  <div className="space-y-2 text-left">
                    <input
                      type="text"
                      value={typedDictation}
                      onChange={(e) => setTypedDictation(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && canCheck()) {
                          handleCheck();
                        }
                      }}
                      placeholder={`Gõ lại câu vừa nghe bằng tiếng ${currentLang === 'zh' ? 'Trung' : 'Anh'}...`}
                      className="w-full p-4 rounded-2xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-black text-lg focus:border-sky-500 focus:outline-hidden shadow-inner"
                      autoFocus
                    />
                    <p className="text-[11px] text-slate-400">
                      💡 Hệ thống có bộ nhận diện lỗi chính tả thông minh (Typo Tolerance), lỗi nhỏ $\le 1$ ký tự sẽ được nhắc nhở mà không trừ tim.
                    </p>
                  </div>
                </div>
              )}

              {/* 5. STANDARD LISTENING EXERCISE */}
              {currentExercise.type === 'listening' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        sounds.playTap();
                        audioManager.speak(currentExercise.target_audio_text || currentExercise.target_text, currentLang, 1.0);
                      }}
                      className="duo-btn duo-btn-blue p-4 rounded-2xl shadow-md"
                      title="Nghe tốc độ bình thường (1.0x)"
                    >
                      <Volume2 className="w-8 h-8 text-white" />
                    </button>

                    <button
                      onClick={() => {
                        sounds.playTap();
                        audioManager.speakSlow(currentExercise.target_audio_text || currentExercise.target_text, currentLang);
                      }}
                      className="duo-btn duo-btn-yellow p-4 rounded-2xl shadow-md"
                      title="Nghe chậm rùa bò (0.75x)"
                    >
                      <Snail className="w-8 h-8 text-amber-950" />
                    </button>

                    <div className="ml-2">
                      <span className="text-lg font-bold text-slate-800 dark:text-slate-200">
                        {currentExercise.target_text}
                      </span>
                      {currentExercise.phonetic && (
                        <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                          [{currentExercise.phonetic}]
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {currentExercise.options?.map((option, idx) => {
                      const isSelected = selectedOption === option;
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            sounds.playTap();
                            setSelectedOption(option);
                          }}
                          className={`duo-card-interactive p-4 text-left font-bold text-base transition-all ${
                            isSelected
                              ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300'
                              : 'text-slate-700 dark:text-slate-200'
                          }`}
                        >
                          <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 inline-flex items-center justify-center text-xs font-black mr-2 text-slate-500">
                            {idx + 1}
                          </span>
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 6. SPEAKING EXERCISE WITH MICROPHONE & EVALUATION */}
              {currentExercise.type === 'speaking' && (
                <div className="space-y-6 text-center">
                  <div className="duo-card p-6 inline-block w-full">
                    <button
                      onClick={() => audioManager.speak(currentExercise.target_text, currentLang, 1.0)}
                      className="inline-flex items-center gap-2 text-emerald-500 hover:text-emerald-600 mb-2 font-bold text-xs cursor-pointer"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Nghe phát âm chuẩn</span>
                    </button>

                    <div className="text-3xl font-black text-slate-900 dark:text-white my-1">
                      {currentExercise.target_text}
                    </div>

                    <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                      [{currentExercise.phonetic}]
                    </div>

                    <p className="text-xs text-slate-500 mt-2">
                      Nghĩa: {currentExercise.vietnamese_meaning}
                    </p>
                  </div>

                  {currentLang === 'zh' && (
                    <TonePitchCanvas 
                      targetText={currentExercise.target_text} 
                      phonetic={currentExercise.phonetic}
                      isListening={isSpeakingListening}
                    />
                  )}

                  {micError && (
                    <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-800 text-left space-y-3 animate-in fade-in">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                          <AlertTriangle className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-black text-amber-900 dark:text-amber-200 text-sm">
                            Kiểm tra Micro &amp; Tương thích Trình Duyệt
                          </h4>
                          <p className="text-xs text-amber-800/90 dark:text-amber-300/90 mt-0.5 leading-relaxed">
                            {micError}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setUseTextFallback(true)}
                          className="duo-btn duo-btn-blue text-xs py-2 px-3.5 rounded-xl flex items-center gap-1.5"
                        >
                          <Keyboard className="w-4 h-4" />
                          <span>Nhập văn bản thay thế</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleSkipSpeaking}
                          className="duo-btn duo-btn-outline text-xs py-2 px-3.5 rounded-xl flex items-center gap-1.5 text-slate-700 dark:text-slate-200"
                        >
                          <SkipForward className="w-4 h-4 text-emerald-500" />
                          <span>Bỏ qua câu nói này</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {useTextFallback ? (
                    <form onSubmit={handleSubmitFallbackText} className="duo-card p-4 space-y-3 text-left animate-in fade-in">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase text-slate-500 dark:text-slate-400">
                          Nhập văn bản để chấm điểm tương đồng:
                        </span>
                        <button
                          type="button"
                          onClick={() => setUseTextFallback(false)}
                          className="text-xs text-sky-600 dark:text-sky-400 font-bold hover:underline"
                        >
                          Quay lại thu âm Micro
                        </button>
                      </div>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={fallbackText}
                          onChange={(e) => setFallbackText(e.target.value)}
                          placeholder={`Gõ lại: "${currentExercise.target_text}"...`}
                          className="flex-1 p-3.5 rounded-xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white font-bold text-base focus:border-sky-500 focus:outline-hidden"
                          autoFocus
                        />
                        <button
                          type="submit"
                          disabled={!fallbackText.trim()}
                          className="duo-btn duo-btn-green px-5 py-3 rounded-xl text-sm font-black disabled:opacity-50"
                        >
                          Chấm Điểm
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="py-2 space-y-4">
                      {isSpeakingListening && (
                        <div className="duo-card p-4 bg-sky-50 dark:bg-sky-950/40 border-2 border-sky-300 dark:border-sky-700 animate-in fade-in max-w-lg mx-auto">
                          <div className="flex items-center justify-center gap-2 text-sky-600 dark:text-sky-400 font-extrabold text-xs uppercase tracking-wider mb-1">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping inline-block" />
                            <span>Đang thu âm liên tục...</span>
                          </div>
                          <p className="text-base font-black text-slate-800 dark:text-white min-h-[1.75rem] px-2 py-1 bg-white/70 dark:bg-slate-900/70 rounded-xl border border-sky-200 dark:border-sky-800">
                            {interimSpeechText ? `"${interimSpeechText}"` : 'Hãy bắt đầu đọc to toàn bộ câu...'}
                          </p>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <button
                          onClick={handleToggleMic}
                          className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto sm:mx-0 shadow-xl transition-all cursor-pointer ${
                            isSpeakingListening
                              ? 'bg-rose-500 text-white animate-pulse border-4 border-rose-300 scale-105'
                              : 'duo-btn duo-btn-blue text-white'
                          }`}
                          title={isSpeakingListening ? "Bấm để dừng và chấm điểm ngay" : "Bấm mic để phát âm"}
                        >
                          {isSpeakingListening ? (
                            <Square className="w-9 h-9 fill-white" />
                          ) : (
                            <Mic className="w-10 h-10" />
                          )}
                        </button>

                        {isSpeakingListening && (
                          <button
                            onClick={handleToggleMic}
                            className="duo-btn duo-btn-green py-3 px-5 rounded-2xl font-black text-sm flex items-center gap-2 shadow-lg animate-in zoom-in-95 cursor-pointer"
                          >
                            <CheckCircle2 className="w-5 h-5" />
                            <span>Dừng &amp; Chấm Điểm Ngay</span>
                          </button>
                        )}
                      </div>

                      <p className="text-xs font-bold text-slate-400 mt-1">
                        {isSpeakingListening
                          ? 'Đang lắng nghe... Đọc thoải mái cả câu, không bị giới hạn thời gian gấp.'
                          : 'Bấm mic để bắt đầu phát âm (Thu âm liên tục, không tắt sớm)'}
                      </p>
                    </div>
                  )}

                  {speechResult && (
                    <div className="duo-card p-4 sm:p-5 text-left space-y-4 animate-in fade-in">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase text-slate-500 tracking-wider">
                          Độ Tương Đồng Phát Âm (Levenshtein)
                        </span>
                        <span
                          className={`text-xs font-black px-3 py-1 rounded-full border shadow-xs ${
                            speechResult.isPass
                              ? 'bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-800'
                              : 'bg-rose-100 text-rose-700 border-rose-300 dark:bg-rose-950/80 dark:text-rose-300 dark:border-rose-800'
                          }`}
                        >
                          {speechResult.score}% Chuẩn xác {speechResult.isPass ? '✓ Đạt' : '✗ Chưa đạt'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 7. WRITING & SPELLING EXERCISE */}
              {currentExercise.type === 'writing' && (
                <div className="space-y-4 text-center">
                  {currentLang === 'zh' ? (
                    <StrokeOrderWriter
                      word={currentExercise.stroke_char || currentExercise.target_text}
                      pinyin={currentExercise.phonetic}
                      meaning={currentExercise.vietnamese_meaning}
                      size={210}
                      onWordComplete={() => {
                        setHanziDone(true);
                      }}
                    />
                  ) : (
                    <EnglishSpellingWriter
                      word={currentExercise.target_text}
                      phonetic={currentExercise.phonetic}
                      meaning={currentExercise.vietnamese_meaning}
                      onComplete={() => {
                        setHanziDone(true);
                      }}
                    />
                  )}

                  {!hanziDone && (
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => setHanziDone(true)}
                        className="text-xs text-slate-400 hover:text-emerald-500 font-bold underline cursor-pointer"
                      >
                        Tôi đã viết xong trên giấy / Bỏ qua câu viết
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* 8. MATCHING PAIRS EXERCISE */}
              {(currentExercise.type === 'matching' || currentExercise.type === 'matching_pairs') && (
                <div className="space-y-4">
                  <p className="text-xs font-bold text-slate-400">
                    Bấm vào một từ bên trái rồi bấm vào nghĩa tương ứng bên phải:
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Left Items */}
                    <div className="space-y-2">
                      {((matchingPairsLeft.length > 0 ? matchingPairsLeft : currentExercise.options?.pairs) || []).map((pair, idx) => {
                        const isMatched = !!matchedPairs[pair.left];
                        const isSelected = selectedPairLeft === pair.left;
                        return (
                          <button
                            key={`left_${idx}_${pair.left}`}
                            disabled={isMatched}
                            onClick={() => {
                              sounds.playTap();
                              setSelectedPairLeft(pair.left);
                            }}
                            className={`w-full p-3.5 rounded-xl font-bold text-sm text-left transition-all border-2 border-b-4 cursor-pointer ${
                              isMatched
                                ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-800 line-through opacity-60'
                                : isSelected
                                ? 'bg-sky-50 dark:bg-sky-950 text-sky-600 border-sky-500'
                                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700'
                            }`}
                          >
                            {pair.left}
                          </button>
                        );
                      })}
                    </div>

                    {/* Right Items */}
                    <div className="space-y-2">
                      {((matchingPairsRight.length > 0 ? matchingPairsRight : currentExercise.options?.pairs) || []).map((pair, idx) => {
                        const isMatched = Object.values(matchedPairs).includes(pair.right);
                        return (
                          <button
                            key={`right_${idx}_${pair.right}`}
                            disabled={isMatched}
                            onClick={() => {
                              if (!selectedPairLeft) return;
                              const correctRight = currentExercise.options?.pairs?.find(
                                p => p.left === selectedPairLeft
                              )?.right;

                              if (correctRight === pair.right) {
                                sounds.playCorrect();
                                setMatchedPairs(prev => ({
                                  ...prev,
                                  [selectedPairLeft]: pair.right
                                }));
                                setSelectedPairLeft(null);
                              } else {
                                sounds.playWrong();
                                setSelectedPairLeft(null);
                              }
                            }}
                            className={`w-full p-3.5 rounded-xl font-bold text-sm text-left transition-all border-2 border-b-4 cursor-pointer ${
                              isMatched
                                ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-800 line-through opacity-60'
                                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                            }`}
                          >
                            {pair.right}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* 9. DICTATION, TRANSLATION & SENTENCE_BUILDER WORD BANK */}
              {(currentExercise.type === 'dictation' || currentExercise.type === 'translation' || currentExercise.type === 'sentence_builder') && (
                <div className="space-y-6">
                  <div className="duo-card p-4 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase">Ý nghĩa / Đề bài:</span>
                      <p className="text-lg font-black text-slate-800 dark:text-white mt-0.5">
                        {currentExercise.vietnamese_meaning || currentExercise.prompt}
                      </p>
                    </div>
                    {currentExercise.target_audio_text && (
                      <button
                        onClick={() => {
                          sounds.playTap();
                          audioManager.speak(currentExercise.target_audio_text, currentLang, 1.0);
                        }}
                        className="p-3 bg-sky-500 text-white rounded-xl shadow-xs cursor-pointer"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  {/* Assembled Sentence Drop Area */}
                  <div className="min-h-24 p-4 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-wrap gap-2 items-center bg-slate-50/50 dark:bg-slate-900/50">
                    {assembledWords.length === 0 ? (
                      <span className="text-xs font-semibold text-slate-400">
                        Bấm vào các thẻ từ bên dưới để ghép câu theo thứ tự...
                      </span>
                    ) : (
                      assembledWords.map((word, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            sounds.playTap();
                            setAssembledWords(prev => prev.filter((_, i) => i !== idx));
                            setAvailableBank(prev => [...prev, word]);
                          }}
                          className="duo-btn duo-btn-outline px-3.5 py-2 rounded-xl text-sm font-black animate-in zoom-in-95 cursor-pointer"
                        >
                          {word}
                        </button>
                      ))
                    )}
                  </div>

                  {/* Available Word Bank */}
                  <div className="flex flex-wrap gap-2 justify-center pt-2 max-h-48 overflow-y-auto">
                    {availableBank.map((word, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          sounds.playTap();
                          setAvailableBank(prev => prev.filter((_, i) => i !== idx));
                          setAssembledWords(prev => [...prev, word]);
                        }}
                        className="duo-btn duo-btn-outline px-3.5 py-2 rounded-xl text-sm font-black cursor-pointer"
                      >
                        {word}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        )}
        </div>
      </main>

      {/* 3. Chân Bài Học & Hộp Thoại Đánh Giá (Footer) */}
      {evalState !== 'completed' && (
        <footer
          className={`shrink-0 border-t-2 p-3 sm:p-4 transition-all z-10 ${
            evalState === 'correct'
              ? (evalFeedback ? 'bg-amber-100 dark:bg-amber-950 border-amber-400' : 'bg-emerald-100 dark:bg-emerald-950 border-emerald-400')
              : evalState === 'wrong'
              ? 'bg-rose-100 dark:bg-rose-950 border-rose-400'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
          }`}
          style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 14px)' }}
        >
          <div className="max-w-xl mx-auto flex items-center justify-between gap-3 sm:gap-4">
            {evalState === 'correct' ? (
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div className="min-w-0">
                  <h4 className="font-black text-emerald-800 dark:text-emerald-300 text-sm sm:text-base truncate">
                    {evalFeedback ? 'Rất tốt! (Có lưu ý nhỏ)' : 'Tuyệt vời! Chính xác!'}
                  </h4>
                  {evalFeedback ? (
                    <p className="text-xs text-amber-800 dark:text-amber-300 font-extrabold">
                      {evalFeedback}
                    </p>
                  ) : (
                    <p className="text-xs text-emerald-700 dark:text-emerald-400 font-bold">
                      +{totalXP} XP
                    </p>
                  )}
                </div>
              </div>
            ) : evalState === 'wrong' ? (
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                <XCircle className="w-7 h-7 sm:w-8 sm:h-8 text-rose-600 dark:text-rose-400 shrink-0" />
                <div className="min-w-0 flex-1 space-y-1">
                  <h4 className="font-black text-rose-800 dark:text-rose-300 text-xs sm:text-sm">
                    {evalFeedback || 'Chưa chính xác.'}
                  </h4>
                  {evalDiff && evalDiff.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {evalDiff.map((d, i) => (
                        <span
                          key={i}
                          className={`text-xs px-1.5 py-0.5 rounded-md font-bold ${
                            d.status === 'correct'
                              ? 'bg-emerald-200 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200'
                              : 'bg-rose-200 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200 line-through'
                          }`}
                        >
                          {d.word}
                        </span>
                      ))}
                    </div>
                  )}
                  <button
                    onClick={() => openAiTutor({
                      question: formatPromptByLanguage(currentExercise?.prompt || currentExercise?.vietnamese_meaning, currentLang),
                      userAnswer: selectedOption || assembledWords.join(' ') || typedDictation || speechResult?.spoken,
                      correctAnswer: currentExercise?.correct_answer,
                      hint: formatPromptByLanguage(currentExercise?.hint, currentLang)
                    })}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white/90 dark:bg-slate-800 text-rose-700 dark:text-rose-300 font-extrabold text-[11px] hover:bg-white shadow-xs border border-rose-300 dark:border-rose-700 transition-all cursor-pointer"
                  >
                    <Bot className="w-3 h-3 text-rose-500 shrink-0" />
                    <span className="truncate">Hỏi Gia Sư AI Giải Thích Lỗi</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="hidden sm:block text-xs font-semibold text-slate-400 flex-1">
                Hãy hoàn thành bài tập rồi nhấn Kiểm Tra
              </div>
            )}

            {/* Action Button: Check vs Continue */}
            {evalState === null ? (
              <button
                onClick={handleCheck}
                disabled={!canCheck()}
                className={`duo-btn text-xs sm:text-sm uppercase px-5 sm:px-8 py-3 sm:py-3.5 rounded-2xl font-black shrink-0 ${
                  canCheck()
                    ? 'duo-btn-green cursor-pointer'
                    : 'duo-btn-gray opacity-50 cursor-not-allowed'
                }`}
              >
                {currentExercise?.type === 'preview' || currentExercise?.type === 'flashcard_chunk' ? 'Đã Hiểu / Tiếp Tục' : 'Kiểm Tra'}
              </button>
            ) : (
              <button
                onClick={handleContinue}
                className={`duo-btn text-xs sm:text-sm uppercase px-5 sm:px-8 py-3 sm:py-3.5 rounded-2xl font-black shrink-0 cursor-pointer ${
                  evalState === 'correct' ? 'duo-btn-green' : 'duo-btn-red'
                }`}
              >
                Tiếp Tục
              </button>
            )}
          </div>
        </footer>
      )}

      {/* Quit Confirmation Dialog */}
      {showQuitConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="duo-card max-w-sm w-full p-6 text-center space-y-4 shadow-2xl animate-in zoom-in-95 border-2 border-slate-200 dark:border-slate-800">
            <div className="w-16 h-16 rounded-3xl bg-amber-100 dark:bg-amber-950/60 border-2 border-amber-300 dark:border-amber-700 flex items-center justify-center mx-auto text-amber-500 shadow-sm">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Bạn có chắc muốn thoát?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                Tiến trình bài học và điểm thưởng kinh nghiệm (XP) sẽ không được lưu nếu bạn rời đi bây giờ.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  sounds.playTap();
                  setShowQuitConfirm(false);
                }}
                className="duo-btn duo-btn-green w-full py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider shadow-md cursor-pointer"
              >
                Ở Lại Học Tiếp
              </button>

              <button
                onClick={handleConfirmQuit}
                className="w-full py-2.5 rounded-xl text-xs font-black text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all uppercase tracking-wider cursor-pointer"
              >
                Thoát Bài Học
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonModal;
