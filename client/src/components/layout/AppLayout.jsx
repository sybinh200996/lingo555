import React from 'react';
import { useApp } from '../../context/AppContext';
import { DesktopSidebar } from './DesktopSidebar';
import { AppHeader } from './AppHeader';
import { RightSideWidgets } from './RightSideWidgets';
import { BottomNav } from './BottomNav';

export const AppLayout = ({ children }) => {
  const { activeTab, activeLessonId } = useApp();

  return (
    /* KHUNG BAO NGOÀI CÙNG: Cố định toàn màn hình, tương thích mọi trình duyệt cũ/mới */
    <div className="fixed inset-0 w-full h-full flex flex-col lg:flex-row bg-[#F8FAFC] dark:bg-[#0F172A] text-slate-800 dark:text-slate-100 overflow-hidden">
      {/* 1. SIDEBAR TRÁI (CHỈ HIỆN TRÊN DESKTOP >= 1024px) - Chiếm chiều rộng cố định 240px-260px, không bao giờ đè lên nội dung giữa */}
      <DesktopSidebar />

      {/* 2. KHU VỰC TRUNG TÂM (HEADER + NỘI DUNG CUỘN ĐỘC LẬP + BOTTOM NAV MOBILE) */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
        {/* 2.1. TOP HEADER: Chiều cao cố định 56px-64px, không bao giờ bị đè */}
        <AppHeader />

        {/* 2.2. VÙNG NỘI DUNG CHÍNH: Cuộn độc lập, tự động chừa khoảng trống chuẩn xác */}
        <main className="flex-1 w-full overflow-y-auto overflow-x-hidden p-3 sm:p-5 lg:p-6">
          <div className="max-w-[1360px] mx-auto w-full">
            {/* Bố cục Grid trên Desktop: 8 cột cho Lộ trình ngang + 4 cột cho Bảng Nhiệm vụ/Thống kê */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
              {/* CỘT CHÍNH (8/12 trên màn hình lớn khi ở tab learn, hoặc 12/12 nếu ở tab từ điển/hội thoại/luyện tập) */}
              <div className={`${activeTab === 'learn' ? 'xl:col-span-8' : 'xl:col-span-12'} min-w-0 w-full space-y-6`}>
                {children}
              </div>

              {/* CỘT PHỤ BÊN PHẢI (4/12 trên màn hình lớn, xếp xuống dưới gọn gàng trên Mobile/Tablet) */}
              {activeTab === 'learn' && (
                <div className="xl:col-span-4 min-w-0 w-full space-y-4">
                  <RightSideWidgets />
                </div>
              )}
            </div>
          </div>
        </main>

        {/* 2.3. BOTTOM NAVIGATION BAR (CHỈ HIỆN TRÊN MOBILE < 1024px KHI KHÔNG TRONG BÀI HỌC) */}
        <BottomNav />
      </div>
    </div>
  );
};
