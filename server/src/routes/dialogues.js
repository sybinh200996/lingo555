const express = require('express');
const router = express.Router();
const db = require('../db/database');

// GET /api/dialogues
router.get('/', (req, res) => {
  try {
    const lang = req.query.lang || 'zh';
    const dialogues = db.prepare(`
      SELECT id, language_id, title, topic, level, scenario_description, icon, lines_json
      FROM dialogues
      WHERE language_id = ?
    `).all(lang);

    const parsed = dialogues.map(d => ({
      ...d,
      lines: JSON.parse(d.lines_json)
    }));

    res.json(parsed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/dialogues/:id
router.get('/:id', (req, res) => {
  try {
    const dialogue = db.prepare('SELECT * FROM dialogues WHERE id = ?').get(req.params.id);
    if (!dialogue) {
      return res.status(404).json({ error: 'Dialogue not found' });
    }

    res.json({
      ...dialogue,
      lines: JSON.parse(dialogue.lines_json)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
