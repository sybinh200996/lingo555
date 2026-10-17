import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { speech } from '../../services/speechService';
import { sounds } from '../../services/soundEffects';
import { 
  X, 
  Volume2, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Trophy, 
  ArrowRight, 
  Brain,
  Zap,
  Target
} from 'lucide-react';

export const PlacementTestModal = ({ isOpen, onClose, onPlacementComplete }) => {
  const { currentLang, levels, switchLanguage, refreshProfile } = useApp();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentTier, setCurrentTier] = useState(2); // Start at Tier 2 (Intermediate)
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Question Banks: Adaptive questions mapped to tiers (1 to 4)
  const CHINESE_QUESTIONS = {
    1: [ // HSK 1
      {
        id: 'zh_1_1',
        type: 'vocab',
        prompt: 'Từ nào sau đây mang nghĩa là "Cảm ơn"?',
        target_text: '谢谢',
        phonetic: 'xièxiè',
        options: ['不客气', '谢谢', '再见', '你好'],
        correct: '谢谢',
        meaning: 'Cảm ơn'
      },
      {
        id: 'zh_1_2',
        type: 'listen',
        prompt: 'Nghe và chọn nghĩa tiếng Việt chính xác:',
        target_text: '我想喝水',
        phonetic: 'wǒ xiǎng hē shuǐ',
        options: ['Tôi muốn uống nước', 'Tôi muốn ăn cơm', 'Tôi thích học tiếng Trung', 'Tôi đi mua đồ'],
        correct: 'Tôi muốn uống nước',
        meaning: 'Tôi muốn uống nước'
      }
    ],
    2: [ // HSK 2
      {
        id: 'zh_2_1',
        type: 'grammar',
        prompt: 'Điền từ thích hợp vào chỗ trống: "今天天气很热，我们____游泳吧。"',
        target_text: '今天天气很热，我们去游泳吧。',
        phonetic: 'jīntiān tiānqì hěn rè, wǒmen qù yóuyǒng ba.',
        options: ['去', '在', '来', '着'],
        correct: '去',
        meaning: 'Hôm nay trời rất nóng, chúng ta đi bơi nhé.'
      },
      {
        id: 'zh_2_2',
        type: 'listen',
        prompt: 'Nghe và chọn câu đối thoại logic nhất:',
        target_text: '你是什么时候来北京的？',
        phonetic: 'nǐ shì shénme shíhou lái běijīng de?',
        options: ['我是坐飞机来的', '我是上个星期来的', '我和朋友一起来的', '北京非常漂亮'],
        correct: '我是上个星期来的',
        meaning: 'Bạn đến Bắc Kinh khi nào thế?'
      }
    ],
    3: [ // HSK 3
      {
        id: 'zh_3_1',
        type: 'vocab',
        prompt: 'Từ nào đồng nghĩa với "解决" (jiějué - giải quyết)?',
        target_text: '解决问题',
        phonetic: 'jiějué wèntí',
        options: ['处理', '讨论', '出现', '发现'],
        correct: '处理',
        meaning: 'Xử lý, giải quyết vấn đề'
      },
      {
        id: 'zh_3_2',
        type: 'reading',
        prompt: 'Chọn từ nối thích hợp: "他____学习努力，____成绩一直名列前茅。"',
        target_text: '他不仅学习努力，而且成绩一直名列前茅。',
        phonetic: 'tā bùjǐn xuéxí nǔlì, érqiě chéngjì yīzhí mínglièqiánmáo.',
        options: ['不仅...而且...', '虽然...但是...', '宁可...也不...', '哪怕...也...'],
        correct: '不仅...而且...',
        meaning: 'Anh ấy không những học hành chăm chỉ, mà còn...'
      }
    ],
    4: [ // HSK 4
      {
        id: 'zh_4_1',
        type: 'vocab',
        prompt: 'Chọn thành ngữ hoặc từ chuẩn xác: "只要坚持不懈，就一定能____成功。"',
        target_text: '获得成功',
        phonetic: 'huòdé chénggōng',
        options: ['取得', '经过', '适应', '禁止'],
        correct: '取得',
        meaning: 'Giành được / Đạt được thành công'
      },
      {
        id: 'zh_4_2',
        type: 'reading',
        prompt: '"无论遇到多大困难，他都从来没有放弃过。" Câu này thể hiện phẩm chất gì?',
        target_text: '坚持与毅力',
        phonetic: 'jiānchí yǔ yìlì',
        options: ['Kiên trì và nghị lực', 'Khiêm tốn và nhẫn nại', 'Nhiệt tình và cởi mở', 'Tò mò và ham học'],
        correct: 'Kiên trì và nghị lực',
        meaning: 'Dù gặp bao khó khăn, anh ấy cũng không bỏ cuộc.'
      }
    ]
  };

  const ENGLISH_QUESTIONS = {
    1: [ // A1
      {
        id: 'en_1_1',
        type: 'vocab',
        prompt: 'Choose the word that means "Bệnh viện":',
        target_text: 'Hospital',
        phonetic: '/ˈhɒspɪtl/',
        options: ['Library', 'Hospital', 'Restaurant', 'Airport'],
        correct: 'Hospital',
        meaning: 'Bệnh viện'
      },
      {
        id: 'en_1_2',
        type: 'grammar',
        prompt: 'Complete the sentence: "She ____ to music every evening."',
        target_text: 'She listens to music every evening.',
        phonetic: '/ʃiː ˈlɪsnz tuː ˈmjuːzɪk/',
        options: ['listen', 'listens', 'listening', 'listened'],
        correct: 'listens',
        meaning: 'Cô ấy nghe nhạc mỗi tối.'
      }
    ],
    2: [ // A2
      {
        id: 'en_2_1',
        type: 'listen',
        prompt: 'Listen and choose the correct response:',
        target_text: 'Would you mind helping me with this heavy suitcase?',
        phonetic: '/wʊd juː maɪnd ˈhɛlpɪŋ miː/',
        options: ['Not at all, let me give you a hand.', 'Yes, I mind a lot.', 'I am fine, thanks.', 'It is 5 o clock.'],
        correct: 'Not at all, let me give you a hand.',
        meaning: 'Bạn có phiền giúp tôi chiếc vali nặng này không?'
      },
      {
        id: 'en_2_2',
        type: 'grammar',
        prompt: 'Choose the correct form: "If it rains tomorrow, we ____ cancel the outdoor picnic."',
        target_text: 'we will cancel the picnic.',
        phonetic: '/wiː wɪl ˈkænsəl/',
        options: ['will', 'would', 'have', 'were'],
        correct: 'will',
        meaning: 'Nếu ngày mai trời mưa, chúng tôi sẽ hủy dã ngoại.'
      }
    ],
    3: [ // B1
      {
        id: 'en_3_1',
        type: 'vocab',
        prompt: 'Select the best synonym for "Significant":',
        target_text: 'Significant',
        phonetic: '/sɪɡˈnɪfɪkənt/',
        options: ['Crucial & Important', 'Minor & Tiny', 'Complicated', 'Accidental'],
        correct: 'Crucial & Important',
        meaning: 'Quan trọng, có ý nghĩa lớn'
      },
      {
        id: 'en_3_2',
        type: 'grammar',
        prompt: '"By the time she arrived at the station, the train ____."',
        target_text: 'the train had already departed.',
        phonetic: '/hæd ɔːlˈrɛdi dɪˈpɑːtɪd/',
        options: ['had already departed', 'has departed', 'departs', 'is departing'],
        correct: 'had already departed',
        meaning: 'Khi cô ấy đến ga thì tàu đã rời đi rồi.'
      }
    ],
    4: [ // B2
      {
        id: 'en_4_1',
        type: 'vocab',
        prompt: 'Which phrase means "To postpone an event until a later date"?',
        target_text: 'Put off',
        phonetic: '/pʊt ɒf/',
        options: ['Put off', 'Call off', 'Take over', 'Turn down'],
        correct: 'Put off',
        meaning: 'Trì hoãn, hoãn lại'
      },
      {
        id: 'en_4_2',
        type: 'reading',
        prompt: '"The initiative aims to curb greenhouse gas emissions." What does "curb" mean?',
        target_text: 'Curb',
        phonetic: '/kɜːb/',
        options: ['To limit and restrain', 'To increase dramatically', 'To measure accurately', 'To celebrate publicly'],
        correct: 'To limit and restrain',
        meaning: 'Hạn chế, kiềm chế'
      }
    ]
  };

  const questionsPool = currentLang === 'zh' ? CHINESE_QUESTIONS : ENGLISH_QUESTIONS;

  // Pick questions according to current tier
  const tierQuestions = questionsPool[currentTier] || questionsPool[2];
  const question = tierQuestions[currentQuestionIndex % tierQuestions.length];

  const handleSelectOption = (opt) => {
    if (isAnswerChecked) return;
    sounds.playTap();
    setSelectedOption(opt);
  };

  const handleCheckAnswer = () => {
    if (!selectedOption || isAnswerChecked) return;
    setIsAnswerChecked(true);

    const isCorrect = selectedOption === question.correct;
    if (isCorrect) {
      sounds.playCorrect();
      setCorrectCount(prev => prev + 1);
      // Adaptive tier bump up
      if (currentTier < 4) {
        setCurrentTier(prev => prev + 1);
      }
    } else {
      sounds.playWrong();
      // Adaptive tier bump down
      if (currentTier > 1) {
        setCurrentTier(prev => prev - 1);
      }
    }
  };

  const handleNextQuestion = () => {
    sounds.playTap();
    if (currentQuestionIndex + 1 >= 8) {
      // Completed test after 8 adaptive questions
      setIsCompleted(true);
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    }
  };

  // Determine targeted level to unlock based on final tier and accuracy
  const calculateResultLevel = () => {
    const langLevels = levels.filter(l => l.language_id === currentLang);
    if (!langLevels || langLevels.length === 0) return null;

    let targetIndex = Math.min(langLevels.length - 1, currentTier - 1);
    if (correctCount >= 6 && targetIndex < langLevels.length - 1) {
      targetIndex = Math.min(langLevels.length - 1, targetIndex + 1);
    }
    return langLevels[targetIndex] || langLevels[0];
  };

  const handleApplyPlacement = async () => {
    const targetLevel = calculateResultLevel();
    if (!targetLevel) return;

    setSubmitting(true);
    try {
      sounds.playLevelUp();
      const res = await api.batchUnlockLevel(targetLevel.id, 100, 50);
      if (res.success) {
        confetti({ particleCount: 200, spread: 90 });
        await refreshProfile();
        if (onPlacementComplete) onPlacementComplete(targetLevel);
        onClose();
      }
    } catch (e) {
      console.warn('Failed to apply placement unlock:', e);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const resultLevel = calculateResultLevel();

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="duo-card max-w-lg w-full p-6 sm:p-8 relative bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black shadow-md">
              <Zap className="w-5 h-5 fill-white" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider">
                Bài Test Xếp Lớp Thích Ứng
              </h3>
              <p className="text-xs text-slate-500 font-bold">
                Câu {Math.min(8, currentQuestionIndex + 1)} / 8 • Độ khó: Cấp {currentTier}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-amber-500 transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / 8) * 100}%` }}
          />
        </div>

        {/* Test Body or Completion Screen */}
        {!isCompleted ? (
          <div className="space-y-6">
            {/* Question prompt */}
            <div className="space-y-2">
              <span className="text-xs font-black uppercase text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                <Target className="w-4 h-4" />
                <span>Câu hỏi thích ứng</span>
              </span>
              <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                {question.prompt}
              </h4>
            </div>

            {/* Target phrase card with audio */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">
                  {question.target_text}
                </div>
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                  [{question.phonetic}]
                </div>
              </div>
              <button
                onClick={() => speech.speak(question.target_text, currentLang, 1.0)}
                className="duo-btn duo-btn-blue p-3 rounded-2xl shadow-sm"
                title="Nghe phát âm"
              >
                <Volume2 className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Multiple Choice Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {question.options.map((opt, i) => {
                let btnStyle = 'duo-card p-4 text-left font-bold text-sm transition-all border-2 ';
                if (!isAnswerChecked) {
                  btnStyle += selectedOption === opt
                    ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-800 dark:text-slate-200';
                } else {
                  if (opt === question.correct) {
                    btnStyle += 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300';
                  } else if (selectedOption === opt) {
                    btnStyle += 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300';
                  } else {
                    btnStyle += 'border-slate-200 dark:border-slate-700 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleSelectOption(opt)}
                    className={btnStyle}
                  >
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="pt-2">
              {!isAnswerChecked ? (
                <button
                  onClick={handleCheckAnswer}
                  disabled={!selectedOption}
                  className="w-full duo-btn duo-btn-green py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider"
                >
                  Kiểm tra đáp án
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="w-full duo-btn duo-btn-blue py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <span>Câu kế tiếp</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Completion Screen with Unlock CTA */
          <div className="space-y-6 text-center animate-in zoom-in-95">
            <div className="w-20 h-20 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-500 flex items-center justify-center mx-auto shadow-inner">
              <Trophy className="w-10 h-10 fill-amber-500" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                Chúc mừng bạn đã hoàn thành bài test!
              </h3>
              <p className="text-sm text-slate-500">
                Đúng {correctCount}/8 câu hỏi thích ứng.
              </p>
            </div>

            {/* Estimated Level Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-sky-500/10 to-purple-500/10 border-2 border-emerald-500/40 text-left space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-emerald-600 dark:text-emerald-400">
                  Cấp độ đề xuất cho bạn
                </span>
                <span className="text-xs font-black px-2.5 py-1 rounded-full bg-emerald-500 text-white">
                  Đạt chuẩn
                </span>
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {resultLevel?.title || 'Cấp độ mới'}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {resultLevel?.subtitle || 'Mở khóa toàn bộ các bài học trước đó và tiến thẳng vào chặng đường này!'}
              </p>
              <div className="pt-2 flex items-center gap-4 text-xs font-bold text-amber-600 dark:text-amber-400">
                <span>🎁 Thưởng hoàn thành: +100 XP</span>
                <span>💎 +50 Đá Quý</span>
              </div>
            </div>

            {/* Apply Button */}
            <button
              onClick={handleApplyPlacement}
              disabled={submitting}
              className="w-full duo-btn duo-btn-green py-4 rounded-2xl font-black text-base uppercase tracking-wider shadow-xl flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              <span>{submitting ? 'Đang mở khóa...' : 'Xác nhận xếp lớp & Nhận thưởng'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
