import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { sounds } from '../../services/soundEffects';
import { 
  Check, 
  Lock, 
  Star, 
  BookOpen, 
  Play, 
  Sparkles, 
  ChevronDown,
  Headphones
} from 'lucide-react';

export const SkillTree = () => {
  const { 
    currentLang, 
    levels, 
    currentLevel, 
    setCurrentLevel, 
    startLesson, 
    userProfile,
    openPlacement,
    openPodcast
  } = useApp();

  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [activeGuidebook, setActiveGuidebook] = useState(null);

  const currentLanguage = currentLang;

  const onSelectLesson = (lesson) => {
    sounds.playTap?.();
    setActiveTooltip(activeTooltip === lesson.id ? null : lesson.id);
  };

  const onOpenGuidebook = (targetUnit) => {
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
    } catch (e) {
      console.warn('Failed to load units:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto overflow-x-hidden max-w-full">
      {/* Transparent click-outside backdrop when any tooltip is open */}
      {activeTooltip && (
        <div
          className="fixed inset-0 z-40 bg-black/15 dark:bg-black/35 backdrop-blur-[0.5px]"
          onClick={() => setActiveTooltip(null)}
        />
      )}

      {/* Guidebook Modal */}
      {activeGuidebook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full border-2 border-b-6 border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div 
                  className="w-11 h-11 rounded-2xl bg-[#58CC02] text-white flex items-center justify-center shadow-md shrink-0 border-b-2 border-[#46A302]"
                >
                  <BookOpen className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                    Sổ Tay Hướng Dẫn • Cửa {activeGuidebook.unit_number}
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

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border-2 border-slate-200 dark:border-slate-700">
                <p className="font-black text-slate-700 dark:text-slate-200 text-xs uppercase mb-1">
                  💡 Bí quyết học hiệu quả
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  Hoàn thành mỗi bài học với điểm số cao để nhận 3 sao vàng. Đừng quên bật loa nghe chuẩn giọng bản xứ và tập đọc to theo để kích hoạt trí nhớ âm thanh!
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

      {/* Adaptive Placement Test Banner (AI Placement Test) */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 border-2 border-b-4 border-amber-400/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm animate-in fade-in">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-white flex items-center justify-center font-black shrink-0 shadow-md text-xl border-b-2 border-amber-600">
            ⚡
          </div>
          <div>
            <h4 className="text-sm font-black text-slate-900 dark:text-white">
              Bạn đã có nền tảng ngoại ngữ từ trước?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 font-medium">
              Làm test 8 câu thích ứng để mở khóa nhảy cóc ngay tới cấp độ phù hợp!
            </p>
          </div>
        </div>
        <button
          onClick={onOpenPlacementTest}
          className="btn-3d-green text-xs py-2.5 px-4 rounded-2xl shrink-0 font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4 fill-current" />
          <span>Test Xếp Lớp</span>
        </button>
      </div>

      {/* Level Selector Dropdown Bar & Podcast Trigger */}
      <div className="duo-card p-4 rounded-3xl flex items-center justify-between shadow-sm">
        <div>
          <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
            Cấp Độ Hiện Tại
          </span>
          <div className="flex items-center gap-2 mt-0.5">
            <h2 className="text-lg font-black text-slate-800 dark:text-white">
              {currentLevel?.title || 'Đang tải...'}
            </h2>
            <span
              className="text-[11px] px-2.5 py-0.5 rounded-full font-black text-white shadow-xs"
              style={{ backgroundColor: currentLevel?.color || '#58CC02' }}
            >
              {currentLevel?.code}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
            {currentLevel?.subtitle}
          </p>
        </div>

        {/* Level Switcher Dropdown & Podcast Mode Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sounds.playTap?.();
              openPodcast();
            }}
            className="btn-3d-blue text-xs py-2.5 px-3.5 rounded-2xl font-black uppercase flex items-center gap-1.5 shadow-xs cursor-pointer"
            title="Nghe thụ động podcast khi tắt màn hình"
          >
            <Headphones className="w-4 h-4 stroke-[2.5]" />
            <span className="hidden sm:inline">Podcast</span>
          </button>

          <div className="relative">
            <select
              value={currentLevel?.id || ''}
              onChange={(e) => {
                sounds.playTap?.();
                const selected = levels.find((l) => l.id === e.target.value);
                if (selected) setCurrentLevel(selected);
              }}
              className="appearance-none bg-slate-100 dark:bg-slate-800 border-2 border-b-4 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-black text-xs py-2.5 pl-3.5 pr-8 rounded-2xl cursor-pointer hover:border-slate-300 dark:hover:border-slate-600 focus:outline-none"
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
      </div>

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-slate-400 space-y-3">
          <div className="w-10 h-10 border-4 border-[#58CC02] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-bold">Đang tải bản đồ lộ trình học tập...</p>
        </div>
      ) : units.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <BookOpen className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p className="font-bold">Chưa có bài học nào trong cấp độ này.</p>
        </div>
      ) : (
        /* Units & Lesson Tree */
        units.map((unit) => {
          return (
            <div key={unit.id} className="space-y-4 mb-10">
              {/* 1. THANH TIÊU ĐỀ CHƯƠNG HỌC 3D (UNIT HEADER BANNER) */}
              <div className="sticky top-16 lg:top-4 z-20 mb-8 rounded-2xl bg-gradient-to-r from-[#58CC02] to-[#46A302] border-b-[5px] border-[#388202] p-4 sm:p-5 text-white shadow-md flex items-center justify-between gap-3 transition-all">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-lime-100">
                    <span>{currentLanguage === 'zh' ? 'Lộ trình HSK Chuẩn Quốc Tế' : 'Lộ trình CEFR Quốc Tế'}</span>
                    <span>•</span>
                    <span>{unit.levelBadge || (currentLevel?.code ? `Cấp độ ${currentLevel.code}` : `Phần ${unit.unit_number}`)}</span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-black tracking-tight truncate mt-0.5">
                    {unit.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-lime-50 font-medium line-clamp-1 mt-0.5">
                    {unit.description}
                  </p>
                </div>

                {/* Nút Sổ tay ngữ pháp / Từ vựng của Chương */}
                <button
                  onClick={() => onOpenGuidebook && onOpenGuidebook(unit)}
                  className="shrink-0 flex items-center gap-2 bg-[#46A302]/60 hover:bg-[#46A302] border-2 border-b-[4px] border-[#316800] active:border-b-2 active:translate-y-[2px] px-3.5 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm uppercase tracking-wide transition-all cursor-pointer"
                >
                  <BookOpen className="w-5 h-5"/>
                  <span className="hidden sm:inline">Sổ tay</span>
                </button>
              </div>

              {/* 2. ĐƯỜNG DẪN BÀI HỌC UỐN LƯỢN 3D (SNAKE LEARNING PATH) */}
              <div className="relative flex flex-col items-center py-4 space-y-6 select-none overflow-x-hidden">
                {unit.lessons?.map((lesson, idx) => {
                  // Tính toán độ lệch ngang hình sin tạo đường uốn lượn tự nhiên, không bao giờ tràn màn hình mobile
                  const offsets = [0, -44, -68, -44, 0, 44, 68, 44];
                  const xOffset = offsets[idx % offsets.length];

                  const isCompleted = lesson.completed || lesson.status === 'completed' || lesson.is_completed === 1;
                  const isUnlocked = isCompleted || idx === 0 || unit.lessons[idx - 1]?.is_completed === 1 || unit.lessons[idx - 1]?.completed;
                  const isLocked = lesson.locked || lesson.status === 'locked' || !isUnlocked;
                  const isCurrent = lesson.current || lesson.status === 'current' || (!isCompleted && !isLocked);

                  return (
                    <div
                      key={lesson.id || idx}
                      style={{ transform: `translateX(${xOffset}px)` }}
                      className="relative flex flex-col items-center group"
                    >
                      {/* Nhãn "BẮT ĐẦU" nhảy nhót phía trên bài đang học */}
                      {isCurrent && (
                        <div 
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectLesson(lesson);
                          }}
                          className="animate-float-badge absolute -top-12 left-1/2 z-20 whitespace-nowrap bg-white dark:bg-slate-800 text-[#58CC02] font-black text-xs sm:text-sm uppercase tracking-wider px-3.5 py-1.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 shadow-md cursor-pointer"
                        >
                          Bắt đầu
                          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-slate-800 border-r-2 border-b-2 border-slate-200 dark:border-slate-700 rotate-45" />
                        </div>
                      )}

                      {/* Vòng tròn Crown / Progress bao ngoài bài học hiện tại */}
                      <div className={`relative p-2 rounded-full ${isCurrent ? 'ring-8 ring-[#58CC02]/20 dark:ring-[#58CC02]/30' : ''}`}>
                        <button
                          onClick={() => !isLocked && onSelectLesson(lesson)}
                          disabled={isLocked}
                          className={`relative w-[72px] h-[68px] sm:w-[80px] sm:h-[74px] rounded-full flex items-center justify-center transition-all duration-100 cursor-pointer ${
                            isCompleted
                              ? 'bg-[#FFC800] border-b-[8px] border-[#E5A400] text-white hover:brightness-105 active:border-b-0 active:translate-y-[8px] shadow-lg'
                              : isCurrent
                              ? 'bg-[#58CC02] border-b-[8px] border-[#46A302] text-white hover:bg-[#61E002] active:border-b-0 active:translate-y-[8px] shadow-xl'
                              : 'bg-[#E5E5E5] dark:bg-slate-800 border-b-[8px] border-[#B7B7B7] dark:border-slate-700 text-[#AFAFAF] dark:text-slate-500 cursor-not-allowed'
                          }`}
                        >
                          {/* Vệt sáng phản chiếu 3D trên mặt nút */}
                          {!isLocked && (
                            <span className="absolute top-2 left-3.5 w-6 h-2.5 bg-white/30 rounded-full -rotate-12 pointer-events-none" />
                          )}

                          {/* Icon trạng thái bài học */}
                          {isCompleted ? (
                            <Check className="w-8 h-8 stroke-[3.5]"/>
                          ) : isCurrent ? (
                            <Star className="w-8 h-8 fill-current"/>
                          ) : (
                            <Lock className="w-7 h-7"/>
                          )}
                        </button>
                      </div>

                      {/* Tên bài học hiển thị gọn gàng bên dưới nút */}
                      <span className={`mt-2 text-xs sm:text-sm font-extrabold text-center max-w-[140px] leading-tight ${
                        isLocked ? 'text-slate-400 dark:text-slate-500' : 'text-slate-700 dark:text-slate-200'
                      }`}>
                        {lesson.title}
                      </span>

                      {/* Lesson Details Popup Speech Bubble */}
                      {activeTooltip === lesson.id && (
                        <div className="absolute top-26 z-50 w-72 sm:w-80 bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-2xl border-2 border-slate-200 dark:border-slate-700 animate-in fade-in zoom-in-95">
                          {/* Top pointing speech bubble arrow */}
                          <div className="w-3.5 h-3.5 bg-white dark:bg-slate-900 border-t-2 border-l-2 border-slate-200 dark:border-slate-700 rotate-45 mx-auto -mt-6.5 mb-2 shadow-2xs" />

                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-black text-base text-slate-900 dark:text-white leading-tight">
                              {lesson.title}
                            </h4>
                            <span className="text-xs font-black text-amber-500 shrink-0 ml-2 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-200 dark:border-amber-800">
                              +{lesson.xp_reward || 15} XP
                            </span>
                          </div>

                          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed font-semibold">
                            {lesson.description}
                          </p>

                          <button
                            onClick={() => {
                              sounds.playTap?.();
                              setActiveTooltip(null);
                              startLesson(lesson.id);
                            }}
                            className="btn-3d-green w-full py-3.5 rounded-2xl text-xs uppercase font-black tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer"
                          >
                            <Play className="w-4 h-4 fill-white" />
                            <span>{isCompleted ? 'ÔN TẬP +5 XP' : `BẮT ĐẦU +${lesson.xp_reward || 15} XP`}</span>
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
