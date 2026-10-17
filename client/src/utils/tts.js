// Text-to-Speech (TTS) Engine for Lingo555
// Standardized speech synthesis with onvoiceschanged listener,
// priority accent selection (zh-CN & en-US/en-GB), instant cancellation, and speed rates (1.0x / 0.7x).

class TTSManager {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.voices = [];
    this.isLoaded = false;
    this.init();
  }

  init() {
    if (!this.synth) return;

    const loadVoices = () => {
      try {
        const available = this.synth.getVoices();
        if (available && available.length > 0) {
          this.voices = available;
          this.isLoaded = true;
        }
      } catch (e) {
        console.warn('TTS voice loading warning:', e);
      }
    };

    // Load initial voices immediately
    loadVoices();

    // Listen for asynchronous voice list population in modern browsers (Chrome, Safari, Edge)
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        loadVoices();
      };
      // Backup poll for mobile WebKit
      setTimeout(loadVoices, 300);
      setTimeout(loadVoices, 1000);
    }
  }

  /**
   * Find the optimal natural native voice for Chinese or English
   * @param {string} lang - 'zh' or 'en'
   */
  getBestVoice(lang = 'zh') {
    if (!this.synth) return null;
    if (this.voices.length === 0) {
      this.voices = this.synth.getVoices() || [];
    }

    const isZh = lang === 'zh' || lang.startsWith('zh');

    if (isZh) {
      // 1. Exact zh-CN match
      const zhCN = this.voices.find(v => v.lang === 'zh-CN' || v.lang === 'zh_CN');
      if (zhCN) return zhCN;

      // 2. High quality Chinese Mainland voices (Google, Microsoft, Apple)
      const zhMainland = this.voices.find(v => {
        const name = (v.name || '').toLowerCase();
        const l = (v.lang || '').toLowerCase();
        return (l.includes('zh') && l.includes('cn')) ||
               name.includes('xiaoxiao') ||
               name.includes('yunxi') ||
               name.includes('ting-ting') ||
               name.includes('putonghua') ||
               name.includes('mandarin');
      });
      if (zhMainland) return zhMainland;

      // 3. Fallback to any Chinese dialect
      const anyZh = this.voices.find(v => (v.lang || '').toLowerCase().startsWith('zh'));
      if (anyZh) return anyZh;
    } else {
      // 1. Exact en-US match
      const enUS = this.voices.find(v => v.lang === 'en-US' || v.lang === 'en_US');
      if (enUS) return enUS;

      // 2. Natural US / American voices
      const usPreferred = this.voices.find(v => {
        const name = (v.name || '').toLowerCase();
        const l = (v.lang || '').toLowerCase();
        return (l.includes('en') && l.includes('us')) ||
               name.includes('samantha') ||
               name.includes('jenny') ||
               name.includes('guy') ||
               name.includes('natural');
      });
      if (usPreferred) return usPreferred;

      // 3. British English fallback (en-GB)
      const enGB = this.voices.find(v => v.lang === 'en-GB' || v.lang === 'en_GB');
      if (enGB) return enGB;

      // 4. Any English dialect
      const anyEn = this.voices.find(v => (v.lang || '').toLowerCase().startsWith('en'));
      if (anyEn) return anyEn;
    }

    return null;
  }

  /**
   * Speak text in target language with rate control
   * @param {string} text - The sentence or word to pronounce
   * @param {string} lang - 'zh' or 'en'
   * @param {number} rate - 1.0 (Normal) or 0.7 (Slow Turtle)
   * @param {Function} onEnd - Optional callback on completion
   */
  speak(text, lang = 'zh', rate = 1.0, onEnd = null) {
    if (!this.synth || !text) return;

    // Strict rule: Always cancel ongoing speech to avoid overlapping audio
    try {
      this.synth.cancel();
      if (this.synth.paused) {
        this.synth.resume();
      }
    } catch (e) {
      // ignore
    }

    const cleanText = text.toString().trim();
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = (lang === 'zh' || lang.startsWith('zh')) ? 'zh-CN' : 'en-US';
    
    // Support standard normal (1.0) and turtle slow (0.7)
    utterance.rate = Math.max(0.5, Math.min(2.0, typeof rate === 'number' ? rate : 1.0));
    utterance.pitch = 1.0;

    const voice = this.getBestVoice(lang);
    if (voice) {
      utterance.voice = voice;
    }

    if (onEnd) {
      utterance.onend = () => onEnd(null);
      utterance.onerror = (err) => onEnd(err);
    }

    try {
      this.synth.speak(utterance);
    } catch (e) {
      console.warn('TTS speech execution error:', e);
    }
  }

  /**
   * Stop any current speech playback immediately
   */
  cancel() {
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (e) {
        // ignore
      }
    }
  }

  stop() {
    this.cancel();
  }
}

export const tts = new TTSManager();
