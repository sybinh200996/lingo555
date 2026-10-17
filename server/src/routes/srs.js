const express = require('express');
const router = express.Router();
const db = require('../db/database');

/**
 * SuperMemo SM-2 algorithm implementation
 * @param {number} quality Grade from 0 (complete blackout) to 5 (perfect recall)
 * @param {number} repetition Current repetition streak count
 * @param {number} previousInterval Days until this review was due
 * @param {number} easeFactor Ease multiplier (default 2.5, min 1.3)
 */
function calculateSM2(quality, repetition, previousInterval, easeFactor) {
  let nextRepetition = repetition;
  let nextInterval = previousInterval;
  let nextEase = easeFactor;

  if (quality >= 3) {
    if (repetition === 0) {
      nextInterval = 1;
    } else if (repetition === 1) {
      nextInterval = 6;
    } else {
      nextInterval = Math.round(previousInterval * easeFactor);
    }
    nextRepetition += 1;
  } else {
    // Failed recall: reset repetition count and set interval to 1 day
    nextRepetition = 0;
    nextInterval = 1;
  }

  // Update ease factor: EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  nextEase = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (nextEase < 1.3) {
    nextEase = 1.3;
  }

  return {
    repetition: nextRepetition,
    intervalDays: nextInterval,
    easeFactor: Math.round(nextEase * 100) / 100
  };
}

// GET /api/srs/queue
// Retrieves words scheduled for review today or overdue
router.get('/queue', (req, res) => {
  try {
    const { userId = 'default_user', lang = 'zh', limit = 20 } = req.query;
    const nowIso = new Date().toISOString();

    const dueItems = db.prepare(`
      SELECT s.*, v.word, v.traditional, v.phonetic, v.han_viet, v.meaning, 
             v.part_of_speech, v.level, v.example_target, v.example_phonetic, v.example_meaning
      FROM srs_items s
      JOIN vocabularies v ON s.vocab_id = v.id
      WHERE s.user_id = ? 
        AND v.language_id = ?
        AND s.due_date <= ?
      ORDER BY s.due_date ASC
      LIMIT ?
    `).all(userId, lang, nowIso, parseInt(limit));

    // If queue is empty or has few items, supplement with fresh vocabulary items for learning
    let freshItems = [];
    if (dueItems.length < 10) {
      const needed = 10 - dueItems.length;
      freshItems = db.prepare(`
        SELECT v.id as vocab_id, v.word, v.traditional, v.phonetic, v.han_viet, v.meaning,
               v.part_of_speech, v.level, v.example_target, v.example_phonetic, v.example_meaning,
               0 as repetition, 1.0 as interval_days, 2.5 as ease_factor, 0 as is_difficult, 0 as mistake_count
        FROM vocabularies v
        LEFT JOIN srs_items s ON s.vocab_id = v.id AND s.user_id = ?
        WHERE v.language_id = ? AND s.id IS NULL
        LIMIT ?
      `).all(userId, lang, needed);
    }

    res.json({
      dueCount: dueItems.length,
      items: [...dueItems, ...freshItems]
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/srs/notebook
// Returns difficult words (high mistake count or flagged)
router.get('/notebook', (req, res) => {
  try {
    const { userId = 'default_user', lang = 'zh' } = req.query;

    const items = db.prepare(`
      SELECT s.*, v.word, v.traditional, v.phonetic, v.han_viet, v.meaning, 
             v.part_of_speech, v.level, v.example_target, v.example_phonetic, v.example_meaning
      FROM srs_items s
      JOIN vocabularies v ON s.vocab_id = v.id
      WHERE s.user_id = ? 
        AND v.language_id = ?
        AND (s.is_difficult = 1 OR s.mistake_count > 1)
      ORDER BY s.mistake_count DESC, s.last_reviewed_at DESC
    `).all(userId, lang);

    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/srs/review
// Submit a review result: { vocabId, quality (0-5) or isCorrect }
router.post('/review', (req, res) => {
  try {
    const { userId = 'default_user', vocabId, isCorrect, quality } = req.body;

    if (!vocabId) {
      return res.status(400).json({ error: 'Missing vocabId' });
    }

    // Default quality: 5 if correct, 1 if wrong, or custom 0-5
    const q = quality !== undefined ? parseInt(quality) : (isCorrect ? 5 : 1);

    const existing = db.prepare(`
      SELECT * FROM srs_items WHERE user_id = ? AND vocab_id = ?
    `).get(userId, vocabId);

    const now = new Date();
    let rep = 0;
    let interval = 1;
    let ease = 2.5;
    let mistakes = 0;

    if (existing) {
      rep = existing.repetition;
      interval = existing.interval_days;
      ease = existing.ease_factor;
      mistakes = existing.mistake_count;
    }

    if (q < 3) {
      mistakes += 1;
    }

    const sm2Result = calculateSM2(q, rep, interval, ease);
    const dueDate = new Date(now.getTime() + sm2Result.intervalDays * 24 * 60 * 60 * 1000).toISOString();
    const isDifficult = (q < 3 || mistakes >= 2) ? 1 : 0;

    db.prepare(`
      INSERT INTO srs_items (user_id, vocab_id, repetition, interval_days, ease_factor, due_date, last_reviewed_at, mistake_count, is_difficult)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(user_id, vocab_id) DO UPDATE SET
        repetition = excluded.repetition,
        interval_days = excluded.interval_days,
        ease_factor = excluded.ease_factor,
        due_date = excluded.due_date,
        last_reviewed_at = excluded.last_reviewed_at,
        mistake_count = excluded.mistake_count,
        is_difficult = excluded.is_difficult
    `).run(
      userId, vocabId, sm2Result.repetition, sm2Result.intervalDays, sm2Result.easeFactor,
      dueDate, now.toISOString(), mistakes, isDifficult
    );

    res.json({
      success: true,
      nextReviewInDays: sm2Result.intervalDays,
      dueDate,
      isDifficult
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/srs/toggle-notebook
// Manually add or remove a word to/from difficult notebook
router.post('/toggle-notebook', (req, res) => {
  try {
    const { userId = 'default_user', vocabId } = req.body;
    if (!vocabId) return res.status(400).json({ error: 'Missing vocabId' });

    const existing = db.prepare('SELECT * FROM srs_items WHERE user_id = ? AND vocab_id = ?').get(userId, vocabId);
    let newStatus = 1;

    if (existing) {
      newStatus = existing.is_difficult ? 0 : 1;
      db.prepare('UPDATE srs_items SET is_difficult = ? WHERE id = ?').run(newStatus, existing.id);
    } else {
      const now = new Date().toISOString();
      db.prepare(`
        INSERT INTO srs_items (user_id, vocab_id, repetition, interval_days, ease_factor, due_date, last_reviewed_at, mistake_count, is_difficult)
        VALUES (?, ?, 0, 1, 2.5, ?, ?, 1, 1)
      `).run(userId, vocabId, now, now);
    }

    res.json({ success: true, isDifficult: newStatus === 1 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
