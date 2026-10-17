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
    { id: 'learn', label: 'Lộ Trình', icon: Compass, color: 'text-[#58CC02]' },
    { id: 'dict', label: 'Từ Điển', icon: BookOpen, color: 'text-[#1CB0F6]' },
    { id: 'practice', label: 'Luyện Tập', icon: Sparkles, color: 'text-[#FFC800]' },
    { id: 'speak', label: 'Hội Thoại', icon: MessageSquare, color: 'text-[#CE82FF]' },
    { id: 'profile', label: 'Hồ Sơ', icon: User, color: 'text-[#FF4B4B]' },
  ];

  return (
    <nav 
      className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t-2 border-slate-200 dark:border-slate-800 px-2 pt-1.5"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 8px)' }}
    >
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => {
                sounds.playTap();
                setActiveTab(tab.id);
              }}
              className={`flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-2xl transition-all relative ${
                isActive
                  ? 'text-slate-900 dark:text-white font-black'
                  : 'text-slate-400 dark:text-slate-500 font-bold hover:text-slate-600'
              }`}
            >
              <div
                className={`p-1.5 rounded-xl transition-all ${
                  isActive
                    ? 'bg-[#E5F6DF] dark:bg-emerald-950/60 border border-[#58CC02]/40 shadow-xs scale-105'
                    : 'active:scale-95'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? tab.color : 'text-slate-400 dark:text-slate-500'}`} />
              </div>
              <span className={`text-[11px] mt-1 tracking-tight uppercase ${isActive ? 'text-slate-900 dark:text-white font-black' : ''}`}>
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute -bottom-1 w-2.5 h-1 bg-[#58CC02] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
