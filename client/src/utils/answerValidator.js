// Multi-tier Smart Answer Validator for Lingo555
// Features: Unicode NFC Normalization, English Contraction Expansion, Pinyin/Hanzi Normalization,
// Damerau-Levenshtein Distance (transposition, insertion, deletion, substitution),
// Typo Tolerance, Multi-Answer Synonyms Matching, Word-Level Difference Highlighting.

const ENGLISH_CONTRACTIONS = {
  "i'm": "i am",
  "im": "i am",
  "you're": "you are",
  "youre": "you are",
  "he's": "he is",
  "hes": "he is",
  "she's": "she is",
  "shes": "she is",
  "it's": "it is",
  "its": "it is",
  "we're": "we are",
  "they're": "they are",
  "theyre": "they are",
  "can't": "cannot",
  "cant": "cannot",
  "cannot": "cannot",
  "don't": "do not",
  "dont": "do not",
  "doesn't": "does not",
  "doesnt": "does not",
  "didn't": "did not",
  "didnt": "did not",
  "won't": "will not",
  "wont": "will not",
  "wouldn't": "would not",
  "wouldnt": "would not",
  "isn't": "is not",
  "isnt": "is not",
  "aren't": "are not",
  "arent": "are not",
  "wasn't": "was not",
  "wasnt": "was not",
  "weren't": "were not",
  "werent": "were not",
  "haven't": "have not",
  "havent": "have not",
  "hasn't": "has not",
  "hasnt": "has not",
  "hadn't": "had not",
  "hadnt": "had not",
  "there's": "there is",
  "theres": "there is",
  "that's": "that is",
  "thats": "that is",
  "what's": "what is",
  "whats": "what is",
  "let's": "let us",
  "lets": "let us"
};

/**
 * Compute Optimal String Alignment / Damerau-Levenshtein distance (supports transpositions)
 */
export function getDamerauLevenshteinDistance(a, b) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const al = a.length;
  const bl = b.length;
  const matrix = Array.from({ length: al + 1 }, () => new Array(bl + 1).fill(0));

  for (let i = 0; i <= al; i++) matrix[i][0] = i;
  for (let j = 0; j <= bl; j++) matrix[0][j] = j;

  for (let i = 1; i <= al; i++) {
    for (let j = 1; j <= bl; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,       // deletion
        matrix[i][j - 1] + 1,       // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );

      // Transposition check (e.g. "hosptial" -> "hospital")
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        matrix[i][j] = Math.min(matrix[i][j], matrix[i - 2][j - 2] + 1);
      }
    }
  }

  return matrix[al][bl];
}

/**
 * Standardize text: Unicode NFC, normalize quotes, lowercase, expand contractions, clean punctuation
 */
export function normalizeSentence(str = '', lang = 'en') {
  if (!str || typeof str !== 'string') return '';

  // 1. Unicode NFC normalization (essential for Vietnamese & multi-byte characters)
  let text = str.normalize('NFC').trim();

  // 2. Normalize smart quotes and apostrophes
  text = text.replace(/[\u2018\u2019\u201A\u201B\u2032\u2035]/g, "'");
  text = text.replace(/[\u201C\u201D\u201E\u201F\u2033\u2036]/g, '"');

  // 3. Lowercase
  text = text.toLowerCase();

  // 4. Remove sentence-ending and common punctuation
  text = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()？。，！、；：“”‘’（）《》【】\?]/g, ' ');

  // 5. Expand English contractions if applicable
  if (lang === 'en' || !lang) {
    const tokens = text.split(/\s+/).filter(Boolean);
    const expanded = tokens.map(t => ENGLISH_CONTRACTIONS[t] || t);
    text = expanded.join(' ');
  }

  // 6. Collapse multiple spaces
  return text.replace(/\s+/g, ' ').trim();
}

/**
 * Normalize Chinese text: strips punctuation, spaces, and handles basic characters
 */
export function normalizeChinese(str = '') {
  if (!str || typeof str !== 'string') return '';
  return str
    .normalize('NFC')
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()？。，！、；：“”‘’（）《》【】\s]/g, '')
    .trim();
}

/**
 * Compare two words or sentences with Typo Tolerance
 */
export function compareWithTypoTolerance(inputNorm, targetNorm) {
  if (inputNorm === targetNorm) {
    return { isMatch: true, isTypo: false, distance: 0, similarity: 1.0 };
  }

  const distance = getDamerauLevenshteinDistance(inputNorm, targetNorm);
  const maxLen = Math.max(inputNorm.length, targetNorm.length);
  const similarity = maxLen > 0 ? (maxLen - distance) / maxLen : 1.0;

  // Typo tolerance criteria:
  // - Single character typo/transposition:
  //   * If length >= 4 and distance === 1 -> TYPO (e.g. "teh" -> "the", "helo" -> "hello")
  //   * If length >= 7 and distance <= 2 -> TYPO (e.g. "hosptial" -> "hospital", "recive" -> "receive")
  //   * Or overall sentence similarity >= 85% with distance <= 3
  const isTypo = (maxLen >= 4 && distance === 1) || 
                 (maxLen >= 7 && distance <= 2) || 
                 (similarity >= 0.85 && distance <= 3);

  return {
    isMatch: isTypo,
    isTypo,
    distance,
    similarity
  };
}

/**
 * Highlight word-level differences between user input and target sentence
 */
export function getWordLevelDiff(userInput, targetAnswer) {
  const userWords = (userInput || '').trim().split(/\s+/);
  const targetWords = (targetAnswer || '').trim().split(/\s+/);

  const diff = [];
  const maxLen = Math.max(userWords.length, targetWords.length);

  for (let i = 0; i < maxLen; i++) {
    const u = userWords[i] || '';
    const t = targetWords[i] || '';
    const uNorm = normalizeSentence(u);
    const tNorm = normalizeSentence(t);

    if (uNorm === tNorm) {
      diff.push({ word: t || u, status: 'correct' });
    } else {
      diff.push({ 
        word: u || '(thiếu)', 
        expected: t || '', 
        status: 'wrong' 
      });
    }
  }

  return diff;
}

/**
 * Primary Smart Answer Validation Engine
 */
export function validateAnswer(userInput, exercise, lang = 'zh') {
  if (!userInput && userInput !== 0) {
    return {
      status: 'WRONG',
      isCorrect: false,
      feedback: 'Bạn chưa nhập câu trả lời.',
      matchedAnswer: exercise?.correct_answer || '',
      diff: []
    };
  }

  const rawInput = String(userInput).trim();
  const primaryAnswer = String(exercise?.correct_answer || '').trim();

  // Extract all accepted answers
  const acceptedList = [primaryAnswer];
  if (Array.isArray(exercise?.acceptedAnswers)) {
    acceptedList.push(...exercise.acceptedAnswers);
  }
  if (typeof exercise?.accepted_answers_json === 'string') {
    try {
      const parsed = JSON.parse(exercise.accepted_answers_json);
      if (Array.isArray(parsed)) acceptedList.push(...parsed);
    } catch (e) {}
  }

  const isZh = lang === 'zh' || lang.startsWith('zh');

  // Normalize user input
  const inputNorm = isZh ? normalizeChinese(rawInput) : normalizeSentence(rawInput, 'en');

  let bestMatch = null;
  let minDistance = Infinity;

  // 1. Check exact matches first across all accepted candidates
  for (const candidate of acceptedList) {
    const candNorm = isZh ? normalizeChinese(candidate) : normalizeSentence(candidate, 'en');
    if (inputNorm === candNorm) {
      return {
        status: 'EXACT_MATCH',
        isCorrect: true,
        feedback: 'Chính xác hoàn toàn!',
        matchedAnswer: candidate,
        diff: []
      };
    }

    const dist = getDamerauLevenshteinDistance(inputNorm, candNorm);
    if (dist < minDistance) {
      minDistance = dist;
      bestMatch = candidate;
    }
  }

  // 2. Check typo tolerance against best candidate
  if (bestMatch) {
    const candNorm = isZh ? normalizeChinese(bestMatch) : normalizeSentence(bestMatch, 'en');
    const { isTypo, distance, similarity } = compareWithTypoTolerance(inputNorm, candNorm);

    if (isTypo) {
      return {
        status: 'TYPO_MATCH',
        isCorrect: true, // Passes question, no hearts deducted!
        feedback: `Rất tốt! Chú ý lỗi chính tả: "${bestMatch}"`,
        matchedAnswer: bestMatch,
        distance,
        similarity,
        diff: getWordLevelDiff(rawInput, bestMatch)
      };
    }
  }

  // 3. Not matched
  return {
    status: 'WRONG',
    isCorrect: false,
    feedback: `Chưa chính xác. Đáp án chuẩn là: "${primaryAnswer}"`,
    matchedAnswer: primaryAnswer,
    distance: minDistance,
    diff: getWordLevelDiff(rawInput, primaryAnswer)
  };
}
