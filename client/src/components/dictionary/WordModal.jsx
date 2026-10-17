import React from 'react';
import { useApp } from '../../context/AppContext';
import { speech } from '../../services/speechService';
import { sounds } from '../../services/soundEffects';
import { HanziCanvas } from '../lesson/HanziCanvas';
import { analyzeHanziRadicals } from '../../data/radicals';
import { 
  X, 
  Volume2, 
  Bookmark, 
  BookmarkCheck, 
  Sparkles, 
  Share2, 
  Tag, 
  Info 
} from 'lucide-react';

export const WordModal = ({ word, onClose, onToggleNotebook, isDifficult }) => {
  const { currentLang } = useApp();

  if (!word) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="duo-card max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto animate-in zoom-in-95 space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-extrabold uppercase">
            {word.level} • {word.part_of_speech || 'Từ vựng'}
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Word Hero & Audio */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-3">
              <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                {word.word}
              </h2>
              {word.traditional && word.traditional !== word.word && (
                <span className="text-xl text-slate-400 font-medium" title="Phồn thể">
                  ({word.traditional})
                </span>
              )}
            </div>
            <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-1">
              [{word.phonetic}]
            </div>
            {word.han_viet && (
              <div className="text-xs font-semibold text-slate-400">
                Âm Hán Việt: <span className="text-slate-700 dark:text-slate-300 font-bold">{word.han_viet}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sounds.playTap();
                speech.speak(word.word, currentLang, 1.0);
              }}
              className="duo-btn duo-btn-blue p-3.5 rounded-2xl shadow-sm"
              title="Phát âm"
            >
              <Volume2 className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={() => {
                sounds.playTap();
                onToggleNotebook(word.id);
              }}
              className={`p-3.5 rounded-2xl border-2 transition-all ${
                isDifficult
                  ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'
              }`}
              title={isDifficult ? 'Đã lưu trong sổ từ khó' : 'Lưu vào sổ từ khó'}
            >
              {isDifficult ? <BookmarkCheck className="w-6 h-6" /> : <Bookmark className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Meaning definition */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <span className="text-xs font-bold text-slate-400 uppercase">Nghĩa Tiếng Việt</span>
          <p className="text-lg font-extrabold text-slate-800 dark:text-white mt-1">
            {word.meaning}
          </p>
        </div>

        {/* Context Examples */}
        {word.example_target && (
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Câu ví dụ ngữ cảnh</span>
            <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900/50 space-y-1">
              <div className="flex items-center justify-between">
                <p className="font-bold text-base text-slate-900 dark:text-white">
                  {word.example_target}
                </p>
                <button
                  onClick={() => speech.speak(word.example_target, currentLang, 1.0)}
                  className="text-sky-500 hover:text-sky-600 p-1"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              {word.example_phonetic && (
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  {word.example_phonetic}
                </p>
              )}
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {word.example_meaning}
              </p>
            </div>
          </div>
        )}

        {/* Chinese Stroke Order & Radical Etymology Section */}
        {currentLang === 'zh' && (
          <div className="space-y-4 pt-2 border-t border-slate-200 dark:border-slate-800">
            {/* Radical & Etymology Breakdown */}
            {(() => {
              const etymology = analyzeHanziRadicals(word.word);
              if (!etymology) return null;
              return (
                <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border-2 border-amber-200/80 dark:border-amber-900/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-black uppercase text-amber-700 dark:text-amber-400">
                      <Sparkles className="w-4 h-4" />
                      <span>Tách Bộ Thủ & Chiết Tự Nhớ Nhanh</span>
                    </div>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300">
                      {etymology.type}
                    </span>
                  </div>

                  {/* Components chips */}
                  <div className="flex flex-wrap gap-2">
                    {etymology.components.map((c, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-800/60 shadow-xs"
                      >
                        <span className="text-xl font-black text-amber-600 dark:text-amber-400 font-serif">
                          {c.char}
                        </span>
                        <div className="text-left">
                          <div className="text-xs font-extrabold text-slate-800 dark:text-slate-200">
                            {c.name} {c.pinyin && `[${c.pinyin}]`}
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                            {c.meaning}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Mnemonic Story */}
                  {etymology.mnemonic && (
                    <div className="text-xs font-medium text-amber-900 dark:text-amber-200/90 bg-amber-100/50 dark:bg-amber-900/20 p-2.5 rounded-xl border border-amber-200/50 dark:border-amber-800/30 leading-relaxed">
                      <span className="font-bold text-amber-800 dark:text-amber-300">💡 Câu chuyện ghi nhớ: </span>
                      {etymology.mnemonic}
                    </div>
                  )}
                </div>
              );
            })()}

            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase">
                Tập viết thứ tự nét bút:
              </span>
              <div className="flex flex-col items-center">
                <HanziCanvas character={word.word.charAt(0)} size={180} />
              </div>
            </div>
          </div>
        )}

        {/* Meta badges: Radical, Stroke count */}
        <div className="flex flex-wrap gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-800">
          {word.radical && <span>Bộ thủ chính: <strong className="text-slate-700 dark:text-slate-200">{word.radical}</strong></span>}
          {word.stroke_count > 0 && <span>• {word.stroke_count} nét</span>}
          {word.category && <span>• Chủ đề: {word.category}</span>}
        </div>
      </div>
    </div>
  );
};
