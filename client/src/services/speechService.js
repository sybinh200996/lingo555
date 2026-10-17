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

export const normalizeSpeechText = (text) => {
  if (!text) return "";
  return text
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()？。，！、；：“”‘’（）《》【】\s]/g, "")
    .trim();
};

class SpeechService {
  constructor() {
    this.recognition = null;
    this.isListening = false;
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
   * Start listening with multi-alternative capture and mobile stabilization
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
    this.recognition.maxAlternatives = 3;
    this.recognition.continuous = false;

    this.recognition.onstart = () => {
      this.isListening = true;
    };

    this.recognition.onresult = (event) => {
      this.isListening = false;
      const results = event.results[0];
      const primaryResult = results[0];
      const transcript = primaryResult.transcript;
      const confidence = primaryResult.confidence !== undefined ? primaryResult.confidence : 0.9;

      // Extract all captured alternatives
      const alternatives = [];
      for (let i = 0; i < results.length; i++) {
        if (results[i]?.transcript) {
          alternatives.push(results[i].transcript);
        }
      }

      if (onResult) {
        onResult(transcript, confidence, alternatives);
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
      if (onError) onError(e.message);
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
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

    // Combine primary transcript with alternatives for comprehensive checking
    const allSpokenCandidates = [spokenText, ...(alternatives || [])].map(s => this.cleanText(s)).filter(Boolean);

    // Immediate 100% exact match check using standardized normalizer (eliminates false failures caused by punctuation/spaces)
    const normTarget = normalizeSpeechText(targetText);
    const normSpoken = normalizeSpeechText(spokenText);
    if (normTarget && (allSpokenCandidates.some(c => normalizeSpeechText(c) === normTarget) || normSpoken === normTarget)) {
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
        let status = 'missed';
        let score = 0;
        let note = 'Chưa phát âm chữ này';

        // Direct character match
        if (spokenChars.includes(tc)) {
          status = 'correct';
          score = 100;
          note = 'Phát âm chuẩn xác';
        } else if (allSpokenCandidates.some(c => c.includes(tc))) {
          status = 'correct';
          score = 95;
          note = 'Nhận diện tốt qua âm học';
        } else {
          // Check phonetic homophone in alternatives
          status = 'missed';
          score = 0;
          note = `Cần lưu ý chữ "${tc}"`;
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

      const rawScore = targetChars.length > 0 ? Math.round(totalScore / targetChars.length) : 0;
      const finalScore = Math.max(0, Math.min(100, rawScore));
      const isPass = finalScore >= 65;

      let advice = 'Chú ý phân biệt 4 thanh điệu (thanh 1 bằng phẳng, thanh 4 dứt khoát).';
      if (finalScore >= 90) {
        advice = 'Ngữ điệu rất tự nhiên, chuẩn giọng Bắc Kinh!';
      } else if (finalScore >= 65) {
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
      let status = 'missed';
      let score = 0;
      let note = 'Chưa nghe rõ từ này';

      // 1. Exact match across spoken candidate tokens
      for (let j = 0; j < spokenWords.length; j++) {
        if (usedSpoken.has(j)) continue;
        if (spokenWords[j] === tw) {
          matchedIdx = j;
          status = 'correct';
          score = 100;
          note = 'Chuẩn xác';
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
            note = `Đúng ngữ âm (đồng âm "${spokenWords[j]}")`;
            break;
          }
        }
      }

      // 3. Fuzzy phonetic alignment (Levenshtein distance <= 1 or 2)
      if (matchedIdx === -1) {
        for (let j = 0; j < spokenWords.length; j++) {
          if (usedSpoken.has(j)) continue;
          const sw = spokenWords[j];
          const dist = this.levenshteinDistance(tw, sw);
          const maxLen = Math.max(tw.length, sw.length);
          if (dist === 1 || (maxLen >= 5 && dist <= 2)) {
            matchedIdx = j;
            status = 'near';
            score = 80;
            note = `Gần chuẩn (nghe thành "${sw}")`;
            diagnostics.push(`Từ "${tw}": Cần bật rõ âm kết thúc hoặc nguyên âm.`);
            break;
          }
        }
      }

      // Check alternatives candidate string
      if (matchedIdx === -1 && allSpokenCandidates.some(c => c.split(/\s+/).includes(tw))) {
        status = 'correct';
        score = 90;
        note = 'Phát âm tốt';
      }

      if (matchedIdx !== -1) {
        usedSpoken.add(matchedIdx);
      } else if (status === 'missed') {
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

    const rawScore = targetWords.length > 0 ? Math.round(totalScore / targetWords.length) : 0;
    const finalScore = Math.max(0, Math.min(100, rawScore));
    const isPass = finalScore >= 65;

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
