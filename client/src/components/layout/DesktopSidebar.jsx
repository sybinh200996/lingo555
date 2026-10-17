import React from 'react';
import { useApp } from '../../context/AppContext';
import { sounds } from '../../services/soundEffects';
import { 
  Compass, 
  BookOpen, 
  Sparkles, 
  MessageSquare, 
  User, 
  Moon, 
  Sun,
  Bot
} from 'lucide-react';

export const DesktopSidebar = () => {
  const { 
    activeTab, 
    setActiveTab, 
    isDarkMode, 
    toggleTheme,
    openAiSettings,
    hasAiKey
  } = useApp();

  const navItems = [
    { id: 'learn', label: 'Lộ Trình', icon: Compass },
    { id: 'dict', label: 'Từ Điển 50k+', icon: BookOpen },
    { id: 'practice', label: 'Luyện Tập', icon: Sparkles },
    { id: 'speak', label: 'Hội Thoại', icon: MessageSquare },
    { id: 'profile', label: 'Hồ Sơ', icon: User },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-[256px] sticky top-0 h-[100dvh] border-r-2 border-slate-200 dark:border-slate-800 px-4 py-6 justify-between bg-white dark:bg-slate-900 z-20 shrink-0 select-none">
      <div>
        {/* Duolingo Brand Logo */}
        <div className="flex items-center gap-3 px-2 mb-8">
          <div className="w-10 h-10 rounded-2xl bg-[#58CC02] flex items-center justify-center text-white shadow-md border-b-4 border-[#46A302] shrink-0">
            <span className="text-2xl font-black">🦉</span>
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-[#58CC02]">
              lingo555
            </h1>
            <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Học Song Ngữ Pro</p>
          </div>
        </div>

        {/* Navigation Items with rounded-2xl & Duolingo active blue pill */}
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  sounds.playTap?.();
                  setActiveTab(item.id);
                }}
                className={`w-full rounded-2xl px-4 py-3.5 font-extrabold text-sm tracking-wider uppercase flex items-center gap-4 transition-all text-left cursor-pointer ${
                  isActive
                    ? 'bg-[#DDF4FF] dark:bg-sky-950/60 text-[#1CB0F6] border-2 border-[#84D8FF] dark:border-sky-700 shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 border-2 border-transparent'
                }`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-[#1CB0F6]' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Controls: AI Settings & Theme Toggle */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
        <button
          onClick={() => {
            sounds.playTap?.();
            openAiSettings();
          }}
          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-black text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-slate-200 dark:border-slate-800 cursor-pointer"
          title="Cài đặt Google Gemini API"
        >
          <div className="flex items-center gap-2.5">
            <Bot className="w-4 h-4 text-[#58CC02]" />
            <span>Gia Sư AI 24/7</span>
          </div>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase ${
            hasAiKey 
              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' 
              : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
          }`}>
            {hasAiKey ? 'Đã bật' : 'Offline'}
          </span>
        </button>

        <button
          onClick={() => {
            sounds.playTap?.();
            toggleTheme();
          }}
          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            {isDarkMode ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
            <span>{isDarkMode ? 'Giao diện Tối' : 'Giao diện Sáng'}</span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
            {isDarkMode ? 'Dark' : 'Light'}
          </span>
        </button>

        <div className="text-center text-[10px] font-bold text-slate-400 pt-1">
          Lingo555 Production V2.0
        </div>
      </div>
    </aside>
  );
};
