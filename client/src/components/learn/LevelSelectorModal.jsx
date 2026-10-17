import React from 'react';
import { useApp } from '../../context/AppContext';
import { sounds } from '../../services/soundEffects';
import { getCurriculumLevels } from '../../data/curriculumData';
import { Check, Compass, Sparkles, X, ChevronRight, Unlock, Lock } from 'lucide-react';

export const LevelSelectorModal = ({ isOpen, onClose }) => {
  const { 
    currentLang, 
    levels, 
    currentLevel, 
    setCurrentLevel, 
    switchLanguage,
    isFreeMode,
    toggleFreeMode,
    openPlacement
  } = useApp();

  if (!isOpen) return null;

  const localLevels = getCurriculumLevels(currentLang);
  const serverLevels = levels.filter(l => l.language_id === currentLang);
  const serverLevelIds = new Set(serverLevels.map(l => l.id));
  const currentLangLevels = (
    serverLevels.length > 0
      ? [...serverLevels, ...localLevels.filter(l => !serverLevelIds.has(l.id))]
      : localLevels
  ).sort((a, b) => (a.order_index || 0) - (b.order_index || 0));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white dark:bg-[#1B2B32] rounded-3xl p-6 max-w-lg w-full border-2 border-b-6 border-[#E5E5E5] dark:border-[#37464F] shadow-2xl space-y-5 max-h-[90vh] flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5] dark:border-[#37464F] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#58CC02] text-white flex items-center justify-center shadow-md border-b-2 border-[#46A302]">
              <Compass className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                Chọn Lộ Trình Học Tập
              </span>
              <h3 className="text-lg font-black text-slate-800 dark:text-white">
                {currentLang === 'zh' ? 'Lộ Trình HSK Chuẩn Quốc Tế' : 'Lộ Trình CEFR Quốc Tế'}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer font-black"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Language Tabs */}
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 dark:bg-[#131F24] rounded-2xl shrink-0">
          <button
            onClick={() => {
              sounds.playTap?.();
              switchLanguage('zh');
            }}
            className={`py-2 px-3 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
              currentLang === 'zh'
                ? 'bg-white dark:bg-slate-800 text-[#58CC02] shadow-sm'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <span className="text-base">🇨🇳</span>
            <span>Tiếng Trung (HSK)</span>
          </button>
          <button
            onClick={() => {
              sounds.playTap?.();
              switchLanguage('en');
            }}
            className={`py-2 px-3 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
              currentLang === 'en'
                ? 'bg-white dark:bg-slate-800 text-[#1CB0F6] shadow-sm'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <span className="text-base">🇬🇧</span>
            <span>Tiếng Anh (CEFR)</span>
          </button>
        </div>

        {/* Quick Placement Test & Free Mode Banner */}
        <div className="flex items-center justify-between gap-2 p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl border border-indigo-200 dark:border-indigo-800/60 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xl">⚡</span>
            <div className="min-w-0">
              <p className="text-xs font-black text-indigo-900 dark:text-indigo-200 truncate">
                Đã có nền tảng từ trước?
              </p>
              <p className="text-[11px] text-indigo-700 dark:text-indigo-300 font-semibold truncate">
                Làm bài test 8 câu để xếp lớp tự động
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sounds.playTap?.();
              onClose();
              openPlacement();
            }}
            className="btn-3d-green text-[11px] py-1.5 px-3 rounded-xl uppercase font-black tracking-wider whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
          >
            Test Ngay
          </button>
        </div>

        {/* Levels List */}
        <div className="space-y-2.5 overflow-y-auto flex-1 pr-1">
          {currentLangLevels.map((lvl) => {
            const isSelected = currentLevel?.id === lvl.id;
            return (
              <div
                key={lvl.id}
                onClick={() => {
                  sounds.playTap?.();
                  setCurrentLevel(lvl);
                  onClose();
                }}
                className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'border-[#58CC02] bg-emerald-50/60 dark:bg-emerald-950/30 shadow-xs'
                    : 'border-[#E5E5E5] dark:border-[#37464F] bg-white dark:bg-[#131F24] hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs text-white shadow-xs shrink-0"
                    style={{ backgroundColor: lvl.color || '#58CC02' }}
                  >
                    {lvl.code}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-black text-sm text-slate-800 dark:text-white truncate">
                        {lvl.title}
                      </h4>
                      {isSelected && (
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-[#58CC02] text-white">
                          Đang Học
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate mt-0.5">
                      {lvl.subtitle}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 flex items-center">
                  {isSelected ? (
                    <div className="w-6 h-6 rounded-full bg-[#58CC02] text-white flex items-center justify-center">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  ) : (
                    <ChevronRight className="w-5 h-5 text-slate-300 dark:text-slate-600" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Mode Toggle */}
        <div className="pt-3 border-t border-[#E5E5E5] dark:border-[#37464F] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            {isFreeMode ? (
              <Unlock className="w-4 h-4 text-emerald-500 stroke-[2.5]" />
            ) : (
              <Lock className="w-4 h-4 text-slate-400 stroke-[2.5]" />
            )}
            <div>
              <p className="text-xs font-black text-slate-800 dark:text-white">
                Chế Độ Mở Khóa Tự Do
              </p>
              <p className="text-[10px] text-slate-400 font-semibold">
                {isFreeMode ? 'Đang mở sẵn tất cả bài học để bạn khám phá' : 'Học bài tuần tự theo chuẩn Duolingo'}
              </p>
            </div>
          </div>

          <button
            onClick={toggleFreeMode}
            className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase transition-all cursor-pointer ${
              isFreeMode
                ? 'bg-emerald-500 text-white shadow-xs'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
            }`}
          >
            {isFreeMode ? 'BẬT' : 'TẮT'}
          </button>
        </div>
      </div>
    </div>
  );
};
