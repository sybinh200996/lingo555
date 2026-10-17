const express = require('express');
const router = express.Router();
const db = require('../db/database');

// GET all available languages
router.get('/languages', (req, res) => {
  try {
    const langs = db.prepare('SELECT * FROM languages').all();
    res.json(langs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET levels for language (e.g. ?lang=zh)
router.get('/levels', (req, res) => {
  try {
    const lang = req.query.lang || 'zh';
    const levels = db.prepare(`
      SELECT * FROM levels 
      WHERE language_id = ? 
      ORDER BY order_index ASC
    `).all(lang);
    res.json(levels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET units with lessons and user completion status for a given level
router.get('/units', (req, res) => {
  try {
    const levelId = req.query.level_id;
    const userId = req.query.user_id || 'default_user';

    if (!levelId) {
      return res.status(400).json({ error: 'Missing level_id' });
    }

    const units = db.prepare(`
      SELECT * FROM units 
      WHERE level_id = ? 
      ORDER BY unit_number ASC
    `).all(levelId);

    const getLessons = db.prepare(`
      SELECT l.*, 
        c.stars as completed_stars,
        c.score as completed_score,
        CASE WHEN c.id IS NOT NULL THEN 1 ELSE 0 END as is_completed
      FROM lessons l
      LEFT JOIN user_completed_lessons c ON c.lesson_id = l.id AND c.user_id = ?
      WHERE l.unit_id = ?
      ORDER BY l.lesson_number ASC
    `);

    const result = units.map(unit => {
      const lessons = getLessons.all(userId, unit.id);
      return {
        ...unit,
        lessons
      };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET full lesson with all exercises
router.get('/lessons/:id', (req, res) => {
  try {
    const lessonId = req.params.id;
    const lesson = db.prepare('SELECT * FROM lessons WHERE id = ?').get(lessonId);

    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    const exercises = db.prepare(`
      SELECT * FROM exercises 
      WHERE lesson_id = ? 
      ORDER BY order_index ASC
    `).all(lessonId);

    const parsedExercises = exercises.map(ex => {
      let options = [];
      try {
        options = ex.options_json ? JSON.parse(ex.options_json) : [];
      } catch (e) {
        options = [];
      }
      return {
        ...ex,
        options
      };
    });

    res.json({
      ...lesson,
      exercises: parsedExercises
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST complete lesson
router.post('/lessons/:id/complete', (req, res) => {
  try {
    const lessonId = req.params.id;
    const { userId = 'default_user', score = 100, stars = 3, xpGained = 15 } = req.body;

    const completeTx = db.transaction(() => {
      // Record or update lesson completion
      db.prepare(`
        INSERT INTO user_completed_lessons (user_id, lesson_id, stars, score)
        VALUES (?, ?, ?, ?)
        ON CONFLICT(user_id, lesson_id) DO UPDATE SET
          stars = MAX(stars, excluded.stars),
          score = MAX(score, excluded.score),
          completed_at = CURRENT_TIMESTAMP
      `).run(userId, lessonId, stars, score);

      // Update user XP and streak
      const today = new Date().toISOString().split('T')[0];
      const user = db.prepare('SELECT * FROM user_profiles WHERE id = ?').get(userId);

      let newStreak = user ? user.streak : 1;
      if (user && user.last_streak_date !== today) {
        // If last active was yesterday, increment streak
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        if (user.last_streak_date === yesterday) {
          newStreak += 1;
        } else {
          newStreak = 1;
        }
      }

      db.prepare(`
        UPDATE user_profiles
        SET xp = xp + ?,
            streak = ?,
            last_streak_date = ?,
            gems = gems + 5
        WHERE id = ?
      `).run(xpGained, newStreak, today, userId);

      return db.prepare('SELECT * FROM user_profiles WHERE id = ?').get(userId);
    });

    const updatedProfile = completeTx();
    res.json({ success: true, profile: updatedProfile });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
