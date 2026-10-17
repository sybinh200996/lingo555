import React from 'react';
import { DesktopSidebar } from './DesktopSidebar';
import { DesktopRightPanel } from './DesktopRightPanel';
import { BottomNav } from './BottomNav';
import { MobileHeader } from './MobileHeader';

export const AppLayout = ({ children }) => {
  return (
    <div className="min-h-[100dvh] bg-slate-50 dark:bg-slate-950 flex flex-col lg:flex-row text-slate-800 dark:text-slate-100 overflow-x-hidden max-w-full">
      {/* Mobile Top Header */}
      <MobileHeader />

      {/* Desktop Left Sidebar */}
      <DesktopSidebar />

      {/* Center Main Stage */}
      <main className="flex-1 max-w-4xl mx-auto w-full min-h-[calc(100dvh-60px)] lg:min-h-[100dvh] pb-24 md:pb-8 px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>

      {/* Desktop Right Gamification Panel */}
      <DesktopRightPanel />

      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </div>
  );
};
