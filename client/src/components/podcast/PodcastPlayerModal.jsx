import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { speech } from '../../services/speechService';
import { sounds } from '../../services/soundEffects';
import { 
  X, 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Headphones, 
  Volume2, 
  Repeat, 
  Clock, 
  Sparkles,
  Disc3,
  Moon
} from 'lucide-react';

export const PodcastPlayerModal = ({ isOpen, onClose }) => {
  const { currentLang, currentLevel } = useApp();
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [sleepTimerMinutes, setSleepTimerMinutes] = useState(null);
  const [activeStage, setActiveStage] = useState('idle'); // 'word', 'meaning', 'example', 'shadowing'
  const [loading, setLoading] = useState(false);

  const isPlayingRef = useRef(false);
  const loopTimeoutRef = useRef(null);
  const audioContextRef = useRef(null);
  const silentOscillatorRef = useRef(null);

  // Sync ref
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Load words when opened
  useEffect(() => {
    if (isOpen) {
      loadWords();
    } else {
      stopPlayback();
    }
  }, [isOpen, currentLang, currentLevel]);

  const loadWords = async () => {
    setLoading(true);
    try {
      const res = await api.searchDictionary({
        lang: currentLang,
        level: currentLevel?.code || '',
        limit: 35
      });
      const items = res?.items || res?.words || [];
      if (items.length > 0) {
        setPlaylist(items);
        setCurrentIndex(0);
      }
    } catch (e) {
      console.warn('Failed to load words for podcast:', e);
    } finally {
      setLoading(false);
    }
  };

  // Start silent Web Audio oscillator to prevent mobile OS audio thread sleeping on lock screen
  const startAudioKeepAlive = () => {
    try {
      if (!audioContextRef.current) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContextRef.current = new AudioContext();
      }
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
      if (!silentOscillatorRef.current) {
        const osc = audioContextRef.current.createOscillator();
        const gain = audioContextRef.current.createGain();
        gain.gain.value = 0.0001; // Virtually inaudible keep-alive
        osc.connect(gain);
        gain.connect(audioContextRef.current.destination);
        osc.start();
        silentOscillatorRef.current = osc;
      }
    } catch (e) {
      // AudioContext might require user gesture, fallback gracefully
    }
  };

  const stopAudioKeepAlive = () => {
    try {
      if (silentOscillatorRef.current) {
        silentOscillatorRef.current.stop();
        silentOscillatorRef.current.disconnect();
        silentOscillatorRef.current = null;
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
        audioContextRef.current = null;
      }
    } catch (e) {}
  };

  // MediaSession API setup for lock-screen controls
  const updateMediaSession = (word) => {
    if (typeof navigator !== 'undefined' && 'mediaSession' in navigator && word) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: `${word.word} [${word.phonetic}]`,
        artist: word.meaning,
        album: `LingoFlow Podcast (${currentLevel?.title || 'Học Thụ Động'})`,
        artwork: [
          { src: '/icon-192.svg', sizes: '192x192', type: 'image/svg+xml' },
          { src: '/icon-512.svg', sizes: '512x512', type: 'image/svg+xml' }
        ]
      });

      navigator.mediaSession.setActionHandler('play', () => handlePlay());
      navigator.mediaSession.setActionHandler('pause', () => handlePause());
      navigator.mediaSession.setActionHandler('nexttrack', () => handleNext());
      navigator.mediaSession.setActionHandler('previoustrack', () => handlePrev());
    }
  };

  // Automated sequence playback loop
  const playWordSequence = async (index) => {
    if (!isPlayingRef.current || playlist.length === 0) return;
    const word = playlist[index];
    if (!word) return;

    updateMediaSession(word);

    // 1. Stage: Read target word
    setActiveStage('word');
    await speakPromise(word.word, currentLang, playbackSpeed);
    if (!isPlayingRef.current) return;

    // Pause 0.8s
    await waitPromise(800);
    if (!isPlayingRef.current) return;

    // 2. Stage: Read Vietnamese meaning
    setActiveStage('meaning');
    // Read meaning in Vietnamese if browser has vi-VN voice, or phonetic cue
    await speakPromise(word.meaning, 'vi-VN', playbackSpeed);
    if (!isPlayingRef.current) return;

    await waitPromise(800);
    if (!isPlayingRef.current) return;

    // 3. Stage: Read Example sentence
    if (word.example_target) {
      setActiveStage('example');
      await speakPromise(word.example_target, currentLang, playbackSpeed);
      if (!isPlayingRef.current) return;
    }

    // 4. Stage: Shadowing pause (3.0s silence for learner recitation)
    setActiveStage('shadowing');
    await waitPromise(3000);
    if (!isPlayingRef.current) return;

    // Advance to next word
    const nextIndex = (index + 1) % playlist.length;
    setCurrentIndex(nextIndex);
    playWordSequence(nextIndex);
  };

  const speakPromise = (text, lang, rate) => {
    return new Promise((resolve) => {
      if (typeof window === 'undefined' || !window.speechSynthesis) {
        setTimeout(resolve, 1500);
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'zh' ? 'zh-CN' : lang === 'en' ? 'en-US' : 'vi-VN';
      utterance.rate = rate;

      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();

      // Safari timeout guard
      const guard = setTimeout(() => {
        resolve();
      }, 7000);

      utterance.onend = () => {
        clearTimeout(guard);
        resolve();
      };

      window.speechSynthesis.speak(utterance);
    });
  };

  const waitPromise = (ms) => {
    return new Promise((resolve) => {
      loopTimeoutRef.current = setTimeout(resolve, ms);
    });
  };

  const handlePlay = () => {
    sounds.playTap();
    setIsPlaying(true);
    isPlayingRef.current = true;
    startAudioKeepAlive();
    playWordSequence(currentIndex);
  };

  const handlePause = () => {
    sounds.playTap();
    setIsPlaying(false);
    isPlayingRef.current = false;
    setActiveStage('idle');
    if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  const stopPlayback = () => {
    setIsPlaying(false);
    isPlayingRef.current = false;
    setActiveStage('idle');
    if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    stopAudioKeepAlive();
  };

  const handleNext = () => {
    sounds.playTap();
    if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    const nextIndex = (currentIndex + 1) % playlist.length;
    setCurrentIndex(nextIndex);
    if (isPlayingRef.current) {
      playWordSequence(nextIndex);
    }
  };

  const handlePrev = () => {
    sounds.playTap();
    if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    setCurrentIndex(prevIndex);
    if (isPlayingRef.current) {
      playWordSequence(prevIndex);
    }
  };

  // Sleep timer handler
  useEffect(() => {
    if (!sleepTimerMinutes) return;
    const timer = setTimeout(() => {
      handlePause();
      setSleepTimerMinutes(null);
    }, sleepTimerMinutes * 60 * 1000);

    return () => clearTimeout(timer);
  }, [sleepTimerMinutes]);

  if (!isOpen) return null;

  const currentWord = playlist[currentIndex] || {};

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="duo-card max-w-lg w-full p-6 sm:p-8 relative bg-slate-900 border-2 border-slate-800 text-white shadow-2xl flex flex-col justify-between min-h-[580px] max-h-[92vh] overflow-y-auto">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
              <Headphones className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <span>Podcast Thụ Động</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold border border-emerald-500/30">
                  Hands-free
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                {currentLevel?.title || 'Lộ trình'} • Từ {currentIndex + 1}/{playlist.length || 0}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playTap();
              stopPlayback();
              onClose();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Vinyl Player Center Animation */}
        <div className="my-6 flex flex-col items-center justify-center text-center space-y-4">
          <div className="relative">
            <div className={`w-36 h-36 rounded-full bg-gradient-to-tr from-slate-950 via-purple-950 to-indigo-900 p-2 shadow-2xl border-4 border-slate-700/60 flex items-center justify-center ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }}>
              <div className="w-20 h-20 rounded-full bg-slate-900 border-2 border-purple-500/40 flex items-center justify-center text-3xl shadow-inner">
                {currentLang === 'zh' ? '🇨🇳' : '🦉'}
              </div>
            </div>
            {/* Center glow ring */}
            {isPlaying && (
              <span className="absolute inset-0 rounded-full border-2 border-purple-400 animate-ping opacity-25" />
            )}
          </div>

          {/* Current Word Display & Subtitle */}
          <div className="space-y-1.5 px-4 w-full">
            <div className="text-4xl sm:text-5xl font-black text-white tracking-tight drop-shadow-md">
              {currentWord.word || 'Đang tải...'}
            </div>
            <div className="text-lg font-bold text-emerald-400">
              [{currentWord.phonetic || ''}]
            </div>
            <div className="text-xl font-extrabold text-amber-300 pt-1">
              {currentWord.meaning || ''}
            </div>

            {currentWord.example_target && (
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 mt-2 space-y-0.5">
                <div className="font-bold text-white">{currentWord.example_target}</div>
                <div className="text-slate-400">{currentWord.example_meaning}</div>
              </div>
            )}
          </div>

          {/* Live Stage Badge */}
          <div className="pt-1">
            {activeStage === 'word' && (
              <span className="text-xs px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/40 font-extrabold animate-pulse">
                🔊 Đang đọc từ vựng...
              </span>
            )}
            {activeStage === 'meaning' && (
              <span className="text-xs px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-extrabold animate-pulse">
                💡 Đang đọc nghĩa tiếng Việt...
              </span>
            )}
            {activeStage === 'example' && (
              <span className="text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 font-extrabold animate-pulse">
                📖 Đang đọc câu ví dụ...
              </span>
            )}
            {activeStage === 'shadowing' && (
              <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-extrabold animate-bounce-short">
                ⏳ Khoảng lặng 3 giây: Nhẩm đọc theo!
              </span>
            )}
            {activeStage === 'idle' && !isPlaying && (
              <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 font-bold">
                Tạm dừng • Bấm Phát để tiếp tục
              </span>
            )}
          </div>
        </div>

        {/* Bottom Playback Controls */}
        <div className="space-y-4 pt-2">
          {/* Main Buttons */}
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={handlePrev}
              disabled={playlist.length <= 1}
              className="p-3 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 active:scale-95 transition-all"
              title="Từ trước"
            >
              <SkipBack className="w-6 h-6" />
            </button>

            <button
              onClick={isPlaying ? handlePause : handlePlay}
              disabled={playlist.length === 0}
              className="w-16 h-16 rounded-full bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/30 transition-all font-black"
              title={isPlaying ? 'Tạm dừng' : 'Bắt đầu nghe'}
            >
              {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
            </button>

            <button
              onClick={handleNext}
              disabled={playlist.length <= 1}
              className="p-3 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 active:scale-95 transition-all"
              title="Từ kế tiếp"
            >
              <SkipForward className="w-6 h-6" />
            </button>
          </div>

          {/* Quick Preferences Bar (Speed & Sleep Timer) */}
          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
            {/* Speed Toggle */}
            <div className="flex items-center gap-1">
              <span className="font-bold">Tốc độ:</span>
              {[0.8, 1.0, 1.2].map(speed => (
                <button
                  key={speed}
                  onClick={() => setPlaybackSpeed(speed)}
                  className={`px-2 py-1 rounded-md font-bold transition-all ${playbackSpeed === speed ? 'bg-purple-600 text-white' : 'hover:bg-slate-800'}`}
                >
                  {speed}x
                </button>
              ))}
            </div>

            {/* Sleep Timer */}
            <div className="flex items-center gap-1.5">
              <Moon className="w-4 h-4 text-indigo-400" />
              <button
                onClick={() => {
                  if (!sleepTimerMinutes) setSleepTimerMinutes(15);
                  else if (sleepTimerMinutes === 15) setSleepTimerMinutes(30);
                  else if (sleepTimerMinutes === 30) setSleepTimerMinutes(45);
                  else setSleepTimerMinutes(null);
                }}
                className="hover:underline font-bold text-slate-300"
              >
                {sleepTimerMinutes ? `Hẹn giờ: ${sleepTimerMinutes}p` : 'Hẹn giờ tắt'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
