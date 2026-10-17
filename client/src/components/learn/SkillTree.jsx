import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { sounds } from '../../services/soundEffects';
import { 
  Check, 
  Lock, 
  Unlock,
  Star, 
  BookOpen, 
  Play, 
  Sparkles, 
  ChevronRight,
  ChevronLeft,
  Headphones,
  Compass,
  CheckCircle2,
  Zap
} from 'lucide-react';

// Multi-color Unit Themes (Chương 1-5 & lặp lại)
const UNIT_THEMES = [
  {
    gradient: 'from-[#58CC02] to-[#46A302]',
    bannerBorder: 'border-[#388202]',
    accentColor: '#58CC02',
    bgLight: 'bg-emerald-50 dark:bg-emerald-950/40',
    borderLight: 'border-emerald-200 dark:border-emerald-800',
    badgeText: 'text-[#58CC02]',
    btnClass: 'btn-3d-green'
  },
  {
    gradient: 'from-[#1CB0F6] to-[#1899D6]',
    bannerBorder: 'border-[#1279A8]',
    accentColor: '#1CB0F6',
    bgLight: 'bg-sky-50 dark:bg-sky-950/40',
    borderLight: 'border-sky-200 dark:border-sky-800',
    badgeText: 'text-[#1CB0F6]',
    btnClass: 'btn-3d-blue'
  },
  {
    gradient: 'from-[#CE82FF] to-[#A568CC]',
    bannerBorder: 'border-[#8247A8]',
    accentColor: '#CE82FF',
    bgLight: 'bg-purple-50 dark:bg-purple-950/40',
    borderLight: 'border-purple-200 dark:border-purple-800',
    badgeText: 'text-[#CE82FF]',
    btnClass: 'btn-3d-purple'
  },
  {
    gradient: 'from-[#FF9600] to-[#CC7800]',
    bannerBorder: 'border-[#9E5D00]',
    accentColor: '#FF9600',
    bgLight: 'bg-amber-50 dark:bg-amber-950/40',
    borderLight: 'border-amber-200 dark:border-amber-800',
    badgeText: 'text-[#FF9600]',
    btnClass: 'btn-3d-yellow'
  },
  {
    gradient: 'from-[#FF4B4B] to-[#EA2B2B]',
    bannerBorder: 'border-[#C71B1B]',
    accentColor: '#FF4B4B',
    bgLight: 'bg-rose-50 dark:bg-rose-950/40',
    borderLight: 'border-rose-200 dark:border-rose-900',
    badgeText: 'text-[#FF4B4B]',
    btnClass: 'btn-3d-red'
  }
];

export const SkillTree = () => {
  const { 
    currentLang, 
    levels, 
    currentLevel, 
    setCurrentLevel, 
    startLesson, 
    userProfile,
    openPlacement,
    openPodcast,
    isFreeMode,
    toggleFreeMode,
    openLevelModal
  } = useApp();

  const [units, setUnits] = useState([]);
  const [selectedUnitId, setSelectedUnitId] = useState('all');
  const [loading, setLoading] = useState(true);
  const [activeGuidebook, setActiveGuidebook] = useState(null);
  const unitScrollRef = useRef(null);

  const currentLanguage = currentLang;

  const onOpenGuidebook = (targetUnit, e) => {
    if (e) e.stopPropagation();
    sounds.playTap?.();
    setActiveGuidebook(targetUnit);
  };

  const onOpenPlacementTest = () => {
    sounds.playTap?.();
    openPlacement();
  };

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
      if (data && data.length > 0) {
        setSelectedUnitId(data[0].id);
      } else {
        setSelectedUnitId('all');
      }
    } catch (e) {
      console.warn('Failed to load units:', e);
    } finally {
      setLoading(false);
    }
  };

  const scrollUnits = (direction) => {
    sounds.playTap?.();
    if (unitScrollRef.current) {
      const offset = direction === 'left' ? -280 : 280;
      unitScrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  // Units to display based on selected filter
  const displayedUnits = selectedUnitId === 'all' 
    ? units 
    : units.filter(u => u.id === selectedUnitId);

  return (
    <div className="space-y-6 w-full select-none">
      {/* Guidebook Modal */}
      {activeGuidebook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-[#1B2B32] rounded-3xl p-6 max-w-md w-full border-2 border-b-6 border-[#E5E5E5] dark:border-[#37464F] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5E5E5] dark:border-[#37464F] pb-3">
              <div className="flex items-center gap-3">
                <div 
                  className="w-11 h-11 rounded-2xl bg-[#58CC02] text-white flex items-center justify-center shadow-md shrink-0 border-b-2 border-[#46A302]"
                >
                  <BookOpen className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                    Sổ Tay Hướng Dẫn • Chương {activeGuidebook.unit_number}
                  </span>
                  <h3 className="font-black text-slate-800 dark:text-white text-base">
                    {activeGuidebook.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setActiveGuidebook(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 font-black cursor-pointer text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 py-1 text-sm text-slate-600 dark:text-slate-300">
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-200 dark:border-emerald-800">
                <p className="font-black text-emerald-700 dark:text-emerald-300 text-xs uppercase mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 fill-current" />
                  Mục tiêu chương này
                </p>
                <p className="text-xs leading-relaxed font-semibold text-slate-700 dark:text-slate-200">
                  {activeGuidebook.description}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#131F24] border-2 border-[#E5E5E5] dark:border-[#37464F]">
                <p className="font-black text-slate-700 dark:text-slate-200 text-xs uppercase mb-1">
                  💡 Bí quyết học hiệu quả
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  Hoàn thành mỗi bài học với điểm số cao để nhận sao vàng. Bật loa nghe chuẩn giọng bản xứ và tập đọc to theo để kích hoạt trí nhớ âm thanh!
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                sounds.playTap?.();
                setActiveGuidebook(null);
              }}
              className="btn-3d-green w-full py-3.5 rounded-2xl text-xs uppercase font-black tracking-wider cursor-pointer shadow-md"
            >
              ĐÃ HIỂU!
            </button>
          </div>
        </div>
      )}

      {/* Level Summary & Control Bar */}
      <div className="duo-card p-4 sm:p-5 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div 
          onClick={() => {
            sounds.playTap?.();
            openLevelModal();
          }}
          className="cursor-pointer group flex-1 min-w-0"
          title="Bấm để mở danh sách chọn lộ trình HSK / CEFR"
        >
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
              {currentLanguage === 'zh' ? 'Lộ Trình HSK Chuẩn Quốc Tế' : 'Lộ Trình CEFR Quốc Tế'}
            </span>
            <span className="text-[11px] text-sky-500 font-extrabold flex items-center gap-0.5 group-hover:underline">
              • Đổi cấp độ ▾
            </span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <h2 className="text-lg sm:text-xl font-black text-slate-800 dark:text-white group-hover:text-[#58CC02] transition-colors truncate">
              {currentLevel?.title || 'Đang tải lộ trình...'}
            </h2>
            <span
              className="text-[11px] px-2.5 py-0.5 rounded-full font-black text-white shadow-xs shrink-0"
              style={{ backgroundColor: currentLevel?.color || '#58CC02' }}
            >
              {currentLevel?.code}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium line-clamp-1">
            {currentLevel?.subtitle}
          </p>
        </div>

        {/* Controls: Free Mode Toggle + Podcast + Switch Level */}
        <div className="flex items-center flex-wrap gap-2 shrink-0">
          <button
            onClick={toggleFreeMode}
            className={`text-xs py-2 px-3 rounded-2xl font-black uppercase flex items-center gap-1.5 transition-all cursor-pointer ${
              isFreeMode
                ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-2 border-amber-300 dark:border-amber-700 shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-2 border-slate-200 dark:border-slate-700'
            }`}
            title={isFreeMode ? "Đang bật chế độ mở khóa tự do toàn bộ bài học" : "Đang ở chế độ học tuần tự"}
          >
            {isFreeMode ? <Unlock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> : <Lock className="w-3.5 h-3.5" />}
            <span>{isFreeMode ? 'Học Tự Do' : 'Tuần Tự'}</span>
          </button>

          <button
            onClick={() => {
              sounds.playTap?.();
              openPodcast();
            }}
            className="btn-3d-blue text-xs py-2 px-3 sm:px-3.5 rounded-2xl font-black uppercase flex items-center gap-1.5 shadow-xs cursor-pointer"
            title="Nghe thụ động podcast khi tắt màn hình"
          >
            <Headphones className="w-4 h-4 stroke-[2.5]" />
            <span className="hidden sm:inline">Podcast</span>
          </button>

          <button
            onClick={() => {
              sounds.playTap?.();
              openLevelModal();
            }}
            className="bg-slate-100 dark:bg-[#131F24] border-2 border-b-4 border-[#E5E5E5] dark:border-[#37464F] text-slate-800 dark:text-slate-200 font-black text-xs py-2 px-3 rounded-2xl cursor-pointer hover:border-slate-300 dark:hover:border-slate-600 flex items-center gap-1"
            title="Xem danh sách tất cả các cấp độ HSK / CEFR"
          >
            <Compass className="w-3.5 h-3.5 text-slate-400" />
            <span>Đổi Cấp Độ</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* TẦNG 1: THANH TRƯỢT NGANG CHỌN CHƯƠNG HỌC (UNIT SELECTOR) */}
      {/* ======================================================== */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">
              Tầng 1 • Chọn Chương Học
            </span>
            <span className="text-xs text-slate-400 font-bold">({units.length} chương)</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSelectedUnitId('all')}
              className={`text-[11px] font-black px-2.5 py-1 rounded-xl transition-all cursor-pointer ${
                selectedUnitId === 'all'
                  ? 'bg-slate-800 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              Hiện tất cả
            </button>
            <button
              onClick={() => scrollUnits('left')}
              className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer hidden sm:flex items-center justify-center"
              title="Cuộn sang trái"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollUnits('right')}
              className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer hidden sm:flex items-center justify-center"
              title="Cuộn sang phải"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Track */}
        <div 
          ref={unitScrollRef}
          className="flex overflow-x-auto gap-3 pb-2 pt-1 snap-x no-scrollbar -mx-1 px-1"
        >
          {units.map((unit, uIdx) => {
            const theme = UNIT_THEMES[uIdx % UNIT_THEMES.length];
            const isSelected = selectedUnitId === unit.id;
            const completedCount = unit.lessons?.filter(l => l.completed || l.is_completed === 1)?.length || 0;
            const totalCount = unit.lessons?.length || 0;
            const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

            return (
              <div
                key={unit.id}
                onClick={() => {
                  sounds.playTap?.();
                  setSelectedUnitId(unit.id);
                }}
                className={`w-[260px] sm:w-[290px] shrink-0 snap-start p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? `border-b-4 ${theme.borderLight} ${theme.bgLight} shadow-sm ring-2 ring-emerald-500/20`
                    : 'border-b-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1B2B32] hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span 
                      className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md text-white shadow-xs"
                      style={{ backgroundColor: theme.accentColor }}
                    >
                      Chương {unit.unit_number}
                    </span>
                    <button
                      onClick={(e) => onOpenGuidebook(unit, e)}
                      className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-1 font-bold p-1 rounded-md hover:bg-white/60 dark:hover:bg-slate-800 cursor-pointer"
                      title="Xem sổ tay chương"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Sổ tay</span>
                    </button>
                  </div>

                  <h3 className="font-black text-sm sm:text-base text-slate-800 dark:text-white line-clamp-1">
                    {unit.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium line-clamp-1 mt-0.5">
                    {unit.description}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-slate-700/60">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-1">
                    <span>{completedCount}/{totalCount} bài học</span>
                    <span>{percent}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden p-0.5">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{ 
                        width: `${percent}%`, 
                        backgroundColor: theme.accentColor 
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* TẦNG 2: DANH SÁCH BÀI HỌC XẾP NGANG / RESPONSIVE GRID    */}
      {/* ======================================================== */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-slate-400 space-y-3">
          <div className="w-10 h-10 border-4 border-[#58CC02] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-bold">Đang tải bài học...</p>
        </div>
      ) : units.length === 0 ? (
        <div className="text-center py-16 text-slate-400 duo-card p-8 rounded-3xl">
          <BookOpen className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p className="font-bold">Chưa có bài học nào trong cấp độ này.</p>
        </div>
      ) : (
        displayedUnits.map((unit, uIdx) => {
          const theme = UNIT_THEMES[uIdx % UNIT_THEMES.length];

          return (
            <div key={unit.id} className="space-y-4 pt-2">
              {/* Unit Header Bar (Tầng 2 Header) */}
              <div className={`rounded-2xl bg-gradient-to-r ${theme.gradient} border-b-4 ${theme.bannerBorder} p-4 text-white shadow-sm flex items-center justify-between gap-3`}>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-white/90">
                    <span>Chương {unit.unit_number}</span>
                    <span>•</span>
                    <span>{currentLevel?.code}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black tracking-tight truncate mt-0.5">
                    {unit.title}
                  </h3>
                  <p className="text-xs text-white/90 font-medium line-clamp-1 mt-0.5">
                    {unit.description}
                  </p>
                </div>

                <button
                  onClick={(e) => onOpenGuidebook(unit, e)}
                  className="shrink-0 flex items-center gap-1.5 bg-black/20 hover:bg-black/30 border border-white/20 active:translate-y-[1px] px-3 py-2 rounded-xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xs"
                >
                  <BookOpen className="w-4 h-4" />
                  <span className="hidden sm:inline">Sổ tay</span>
                </button>
              </div>

              {/* Responsive Grid of Lesson Cards: 1 col on mobile, 2 cols on tablet, 3 cols on desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
                {unit.lessons?.map((lesson, idx) => {
                  const isCompleted = lesson.completed || lesson.status === 'completed' || lesson.is_completed === 1;
                  const isUnlocked = isFreeMode || isCompleted || idx === 0 || unit.lessons[idx - 1]?.is_completed === 1 || unit.lessons[idx - 1]?.completed;
                  const isLocked = !isUnlocked;
                  const isCurrent = (!isCompleted && isUnlocked);

                  return (
                    <div
                      key={lesson.id || idx}
                      className={`duo-card p-4 sm:p-5 rounded-2xl flex flex-col justify-between transition-all duration-150 border-2 border-b-4 ${
                        isCompleted
                          ? 'border-amber-300 dark:border-amber-800 bg-white dark:bg-[#1B2B32]'
                          : isCurrent
                          ? `${theme.borderLight} bg-white dark:bg-[#1B2B32] ring-2 ring-emerald-500/10 shadow-xs`
                          : isLocked
                          ? 'border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 opacity-80'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1B2B32]'
                      }`}
                    >
                      {/* Top Row: Lesson Number + Status Badge + XP */}
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-black text-slate-400 uppercase tracking-wider">
                              Bài {lesson.lesson_number || idx + 1}
                            </span>
                            {isCompleted ? (
                              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                                ✓ Hoàn Thành
                              </span>
                            ) : isCurrent ? (
                              <span 
                                className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full text-white shadow-xs"
                                style={{ backgroundColor: theme.accentColor }}
                              >
                                Đang Học
                              </span>
                            ) : isLocked ? (
                              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                                Khóa
                              </span>
                            ) : (
                              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                                Tự Do
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-1 font-black text-xs text-amber-500">
                            <span>+{lesson.xp_reward || 15} XP</span>
                            {isCompleted ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            ) : isLocked ? (
                              <Lock className="w-3.5 h-3.5 text-slate-400" />
                            ) : (
                              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            )}
                          </div>
                        </div>

                        {/* Lesson Title & Description */}
                        <h4 className="font-black text-sm sm:text-base text-slate-800 dark:text-white line-clamp-2 leading-snug">
                          {lesson.title}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium line-clamp-2 mt-1 leading-relaxed">
                          {lesson.description || 'Bài tập tương tác chuẩn Duolingo'}
                        </p>
                      </div>

                      {/* Bottom Action Button */}
                      <div className="pt-4 mt-2">
                        {isLocked ? (
                          <button
                            onClick={() => {
                              sounds.playTap?.();
                              toggleFreeMode();
                              startLesson(lesson.id);
                            }}
                            className="btn-3d-white w-full py-2.5 rounded-xl text-xs uppercase font-black tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                            title="Bấm để mở khóa tự do và vào học ngay"
                          >
                            <Unlock className="w-3.5 h-3.5 text-amber-500" />
                            <span>Mở Khóa Ngay</span>
                          </button>
                        ) : isCompleted ? (
                          <button
                            onClick={() => {
                              sounds.playTap?.();
                              startLesson(lesson.id);
                            }}
                            className="duo-btn duo-btn-outline w-full py-2.5 rounded-xl text-xs uppercase font-black tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Play className="w-3.5 h-3.5" />
                            <span>Ôn Tập (+5 XP)</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              sounds.playTap?.();
                              startLesson(lesson.id);
                            }}
                            className={`${theme.btnClass} w-full py-2.5 rounded-xl text-xs uppercase font-black tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-sm`}
                          >
                            <Play className="w-3.5 h-3.5 fill-white" />
                            <span>Bắt Đầu (+{lesson.xp_reward || 15} XP)</span>
                          </button>
                        )}
                      </div>
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
