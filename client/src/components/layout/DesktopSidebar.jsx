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
  Globe2,
  ChevronDown
} from 'lucide-react';

export const DesktopSidebar = () => {
  const { 
    currentLang, 
    switchLanguage, 
    activeTab, 
    setActiveTab, 
    isDarkMode, 
    toggleTheme,
    openAiSettings,
    hasAiKey
  } = useApp();

  const navItems = [
    { id: 'learn', label: 'Lộ Trình Học', icon: Compass, color: 'text-[#58CC02]', activeBorder: 'border-[#58CC02]', activeBg: 'bg-[#E5F6DF] dark:bg-emerald-950/40 text-[#58CC02]' },
    { id: 'dict', label: 'Từ Điển 50k+', icon: BookOpen, color: 'text-[#1CB0F6]', activeBorder: 'border-[#1CB0F6]', activeBg: 'bg-[#DDF4FF] dark:bg-sky-950/40 text-[#1CB0F6]' },
    { id: 'practice', label: 'Luyện Tập & SRS', icon: Sparkles, color: 'text-[#FFC800]', activeBorder: 'border-[#FFC800]', activeBg: 'bg-[#FFF5D6] dark:bg-amber-950/40 text-[#D97706]' },
    { id: 'speak', label: 'AI Hội Thoại', icon: MessageSquare, color: 'text-[#CE82FF]', activeBorder: 'border-[#CE82FF]', activeBg: 'bg-[#F7E8FF] dark:bg-purple-950/40 text-[#A855F7]' },
    { id: 'profile', label: 'Hồ Sơ Cá Nhân', icon: User, color: 'text-[#FF4B4B]', activeBorder: 'border-[#FF4B4B]', activeBg: 'bg-[#FFEBEB] dark:bg-rose-950/40 text-[#EF4444]' },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 xl:w-72 sticky top-0 h-[100dvh] overflow-y-auto border-r-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 justify-between z-20">
      <div>
        {/* Duolingo Brand Logo */}
        <div className="flex items-center gap-3 px-3 py-3 mb-4">
          <div className="w-11 h-11 rounded-2xl bg-[#58CC02] flex items-center justify-center text-white shadow-md border-b-4 border-[#46A302]">
            <span className="text-2xl font-black">🦉</span>
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-[#58CC02] dark:text-[#58CC02]">
              Lingo555
            </h1>
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Học Tiếng Song Ngữ Pro</p>
          </div>
        </div>

        {/* Quick Language Switcher Dropdown */}
        <div className="mb-6 px-1">
          <div className="text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2 px-2">
            Ngôn ngữ đang học
          </div>
          <div className="grid grid-cols-2 gap-2 bg-slate-100 dark:bg-slate-800/60 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => switchLanguage('zh')}
              className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl font-black text-xs transition-all ${
                currentLang === 'zh'
                  ? 'bg-white dark:bg-slate-700 text-[#58CC02] shadow-sm border-b-2 border-slate-300 dark:border-slate-600'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <span className="text-base">🇨🇳</span>
              <span>Tiếng Trung</span>
            </button>
            <button
              onClick={() => switchLanguage('en')}
              className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl font-black text-xs transition-all ${
                currentLang === 'en'
                  ? 'bg-white dark:bg-slate-700 text-[#1CB0F6] shadow-sm border-b-2 border-slate-300 dark:border-slate-600'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <span className="text-base">🇬🇧</span>
              <span>Tiếng Anh</span>
            </button>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  sounds.playTap();
                  setActiveTab(item.id);
                }}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider transition-all text-left ${
                  isActive
                    ? `${item.activeBg} border-2 ${item.activeBorder} shadow-sm -translate-y-0.5`
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 active:translate-y-0.5'
                }`}
              >
                <Icon className={`w-5 h-5 ${item.color}`} />
                <span className="flex-1">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Controls: AI Settings, Dark Mode Toggle & PWA badge */}
      <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-1.5">
        <button
          onClick={openAiSettings}
          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-800/80 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all border border-slate-200/80 dark:border-slate-700/60 shadow-2xs"
          title="Cài đặt Google Gemini API"
        >
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-[#58CC02]" />
            <span className="font-extrabold">Gia Sư AI 24/7</span>
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
          onClick={toggleTheme}
          className="w-full flex items-center justify-between px-4 py-2.5 rounded-2xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <div className="flex items-center gap-3">
            {isDarkMode ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
            <span>{isDarkMode ? 'Giao diện Tối' : 'Giao diện Sáng'}</span>
          </div>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
            {isDarkMode ? 'Dark' : 'Light'}
          </span>
        </button>

        <div className="px-4 py-1.5 text-center text-[11px] font-bold text-slate-400">
          Lingo555 Production V2.0
        </div>
      </div>
    </aside>
  );
};
