import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AppLayout } from './components/layout/AppLayout';
import { SkillTree } from './components/learn/SkillTree';
import { SmartDictionary } from './components/dictionary/SmartDictionary';
import { PracticeHub } from './components/practice/PracticeHub';
import { SpeakHub } from './components/speak/SpeakHub';
import { ProfileHub } from './components/profile/ProfileHub';
import { LessonModal } from './components/lesson/LessonModal';
import { FloatingAITutor } from './components/ai/FloatingAITutor';
import { AISettingsModal } from './components/ai/AISettingsModal';
import { GemShopModal } from './components/gamification/GemShopModal';
import { DailyQuestsModal } from './components/gamification/DailyQuestsModal';
import { PodcastPlayerModal } from './components/podcast/PodcastPlayerModal';
import { PlacementTestModal } from './components/placement/PlacementTestModal';
import { LevelSelectorModal } from './components/learn/LevelSelectorModal';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { Bot } from 'lucide-react';

function MainContent() {
  const { 
    activeTab, 
    isAiTutorOpen, 
    openAiTutor, 
    activeLessonId,
    isGemShopOpen,
    closeGemShop,
    isQuestsOpen,
    closeQuests,
    isPodcastOpen,
    closePodcast,
    isPlacementOpen,
    closePlacement,
    isLevelModalOpen,
    closeLevelModal,
    setCurrentLevel
  } = useApp();

  // Hide global floating button when in a lesson or in the AI Speak tab
  const showFab = !isAiTutorOpen && !activeLessonId && activeTab !== 'speak';

  return (
    <>
      <ErrorBoundary title="Lỗi hiển thị nội dung học tập">
        {activeTab === 'learn' && <SkillTree />}
        {activeTab === 'dict' && <SmartDictionary />}
        {activeTab === 'practice' && <PracticeHub />}
        {activeTab === 'speak' && <SpeakHub />}
        {activeTab === 'profile' && <ProfileHub />}
      </ErrorBoundary>
      
      {/* Modals with isolated ErrorBoundaries */}
      <ErrorBoundary title="Lỗi trong bài học">
        <LessonModal />
      </ErrorBoundary>
      <ErrorBoundary title="Lỗi cấu hình AI">
        <AISettingsModal />
      </ErrorBoundary>
      <ErrorBoundary title="Lỗi Gia Sư AI">
        <FloatingAITutor />
      </ErrorBoundary>
      <ErrorBoundary title="Lỗi Cửa Hàng Đá Quý">
        <GemShopModal isOpen={isGemShopOpen} onClose={closeGemShop} />
      </ErrorBoundary>
      <ErrorBoundary title="Lỗi Nhiệm Vụ Hàng Ngày">
        <DailyQuestsModal isOpen={isQuestsOpen} onClose={closeQuests} />
      </ErrorBoundary>
      <ErrorBoundary title="Lỗi Podcast Thụ Động">
        <PodcastPlayerModal isOpen={isPodcastOpen} onClose={closePodcast} />
      </ErrorBoundary>
      <ErrorBoundary title="Lỗi Bài Test Xếp Lớp">
        <PlacementTestModal 
          isOpen={isPlacementOpen} 
          onClose={closePlacement} 
          onPlacementComplete={(targetLevel) => {
            if (targetLevel) {
              setCurrentLevel(targetLevel);
            }
          }}
        />
      </ErrorBoundary>
      <ErrorBoundary title="Lỗi Chọn Lộ Trình">
        <LevelSelectorModal isOpen={isLevelModalOpen} onClose={closeLevelModal} />
      </ErrorBoundary>

      {/* Global Sleek Floating AI Tutor Trigger (Desktop only, never overlaps on mobile) */}
      {showFab && (
        <button
          onClick={() => openAiTutor(null)}
          className="hidden lg:flex fixed bottom-6 right-6 z-30 duo-btn duo-btn-green px-4 py-3 rounded-full items-center justify-center gap-2 shadow-2xl hover:scale-105 active:scale-95 transition-all group cursor-pointer"
          title="Hỏi Gia Sư AI 24/7"
          aria-label="Hỏi Gia Sư AI"
        >
          <div className="relative flex items-center justify-center">
            <Bot className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-300 animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-white" />
          </div>
          <span className="hidden lg:inline text-xs font-black uppercase tracking-wider text-white">
            Gia Sư AI 24/7
          </span>
        </button>
      )}
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppLayout>
        <MainContent />
      </AppLayout>
    </AppProvider>
  );
}
