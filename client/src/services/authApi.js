/**
 * authApi.js
 * Client communication service for user authentication and cloud synchronization.
 */

const TOKEN_KEY = 'lingo555_auth_token';

export const authApi = {
  getToken: () => {
    try {
      return localStorage.getItem(TOKEN_KEY) || null;
    } catch (_) {
      return null;
    }
  },

  setToken: (token) => {
    try {
      if (token) {
        localStorage.setItem(TOKEN_KEY, token);
      } else {
        localStorage.removeItem(TOKEN_KEY);
      }
    } catch (_) {}
  },

  clearToken: () => {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch (_) {}
  },

  getHeaders: () => {
    const headers = { 'Content-Type': 'application/json' };
    const token = authApi.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  },

  register: async ({ fullName, email, password, avatar, guestProgress }) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, email, password, avatar, guestProgress })
    });
    const data = await res.json();
    if (data.token) {
      authApi.setToken(data.token);
    }
    return data;
  },

  login: async ({ email, password, guestProgress }) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, guestProgress })
    });
    const data = await res.json();
    if (data.token) {
      authApi.setToken(data.token);
    }
    return data;
  },

  oauthGoogle: async ({ credential, email, name, avatar, providerId, guestProgress }) => {
    const res = await fetch('/api/auth/oauth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential, email, name, avatar, providerId, guestProgress })
    });
    const data = await res.json();
    if (data.token) {
      authApi.setToken(data.token);
    }
    return data;
  },

  oauthFacebook: async ({ accessToken, userID, email, name, avatar, guestProgress }) => {
    const res = await fetch('/api/auth/oauth/facebook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accessToken, userID, email, name, avatar, guestProgress })
    });
    const data = await res.json();
    if (data.token) {
      authApi.setToken(data.token);
    }
    return data;
  },

  getMe: async () => {
    const token = authApi.getToken();
    if (!token) return { success: false, error: 'No token' };

    const res = await fetch('/api/auth/me', {
      headers: authApi.getHeaders()
    });
    return await res.json();
  },

  syncProgress: async (progress) => {
    const token = authApi.getToken();
    if (!token) return { success: false, error: 'Guest mode, not synced' };

    const res = await fetch('/api/auth/sync', {
      method: 'POST',
      headers: authApi.getHeaders(),
      body: JSON.stringify({ progress })
    });
    return await res.json();
  },

  changePassword: async ({ currentPassword, newPassword }) => {
    const res = await fetch('/api/auth/change-password', {
      method: 'POST',
      headers: authApi.getHeaders(),
      body: JSON.stringify({ currentPassword, newPassword })
    });
    return await res.json();
  }
};
