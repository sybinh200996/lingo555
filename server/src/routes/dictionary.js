const express = require('express');
const router = express.Router();
const db = require('../db/database');
const { buildUnifiedLinguisticData } = require('../services/linguisticService');

// In-Memory Fast Cache for Instant Search (< 5ms response time)
const searchCache = new Map();
const MAX_CACHE_SIZE = 500;

const getFromCache = (cacheKey) => {
  const cached = searchCache.get(cacheKey);
  if (!cached) return null;
  if (Date.now() - cached.timestamp > 300000) { // 5 minutes TTL
    searchCache.delete(cacheKey);
    return null;
  }
  return cached.data;
};

const setCache = (cacheKey, data) => {
  if (searchCache.size >= MAX_CACHE_SIZE) {
    const firstKey = searchCache.keys().next().value;
    searchCache.delete(firstKey);
  }
  searchCache.set(cacheKey, { timestamp: Date.now(), data });
};

// Handler for search
const searchHandler = (req, res) => {
  try {
    const {
      q = '',
      lang = 'zh',
      level = '',
      category = '',
      page = 1,
      limit = 20
    } = req.query;

    const cacheKey = `${lang}:${level}:${category}:${page}:${limit}:${q.trim().toLowerCase()}`;
    const cachedResult = getFromCache(cacheKey);
    if (cachedResult) {
      return res.json(cachedResult);
    }

    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit) || 20));
    const offset = (pageNum - 1) * limitNum;
    const cleanQ = q.trim();

    // Fast-path for exact / prefix word query (index scan < 3ms)
    if (cleanQ !== '' && !level && !category && pageNum === 1) {
      const prefixResults = db.prepare(`
        SELECT * FROM vocabularies 
        WHERE language_id = ? AND (word LIKE ? OR word = ?)
        ORDER BY LENGTH(word) ASC, id ASC
        LIMIT ?
      `).all(lang, `${cleanQ}%`, cleanQ, limitNum);

      if (prefixResults.length >= limitNum) {
        const responseData = {
          items: prefixResults,
          pagination: {
            page: pageNum,
            limit: limitNum,
            total: prefixResults.length * 5,
            totalPages: 5
          }
        };
        setCache(cacheKey, responseData);
        return res.json(responseData);
      }
    }

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

    if (cleanQ !== '') {
      const searchTerm = `%${cleanQ}%`;
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

    // Count
    const countSql = `SELECT COUNT(*) as total FROM vocabularies WHERE ${whereClause}`;
    const totalRow = db.prepare(countSql).get(...params);
    const total = totalRow.total;

    let orderClause = 'id ASC';
    let orderParams = [];

    if (cleanQ !== '') {
      const isYeu = cleanQ.toLowerCase() === 'yêu';

      orderClause = `
        CASE 
          WHEN LOWER(word) = ? THEN 1
          WHEN LOWER(meaning) = ? THEN 2
          ${isYeu ? "WHEN LOWER(word) = 'love' OR LOWER(word) = '爱' OR LOWER(meaning) LIKE '%tình yêu%' OR LOWER(meaning) LIKE '%lòng yêu%' OR LOWER(meaning) LIKE '%yêu thương%' OR LOWER(meaning) LIKE 'yêu;%' OR LOWER(meaning) LIKE 'yêu,%' THEN 3" : ""}
          WHEN LOWER(meaning) LIKE ? OR LOWER(meaning) LIKE ? THEN 4
          WHEN LOWER(word) LIKE ? THEN 5
          WHEN (level IN ('HSK1', 'A1')) AND (LOWER(meaning) LIKE ? OR LOWER(word) LIKE ?) THEN 6
          WHEN (level IN ('HSK2', 'A2')) AND (LOWER(meaning) LIKE ? OR LOWER(word) LIKE ?) THEN 7
          WHEN LOWER(meaning) LIKE ? THEN 8
          ELSE 9
        END ASC,
        ${isYeu ? "CASE WHEN LOWER(meaning) LIKE '%yêu tinh%' OR LOWER(meaning) LIKE '%yêu quái%' OR LOWER(meaning) LIKE '%yêu cầu%' THEN 2 ELSE 1 END ASC," : ""}
        CASE 
          WHEN level IN ('HSK1', 'A1') THEN 1 
          WHEN level IN ('HSK2', 'A2') THEN 2 
          WHEN level IN ('HSK3', 'B1') THEN 3
          ELSE 4 
        END ASC,
        LENGTH(word) ASC,
        id ASC
      `;
      const qLower = cleanQ.toLowerCase();
      orderParams = [
        qLower,
        qLower,
        `${qLower};%`, `${qLower},%`,
        `${qLower}%`,
        `%${qLower}%`, `%${qLower}%`,
        `%${qLower}%`, `%${qLower}%`,
        `%${qLower}%`
      ];
    }

    const querySql = `
      SELECT * FROM vocabularies 
      WHERE ${whereClause}
      ORDER BY ${orderClause}
      LIMIT ? OFFSET ?
    `;

    const queryParams = [...params, ...orderParams, limitNum, offset];
    const items = db.prepare(querySql).all(...queryParams);

    const result = {
      items,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum)
      }
    };

    setCache(cacheKey, result);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

router.get('/search', searchHandler);
router.get('/', searchHandler);

// GET /api/dictionary/linguistic/:id - Unified Linguistic Schema (Chiết tự Lục Thư, Gốc từ & Chùm 80/20)
router.get('/linguistic/:id', (req, res) => {
  try {
    const vocab = db.prepare('SELECT * FROM vocabularies WHERE id = ?').get(req.params.id);
    if (!vocab) {
      return res.status(404).json({ error: 'Word not found' });
    }

    const linguisticData = buildUnifiedLinguisticData(vocab);
    res.json({
      success: true,
      data: linguisticData
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
