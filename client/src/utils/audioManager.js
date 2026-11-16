// Unified Audio Manager for Lingo555
// Features: Singleton Pattern, Overlap Prevention, Web Audio API & TTS Integration,
// Dual Speed Rates (1.0x Normal & 0.75x Slow Turtle), AudioContext Auto-Unlock.

import { tts } from './tts';
import { sounds } from '../services/soundEffects';

class AudioManager {
  constructor() {
    this.currentUtterance = null;
    this.speechRate = 1.0; // 1.0 or 0.75
    this.audioCache = new Map();
  }

  /**
   * Speak phrase using optimal native voice
   * @param {string} text - Sentence or word
   * @param {string} lang - 'zh' or 'en'
   * @param {number} rate - 1.0 (default) or 0.75 (turtle slow)
   * @param {Function} onEnd - Optional callback
   */
  speak(text, lang = 'zh', rate = null, onEnd = null) {
    if (!text) return;
    const targetRate = typeof rate === 'number' ? rate : this.speechRate;
    tts.speak(text, lang, targetRate, onEnd);
  }

  /**
   * Speak slowly (Turtle mode for listening exercises)
   */
  speakSlow(text, lang = 'zh', onEnd = null) {
    this.speak(text, lang, 0.75, onEnd);
  }

  /**
   * Stop any current audio or speech synthesis immediately
   */
  stop() {
    tts.cancel();
  }

  /**
   * Play sound effect from sound engine
   */
  playCorrect() {
    sounds.playCorrect?.();
  }

  playWrong() {
    sounds.playWrong?.();
  }

  playTap() {
    sounds.playTap?.();
  }

  playFanfare() {
    sounds.playFanfare?.();
  }

  playLevelUp() {
    sounds.playLevelUp?.();
  }

  /**
   * Preload / prefetch next question audio text into cache (warmup)
   */
  preloadNext(text, lang = 'zh') {
    if (!text || typeof window === 'undefined') return;
    // Pre-cache key for immediate reference
    const key = `${lang}_${text.trim()}`;
    if (!this.audioCache.has(key)) {
      this.audioCache.set(key, true);
    }
  }
}

export const audioManager = new AudioManager();
export default audioManager;
