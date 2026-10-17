const express = require('express');
const router = express.Router();
const db = require('../db/database');

// GET /api/dictionary/search
// Query params:
//   - q: search query (in word, pinyin/ipa, han_viet, or meaning)
//   - lang: 'zh' | 'en' (default 'zh')
//   - level: e.g. 'HSK1', 'A1' (optional)
//   - category: e.g. 'Chào hỏi' (optional)
//   - page: 1-indexed (default 1)
//   - limit: items per page (default 20, max 100)
router.get('/search', (req, res) => {
  try {
    const {
      q = '',
      lang = 'zh',
      level = '',
      category = '',
      page = 1,
      limit = 20
    } = req.query;

    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit) || 20));
    const offset = (pageNum - 1) * limitNum;

    let conditions = ['language_id = ?'];
    let params = [lang];

    if (level && level.trim() !== '') {
      conditions.push('level = ?');
      params.push(level.trim());
    }

    if (category && category.trim() !== '') {
      conditions.push('category = ?');
      params.push(category.trim());
    }

    if (q && q.trim() !== '') {
      const searchTerm = `%${q.trim()}%`;
      conditions.push(`(
        word LIKE ? OR 
        phonetic LIKE ? OR 
        meaning LIKE ? OR 
        han_viet LIKE ? OR
        traditional LIKE ?
      )`);
      params.push(searchTerm, searchTerm, searchTerm, searchTerm, searchTerm);
    }

    const whereClause = conditions.join(' AND ');

    // Fast count
    const countSql = `SELECT COUNT(*) as total FROM vocabularies WHERE ${whereClause}`;
    const totalRow = db.prepare(countSql).get(...params);
    const total = totalRow.total;

    // Fast indexed query with limit and offset
    const querySql = `
      SELECT * FROM vocabularies 
      WHERE ${whereClause}
      ORDER BY 
        CASE 
          WHEN word = ? THEN 1
          WHEN word LIKE ? THEN 2
          ELSE 3
        END,
        id ASC
      LIMIT ? OFFSET ?
    `;

    const cleanQ = q.trim();
    const queryParams = [...params, cleanQ, `${cleanQ}%`, limitNum, offset];
    const items = db.prepare(querySql).all(...queryParams);

    res.json({
      items,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum)
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/dictionary/word/:id
router.get('/word/:id', (req, res) => {
  try {
    const vocab = db.prepare('SELECT * FROM vocabularies WHERE id = ?').get(req.params.id);
    if (!vocab) {
      return res.status(404).json({ error: 'Word not found' });
    }

    // Also get related words from same level or category
    const related = db.prepare(`
      SELECT id, word, phonetic, meaning, han_viet 
      FROM vocabularies 
      WHERE language_id = ? AND level = ? AND id != ?
      LIMIT 5
    `).all(vocab.language_id, vocab.level, vocab.id);

    res.json({
      ...vocab,
      related
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/dictionary/stats
router.get('/stats', (req, res) => {
  try {
    const stats = db.prepare(`
      SELECT language_id, level, COUNT(*) as count 
      FROM vocabularies 
      GROUP BY language_id, level
    `).all();

    const totalCount = db.prepare('SELECT COUNT(*) as count FROM vocabularies').get().count;

    res.json({
      total: totalCount,
      breakdown: stats
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
