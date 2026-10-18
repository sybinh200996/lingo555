/**
 * proSpeechRecognizer.js
 * Professional Speech Recognition Engine with:
 * 1. Web Audio API noise cancellation & real-time volume meter (Waveform).
 * 2. Continuous recognition + live interim captions (No premature cutoff).
 * 3. Multi-alternative candidate evaluation (top 5 alternatives checked).
 * 4. Chinese & English Number-to-Words normalization.
 * 5. Pinyin & Homophone resilience (Passes >= 75% similarity).
 * 6. Word-by-word / character-by-character color-coded diff (Green, Yellow, Red).
 */

// Number to words dictionaries
const ZH_NUMBERS = {
  '0': '零', '1': '一', '2': '二', '3': '三', '4': '四',
  '5': '五', '6': '六', '7': '七', '8': '八', '9': '九',
  '10': '十', '100': '百', '1000': '千'
};

const EN_NUMBERS = {
  '0': 'zero', '1': 'one', '2': 'two', '3': 'three', '4': 'four',
  '5': 'five', '6': 'six', '7': 'seven', '8': 'eight', '9': 'nine',
  '10': 'ten', '11': 'eleven', '12': 'twelve', '13': 'thirteen',
  '14': 'fourteen', '15': 'fifteen', '16': 'sixteen', '17': 'seventeen',
  '18': 'eighteen', '19': 'nineteen', '20': 'twenty', '30': 'thirty',
  '40': 'forty', '50': 'fifty', '60': 'sixty', '70': 'seventy',
  '80': 'eighty', '90': 'ninety', '100': 'hundred'
};

// Common Chinese Homophones that ASR often confuses
const ZH_HOMOPHONE_EQUIVS = [
  ['的', '得', '地'],
  ['他', '她', '它'],
  ['在', '再'],
  ['做', '作', '坐', '座'],
  ['进', '近'],
  ['完', '玩'],
  ['没', '每'],
  ['需', '须'],
  ['题', '提'],
  ['意', '易', '义'],
  ['已', '以'],
  ['生', '声'],
  ['公', '工', '功'],
  ['同', '童'],
  ['期', '其', '奇'],
  ['二', '两']
];

export const normalizeNumbers = (str, lang = 'zh') => {
  if (!str) return '';
  let res = str;
  if (lang === 'zh') {
    res = res.replace(/\d+/g, (match) => {
      if (ZH_NUMBERS[match]) return ZH_NUMBERS[match];
      return match.split('').map(d => ZH_NUMBERS[d] || d).join('');
    });
  } else {
    res = res.replace(/\b\d+\b/g, (match) => {
      return EN_NUMBERS[match] || match;
    });
  }
  return res;
};

export const cleanPunctuation = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()？。，！、；：“”‘’（）《》【】]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

export const stripTones = (str) => {
  return (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ü/g, 'v');
};

/**
 * Levenshtein Distance calculation
 */
export const calcLevenshtein = (a, b) => {
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
};

export const calcSimilarity = (a, b) => {
  if (!a && !b) return 1.0;
  if (!a || !b) return 0.0;
  const s1 = cleanPunctuation(a);
  const s2 = cleanPunctuation(b);
  if (s1 === s2) return 1.0;
  const dist = calcLevenshtein(s1, s2);
  const maxLen = Math.max(s1.length, s2.length);
  if (maxLen === 0) return 1.0;
  return Math.max(0, 1 - (dist / maxLen));
};

/**
 * Check if two Chinese characters are considered equivalent homophones
 */
export const areHomophones = (charA, charB) => {
  if (charA === charB) return true;
  for (const group of ZH_HOMOPHONE_EQUIVS) {
    if (group.includes(charA) && group.includes(charB)) {
      return true;
    }
  }
  return false;
};

/**
 * Detailed character/word diff generator
 */
export const evaluateWordDiff = (spokenText, targetText, lang = 'zh', bestAlternative = '') => {
  const isZh = lang === 'zh';
  const cleanSpoken = cleanPunctuation(normalizeNumbers(spokenText, lang));
  const cleanTarget = cleanPunctuation(normalizeNumbers(targetText, lang));
  const cleanAlt = cleanPunctuation(normalizeNumbers(bestAlternative, lang));

  const targetTokens = isZh ? cleanTarget.split('') : cleanTarget.split(/\s+/).filter(Boolean);
  const spokenTokens = isZh ? cleanSpoken.split('') : cleanSpoken.split(/\s+/).filter(Boolean);
  const altTokens = isZh ? cleanAlt.split('') : cleanAlt.split(/\s+/).filter(Boolean);

  let correctCount = 0;
  let nearCount = 0;

  const words = targetTokens.map((token, idx) => {
    // 1. Direct match at same index or exists in spoken tokens
    const exactMatch = spokenTokens[idx] === token || spokenTokens.includes(token) || altTokens.includes(token);
    if (exactMatch) {
      correctCount++;
      return {
        word: token,
        status: 'correct',
        score: 100,
        note: 'Phát âm chuẩn xác 100%'
      };
    }

    // 2. Homophone match for Chinese
    if (isZh) {
      const homophoneMatch = spokenTokens.some(s => areHomophones(s, token)) || altTokens.some(a => areHomophones(a, token));
      if (homophoneMatch) {
        correctCount++;
        return {
          word: token,
          status: 'correct',
          score: 95,
          note: 'Đồng âm chuẩn xác (Đạt)'
        };
      }
    }

    // 3. Near match (Levenshtein similarity >= 0.6)
    const tokenSim = spokenTokens.length > 0
      ? Math.max(...spokenTokens.map(s => calcSimilarity(s, token)))
      : 0;

    if (tokenSim >= 0.6) {
      nearCount++;
      return {
        word: token,
        status: 'near',
        score: Math.round(tokenSim * 100),
        note: 'Phát âm gần đúng (lệch nhẹ thanh điệu/âm cuối)'
      };
    }

    // 4. Missed or Incorrect
    return {
      word: token,
      status: 'incorrect',
      score: 0,
      note: 'Chưa phát hiện âm chuẩn (Bấm để nghe âm mẫu)'
    };
  });

  const total = targetTokens.length || 1;
  const rawScore = Math.round(((correctCount * 1.0) + (nearCount * 0.75)) / total * 100);
  const overallSimilarity = Math.max(
    calcSimilarity(cleanSpoken, cleanTarget),
    calcSimilarity(cleanAlt, cleanTarget)
  );

  const finalScore = Math.max(rawScore, Math.round(overallSimilarity * 100));
  const isPass = finalScore >= 75;

  return {
    score: Math.min(100, Math.max(0, finalScore)),
    isPass,
    spoken: spokenText || '(Không nghe thấy âm thanh)',
    target: targetText,
    words,
    diagnostics: isPass
      ? ['Phát âm tốt, đạt yêu cầu bài học.']
      : ['Một số từ chưa rõ âm tiết. Bấm vào từ màu Đỏ để nghe lại và luyện phát âm.']
  };
};

/**
 * ProSpeechRecognizer Class
 * Manages Web Audio API microphone stream, volume analysis, and SpeechRecognition
 */
export class ProSpeechRecognizer {
  constructor() {
    this.recognition = null;
    this.mediaStream = null;
    this.audioContext = null;
    this.analyser = null;
    this.volumeInterval = null;
    this.silenceTimer = null;
    this.isListening = false;
    this.hasSpoken = false;
    this.manualStop = false;
    this.accumulatedTranscript = '';
    this.interimTranscript = '';
    this.capturedAlternatives = [];
    this.currentCallbacks = null;
    this.lang = 'zh';
  }

  isSupported() {
    return typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
  }

  /**
   * Initialize noise-suppressed microphone stream and volume meter
   */
  async startAudioStream(onVolumeChange) {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        this.mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
          }
        });

        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.audioContext = new AudioCtx();
          if (this.audioContext.state === 'suspended') {
            await this.audioContext.resume();
          }
          const source = this.audioContext.createMediaStreamSource(this.mediaStream);
          this.analyser = this.audioContext.createAnalyser();
          this.analyser.fftSize = 256;
          source.connect(this.analyser);

          const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
          this.volumeInterval = setInterval(() => {
            if (!this.analyser) return;
            this.analyser.getByteFrequencyData(dataArray);
            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) {
              sum += dataArray[i];
            }
            const average = sum / dataArray.length;
            const normalizedVol = Math.min(100, Math.round((average / 128) * 100));
            if (onVolumeChange) onVolumeChange(normalizedVol);
          }, 80);
        }
      }
    } catch (e) {
      console.warn('Microphone stream setup warning (continuing with ASR only):', e.message);
    }
  }

  stopAudioStream() {
    if (this.volumeInterval) {
      clearInterval(this.volumeInterval);
      this.volumeInterval = null;
    }
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
    }
    if (this.audioContext) {
      try {
        this.audioContext.close();
      } catch (_) {}
      this.audioContext = null;
    }
    this.analyser = null;
  }

  /**
   * Reset the 2.5s silence timer once user has started speaking
   */
  resetSilenceTimer(silenceTimeout = 2500) {
    if (this.silenceTimer) {
      clearTimeout(this.silenceTimer);
      this.silenceTimer = null;
    }
    if (!this.isListening || this.manualStop) return;

    if (this.hasSpoken) {
      this.silenceTimer = setTimeout(() => {
        if (this.isListening && !this.manualStop) {
          this.finish();
        }
      }, silenceTimeout);
    }
  }

  /**
   * Start listening
   */
  async start({
    lang = 'zh',
    targetText = '',
    onInterim,
    onResult,
    onError,
    onEnd,
    onVolumeChange,
    silenceTimeout = 2500,
    maxDuration = 25000
  }) {
    if (this.isListening) {
      this.stop();
    }

    if (!this.isSupported()) {
      if (onError) onError('Trình duyệt chưa hỗ trợ Web Speech API.');
      return;
    }

    this.lang = lang;
    this.manualStop = false;
    this.hasSpoken = false;
    this.accumulatedTranscript = '';
    this.interimTranscript = '';
    this.capturedAlternatives = [];
    this.currentCallbacks = { onInterim, onResult, onError, onEnd, targetText };

    // Start microphone with noise cancellation and volume meter
    await this.startAudioStream(onVolumeChange);

    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRec();
    this.recognition.lang = lang === 'zh' ? 'zh-CN' : 'en-US';
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.maxAlternatives = 5;

    this.isListening = true;

    // Safety max timeout
    this.maxTimer = setTimeout(() => {
      if (this.isListening && !this.manualStop) {
        this.finish();
      }
    }, maxDuration);

    this.recognition.onstart = () => {
      this.isListening = true;
    };

    this.recognition.onresult = (event) => {
      let currentInterim = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const res = event.results[i];
        const topAlternative = res[0];
        const text = topAlternative?.transcript || '';

        // Collect top 5 alternatives
        for (let a = 0; a < res.length; a++) {
          const altText = res[a]?.transcript;
          if (altText && !this.capturedAlternatives.includes(altText)) {
            this.capturedAlternatives.push(altText);
          }
        }

        if (res.isFinal) {
          if (text.trim()) {
            this.accumulatedTranscript += (this.accumulatedTranscript ? ' ' : '') + text.trim();
          }
        } else {
          currentInterim += (currentInterim ? ' ' : '') + text.trim();
        }
      }

      this.interimTranscript = currentInterim;
      const liveCaption = ((this.accumulatedTranscript || '') + ' ' + (currentInterim || '')).trim();

      if (liveCaption) {
        this.hasSpoken = true;
        if (onInterim) {
          onInterim(liveCaption);
        }
        // User spoke: give 2.5 seconds of silence before finishing
        this.resetSilenceTimer(silenceTimeout);
      }
    };

    this.recognition.onerror = (event) => {
      console.warn('Speech recognition warning:', event.error);
      if (event.error === 'no-speech') {
        // Don't kill if user hasn't uttered anything yet
        return;
      }
      if (event.error === 'not-allowed' || event.error === 'permission-denied') {
        this.isListening = false;
        if (onError) onError(event.error);
        this.finish();
        return;
      }
      if (event.error === 'audio-capture') {
        this.isListening = false;
        if (onError) onError(event.error);
        this.finish();
        return;
      }
    };

    this.recognition.onend = () => {
      if (this.isListening && !this.manualStop) {
        // Auto-restart if browser prematurely ended connection
        try {
          this.recognition.start();
          return;
        } catch (_) {
          this.finish();
        }
      } else {
        this.finish();
      }
    };

    try {
      this.recognition.start();
    } catch (e) {
      this.isListening = false;
      if (onError) onError(e.message);
    }
  }

  finish() {
    if (!this.isListening) return;
    this.isListening = false;
    this.manualStop = true;

    if (this.silenceTimer) clearTimeout(this.silenceTimer);
    if (this.maxTimer) clearTimeout(this.maxTimer);
    this.stopAudioStream();

    if (this.recognition) {
      try {
        this.recognition.onstart = null;
        this.recognition.onresult = null;
        this.recognition.onerror = null;
        this.recognition.onend = null;
        this.recognition.stop();
      } catch (_) {}
    }

    const fullTranscript = ((this.accumulatedTranscript || '') + ' ' + (this.interimTranscript || '')).trim();
    const allAlts = Array.from(new Set([
      fullTranscript,
      this.accumulatedTranscript.trim(),
      ...this.capturedAlternatives
    ])).filter(Boolean);

    const cbs = this.currentCallbacks;
    this.currentCallbacks = null;

    if (cbs) {
      if (fullTranscript) {
        // Find best alternative matching targetText
        let bestAlt = fullTranscript;
        let maxSim = -1;
        for (const alt of allAlts) {
          const sim = calcSimilarity(alt, cbs.targetText || '');
          if (sim > maxSim) {
            maxSim = sim;
            bestAlt = alt;
          }
        }

        const evaluation = evaluateWordDiff(fullTranscript, cbs.targetText || '', this.lang, bestAlt);

        if (cbs.onResult) {
          cbs.onResult(fullTranscript, evaluation, allAlts);
        }
      } else {
        if (cbs.onError) cbs.onError('no-speech');
      }
      if (cbs.onEnd) cbs.onEnd();
    }
  }

  evaluatePronunciation(spokenText, targetText, lang = 'zh', bestAlt = '') {
    return evaluateWordDiff(spokenText, targetText, lang, bestAlt);
  }

  stopListening() {
    this.stop();
  }

  stop() {
    this.manualStop = true;
    this.finish();
  }
}

export const proSpeech = new ProSpeechRecognizer();
export default proSpeech;
