const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../../data/lingo555.db');
const legacyDbPath = path.join(__dirname, '../../data/lingoflow.db');
const dbDir = path.dirname(dbPath);

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

if (!fs.existsSync(dbPath) && fs.existsSync(legacyDbPath)) {
  try {
    fs.copyFileSync(legacyDbPath, dbPath);
  } catch (e) {}
}

const db = new Database(dbPath, {
  // verbose: process.env.NODE_ENV === 'development' ? console.log : null
});

// Enable WAL mode for high performance concurrent reads and writes
db.pragma('journal_mode = WAL');
db.pragma('synchronous = NORMAL');
db.pragma('cache_size = -64000'); // 64MB cache

// Initialize schema
const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
db.exec(schemaSql);

// Ensure default user profile exists
const initUser = db.prepare('SELECT id FROM user_profiles WHERE id = ?').get('default_user');
if (!initUser) {
  const today = new Date().toISOString().split('T')[0];
  db.prepare(`
    INSERT INTO user_profiles (id, username, avatar, current_language, hearts, max_hearts, gems, xp, streak, last_streak_date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run('default_user', 'Học viên Polyglot', '🐼', 'zh', 5, 5, 350, 120, 3, today);
}

// Safe column migrations for Version 2.0
try {
  const userCols = db.prepare('PRAGMA table_info(user_profiles)').all().map(c => c.name);
  if (!userCols.includes('streak_freezes')) {
    db.exec('ALTER TABLE user_profiles ADD COLUMN streak_freezes INTEGER DEFAULT 0');
  }
  if (!userCols.includes('double_xp_until')) {
    db.exec('ALTER TABLE user_profiles ADD COLUMN double_xp_until TEXT');
  }
  if (!userCols.includes('placement_level')) {
    db.exec('ALTER TABLE user_profiles ADD COLUMN placement_level TEXT');
  }
  if (!userCols.includes('quests_json')) {
    db.exec('ALTER TABLE user_profiles ADD COLUMN quests_json TEXT');
  }
} catch (e) {
  console.warn('Migration warning:', e.message);
}

module.exports = db;
