import React from 'react';
import { useApp } from '../../context/AppContext';
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
    { id: 'learn', label: 'Lộ Trình Học', icon: Compass, color: 'text-emerald-500' },
    { id: 'dict', label: 'Từ Điển 50k+', icon: BookOpen, color: 'text-sky-500' },
    { id: 'practice', label: 'Luyện Tập & SRS', icon: Sparkles, color: 'text-amber-500' },
    { id: 'speak', label: 'AI Hội Thoại', icon: MessageSquare, color: 'text-purple-500' },
    { id: 'profile', label: 'Hồ Sơ & Admin', icon: User, color: 'text-rose-500' },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 xl:w-72 h-screen sticky top-0 border-r-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 justify-between z-20">
      <div>
        {/* Brand Logo */}
        <div className="flex items-center gap-3 px-3 py-4 mb-4">
          <div className="w-11 h-11 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 border-b-4 border-emerald-700">
            <span className="text-2xl font-black">L</span>
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-emerald-600 dark:text-emerald-400">
              Lingo555
            </h1>
            <p className="text-xs text-slate-400 font-medium">Bilingual Polyglot Hub</p>
          </div>
        </div>

        {/* Quick Language Switcher Dropdown */}
        <div className="mb-6 px-1">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">
            Ngôn ngữ đang học
          </div>
          <div className="grid grid-cols-2 gap-2 bg-slate-100 dark:bg-slate-800/60 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => switchLanguage('zh')}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-sm transition-all ${
                currentLang === 'zh'
                  ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-300 shadow-sm border-b-2 border-slate-300 dark:border-slate-600'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <span className="text-lg">🇨🇳</span>
              <span>Tiếng Trung</span>
            </button>
            <button
              onClick={() => switchLanguage('en')}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-sm transition-all ${
                currentLang === 'en'
                  ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-300 shadow-sm border-b-2 border-slate-300 dark:border-slate-600'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <span className="text-lg">🇬🇧</span>
              <span>Tiếng Anh</span>
            </button>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all text-left ${
                  isActive
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-2 border-emerald-400/60 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
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
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span>AI Gemini 2.5</span>
          </div>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold uppercase ${
            hasAiKey 
              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' 
              : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
          }`}>
            {hasAiKey ? 'Đã bật' : 'Offline'}
          </span>
        </button>

        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-between px-4 py-2.5 rounded-2xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <div className="flex items-center gap-3">
            {isDarkMode ? <Moon className="w-5 h-5 text-indigo-400" /> : <Sun className="w-5 h-5 text-amber-500" />}
            <span>{isDarkMode ? 'Chế độ Tối' : 'Chế độ Sáng'}</span>
          </div>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
            {isDarkMode ? 'Bật' : 'Tắt'}
          </span>
        </button>

        <div className="px-4 py-2 text-center text-xs text-slate-400">
          Lingo555 Web App v1.0 • PWA Ready
        </div>
      </div>
    </aside>
  );
};
