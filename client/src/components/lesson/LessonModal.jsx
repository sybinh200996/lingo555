import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { speech } from '../../services/speechService';
import { sounds } from '../../services/soundEffects';
import { HanziCanvas } from './HanziCanvas';
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
  Bot
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
  const [hanziDone, setHanziDone] = useState(false);

  // Evaluation states: null | 'correct' | 'wrong' | 'completed'
  const [evalState, setEvalState] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalXP, setTotalXP] = useState(15);

  useEffect(() => {
    if (activeLessonId) {
      loadLessonData();
    }
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
    setEvalState(null);
    setHanziDone(false);
    setSelectedPairLeft(null);
    setMatchedPairs({});

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
      speech.stopListening();
      setIsSpeakingListening(false);
      return;
    }

    setIsSpeakingListening(true);
    setSpeechResult(null);

    speech.startListening({
      lang: currentLang,
      onResult: (transcript, confidence) => {
        setIsSpeakingListening(false);
        const evalScore = speech.evaluatePronunciation(
          transcript,
          currentExercise.target_text,
          currentLang,
          confidence,
          currentExercise.phonetic
        );
        setSpeechResult(evalScore);
      },
      onError: (err) => {
        setIsSpeakingListening(false);
        console.warn('Speech error:', err);
      },
      onEnd: () => {
        setIsSpeakingListening(false);
      }
    });
  };

  // Check answer logic
  const handleCheck = () => {
    if (!currentExercise) return;

    let isCorrect = false;

    if (currentExercise.type === 'listening') {
      isCorrect = selectedOption === currentExercise.correct_answer;
    } else if (currentExercise.type === 'dictation' || currentExercise.type === 'translation') {
      const assembledSentence = assembledWords.join(' ').trim();
      const targetSentence = currentExercise.correct_answer.trim();
      // Compare ignoring punctuation differences
      const cleanAssembled = assembledSentence.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()？!。，、]/g, '').trim();
      const cleanTarget = targetSentence.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()？!。，、]/g, '').trim();
      isCorrect = cleanAssembled.toLowerCase() === cleanTarget.toLowerCase();
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

  if (!activeLessonId) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-slate-950 flex flex-col justify-between overflow-hidden animate-in fade-in duration-200">
      {/* Top Header Bar */}
      <div className="max-w-2xl w-full mx-auto px-4 py-4 flex items-center gap-4">
        {/* Close Button */}
        <button
          onClick={closeLesson}
          className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl"
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
                  {Math.round(((correctCount) / exercises.length) * 100)}%
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

                  {/* Mic Button */}
                  <div className="py-4">
                    <button
                      onClick={handleToggleMic}
                      className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto shadow-xl transition-all ${
                        isSpeakingListening
                          ? 'bg-rose-500 text-white animate-pulse border-4 border-rose-300 scale-110'
                          : 'duo-btn duo-btn-blue text-white'
                      }`}
                    >
                      {isSpeakingListening ? (
                        <MicOff className="w-10 h-10 animate-bounce" />
                      ) : (
                        <Mic className="w-10 h-10" />
                      )}
                    </button>
                    <p className="text-xs font-bold text-slate-400 mt-3">
                      {isSpeakingListening
                        ? 'Đang lắng nghe bạn nói... (Hãy nói to rõ ràng)'
                        : 'Bấm mic để bắt đầu phát âm'}
                    </p>
                  </div>

                  {/* Speech Evaluation Feedback (Green / Red per word) */}
                  {speechResult && (
                    <div className="duo-card p-4 text-left space-y-3 animate-in fade-in">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase text-slate-400">
                          Kết quả nhận diện:
                        </span>
                        <span
                          className={`text-sm font-black px-2.5 py-0.5 rounded-full ${
                            speechResult.isPass
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                              : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                          }`}
                        >
                          {speechResult.score}% Chuẩn xác {speechResult.isPass ? '✓ Đạt' : '✗ Chưa đạt'}
                        </span>
                      </div>

                      {/* What microphone heard */}
                      <div className="text-xs bg-slate-100 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                        <span className="text-slate-400 font-semibold">Micro thu được: </span>
                        <strong className="text-slate-800 dark:text-slate-200 font-black">
                          "{speechResult.spoken}"
                        </strong>
                      </div>

                      {/* Word by word breakdown with Green/Red highlights */}
                      <div className="space-y-1">
                        <span className="text-[11px] font-bold text-slate-400 uppercase">Đối chiếu từng âm:</span>
                        <div className="flex flex-wrap gap-2 text-xl font-black pt-1">
                          {speechResult.words.map((item, i) => (
                            <span
                              key={i}
                              className={`px-2.5 py-1 rounded-lg border-2 ${
                                item.correct
                                  ? 'bg-emerald-100 text-emerald-700 border-emerald-400 dark:bg-emerald-950/60 dark:text-emerald-300'
                                  : 'bg-rose-100 text-rose-700 border-rose-400 dark:bg-rose-950/60 dark:text-rose-300'
                              }`}
                            >
                              {item.word}
                            </span>
                          ))}
                        </div>
                      </div>

                      <p className={`text-xs font-bold ${speechResult.isPass ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'}`}>
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
                  <div className="flex flex-wrap gap-2.5 justify-center pt-2">
                    {availableBank.map((word, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          sounds.playTap();
                          setAvailableBank(prev => prev.filter((_, i) => i !== idx));
                          setAssembledWords(prev => [...prev, word]);
                        }}
                        className="duo-btn duo-btn-outline px-4 py-2.5 rounded-xl text-sm font-black"
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

      {/* Bottom Evaluation Banner (Green / Red / Neutral) */}
      {evalState !== 'completed' && (
        <div
          className={`border-t-2 p-4 transition-all ${
            evalState === 'correct'
              ? 'bg-emerald-100 dark:bg-emerald-950 border-emerald-400'
              : evalState === 'wrong'
              ? 'bg-rose-100 dark:bg-rose-950 border-rose-400'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
          }`}
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
    </div>
  );
};
