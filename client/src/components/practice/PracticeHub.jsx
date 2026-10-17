import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { speech } from '../../services/speechService';
import { sounds } from '../../services/soundEffects';
import { AIWritingLab } from './AIWritingLab';
import { AIDynamicReading } from './AIDynamicReading';
import { 
  Sparkles, 
  RotateCw, 
  Volume2, 
  Bookmark, 
  Check, 
  Flame, 
  Clock, 
  Zap, 
  Trophy,
  Layers,
  BookMarked,
  PenTool,
  BookOpen
} from 'lucide-react';

export const PracticeHub = () => {
  const { currentLang, userProfile, refreshProfile } = useApp();

  const [activeSubTab, setActiveSubTab] = useState('srs'); // 'srs' | 'notebook' | 'writing' | 'reading' | 'game'
  const [srsItems, setSrsItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  // Notebook state
  const [notebookItems, setNotebookItems] = useState([]);

  // Matching game state
  const [gameScore, setGameScore] = useState(0);
  const [gameTimeLeft, setGameTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(false);
  const [gamePairs, setGamePairs] = useState([]);
  const [selectedGameLeft, setSelectedGameLeft] = useState(null);
  const [gameMatched, setGameMatched] = useState({});

  useEffect(() => {
    loadSRSData();
    loadNotebookData();
  }, [currentLang]);

  const loadSRSData = async () => {
    setLoading(true);
    try {
      const data = await api.getSRSQueue(currentLang, userProfile.id);
      setSrsItems(data.items || []);
      setCurrentIndex(0);
      setIsFlipped(false);
    } catch (e) {
      console.warn('Error loading SRS queue:', e);
    } finally {
      setLoading(false);
    }
  };

  const loadNotebookData = async () => {
    try {
      const data = await api.getSRSNotebook(currentLang, userProfile.id);
      setNotebookItems(data || []);
    } catch (e) {
      console.warn('Error loading notebook:', e);
    }
  };

  // Submit SM-2 Review
  const handleRate = async (quality) => {
    sounds.playTap();
    const currentItem = srsItems[currentIndex];
    if (!currentItem) return;

    try {
      await api.reviewSRSItem({
        userId: userProfile.id,
        vocabId: currentItem.vocab_id || currentItem.id,
        quality
      });
    } catch (e) {
      console.warn('Error saving review:', e);
    }

    if (quality >= 4) {
      sounds.playCorrect();
    }

    setIsFlipped(false);
    if (currentIndex + 1 < srsItems.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Completed SRS queue
      sounds.playFanfare();
      try {
        confetti({ particleCount: 70, spread: 60 });
      } catch (e) {}
      loadSRSData();
      refreshProfile();
    }
  };

  // Start Speed Matching Game
  const startSpeedGame = () => {
    sounds.playTap();
    const sampleWords = srsItems.slice(0, 5);
    if (sampleWords.length === 0) return;

    const pairs = sampleWords.map(w => ({
      left: w.word,
      right: w.meaning
    }));

    setGamePairs(pairs);
    setGameMatched({});
    setSelectedGameLeft(null);
    setGameScore(0);
    setGameTimeLeft(30);
    setGameActive(true);

    const timer = setInterval(() => {
      setGameTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameActive(false);
          sounds.playFanfare();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const currentSRS = srsItems[currentIndex];

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Sub Tabs Bar */}
      <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveSubTab('srs')}
          className={`flex-1 py-2.5 px-3 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
            activeSubTab === 'srs'
              ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
              : 'text-slate-500'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Ôn Tập SRS ({srsItems.length})</span>
        </button>

        <button
          onClick={() => {
            setActiveSubTab('notebook');
            loadNotebookData();
          }}
          className={`flex-1 py-2.5 px-3 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
            activeSubTab === 'notebook'
              ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-sm'
              : 'text-slate-500'
          }`}
        >
          <BookMarked className="w-4 h-4" />
          <span>Sổ Từ Khó ({notebookItems.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('writing')}
          className={`flex-1 py-2.5 px-3 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
            activeSubTab === 'writing'
              ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-sm'
              : 'text-slate-500'
          }`}
        >
          <PenTool className="w-4 h-4 text-amber-500" />
          <span>Viết AI</span>
        </button>

        <button
          onClick={() => setActiveSubTab('reading')}
          className={`flex-1 py-2.5 px-3 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
            activeSubTab === 'reading'
              ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-sm'
              : 'text-slate-500'
          }`}
        >
          <BookOpen className="w-4 h-4 text-sky-500" />
          <span>Đọc Hiểu AI</span>
        </button>

        <button
          onClick={() => setActiveSubTab('game')}
          className={`flex-1 py-2.5 px-3 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
            activeSubTab === 'game'
              ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-400 shadow-sm'
              : 'text-slate-500'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>Ghép Thẻ</span>
        </button>
      </div>

      {/* 1. SRS FLASHCARD MODE */}
      {activeSubTab === 'srs' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 px-1">
            <span>Thuật toán SM-2 Spaced Repetition</span>
            <span>{srsItems.length > 0 ? `${currentIndex + 1} / ${srsItems.length} thẻ` : '0 thẻ'}</span>
          </div>

          {loading ? (
            <div className="py-20 text-center text-slate-400 space-y-2">
              <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs font-bold">Đang tải hàng đợi SRS...</p>
            </div>
          ) : srsItems.length === 0 ? (
            <div className="duo-card p-12 text-center text-slate-400 space-y-3">
              <Sparkles className="w-12 h-12 text-amber-500 mx-auto" />
              <h3 className="text-lg font-black text-slate-800 dark:text-white">
                Hôm nay đã hoàn thành mọi thẻ ôn tập!
              </h3>
              <p className="text-xs max-w-sm mx-auto">
                Bộ não của bạn đã ghi nhớ rất tốt. Hãy quay lại vào ngày mai hoặc tra thêm từ mới từ kho từ điển!
              </p>
            </div>
          ) : (
            currentSRS && (
              <div className="space-y-6">
                {/* 3D Flip Card Container */}
                <div
                  onClick={() => {
                    sounds.playTap();
                    setIsFlipped(!isFlipped);
                  }}
                  className="duo-card min-h-72 p-8 flex flex-col items-center justify-center text-center cursor-pointer relative select-none hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-md group"
                >
                  <span className="absolute top-4 left-4 text-xs font-extrabold uppercase px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                    {currentSRS.level}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      sounds.playTap();
                      speech.speak(currentSRS.word, currentLang, 1.0);
                    }}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-sky-500 rounded-xl"
                  >
                    <Volume2 className="w-6 h-6" />
                  </button>

                  {!isFlipped ? (
                    /* FRONT OF FLASHCARD */
                    <div className="space-y-3 animate-in fade-in">
                      <div className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                        {currentSRS.word}
                      </div>
                      <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                        [{currentSRS.phonetic}]
                      </div>
                      {currentSRS.han_viet && (
                        <div className="text-xs text-slate-400">
                          Hán Việt: <strong className="text-slate-700 dark:text-slate-300">{currentSRS.han_viet}</strong>
                        </div>
                      )}
                      <p className="text-xs font-bold text-slate-400 pt-4 flex items-center justify-center gap-1">
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>Chạm để lật xem nghĩa & ví dụ</span>
                      </p>
                    </div>
                  ) : (
                    /* BACK OF FLASHCARD */
                    <div className="space-y-4 animate-in zoom-in-95">
                      <div>
                        <span className="text-xs font-bold text-slate-400 uppercase">Nghĩa</span>
                        <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                          {currentSRS.meaning}
                        </div>
                      </div>

                      {currentSRS.example_target && (
                        <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                          <p className="font-bold text-slate-800 dark:text-slate-200">
                            {currentSRS.example_target}
                          </p>
                          <p className="text-slate-500 mt-0.5">
                            {currentSRS.example_meaning}
                          </p>
                        </div>
                      )}

                      <span className="text-[11px] text-slate-400 block">
                        Đã ôn: {currentSRS.repetition || 0} lần • Hệ số quên EF: {currentSRS.ease_factor || 2.5}
                      </span>
                    </div>
                  )}
                </div>

                {/* 4 SM-2 Grading Buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <button
                    onClick={() => handleRate(1)}
                    className="duo-btn duo-btn-red py-3 rounded-2xl text-xs font-extrabold flex flex-col items-center"
                  >
                    <span>🔴 Quên Hẳn</span>
                    <span className="text-[10px] font-medium opacity-80 mt-0.5">Ôn lại ngay</span>
                  </button>

                  <button
                    onClick={() => handleRate(3)}
                    className="duo-btn duo-btn-yellow py-3 rounded-2xl text-xs font-extrabold flex flex-col items-center"
                  >
                    <span>🟡 Hơi Khó</span>
                    <span className="text-[10px] font-medium opacity-80 mt-0.5">+1 ngày</span>
                  </button>

                  <button
                    onClick={() => handleRate(4)}
                    className="duo-btn duo-btn-blue py-3 rounded-2xl text-xs font-extrabold flex flex-col items-center"
                  >
                    <span>🟢 Nhớ Tốt</span>
                    <span className="text-[10px] font-medium opacity-80 mt-0.5">+3 ngày</span>
                  </button>

                  <button
                    onClick={() => handleRate(5)}
                    className="duo-btn duo-btn-green py-3 rounded-2xl text-xs font-extrabold flex flex-col items-center"
                  >
                    <span>🔵 Rất Dễ</span>
                    <span className="text-[10px] font-medium opacity-80 mt-0.5">+7 ngày</span>
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}

      {/* 2. NOTEBOOK MODE */}
      {activeSubTab === 'notebook' && (
        <div className="space-y-4">
          <div className="duo-card p-4 flex items-center justify-between">
            <div>
              <h3 className="font-black text-slate-800 dark:text-white text-base">
                Sổ Tay Từ Khó
              </h3>
              <p className="text-xs text-slate-400">
                Tự động lưu các từ bạn làm sai nhiều lần hoặc tự tay đánh dấu
              </p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-extrabold">
              {notebookItems.length} từ
            </span>
          </div>

          {notebookItems.length === 0 ? (
            <div className="duo-card p-12 text-center text-slate-400">
              <p className="text-xs font-bold">Chưa có từ nào trong sổ từ khó.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {notebookItems.map((item) => (
                <div
                  key={item.id}
                  className="duo-card p-3.5 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => speech.speak(item.word, currentLang, 1.0)}
                      className="p-2 text-sky-500 hover:bg-sky-50 dark:hover:bg-slate-800 rounded-xl"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-black text-lg text-slate-900 dark:text-white">
                          {item.word}
                        </span>
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          [{item.phonetic}]
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                        {item.meaning}
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] text-rose-500 font-bold bg-rose-50 dark:bg-rose-950/40 px-2 py-1 rounded-lg">
                    Sai: {item.mistake_count || 1} lần
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 3. SPEED MATCHING GAME */}
      {activeSubTab === 'game' && (
        <div className="duo-card p-6 text-center space-y-6">
          {!gameActive ? (
            <div className="space-y-4 max-w-sm mx-auto">
              <div className="w-20 h-20 rounded-3xl bg-sky-500 flex items-center justify-center text-white mx-auto shadow-md">
                <Clock className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                Thử Thách Ghép Thẻ 30 Giây
              </h3>
              <p className="text-xs text-slate-500">
                Ghép thật nhanh các cặp từ với nghĩa tương ứng để giành combo điểm thưởng XP!
              </p>
              <button
                onClick={startSpeedGame}
                className="duo-btn duo-btn-green w-full py-3.5 rounded-2xl text-sm uppercase font-black"
              >
                Bắt Đầu Ngay
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm font-black text-amber-500">
                  <Flame className="w-5 h-5 fill-amber-500" />
                  <span>Điểm: {gameScore} XP</span>
                </div>
                <div className="text-sm font-black text-sky-500">
                  Thời gian: {gameTimeLeft}s
                </div>
              </div>

              {/* Game Tiles Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="space-y-2">
                  {gamePairs.map((pair, idx) => {
                    const isMatched = !!gameMatched[pair.left];
                    const isSelected = selectedGameLeft === pair.left;
                    return (
                      <button
                        key={idx}
                        disabled={isMatched}
                        onClick={() => {
                          sounds.playTap();
                          setSelectedGameLeft(pair.left);
                        }}
                        className={`w-full p-3 rounded-xl font-extrabold text-sm border-2 border-b-4 transition-all ${
                          isMatched
                            ? 'opacity-30 line-through'
                            : isSelected
                            ? 'bg-sky-50 border-sky-500 text-sky-600'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {pair.left}
                      </button>
                    );
                  })}
                </div>

                <div className="space-y-2">
                  {gamePairs.map((pair, idx) => {
                    const isMatched = Object.values(gameMatched).includes(pair.right);
                    return (
                      <button
                        key={idx}
                        disabled={isMatched}
                        onClick={() => {
                          if (!selectedGameLeft) return;
                          const correctRight = gamePairs.find(p => p.left === selectedGameLeft)?.right;
                          if (correctRight === pair.right) {
                            sounds.playCorrect();
                            setGameMatched(prev => ({
                              ...prev,
                              [selectedGameLeft]: pair.right
                            }));
                            setGameScore(s => s + 5);
                            setSelectedGameLeft(null);
                          } else {
                            sounds.playWrong();
                            setSelectedGameLeft(null);
                          }
                        }}
                        className={`w-full p-3 rounded-xl font-extrabold text-sm border-2 border-b-4 transition-all ${
                          isMatched
                            ? 'opacity-30 line-through'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700'
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
        </div>
      )}

      {/* 4. AI WRITING LAB MODE */}
      {activeSubTab === 'writing' && <AIWritingLab />}

      {/* 5. AI DYNAMIC READING MODE */}
      {activeSubTab === 'reading' && <AIDynamicReading />}
    </div>
  );
};
