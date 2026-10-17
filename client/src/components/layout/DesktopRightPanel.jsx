import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { Flame, Heart, Gem, Zap, Trophy, ShieldAlert, Plus, Sparkles } from 'lucide-react';

export const DesktopRightPanel = () => {
  const { userProfile, refillHearts } = useApp();
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

  return (
    <aside className="hidden xl:flex flex-col w-80 2xl:w-96 sticky top-0 h-[100dvh] overflow-y-auto border-l-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 z-20 space-y-6">
      {/* Top Header Gamification Stats Bar */}
      <div className="grid grid-cols-3 gap-2 p-2 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
        {/* Streak */}
        <div className="flex items-center justify-center gap-1.5 py-1.5">
          <Flame className="w-5 h-5 text-amber-500 fill-amber-500 animate-bounce-short" />
          <span className="font-extrabold text-amber-600 dark:text-amber-400 text-sm">
            {userProfile.streak || 1}
          </span>
        </div>

        {/* Gems */}
        <div className="flex items-center justify-center gap-1.5 py-1.5">
          <Gem className="w-5 h-5 text-sky-500 fill-sky-500" />
          <span className="font-extrabold text-sky-600 dark:text-sky-400 text-sm">
            {userProfile.gems || 0}
          </span>
        </div>

        {/* Hearts */}
        <div className="flex items-center justify-center gap-1.5 py-1.5">
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
          <span className="font-extrabold text-rose-600 dark:text-rose-400 text-sm">
            {userProfile.hearts}/{userProfile.max_hearts || 5}
          </span>
        </div>
      </div>

      {/* Hearts Recovery Card */}
      {userProfile.hearts < 5 && (
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border-2 border-rose-200 dark:border-rose-900/50 flex items-center justify-between">
          <div>
            <h4 className="font-extrabold text-rose-600 dark:text-rose-400 text-sm">
              Bạn đang còn {userProfile.hearts} tim!
            </h4>
            <p className="text-xs text-rose-500/80 mt-0.5">
              Hồi phục ngay bằng 100 Đá Quý
            </p>
          </div>
          <button
            onClick={handleRefill}
            disabled={isRefilling}
            className="duo-btn duo-btn-red text-xs py-2 px-3 rounded-xl flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            <span>Nạp tim</span>
          </button>
        </div>
      )}

      {/* Daily XP Goal */}
      <div className="duo-card p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
            <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-200">
              Mục Tiêu Hôm Nay
            </h3>
          </div>
          <span className="text-xs font-bold text-slate-400">
            {Math.min(userProfile.xp, 50)} / 50 XP
          </span>
        </div>
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-400 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, (userProfile.xp / 50) * 100)}%` }}
          />
        </div>
        <p className="text-xs text-slate-400 mt-2">
          {userProfile.xp >= 50
            ? '🎉 Chúc mừng! Bạn đã hoàn thành mục tiêu ngày hôm nay!'
            : `Còn thiếu ${50 - Math.min(userProfile.xp, 50)} XP nữa để hoàn thành mục tiêu.`}
        </p>
      </div>

      {/* Weekly League Leaderboard */}
      <div className="duo-card p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-200">
              Bảng Xếp Hạng Vàng
            </h3>
          </div>
          <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">
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
