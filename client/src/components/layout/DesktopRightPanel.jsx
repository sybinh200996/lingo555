import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { Flame, Heart, Gem, Zap, Trophy, ShieldAlert, Plus, Sparkles } from 'lucide-react';

export const DesktopRightPanel = () => {
  const { userProfile, refillHearts, openGemShop, openQuests } = useApp();
  const [leaderboard, setLeaderboard] = useState([]);
  const [isRefilling, setIsRefilling] = useState(false);

  useEffect(() => {
    loadLeaderboard();
  }, [userProfile.xp]);

  const loadLeaderboard = async () => {
    try {
      const data = await api.getLeaderboard();
      setLeaderboard(data);
    } catch (e) {
      console.warn('Failed to load leaderboard:', e);
    }
  };

  const handleRefill = async () => {
    setIsRefilling(true);
    await refillHearts();
    setIsRefilling(false);
  };

  const isDoubleXp = userProfile?.double_xp_until && new Date(userProfile.double_xp_until) > new Date();

  return (
    <aside className="hidden xl:flex flex-col w-80 2xl:w-96 sticky top-0 h-[100dvh] overflow-y-auto border-l-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 z-20 space-y-6">
      {/* Top Header Gamification Stats Bar */}
      <div className="grid grid-cols-3 gap-2.5">
        {/* Streak */}
        <button 
          onClick={openQuests}
          className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border-2 border-b-[4px] border-amber-200 dark:border-amber-800/80 hover:scale-105 active:border-b-2 active:translate-y-0.5 transition-all"
          title="Nhiệm vụ hôm nay"
        >
          <Flame className="w-5 h-5 text-amber-500 fill-amber-500 animate-bounce-short" />
          <span className="font-black text-amber-600 dark:text-amber-400 text-sm">
            {userProfile.streak || 1}
          </span>
          {userProfile.streak_freezes > 0 && (
            <span className="text-[10px]" title={`${userProfile.streak_freezes} khiên đóng băng`}>❄️</span>
          )}
        </button>

        {/* Gems */}
        <button 
          onClick={openGemShop}
          className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border-2 border-b-[4px] border-sky-200 dark:border-sky-800/80 hover:scale-105 active:border-b-2 active:translate-y-0.5 transition-all"
          title="Cửa hàng Đá Quý"
        >
          <Gem className="w-5 h-5 text-[#1CB0F6] fill-[#1CB0F6]" />
          <span className="font-black text-[#1CB0F6] dark:text-sky-400 text-sm">
            {userProfile.gems || 0}
          </span>
        </button>

        {/* Hearts */}
        <button
          onClick={handleRefill}
          className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border-2 border-b-[4px] border-rose-200 dark:border-rose-800/80 hover:scale-105 active:border-b-2 active:translate-y-0.5 transition-all"
          title="Nạp lại tim"
        >
          <Heart className="w-5 h-5 text-[#FF4B4B] fill-[#FF4B4B]" />
          <span className="font-black text-[#FF4B4B] dark:text-rose-400 text-sm">
            {userProfile.hearts}/{userProfile.max_hearts || 5}
          </span>
        </button>
      </div>

      {/* Double XP Potion Active Banner */}
      {isDoubleXp && (
        <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border-2 border-purple-500/40 flex items-center justify-between text-xs font-black text-purple-700 dark:text-purple-300 animate-pulse">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 fill-current text-purple-500" />
            <span>Đang kích hoạt x2 XP!</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500 text-white font-black">15p</span>
        </div>
      )}

      {/* Quick Action Gamification Buttons */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          onClick={openGemShop}
          className="btn-3d-blue py-2.5 px-3 rounded-2xl text-xs flex items-center justify-center gap-1.5 shadow-sm"
        >
          <Gem className="w-4 h-4 fill-white" />
          <span>Cửa Hàng</span>
        </button>
        <button
          onClick={openQuests}
          className="btn-3d-white py-2.5 px-3 rounded-2xl text-xs flex items-center justify-center gap-1.5 text-amber-600 dark:text-amber-400 shadow-sm"
        >
          <Trophy className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span>Nhiệm Vụ</span>
        </button>
      </div>

      {/* Hearts Recovery Card */}
      {userProfile.hearts < 5 && (
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border-2 border-rose-200 dark:border-rose-900/50 flex items-center justify-between">
          <div>
            <h4 className="font-black text-[#FF4B4B] dark:text-rose-400 text-sm">
              Bạn đang còn {userProfile.hearts} tim!
            </h4>
            <p className="text-xs text-rose-500/80 mt-0.5 font-medium">
              Hồi phục ngay bằng 30 Đá Quý
            </p>
          </div>
          <button
            onClick={handleRefill}
            disabled={isRefilling}
            className="btn-3d-green text-xs py-2 px-3.5 rounded-xl flex items-center gap-1"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Nạp tim</span>
          </button>
        </div>
      )}

      {/* Daily XP Goal */}
      <div className="duo-card p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
            <h3 className="font-black text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Mục Tiêu Hôm Nay
            </h3>
          </div>
          <span className="text-xs font-black text-amber-500">
            {Math.min(userProfile.xp, 50)} / 50 XP
          </span>
        </div>
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-3.5 rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500 shadow-inner"
            style={{ width: `${Math.min(100, (userProfile.xp / 50) * 100)}%` }}
          />
        </div>
        <div className="flex items-center justify-between pt-1">
          <p className="text-[11px] text-slate-400 font-bold">
            {userProfile.xp >= 50
              ? '🎉 Hoàn thành mục tiêu!'
              : `Còn ${50 - Math.min(userProfile.xp, 50)} XP nữa`}
          </p>
          <button 
            onClick={openQuests}
            className="text-[11px] font-black text-[#1CB0F6] hover:underline uppercase tracking-wider"
          >
            Nhiệm vụ &rarr;
          </button>
        </div>
      </div>

      {/* Weekly League Leaderboard */}
      <div className="duo-card p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500 fill-amber-500" />
            <h3 className="font-black text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Bảng Xếp Hạng Vàng
            </h3>
          </div>
          <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 uppercase tracking-wider">
            Top 10
          </span>
        </div>

        <div className="space-y-2.5">
          {leaderboard.map((user) => {
            const isMe = user.isCurrent || user.id === 'default_user';
            let medalColor = 'text-slate-400';
            if (user.rank === 1) medalColor = 'text-amber-500';
            if (user.rank === 2) medalColor = 'text-slate-400 font-bold';
            if (user.rank === 3) medalColor = 'text-amber-700';

            return (
              <div
                key={user.id}
                className={`flex items-center justify-between p-2.5 rounded-xl transition-all ${
                  isMe
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-400 font-extrabold'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-5 text-center font-black text-sm ${medalColor}`}>
                    {user.rank}
                  </span>
                  <span className="text-xl">{user.avatar || '👤'}</span>
                  <div>
                    <h5 className="text-sm font-bold text-slate-700 dark:text-slate-200 leading-none">
                      {user.name} {isMe && <span className="text-emerald-500 text-xs">(Bạn)</span>}
                    </h5>
                    <span className="text-xs text-slate-400">🔥 {user.streak || 1} ngày</span>
                  </div>
                </div>
                <div className="font-extrabold text-sm text-amber-500">
                  {user.xp} XP
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Super Learning Tip */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <h4 className="font-extrabold text-sm">Mẹo Học Tốc Độ Cao</h4>
        </div>
        <p className="text-xs text-indigo-100 leading-relaxed">
          Lặp lại ngắt quãng (SRS) vào mỗi buổi sáng giúp não bộ chuyển từ vựng vào trí nhớ dài hạn nhanh gấp 3 lần!
        </p>
      </div>
    </aside>
  );
};
