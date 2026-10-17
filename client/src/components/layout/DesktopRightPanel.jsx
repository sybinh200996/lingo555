import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { sounds } from '../../services/soundEffects';
import { 
  Flame, 
  Heart, 
  Gem, 
  Zap, 
  Sparkles, 
  Bot, 
  Settings,
  ChevronRight,
  Plus
} from 'lucide-react';

export const DesktopRightPanel = () => {
  const { 
    currentLang,
    switchLanguage,
    currentLevel,
    userProfile, 
    refillHearts, 
    openGemShop, 
    openQuests,
    openPlacement,
    openAiSettings,
    openAiTutor,
    hasAiKey
  } = useApp();

  const [isRefilling, setIsRefilling] = useState(false);

  const handleRefill = async () => {
    sounds.playTap?.();
    setIsRefilling(true);
    await refillHearts();
    setIsRefilling(false);
  };

  const dailyXpTarget = 50;
  const currentDailyXp = Math.min(userProfile.xp || 0, dailyXpTarget);
  const xpPercent = Math.min(100, Math.round((currentDailyXp / dailyXpTarget) * 100));

  return (
    <aside className="hidden lg:flex w-[360px] sticky top-0 h-[100dvh] overflow-y-auto px-6 py-6 flex-col gap-5 border-l-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 z-20 shrink-0 select-none">
      {/* Top Stats Bar */}
      <div className="flex items-center justify-between gap-1.5 pb-2 border-b border-slate-100 dark:border-slate-800">
        {/* Language Switcher Pill */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => {
              sounds.playTap?.();
              switchLanguage('zh');
            }}
            className={`px-2 py-1 rounded-xl text-xs font-black transition-all cursor-pointer ${
              currentLang === 'zh' 
                ? 'bg-white dark:bg-slate-700 text-[#58CC02] shadow-xs' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
            title="Học Tiếng Trung"
          >
            🇨🇳 {currentLang === 'zh' ? (currentLevel?.code || 'HSK1') : 'Trung'}
          </button>
          <button
            onClick={() => {
              sounds.playTap?.();
              switchLanguage('en');
            }}
            className={`px-2 py-1 rounded-xl text-xs font-black transition-all cursor-pointer ${
              currentLang === 'en' 
                ? 'bg-white dark:bg-slate-700 text-[#1CB0F6] shadow-xs' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
            title="Học Tiếng Anh"
          >
            🇬🇧 {currentLang === 'en' ? (currentLevel?.code || 'A1') : 'Anh'}
          </button>
        </div>

        {/* Streak */}
        <button
          onClick={() => {
            sounds.playTap?.();
            openQuests();
          }}
          className="flex items-center gap-1 font-black text-sm text-[#FF9600] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          title="Chuỗi ngày học liên tục"
        >
          <Flame className="w-5 h-5 fill-[#FF9600]" />
          <span>{userProfile.streak || 1}</span>
          {userProfile.streak_freezes > 0 && (
            <span className="text-[10px] text-sky-400" title={`${userProfile.streak_freezes} khiên đóng băng`}>❄️</span>
          )}
        </button>

        {/* Gems */}
        <button
          onClick={() => {
            sounds.playTap?.();
            openGemShop();
          }}
          className="flex items-center gap-1 font-black text-sm text-[#1CB0F6] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          title="Cửa hàng Đá Quý"
        >
          <Gem className="w-5 h-5 fill-[#1CB0F6]" />
          <span>{userProfile.gems || 0}</span>
        </button>

        {/* Hearts */}
        <button
          onClick={handleRefill}
          disabled={isRefilling}
          className="flex items-center gap-1 font-black text-sm text-[#FF4B4B] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          title="Bấm để hồi phục Tim"
        >
          <Heart className="w-5 h-5 fill-[#FF4B4B]" />
          <span>{userProfile.hearts}/{userProfile.max_hearts || 5}</span>
        </button>

        {/* AI Settings */}
        <button
          onClick={() => {
            sounds.playTap?.();
            openAiSettings();
          }}
          className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 relative cursor-pointer"
          title="Cài đặt AI Gemini"
        >
          <Settings className="w-4 h-4" />
          {hasAiKey && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#58CC02] ring-2 ring-white dark:ring-slate-900" />
          )}
        </button>
      </div>

      {/* Widget 1: Placement Test Card (Học vượt cấp / Kiểm tra Xếp lớp) */}
      <div className="rounded-2xl p-5 bg-gradient-to-br from-indigo-600 via-purple-600 to-sky-500 text-white shadow-lg space-y-3 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-xs">
            Học Vượt Cấp
          </span>
          <Sparkles className="w-4 h-4 text-amber-300" />
        </div>
        <div>
          <h4 className="font-black text-base leading-tight">
            Kiểm Tra Xếp Lớp Đầu Vào
          </h4>
          <p className="text-xs text-white/90 mt-1 leading-relaxed font-medium">
            Làm bài test 8 câu thích ứng để mở khóa ngay toàn bộ các chặng trước đó!
          </p>
        </div>
        <button
          onClick={() => {
            sounds.playTap?.();
            openPlacement();
          }}
          className="btn-3d-green w-full py-2.5 rounded-xl text-xs uppercase font-black tracking-wider cursor-pointer shadow-md flex items-center justify-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 fill-current" />
          <span>Kiểm tra trình độ ngay</span>
        </button>
      </div>

      {/* Widget 2: Daily Quests Card (Nhiệm vụ Hàng ngày) */}
      <div className="border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-5 bg-white dark:bg-slate-900 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-500">
              <Zap className="w-4 h-4 fill-amber-500" />
            </div>
            <h3 className="font-black text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Nhiệm Vụ Hàng Ngày
            </h3>
          </div>
          <button
            onClick={() => {
              sounds.playTap?.();
              openQuests();
            }}
            className="text-[11px] font-black text-[#1CB0F6] hover:underline uppercase tracking-wider flex items-center gap-0.5 cursor-pointer"
          >
            <span>Xem</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Rounded Progress Bar with Treasure Chest at the end */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-3">
            <div className="flex-1 h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500 shadow-inner"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
            <div 
              onClick={() => {
                sounds.playTap?.();
                openQuests();
              }}
              className="text-2xl shrink-0 cursor-pointer animate-bounce-short hover:scale-110 transition-transform" 
              title="Rương quà bí mật - Bấm để nhận thưởng"
            >
              🎁
            </div>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-bold">
            <span>Tiến độ: {currentDailyXp}/{dailyXpTarget} XP</span>
            <span>{xpPercent}%</span>
          </div>
        </div>
      </div>

      {/* Widget 3: Daily XP Progress & Quick AI Tutor */}
      <div className="border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-5 bg-white dark:bg-slate-900 shadow-sm space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-sky-100 dark:bg-sky-950/60 flex items-center justify-center text-[#1CB0F6]">
              <Bot className="w-4 h-4" />
            </div>
            <h3 className="font-black text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Gia Sư AI Cá Nhân
            </h3>
          </div>
          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            24/7
          </span>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
          Luyện nói tự do và phản xạ hội thoại theo tình huống thực tế với AI Tutor chuẩn phát âm.
        </p>

        <button
          onClick={() => {
            sounds.playTap?.();
            openAiTutor(null);
          }}
          className="btn-3d-blue w-full py-3 rounded-2xl text-xs uppercase font-black tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-sm"
        >
          <Bot className="w-4 h-4 text-white" />
          <span>Vào Phòng Luyện AI Ngay</span>
        </button>
      </div>

      {/* Hearts Recovery Alert if hearts are low */}
      {userProfile.hearts < 5 && (
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border-2 border-rose-200 dark:border-rose-900/50 flex items-center justify-between">
          <div>
            <h4 className="font-black text-[#FF4B4B] text-xs">
              Còn {userProfile.hearts} tim!
            </h4>
            <p className="text-[11px] text-rose-500/80 mt-0.5 font-semibold">
              Hồi phục ngay bằng 30 Đá Quý
            </p>
          </div>
          <button
            onClick={handleRefill}
            disabled={isRefilling}
            className="btn-3d-green text-xs py-1.5 px-3 rounded-xl flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>Nạp</span>
          </button>
        </div>
      )}
    </aside>
  );
};
