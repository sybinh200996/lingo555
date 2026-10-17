import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { sounds } from '../services/soundEffects';
import { ai } from '../services/aiClient';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentLang, setCurrentLang] = useState('zh'); // 'zh' or 'en'
  const [languages, setLanguages] = useState([]);
  const [levels, setLevels] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(null);
  const [activeTab, setActiveTab] = useState('learn'); // 'learn', 'dict', 'practice', 'speak', 'profile'
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeLessonId, setActiveLessonId] = useState(null);
  const [activeWordModal, setActiveWordModal] = useState(null);

  // AI Ecosystem states
  const [isAiSettingsOpen, setIsAiSettingsOpen] = useState(false);
  const [isAiTutorOpen, setIsAiTutorOpen] = useState(false);
  const [aiTutorPayload, setAiTutorPayload] = useState(null);
  const [hasAiKey, setHasAiKey] = useState(false);

  const [userProfile, setUserProfile] = useState({
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
  });

  // Load languages and user profile on mount
  useEffect(() => {
    loadInitialData();
  }, []);

  // Sync Dark mode with document class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
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
    setCurrentLang(newLang);
    setUserProfile(prev => ({
      ...prev,
      avatar: newLang === 'zh' ? '🐼' : '🦉',
      current_language: newLang
    }));
    try {
      await api.updateUserProfile({ current_language: newLang });
    } catch (e) {
      // ignore
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
        hasAiKey
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
