import React from 'react';
import { useApp } from '../../context/AppContext';
import { Flame, Heart, Gem, Sun, Moon, Sparkles } from 'lucide-react';

export const MobileHeader = () => {
  const { currentLang, switchLanguage, userProfile, refillHearts, isDarkMode, toggleTheme, openAiSettings, hasAiKey } = useApp();

  return (
    <header className="lg:hidden sticky top-0 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-2.5 flex items-center justify-between">
      {/* Quick Language Toggle */}
      <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
        <button
          onClick={() => switchLanguage('zh')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
            currentLang === 'zh'
              ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-300 shadow-sm'
              : 'text-slate-400'
          }`}
        >
          <span>🇨🇳</span>
          <span>Trung</span>
        </button>
        <button
          onClick={() => switchLanguage('en')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
            currentLang === 'en'
              ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-300 shadow-sm'
              : 'text-slate-400'
          }`}
        >
          <span>🇬🇧</span>
          <span>Anh</span>
        </button>
      </div>

      {/* Gamification Stats: Streak, Gems, Hearts */}
      <div className="flex items-center gap-3">
        {/* Streak */}
        <div className="flex items-center gap-1 text-xs font-extrabold text-amber-500">
          <Flame className="w-4 h-4 fill-amber-500" />
          <span>{userProfile.streak || 1}</span>
        </div>

        {/* Gems */}
        <div className="flex items-center gap-1 text-xs font-extrabold text-sky-500">
          <Gem className="w-4 h-4 fill-sky-500" />
          <span>{userProfile.gems || 0}</span>
        </div>

        {/* Hearts with tap to refill */}
        <button
          onClick={refillHearts}
          className="flex items-center gap-1 text-xs font-extrabold text-rose-500 bg-rose-50 dark:bg-rose-950/40 px-2 py-1 rounded-lg border border-rose-200 dark:border-rose-900/40"
        >
          <Heart className="w-4 h-4 fill-rose-500" />
          <span>{userProfile.hearts}/{userProfile.max_hearts || 5}</span>
        </button>

        {/* AI Gemini Settings */}
        <button
          onClick={openAiSettings}
          className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-emerald-500 rounded-lg relative"
          title="Cài đặt AI Gemini"
        >
          <Sparkles className="w-4 h-4 text-emerald-500" />
          {hasAiKey && (
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          )}
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg"
        >
          {isDarkMode ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
        </button>
      </div>
    </header>
  );
};
