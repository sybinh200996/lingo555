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
  Zap,
  Bot
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
    openLevelModal,
    openAiTutor
  } = useApp();

  const [units, setUnits] = useState([]);
  const [selectedUnitId, setSelectedUnitId] = useState(null);
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

  const onSelectLesson = (lesson) => {
    sounds.playTap?.();
    startLesson(lesson.id);
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
      setUnits(data || []);
      if (data && data.length > 0) {
        setSelectedUnitId(data[0].id);
      } else {
        setSelectedUnitId(null);
      }
    } catch (e) {
      console.warn('Failed to load units:', e);
    } finally {
      setLoading(false);
    }
  };

  const currentUnit = units.find(u => u.id === selectedUnitId) || units[0] || null;

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

        {/* Controls: AI Tutor + Placement + Free Mode Toggle + Podcast + Switch Level */}
        <div className="flex items-center flex-wrap gap-2 shrink-0">
          <button
            onClick={() => {
              sounds.playTap?.();
              openAiTutor();
            }}
            className="btn-3d-purple text-xs py-2 px-3 sm:px-3.5 rounded-2xl font-black uppercase flex items-center gap-1.5 shadow-xs cursor-pointer"
            title="Trò chuyện & luyện tập cùng Gia Sư AI"
          >
            <Bot className="w-4 h-4 stroke-[2.5]" />
            <span>Gia Sư AI</span>
          </button>

          <button
            onClick={onOpenPlacementTest}
            className="bg-amber-500 hover:bg-amber-600 border-b-4 border-amber-700 active:border-b-0 active:translate-y-1 text-white text-xs py-2 px-3 sm:px-3.5 rounded-2xl font-black uppercase flex items-center gap-1.5 shadow-xs cursor-pointer"
            title="Làm bài kiểm tra đánh giá năng lực để xếp lớp tự động"
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>Test Xếp Lớp</span>
          </button>

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
            <span>Đổi Cấp</span>
          </button>
        </div>
      </div>

      {/* 1. THANH CHỌN CHƯƠNG/CẤP ĐỘ XẾP NGANG (CUỘN NGANG MƯỢT MÀ) */}
      <div className="w-full">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Chọn Cấp Độ & Chương Học (Vuốt ngang)
          </h2>
          <span className="text-xs font-bold text-[#1CB0F6]">
            {units.length} Chương
          </span>
        </div>

        {/* Dải thẻ Chương xếp ngang */}
        <div className="flex overflow-x-auto gap-3 pb-3 pt-1 snap-x snap-mandatory scrollbar-thin">
          {units.map((unit, index) => {
            const isSelected = selectedUnitId === unit.id;
            return (
              <button
                key={unit.id || index}
                onClick={() => {
                  sounds.playTap?.();
                  setSelectedUnitId(unit.id);
                }}
                className={`snap-start shrink-0 w-[240px] sm:w-[270px] text-left p-3.5 rounded-2xl border-2 transition-all flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-[#58CC02] text-white border-[#46A302] shadow-md'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-[#58CC02]'
                }`}
              >
                <div className="flex items-center justify-between gap-2 w-full mb-1.5">
                  <span className={`text-[11px] font-black uppercase px-2 py-0.5 rounded-md ${
                    isSelected ? 'bg-black/20 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                    Chương {unit.unit_number || index + 1} • {unit.levelBadge || currentLevel?.code || 'Cơ bản'}
                  </span>
                  <span className="text-xs font-extrabold">
                    {unit.lessons?.filter(l => l.completed || l.is_completed === 1).length || 0}/{unit.lessons?.length || 0} bài
                  </span>
                </div>
                <h3 className="font-extrabold text-sm sm:text-base line-clamp-1">
                  {unit.title}
                </h3>
                <p className={`text-xs line-clamp-1 mt-0.5 ${isSelected ? 'text-lime-100' : 'text-slate-500 dark:text-slate-400'}`}>
                  {unit.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. DANH SÁCH BÀI HỌC XẾP NGANG THEO LƯỚI (KHÔNG BAO GIỜ CHỒNG CHÉO) */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-slate-400 space-y-3">
          <div className="w-10 h-10 border-4 border-[#58CC02] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-bold">Đang tải bài học...</p>
        </div>
      ) : units.length === 0 ? (
        <div className="text-center py-16 text-slate-400 duo-card p-8 rounded-2xl">
          <BookOpen className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p className="font-bold">Chưa có bài học nào trong cấp độ này.</p>
        </div>
      ) : currentUnit && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-sm">
          {/* Tiêu đề chương đang chọn + Nút Sổ tay */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="min-w-0 flex-1">
              <h3 className="text-base sm:text-lg font-black text-slate-800 dark:text-white">
                {currentUnit.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                {currentUnit.description}
              </p>
            </div>
            <button
              onClick={() => onOpenGuidebook && onOpenGuidebook(currentUnit)}
              className="shrink-0 px-3.5 py-2 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-[#1CB0F6] border border-sky-200 dark:border-sky-800 font-extrabold text-xs sm:text-sm flex items-center gap-1.5 hover:bg-sky-100 cursor-pointer"
            >
              <span>📖 Sổ tay chương</span>
            </button>
          </div>

          {/* Lưới bài học xếp ngang từ trái qua phải (2 cột trên điện thoại, 3-4 cột trên máy tính) */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {currentUnit.lessons?.map((lesson, idx) => {
              const isCompleted = lesson.completed || lesson.status === 'completed' || lesson.is_completed === 1;
              const isUnlocked = isFreeMode || isCompleted || idx === 0 || currentUnit.lessons[idx - 1]?.is_completed === 1 || currentUnit.lessons[idx - 1]?.completed;
              const isLocked = !isUnlocked;
              const isCurrent = !isCompleted && !isLocked;

              return (
                <div
                  key={lesson.id || idx}
                  onClick={() => onSelectLesson(lesson)}
                  className={`relative rounded-2xl border-2 p-3.5 flex flex-col justify-between transition-all cursor-pointer hover:shadow-md ${
                    isCompleted
                      ? 'bg-white dark:bg-slate-800 border-amber-300 dark:border-amber-600/60 hover:border-amber-400'
                      : isCurrent
                      ? 'bg-lime-50/60 dark:bg-lime-950/20 border-[#58CC02] shadow-sm'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-[#58CC02]'
                  }`}
                >
                  <div>
                    {/* Dòng trên cùng: Số bài + Nhãn trạng thái */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-extrabold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                        Bài {lesson.lesson_number || idx + 1}
                      </span>
                      {isCompleted ? (
                        <span className="px-2 py-0.5 text-[11px] font-extrabold rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                          ✓ Đã xong
                        </span>
                      ) : isCurrent ? (
                        <span className="px-2 py-0.5 text-[11px] font-extrabold rounded-full bg-[#58CC02] text-white">
                          ★ Đang học
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 text-[11px] font-bold rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                          Chưa học
                        </span>
                      )}
                    </div>

                    {/* Tên bài học hiển thị đầy đủ, không bị cắt hay đè */}
                    <h4 className="font-extrabold text-sm sm:text-base text-slate-800 dark:text-slate-100 line-clamp-2 mb-1">
                      {lesson.title}
                    </h4>
                    {lesson.description && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium line-clamp-2 mt-0.5">
                        {lesson.description}
                      </p>
                    )}
                  </div>

                  {/* Nút hành động dưới đáy thẻ */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectLesson(lesson);
                    }}
                    className={`mt-3 w-full py-2 px-3 rounded-xl font-extrabold text-xs sm:text-sm text-center transition-all cursor-pointer ${
                      isCompleted
                        ? 'bg-amber-400 hover:bg-amber-500 text-slate-900 shadow-xs'
                        : isCurrent
                        ? 'bg-[#58CC02] hover:bg-[#46A302] text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-700 hover:bg-[#58CC02] hover:text-white text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    {isCompleted ? 'Ôn tập lại' : isCurrent ? 'Bắt đầu học ➔' : 'Vào học ngay'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
