const express = require('express');
const router = express.Router();
const db = require('../db/database');

// GET /api/user/profile
router.get('/profile', (req, res) => {
  try {
    const userId = req.query.userId || 'default_user';
    const user = db.prepare('SELECT * FROM user_profiles WHERE id = ?').get(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get completed lessons count
    const completedCount = db.prepare(`
      SELECT COUNT(*) as count FROM user_completed_lessons WHERE user_id = ?
    `).get(userId).count;

    // Get SRS words mastered count (repetition >= 3)
    const masteredCount = db.prepare(`
      SELECT COUNT(*) as count FROM srs_items WHERE user_id = ? AND repetition >= 3
    `).get(userId).count;

    // Get words in difficult notebook
    const difficultCount = db.prepare(`
      SELECT COUNT(*) as count FROM srs_items WHERE user_id = ? AND (is_difficult = 1 OR mistake_count > 1)
    `).get(userId).count;

    res.json({
      ...user,
      stats: {
        completedLessons: completedCount,
        wordsMastered: masteredCount,
        difficultWords: difficultCount
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/user/profile
router.put('/profile', (req, res) => {
  try {
    const userId = req.body.userId || 'default_user';
    const { username, avatar, current_language } = req.body;

    db.prepare(`
      UPDATE user_profiles
      SET username = COALESCE(?, username),
          avatar = COALESCE(?, avatar),
          current_language = COALESCE(?, current_language)
      WHERE id = ?
    `).run(username, avatar, current_language, userId);

    const updated = db.prepare('SELECT * FROM user_profiles WHERE id = ?').get(userId);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/user/heart-loss
router.post('/heart-loss', (req, res) => {
  try {
    const userId = req.body.userId || 'default_user';
    const user = db.prepare('SELECT hearts FROM user_profiles WHERE id = ?').get(userId);
    const newHearts = Math.max(0, (user ? user.hearts : 5) - 1);

    db.prepare('UPDATE user_profiles SET hearts = ? WHERE id = ?').run(newHearts, userId);
    res.json({ hearts: newHearts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/user/heart-refill
router.post('/heart-refill', (req, res) => {
  try {
    const userId = req.body.userId || 'default_user';
    const user = db.prepare('SELECT gems, hearts, max_hearts FROM user_profiles WHERE id = ?').get(userId);

    // Refill hearts to max (costs 100 gems or free practice)
    const cost = 100;
    if (user.gems >= cost) {
      db.prepare(`
        UPDATE user_profiles 
        SET hearts = max_hearts, gems = gems - ? 
        WHERE id = ?
      `).run(cost, userId);

      const updated = db.prepare('SELECT * FROM user_profiles WHERE id = ?').get(userId);
      return res.json({ success: true, profile: updated });
    } else {
      // Free practice refill 1 heart
      const newHearts = Math.min(user.max_hearts, user.hearts + 1);
      db.prepare('UPDATE user_profiles SET hearts = ? WHERE id = ?').run(newHearts, userId);
      const updated = db.prepare('SELECT * FROM user_profiles WHERE id = ?').get(userId);
      return res.json({ success: true, profile: updated, note: 'Refilled 1 heart via practice' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/user/leaderboard
router.get('/leaderboard', (req, res) => {
  try {
    const currentUser = db.prepare('SELECT * FROM user_profiles WHERE id = ?').get('default_user');
    const userXp = currentUser ? currentUser.xp : 120;

    // Simulated high-energy leaderboard with current user dynamic position
    const mockUsers = [
      { id: 'u1', name: 'Minh Hoàng (HSK5)', avatar: '🦁', xp: Math.max(userXp + 450, 680), rank: 1, streak: 28 },
      { id: 'u2', name: 'Thùy Linh (IELTS 7.5)', avatar: '🦊', xp: Math.max(userXp + 280, 520), rank: 2, streak: 14 },
      { id: 'u3', name: 'Ngọc Mai (HSK4)', avatar: '🐼', xp: Math.max(userXp + 95, 340), rank: 3, streak: 9 },
      { id: 'default_user', name: currentUser ? currentUser.username : 'Bạn', avatar: currentUser ? currentUser.avatar : '🚀', xp: userXp, isCurrent: true, streak: currentUser ? currentUser.streak : 3 },
      { id: 'u4', name: 'Tuấn Anh (A2)', avatar: '🦉', xp: Math.max(0, userXp - 60), streak: 2 },
      { id: 'u5', name: 'Đức Huy (HSK2)', avatar: '🐯', xp: Math.max(0, userXp - 110), streak: 1 }
    ];

    // Sort by XP descending
    mockUsers.sort((a, b) => b.xp - a.xp);
    const ranked = mockUsers.map((u, index) => ({
      ...u,
      rank: index + 1
    }));

    res.json(ranked);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
