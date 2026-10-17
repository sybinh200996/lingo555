import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { sounds } from '../../services/soundEffects';
import { 
  X, 
  Trophy, 
  CheckCircle2, 
  Sparkles, 
  Gem, 
  Zap, 
  BookOpen, 
  Mic, 
  Bookmark,
  Calendar
} from 'lucide-react';

export const DailyQuestsModal = ({ isOpen, onClose }) => {
  const { userProfile, refreshProfile } = useApp();
  const [quests, setQuests] = useState(() => getTodayQuests());
  const [claiming, setClaiming] = useState(null);

  function getTodayQuests() {
    const today = new Date().toISOString().split('T')[0];
    const defaultQuests = {
      date: today,
      lessons: { title: 'Hoàn thành 2 bài học', target: 2, current: 0, rewardGems: 15, rewardXp: 20, claimed: false },
      speaking: { title: 'Đạt >=85% phát âm trong 3 câu nói', target: 3, current: 0, rewardGems: 15, rewardXp: 20, claimed: false },
      srs: { title: 'Ôn tập 5 từ vựng trong Sổ từ SRS', target: 5, current: 0, rewardGems: 10, rewardXp: 15, claimed: false }
    };

    try {
      const saved = localStorage.getItem('lingo555_daily_quests');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.date === today) {
          return parsed;
        }
      }
    } catch (e) {}

    return defaultQuests;
  }

  // Load latest quests from userProfile or localStorage
  useEffect(() => {
    if (isOpen) {
      if (userProfile?.quests_json) {
        try {
          const parsed = JSON.parse(userProfile.quests_json);
          const today = new Date().toISOString().split('T')[0];
          if (parsed.date === today) {
            setQuests(parsed);
            return;
          }
        } catch (e) {}
      }
      setQuests(getTodayQuests());
    }
  }, [isOpen, userProfile]);

  if (!isOpen) return null;

  const handleClaimReward = async (questKey) => {
    sounds.playTap();
    setClaiming(questKey);
    const quest = quests[questKey];
    if (!quest || quest.claimed || quest.current < quest.target) return;

    const updated = {
      ...quests,
      [questKey]: {
        ...quest,
        claimed: true
      }
    };

    try {
      sounds.playCorrect();
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      setQuests(updated);
      localStorage.setItem('lingo555_daily_quests', JSON.stringify(updated));

      // Sync to backend DB
      await api.syncDailyQuests(updated, quest.rewardXp, quest.rewardGems);
      await refreshProfile();
    } catch (e) {
      console.warn('Failed to claim quest reward:', e);
    } finally {
      setClaiming(null);
    }
  };

  const QUEST_ICONS = {
    lessons: <BookOpen className="w-6 h-6 text-emerald-500" />,
    speaking: <Mic className="w-6 h-6 text-sky-500" />,
    srs: <Bookmark className="w-6 h-6 text-purple-500" />
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="duo-card max-w-lg w-full p-6 sm:p-7 relative bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md">
              <Trophy className="w-5 h-5 fill-white" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider">
                Nhiệm Vụ Hàng Ngày (Daily Quests)
              </h3>
              <p className="text-xs text-slate-500 font-bold flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-500" />
                <span>Làm mới mỗi ngày vào 00:00</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Quests List */}
        <div className="space-y-4">
          {['lessons', 'speaking', 'srs'].map((key) => {
            const q = quests[key];
            if (!q) return null;
            const progress = Math.min(q.target, q.current || 0);
            const isCompleted = progress >= q.target;
            const percent = Math.min(100, (progress / q.target) * 100);

            return (
              <div
                key={key}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border-2 border-slate-200 dark:border-slate-700 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0">
                      {QUEST_ICONS[key]}
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-800 dark:text-slate-200">
                        {q.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 mt-0.5">
                        <span className="flex items-center gap-0.5">
                          <Gem className="w-3.5 h-3.5 fill-sky-500 text-sky-500" />
                          <span>+{q.rewardGems} Gems</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5">
                          <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                          <span>+{q.rewardXp} XP</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Claim Button or Status */}
                  {q.claimed ? (
                    <span className="text-xs font-extrabold px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-500 shrink-0">
                      Đã nhận
                    </span>
                  ) : isCompleted ? (
                    <button
                      onClick={() => handleClaimReward(key)}
                      disabled={claiming === key}
                      className="duo-btn duo-btn-green text-xs py-2 px-3 rounded-xl font-black uppercase tracking-wider shrink-0 flex items-center gap-1 shadow-md"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{claiming === key ? '...' : 'Nhận'}</span>
                    </button>
                  ) : (
                    <span className="text-xs font-black text-slate-400 shrink-0">
                      {progress}/{q.target}
                    </span>
                  )}
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
