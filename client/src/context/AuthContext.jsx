/**
 * AuthContext.jsx
 * Global Authentication & Cloud Sync Context for Lingo555.
 * Handles Guest Mode, Login, Registration, Google & Facebook OAuth,
 * and seamless background Cloud Synchronization across devices.
 */

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { authApi } from '../services/authApi';
import { sounds } from '../services/soundEffects';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('lingo555_auth_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (_) {
      return null;
    }
  });

  const [token, setToken] = useState(() => authApi.getToken());
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useState(() => {
    try {
      return localStorage.getItem('lingo555_last_synced') || null;
    } catch (_) {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'register'

  const syncTimerRef = useRef(null);

  // Check token validity and load latest user on mount
  useEffect(() => {
    const initAuth = async () => {
      const currentToken = authApi.getToken();
      if (!currentToken) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await authApi.getMe();
        if (res.success && res.user) {
          setUser(res.user);
          localStorage.setItem('lingo555_auth_user', JSON.stringify(res.user));
          if (res.progress) {
            setLastSyncedAt(new Date().toISOString());
            localStorage.setItem('lingo555_last_synced', new Date().toISOString());
          }
        } else {
          // Token expired or invalid
          authApi.clearToken();
          setUser(null);
          localStorage.removeItem('lingo555_auth_user');
        }
      } catch (err) {
        console.warn('Failed to verify session on startup:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const openAuthModal = (mode = 'login') => {
    sounds.playTap?.();
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    sounds.playTap?.();
    setIsAuthModalOpen(false);
  };

  // Helper to handle successful login/register
  const handleAuthSuccess = (data, guestProgress = null) => {
    if (data.token) {
      setToken(data.token);
      authApi.setToken(data.token);
    }
    if (data.user) {
      setUser(data.user);
      localStorage.setItem('lingo555_auth_user', JSON.stringify(data.user));
    }
    const now = new Date().toISOString();
    setLastSyncedAt(now);
    localStorage.setItem('lingo555_last_synced', now);
    setIsAuthModalOpen(false);
    sounds.playFanfare?.();

    // Broadcast auth success event so AppContext can merge progress
    window.dispatchEvent(new CustomEvent('lingo555:auth-success', {
      detail: {
        user: data.user,
        progress: data.progress,
        guestProgress
      }
    }));
  };

  const login = async ({ email, password, guestProgress }) => {
    const res = await authApi.login({ email, password, guestProgress });
    if (res.success) {
      handleAuthSuccess(res, guestProgress);
    }
    return res;
  };

  const register = async ({ fullName, email, password, avatar, guestProgress }) => {
    const res = await authApi.register({ fullName, email, password, avatar, guestProgress });
    if (res.success) {
      handleAuthSuccess(res, guestProgress);
    }
    return res;
  };

  const loginWithGoogle = async ({ credential, email, name, avatar, providerId, guestProgress }) => {
    const res = await authApi.oauthGoogle({ credential, email, name, avatar, providerId, guestProgress });
    if (res.success) {
      handleAuthSuccess(res, guestProgress);
    }
    return res;
  };

  const loginWithFacebook = async ({ accessToken, userID, email, name, avatar, guestProgress }) => {
    const res = await authApi.oauthFacebook({ accessToken, userID, email, name, avatar, guestProgress });
    if (res.success) {
      handleAuthSuccess(res, guestProgress);
    }
    return res;
  };

  const logout = () => {
    sounds.playTap?.();
    authApi.clearToken();
    setToken(null);
    setUser(null);
    localStorage.removeItem('lingo555_auth_user');
    window.dispatchEvent(new CustomEvent('lingo555:logout'));
  };

  // Immediate Cloud Sync
  const syncNow = async (progress) => {
    if (!token || !user) return { success: false, message: 'Chưa đăng nhập' };
    setIsSyncing(true);
    try {
      const res = await authApi.syncProgress(progress);
      if (res.success) {
        const now = res.syncedAt || new Date().toISOString();
        setLastSyncedAt(now);
        localStorage.setItem('lingo555_last_synced', now);
      }
      return res;
    } catch (err) {
      console.warn('Sync failed:', err);
      return { success: false, error: err.message };
    } finally {
      setIsSyncing(false);
    }
  };

  // Debounced Cloud Sync (1.5s delay to save bandwidth and prevent hammering server)
  const debouncedSync = useCallback((progress) => {
    if (!token || !user) return;
    if (syncTimerRef.current) {
      clearTimeout(syncTimerRef.current);
    }
    syncTimerRef.current = setTimeout(() => {
      syncNow(progress);
    }, 1500);
  }, [token, user]);

  // Listen for progress updates from AppContext (debounced sync 1.5s)
  useEffect(() => {
    const handleProfileUpdated = (e) => {
      if (e.detail && token && user) {
        debouncedSync(e.detail);
      }
    };

    const handleOpenAuth = (e) => {
      openAuthModal(e.detail?.mode || 'login');
    };

    window.addEventListener('lingo555:profile-updated', handleProfileUpdated);
    window.addEventListener('lingo555:open-auth', handleOpenAuth);
    return () => {
      window.removeEventListener('lingo555:profile-updated', handleProfileUpdated);
      window.removeEventListener('lingo555:open-auth', handleOpenAuth);
    };
  }, [token, user, debouncedSync]);

  const changePassword = async ({ currentPassword, newPassword }) => {
    return await authApi.changePassword({ currentPassword, newPassword });
  };

  const updateAvatar = (newAvatar) => {
    if (!user) return;
    const updated = { ...user, avatar_url: newAvatar };
    setUser(updated);
    localStorage.setItem('lingo555_auth_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        isLoading,
        isSyncing,
        lastSyncedAt,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        login,
        register,
        loginWithGoogle,
        loginWithFacebook,
        logout,
        syncNow,
        debouncedSync,
        changePassword,
        updateAvatar
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
