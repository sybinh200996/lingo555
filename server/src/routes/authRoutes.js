/**
 * authRoutes.js
 * Endpoints for user registration, authentication, Google & Facebook OAuth,
 * profile retrieval and two-way cloud progress synchronization.
 */

const express = require('express');
const router = express.Router();
const authService = require('../services/authService');

// Authentication middleware: validates Bearer JWT token
const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Chưa đăng nhập hoặc phiên làm việc đã hết hạn' });
  }

  const token = authHeader.split(' ')[1];
  const payload = authService.verifyToken(token);
  if (!payload || !payload.userId) {
    return res.status(401).json({ success: false, error: 'Token không hợp lệ hoặc đã hết hạn' });
  }

  req.auth = payload;
  next();
};

// 1. POST /api/auth/register
router.post('/register', (req, res) => {
  try {
    const { fullName, email, password, avatar, guestProgress } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({ success: false, error: 'Vui lòng điền đầy đủ Họ tên, Email và Mật khẩu' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, error: 'Mật khẩu phải chứa ít nhất 6 ký tự' });
    }

    const result = authService.registerUser({ fullName, email, password, avatar, guestProgress });
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// 2. POST /api/auth/login
router.post('/login', (req, res) => {
  try {
    const { email, password, guestProgress } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Vui lòng nhập Email và Mật khẩu' });
    }

    const result = authService.loginUser({ email, password, guestProgress });
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// 3. POST /api/auth/oauth/google
router.post('/oauth/google', (req, res) => {
  try {
    const { credential, email, name, avatar, providerId, guestProgress } = req.body;

    let userEmail = email;
    let userName = name;
    let userAvatar = avatar || '🐼';
    let userSub = providerId || `google_${Date.now()}`;

    // If Google Identity Services credential (JWT) is provided, decode payload
    if (credential) {
      try {
        const parts = credential.split('.');
        if (parts.length === 3) {
          const payloadJson = Buffer.from(parts[1], 'base64url').toString('utf8');
          const googlePayload = JSON.parse(payloadJson);
          userEmail = googlePayload.email || userEmail;
          userName = googlePayload.name || userName;
          userAvatar = googlePayload.picture || userAvatar;
          userSub = googlePayload.sub || userSub;
        }
      } catch (decodeErr) {
        console.warn('Failed to decode Google credential JWT:', decodeErr.message);
      }
    }

    if (!userEmail) {
      return res.status(400).json({ success: false, error: 'Không nhận được thông tin email từ Google' });
    }

    const result = authService.loginOrRegisterOAuth({
      provider: 'google',
      providerId: userSub,
      email: userEmail,
      fullName: userName || 'Học viên Google',
      avatarUrl: userAvatar,
      guestProgress
    });

    res.json({ success: true, ...result });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// 4. POST /api/auth/oauth/facebook
router.post('/oauth/facebook', (req, res) => {
  try {
    const { accessToken, userID, email, name, avatar, guestProgress } = req.body;
    const providerId = userID || `fb_${Date.now()}`;
    const userEmail = email || `fb_${providerId}@facebook.lingo555.com`;
    const userName = name || 'Học viên Facebook';
    const userAvatar = avatar || '🦉';

    const result = authService.loginOrRegisterOAuth({
      provider: 'facebook',
      providerId,
      email: userEmail,
      fullName: userName,
      avatarUrl: userAvatar,
      guestProgress
    });

    res.json({ success: true, ...result });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// 5. GET /api/auth/me
router.get('/me', requireAuth, (req, res) => {
  try {
    const data = authService.getCurrentUser(req.auth.userId);
    if (!data) {
      return res.status(404).json({ success: false, error: 'Không tìm thấy thông tin tài khoản' });
    }
    res.json({ success: true, ...data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 6. POST /api/auth/sync (Two-way cloud synchronization)
router.post('/sync', requireAuth, (req, res) => {
  try {
    const { progress } = req.body;
    if (!progress) {
      return res.status(400).json({ success: false, error: 'Thiếu dữ liệu tiến trình học tập' });
    }

    const synced = authService.syncUserProgress(req.auth.userId, progress);
    res.json({
      success: true,
      progress: synced,
      syncedAt: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 7. POST /api/auth/change-password
router.post('/change-password', requireAuth, (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ success: false, error: 'Mật khẩu mới phải có tối thiểu 6 ký tự' });
    }

    authService.changeUserPassword(req.auth.userId, currentPassword, newPassword);
    res.json({ success: true, message: 'Đổi mật khẩu thành công!' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;
