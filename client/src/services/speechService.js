// Web Speech API service for text-to-speech and speech recognition pronunciation evaluation

class SpeechService {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.recognition = null;
    this.isListening = false;
  }

  /**
   * Speak text in native accent
   * @param {string} text - text to speak
   * @param {string} lang - 'zh' or 'en'
   * @param {number} rate - 1.0 (normal) or 0.7 (turtle slow)
   */
  speak(text, lang = 'zh', rate = 1.0) {
    if (!this.synth) return;
    this.synth.cancel(); // Stop any ongoing speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'zh' ? 'zh-CN' : 'en-US';
    utterance.rate = rate;
    utterance.pitch = 1.0;

    // Try finding optimal native voice
    const voices = this.synth.getVoices();
    const targetLangCode = lang === 'zh' ? 'zh' : 'en';
    const preferredVoice = voices.find(v => v.lang.startsWith(targetLangCode));
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    this.synth.speak(utterance);
  }

  stopSpeaking() {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  /**
   * Check if speech recognition is supported in this browser
   */
  isRecognitionSupported() {
    return typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
  }

  /**
   * Start listening from microphone
   */
  startListening({ lang = 'zh', onResult, onError, onEnd }) {
    if (!this.isRecognitionSupported()) {
      if (onError) onError('Trình duyệt của bạn chưa hỗ trợ Web Speech Recognition. Hãy dùng Chrome hoặc Safari.');
      return;
    }

    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRec();
    this.recognition.lang = lang === 'zh' ? 'zh-CN' : 'en-US';
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;
    this.recognition.continuous = false;

    this.recognition.onstart = () => {
      this.isListening = true;
    };

    this.recognition.onresult = (event) => {
      const resultObj = event.results[0][0];
      const transcript = resultObj.transcript;
      const confidence = resultObj.confidence !== undefined ? resultObj.confidence : 0.9;
      if (onResult) {
        onResult(transcript, confidence);
      }
    };

    this.recognition.onerror = (event) => {
      this.isListening = false;
      if (onError) onError(event.error);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      if (onEnd) onEnd();
    };

    try {
      this.recognition.start();
    } catch (e) {
      console.warn('SpeechRecognition start error:', e);
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  /**
   * Levenshtein Distance Algorithm
   */
  levenshteinDistance(a, b) {
    const m = a.length;
    const n = b.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (a[i - 1] === b[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
        }
      }
    }
    return dp[m][n];
  }

  /**
   * Clean string by removing punctuation and extra whitespaces
   */
  cleanText(str) {
    return (str || '')
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()？!。，、]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Remove tonal marks from pinyin for phonetic fallback matching
   */
  stripTones(str) {
    return (str || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/ü/g, 'v');
  }

  /**
   * Strict pronunciation evaluation comparing exact positional alignment & Levenshtein distance
   * @param {string} spokenText - Text captured by microphone
   * @param {string} targetText - Text user was expected to say
   * @param {string} lang - 'zh' or 'en'
   * @param {number} confidence - ASR confidence (0.0 to 1.0)
   * @param {string} phoneticTarget - Optional Pinyin or IPA (e.g. 'nǐ hǎo' or '/ʃiːp/')
   */
  evaluatePronunciation(spokenText, targetText, lang = 'zh', confidence = 0.9, phoneticTarget = '') {
    const cleanSpoken = this.cleanText(spokenText);
    const cleanTarget = this.cleanText(targetText);

    if (!cleanSpoken) {
      return {
        score: 0,
        isPass: false,
        words: cleanTarget.split(lang === 'zh' ? '' : ' ').map(w => ({ word: w, correct: false })),
        spoken: '(Không nghe thấy âm thanh)',
        feedback: 'Không nhận diện được giọng nói. Hãy nói to và gần Micro hơn.'
      };
    }

    if (lang === 'zh') {
      // 1. Chinese character sequence comparison
      const targetChars = cleanTarget.replace(/\s+/g, '').split('');
      const spokenChars = cleanSpoken.replace(/\s+/g, '').split('');

      // Check character Levenshtein distance
      const maxCharLen = Math.max(targetChars.length, spokenChars.length);
      const charDist = this.levenshteinDistance(targetChars.join(''), spokenChars.join(''));
      let charSimilarity = maxCharLen > 0 ? (1 - charDist / maxCharLen) : 0;

      // Also compare against stripped pinyin if user spoke pinyin / romanized text
      let pinyinSimilarity = 0;
      if (phoneticTarget) {
        const cleanPhonetic = this.stripTones(this.cleanText(phoneticTarget)).replace(/\s+/g, '');
        const cleanSpokenAlpha = this.stripTones(cleanSpoken).replace(/[^a-z0-9]/g, '');
        if (cleanSpokenAlpha.length > 0 && cleanPhonetic.length > 0) {
          const pMax = Math.max(cleanPhonetic.length, cleanSpokenAlpha.length);
          const pDist = this.levenshteinDistance(cleanPhonetic, cleanSpokenAlpha);
          pinyinSimilarity = 1 - pDist / pMax;
        }
      }

      // Best similarity between direct Chinese characters or phonetic Pinyin
      const bestSimilarity = Math.max(charSimilarity, pinyinSimilarity);

      // Character-by-character alignment
      const words = targetChars.map((targetChar, index) => {
        // Must match exact index or adjacent index (sliding window of 1)
        const isExactIndex = spokenChars[index] === targetChar;
        const isAdjacent = (spokenChars[index - 1] === targetChar) || (spokenChars[index + 1] === targetChar);
        return {
          word: targetChar,
          correct: isExactIndex || (isAdjacent && bestSimilarity > 0.5)
        };
      });

      // Factor in ASR confidence
      let finalScore = Math.max(0, Math.min(100, Math.round(bestSimilarity * 100)));
      if (confidence < 0.65 && finalScore > 40) {
        finalScore = Math.round(finalScore * 0.85); // minor penalty for unclear/mumbled ASR
      }

      const isPass = finalScore >= 75; // Requires 75% accuracy to pass
      let feedback = 'Phát âm chưa chuẩn! Hãy phát âm to rõ từng thanh điệu.';
      if (finalScore >= 90) {
        feedback = 'Xuất sắc! Ngữ điệu và âm điệu chuẩn bản xứ Bắc Kinh.';
      } else if (finalScore >= 75) {
        feedback = 'Đạt yêu cầu! Phát âm tương đối chuẩn, chú ý các từ màu đỏ.';
      } else if (finalScore >= 40) {
        feedback = 'Còn nhiều lỗi âm tiết. Máy nghe được: "' + spokenText + '". Hãy thử lại!';
      }

      return {
        score: finalScore,
        isPass,
        words,
        spoken: spokenText,
        feedback
      };
    } else {
      // 2. English word sequence comparison
      const targetWords = cleanTarget.split(/\s+/).filter(Boolean);
      const spokenWords = cleanSpoken.split(/\s+/).filter(Boolean);

      const maxWordLen = Math.max(targetWords.length, spokenWords.length);
      const wordDist = this.levenshteinDistance(targetWords.join(' '), spokenWords.join(' '));
      const wordSimilarity = maxWordLen > 0 ? (1 - wordDist / Math.max(cleanTarget.length, cleanSpoken.length)) : 0;

      // Word-by-word alignment
      const words = targetWords.map((tw, idx) => {
        const sw = spokenWords[idx] || '';
        const isExact = sw === tw;
        const isClose = sw.length > 2 && (this.levenshteinDistance(sw, tw) <= 1);
        return {
          word: tw,
          correct: isExact || isClose
        };
      });

      let finalScore = Math.max(0, Math.min(100, Math.round(wordSimilarity * 100)));
      const isPass = finalScore >= 75;

      let feedback = 'Pronunciation needs work. Spoken: "' + spokenText + '". Try again!';
      if (finalScore >= 90) {
        feedback = 'Outstanding pronunciation! Clear native intonation.';
      } else if (finalScore >= 75) {
        feedback = 'Good job! Understandable with minor accent on red words.';
      }

      return {
        score: finalScore,
        isPass,
        words,
        spoken: spokenText,
        feedback
      };
    }
  }
}

export const speech = new SpeechService();
