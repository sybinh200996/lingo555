import React from 'react';
import { DesktopSidebar } from './DesktopSidebar';
import { DesktopRightPanel } from './DesktopRightPanel';
import { BottomNav } from './BottomNav';
import { MobileHeader } from './MobileHeader';

export const AppLayout = ({ children }) => {
  return (
    <div className="min-h-[100dvh] bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 overflow-x-hidden">
      {/* Mobile Top Header (<1024px) */}
      <MobileHeader />

      {/* Desktop 3-column Layout: Max width 1280px centered */}
      <div className="max-w-[1280px] mx-auto flex justify-center">
        {/* Cột Trái - Left Sidebar (w-[256px]) */}
        <DesktopSidebar />

        {/* Cột Giữa - Khu vực Bản đồ Học tập (flex-1 max-w-[620px]) */}
        <main className="flex-1 max-w-[620px] w-full min-h-[calc(100dvh-56px)] lg:min-h-[100dvh] px-4 pt-6 pb-28 lg:pb-12">
          {children}
        </main>

        {/* Cột Phải - Right Widgets Panel (w-[360px]) */}
        <DesktopRightPanel />
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </div>
  );
};
