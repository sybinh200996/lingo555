-- LingoFlow SQLite Schema
-- Optimized for fast querying > 50,000 vocabularies with B-Tree indexes

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS languages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  native_name TEXT NOT NULL,
  flag TEXT NOT NULL,
  default_level TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS levels (
  id TEXT PRIMARY KEY,
  language_id TEXT NOT NULL,
  code TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  color TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  FOREIGN KEY (language_id) REFERENCES languages (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS units (
  id TEXT PRIMARY KEY,
  level_id TEXT NOT NULL,
  unit_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  banner_color TEXT NOT NULL,
  FOREIGN KEY (level_id) REFERENCES levels (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS lessons (
  id TEXT PRIMARY KEY,
  unit_id TEXT NOT NULL,
  lesson_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  xp_reward INTEGER DEFAULT 15,
  type TEXT DEFAULT 'standard', -- standard, checkpoint, speaking, writing
  FOREIGN KEY (unit_id) REFERENCES units (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS exercises (
  id TEXT PRIMARY KEY,
  lesson_id TEXT NOT NULL,
  type TEXT NOT NULL, -- listening, speaking, matching, writing, dictation, translation
  prompt TEXT NOT NULL,
  target_text TEXT NOT NULL,
  target_audio_text TEXT,
  phonetic TEXT,
  vietnamese_meaning TEXT NOT NULL,
  options_json TEXT, -- JSON array of string options
  correct_answer TEXT NOT NULL,
  hint TEXT,
  stroke_char TEXT, -- for Hanzi writing exercise
  order_index INTEGER NOT NULL,
  FOREIGN KEY (lesson_id) REFERENCES lessons (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS vocabularies (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  language_id TEXT NOT NULL,
  word TEXT NOT NULL,
  traditional TEXT,
  phonetic TEXT NOT NULL, -- Pinyin or IPA
  han_viet TEXT,          -- Hán Việt âm (tiếng Trung)
  meaning TEXT NOT NULL,  -- Nghĩa Tiếng Việt
  part_of_speech TEXT,    -- danh từ, động từ, tính từ...
  level TEXT NOT NULL,     -- PINYIN, HSK1, HSK2, HSK3, HSK4, HSK5, HSK6, IPA, A1, A2, B1, B2, C1, C2
  category TEXT,          -- chào hỏi, số đếm, gia đình, công việc...
  radical TEXT,           -- Bộ thủ (cho tiếng Trung)
  stroke_count INTEGER,   -- Số nét
  example_target TEXT,    -- Câu ví dụ ngôn ngữ đích
  example_phonetic TEXT,  -- Phiên âm câu ví dụ
  example_meaning TEXT,   -- Dịch câu ví dụ
  tags TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (language_id) REFERENCES languages (id)
);

-- Fast lookup indexes for 50,000+ words
CREATE INDEX IF NOT EXISTS idx_vocab_lang_word ON vocabularies(language_id, word);
CREATE INDEX IF NOT EXISTS idx_vocab_lang_level ON vocabularies(language_id, level);
CREATE INDEX IF NOT EXISTS idx_vocab_meaning ON vocabularies(meaning);
CREATE INDEX IF NOT EXISTS idx_vocab_phonetic ON vocabularies(phonetic);
CREATE INDEX IF NOT EXISTS idx_vocab_han_viet ON vocabularies(han_viet);

-- User state table (Supports Guest and Multi-User)
CREATE TABLE IF NOT EXISTS user_profiles (
  id TEXT PRIMARY KEY DEFAULT 'default_user',
  username TEXT DEFAULT 'Học viên LingoFlow',
  avatar TEXT DEFAULT '🐼',
  current_language TEXT DEFAULT 'zh',
  hearts INTEGER DEFAULT 5,
  max_hearts INTEGER DEFAULT 5,
  gems INTEGER DEFAULT 200,
  xp INTEGER DEFAULT 0,
  streak INTEGER DEFAULT 1,
  last_streak_date TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_completed_lessons (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT DEFAULT 'default_user',
  lesson_id TEXT NOT NULL,
  stars INTEGER DEFAULT 3,
  score INTEGER DEFAULT 100,
  completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, lesson_id)
);

-- Spaced Repetition System (SRS SM-2)
CREATE TABLE IF NOT EXISTS srs_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT DEFAULT 'default_user',
  vocab_id INTEGER NOT NULL,
  repetition INTEGER DEFAULT 0,
  interval_days REAL DEFAULT 1.0,
  ease_factor REAL DEFAULT 2.5,
  due_date TEXT NOT NULL,
  last_reviewed_at TEXT,
  mistake_count INTEGER DEFAULT 0,
  is_difficult INTEGER DEFAULT 0,
  UNIQUE(user_id, vocab_id),
  FOREIGN KEY (vocab_id) REFERENCES vocabularies (id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_srs_due ON srs_items(user_id, due_date);
CREATE INDEX IF NOT EXISTS idx_srs_difficult ON srs_items(user_id, is_difficult);

-- AI Roleplay Dialogues for Speak tab
CREATE TABLE IF NOT EXISTS dialogues (
  id TEXT PRIMARY KEY,
  language_id TEXT NOT NULL,
  title TEXT NOT NULL,
  topic TEXT NOT NULL,
  level TEXT NOT NULL,
  scenario_description TEXT NOT NULL,
  icon TEXT NOT NULL,
  lines_json TEXT NOT NULL
);
