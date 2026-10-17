import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { speech, normalizeSpeechText } from '../../services/speechService';
import { sounds } from '../../services/soundEffects';
import { HanziCanvas } from './HanziCanvas';
import { TonePitchCanvas } from './TonePitchCanvas';
import { questTracker } from '../../utils/questTracker';
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
  Square
} from 'lucide-react';

export const LessonModal = () => {
  const { activeLessonId, closeLesson, currentLang, userProfile, loseHeart, openAiTutor } = useApp();

  const [lesson, setLesson] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Exercise interaction states
  const [selectedOption, setSelectedOption] = useState(null); // for listening/multiple choice
  const [assembledWords, setAssembledWords] = useState([]); // for word bank / dictation / translation
  const [availableBank, setAvailableBank] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState({}); // for matching pairs
  const [selectedPairLeft, setSelectedPairLeft] = useState(null);
  const [isSpeakingListening, setIsSpeakingListening] = useState(false);
  const [speechResult, setSpeechResult] = useState(null);
  const [interimSpeechText, setInterimSpeechText] = useState('');
  const [hanziDone, setHanziDone] = useState(false);

  // Microphone compatibility & text fallback states
  const [micError, setMicError] = useState(null);
  const [useTextFallback, setUseTextFallback] = useState(false);
  const [fallbackText, setFallbackText] = useState('');
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);

  // Evaluation states: null | 'correct' | 'wrong' | 'completed'
  const [evalState, setEvalState] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalXP, setTotalXP] = useState(15);

  // Intercept browser / mobile edge-swipe Back gestures to protect learner progress
  useEffect(() => {
    if (!activeLessonId) return;

    // Push state so back gesture doesn't jump immediately to another website
    window.history.pushState({ modal: 'lesson' }, '', window.location.href);

    const handlePopState = () => {
      if (evalState === 'completed') {
        closeLesson();
      } else {
        // Re-push state to prevent leaving, then trigger confirmation popup
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
      speech.stopListening();
      speech.stopSpeaking();
    };
  }, [activeLessonId]);

  const loadLessonData = async () => {
    setLoading(true);
    try {
      const data = await api.getLesson(activeLessonId);
      setLesson(data);
      setExercises(data.exercises || []);
      setTotalXP(data.xp_reward || 15);
      setCurrentIndex(0);
      setEvalState(null);
      setCorrectCount(0);
      if (data.exercises && data.exercises.length > 0) {
        initExercise(data.exercises[0]);
      }
    } catch (e) {
      console.warn('Failed to load lesson:', e);
    } finally {
      setLoading(false);
    }
  };

  const initExercise = (ex) => {
    setSelectedOption(null);
    setSpeechResult(null);
    setInterimSpeechText('');
    setEvalState(null);
    setHanziDone(false);
    setSelectedPairLeft(null);
    setMatchedPairs({});
    setMicError(null);
    setFallbackText('');

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

    if (ex.type === 'dictation' || ex.type === 'translation') {
      const words = Array.isArray(ex.options) ? [...ex.options] : [];
      // shuffle
      words.sort(() => Math.random() - 0.5);
      setAvailableBank(words);
      setAssembledWords([]);
    }

    // Auto-play audio for listening exercises
    if (ex.type === 'listening' && ex.target_audio_text) {
      setTimeout(() => {
        speech.speak(ex.target_audio_text, currentLang, 1.0);
      }, 300);
    }
  };

  const currentExercise = exercises[currentIndex];
  const progressPercent = exercises.length > 0 ? ((currentIndex) / exercises.length) * 100 : 0;

  // Speech input trigger
  const handleToggleMic = () => {
    if (isSpeakingListening) {
      sounds.playTap();
      speech.stopListening();
      setIsSpeakingListening(false);
      return;
    }

    if (!speech.isRecognitionSupported()) {
      setMicError('Trình duyệt hiện tại chưa hỗ trợ Web Speech API nhận diện giọng nói. Vui lòng nhập văn bản thay thế hoặc bỏ qua câu nói.');
      setUseTextFallback(true);
      return;
    }

    sounds.playTap();
    setIsSpeakingListening(true);
    setSpeechResult(null);
    setMicError(null);
    setInterimSpeechText('');

    speech.startListening({
      lang: currentLang,
      maxDuration: 25000,
      silenceTimeout: 3500,
      onInterim: (liveText) => {
        setInterimSpeechText(liveText);
      },
      onResult: (transcript, confidence, alternatives) => {
        setIsSpeakingListening(false);
        setInterimSpeechText('');
        setMicError(null);
        const evalScore = speech.evaluatePronunciation(
          transcript,
          currentExercise.target_text,
          currentLang,
          confidence,
          currentExercise.phonetic,
          alternatives
        );
        setSpeechResult(evalScore);
        if (evalScore && evalScore.score >= 85) {
          questTracker.increment('speaking', 1);
        }
      },
      onError: (err) => {
        setIsSpeakingListening(false);
        setInterimSpeechText('');
        console.warn('Speech error:', err);
        if (err === 'not-allowed' || err === 'permission-denied') {
          setMicError('Quyền truy cập Microphone bị từ chối hoặc bị chặn trên trình duyệt. Vui lòng cấp quyền Micro hoặc nhập văn bản thay thế.');
          setUseTextFallback(true);
        } else if (err === 'no-speech') {
          setMicError('Không nhận được âm thanh. Hãy bấm lại mic và nói to, rõ ràng hơn.');
        } else if (err === 'audio-capture') {
          setMicError('Không tìm thấy thiết bị Microphone trên máy tính/điện thoại.');
          setUseTextFallback(true);
        } else {
          setMicError(`Không thể thu âm Micro (${err}). Bạn có thể nhập văn bản thay thế hoặc bỏ qua.`);
        }
      },
      onEnd: () => {
        setIsSpeakingListening(false);
      }
    });
  };

  // Submit typed text fallback when mic is unavailable or denied
  const handleSubmitFallbackText = (e) => {
    if (e) e.preventDefault();
    if (!fallbackText.trim()) return;
    sounds.playTap();
    const evalScore = speech.evaluatePronunciation(
      fallbackText.trim(),
      currentExercise.target_text,
      currentLang,
      1.0,
      currentExercise.phonetic,
      []
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

  // Check answer logic with standardized Text Normalizer
  const handleCheck = () => {
    if (!currentExercise) return;

    let isCorrect = false;

    if (currentExercise.type === 'listening') {
      isCorrect = normalizeSpeechText(selectedOption) === normalizeSpeechText(currentExercise.correct_answer);
    } else if (currentExercise.type === 'dictation' || currentExercise.type === 'translation') {
      const assembledSentence = assembledWords.join(' ').trim();
      const targetSentence = (currentExercise.correct_answer || '').trim();
      // Normalize both sentences ignoring punctuation and whitespace
      isCorrect = normalizeSpeechText(assembledSentence) === normalizeSpeechText(targetSentence);
    } else if (currentExercise.type === 'speaking') {
      isCorrect = speechResult && speechResult.isPass;
    } else if (currentExercise.type === 'writing') {
      isCorrect = hanziDone;
    } else if (currentExercise.type === 'matching') {
      // Checked dynamically as pairs complete
      isCorrect = true;
    }

    if (isCorrect) {
      sounds.playCorrect();
      setEvalState('correct');
      setCorrectCount(prev => prev + 1);
    } else {
      sounds.playWrong();
      setEvalState('wrong');
      loseHeart();
    }
  };

  // Continue to next exercise or complete
  const handleContinue = async () => {
    sounds.playTap();

    if (currentIndex + 1 < exercises.length) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      initExercise(exercises[nextIndex]);
    } else {
      // Completed all exercises!
      sounds.playFanfare();
      triggerConfetti();
      setEvalState('completed');

      const finalScore = Math.round(((correctCount + 1) / exercises.length) * 100);
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
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }
  };

  // Can check button be enabled?
  const canCheck = () => {
    if (!currentExercise || evalState !== null) return false;
    if (currentExercise.type === 'listening') return selectedOption !== null;
    if (currentExercise.type === 'dictation' || currentExercise.type === 'translation') {
      return assembledWords.length > 0;
    }
    if (currentExercise.type === 'speaking') return speechResult !== null;
    if (currentExercise.type === 'writing') return hanziDone;
    if (currentExercise.type === 'matching') {
      let pairs = [];
      try {
        pairs = currentExercise.options?.pairs || [];
      } catch (e) {}
      return pairs.length > 0 && Object.keys(matchedPairs).length === pairs.length;
    }
    return true;
  };

  // Desktop Keyboard Shortcuts: Enter (Check/Continue), 1-4 (Options), Space (Replay audio)
  useEffect(() => {
    if (!activeLessonId) return;

    const handleKeyDown = (e) => {
      const targetTag = document.activeElement?.tagName?.toLowerCase();
      if (targetTag === 'input' || targetTag === 'textarea' || document.activeElement?.isContentEditable) {
        return;
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        if (evalState === 'completed') {
          closeLesson();
        } else if (evalState === null) {
          if (canCheck()) {
            handleCheck();
          }
        } else {
          handleContinue();
        }
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        if (currentExercise?.target_audio_text) {
          sounds.playTap();
          speech.speak(currentExercise.target_audio_text, currentLang, 1.0);
        } else if (currentExercise?.target_text) {
          sounds.playTap();
          speech.speak(currentExercise.target_text, currentLang, 1.0);
        }
      } else if (['1', '2', '3', '4'].includes(e.key)) {
        if (evalState === null && currentExercise?.type === 'listening' && Array.isArray(currentExercise?.options)) {
          const idx = parseInt(e.key, 10) - 1;
          if (idx >= 0 && idx < currentExercise.options.length) {
            e.preventDefault();
            sounds.playTap();
            setSelectedOption(currentExercise.options[idx]);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLessonId, evalState, currentExercise, selectedOption, assembledWords, speechResult, hanziDone, matchedPairs]);

  const handleRequestClose = () => {
    sounds.playTap();
    if (evalState === 'completed') {
      closeLesson();
    } else {
      setShowQuitConfirm(true);
    }
  };

  const handleConfirmQuit = () => {
    sounds.playTap();
    setShowQuitConfirm(false);
    closeLesson();
  };

  if (!activeLessonId) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-slate-950 flex flex-col justify-between overflow-hidden animate-in fade-in duration-200">
      {/* Top Header Bar */}
      <div className="max-w-2xl w-full mx-auto px-4 py-4 flex items-center gap-4">
        {/* Close Button with Confirmation Guard */}
        <button
          onClick={handleRequestClose}
          className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl"
          title="Thoát bài học"
        >
          <X className="w-6 h-6 stroke-[2.5]" />
        </button>

        {/* Smooth Progress Bar */}
        <div className="flex-1 bg-slate-200 dark:bg-slate-800 h-4 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Hearts Indicator */}
        <div className="flex items-center gap-1.5 text-rose-500 font-extrabold text-sm">
          <Heart className="w-6 h-6 fill-rose-500" />
          <span>{userProfile.hearts}</span>
        </div>
      </div>

      {/* Main Exercise Viewport */}
      <div className="flex-1 max-w-xl w-full mx-auto px-4 py-4 overflow-y-auto flex flex-col justify-center">
        {loading ? (
          <div className="text-center py-20 text-slate-400">
            <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="font-bold text-sm">Đang tải bài học...</p>
          </div>
        ) : evalState === 'completed' ? (
          /* Lesson Completed Celebration View */
          <div className="text-center py-8 space-y-6 animate-in zoom-in-95">
            <div className="w-24 h-24 mx-auto rounded-3xl bg-amber-400 border-b-6 border-amber-600 flex items-center justify-center text-white shadow-xl animate-bounce-short">
              <Trophy className="w-12 h-12" />
            </div>

            <div>
              <h2 className="text-3xl font-black text-slate-800 dark:text-white">
                Hoàn Thành Xuất Sắc!
              </h2>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">
                Bạn đã hoàn thành trọn vẹn bài học "{lesson?.title}"
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
              <div className="duo-card p-4">
                <span className="text-xs font-bold text-slate-400 uppercase">Kinh Nghiệm</span>
                <p className="text-2xl font-black text-amber-500 mt-1">+{totalXP} XP</p>
              </div>
              <div className="duo-card p-4">
                <span className="text-xs font-bold text-slate-400 uppercase">Độ Chính Xác</span>
                <p className="text-2xl font-black text-emerald-500 mt-1">
                  {exercises.length > 0 ? Math.round(((correctCount) / exercises.length) * 100) : 100}%
                </p>
              </div>
            </div>

            <button
              onClick={closeLesson}
              className="duo-btn duo-btn-green w-full max-w-sm py-4 rounded-2xl text-base uppercase tracking-wider mx-auto"
            >
              Tiếp Tục Lộ Trình
            </button>
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
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">
                Bài học "{lesson?.title}" sẽ sớm có thêm các câu hỏi nâng cao.
              </p>
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
                  {currentExercise.prompt}
                </h3>
              </div>

              {/* 1. LISTENING EXERCISE */}
              {currentExercise.type === 'listening' && (
                <div className="space-y-6">
                  {/* Audio Controls (Normal & Turtle) */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        sounds.playTap();
                        speech.speak(currentExercise.target_audio_text, currentLang, 1.0);
                      }}
                      className="duo-btn duo-btn-blue p-4 rounded-2xl shadow-md"
                      title="Nghe tốc độ bình thường (1.0x)"
                    >
                      <Volume2 className="w-8 h-8 text-white" />
                    </button>

                    <button
                      onClick={() => {
                        sounds.playTap();
                        speech.speak(currentExercise.target_audio_text, currentLang, 0.7);
                      }}
                      className="duo-btn duo-btn-yellow p-4 rounded-2xl shadow-md"
                      title="Nghe chậm rùa bò (0.7x)"
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

                  {/* Options Grid */}
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

              {/* 2. SPEAKING EXERCISE WITH MICROPHONE & COLOR EVALUATION */}
              {currentExercise.type === 'speaking' && (
                <div className="space-y-6 text-center">
                  {/* Target Phrase Box */}
                  <div className="duo-card p-6 inline-block w-full">
                    <button
                      onClick={() => speech.speak(currentExercise.target_text, currentLang, 1.0)}
                      className="inline-flex items-center gap-2 text-emerald-500 hover:text-emerald-600 mb-2 font-bold text-xs"
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

                  {/* Real-time Chinese Tone Pitch Visualizer */}
                  {currentLang === 'zh' && (
                    <TonePitchCanvas 
                      targetText={currentExercise.target_text} 
                      phonetic={currentExercise.phonetic}
                      isListening={isSpeakingListening}
                    />
                  )}

                  {/* Browser Compatibility & Microphone Access Notification */}
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

                      {/* Action buttons so learner is never stuck */}
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

                  {/* Text Input Fallback Mode */}
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

                      <div className="flex items-center justify-between pt-1">
                        <p className="text-[11px] text-slate-400">
                          Áp dụng thuật toán Levenshtein Distance tính % chính xác và tô màu Xanh/Đỏ.
                        </p>
                        <button
                          type="button"
                          onClick={handleSkipSpeaking}
                          className="text-xs text-slate-400 hover:text-emerald-500 font-bold underline"
                        >
                          Bỏ qua câu này
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* Standard Mic Button Mode */
                    <div className="py-2 space-y-4">
                      {/* Live Interim Caption Box when user is actively speaking */}
                      {isSpeakingListening && (
                        <div className="duo-card p-4 bg-sky-50 dark:bg-sky-950/40 border-2 border-sky-300 dark:border-sky-700 animate-in fade-in max-w-lg mx-auto">
                          <div className="flex items-center justify-center gap-2 text-sky-600 dark:text-sky-400 font-extrabold text-xs uppercase tracking-wider mb-1">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping inline-block" />
                            <span>Đang thu âm liên tục...</span>
                          </div>
                          <p className="text-base font-black text-slate-800 dark:text-white min-h-[1.75rem] px-2 py-1 bg-white/70 dark:bg-slate-900/70 rounded-xl border border-sky-200 dark:border-sky-800">
                            {interimSpeechText ? `"${interimSpeechText}"` : 'Hãy bắt đầu đọc to toàn bộ câu...'}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                            💡 Đọc chậm rãi, rõ từng chữ. Khi đọc xong, bấm <strong>"Dừng &amp; Chấm Điểm"</strong> hoặc ngừng 3.5 giây máy sẽ tự chấm.
                          </p>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <button
                          onClick={handleToggleMic}
                          className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto sm:mx-0 shadow-xl transition-all ${
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

                        {/* Quick Stop & Submit Button when mic is active */}
                        {isSpeakingListening && (
                          <button
                            onClick={handleToggleMic}
                            className="duo-btn duo-btn-green py-3 px-5 rounded-2xl font-black text-sm flex items-center gap-2 shadow-lg animate-in zoom-in-95"
                          >
                            <CheckCircle2 className="w-5 h-5" />
                            <span>Dừng &amp; Chấm Điểm Ngay</span>
                          </button>
                        )}
                      </div>

                      {/* Dynamic Audio Waveform Animation while listening */}
                      {isSpeakingListening && (
                        <div className="flex items-center justify-center gap-1.5 py-1">
                          <span className="w-1.5 h-4 bg-rose-500 rounded-full animate-bounce" style={{ animationDelay: '0ms', animationDuration: '600ms' }} />
                          <span className="w-1.5 h-8 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '150ms', animationDuration: '600ms' }} />
                          <span className="w-1.5 h-10 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms', animationDuration: '600ms' }} />
                          <span className="w-1.5 h-6 bg-sky-500 rounded-full animate-bounce" style={{ animationDelay: '200ms', animationDuration: '600ms' }} />
                          <span className="w-1.5 h-9 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '400ms', animationDuration: '600ms' }} />
                          <span className="w-1.5 h-5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '100ms', animationDuration: '600ms' }} />
                        </div>
                      )}

                      <p className="text-xs font-bold text-slate-400 mt-1">
                        {isSpeakingListening
                          ? 'Đang lắng nghe... Đọc thoải mái cả câu, không bị giới hạn thời gian gấp.'
                          : 'Bấm mic để bắt đầu phát âm (Thu âm liên tục, không tắt sớm)'}
                      </p>

                      <div className="flex items-center justify-center gap-3 mt-3">
                        <button
                          type="button"
                          onClick={() => setUseTextFallback(true)}
                          className="text-xs text-sky-600 dark:text-sky-400 hover:underline font-bold flex items-center gap-1"
                        >
                          <Keyboard className="w-3.5 h-3.5" />
                          <span>Gõ phím thay thế</span>
                        </button>
                        <span className="text-slate-300 dark:text-slate-700">•</span>
                        <button
                          type="button"
                          onClick={handleSkipSpeaking}
                          className="text-xs text-slate-400 hover:text-emerald-500 hover:underline font-bold flex items-center gap-1"
                        >
                          <SkipForward className="w-3.5 h-3.5" />
                          <span>Bỏ qua câu nói</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Speech Evaluation Feedback with Levenshtein Similarity & Color Chips */}
                  {speechResult && (
                    <div className="duo-card p-4 sm:p-5 text-left space-y-4 animate-in fade-in">
                      {/* Score Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-emerald-500" />
                          <span className="text-xs font-black uppercase text-slate-500 dark:text-slate-400 tracking-wider">
                            Độ Tương Đồng Phát Âm (Levenshtein)
                          </span>
                        </div>
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

                      {/* Microphone Comparison Card */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div className="bg-slate-100 dark:bg-slate-800/80 p-3 rounded-2xl border border-slate-200 dark:border-slate-700/80">
                          <span className="text-slate-400 font-bold block mb-0.5">Nội dung đã nhận/nhập:</span>
                          <strong className="text-slate-800 dark:text-slate-100 font-black text-sm">
                            "{speechResult.spoken}"
                          </strong>
                        </div>
                        <div className="bg-emerald-50/60 dark:bg-emerald-950/30 p-3 rounded-2xl border border-emerald-200 dark:border-emerald-800/60">
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold block mb-0.5">Mục tiêu chuẩn:</span>
                          <strong className="text-emerald-800 dark:text-emerald-200 font-black text-sm">
                            "{currentExercise.target_text}"
                          </strong>
                        </div>
                      </div>

                      {/* Word by word breakdown with Vivid Green/Red/Yellow Chips */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
                            Chi tiết từng từ (Bấm để nghe phát âm):
                          </span>
                          <div className="flex items-center gap-3 text-[10px] font-bold">
                            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />Đúng (Xanh)
                            </span>
                            <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />Gần đúng (Vàng)
                            </span>
                            <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400">
                              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />Sai (Đỏ)
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-1">
                          {speechResult.words.map((item, i) => {
                            const isCorrect = item.status === 'correct';
                            const isNear = item.status === 'near';
                            return (
                              <button
                                key={i}
                                type="button"
                                onClick={() => speech.speak(item.word, currentLang, 0.8)}
                                title={item.note || 'Bấm để nghe phát âm'}
                                className={`px-3 py-2 rounded-xl font-black text-base flex flex-col items-center gap-0.5 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xs ${
                                  isCorrect
                                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white border-b-4 border-emerald-700'
                                    : isNear
                                    ? 'bg-amber-400 hover:bg-amber-500 text-amber-950 border-b-4 border-amber-600'
                                    : 'bg-rose-500 hover:bg-rose-600 text-white border-b-4 border-rose-700'
                                }`}
                              >
                                <span>{item.word}</span>
                                <span className="text-[10px] font-bold opacity-90 leading-tight">
                                  {isCorrect 
                                    ? `✓ Đúng (${item.score || 100}%)` 
                                    : isNear 
                                    ? `~ Gần đúng (${item.score}%)` 
                                    : `✗ Sai (${item.score || 0}%)`}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Deep Phonetic Diagnostics & Coach Advice Panel */}
                      {speechResult.critique && (
                        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-sky-50 to-indigo-50 dark:from-sky-950/40 dark:to-indigo-950/40 border border-sky-200 dark:border-sky-800/60 text-xs space-y-2">
                          <div className="flex items-center gap-2">
                            <Bot className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                            <span className="font-black text-sky-900 dark:text-sky-200 uppercase tracking-wider">
                              Phân Tích Chuyên Sâu ({speechResult.critique.category})
                            </span>
                          </div>

                          <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                            {speechResult.critique.observation}
                          </p>

                          <div className="pt-1 border-t border-sky-200/60 dark:border-sky-800/60 text-emerald-800 dark:text-emerald-300 font-bold flex items-start gap-1.5">
                            <span className="shrink-0">💡</span>
                            <span>Lời khuyên khẩu hình: {speechResult.critique.advice}</span>
                          </div>

                          {speechResult.diagnostics && speechResult.diagnostics.length > 0 && (
                            <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-slate-600 dark:text-slate-400 pt-1">
                              {speechResult.diagnostics.map((d, dIdx) => (
                                <li key={dIdx}>{d}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}

                      <p className={`text-xs font-black ${speechResult.isPass ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                        {speechResult.feedback}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* 3. HANZI WRITING EXERCISE */}
              {currentExercise.type === 'writing' && (
                <div className="space-y-4 text-center">
                  <div className="text-center mb-2">
                    <span className="text-xs font-bold text-slate-400">Chữ Hán:</span>
                    <h4 className="text-2xl font-black text-slate-800 dark:text-white">
                      {currentExercise.target_text} [{currentExercise.phonetic}]
                    </h4>
                    <p className="text-xs text-slate-500">{currentExercise.vietnamese_meaning}</p>
                  </div>

                  {/* HanziWriter Canvas */}
                  <HanziCanvas
                    character={currentExercise.stroke_char || currentExercise.target_text.charAt(0)}
                    onComplete={() => {
                      setHanziDone(true);
                    }}
                    size={220}
                  />

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

              {/* 4. MATCHING PAIRS EXERCISE */}
              {currentExercise.type === 'matching' && (
                <div className="space-y-4">
                  <p className="text-xs font-bold text-slate-400">
                    Bấm vào một từ bên trái rồi bấm vào nghĩa tương ứng bên phải:
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Left Items */}
                    <div className="space-y-2">
                      {currentExercise.options?.pairs?.map((pair, idx) => {
                        const isMatched = !!matchedPairs[pair.left];
                        const isSelected = selectedPairLeft === pair.left;
                        return (
                          <button
                            key={idx}
                            disabled={isMatched}
                            onClick={() => {
                              sounds.playTap();
                              setSelectedPairLeft(pair.left);
                            }}
                            className={`w-full p-3.5 rounded-xl font-bold text-sm text-left transition-all border-2 border-b-4 ${
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
                      {currentExercise.options?.pairs?.map((pair, idx) => {
                        const isMatched = Object.values(matchedPairs).includes(pair.right);
                        return (
                          <button
                            key={idx}
                            disabled={isMatched}
                            onClick={() => {
                              if (!selectedPairLeft) return;
                              // Check if match
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
                            className={`w-full p-3.5 rounded-xl font-bold text-sm text-left transition-all border-2 border-b-4 ${
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

              {/* 5. DICTATION & TRANSLATION WORD BANK ASSEMBLY */}
              {(currentExercise.type === 'dictation' || currentExercise.type === 'translation') && (
                <div className="space-y-6">
                  {/* Prompt Box */}
                  <div className="duo-card p-4 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase">Câu hỏi:</span>
                      <p className="text-lg font-black text-slate-800 dark:text-white mt-0.5">
                        {currentExercise.vietnamese_meaning}
                      </p>
                    </div>
                    {currentExercise.target_audio_text && (
                      <button
                        onClick={() => {
                          sounds.playTap();
                          speech.speak(currentExercise.target_audio_text, currentLang, 1.0);
                        }}
                        className="p-3 bg-sky-500 text-white rounded-xl shadow-xs"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  {/* Assembled Sentence Drop Area */}
                  <div className="min-h-24 p-4 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-wrap gap-2 items-center bg-slate-50/50 dark:bg-slate-900/50">
                    {assembledWords.length === 0 ? (
                      <span className="text-xs font-semibold text-slate-400">
                        Bấm vào các thẻ từ bên dưới để ghép câu...
                      </span>
                    ) : (
                      assembledWords.map((word, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            sounds.playTap();
                            // Remove from assembled, return to bank
                            setAssembledWords(prev => prev.filter((_, i) => i !== idx));
                            setAvailableBank(prev => [...prev, word]);
                          }}
                          className="duo-btn duo-btn-outline px-3.5 py-2 rounded-xl text-sm font-black animate-in zoom-in-95"
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
                        className="duo-btn duo-btn-outline px-3.5 py-2 rounded-xl text-sm font-black"
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

      {/* Bottom Evaluation Banner (Green / Red / Neutral) with iPhone Safe Area */}
      {evalState !== 'completed' && (
        <div
          className={`border-t-2 p-4 transition-all ${
            evalState === 'correct'
              ? 'bg-emerald-100 dark:bg-emerald-950 border-emerald-400'
              : evalState === 'wrong'
              ? 'bg-rose-100 dark:bg-rose-950 border-rose-400'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
          }`}
          style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 16px)' }}
        >
          <div className="max-w-xl mx-auto flex items-center justify-between gap-4">
            {evalState === 'correct' ? (
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                <div>
                  <h4 className="font-black text-emerald-800 dark:text-emerald-300 text-base">
                    Tuyệt vời! Chính xác!
                  </h4>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400">
                    +{totalXP} XP
                  </p>
                </div>
              </div>
            ) : evalState === 'wrong' ? (
              <div className="flex items-center gap-3">
                <XCircle className="w-8 h-8 text-rose-600 dark:text-rose-400" />
                <div>
                  <h4 className="font-black text-rose-800 dark:text-rose-300 text-sm">
                    Đáp án đúng là:
                  </h4>
                  <p className="text-xs font-bold text-rose-700 dark:text-rose-400">
                    {currentExercise?.correct_answer}
                  </p>
                  <button
                    onClick={() => openAiTutor({
                      question: currentExercise?.prompt || currentExercise?.vietnamese_meaning,
                      userAnswer: selectedOption || assembledWords.join(' ') || speechResult?.spoken,
                      correctAnswer: currentExercise?.correct_answer,
                      hint: currentExercise?.hint
                    })}
                    className="mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/90 dark:bg-slate-800 text-rose-700 dark:text-rose-300 font-extrabold text-xs hover:bg-white shadow-xs border border-rose-300 dark:border-rose-700 transition-all cursor-pointer"
                  >
                    <Bot className="w-3.5 h-3.5 text-rose-500" />
                    <span>Tại sao sai? Hỏi Gia Sư AI</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="hidden sm:block text-xs font-semibold text-slate-400">
                Hãy hoàn thành bài tập rồi nhấn Kiểm Tra
              </div>
            )}

            {/* Action Button: Check vs Continue */}
            {evalState === null ? (
              <button
                onClick={handleCheck}
                disabled={!canCheck()}
                className={`duo-btn text-sm uppercase px-8 py-3.5 rounded-2xl font-black ${
                  canCheck()
                    ? 'duo-btn-green'
                    : 'duo-btn-gray opacity-50 cursor-not-allowed'
                }`}
              >
                Kiểm Tra
              </button>
            ) : (
              <button
                onClick={handleContinue}
                className={`duo-btn text-sm uppercase px-8 py-3.5 rounded-2xl font-black ${
                  evalState === 'correct' ? 'duo-btn-green' : 'duo-btn-red'
                }`}
              >
                Tiếp Tục
              </button>
            )}
          </div>
        </div>
      )}

      {/* Quit Confirmation Dialog (Duolingo Style Popup) */}
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
                className="duo-btn duo-btn-green w-full py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider shadow-md"
              >
                Ở Lại Học Tiếp
              </button>

              <button
                onClick={handleConfirmQuit}
                className="w-full py-2.5 rounded-xl text-xs font-black text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all uppercase tracking-wider"
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
