import React from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { sounds } from '../../services/soundEffects';
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

  const { isAuthenticated, user, isSyncing, openAuthModal } = useAuth();

  // Hide header when in active lesson to preserve 100% full screen
  if (activeLessonId) {
    return null;
  }

  return (
    <header className="h-14 sm:h-16 shrink-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-3 sm:px-6 flex items-center justify-between gap-2 z-20 select-none">
      {/* Trái: Nút đổi ngôn ngữ & chọn Cấp độ nhỏ gọn */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => {
              sounds.playTap?.();
              if (currentLang === 'zh') {
                openLevelModal();
              } else {
                switchLanguage('zh');
              }
            }}
            className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all cursor-pointer ${
              currentLang === 'zh'
                ? 'bg-white dark:bg-slate-700 text-[#58CC02] shadow-xs'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
            title="Tiếng Trung - Bấm để chọn cấp độ HSK"
          >
            🇨🇳 {currentLang === 'zh' ? `${currentLevel?.code || 'HSK'} ▾` : 'Trung'}
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
            className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all cursor-pointer ${
              currentLang === 'en'
                ? 'bg-white dark:bg-slate-700 text-[#1CB0F6] shadow-xs'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
            title="Tiếng Anh - Bấm để chọn cấp độ CEFR"
          >
            🇬🇧 {currentLang === 'en' ? `${currentLevel?.code || 'A1'} ▾` : 'Anh'}
          </button>
        </div>
      </div>

      {/* Phải: Các chỉ số Streak, Gems, Hearts, Nút AI Tutor, Nút Cài đặt */}
      <div className="flex items-center gap-2 sm:gap-3.5">
        {/* 🔥 Streak */}
        <button 
          onClick={() => {
            sounds.playTap?.();
            openQuests();
          }}
          className="flex items-center gap-1 font-black text-xs sm:text-sm text-[#FF9600] active:scale-95 transition-all cursor-pointer px-1.5 py-1 rounded-xl hover:bg-amber-50 dark:hover:bg-amber-950/40"
          title="Chuỗi ngày học liên tục - Bấm xem nhiệm vụ"
        >
          <Flame className="w-4 h-4 sm:w-5 sm:h-5 fill-[#FF9600]" />
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
          className="flex items-center gap-1 font-black text-xs sm:text-sm text-[#1CB0F6] active:scale-95 transition-all cursor-pointer px-1.5 py-1 rounded-xl hover:bg-sky-50 dark:hover:bg-sky-950/40"
          title="Đá Quý - Bấm mở Cửa Hàng"
        >
          <Gem className="w-4 h-4 sm:w-5 sm:h-5 fill-[#1CB0F6]" />
          <span>{userProfile.gems || 0}</span>
        </button>

        {/* ❤️ Hearts */}
        <button
          onClick={() => {
            sounds.playTap?.();
            refillHearts();
          }}
          className="flex items-center gap-1 font-black text-xs sm:text-sm text-[#FF4B4B] active:scale-95 transition-all cursor-pointer px-1.5 py-1 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40"
          title="Trái Tim - Bấm để hồi máu"
        >
          <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-[#FF4B4B]" />
          <span>{userProfile.hearts}/{userProfile.max_hearts || 5}</span>
        </button>

        {/* AI Tutor Quick Button */}
        <button
          onClick={() => {
            sounds.playTap?.();
            openAiTutor(null);
          }}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 font-extrabold text-xs transition-all border border-emerald-200 dark:border-emerald-800 cursor-pointer shadow-xs"
          title="Hỏi Gia Sư AI"
        >
          <Bot className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span className="hidden sm:inline">AI Tutor</span>
        </button>

        {/* AI Key Settings */}
        <button
          onClick={() => {
            sounds.playTap?.();
            openAiSettings();
          }}
          className={`p-2 rounded-xl transition-all border cursor-pointer ${
            hasAiKey
              ? 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
              : 'text-amber-600 bg-amber-50 dark:bg-amber-950/50 border-amber-300 dark:border-amber-700'
          }`}
          title={hasAiKey ? "Cài đặt Gia Sư AI" : "Chưa cài API Key AI - Bấm để thêm"}
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* User Account / Login Button */}
        {!isAuthenticated ? (
          <button
            onClick={() => {
              sounds.playTap?.();
              openAuthModal('login');
            }}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#58CC02] hover:bg-[#46A302] border-b-2 border-[#3D8C02] text-white font-black text-xs transition-all cursor-pointer shadow-xs active:translate-y-0.5"
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
            className="flex items-center gap-1.5 p-1 sm:px-2 sm:py-1 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer relative"
            title="Hồ sơ tài khoản - Đã đồng bộ Cloud"
          >
            <span className="text-base sm:text-lg leading-none">{user?.avatar_url || '🐼'}</span>
            <span className="hidden sm:inline font-bold text-xs text-slate-800 dark:text-slate-200 max-w-[80px] truncate">
              {user?.full_name?.split(' ')[0] || 'Tôi'}
            </span>
            {/* Pulsing Synced Cloud Dot */}
            <span 
              className={`w-2 h-2 rounded-full absolute -top-0.5 -right-0.5 ${
                isSyncing ? 'bg-amber-400 animate-spin' : 'bg-emerald-500 ring-2 ring-white dark:ring-slate-900'
              }`}
              title={isSyncing ? "Đang đồng bộ đám mây..." : "Đã đồng bộ đám mây"}
            />
          </button>
        )}

        {/* Theme Toggle (Visible on Mobile Header) */}
        <button
          onClick={() => {
            sounds.playTap?.();
            toggleTheme();
          }}
          className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
          title="Chuyển giao diện Sáng / Tối"
        >
          {isDarkMode ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
        </button>
      </div>
    </header>
  );
};
