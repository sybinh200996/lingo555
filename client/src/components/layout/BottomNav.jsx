import React from 'react';
import { useApp } from '../../context/AppContext';
import { sounds } from '../../services/soundEffects';
import { Compass, BookOpen, Sparkles, MessageSquare, User } from 'lucide-react';

export const BottomNav = () => {
  const { activeTab, setActiveTab, activeLessonId } = useApp();

  // Hide bottom navigation completely when a lesson is active (100% full screen for exercises, like Duolingo)
  if (activeLessonId) {
    return null;
  }

  const tabs = [
    { id: 'learn', label: 'Lộ Trình', icon: Compass },
    { id: 'dict', label: 'Từ Điển', icon: BookOpen },
    { id: 'practice', label: 'Luyện Tập', icon: Sparkles },
    { id: 'speak', label: 'Hội Thoại', icon: MessageSquare },
    { id: 'profile', label: 'Hồ Sơ', icon: User },
  ];

  return (
    <nav 
      className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t-2 border-slate-200 dark:border-slate-800 pb-[env(safe-area-inset-bottom)] select-none"
    >
      <div className="grid grid-cols-5 h-16 items-center px-1 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => {
                sounds.playTap?.();
                setActiveTab(tab.id);
              }}
              className="flex flex-col items-center justify-center py-1 px-1 transition-all cursor-pointer active:scale-95"
            >
              <div
                className={`flex flex-col items-center justify-center w-full transition-all ${
                  isActive
                    ? 'bg-[#DDF4FF] dark:bg-sky-950 text-[#1CB0F6] border-2 border-[#84D8FF] rounded-xl p-1.5 shadow-xs'
                    : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 p-1.5 border-2 border-transparent'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#1CB0F6]' : 'text-slate-400 dark:text-slate-500'}`} />
                <span className={`text-[11px] font-extrabold mt-0.5 tracking-tight ${isActive ? 'text-[#1CB0F6]' : 'text-slate-500 dark:text-slate-400'}`}>
                  {tab.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
