const API_BASE = '/api';

export const api = {
  // Languages & Levels
  getLanguages: async () => {
    const res = await fetch(`${API_BASE}/languages`);
    return res.json();
  },

  getLevels: async (lang = 'zh') => {
    const res = await fetch(`${API_BASE}/levels?lang=${lang}`);
    return res.json();
  },

  getUnits: async (levelId, userId = 'default_user') => {
    const res = await fetch(`${API_BASE}/units?level_id=${levelId}&user_id=${userId}`);
    return res.json();
  },

  getLesson: async (lessonId) => {
    const res = await fetch(`${API_BASE}/lessons/${lessonId}`);
    return res.json();
  },

  completeLesson: async (lessonId, data) => {
    const res = await fetch(`${API_BASE}/lessons/${lessonId}/complete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  // Dictionary
  searchDictionary: async ({ q = '', lang = 'zh', level = '', category = '', page = 1, limit = 20 }) => {
    const params = new URLSearchParams({ q, lang, level, category, page, limit });
    const res = await fetch(`${API_BASE}/dictionary/search?${params.toString()}`);
    return res.json();
  },

  getWordDetail: async (id) => {
    const res = await fetch(`${API_BASE}/dictionary/word/${id}`);
    return res.json();
  },

  getDictionaryStats: async () => {
    const res = await fetch(`${API_BASE}/dictionary/stats`);
    return res.json();
  },

  // SRS
  getSRSQueue: async (lang = 'zh', userId = 'default_user') => {
    const res = await fetch(`${API_BASE}/srs/queue?lang=${lang}&userId=${userId}`);
    return res.json();
  },

  getSRSNotebook: async (lang = 'zh', userId = 'default_user') => {
    const res = await fetch(`${API_BASE}/srs/notebook?lang=${lang}&userId=${userId}`);
    return res.json();
  },

  reviewSRSItem: async (data) => {
    const res = await fetch(`${API_BASE}/srs/review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  toggleNotebook: async (vocabId, userId = 'default_user') => {
    const res = await fetch(`${API_BASE}/srs/toggle-notebook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vocabId, userId })
    });
    return res.json();
  },

  // User Profile & Leaderboard
  getUserProfile: async (userId = 'default_user') => {
    const res = await fetch(`${API_BASE}/user/profile?userId=${userId}`);
    return res.json();
  },

  updateUserProfile: async (data) => {
    const res = await fetch(`${API_BASE}/user/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  loseHeart: async (userId = 'default_user') => {
    const res = await fetch(`${API_BASE}/user/heart-loss`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    });
    return res.json();
  },

  refillHearts: async (userId = 'default_user') => {
    const res = await fetch(`${API_BASE}/user/heart-refill`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    });
    return res.json();
  },

  getLeaderboard: async () => {
    const res = await fetch(`${API_BASE}/user/leaderboard`);
    return res.json();
  },

  buyShopItem: async (itemType, userId = 'default_user') => {
    const res = await fetch(`${API_BASE}/user/buy-item`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itemType, userId })
    });
    return res.json();
  },

  batchUnlockLevel: async (targetLevelId, xpReward = 100, gemsReward = 50, userId = 'default_user') => {
    const res = await fetch(`${API_BASE}/user/batch-unlock`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ targetLevelId, xpReward, gemsReward, userId })
    });
    return res.json();
  },

  syncDailyQuests: async (quests, rewardXp = 0, rewardGems = 0, userId = 'default_user') => {
    const res = await fetch(`${API_BASE}/user/sync-quests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quests, rewardXp, rewardGems, userId })
    });
    return res.json();
  },

  // Dialogues
  getDialogues: async (lang = 'zh') => {
    const res = await fetch(`${API_BASE}/dialogues?lang=${lang}`);
    return res.json();
  },

  getDialogueDetail: async (id) => {
    const res = await fetch(`${API_BASE}/dialogues/${id}`);
    return res.json();
  },

  // Importer
  generateSampleData: async () => {
    const res = await fetch(`${API_BASE}/importer/generate-sample-5000`, {
      method: 'POST'
    });
    return res.json();
  },

  bulkImportJson: async (language_id, words) => {
    const res = await fetch(`${API_BASE}/importer/bulk-json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language_id, words })
    });
    return res.json();
  },

  bulkImportCsv: async (language_id, formData) => {
    formData.append('language_id', language_id);
    const res = await fetch(`${API_BASE}/importer/bulk-csv`, {
      method: 'POST',
      body: formData
    });
    return res.json();
  },

  seedDomainVocab: async (language_id, domain) => {
    const res = await fetch(`${API_BASE}/importer/seed-domain-vocab`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language_id, domain })
    });
    return res.json();
  }
};
