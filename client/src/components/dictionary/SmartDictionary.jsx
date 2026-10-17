import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { speech } from '../../services/speechService';
import { sounds } from '../../services/soundEffects';
import { WordModal } from './WordModal';
import { 
  Search, 
  Volume2, 
  Bookmark, 
  BookmarkCheck, 
  Filter, 
  BookOpen, 
  ChevronLeft, 
  ChevronRight,
  Database,
  Layers,
  Sparkles
} from 'lucide-react';

export const SmartDictionary = () => {
  const { currentLang, userProfile } = useApp();

  const [query, setQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [page, setPage] = useState(1);
  const [results, setResults] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(false);
  const [dbStats, setDbStats] = useState({ total: 0 });
  const [activeWord, setActiveWord] = useState(null);
  const [difficultMap, setDifficultMap] = useState({});

  const debounceTimerRef = useRef(null);

  const zhLevels = ['Tất cả', 'PINYIN', 'HSK1', 'HSK2', 'HSK3', 'HSK4', 'HSK5', 'HSK6'];
  const enLevels = ['Tất cả', 'IPA', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const activeLevelsList = currentLang === 'zh' ? zhLevels : enLevels;

  useEffect(() => {
    setSelectedLevel('');
    setPage(1);
    loadStats();
    loadNotebook();
  }, [currentLang]);

  useEffect(() => {
    // Debounce search
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      fetchWords(query, selectedLevel, page);
    }, 250);

    return () => clearTimeout(debounceTimerRef.current);
  }, [query, selectedLevel, page, currentLang]);

  const loadStats = async () => {
    try {
      const data = await api.getDictionaryStats();
      setDbStats(data);
    } catch (e) {
      console.warn('Failed to load stats:', e);
    }
  };

  const loadNotebook = async () => {
    try {
      const notebook = await api.getSRSNotebook(currentLang, userProfile.id);
      const map = {};
      notebook.forEach(item => {
        map[item.vocab_id] = true;
      });
      setDifficultMap(map);
    } catch (e) {}
  };

  const fetchWords = async (q, lvl, p) => {
    setLoading(true);
    try {
      const cleanLvl = lvl === 'Tất cả' ? '' : lvl;
      const res = await api.searchDictionary({
        q,
        lang: currentLang,
        level: cleanLvl,
        page: p,
        limit: 20
      });
      setResults(res.items || []);
      setPagination(res.pagination || { page: 1, limit: 20, total: 0, totalPages: 1 });
    } catch (e) {
      console.warn('Search error:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleNotebook = async (vocabId) => {
    try {
      const res = await api.toggleNotebook(vocabId, userProfile.id);
      setDifficultMap(prev => ({
        ...prev,
        [vocabId]: res.isDifficult
      }));
    } catch (e) {
      console.warn('Failed to toggle notebook:', e);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Header Banner */}
      <div className="duo-card p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-emerald-500" />
              <h2 className="text-xl font-black text-slate-800 dark:text-white">
                Kho Từ Điển Thông Minh
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Tìm kiếm tức thì bằng Tiếng Việt, Pinyin, IPA, Chữ Hán hoặc Tiếng Anh
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs font-bold text-slate-400">Tổng dữ liệu:</span>
            <div className="text-base font-black text-emerald-600 dark:text-emerald-400">
              {dbStats.total > 0 ? `${dbStats.total.toLocaleString()} từ vựng` : 'Đang tải...'}
            </div>
          </div>
        </div>

        {/* Search Input Box */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder={
              currentLang === 'zh'
                ? "Nhập từ cần tra: 'Xin chào', 'nǐ hǎo', '你好', 'nhĩ hảo'..."
                : "Search words: 'apple', 'xin chào', '/æp.əl/'..."
            }
            className="w-full bg-slate-100 dark:bg-slate-800/80 border-2 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white font-bold text-sm pl-12 pr-4 py-3.5 rounded-2xl focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Level Filters Horizontal Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <Filter className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
          {activeLevelsList.map((lvl) => {
            const isSelected = selectedLevel === lvl || (lvl === 'Tất cả' && !selectedLevel);
            return (
              <button
                key={lvl}
                onClick={() => {
                  sounds.playTap();
                  setSelectedLevel(lvl === 'Tất cả' ? '' : lvl);
                  setPage(1);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-emerald-500 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {lvl}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count & Status */}
      <div className="flex items-center justify-between text-xs font-bold text-slate-400 px-1">
        <span>
          {loading ? 'Đang tìm kiếm...' : `Tìm thấy ${pagination.total} kết quả (Trang ${pagination.page}/${pagination.totalPages})`}
        </span>
      </div>

      {/* Word Cards Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-400 space-y-2">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold">Đang tải dữ liệu từ kho từ vựng...</p>
        </div>
      ) : results.length === 0 ? (
        <div className="duo-card p-12 text-center text-slate-400 space-y-3">
          <BookOpen className="w-12 h-12 mx-auto opacity-40" />
          <h4 className="font-extrabold text-base text-slate-700 dark:text-slate-300">
            Không tìm thấy từ vựng phù hợp
          </h4>
          <p className="text-xs max-w-sm mx-auto">
            Hãy thử tìm bằng từ khóa khác hoặc chuyển sang cấp độ "Tất cả".
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {results.map((word) => {
            const isSaved = !!difficultMap[word.id];

            return (
              <div
                key={word.id}
                onClick={() => setActiveWord(word)}
                className="duo-card-interactive p-4 flex items-start justify-between gap-3 group"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {word.word}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      [{word.phonetic}]
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 font-extrabold uppercase ml-auto">
                      {word.level}
                    </span>
                  </div>

                  {word.han_viet && (
                    <div className="text-[11px] text-slate-400">
                      Hán Việt: <strong className="text-slate-600 dark:text-slate-300">{word.han_viet}</strong>
                    </div>
                  )}

                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200 line-clamp-1">
                    {word.meaning}
                  </p>
                </div>

                {/* Right Action Icons: Speaker & Bookmark */}
                <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => {
                      sounds.playTap();
                      speech.speak(word.word, currentLang, 1.0);
                    }}
                    className="p-2 text-slate-400 hover:text-sky-500 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => {
                      sounds.playTap();
                      handleToggleNotebook(word.id);
                    }}
                    className={`p-2 rounded-xl transition-colors ${
                      isSaved
                        ? 'text-amber-500'
                        : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                    }`}
                    title={isSaved ? 'Xóa khỏi sổ từ khó' : 'Lưu vào sổ từ khó'}
                  >
                    {isSaved ? <BookmarkCheck className="w-5 h-5 fill-amber-500" /> : <Bookmark className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="duo-btn duo-btn-gray p-2.5 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="text-xs font-black text-slate-600 dark:text-slate-300">
            Trang {pagination.page} / {pagination.totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
            disabled={page >= pagination.totalPages}
            className="duo-btn duo-btn-gray p-2.5 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Detail Modal */}
      {activeWord && (
        <WordModal
          word={activeWord}
          onClose={() => setActiveWord(null)}
          onToggleNotebook={handleToggleNotebook}
          isDifficult={!!difficultMap[activeWord.id]}
        />
      )}
    </div>
  );
};
