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
  ChevronRight,
  Plus
} from 'lucide-react';

export const RightSideWidgets = () => {
  const { 
    userProfile, 
    refillHearts, 
    openGemShop, 
    openQuests,
    openPlacement,
    openAiTutor
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
    <div className="space-y-4 select-none">
      {/* Widget 1: Placement Test Card (Học vượt cấp / Kiểm tra Xếp lớp) */}
      <div className="rounded-2xl p-5 bg-gradient-to-br from-indigo-600 via-purple-600 to-sky-500 text-white shadow-md space-y-3 relative overflow-hidden">
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
            Làm bài test 8 câu thích ứng để nhảy cóc và mở khóa ngay cấp độ phù hợp!
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
          <span>Kiểm Tra Trình Độ Ngay</span>
        </button>
      </div>

      {/* Widget 2: Daily Quests Card (Nhiệm vụ Hàng ngày & Rương Quà) */}
      <div className="border-2 border-[#E5E5E5] dark:border-[#37464F] rounded-2xl p-5 bg-white dark:bg-[#1B2B32] shadow-xs space-y-3">
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

        {/* Progress Bar with Treasure Chest */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-3">
            <div className="flex-1 h-3.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden p-0.5">
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
            <span>Mục tiêu: {currentDailyXp}/{dailyXpTarget} XP</span>
            <span>{xpPercent}%</span>
          </div>
        </div>
      </div>

      {/* Widget 3: Quick AI Tutor Launcher */}
      <div className="border-2 border-[#E5E5E5] dark:border-[#37464F] rounded-2xl p-5 bg-white dark:bg-[#1B2B32] shadow-xs space-y-3">
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
          Luyện nói tự do và phản xạ hội thoại tình huống thực tế với gia sư AI chuẩn bản xứ.
        </p>

        <button
          onClick={() => {
            sounds.playTap?.();
            openAiTutor(null);
          }}
          className="btn-3d-blue w-full py-2.5 rounded-xl text-xs uppercase font-black tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xs"
        >
          <Bot className="w-4 h-4 text-white" />
          <span>Vào Phòng Luyện AI</span>
        </button>
      </div>

      {/* Low Hearts Recovery Callout */}
      {userProfile.hearts < 5 && (
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border-2 border-rose-200 dark:border-rose-900/50 flex items-center justify-between shadow-xs">
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
            className="btn-3d-green text-xs px-3 py-1.5 rounded-xl uppercase font-black cursor-pointer shadow-xs"
          >
            {isRefilling ? '...' : '+ Hồi Tim'}
          </button>
        </div>
      )}
    </div>
  );
};
