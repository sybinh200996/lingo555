import React from 'react';
import { useApp } from '../../context/AppContext';
import { sounds } from '../../services/soundEffects';
import { Flame, Heart, Gem, Sun, Moon, Sparkles } from 'lucide-react';

export const MobileHeader = () => {
  const { 
    currentLang, 
    switchLanguage, 
    userProfile, 
    refillHearts, 
    isDarkMode, 
    toggleTheme, 
    openAiSettings, 
    hasAiKey,
    openGemShop,
    openQuests,
    activeLessonId
  } = useApp();

  // Hide mobile header when lesson is active to preserve 100% full screen
  if (activeLessonId) {
    return null;
  }

  return (
    <header className="lg:hidden sticky top-0 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b-2 border-slate-200 dark:border-slate-800 px-3.5 py-2.5 flex items-center justify-between">
      {/* Quick Language Toggle */}
      <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border-2 border-slate-200 dark:border-slate-700">
        <button
          onClick={() => {
            sounds.playTap?.();
            switchLanguage('zh');
          }}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-black transition-all cursor-pointer ${
            currentLang === 'zh'
              ? 'bg-[#58CC02] text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
          }`}
        >
          <span>🇨🇳</span>
          <span>Trung</span>
        </button>
        <button
          onClick={() => {
            sounds.playTap?.();
            switchLanguage('en');
          }}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-black transition-all cursor-pointer ${
            currentLang === 'en'
              ? 'bg-[#1CB0F6] text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
          }`}
        >
          <span>🇬🇧</span>
          <span>Anh</span>
        </button>
      </div>

      {/* Gamification Stats: Streak, Gems, Hearts */}
      <div className="flex items-center gap-2">
        {/* Streak & Quests */}
        <button 
          onClick={() => {
            sounds.playTap?.();
            openQuests();
          }}
          className="flex items-center gap-1 text-xs font-black text-amber-500 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-xl border border-amber-200 dark:border-amber-800 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          title="Nhiệm vụ hàng ngày"
        >
          <Flame className="w-4 h-4 fill-amber-500" />
          <span>{userProfile.streak || 1}</span>
          {userProfile.streak_freezes > 0 && (
            <span className="text-[10px] text-sky-400" title={`${userProfile.streak_freezes} khiên đóng băng`}>❄️</span>
          )}
        </button>

        {/* Gems & Shop */}
        <button
          onClick={() => {
            sounds.playTap?.();
            openGemShop();
          }}
          className="flex items-center gap-1 text-xs font-black text-[#1CB0F6] bg-sky-50 dark:bg-sky-950/40 px-2.5 py-1 rounded-xl border border-sky-200 dark:border-sky-800 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          title="Cửa hàng Đá Quý"
        >
          <Gem className="w-4 h-4 fill-[#1CB0F6]" />
          <span>{userProfile.gems || 0}</span>
        </button>

        {/* Hearts with tap to refill */}
        <button
          onClick={() => {
            sounds.playTap?.();
            refillHearts();
          }}
          className="flex items-center gap-1 text-xs font-black text-[#FF4B4B] bg-rose-50 dark:bg-rose-950/40 px-2.5 py-1 rounded-xl border border-rose-200 dark:border-rose-800 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          title="Bấm để hồi phục Tim"
        >
          <Heart className="w-4 h-4 fill-[#FF4B4B]" />
          <span>{userProfile.hearts}/{userProfile.max_hearts || 5}</span>
        </button>

        {/* AI Gemini Settings */}
        <button
          onClick={() => {
            sounds.playTap?.();
            openAiSettings();
          }}
          className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-[#58CC02] rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 relative cursor-pointer"
          title="Cài đặt AI Gemini"
        >
          <Sparkles className="w-4 h-4 text-[#58CC02]" />
          {hasAiKey && (
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#58CC02] animate-ping" />
          )}
        </button>

        {/* Theme Toggle */}
        <button
          onClick={() => {
            sounds.playTap?.();
            toggleTheme();
          }}
          className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
        >
          {isDarkMode ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
        </button>
      </div>
    </header>
  );
};
