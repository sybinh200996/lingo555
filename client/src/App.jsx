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
