import { api } from '../services/api';

/**
 * Daily Quest Tracking Engine
 * Manages daily quest progression across Lesson Completion, Speaking Practice & SRS Reviews
 */
export const questTracker = {
  getTodayQuests: () => {
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
  },

  increment: (questKey, count = 1) => {
    try {
      const quests = questTracker.getTodayQuests();
      if (!quests[questKey]) return;

      quests[questKey].current = (quests[questKey].current || 0) + count;
      localStorage.setItem('lingo555_daily_quests', JSON.stringify(quests));

      // Dispatch event so UI components can refresh instantly
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('lingo555:quest-updated', { detail: quests }));
      }

      // Background sync to backend
      api.syncDailyQuests(quests, 0, 0).catch(() => {});
    } catch (e) {
      console.warn('Failed to increment quest:', e);
    }
  }
};
