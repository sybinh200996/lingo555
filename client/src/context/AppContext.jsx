import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { sounds } from '../services/soundEffects';
import { ai } from '../services/aiClient';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentLang, setCurrentLang] = useState(() => {
    try {
      return localStorage.getItem('lingo555_current_lang') || 'zh';
    } catch (e) {
      return 'zh';
    }
  });
  const [languages, setLanguages] = useState([]);
  const [levels, setLevels] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(null);
  const [activeTab, setActiveTab] = useState('learn'); // 'learn', 'dict', 'practice', 'speak', 'profile'
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      return localStorage.getItem('lingo555_theme') === 'dark';
    } catch (e) {
      return false;
    }
  });
  const [activeLessonId, setActiveLessonId] = useState(null);
  const [activeWordModal, setActiveWordModal] = useState(null);

  // AI Ecosystem states
  const [isAiSettingsOpen, setIsAiSettingsOpen] = useState(false);
  const [isAiTutorOpen, setIsAiTutorOpen] = useState(false);
  const [aiTutorPayload, setAiTutorPayload] = useState(null);
  const [hasAiKey, setHasAiKey] = useState(false);

  // Version 2.0 Features Modals
  const [isGemShopOpen, setIsGemShopOpen] = useState(false);
  const [isQuestsOpen, setIsQuestsOpen] = useState(false);
  const [isPodcastOpen, setIsPodcastOpen] = useState(false);
  const [isPlacementOpen, setIsPlacementOpen] = useState(false);
  const [isLevelModalOpen, setIsLevelModalOpen] = useState(false);

  // Free learning mode: Allows instant access to all lessons across all levels
  const [isFreeMode, setIsFreeMode] = useState(() => {
    try {
      return localStorage.getItem('lingo_free_learning_mode') !== 'false';
    } catch (e) {
      return true;
    }
  });

  const [userProfile, setUserProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('lingo555_user_profile');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {}
    return {
      id: 'default_user',
      username: 'Học viên Polyglot',
      avatar: '🐼',
      current_language: 'zh',
      hearts: 5,
      max_hearts: 5,
      gems: 350,
      xp: 120,
      streak: 3,
      stats: {
        completedLessons: 0,
        wordsMastered: 0,
        difficultWords: 0
      }
    };
  });

  // Sync userProfile to localStorage whenever updated
  useEffect(() => {
    try {
      localStorage.setItem('lingo555_user_profile', JSON.stringify(userProfile));
    } catch (e) {}
  }, [userProfile]);

  // Load languages and user profile on mount
  useEffect(() => {
    loadInitialData();

    const handleOpenAiModal = () => {
      setIsAiSettingsOpen(true);
    };
    window.addEventListener('lingo555:open-ai-settings', handleOpenAiModal);

    return () => {
      window.removeEventListener('lingo555:open-ai-settings', handleOpenAiModal);
    };
  }, []);

  // Sync Dark mode with document class and localStorage
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('lingo555_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('lingo555_theme', 'light');
    }
  }, [isDarkMode]);

  // Load levels when language changes
  useEffect(() => {
    loadLevels(currentLang);
  }, [currentLang]);

  const [serverAiStatus, setServerAiStatus] = useState(null);

  const loadInitialData = async () => {
    try {
      const [langs, profile, aiStatus] = await Promise.all([
        api.getLanguages(),
        api.getUserProfile(),
        ai.getStatus().catch(() => ({ hasServerKey: false }))
      ]);
      setLanguages(langs);
      setServerAiStatus(aiStatus);
      if (aiStatus?.hasServerKey || ai.getApiKey()) {
        setHasAiKey(true);
      }
      if (profile && !profile.error) {
        setUserProfile(profile);
        if (profile.current_language) {
          setCurrentLang(profile.current_language);
        }
      }
    } catch (err) {
      console.warn('Error loading initial data:', err);
    }
  };

  const loadLevels = async (lang) => {
    try {
      const lvls = await api.getLevels(lang);
      setLevels(lvls);
      if (lvls.length > 0) {
        // Keep current level if it belongs to the language, else set first
        setCurrentLevel(prev => {
          if (prev && lvls.some(l => l.id === prev.id)) return prev;
          return lvls[0];
        });
      }
    } catch (err) {
      console.warn('Error loading levels:', err);
    }
  };

  const switchLanguage = async (newLang) => {
    sounds.playTap();

    // 1. Immediately reset active modal/lesson states so lessons do not carry over
    setActiveLessonId(null);
    setActiveWordModal(null);
    setIsAiTutorOpen(false);
    setAiTutorPayload(null);

    // 2. Stop any active speech synthesis and recognition immediately
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    // 3. Persist and switch current language
    try {
      localStorage.setItem('lingo555_current_lang', newLang);
    } catch (e) {}
    setCurrentLang(newLang);

    // 4. Update user profile state and localStorage
    setUserProfile(prev => {
      const updated = {
        ...prev,
        avatar: newLang === 'zh' ? '🐼' : '🦉',
        current_language: newLang
      };
      try {
        localStorage.setItem('lingo555_user_profile', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    // 5. Instantly trigger levels loading for SkillTree
    loadLevels(newLang);

    // 6. Sync language preference to Backend Database
    try {
      await api.updateUserProfile({ current_language: newLang });
    } catch (e) {
      console.warn('Failed to update language on backend:', e);
    }
  };

  const refreshProfile = async () => {
    try {
      const profile = await api.getUserProfile();
      if (profile && !profile.error) {
        setUserProfile(profile);
      }
    } catch (err) {
      console.warn('Error refreshing profile:', err);
    }
  };

  const loseHeart = async () => {
    sounds.playWrong();
    setUserProfile(prev => ({
      ...prev,
      hearts: Math.max(0, prev.hearts - 1)
    }));
    try {
      await api.loseHeart();
    } catch (e) {
      // ignore
    }
  };

  const refillHearts = async () => {
    try {
      const res = await api.refillHearts();
      if (res.success && res.profile) {
        sounds.playCorrect();
        setUserProfile(prev => ({
          ...prev,
          hearts: res.profile.hearts,
          gems: res.profile.gems
        }));
      }
    } catch (e) {
      console.warn('Error refilling hearts:', e);
    }
  };

  const toggleTheme = () => {
    sounds.playTap();
    setIsDarkMode(prev => !prev);
  };

  const startLesson = (lessonId) => {
    sounds.playTap();
    setActiveLessonId(lessonId);
  };

  const closeLesson = () => {
    sounds.playTap();
    setActiveLessonId(null);
    refreshProfile();
  };

  const openAiSettings = () => {
    sounds.playTap();
    setIsAiSettingsOpen(true);
  };

  const closeAiSettings = () => {
    sounds.playTap();
    setIsAiSettingsOpen(false);
    setHasAiKey(!!ai.getApiKey() || !!serverAiStatus?.hasServerKey);
  };

  const openAiTutor = (payload = null) => {
    sounds.playTap();
    setAiTutorPayload(payload);
    setIsAiTutorOpen(true);
  };

  const closeAiTutor = () => {
    sounds.playTap();
    setIsAiTutorOpen(false);
    setAiTutorPayload(null);
  };

  const openGemShop = () => {
    sounds.playTap();
    setIsGemShopOpen(true);
  };

  const closeGemShop = () => {
    sounds.playTap();
    setIsGemShopOpen(false);
  };

  const openQuests = () => {
    sounds.playTap();
    setIsQuestsOpen(true);
  };

  const closeQuests = () => {
    sounds.playTap();
    setIsQuestsOpen(false);
  };

  const openPodcast = () => {
    sounds.playTap();
    setIsPodcastOpen(true);
  };

  const closePodcast = () => {
    sounds.playTap();
    setIsPodcastOpen(false);
  };

  const openPlacement = () => {
    sounds.playTap();
    setIsPlacementOpen(true);
  };

  const closePlacement = () => {
    sounds.playTap();
    setIsPlacementOpen(false);
  };

  const openLevelModal = () => {
    sounds.playTap();
    setIsLevelModalOpen(true);
  };

  const closeLevelModal = () => {
    sounds.playTap();
    setIsLevelModalOpen(false);
  };

  const toggleFreeMode = () => {
    sounds.playTap();
    setIsFreeMode(prev => {
      const next = !prev;
      try {
        localStorage.setItem('lingo_free_learning_mode', String(next));
      } catch (e) {}
      return next;
    });
  };

  return (
    <AppContext.Provider
      value={{
        currentLang,
        languages,
        levels,
        currentLevel,
        setCurrentLevel,
        switchLanguage,
        activeTab,
        setActiveTab,
        isDarkMode,
        toggleTheme,
        userProfile,
        refreshProfile,
        loseHeart,
        refillHearts,
        activeLessonId,
        startLesson,
        closeLesson,
        activeWordModal,
        setActiveWordModal,
        isAiSettingsOpen,
        openAiSettings,
        closeAiSettings,
        isAiTutorOpen,
        aiTutorPayload,
        openAiTutor,
        closeAiTutor,
        hasAiKey,
        isGemShopOpen,
        openGemShop,
        closeGemShop,
        isQuestsOpen,
        openQuests,
        closeQuests,
        isPodcastOpen,
        openPodcast,
        closePodcast,
        isPlacementOpen,
        openPlacement,
        closePlacement,
        isFreeMode,
        toggleFreeMode,
        isLevelModalOpen,
        openLevelModal,
        closeLevelModal
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
