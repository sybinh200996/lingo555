import React from 'react';
import { useApp } from '../../context/AppContext';
import { Compass, BookOpen, Sparkles, MessageSquare, User } from 'lucide-react';

export const BottomNav = () => {
  const { activeTab, setActiveTab, activeLessonId } = useApp();

  // Hide bottom navigation completely when a lesson is active (100% full screen for exercises, like Duolingo)
  if (activeLessonId) {
    return null;
  }

  const tabs = [
    { id: 'learn', label: 'Lộ Trình', icon: Compass, color: 'text-emerald-500' },
    { id: 'dict', label: 'Từ Điển', icon: BookOpen, color: 'text-sky-500' },
    { id: 'practice', label: 'Luyện Tập', icon: Sparkles, color: 'text-amber-500' },
    { id: 'speak', label: 'Hội Thoại', icon: MessageSquare, color: 'text-purple-500' },
    { id: 'profile', label: 'Hồ Sơ', icon: User, color: 'text-rose-500' },
  ];

  return (
    <nav 
      className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t-2 border-slate-200 dark:border-slate-800 px-3 pt-1.5"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 8px)' }}
    >
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-2xl transition-all relative ${
                isActive
                  ? 'text-slate-900 dark:text-white font-extrabold -translate-y-1'
                  : 'text-slate-400 dark:text-slate-500 font-medium'
              }`}
            >
              <div
                className={`p-1.5 rounded-xl transition-all ${
                  isActive
                    ? 'bg-slate-100 dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700'
                    : ''
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? tab.color : 'text-slate-400'}`} />
              </div>
              <span className="text-[11px] mt-0.5 tracking-tight">{tab.label}</span>
              {isActive && (
                <span className="absolute -bottom-1 w-2 h-1 bg-emerald-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
