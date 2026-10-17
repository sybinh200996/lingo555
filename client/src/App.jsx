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
import { Bot } from 'lucide-react';

function MainContent() {
  const { activeTab, isAiTutorOpen, openAiTutor } = useApp();

  return (
    <>
      {activeTab === 'learn' && <SkillTree />}
      {activeTab === 'dict' && <SmartDictionary />}
      {activeTab === 'practice' && <PracticeHub />}
      {activeTab === 'speak' && <SpeakHub />}
      {activeTab === 'profile' && <ProfileHub />}
      
      {/* Modals */}
      <LessonModal />
      <AISettingsModal />
      <FloatingAITutor />

      {/* Global Floating AI Tutor Trigger FAB (when tutor is closed) */}
      {!isAiTutorOpen && (
        <button
          onClick={() => openAiTutor(null)}
          className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-40 duo-btn duo-btn-green px-4 py-3 rounded-full flex items-center gap-2.5 shadow-xl hover:scale-105 active:scale-95 transition-all text-xs font-black uppercase tracking-wider"
          title="Hỏi Gia Sư AI 24/7"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <span className="hidden sm:inline">Gia Sư AI 24/7</span>
          <span className="sm:hidden">Hỏi AI</span>
          <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
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
