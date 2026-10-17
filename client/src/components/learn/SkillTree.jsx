import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { 
  Check, 
  Lock, 
  Star, 
  Crown, 
  BookOpen, 
  Play, 
  Sparkles, 
  ChevronDown,
  Volume2,
  PenTool,
  Headphones,
  Mic,
  Coffee,
  ShoppingBag,
  HandMetal
} from 'lucide-react';

const ICON_MAP = {
  Volume2,
  PenTool,
  Headphones,
  Mic,
  Coffee,
  ShoppingBag,
  HandMetal,
  Sparkles
};

export const SkillTree = () => {
  const { currentLang, levels, currentLevel, setCurrentLevel, startLesson, userProfile } = useApp();
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTooltip, setActiveTooltip] = useState(null);

  useEffect(() => {
    if (currentLevel) {
      loadUnits(currentLevel.id);
    }
  }, [currentLevel]);

  const loadUnits = async (levelId) => {
    setLoading(true);
    try {
      const data = await api.getUnits(levelId, userProfile.id);
      setUnits(data);
    } catch (e) {
      console.warn('Failed to load units:', e);
    } finally {
      setLoading(false);
    }
  };

  // Node x-axis horizontal offsets to create Duolingo's signature serpentine winding path
  const getOffset = (index) => {
    const pattern = [0, -45, -75, -45, 0, 45, 75, 45];
    return pattern[index % pattern.length];
  };

  return (
    <div className="space-y-8 max-w-xl mx-auto">
      {/* Transparent click-outside backdrop when any tooltip is open */}
      {activeTooltip && (
        <div
          className="fixed inset-0 z-40 bg-black/15 dark:bg-black/35 backdrop-blur-[0.5px]"
          onClick={() => setActiveTooltip(null)}
        />
      )}

      {/* Level Selector Dropdown Bar */}
      <div className="duo-card p-4 flex items-center justify-between shadow-sm">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Cấp Độ Hiện Tại
          </span>
          <div className="flex items-center gap-2 mt-0.5">
            <h2 className="text-lg font-black text-slate-800 dark:text-white">
              {currentLevel?.title || 'Đang tải...'}
            </h2>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-bold text-white shadow-xs"
              style={{ backgroundColor: currentLevel?.color || '#10b981' }}
            >
              {currentLevel?.code}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {currentLevel?.subtitle}
          </p>
        </div>

        {/* Level Switcher Dropdown */}
        <div className="relative">
          <select
            value={currentLevel?.id || ''}
            onChange={(e) => {
              const selected = levels.find((l) => l.id === e.target.value);
              if (selected) setCurrentLevel(selected);
            }}
            className="appearance-none bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-extrabold text-xs py-2.5 pl-3 pr-8 rounded-xl cursor-pointer hover:border-slate-300 dark:hover:border-slate-600 focus:outline-none"
          >
            {levels.map((lvl) => (
              <option key={lvl.id} value={lvl.id}>
                {lvl.code} - {lvl.title}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-slate-400 space-y-3">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-bold">Đang tải bản đồ lộ trình học tập...</p>
        </div>
      ) : units.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <BookOpen className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p className="font-bold">Chưa có bài học nào trong cấp độ này.</p>
        </div>
      ) : (
        /* Units & Lesson Tree */
        units.map((unit, unitIdx) => {
          const UnitIcon = ICON_MAP[unit.icon] || Sparkles;

          return (
            <div key={unit.id} className="space-y-6">
              {/* Unit Header Banner */}
              <div
                className="rounded-2xl p-5 text-white shadow-md flex items-center justify-between relative overflow-hidden"
                style={{ backgroundColor: unit.banner_color || '#10b981' }}
              >
                <div className="relative z-10 max-w-[80%]">
                  <span className="text-xs font-black uppercase tracking-wider text-white/80">
                    Phần {unit.unit_number}
                  </span>
                  <h3 className="text-lg font-black tracking-tight mt-0.5">
                    {unit.title}
                  </h3>
                  <p className="text-xs text-white/90 mt-1 leading-relaxed">
                    {unit.description}
                  </p>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shrink-0">
                  <UnitIcon className="w-6 h-6" />
                </div>
              </div>

              {/* Serpentine Node Pathway */}
              <div className="py-6 flex flex-col items-center relative">
                {unit.lessons?.map((lesson, lessonIdx) => {
                  const isCompleted = lesson.is_completed === 1;
                  // First lesson or completed prior lesson unlocks next
                  const isUnlocked =
                    isCompleted ||
                    lessonIdx === 0 ||
                    unit.lessons[lessonIdx - 1]?.is_completed === 1;
                  const isCurrent = isUnlocked && !isCompleted;
                  const xOffset = getOffset(lessonIdx);
                  const isCheckpoint = lesson.type === 'checkpoint';

                  return (
                    <div
                      key={lesson.id}
                      className={`my-3.5 relative flex flex-col items-center transition-all duration-300 ${
                        activeTooltip === lesson.id ? 'z-50' : 'z-0'
                      }`}
                      style={{ transform: `translateX(${xOffset}px)` }}
                    >
                      {/* Active Current Lesson Tooltip Callout */}
                      {isCurrent && (
                        <div
                          onClick={() => {
                            setActiveTooltip(
                              activeTooltip === lesson.id ? null : lesson.id
                            );
                          }}
                          className="absolute -top-11 z-20 animate-bounce-short cursor-pointer hover:scale-105 active:scale-95 transition-all"
                          title="Bấm để xem chi tiết bài học"
                        >
                          <div className="bg-emerald-500 text-white text-xs font-black px-3.5 py-1.5 rounded-xl shadow-md border-b-2 border-emerald-700 uppercase tracking-wider whitespace-nowrap">
                            Bắt đầu ngay!
                          </div>
                          <div className="w-2 h-2 bg-emerald-500 rotate-45 mx-auto -mt-1" />
                        </div>
                      )}

                      {/* Interactive 3D Lesson Node */}
                      <button
                        onClick={() => {
                          if (isUnlocked) {
                            setActiveTooltip(
                              activeTooltip === lesson.id ? null : lesson.id
                            );
                          }
                        }}
                        disabled={!isUnlocked}
                        className={`w-18 h-18 rounded-full flex items-center justify-center text-2xl transition-all shadow-md relative ${
                          isCompleted
                            ? 'bg-amber-400 text-white border-b-4 border-amber-600 hover:brightness-105 active:translate-y-1'
                            : isCurrent
                            ? 'bg-emerald-500 text-white border-b-4 border-emerald-700 animate-pulse-glow hover:brightness-105 active:translate-y-1'
                            : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 border-b-4 border-slate-300 dark:border-slate-900 cursor-not-allowed'
                        }`}
                      >
                        {isCompleted ? (
                          <Check className="w-8 h-8 stroke-[3]" />
                        ) : isCheckpoint ? (
                          <Crown className="w-8 h-8 stroke-[2.5]" />
                        ) : isCurrent ? (
                          <Play className="w-8 h-8 fill-white ml-0.5" />
                        ) : (
                          <Lock className="w-6 h-6" />
                        )}

                        {/* Stars badge for completed */}
                        {isCompleted && (
                          <div className="absolute -bottom-2 bg-amber-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-0.5 border border-amber-300">
                            <Star className="w-3 h-3 fill-white" />
                            <span>{lesson.completed_stars || 3}</span>
                          </div>
                        )}
                      </button>

                      {/* Lesson Details Popup Card */}
                      {activeTooltip === lesson.id && (
                        <div className="absolute top-22 z-50 w-72 sm:w-80 bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-2xl border-2 border-emerald-400/80 dark:border-emerald-500/60 animate-in fade-in zoom-in-95">
                          {/* Top pointing speech bubble arrow */}
                          <div className="w-3.5 h-3.5 bg-white dark:bg-slate-900 border-t-2 border-l-2 border-emerald-400/80 dark:border-emerald-500/60 rotate-45 mx-auto -mt-6.5 mb-2 shadow-2xs" />

                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-black text-sm text-slate-900 dark:text-white leading-tight">
                              {lesson.title}
                            </h4>
                            <span className="text-xs font-black text-amber-500 shrink-0 ml-2 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                              +{lesson.xp_reward || 15} XP
                            </span>
                          </div>

                          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed font-medium">
                            {lesson.description}
                          </p>

                          <button
                            onClick={() => {
                              setActiveTooltip(null);
                              startLesson(lesson.id);
                            }}
                            className="duo-btn duo-btn-green w-full py-3 rounded-2xl text-xs uppercase font-black shadow-md tracking-wider flex items-center justify-center gap-2"
                          >
                            <Play className="w-4 h-4 fill-white" />
                            <span>{isCompleted ? 'Ôn Tập Lại' : 'Bắt Đầu Bài Học'}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
