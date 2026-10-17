import React from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { sounds } from '../../services/soundEffects';
import { Flame, Heart, Gem, Sparkles, User } from 'lucide-react';

export const MobileHeader = () => {
  const { 
    currentLang, 
    switchLanguage, 
    userProfile, 
    refillHearts, 
    openAiSettings, 
    hasAiKey,
    openGemShop,
    openQuests,
    activeLessonId,
    currentLevel,
    openLevelModal,
    setActiveTab
  } = useApp();

  const { isAuthenticated, user, isSyncing, openAuthModal } = useAuth();

  // Hide mobile header when lesson is active to preserve 100% full screen
  if (activeLessonId) {
    return null;
  }

  return (
    <header className="lg:hidden sticky top-0 z-30 h-14 bg-white/95 dark:bg-[#131F24]/95 backdrop-blur-md border-b-2 border-[#E5E5E5] dark:border-[#37464F] px-4 flex items-center justify-between select-none">
      {/* 1. Nút chọn Ngôn ngữ & Cấp độ */}
      <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-full border border-slate-200 dark:border-slate-700">
        <button
          onClick={() => {
            sounds.playTap?.();
            if (currentLang === 'zh') {
              openLevelModal();
            } else {
              switchLanguage('zh');
            }
          }}
          className={`px-2.5 py-1 rounded-full text-xs font-black transition-all cursor-pointer ${
            currentLang === 'zh'
              ? 'bg-white dark:bg-slate-700 text-[#58CC02] shadow-xs'
              : 'text-slate-400'
          }`}
          title="Bấm để chọn cấp độ HSK"
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
          className={`px-2.5 py-1 rounded-full text-xs font-black transition-all cursor-pointer ${
            currentLang === 'en'
              ? 'bg-white dark:bg-slate-700 text-[#1CB0F6] shadow-xs'
              : 'text-slate-400'
          }`}
          title="Bấm để chọn cấp độ CEFR"
        >
          🇬🇧 {currentLang === 'en' ? (currentLevel?.code || 'A1') : 'Anh'}
        </button>
      </div>

      {/* 2, 3, 4: Streak, Gems, Hearts + AI Settings icon */}
      <div className="flex items-center gap-3.5">
        {/* 🔥 [Số Streak] màu #FF9600 đậm */}
        <button 
          onClick={() => {
            sounds.playTap?.();
            openQuests();
          }}
          className="flex items-center gap-1 font-black text-sm text-[#FF9600] active:scale-95 transition-all cursor-pointer"
          title="Chuỗi ngày học liên tục"
        >
          <Flame className="w-5 h-5 fill-[#FF9600]" />
          <span>{userProfile.streak || 1}</span>
          {userProfile.streak_freezes > 0 && (
            <span className="text-[10px] text-sky-400" title={`${userProfile.streak_freezes} khiên đóng băng`}>❄️</span>
          )}
        </button>

        {/* 💎 [Số Gems] màu #1CB0F6 đậm - bấm vào mở Shop */}
        <button
          onClick={() => {
            sounds.playTap?.();
            openGemShop();
          }}
          className="flex items-center gap-1 font-black text-sm text-[#1CB0F6] active:scale-95 transition-all cursor-pointer"
          title="Cửa hàng Đá Quý"
        >
          <Gem className="w-5 h-5 fill-[#1CB0F6]" />
          <span>{userProfile.gems || 0}</span>
        </button>

        {/* ❤️ [Số Tim] màu #FF4B4B đậm */}
        <button
          onClick={() => {
            sounds.playTap?.();
            refillHearts();
          }}
          className="flex items-center gap-1 font-black text-sm text-[#FF4B4B] active:scale-95 transition-all cursor-pointer"
          title="Bấm để hồi phục Tim"
        >
          <Heart className="w-5 h-5 fill-[#FF4B4B]" />
          <span>{userProfile.hearts}/{userProfile.max_hearts || 5}</span>
        </button>

        {/* Nút Icon Cài đặt AI nhỏ gọn */}
        <button
          onClick={() => {
            sounds.playTap?.();
            openAiSettings();
          }}
          className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl relative cursor-pointer"
          title="Cài đặt AI Gemini"
        >
          <Sparkles className="w-4 h-4 text-[#58CC02]" />
          {hasAiKey && (
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#58CC02] ring-1 ring-white" />
          )}
        </button>

        {/* User Account / Login Button */}
        {!isAuthenticated ? (
          <button
            onClick={() => {
              sounds.playTap?.();
              openAuthModal('login');
            }}
            className="px-2 py-1 rounded-lg bg-[#58CC02] text-white font-black text-[11px] active:scale-95 cursor-pointer shadow-xs"
            title="Đăng nhập"
          >
            Đăng Nhập
          </button>
        ) : (
          <button
            onClick={() => {
              sounds.playTap?.();
              setActiveTab('profile');
            }}
            className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 relative cursor-pointer"
            title="Hồ sơ tài khoản"
          >
            <span className="text-base leading-none">{user?.avatar_url || '🐼'}</span>
            <span 
              className={`w-2 h-2 rounded-full absolute -top-0.5 -right-0.5 ${
                isSyncing ? 'bg-amber-400 animate-spin' : 'bg-emerald-500 ring-2 ring-white dark:ring-slate-900'
              }`} 
            />
          </button>
        )}
      </div>
    </header>
  );
};
