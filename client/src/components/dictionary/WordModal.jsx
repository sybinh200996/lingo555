import React, { useState, useEffect } from 'react';
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
  Info,
  PenLine,
  GitBranch,
  Layers,
  AlertCircle
} from 'lucide-react';

export const WordModal = ({ word, onClose, onToggleNotebook, isDifficult }) => {
  const { currentLang, openWritingModal } = useApp();
  const [linguisticData, setLinguisticData] = useState(null);
  const [loadingLinguistic, setLoadingLinguistic] = useState(false);

  useEffect(() => {
    if (!word || !word.id) return;
    setLoadingLinguistic(true);
    fetch(`/api/dictionary/linguistic/${word.id}`)
      .then(res => res.json())
      .then(res => {
        if (res.success && res.data) {
          setLinguisticData(res.data);
        }
      })
      .catch(err => console.warn('Failed to load linguistic data:', err))
      .finally(() => setLoadingLinguistic(false));
  }, [word]);

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
                openWritingModal(word);
              }}
              className="p-3.5 rounded-2xl border-2 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700 hover:bg-emerald-200 dark:hover:bg-emerald-900/60 transition-all"
              title={currentLang === 'zh' ? 'Tập viết thứ tự nét bút' : 'Luyện spelling chính tả'}
            >
              <PenLine className="w-6 h-6" />
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

        {/* Tone Sandhi Alert (For Chinese) */}
        {linguisticData?.phonetic?.tone_sandhi_note && (
          <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs flex items-start gap-2.5 text-amber-900 dark:text-amber-200 font-semibold">
            <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-black uppercase block text-[10px] text-amber-700 dark:text-amber-300">
                Lưu Ý Biến Điệu Thanh Điệu
              </span>
              <span>{linguisticData.phonetic.tone_sandhi_note}</span>
            </div>
          </div>
        )}

        {/* English Morphological Decomposition (Prefix, Root, Suffix) */}
        {currentLang === 'en' && linguisticData?.decomposition?.components?.length > 0 && (
          <div className="p-4 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/30 border-2 border-indigo-200 dark:border-indigo-900/50 space-y-3">
            <div className="flex items-center gap-2 text-xs font-black uppercase text-indigo-700 dark:text-indigo-400">
              <GitBranch className="w-4 h-4" />
              <span>Giải Phẫu Từ Nguyên (Morphological Breakdown)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {linguisticData.decomposition.components.map((comp, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-indigo-100 dark:border-indigo-900 shadow-xs">
                  <span className="text-base font-black text-indigo-600 dark:text-indigo-300 font-mono block">
                    {comp.unit}
                  </span>
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block">
                    {comp.role}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">
                    {comp.meaning_vi}
                  </span>
                </div>
              ))}
            </div>
            {linguisticData.decomposition.mnemonic && (
              <p className="text-xs text-indigo-900 dark:text-indigo-200 font-medium">
                💡 {linguisticData.decomposition.mnemonic}
              </p>
            )}
          </div>
        )}

        {/* 80/20 High Frequency Word Cluster */}
        {linguisticData?.cluster_80_20?.length > 0 && (
          <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-black uppercase text-slate-700 dark:text-slate-300">
                <Layers className="w-4 h-4 text-emerald-500" />
                <span>Chùm Từ Vựng 80/20 (Tần Suất Cao Nhất)</span>
              </div>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                80/20 Core Cluster
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {linguisticData.cluster_80_20.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 flex flex-col gap-1 hover:border-emerald-300 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-black text-slate-900 dark:text-white">
                        {item.expression}
                      </span>
                      {item.phonetic && (
                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                          [{item.phonetic}]
                        </span>
                      )}
                      {item.bridge_note && (
                        <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
                          • {item.bridge_note}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        sounds.playTap();
                        speech.speak(item.expression, currentLang, 1.0);
                      }}
                      className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-sky-500"
                      title="Nghe phát âm"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                    {item.meaning_vi}
                  </div>
                  {item.example?.target && (
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-700/60">
                      <span className="font-semibold text-slate-700 dark:text-slate-200">VD:</span> {item.example.target} 
                      {item.example.translation_vi && ` — ${item.example.translation_vi}`}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

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
