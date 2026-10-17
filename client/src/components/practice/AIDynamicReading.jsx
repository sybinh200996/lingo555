import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { ai } from '../../services/aiClient';
import { speech } from '../../services/speechService';
import { sounds } from '../../services/soundEffects';
import { 
  BookOpen, 
  Sparkles, 
  Volume2, 
  CheckCircle2, 
  XCircle, 
  Layers, 
  RefreshCw, 
  Eye, 
  EyeOff,
  HelpCircle,
  Tag
} from 'lucide-react';

export const AIDynamicReading = () => {
  const { currentLang, openAiSettings, hasAiKey } = useApp();

  const [topic, setTopic] = useState('Khám phá thành phố & ẩm thực');
  const [selectedWords, setSelectedWords] = useState(
    currentLang === 'zh'
      ? ['朋友', '学校', '学习', '苹果', '喝茶']
      : ['friend', 'student', 'coffee', 'opportunity', 'experience']
  );
  const [customWordInput, setCustomWordInput] = useState('');
  const [level, setLevel] = useState('HSK2');
  const [isGenerating, setIsGenerating] = useState(false);
  const [readingData, setReadingData] = useState(null);
  const [showTranslation, setShowTranslation] = useState(false);
  const [selectedWordTooltip, setSelectedWordTooltip] = useState(null);

  // Comprehension quiz states
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(null);

  useEffect(() => {
    // Reset defaults when language switches
    if (currentLang === 'zh') {
      setSelectedWords(['朋友', '学校', '学习', '苹果', '喝茶']);
      setLevel('HSK2');
    } else {
      setSelectedWords(['friend', 'student', 'coffee', 'opportunity', 'experience']);
      setLevel('A2');
    }
    setReadingData(null);
    setQuizAnswers({});
    setQuizScore(null);
  }, [currentLang]);

  const handleAddWord = () => {
    if (!customWordInput.trim()) return;
    sounds.playTap();
    if (!selectedWords.includes(customWordInput.trim())) {
      setSelectedWords([...selectedWords, customWordInput.trim()]);
    }
    setCustomWordInput('');
  };

  const handleRemoveWord = (w) => {
    sounds.playTap();
    setSelectedWords(selectedWords.filter(item => item !== w));
  };

  const handleGenerateReading = async () => {
    sounds.playTap();
    setIsGenerating(true);
    setReadingData(null);
    setQuizAnswers({});
    setQuizScore(null);
    setSelectedWordTooltip(null);

    try {
      const res = await ai.generateReading({
        words: selectedWords,
        topic: topic || 'Đời sống hàng ngày',
        level,
        language: currentLang
      });

      if (res.success && res.data) {
        sounds.playCorrect();
        setReadingData(res.data);
      }
    } catch (e) {
      console.warn('Error generating reading:', e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectQuizAnswer = (qIndex, optIndex) => {
    sounds.playTap();
    setQuizAnswers(prev => ({
      ...prev,
      [qIndex]: optIndex
    }));
  };

  const handleCheckQuiz = () => {
    if (!readingData?.quiz) return;
    let score = 0;
    readingData.quiz.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correctIndex) {
        score++;
      }
    });

    setQuizScore(score);
    if (score === readingData.quiz.length) {
      sounds.playFanfare();
      try {
        confetti({ particleCount: 70, spread: 60 });
      } catch (e) {}
    } else {
      sounds.playCorrect();
    }
  };

  // Click to translate words in text
  const handleWordClick = (word) => {
    sounds.playTap();
    speech.speak(word, currentLang, 1.0);
    setSelectedWordTooltip({
      word,
      loading: true
    });

    // Provide immediate definition from vocabularyList if found
    const found = readingData?.vocabularyList?.find(v => v.word.includes(word) || word.includes(v.word));
    if (found) {
      setSelectedWordTooltip(found);
    } else {
      setSelectedWordTooltip({
        word,
        phonetic: currentLang === 'zh' ? 'Pinyin' : 'IPA',
        meaning: 'Bấm vào để nghe phát âm chuẩn'
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="duo-card p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-sky-500 text-white flex items-center justify-center shadow-md">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-lg text-slate-800 dark:text-white">
                Không Gian Đọc Hiểu Thông Minh Tự Sinh Bằng AI
              </h3>
              <p className="text-xs text-slate-400">
                Sáng tác bài đọc theo từ vựng bạn muốn ôn kèm Click-to-translate &amp; Quiz trắc nghiệm
              </p>
            </div>
          </div>

          <button
            onClick={openAiSettings}
            className="text-xs px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-200 flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-500" />
            <span>{hasAiKey ? 'AI Gemini Đang Bật' : 'Cài Đặt AI'}</span>
          </button>
        </div>
      </div>

      {/* Configuration Controls */}
      <div className="duo-card p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Topic Input */}
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase">Chủ đề bài đọc:</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Ví dụ: Du lịch Bắc Kinh, Phỏng vấn xin việc..."
              className="w-full p-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-white focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Level Dropdown */}
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase">Trình độ mục tiêu:</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full p-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-white focus:outline-none focus:border-sky-500"
            >
              {currentLang === 'zh' ? (
                <>
                  <option value="HSK1">HSK 1 (Căn bản)</option>
                  <option value="HSK2">HSK 2 (Sơ cấp)</option>
                  <option value="HSK3">HSK 3 (Trung cấp)</option>
                  <option value="HSK4">HSK 4 (Trung cao cấp)</option>
                </>
              ) : (
                <>
                  <option value="A1">CEFR A1 (Beginner)</option>
                  <option value="A2">CEFR A2 (Elementary)</option>
                  <option value="B1">CEFR B1 (Intermediate)</option>
                  <option value="B2">CEFR B2 (Upper Intermediate)</option>
                </>
              )}
            </select>
          </div>
        </div>

        {/* Selected Vocabulary Word Chips */}
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-400 uppercase flex items-center justify-between">
            <span>Từ vựng trọng tâm cần lồng ghép ({selectedWords.length}):</span>
          </label>
          <div className="flex flex-wrap gap-1.5 min-h-10 p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            {selectedWords.map((w, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-white font-bold text-xs shadow-xs"
              >
                <span>{w}</span>
                <button
                  onClick={() => handleRemoveWord(w)}
                  className="text-slate-400 hover:text-rose-500 font-black ml-0.5"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          {/* Add custom word */}
          <div className="flex gap-2">
            <input
              type="text"
              value={customWordInput}
              onChange={(e) => setCustomWordInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddWord()}
              placeholder="Thêm từ vựng bạn muốn luyện tập..."
              className="flex-1 p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold focus:outline-none focus:border-sky-500 text-slate-800 dark:text-white"
            />
            <button
              onClick={handleAddWord}
              className="duo-btn duo-btn-gray py-2 px-4 rounded-xl text-xs font-bold"
            >
              + Thêm
            </button>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerateReading}
          disabled={selectedWords.length === 0 || isGenerating}
          className="duo-btn duo-btn-blue w-full py-3.5 rounded-2xl text-xs uppercase font-black flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>AI Đang Soạn Bài Đọc Riêng Cho Bạn...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Sáng Tác Bài Đọc Bằng AI Ngay</span>
            </>
          )}
        </button>
      </div>

      {/* READING ARTICLE VIEW */}
      {readingData && (
        <div className="space-y-6 animate-in zoom-in-95">
          {/* Passage Container */}
          <div className="duo-card p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 font-black uppercase">
                  {readingData.level} • {readingData.topic}
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                  {readingData.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => speech.speak(readingData.content, currentLang, 1.0)}
                  className="duo-btn duo-btn-blue p-2.5 rounded-xl shadow-xs"
                  title="Nghe toàn bộ bài đọc"
                >
                  <Volume2 className="w-4 h-4 text-white" />
                </button>

                <button
                  onClick={() => setShowTranslation(!showTranslation)}
                  className="duo-btn duo-btn-gray py-2 px-3 rounded-xl text-xs font-bold flex items-center gap-1"
                >
                  {showTranslation ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{showTranslation ? 'Ẩn Dịch' : 'Hiện Bản Dịch'}</span>
                </button>
              </div>
            </div>

            {/* Click-to-Translate Instruction */}
            <p className="text-[11px] font-bold text-sky-500">
              💡 Chạm vào bất kỳ từ/câu nào bên dưới để tra nghĩa &amp; nghe phát âm ngay tức thì:
            </p>

            {/* Text Paragraph with Clickable Tokens */}
            <div className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 leading-loose tracking-wide">
              {currentLang === 'zh'
                ? readingData.content.split('').map((char, i) => {
                    const isTarget = readingData.targetWords?.some(tw => tw.includes(char));
                    return (
                      <span
                        key={i}
                        onClick={() => handleWordClick(char)}
                        className={`inline-block px-0.5 rounded-md cursor-pointer transition-all hover:bg-sky-100 dark:hover:bg-sky-900/60 active:scale-95 ${
                          isTarget ? 'text-emerald-600 dark:text-emerald-400 underline decoration-emerald-400 font-black' : ''
                        }`}
                      >
                        {char}
                      </span>
                    );
                  })
                : readingData.content.split(/\s+/).map((word, i) => {
                    const isTarget = readingData.targetWords?.some(tw => tw.toLowerCase() === word.toLowerCase().replace(/[^a-z]/g, ''));
                    return (
                      <span
                        key={i}
                        onClick={() => handleWordClick(word)}
                        className={`inline-block px-1 py-0.5 rounded-md cursor-pointer transition-all hover:bg-sky-100 dark:hover:bg-sky-900/60 active:scale-95 ${
                          isTarget ? 'text-emerald-600 dark:text-emerald-400 underline decoration-emerald-400 font-black' : ''
                        }`}
                      >
                        {word}{' '}
                      </span>
                    );
                  })}
            </div>

            {/* Selected Word Popover */}
            {selectedWordTooltip && (
              <div className="p-3 bg-sky-50 dark:bg-sky-950/50 rounded-2xl border-2 border-sky-300 dark:border-sky-800 text-xs flex items-center justify-between animate-in fade-in">
                <div>
                  <span className="font-black text-sm text-sky-900 dark:text-sky-200">
                    {selectedWordTooltip.word}
                  </span>
                  {selectedWordTooltip.phonetic && (
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold ml-2">
                      [{selectedWordTooltip.phonetic}]
                    </span>
                  )}
                  <p className="text-slate-600 dark:text-slate-300 font-semibold mt-0.5">
                    {selectedWordTooltip.meaning}
                  </p>
                </div>
                <button
                  onClick={() => speech.speak(selectedWordTooltip.word, currentLang, 1.0)}
                  className="p-2 text-sky-600 hover:bg-sky-100 dark:hover:bg-slate-800 rounded-xl"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Full Translation View */}
            {showTranslation && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-semibold animate-in fade-in">
                <span className="font-black text-slate-400 uppercase text-[10px] block mb-1">
                  Bản Dịch Nghĩa Trọn Vẹn:
                </span>
                {readingData.vietnameseTranslation}
              </div>
            )}
          </div>

          {/* COMPREHENSION QUIZ */}
          {readingData.quiz && readingData.quiz.length > 0 && (
            <div className="duo-card p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-amber-500" />
                  <h4 className="font-black text-base text-slate-800 dark:text-white">
                    Kiểm Tra Đọc Hiểu (Comprehension Quiz)
                  </h4>
                </div>
                {quizScore !== null && (
                  <span className="text-xs font-black px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    Kết quả: {quizScore} / {readingData.quiz.length} câu đúng
                  </span>
                )}
              </div>

              <div className="space-y-4">
                {readingData.quiz.map((q, qIdx) => (
                  <div key={qIdx} className="space-y-2 p-3.5 rounded-xl bg-slate-50/60 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-xs">
                    <p className="font-extrabold text-sm text-slate-800 dark:text-white">
                      Câu {qIdx + 1}: {q.question}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = quizAnswers[qIdx] === optIdx;
                        const isCorrect = q.correctIndex === optIdx;
                        const showFeedback = quizScore !== null;

                        let btnStyle = 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900';
                        if (isSelected) {
                          btnStyle = 'border-sky-500 bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300';
                        }
                        if (showFeedback) {
                          if (isCorrect) {
                            btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 font-black';
                          } else if (isSelected && !isCorrect) {
                            btnStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950 text-rose-700 line-through';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectQuizAnswer(qIdx, optIdx)}
                            className={`p-3 rounded-xl border-2 text-left font-bold transition-all ${btnStyle}`}
                          >
                            <span className="w-5 h-5 rounded-md bg-slate-100 dark:bg-slate-800 inline-flex items-center justify-center mr-1.5 text-[11px] font-black text-slate-500">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {quizScore !== null && q.explanation && (
                      <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold pt-1">
                        Dẫn chứng: {q.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleCheckQuiz}
                  disabled={Object.keys(quizAnswers).length < readingData.quiz.length}
                  className="duo-btn duo-btn-green py-3 px-8 rounded-2xl text-xs uppercase font-black disabled:opacity-40"
                >
                  Kiểm Tra Đáp Án
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
