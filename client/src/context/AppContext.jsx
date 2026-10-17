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

  // Single Active Modal System (Zero Modal Stacking Guarantee)
  // activeModal: 'lesson' | 'aiTutor' | 'shop' | 'quests' | 'settings' | 'placementTest' | 'levelSelector' | 'podcast' | 'word' | null
  const [activeModal, setActiveModal] = useState(null);
  const [aiTutorPayload, setAiTutorPayload] = useState(null);
  const [writingWord, setWritingWord] = useState(null); // { word, phonetic, meaning } or string
  const [hasAiKey, setHasAiKey] = useState(false);

  // Derived modal booleans ensuring only 1 modal is ever open simultaneously
  const isAiSettingsOpen = activeModal === 'settings';
  const isAiTutorOpen = activeModal === 'aiTutor';
  const isGemShopOpen = activeModal === 'shop';
  const isQuestsOpen = activeModal === 'quests';
  const isPodcastOpen = activeModal === 'podcast';
  const isPlacementOpen = activeModal === 'placementTest';
  const isLevelModalOpen = activeModal === 'levelSelector';
  const isWritingModalOpen = activeModal === 'writing';

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
      setActiveModal('settings');
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
        // Default to 'zh' if not explicitly saved by the user
        const savedLang = localStorage.getItem('lingo555_current_lang');
        const targetLang = savedLang || profile.current_language || 'zh';
        setCurrentLang(targetLang);
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
    sounds.playTap?.();

    // 1. Immediately reset active modal/lesson states so lessons do not carry over
    setActiveLessonId(null);
    setActiveWordModal(null);
    setActiveModal(null);
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

    // 5. Instantly load levels for the new language and set the first level
    try {
      const lvls = await api.getLevels(newLang);
      setLevels(lvls);
      if (lvls && lvls.length > 0) {
        setCurrentLevel(lvls[0]);
      }
    } catch (err) {
      console.warn('Error switching language levels:', err);
    }

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
    sounds.playTap?.();
    setActiveLessonId(lessonId);
    setActiveModal('lesson');
  };

  const closeLesson = () => {
    sounds.playTap?.();
    setActiveLessonId(null);
    setActiveModal(prev => prev === 'lesson' ? null : prev);
    refreshProfile();
  };

  const openAiSettings = () => {
    sounds.playTap?.();
    setActiveModal('settings');
  };

  const closeAiSettings = () => {
    sounds.playTap?.();
    setActiveModal(prev => prev === 'settings' ? null : prev);
    setHasAiKey(!!ai.getApiKey() || !!serverAiStatus?.hasServerKey);
  };

  const openAiTutor = (payload = null) => {
    sounds.playTap?.();
    setAiTutorPayload(payload);
    setActiveModal('aiTutor');
  };

  const closeAiTutor = () => {
    sounds.playTap?.();
    setAiTutorPayload(null);
    setActiveModal(prev => prev === 'aiTutor' ? null : prev);
  };

  const openGemShop = () => {
    sounds.playTap?.();
    setActiveModal('shop');
  };

  const closeGemShop = () => {
    sounds.playTap?.();
    setActiveModal(prev => prev === 'shop' ? null : prev);
  };

  const openQuests = () => {
    sounds.playTap?.();
    setActiveModal('quests');
  };

  const closeQuests = () => {
    sounds.playTap?.();
    setActiveModal(prev => prev === 'quests' ? null : prev);
  };

  const openPodcast = () => {
    sounds.playTap?.();
    setActiveModal('podcast');
  };

  const closePodcast = () => {
    sounds.playTap?.();
    setActiveModal(prev => prev === 'podcast' ? null : prev);
  };

  const openPlacement = () => {
    sounds.playTap?.();
    setActiveModal('placementTest');
  };

  const closePlacement = () => {
    sounds.playTap?.();
    setActiveModal(prev => prev === 'placementTest' ? null : prev);
  };

  const openLevelModal = () => {
    sounds.playTap?.();
    setActiveModal('levelSelector');
  };

  const closeLevelModal = () => {
    sounds.playTap?.();
    setActiveModal(prev => prev === 'levelSelector' ? null : prev);
  };

  const openWritingModal = (wordOrObj) => {
    sounds.playTap?.();
    setWritingWord(wordOrObj);
    setActiveModal('writing');
  };

  const closeWritingModal = () => {
    sounds.playTap?.();
    setWritingWord(null);
    setActiveModal(prev => prev === 'writing' ? null : prev);
  };

  const closeAllModals = () => {
    sounds.playTap?.();
    setActiveModal(null);
    setActiveLessonId(null);
    setActiveWordModal(null);
    setAiTutorPayload(null);
  };

  const toggleFreeMode = () => {
    sounds.playTap?.();
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
        closeLevelModal,
        writingWord,
        isWritingModalOpen,
        openWritingModal,
        closeWritingModal,
        activeModal,
        setActiveModal,
        closeAllModals
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
