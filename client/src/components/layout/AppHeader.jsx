import React from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { sounds } from '../../services/soundEffects';
import { UserAvatar } from '../common/UserAvatar';
import { Flame, Heart, Gem, Sparkles, Bot, Moon, Sun, Settings, User } from 'lucide-react';

export const AppHeader = () => {
  const { 
    currentLang, 
    switchLanguage, 
    currentLevel,
    userProfile, 
    refillHearts, 
    openAiSettings, 
    hasAiKey,
    openGemShop, 
    openQuests,
    openPlacement,
    openLevelModal,
    openAiTutor,
    activeLessonId,
    isDarkMode,
    toggleTheme,
    setActiveTab
  } = useApp();

  const { isAuthenticated, user, isSyncing, openAuthModal, isAdmin } = useAuth();

  // Hide header when in active lesson to preserve 100% full screen
  if (activeLessonId) {
    return null;
  }

  return (
    <header className="h-14 sm:h-16 shrink-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-2 sm:px-6 flex items-center justify-between gap-1.5 sm:gap-3 z-20 select-none pt-[env(safe-area-inset-top)]">
      {/* Trái: Nút đổi ngôn ngữ & chọn Cấp độ siêu gọn nhẹ, không tràn màn hình */}
      <div className="flex items-center shrink-0">
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
          <button
            onClick={() => {
              sounds.playTap?.();
              if (currentLang === 'zh') {
                openLevelModal();
              } else {
                switchLanguage('zh');
              }
            }}
            className={`px-2 py-1 rounded-lg text-[11px] sm:text-xs font-black transition-all cursor-pointer ${
              currentLang === 'zh'
                ? 'bg-white dark:bg-slate-700 text-[#58CC02] shadow-xs'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
            title="Tiếng Trung - Bấm để chọn cấp độ HSK"
          >
            🇨🇳 {currentLang === 'zh' ? (currentLevel?.code || 'HSK') : 'Trung'}
          </button>
          <button
            onClick={() => {
              sounds.playTap?.();
              if (currentLang === 'en') {
                openLevelModal();
              } else {
                switchLanguage('en');
              }
            }}
            className={`px-2 py-1 rounded-lg text-[11px] sm:text-xs font-black transition-all cursor-pointer ${
              currentLang === 'en'
                ? 'bg-white dark:bg-slate-700 text-[#1CB0F6] shadow-xs'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
            title="Tiếng Anh - Bấm để chọn cấp độ CEFR"
          >
            🇬🇧 {currentLang === 'en' ? (currentLevel?.code || 'A1') : 'Anh'}
          </button>
        </div>
      </div>

      {/* Phải: Streak, Gems, Hearts (Chỉ hiện khi ĐÃ ĐĂNG NHẬP), Cài đặt Admin, Nút Đăng Nhập */}
      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
        {/* 1. CHỈ HIỆN STREAK, GEMS, HEARTS KHI ĐÃ ĐĂNG NHẬP */}
        {isAuthenticated && (
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* 🔥 Streak */}
            <button 
              onClick={() => {
                sounds.playTap?.();
                openQuests();
              }}
              className="flex items-center gap-1 font-black text-xs sm:text-sm text-[#FF9600] active:scale-95 transition-all cursor-pointer px-1 py-0.5 sm:px-1.5 sm:py-1 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-950/40 shrink-0"
              title="Chuỗi ngày học liên tục - Bấm xem nhiệm vụ"
            >
              <Flame className="w-4 h-4 fill-[#FF9600]" />
              <span>{userProfile.streak || 1}</span>
              {userProfile.streak_freezes > 0 && (
                <span className="text-[10px] text-sky-400" title={`${userProfile.streak_freezes} khiên đóng băng`}>❄️</span>
              )}
            </button>

            {/* 💎 Gems */}
            <button
              onClick={() => {
                sounds.playTap?.();
                openGemShop();
              }}
              className="flex items-center gap-1 font-black text-xs sm:text-sm text-[#1CB0F6] active:scale-95 transition-all cursor-pointer px-1 py-0.5 sm:px-1.5 sm:py-1 rounded-lg hover:bg-sky-50 dark:hover:bg-sky-950/40 shrink-0"
              title="Đá Quý - Bấm mở Cửa Hàng"
            >
              <Gem className="w-4 h-4 fill-[#1CB0F6]" />
              <span>{userProfile.gems || 0}</span>
            </button>

            {/* ❤️ Hearts */}
            <button
              onClick={() => {
                sounds.playTap?.();
                refillHearts();
              }}
              className="flex items-center gap-1 font-black text-xs sm:text-sm text-[#FF4B4B] active:scale-95 transition-all cursor-pointer px-1 py-0.5 sm:px-1.5 sm:py-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 shrink-0"
              title="Trái Tim - Bấm để hồi máu"
            >
              <Heart className="w-4 h-4 fill-[#FF4B4B]" />
              <span className="inline sm:hidden">{userProfile.hearts}</span>
              <span className="hidden sm:inline">{userProfile.hearts}/{userProfile.max_hearts || 5}</span>
            </button>
          </div>
        )}

        {/* AI Tutor Quick Button (Chỉ hiện từ màn hình Tablet/Desktop trở lên) */}
        <button
          onClick={() => {
            sounds.playTap?.();
            openAiTutor(null);
          }}
          className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 font-extrabold text-xs transition-all border border-emerald-200 dark:border-emerald-800 cursor-pointer shadow-xs shrink-0"
          title="Hỏi Gia Sư AI"
        >
          <Bot className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span className="hidden lg:inline">AI Tutor</span>
        </button>

        {/* 2. CHỈ HIỆN BIỂU TƯỢNG CÀI ĐẶT BÁNH RĂNG CƯA KHI CÓ QUYỀN ADMIN */}
        {isAdmin && (
          <button
            onClick={() => {
              sounds.playTap?.();
              openAiSettings();
            }}
            className={`p-1.5 sm:p-2 rounded-xl transition-all border cursor-pointer shrink-0 ${
              hasAiKey
                ? 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                : 'text-amber-600 bg-amber-50 dark:bg-amber-950/50 border-amber-300 dark:border-amber-700'
            }`}
            title="Quản trị Viên - Cài đặt AI & Cấu hình"
          >
            <Settings className="w-4 h-4" />
          </button>
        )}

        {/* 3. NÚT ĐĂNG NHẬP (KHI CHƯA ĐĂNG NHẬP) / AVATAR (KHI ĐÃ ĐĂNG NHẬP) */}
        {!isAuthenticated ? (
          <button
            onClick={() => {
              sounds.playTap?.();
              openAuthModal('login');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#58CC02] hover:bg-[#46A302] border-b-2 border-[#3D8C02] text-white font-black text-xs transition-all cursor-pointer shadow-xs active:translate-y-0.5 shrink-0"
            title="Đăng nhập để đồng bộ tiến trình học tập"
          >
            <User className="w-3.5 h-3.5" />
            <span>Đăng Nhập</span>
          </button>
        ) : (
          <button
            onClick={() => {
              sounds.playTap?.();
              setActiveTab('profile');
            }}
            className="flex items-center gap-1.5 p-1 sm:px-2 sm:py-1 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer relative shrink-0"
            title="Hồ sơ tài khoản - Đã đồng bộ Cloud"
          >
            <div className="w-6 h-6 rounded-lg overflow-hidden flex items-center justify-center shrink-0">
              <UserAvatar 
                avatar={user?.avatar_url || '🐼'} 
                name={user?.full_name} 
                className="w-full h-full rounded-lg" 
                textClassName="text-base sm:text-lg" 
              />
            </div>
            <span className="hidden sm:inline font-bold text-xs text-slate-800 dark:text-slate-200 max-w-[80px] truncate">
              {user?.full_name?.split(' ')[0] || 'Tôi'}
            </span>
            <span 
              className={`w-2 h-2 rounded-full absolute -top-0.5 -right-0.5 ${
                isSyncing ? 'bg-amber-400 animate-spin' : 'bg-emerald-500 ring-2 ring-white dark:ring-slate-900'
              }`}
              title={isSyncing ? "Đang đồng bộ đám mây..." : "Đã đồng bộ đám mây"}
            />
          </button>
        )}

        {/* Nút chuyển Sáng/Tối */}
        {!isAuthenticated && (
          <button
            onClick={() => {
              sounds.playTap?.();
              toggleTheme();
            }}
            className="p-1.5 sm:p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer shrink-0"
            title="Chuyển giao diện Sáng / Tối"
          >
            {isDarkMode ? <Moon className="w-3.5 h-3.5 text-indigo-400" /> : <Sun className="w-3.5 h-3.5 text-amber-500" />}
          </button>
        )}
      </div>
    </header>
  );
};
