// Session Persistence for Lingo555 Lesson Modal
// Protects student progress against accidental browser refresh, tab close, or navigation

const SESSION_KEY = 'lingo555_active_lesson_session';

export const sessionPersistence = {
  /**
   * Save current lesson progress snapshot
   */
  save: (lessonId, state) => {
    if (typeof window === 'undefined' || !lessonId) return;
    try {
      const payload = {
        lessonId,
        currentIndex: state.currentIndex || 0,
        correctCount: state.correctCount || 0,
        retryQueue: state.retryQueue || [],
        timestamp: Date.now()
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(payload));
    } catch (e) {
      // ignore
    }
  },

  /**
   * Get active session if matching lessonId and not expired (< 2 hours)
   */
  load: (lessonId) => {
    if (typeof window === 'undefined' || !lessonId) return null;
    try {
      const saved = localStorage.getItem(SESSION_KEY);
      if (!saved) return null;
      const data = JSON.parse(saved);
      // Valid if matching lesson and within 2 hours
      if (data.lessonId === lessonId && (Date.now() - (data.timestamp || 0) < 2 * 60 * 60 * 1000)) {
        return data;
      }
    } catch (e) {
      return null;
    }
    return null;
  },

  /**
   * Clear session on completion or deliberate quit
   */
  clear: () => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch (e) {}
  }
};

export default sessionPersistence;
