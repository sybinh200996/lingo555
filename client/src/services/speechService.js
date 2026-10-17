import { tts } from '../utils/tts';

// Advanced Web Speech API Service with Deep Phonetic & Linguistic Diagnostics
// Supports Pinyin Sound Mapping, English Homophones, Sequence Alignment & Detailed Critique

const PINYIN_EQUIVALENTS = {
  b: ['波', '玻', '拨', '播', '伯', '薄', '博', 'b', 'bo', 'bō'],
  p: ['坡', '破', '颇', '婆', '魄', 'p', 'po', 'pō'],
  m: ['摸', '模', '磨', '默', '魔', 'm', 'mo', 'mō'],
  f: ['佛', '服', '发', '非', '飞', 'f', 'fo', 'fō'],
  d: ['得', '的', '德', '地', '第', 'd', 'de', 'dē'],
  t: ['特', '贴', '条', '太', 't', 'te', 'tè'],
  n: ['讷', '呢', '你', '那', '南', 'n', 'ne', 'nè'],
  l: ['勒', '了', '六', '乐', '来', 'l', 'le', 'lè'],
  g: ['哥', '各', '歌', '国', '高', 'g', 'ge', 'gē'],
  k: ['科', '可', '客', '看', '快', 'k', 'ke', 'kē'],
  h: ['喝', '和', '很', '好', '话', 'h', 'he', 'hē'],
  j: ['鸡', '几', '机', '家', '叫', 'j', 'ji', 'jī'],
  q: ['七', '期', '去', '前', '钱', 'q', 'qi', 'qī'],
  x: ['西', '喜', '下', '想', '写', 'x', 'xi', 'xī'],
  zh: ['知', '只', '中', '这', '住', 'zh', 'zhi', 'zhī'],
  ch: ['吃', '出', '车', '茶', '穿', 'ch', 'chi', 'chī'],
  sh: ['狮', '是', '水', '书', '少', 'sh', 'shi', 'shī'],
  r: ['日', '入', '人', '热', '让', 'r', 'ri', 'rì'],
  z: ['资', '字', '在', '早', '做', 'z', 'zi', 'zī'],
  c: ['次', '雌', '菜', '草', '从', 'c', 'ci', 'cī'],
  s: ['思', '四', '三', '色', '岁', 's', 'si', 'sī'],
  a: ['啊', '阿', 'a', 'ā', 'á', 'ǎ', 'à'],
  o: ['喔', '哦', 'o', 'ō', 'ó', 'ǒ', 'ò'],
  e: ['鹅', '呃', '额', 'e', 'ē', 'é', 'ě', 'è'],
  i: ['衣', '一', '依', 'i', 'yī', 'yí', 'yǐ', 'yì'],
  u: ['乌', '屋', '五', '物', 'u', 'wū', 'wú', 'wǔ', 'wù'],
  ü: ['迂', '鱼', '雨', '语', 'ü', 'v', 'yū', 'yú', 'yǔ', 'yù']
};

const EN_HOMOPHONES = {
  meet: ['meat', 'mete'],
  meat: ['meet', 'mete'],
  sea: ['see'],
  see: ['sea'],
  hear: ['here'],
  here: ['hear'],
  sun: ['son'],
  son: ['sun'],
  two: ['to', 'too'],
  to: ['two', 'too'],
  too: ['to', 'two'],
  for: ['four', 'fore'],
  four: ['for', 'fore'],
  right: ['write', 'rite'],
  write: ['right', 'rite'],
  there: ['their', "they're"],
  their: ['there', "they're"],
  no: ['know'],
  know: ['no'],
  by: ['buy', 'bye'],
  buy: ['by', 'bye'],
  bye: ['by', 'buy'],
  sheep: ['ship', 'cheap', 'sheet'],
  cat: ['ket', 'kat', 'cut'],
  hour: ['our'],
  our: ['hour'],
  flower: ['flour'],
  flour: ['flower'],
  night: ['knight'],
  knight: ['night'],
  peace: ['piece'],
  piece: ['peace'],
  sweet: ['suite'],
  suite: ['sweet'],
  wait: ['weight'],
  weight: ['wait'],
  weak: ['week'],
  week: ['weak'],
  won: ['one'],
  one: ['won']
};

const ZH_NUM_TO_CHAR = {
  '0': '零', '1': '一', '2': '二', '3': '三', '4': '四',
  '5': '五', '6': '六', '7': '七', '8': '八', '9': '九',
  '10': '十', '100': '一百'
};

const EN_NUM_TO_WORD = {
  '0': 'zero', '1': 'one', '2': 'two', '3': 'three', '4': 'four',
  '5': 'five', '6': 'six', '7': 'seven', '8': 'eight', '9': 'nine',
  '10': 'ten', '11': 'eleven', '12': 'twelve', '13': 'thirteen',
  '14': 'fourteen', '15': 'fifteen', '16': 'sixteen', '17': 'seventeen',
  '18': 'eighteen', '19': 'nineteen', '20': 'twenty', '30': 'thirty',
  '40': 'forty', '50': 'fifty', '60': 'sixty', '70': 'seventy',
  '80': 'eighty', '90': 'ninety', '100': 'one hundred',
  '1st': 'first', '2nd': 'second', '3rd': 'third', '4th': 'fourth', '5th': 'fifth'
};

/**
 * Bi-directional number-to-words normalizer.
 * Converts Arabic digits (1, 2, 3...) to Chinese characters (一, 二, 三...)
 * or English words (one, two, three...) to prevent false failures when
 * browser speech recognition outputs numbers instead of text.
 */
export const normalizeNumbersToWords = (text, lang = 'zh') => {
  if (!text) return '';
  let str = String(text);

  if (lang === 'zh') {
    // 1. Time & special number forms
    str = str.replace(/2点/g, '两点')
             .replace(/两/g, '二') // Unify 两 and 二 for matching
             .replace(/100/g, '一百')
             .replace(/10/g, '十');
    // 2. Individual digits 0-9
    str = str.replace(/[0-9]/g, (digit) => ZH_NUM_TO_CHAR[digit] || digit);
  } else {
    // 1. Ordinals (1st, 2nd, 3rd...)
    str = str.replace(/\b(1st|2nd|3rd|[0-9]+th)\b/gi, (m) => EN_NUM_TO_WORD[m.toLowerCase()] || m);
    // 2. Cardinal numbers 0-100
    str = str.replace(/\b([0-9]{1,3})\b/g, (m) => {
      if (EN_NUM_TO_WORD[m]) return EN_NUM_TO_WORD[m];
      const num = parseInt(m, 10);
      if (num > 20 && num < 100) {
        const tens = Math.floor(num / 10) * 10;
        const ones = num % 10;
        return `${EN_NUM_TO_WORD[tens] || ''} ${EN_NUM_TO_WORD[ones] || ''}`.trim();
      }
      return m;
    });
  }

  return str;
};

export const normalizeSpeechText = (text, lang = 'zh') => {
  if (!text) return "";
  const converted = normalizeNumbersToWords(text, lang);
  return converted
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()？。，！、；：“”‘’（）《》【】\s]/g, "")
    .trim();
};

class SpeechService {
  constructor() {
    this.recognition = null;
    this.isListening = false;
    this.manualStopRequested = false;
    this.accumulatedTranscript = '';
    this.interimTranscript = '';
    this.capturedAlternatives = [];
    this.lastConfidence = 0.9;
    this.silenceTimer = null;
    this.maxTimer = null;
    this.hasHeardSpeech = false;
    this.currentCallbacks = null;
    this.currentLang = 'zh';
  }

  /**
   * Standardized Speak text via tts utility with priority voice selection
   */
  speak(text, lang = 'zh', rate = 1.0, onEnd = null) {
    tts.speak(text, lang, rate, onEnd);
  }

  stopSpeaking() {
    tts.stop();
  }

  isRecognitionSupported() {
    return typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
  }

  /**
   * Reset the silence timeout timer.
   * If learner pauses speaking for more than silenceTimeoutMs (default 3.5s)
   * after having already spoken some words, automatically finalize and deliver results.
   */
  resetSilenceTimer(silenceTimeoutMs = 3500) {
    if (this.silenceTimer) {
      clearTimeout(this.silenceTimer);
      this.silenceTimer = null;
    }

    if (!this.isListening || this.manualStopRequested) return;

    // Only set auto-finish silence timer if user has actually uttered words
    if (this.hasHeardSpeech) {
      this.silenceTimer = setTimeout(() => {
        if (this.isListening && !this.manualStopRequested) {
          this.finishAndDeliver();
        }
      }, silenceTimeoutMs);
    }
  }

  /**
   * Finalize the listening session and deliver the collected transcripts
   */
  finishAndDeliver() {
    if (!this.isListening) return;
    this.isListening = false;
    this.manualStopRequested = true;

    if (this.silenceTimer) {
      clearTimeout(this.silenceTimer);
      this.silenceTimer = null;
    }
    if (this.maxTimer) {
      clearTimeout(this.maxTimer);
      this.maxTimer = null;
    }

    if (this.recognition) {
      try {
        this.recognition.onstart = null;
        this.recognition.onresult = null;
        this.recognition.onerror = null;
        this.recognition.onend = null;
        this.recognition.stop();
      } catch (e) {
        // Ignore stop error
      }
    }

    const fullTranscript = ((this.accumulatedTranscript || '') + ' ' + (this.interimTranscript || '')).trim();
    const finalAlternatives = Array.from(new Set([
      fullTranscript,
      this.accumulatedTranscript.trim(),
      ...this.capturedAlternatives
    ])).filter(Boolean);

    const cbs = this.currentCallbacks;
    this.currentCallbacks = null;

    if (cbs) {
      if (fullTranscript) {
        if (cbs.onResult) {
          cbs.onResult(fullTranscript, this.lastConfidence, finalAlternatives);
        }
      } else {
        // No speech detected at all
        if (cbs.onError) {
          cbs.onError('no-speech');
        }
      }
      if (cbs.onEnd) {
        cbs.onEnd();
      }
    }
  }

  /**
   * Start listening with continuous recognition, multi-phrase accumulation,
   * live interim preview, and smart pause tolerance (prevents 2-3s auto-cutoff).
   */
  startListening({ 
    lang = 'zh', 
    onResult, 
    onError, 
    onEnd, 
    onInterim,
    maxDuration = 20000,
    silenceTimeout = 3500 
  }) {
    // If an existing session is running, close it first
    if (this.isListening) {
      this.stopListening();
    }

    if (!this.isRecognitionSupported()) {
      if (onError) onError('Trình duyệt của bạn chưa hỗ trợ Web Speech Recognition. Hãy dùng Chrome hoặc Safari.');
      return;
    }

    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRec();
    this.currentLang = lang;
    this.recognition.lang = lang === 'zh' ? 'zh-CN' : 'en-US';
    // CRITICAL: continuous = true allows learner to speak full sentences without browser cutting off after 1.5s
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.maxAlternatives = 3;

    this.isListening = true;
    this.manualStopRequested = false;
    this.accumulatedTranscript = '';
    this.interimTranscript = '';
    this.capturedAlternatives = [];
    this.lastConfidence = 0.9;
    this.hasHeardSpeech = false;
    this.currentCallbacks = { onResult, onError, onEnd, onInterim };

    // Safety timeout: auto-finish if user forgets to stop (default 20 seconds)
    this.maxTimer = setTimeout(() => {
      if (this.isListening && !this.manualStopRequested) {
        this.finishAndDeliver();
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

        if (res.isFinal) {
          if (text.trim()) {
            this.accumulatedTranscript += (this.accumulatedTranscript ? ' ' : '') + text.trim();
          }
          // Collect alternatives
          for (let a = 0; a < res.length; a++) {
            if (res[a]?.transcript && !this.capturedAlternatives.includes(res[a].transcript)) {
              this.capturedAlternatives.push(res[a].transcript);
            }
          }
          if (topAlternative?.confidence !== undefined && topAlternative.confidence > 0) {
            this.lastConfidence = topAlternative.confidence;
          }
        } else {
          currentInterim += (currentInterim ? ' ' : '') + text.trim();
        }
      }

      this.interimTranscript = currentInterim;
      const combinedNow = ((this.accumulatedTranscript || '') + ' ' + (currentInterim || '')).trim();

      if (combinedNow) {
        this.hasHeardSpeech = true;
        if (onInterim) {
          onInterim(combinedNow);
        }
        // Learner spoke something! Give them 3.5s of silence before auto-finishing
        this.resetSilenceTimer(silenceTimeout);
      }
    };

    this.recognition.onerror = (event) => {
      console.warn('Speech recognition event error:', event.error);

      // Crucial: 'no-speech' is triggered by Chrome if user takes 2s to start reading.
      // Do NOT kill the session if we are still within listening window and user hasn't stopped!
      if (event.error === 'no-speech') {
        if (this.isListening && !this.manualStopRequested) {
          // If learner hasn't spoken yet, keep listening until max duration
          return;
        }
      }

      if (event.error === 'not-allowed' || event.error === 'permission-denied') {
        this.isListening = false;
        if (onError) onError(event.error);
        this.finishAndDeliver();
        return;
      }

      // For network or audio-capture errors
      if (event.error === 'audio-capture') {
        this.isListening = false;
        if (onError) onError(event.error);
        this.finishAndDeliver();
        return;
      }
    };

    this.recognition.onend = () => {
      // Chrome/Safari often auto-closes connection after a few seconds even with continuous=true.
      // If user is still in listening mode and hasn't manually stopped, auto-restart to continue capturing!
      if (this.isListening && !this.manualStopRequested) {
        try {
          this.recognition.start();
          return;
        } catch (e) {
          // If restart fails (e.g. mic permission closed), deliver whatever we got
          this.finishAndDeliver();
        }
      } else {
        this.finishAndDeliver();
      }
    };

    try {
      this.recognition.start();
    } catch (e) {
      console.warn('SpeechRecognition start error:', e);
      this.isListening = false;
      if (onError) onError(e.message);
    }
  }

  stopListening() {
    this.manualStopRequested = true;
    this.finishAndDeliver();
  }

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
   * Calculate normalized string similarity percentage (0.0 to 1.0)
   * based on Levenshtein distance
   */
  similarity(a, b) {
    if (!a && !b) return 1.0;
    if (!a || !b) return 0.0;
    const s1 = (a || '').toLowerCase().trim();
    const s2 = (b || '').toLowerCase().trim();
    if (s1 === s2) return 1.0;
    const dist = this.levenshteinDistance(s1, s2);
    const maxLen = Math.max(s1.length, s2.length);
    if (maxLen === 0) return 1.0;
    return Math.max(0, 1 - (dist / maxLen));
  }

  cleanText(str) {
    if (!str) return '';
    return str
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()？。，！、；：“”‘’（）《》【】]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  stripTones(str) {
    return (str || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/ü/g, 'v');
  }

  /**
   * Deep pronunciation diagnostic evaluation
   * @param {string} spokenText - Text captured by microphone
   * @param {string} targetText - Text expected
   * @param {string} lang - 'zh' or 'en'
   * @param {number} confidence - ASR confidence
   * @param {string} phoneticTarget - Pinyin or IPA
   * @param {Array} alternatives - Extra candidates returned by ASR
   */
  evaluatePronunciation(spokenText, targetText, lang = 'zh', confidence = 0.9, phoneticTarget = '', alternatives = []) {
    const cleanSpoken = this.cleanText(spokenText);
    const cleanTarget = this.cleanText(targetText);

    if (!cleanSpoken) {
      return {
        score: 0,
        isPass: false,
        words: (lang === 'zh' ? cleanTarget.split('') : cleanTarget.split(/\s+/)).map(w => ({
          word: w,
          status: 'missed',
          score: 0,
          note: 'Không có tín hiệu'
        })),
        spoken: '(Không nghe thấy âm thanh)',
        diagnostics: ['Microphone chưa thu được âm thanh. Hãy bấm giữ mic và nói to, rõ ràng hơn.'],
        critique: {
          category: 'Cường độ âm thanh',
          observation: 'Âm lượng quá nhỏ hoặc mic chưa được cấp quyền.',
          advice: 'Di chuyển gần Micro hơn và kiểm tra quyền truy cập microphone trên trình duyệt.'
        },
        feedback: 'Chưa nhận diện được giọng nói. Hãy nói to và gần Micro hơn!'
      };
    }

    // Combine primary transcript with alternatives and number-to-words variants for robust matching
    const baseCandidates = [spokenText, ...(alternatives || [])].filter(Boolean);
    const allSpokenCandidates = [];
    for (const c of baseCandidates) {
      const cleaned = this.cleanText(c);
      if (cleaned && !allSpokenCandidates.includes(cleaned)) {
        allSpokenCandidates.push(cleaned);
      }
      const withWords = this.cleanText(normalizeNumbersToWords(c, lang));
      if (withWords && !allSpokenCandidates.includes(withWords)) {
        allSpokenCandidates.push(withWords);
      }
    }

    // Immediate 100% exact match check using standardized normalizer (eliminates false failures caused by numbers, punctuation, spaces)
    const normTarget = normalizeSpeechText(targetText, lang);
    const normSpoken = normalizeSpeechText(spokenText, lang);
    if (normTarget && (allSpokenCandidates.some(c => normalizeSpeechText(c, lang) === normTarget) || normSpoken === normTarget)) {
      const isZh = lang === 'zh';
      const wordList = isZh ? targetText.split('') : targetText.split(/\s+/).filter(Boolean);
      return {
        score: 100,
        isPass: true,
        spoken: spokenText,
        target: targetText,
        words: wordList.map(w => ({
          word: w,
          status: 'correct',
          score: 100,
          note: 'Chuẩn xác 100%'
        })),
        diagnostics: ['Phát âm xuất sắc, toàn bộ câu/từ đều đạt chuẩn bản xứ.'],
        critique: {
          category: 'Độ chuẩn xác',
          observation: 'Phát âm rõ ràng, chuẩn ngữ âm và ngữ điệu.',
          advice: 'Tuyệt vời! Tiếp tục duy trì phong độ.'
        },
        feedback: 'Xuất sắc! Bạn phát âm hoàn toàn chính xác.'
      };
    }

    // ==========================================
    // 1. CHINESE (ZH) EVALUATION
    // ==========================================
    if (lang === 'zh') {
      const targetLower = cleanTarget.replace(/\s+/g, '');
      const phoneticClean = this.stripTones(phoneticTarget || '').replace(/\s+/g, '');

      // A. Special Pinyin Initial / Final single-character matching
      // (e.g. user practicing 'b', 'p', 'm', 'f', 'a', 'o', 'e')
      if (PINYIN_EQUIVALENTS[targetLower] || PINYIN_EQUIVALENTS[phoneticClean]) {
        const soundKey = PINYIN_EQUIVALENTS[targetLower] ? targetLower : phoneticClean;
        const validEquivalents = PINYIN_EQUIVALENTS[soundKey] || [];

        const isMatched = allSpokenCandidates.some(candidate => {
          return candidate === targetLower || 
                 validEquivalents.some(eq => candidate.includes(eq.toLowerCase()));
        });

        if (isMatched) {
          return {
            score: 100,
            isPass: true,
            spoken: spokenText,
            target: targetText,
            words: [{
              word: targetText,
              status: 'correct',
              score: 100,
              note: `Chuẩn xác âm "${phoneticTarget || targetText}"`
            }],
            diagnostics: [
              `Nhận diện thành công âm vị "${phoneticTarget || targetText}".`,
              `Khẩu hình và luồng hơi đạt chuẩn âm ngữ Pinyin.`
            ],
            critique: {
              category: 'Thanh mẫu / Vận mẫu Pinyin',
              observation: 'Phát âm tròn vành rõ chữ, đúng vị trí cấu âm bản xứ.',
              advice: 'Duy trì độ mở khẩu hình này cho các bài học tiếp theo.'
            },
            feedback: 'Xuất sắc! Phát âm chuẩn âm vị Pinyin.'
          };
        }
      }

      // B. Multi-character / Word Sentence Evaluation
      const targetChars = cleanTarget.replace(/\s+/g, '').split('');
      const spokenChars = cleanSpoken.replace(/\s+/g, '').split('');

      const tokens = [];
      let totalScore = 0;
      const diagnostics = [];

      for (let i = 0; i < targetChars.length; i++) {
        const tc = targetChars[i];
        let status = 'wrong';
        let score = 0;
        let note = 'Đọc sai / thiếu';

        // Direct character match
        if (spokenChars.includes(tc)) {
          status = 'correct';
          score = 100;
          note = 'Đúng 100%';
        } else if (allSpokenCandidates.some(c => c.includes(tc))) {
          status = 'correct';
          score = 95;
          note = 'Đúng 95%';
        } else {
          // Check phonetic homophone in alternatives
          status = 'wrong';
          score = 0;
          note = 'Đọc sai / thiếu';
          diagnostics.push(`Chữ "${tc}" chưa rõ âm hoặc sai thanh điệu.`);
        }

        tokens.push({
          word: tc,
          status,
          score,
          note
        });

        totalScore += score;
      }

      const tokenAvg = targetChars.length > 0 ? Math.round(totalScore / targetChars.length) : 0;
      const sentenceSim = Math.round(this.similarity(normTarget, normSpoken) * 100);
      const finalScore = Math.max(0, Math.min(100, Math.max(tokenAvg, sentenceSim)));
      const isPass = finalScore >= 60;

      let advice = 'Chú ý phân biệt 4 thanh điệu (thanh 1 bằng phẳng, thanh 4 dứt khoát).';
      if (finalScore >= 90) {
        advice = 'Ngữ điệu rất tự nhiên, chuẩn giọng Bắc Kinh!';
      } else if (finalScore >= 60) {
        advice = 'Đọc khá tốt! Hãy chú ý các âm màu đỏ để hoàn thiện hơn.';
      }

      return {
        score: finalScore,
        isPass,
        spoken: spokenText,
        target: targetText,
        words: tokens,
        diagnostics: diagnostics.length > 0 ? diagnostics : ['Các âm tiết đều được phát âm rõ ràng, không bị nuốt âm.'],
        critique: {
          category: 'Thanh điệu & Độ tròn vành Chữ Hán',
          observation: isPass ? 'Âm thanh tự nhiên, khẩu hình chuẩn.' : 'Một số âm tiết bị lệch thanh điệu hoặc nuốt âm.',
          advice
        },
        feedback: isPass 
          ? (finalScore >= 90 ? 'Xuất sắc! Phát âm chuẩn bản xứ.' : 'Đạt yêu cầu! Phát âm tương đối tốt.')
          : `Chưa đạt! Máy nghe được: "${spokenText}". Hãy luyện tập lại các từ màu đỏ.`
      };
    }

    // ==========================================
    // 2. ENGLISH (EN) EVALUATION
    // ==========================================
    const targetWords = cleanTarget.split(/\s+/).filter(Boolean);
    const spokenWords = cleanSpoken.split(/\s+/).filter(Boolean);

    const usedSpoken = new Set();
    const tokens = [];
    let totalScore = 0;
    const diagnostics = [];

    for (let i = 0; i < targetWords.length; i++) {
      const tw = targetWords[i];
      let matchedIdx = -1;
      let status = 'wrong';
      let score = 0;
      let note = 'Đọc sai / thiếu';

      // 1. Exact match across spoken candidate tokens
      for (let j = 0; j < spokenWords.length; j++) {
        if (usedSpoken.has(j)) continue;
        if (spokenWords[j] === tw) {
          matchedIdx = j;
          status = 'correct';
          score = 100;
          note = 'Đúng 100%';
          break;
        }
      }

      // 2. Homophone / Alternative match
      if (matchedIdx === -1 && EN_HOMOPHONES[tw]) {
        for (let j = 0; j < spokenWords.length; j++) {
          if (usedSpoken.has(j)) continue;
          if (EN_HOMOPHONES[tw].includes(spokenWords[j])) {
            matchedIdx = j;
            status = 'correct';
            score = 95;
            note = `Đồng âm 95% ("${spokenWords[j]}")`;
            break;
          }
        }
      }

      // 3. Levenshtein Distance & Similarity metric alignment
      if (matchedIdx === -1) {
        let bestSim = 0;
        let bestIdx = -1;
        for (let j = 0; j < spokenWords.length; j++) {
          if (usedSpoken.has(j)) continue;
          const sw = spokenWords[j];
          const sim = this.similarity(tw, sw);
          if (sim > bestSim) {
            bestSim = sim;
            bestIdx = j;
          }
        }

        if (bestIdx !== -1 && bestSim >= 0.6) {
          matchedIdx = bestIdx;
          const simPercent = Math.round(bestSim * 100);
          status = simPercent >= 80 ? 'correct' : 'near';
          score = simPercent;
          note = simPercent >= 80 ? `Đúng ${simPercent}%` : `Gần đúng ${simPercent}% ("${spokenWords[bestIdx]}")`;
          if (simPercent < 85) {
            diagnostics.push(`Từ "${tw}": Nghe thành "${spokenWords[bestIdx]}". Cần bật rõ âm đuôi.`);
          }
        }
      }

      // Check alternatives candidate string
      if (matchedIdx === -1 && allSpokenCandidates.some(c => c.split(/\s+/).includes(tw))) {
        status = 'correct';
        score = 90;
        note = 'Đúng 90%';
      }

      if (matchedIdx !== -1) {
        usedSpoken.add(matchedIdx);
      } else if (status === 'wrong') {
        diagnostics.push(`Bỏ sót hoặc chưa phát âm rõ từ "${tw}".`);
      }

      tokens.push({
        word: tw,
        status,
        score,
        note
      });

      totalScore += score;
    }

    const tokenAvg = targetWords.length > 0 ? Math.round(totalScore / targetWords.length) : 0;
    const sentenceSim = Math.round(this.similarity(normTarget, normSpoken) * 100);
    const finalScore = Math.max(0, Math.min(100, Math.max(tokenAvg, sentenceSim)));
    const isPass = finalScore >= 60;

    // Linguistic diagnostic advice
    let advice = 'Hãy chú ý bật rõ các phụ âm đuôi (ending sounds: /s/, /t/, /d/) và giữ độ dài nguyên âm.';
    if (finalScore >= 90) {
      advice = 'Phát âm trôi chảy, ngữ điệu tự nhiên chuẩn US/UK!';
    } else if (finalScore >= 65) {
      advice = 'Rất tốt! Cải thiện thêm các từ màu vàng để đạt 100% chuẩn bản xứ.';
    }

    return {
      score: finalScore,
      isPass,
      spoken: spokenText,
      target: targetText,
      words: tokens,
      diagnostics: diagnostics.length > 0 ? diagnostics : ['Các từ trong câu đều được nhận diện chính xác và tự nhiên.'],
      critique: {
        category: 'Ngữ âm Quốc tế & Phụ âm đuôi',
        observation: isPass ? 'Ngữ điệu tốt, phân tách từ mạch lạc.' : 'Chưa bật rõ âm đuôi hoặc bị nuốt nguyên âm.',
        advice
      },
      feedback: isPass
        ? (finalScore >= 90 ? 'Xuất sắc! Ngữ âm tự nhiên, chuẩn bản xứ.' : 'Đạt yêu cầu! Phát âm tương đối chuẩn.')
        : `Chưa đạt! Micro thu được: "${spokenText}". Hãy thử lại các từ màu đỏ.`
    };
  }
}

export const speech = new SpeechService();
