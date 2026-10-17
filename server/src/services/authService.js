/**
 * authService.js
 * Cryptographic security, JWT tokens, and user database operations for Lingo555.
 * Uses Node.js native crypto module (PBKDF2 with salt + HMAC-SHA256 JWT)
 * ensuring 100% resilience across all environments with zero external dependencies.
 */

const crypto = require('crypto');
const db = require('../db/database');

const JWT_SECRET = process.env.JWT_SECRET || 'lingo555_production_secret_key_2026_auth_engine';

// Ensure tables exist in database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT,
    full_name TEXT NOT NULL,
    avatar_url TEXT DEFAULT '🐼',
    auth_provider TEXT DEFAULT 'local', -- 'local' | 'google' | 'facebook'
    provider_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS user_progress (
    user_id TEXT PRIMARY KEY,
    xp INTEGER DEFAULT 0,
    streak INTEGER DEFAULT 1,
    gems INTEGER DEFAULT 200,
    hearts INTEGER DEFAULT 5,
    max_hearts INTEGER DEFAULT 5,
    current_language TEXT DEFAULT 'zh',
    completed_lessons_json TEXT DEFAULT '[]',
    srs_vocabulary_json TEXT DEFAULT '[]',
    daily_quests_json TEXT DEFAULT '[]',
    streak_freezes INTEGER DEFAULT 0,
    double_xp_until TEXT,
    placement_level TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
  );
`);

/**
 * Hash password using PBKDF2 with 16-byte random salt
 */
const hashPassword = (password) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
};

/**
 * Verify password against stored salt:hash
 */
const verifyPassword = (password, storedCombined) => {
  if (!storedCombined || !storedCombined.includes(':')) return false;
  const [salt, originalHash] = storedCombined.split(':');
  const testHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return crypto.timingSafeEqual(Buffer.from(testHash, 'hex'), Buffer.from(originalHash, 'hex'));
};

/**
 * Sign standard JWT token using HMAC-SHA256
 */
const signToken = (payload, expiresInSeconds = 30 * 86400) => {
  const header = { alg: 'HS256', typ: 'JWT' };
  const exp = Math.floor(Date.now() / 1000) + expiresInSeconds;
  const fullPayload = { ...payload, exp };

  const encodeBase64Url = (obj) =>
    Buffer.from(JSON.stringify(obj))
      .toString('base64url');

  const encodedHeader = encodeBase64Url(header);
  const encodedPayload = encodeBase64Url(fullPayload);
  const data = `${encodedHeader}.${encodedPayload}`;

  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(data)
    .digest('base64url');

  return `${data}.${signature}`;
};

/**
 * Verify and decode JWT token
 */
const verifyToken = (token) => {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;

  const [encodedHeader, encodedPayload, signature] = parts;
  const data = `${encodedHeader}.${encodedPayload}`;

  const expectedSignature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(data)
    .digest('base64url');

  if (signature !== expectedSignature) return null;

  try {
    const payloadJson = Buffer.from(encodedPayload, 'base64url').toString('utf8');
    const payload = JSON.parse(payloadJson);
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null; // Expired
    }
    return payload;
  } catch (err) {
    return null;
  }
};

/**
 * Merge local guest progress with cloud progress to prevent any data loss
 */
const mergeProgressData = (cloudProg, guestProg) => {
  if (!guestProg) return cloudProg;
  if (!cloudProg) return guestProg;

  const parseJson = (val, def = []) => {
    if (!val) return def;
    if (typeof val === 'object') return val;
    try {
      return JSON.parse(val);
    } catch (_) {
      return def;
    }
  };

  const cloudLessons = parseJson(cloudProg.completed_lessons_json || cloudProg.completedLessons, []);
  const guestLessons = parseJson(guestProg.completed_lessons_json || guestProg.completedLessons, []);
  const mergedLessons = Array.from(new Set([...cloudLessons, ...guestLessons]));

  const cloudSrs = parseJson(cloudProg.srs_vocabulary_json || cloudProg.srsVocabulary, []);
  const guestSrs = parseJson(guestProg.srs_vocabulary_json || guestProg.srsVocabulary, []);
  const srsMap = new Map();
  for (const item of [...cloudSrs, ...guestSrs]) {
    const key = item.id || item.word;
    if (key) {
      const existing = srsMap.get(key);
      if (!existing || (item.repetition || 0) > (existing.repetition || 0)) {
        srsMap.set(key, item);
      }
    }
  }

  return {
    user_id: cloudProg.user_id,
    xp: Math.max(cloudProg.xp || 0, guestProg.xp || 0),
    streak: Math.max(cloudProg.streak || 1, guestProg.streak || 1),
    gems: Math.max(cloudProg.gems || 200, guestProg.gems || 200),
    hearts: Math.min(5, Math.max(cloudProg.hearts || 5, guestProg.hearts || 5)),
    max_hearts: 5,
    current_language: guestProg.current_language || guestProg.currentLang || cloudProg.current_language || 'zh',
    completed_lessons_json: JSON.stringify(mergedLessons),
    srs_vocabulary_json: JSON.stringify(Array.from(srsMap.values())),
    daily_quests_json: guestProg.daily_quests_json || cloudProg.daily_quests_json || '[]',
    streak_freezes: Math.max(cloudProg.streak_freezes || 0, guestProg.streak_freezes || 0),
    double_xp_until: guestProg.double_xp_until || cloudProg.double_xp_until || null,
    placement_level: guestProg.placement_level || cloudProg.placement_level || null,
    updated_at: new Date().toISOString()
  };
};

/**
 * Register user with local credentials
 */
const registerUser = ({ fullName, email, password, avatar = '🐼', guestProgress = null }) => {
  const normalizedEmail = email.trim().toLowerCase();
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(normalizedEmail);
  if (existing) {
    throw new Error('Email này đã được đăng ký tài khoản. Vui lòng đăng nhập.');
  }

  const userId = `u_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
  const passwordHash = hashPassword(password);

  db.prepare(`
    INSERT INTO users (id, email, password_hash, full_name, avatar_url, auth_provider, provider_id)
    VALUES (?, ?, ?, ?, ?, 'local', NULL)
  `).run(userId, normalizedEmail, passwordHash, fullName.trim(), avatar);

  // Initialize progress with merged guest progress
  const initialProg = mergeProgressData({
    user_id: userId,
    xp: 0,
    streak: 1,
    gems: 200,
    hearts: 5,
    current_language: 'zh'
  }, guestProgress);

  db.prepare(`
    INSERT INTO user_progress (
      user_id, xp, streak, gems, hearts, max_hearts, current_language,
      completed_lessons_json, srs_vocabulary_json, daily_quests_json,
      streak_freezes, double_xp_until, placement_level, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    userId,
    initialProg.xp,
    initialProg.streak,
    initialProg.gems,
    initialProg.hearts,
    5,
    initialProg.current_language,
    initialProg.completed_lessons_json,
    initialProg.srs_vocabulary_json,
    initialProg.daily_quests_json,
    initialProg.streak_freezes,
    initialProg.double_xp_until,
    initialProg.placement_level,
    initialProg.updated_at
  );

  const user = db.prepare('SELECT id, email, full_name, avatar_url, auth_provider, created_at FROM users WHERE id = ?').get(userId);
  const token = signToken({ userId: user.id, email: user.email });

  return { user, progress: initialProg, token };
};

/**
 * Login user with local credentials
 */
const loginUser = ({ email, password, guestProgress = null }) => {
  const normalizedEmail = email.trim().toLowerCase();
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(normalizedEmail);
  if (!user) {
    throw new Error('Không tìm thấy tài khoản với email này.');
  }

  if (user.auth_provider !== 'local' && !user.password_hash) {
    throw new Error(`Tài khoản này được đăng ký qua ${user.auth_provider === 'google' ? 'Google' : 'Facebook'}. Vui lòng đăng nhập bằng nút xã hội tương ứng.`);
  }

  if (!verifyPassword(password, user.password_hash)) {
    throw new Error('Mật khẩu không chính xác. Vui lòng thử lại.');
  }

  // Update last login
  db.prepare('UPDATE users SET last_login_at = CURRENT_TIMESTAMP WHERE id = ?').run(user.id);

  // Fetch or create user progress
  let progress = db.prepare('SELECT * FROM user_progress WHERE user_id = ?').get(user.id);
  if (!progress) {
    progress = {
      user_id: user.id,
      xp: 0,
      streak: 1,
      gems: 200,
      hearts: 5,
      current_language: 'zh'
    };
  }

  if (guestProgress) {
    progress = mergeProgressData(progress, guestProgress);
    db.prepare(`
      INSERT OR REPLACE INTO user_progress (
        user_id, xp, streak, gems, hearts, max_hearts, current_language,
        completed_lessons_json, srs_vocabulary_json, daily_quests_json,
        streak_freezes, double_xp_until, placement_level, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      user.id,
      progress.xp,
      progress.streak,
      progress.gems,
      progress.hearts,
      5,
      progress.current_language,
      progress.completed_lessons_json,
      progress.srs_vocabulary_json,
      progress.daily_quests_json,
      progress.streak_freezes,
      progress.double_xp_until,
      progress.placement_level,
      progress.updated_at
    );
  }

  const token = signToken({ userId: user.id, email: user.email });
  const { password_hash, ...safeUser } = user;

  return { user: safeUser, progress, token };
};

/**
 * OAuth Login / Register (Google & Facebook)
 */
const loginOrRegisterOAuth = ({ provider, providerId, email, fullName, avatarUrl, guestProgress = null }) => {
  const normalizedEmail = (email || `${provider}_${providerId}@social.lingo555.com`).trim().toLowerCase();
  let user = db.prepare('SELECT * FROM users WHERE email = ?').get(normalizedEmail);

  if (!user) {
    // Create new OAuth user
    const userId = `u_${provider}_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`;
    db.prepare(`
      INSERT INTO users (id, email, password_hash, full_name, avatar_url, auth_provider, provider_id)
      VALUES (?, ?, NULL, ?, ?, ?, ?)
    `).run(userId, normalizedEmail, fullName || 'Học viên ' + provider, avatarUrl || '🦉', provider, providerId);

    const initialProg = mergeProgressData({
      user_id: userId,
      xp: 0,
      streak: 1,
      gems: 200,
      hearts: 5,
      current_language: 'zh'
    }, guestProgress);

    db.prepare(`
      INSERT INTO user_progress (
        user_id, xp, streak, gems, hearts, max_hearts, current_language,
        completed_lessons_json, srs_vocabulary_json, daily_quests_json,
        streak_freezes, double_xp_until, placement_level, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      userId,
      initialProg.xp,
      initialProg.streak,
      initialProg.gems,
      initialProg.hearts,
      5,
      initialProg.current_language,
      initialProg.completed_lessons_json,
      initialProg.srs_vocabulary_json,
      initialProg.daily_quests_json,
      initialProg.streak_freezes,
      initialProg.double_xp_until,
      initialProg.placement_level,
      initialProg.updated_at
    );

    user = db.prepare('SELECT id, email, full_name, avatar_url, auth_provider, created_at FROM users WHERE id = ?').get(userId);
    const token = signToken({ userId: user.id, email: user.email });
    return { user, progress: initialProg, token };
  } else {
    // Existing user: update avatar/name if changed and merge progress
    db.prepare(`
      UPDATE users 
      SET last_login_at = CURRENT_TIMESTAMP,
          full_name = COALESCE(?, full_name),
          avatar_url = COALESCE(?, avatar_url)
      WHERE id = ?
    `).run(fullName, avatarUrl, user.id);

    let progress = db.prepare('SELECT * FROM user_progress WHERE user_id = ?').get(user.id);
    if (!progress) {
      progress = { user_id: user.id, xp: 0, streak: 1, gems: 200, hearts: 5, current_language: 'zh' };
    }

    if (guestProgress) {
      progress = mergeProgressData(progress, guestProgress);
      db.prepare(`
        INSERT OR REPLACE INTO user_progress (
          user_id, xp, streak, gems, hearts, max_hearts, current_language,
          completed_lessons_json, srs_vocabulary_json, daily_quests_json,
          streak_freezes, double_xp_until, placement_level, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        user.id,
        progress.xp,
        progress.streak,
        progress.gems,
        progress.hearts,
        5,
        progress.current_language,
        progress.completed_lessons_json,
        progress.srs_vocabulary_json,
        progress.daily_quests_json,
        progress.streak_freezes,
        progress.double_xp_until,
        progress.placement_level,
        progress.updated_at
      );
    }

    const token = signToken({ userId: user.id, email: user.email });
    const { password_hash, ...safeUser } = user;
    return { user: safeUser, progress, token };
  }
};

/**
 * Get current user & progress by token payload
 */
const getCurrentUser = (userId) => {
  const user = db.prepare('SELECT id, email, full_name, avatar_url, auth_provider, created_at, last_login_at FROM users WHERE id = ?').get(userId);
  if (!user) return null;
  const progress = db.prepare('SELECT * FROM user_progress WHERE user_id = ?').get(userId);
  return { user, progress };
};

/**
 * Cloud sync user progress
 */
const syncUserProgress = (userId, newProgress) => {
  const current = db.prepare('SELECT * FROM user_progress WHERE user_id = ?').get(userId) || { user_id: userId };
  const merged = mergeProgressData(current, newProgress);

  db.prepare(`
    INSERT OR REPLACE INTO user_progress (
      user_id, xp, streak, gems, hearts, max_hearts, current_language,
      completed_lessons_json, srs_vocabulary_json, daily_quests_json,
      streak_freezes, double_xp_until, placement_level, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    userId,
    merged.xp,
    merged.streak,
    merged.gems,
    merged.hearts,
    5,
    merged.current_language,
    merged.completed_lessons_json,
    merged.srs_vocabulary_json,
    merged.daily_quests_json,
    merged.streak_freezes,
    merged.double_xp_until,
    merged.placement_level,
    new Date().toISOString()
  );

  return merged;
};

/**
 * Change password
 */
const changeUserPassword = (userId, currentPassword, newPassword) => {
  const user = db.prepare('SELECT password_hash FROM users WHERE id = ?').get(userId);
  if (!user) throw new Error('Không tìm thấy người dùng');
  if (user.password_hash && !verifyPassword(currentPassword, user.password_hash)) {
    throw new Error('Mật khẩu hiện tại không đúng');
  }
  const newHash = hashPassword(newPassword);
  db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(newHash, userId);
  return true;
};

module.exports = {
  hashPassword,
  verifyPassword,
  signToken,
  verifyToken,
  registerUser,
  loginUser,
  loginOrRegisterOAuth,
  getCurrentUser,
  syncUserProgress,
  changeUserPassword
};
