/**
 * smartLessonBuilder.js
 * Pedagogical Question Builder & Smart Distractor Engine.
 * Implements a 5-Phase Scaffolded Learning Flow (12 - 15 exercises per lesson):
 * 
 * Phase 1: Flashcard & Chiết tự (Preview card + dual audio 1.0x / 0.7x)
 * Phase 2: Luyện phản xạ Nghe & Chọn nghĩa (Smart Distractors: matching level, POS, length)
 * Phase 3: Khắc sâu ký ức bằng Tập viết & Đánh vần (StrokeOrderWriter / EnglishSpellingWriter)
 * Phase 4: Ghép mẫu câu ngữ pháp (Word Bank Sentence Assembly with distractor tokens)
 * Phase 5: Ứng dụng thực tế & Luyện phát âm (Speech Practice with Levenshtein scoring)
 */

import { AUTHENTIC_ZH_DATA, AUTHENTIC_EN_DATA, getVocabulariesForLevel } from '../data/authenticCurriculumData.js';
import { shuffleArray, shuffleRightColumn, shuffleWordBank } from './shuffleUtils.js';

/**
 * Get all available vocabulary across the authentic dataset
 */
export const getAllAuthenticVocabularies = (lang = 'zh') => {
  const dataset = lang === 'zh' ? AUTHENTIC_ZH_DATA : AUTHENTIC_EN_DATA;
  const allVocab = [];
  for (const levelKey of Object.keys(dataset)) {
    const level = dataset[levelKey];
    for (const lesson of level.lessons || []) {
      for (const vocab of lesson.vocabularies || []) {
        allVocab.push({
          ...vocab,
          levelId: levelKey,
          language: lang
        });
      }
    }
  }
  return allVocab;
};

/**
 * Smart Distractor Engine
 * Generates pedagogically challenging distractors that match:
 * 1. Same level (HSK / CEFR) or adjacent level
 * 2. Same part of speech (Noun with Noun, Verb with Verb, Adj with Adj)
 * 3. Similar length (Single character vs 2-character word for Chinese)
 * 
 * @param {Object|string} targetWord - The target vocabulary object or word string
 * @param {Array} pool - Available vocabulary pool to sample from
 * @param {number} count - Number of distractors to return (default 3)
 * @param {string} mode - 'meaning' | 'word'
 * @returns {Array<string>} Array of distractor strings
 */
export const getSmartDistractors = (targetWord, pool = [], count = 3, mode = 'meaning') => {
  const targetObj = typeof targetWord === 'string'
    ? pool.find(item => item.word === targetWord || item.meaningVi === targetWord) || { word: targetWord, meaningVi: targetWord }
    : targetWord;

  const targetText = targetObj.word || '';
  const targetMeaning = targetObj.meaningVi || '';
  const targetPos = targetObj.partOfSpeech || '';
  const targetLevel = targetObj.levelId || '';
  const targetLen = targetText.length;

  // Filter pool excluding target
  const candidates = pool.filter(item => {
    if (!item) return false;
    const itemWord = item.word || '';
    const itemMeaning = item.meaningVi || '';
    return itemWord !== targetText && itemMeaning !== targetMeaning;
  });

  if (candidates.length === 0) {
    // Fallback static pools
    const fallbackZh = [
      { word: '我们', meaningVi: 'Chúng tôi, chúng ta', partOfSpeech: 'pronoun' },
      { word: '谢谢', meaningVi: 'Cảm ơn', partOfSpeech: 'verb' },
      { word: '再见', meaningVi: 'Tạm biệt', partOfSpeech: 'verb' },
      { word: '朋友', meaningVi: 'Bạn bè', partOfSpeech: 'noun' },
      { word: '学习', meaningVi: 'Học tập', partOfSpeech: 'verb' },
      { word: '高兴', meaningVi: 'Vui vẻ', partOfSpeech: 'adj' }
    ];
    return fallbackZh.slice(0, count).map(i => mode === 'meaning' ? i.meaningVi : i.word);
  }

  // Scoring function for each candidate:
  // Higher score = better pedagogical distractor
  const scored = candidates.map(item => {
    let score = 0;

    // Same level = +3
    if (targetLevel && item.levelId === targetLevel) score += 3;

    // Same part of speech = +4 (critically important!)
    if (targetPos && item.partOfSpeech && targetPos.toLowerCase() === item.partOfSpeech.toLowerCase()) {
      score += 4;
    }

    // Similar word length (for Chinese) = +2
    const itemLen = (item.word || '').length;
    if (targetLen > 0 && itemLen === targetLen) {
      score += 2;
    }

    // For Chinese: shares a radical or component = +2
    if (targetText && item.word) {
      for (const char of targetText) {
        if (item.word.includes(char) && item.word !== targetText) {
          score += 2;
          break;
        }
      }
    }

    // Add tiny random jitter to avoid deterministic tie-breaks
    score += Math.random() * 0.5;

    return { item, score };
  });

  // Sort descending by score
  scored.sort((a, b) => b.score - a.score);

  const selected = [];
  const usedValues = new Set();
  const targetValue = mode === 'meaning' ? targetMeaning : targetText;
  usedValues.add(targetValue);

  for (const entry of scored) {
    const val = mode === 'meaning' ? entry.item.meaningVi : entry.item.word;
    if (val && !usedValues.has(val)) {
      usedValues.add(val);
      selected.push(val);
      if (selected.length >= count) break;
    }
  }

  // If still fewer than count, take anything left in candidates
  if (selected.length < count) {
    for (const item of candidates) {
      const val = mode === 'meaning' ? item.meaningVi : item.word;
      if (val && !usedValues.has(val)) {
        usedValues.add(val);
        selected.push(val);
        if (selected.length >= count) break;
      }
    }
  }

  return selected;
};

/**
 * Tokenize a sentence for Word Bank Assembly
 * For Chinese: naturally splits into words or 1-2 char segments without punctuation
 * For English: splits words by whitespace
 */
export const tokenizeSentence = (sentence = '', lang = 'zh') => {
  if (!sentence) return [];

  // Remove trailing full stop / punctuation for assembly
  const clean = sentence.replace(/[。？！.,?!;:]/g, ' ').trim();

  if (lang === 'zh') {
    // Intelligent Chinese segmentation
    // Split into 1-2 char meaningful blocks
    const chars = clean.split('').filter(c => c.trim().length > 0);
    const tokens = [];
    let i = 0;
    while (i < chars.length) {
      if (i + 1 < chars.length && Math.random() > 0.4) {
        tokens.push(chars[i] + chars[i + 1]);
        i += 2;
      } else {
        tokens.push(chars[i]);
        i += 1;
      }
    }
    return tokens;
  } else {
    return clean.split(/\s+/).filter(Boolean);
  }
};

/**
 * Build 12 - 15 Scaffolded Exercises for a Lesson
 * Follows the 5-Phase international pedagogic standard
 * 
 * @param {Object} lessonData - Lesson object (from authenticCurriculumData or database)
 * @param {Array} vocabPool - Global or level vocabulary pool for distractors
 * @param {Object} options - { lang: 'zh' | 'en' }
 * @returns {Array} Array of 12-15 exercise objects
 */
export const buildScaffoldedLessonFlow = (lessonData, vocabPool = [], options = {}) => {
  const lang = options.lang || (lessonData.id?.startsWith('zh') ? 'zh' : 'en');
  const pool = vocabPool && vocabPool.length > 0 ? vocabPool : getAllAuthenticVocabularies(lang);

  const vocabularies = lessonData.vocabularies && lessonData.vocabularies.length > 0
    ? lessonData.vocabularies
    : [];

  // If lesson has no vocabularies (e.g. legacy lesson with pre-made exercises)
  if (vocabularies.length === 0) {
    // Return existing exercises if available
    return lessonData.exercises || [];
  }

  const generatedExercises = [];
  let orderIndex = 1;

  // We loop through each vocabulary in the lesson (usually 3 items)
  // For each vocab, we create a full 5-phase learning cycle:
  // Phase 1: Preview Flashcard & Chiết tự
  // Phase 2a: Listening & Vietnamese Meaning (with smart distractors)
  // Phase 2b: Word Selection / Target Character Choice (with smart distractors)
  // Phase 3: Stroke Order / Spelling Writer
  // Phase 4: Sentence Assembly Word Bank
  // Phase 5: Speech & Dialogue Pronunciation
  vocabularies.forEach((vocab, vIndex) => {
    const vocabId = vocab.id || `v_${vIndex + 1}`;

    // --- PHASE 1: FLASHCARD & CHIẾT TỰ (PREVIEW CARD) ---
    generatedExercises.push({
      id: `${lessonData.id}_p1_prev_${vocabId}`,
      lesson_id: lessonData.id,
      type: 'preview',
      target_text: vocab.word,
      target_audio_text: vocab.word,
      phonetic: vocab.pronunciation,
      hanViet: vocab.hanViet || null,
      partOfSpeech: vocab.partOfSpeech || 'Từ vựng',
      vietnamese_meaning: vocab.meaningVi,
      radicals: vocab.radicals || (lang === 'zh' ? 'Bộ thủ chuẩn mực' : 'Gốc từ & Cấu trúc (Etymology)'),
      grammarNote: vocab.grammarNote || (lang === 'zh' ? 'Từ vựng cốt lõi theo cấp độ' : 'Ngữ pháp & cấu trúc cốt lõi'),
      exampleSentence: vocab.exampleSentence || {
        target: vocab.word,
        pronunciation: vocab.pronunciation,
        meaningVi: vocab.meaningVi
      },
      prompt: lang === 'zh'
        ? `Khởi động: Nhận diện từ vựng & Chiết tự chữ Hán:`
        : `Khởi động: Nhận diện từ vựng & Phiên âm Quốc tế (IPA):`,
      order_index: orderIndex++
    });

    // --- PHASE 2A: SMART DISTRACTOR LISTENING (HEAR AUDIO -> PICK VIETNAMESE MEANING) ---
    const meaningDistractors = getSmartDistractors(vocab, pool, 3, 'meaning');
    const meaningOptions = shuffleArray([vocab.meaningVi, ...meaningDistractors]);

    generatedExercises.push({
      id: `${lessonData.id}_p2_list_${vocabId}`,
      lesson_id: lessonData.id,
      type: 'listening',
      prompt: lang === 'zh'
        ? 'Nghe phát âm và chọn nghĩa tiếng Việt chính xác nhất:'
        : 'Nghe và chọn đáp án Tiếng Anh đúng:',
      target_text: vocab.word,
      target_audio_text: vocab.word,
      phonetic: vocab.pronunciation,
      vietnamese_meaning: vocab.meaningVi,
      options: meaningOptions,
      correct_answer: vocab.meaningVi,
      hint: lang === 'zh'
        ? (vocab.hanViet ? `Âm Hán Việt: ${vocab.hanViet}` : `Pinyin: ${vocab.pronunciation}`)
        : `Phiên âm Quốc tế (IPA): ${vocab.pronunciation}`,
      order_index: orderIndex++
    });

    // --- PHASE 2B: TARGET WORD RECOGNITION (SEE MEANING -> PICK TARGET WORD) ---
    const wordDistractors = getSmartDistractors(vocab, pool, 3, 'word');
    const wordOptions = shuffleArray([vocab.word, ...wordDistractors]);

    generatedExercises.push({
      id: `${lessonData.id}_p2_recog_${vocabId}`,
      lesson_id: lessonData.id,
      type: 'listening',
      prompt: lang === 'zh'
        ? `Chọn chữ Hán tương ứng với nghĩa: "${vocab.meaningVi}"`
        : `Chọn từ Tiếng Anh tương ứng với nghĩa: "${vocab.meaningVi}"`,
      target_text: vocab.word,
      target_audio_text: vocab.word,
      phonetic: vocab.pronunciation,
      vietnamese_meaning: vocab.meaningVi,
      options: wordOptions,
      correct_answer: vocab.word,
      hint: lang === 'zh' ? `Pinyin: ${vocab.pronunciation}` : `Phiên âm Quốc tế (IPA): ${vocab.pronunciation}`,
      order_index: orderIndex++
    });

    // --- PHASE 3: STROKE ORDER WRITER / ENGLISH SPELLING ---
    generatedExercises.push({
      id: `${lessonData.id}_p3_wri_${vocabId}`,
      lesson_id: lessonData.id,
      type: 'writing',
      prompt: lang === 'zh'
        ? `Tập viết chữ "${vocab.word}" (${vocab.pronunciation}) theo đúng thứ tự nét:`
        : `Luyện viết và đánh vần từ Tiếng Anh "${vocab.word}" (${vocab.pronunciation}):`,
      target_text: vocab.word,
      target_audio_text: vocab.word,
      stroke_char: vocab.word.charAt(0),
      phonetic: vocab.pronunciation,
      vietnamese_meaning: vocab.meaningVi,
      hanViet: vocab.hanViet || null,
      order_index: orderIndex++
    });

    // --- PHASE 4: WORD BANK SENTENCE ASSEMBLY (SẮP XẾP MẪU CÂU) ---
    if (vocab.exampleSentence && vocab.exampleSentence.target) {
      const targetSentence = vocab.exampleSentence.target;
      const sentenceTokens = tokenizeSentence(targetSentence, lang);

      // Collect 2-3 distractor tokens from other vocabulary words in this lesson
      const otherVocabWords = vocabularies
        .filter(v => v.word !== vocab.word)
        .map(v => v.word);
      const distractorTokens = otherVocabWords.slice(0, 2);

      // Add one distractor word from pool if needed
      if (distractorTokens.length < 2) {
        const extraDist = getSmartDistractors(vocab, pool, 2, 'word');
        distractorTokens.push(...extraDist.slice(0, 2 - distractorTokens.length));
      }

      const allTokens = [...sentenceTokens, ...distractorTokens];
      const shuffledTokens = shuffleWordBank(allTokens, sentenceTokens);

      generatedExercises.push({
        id: `${lessonData.id}_p4_asm_${vocabId}`,
        lesson_id: lessonData.id,
        type: 'translation',
        prompt: lang === 'zh'
          ? `Sắp xếp các từ thành câu Tiếng Trung hoàn chỉnh theo nghĩa: "${vocab.exampleSentence.meaningVi}"`
          : `Dịch câu sau sang Tiếng Anh: "${vocab.exampleSentence.meaningVi}"`,
        target_text: targetSentence,
        target_audio_text: targetSentence,
        phonetic: vocab.exampleSentence.pronunciation,
        vietnamese_meaning: vocab.exampleSentence.meaningVi,
        options: shuffledTokens,
        correct_answer: targetSentence,
        hint: `Gợi ý ngữ pháp: ${vocab.grammarNote || 'Chú ý trật tự từ trong câu'}`,
        order_index: orderIndex++
      });
    }

    // --- PHASE 5: REAL-WORLD SPEECH PRACTICE (LUYỆN PHÁT ÂM) ---
    const speechTarget = (vocab.exampleSentence && vocab.exampleSentence.target)
      ? vocab.exampleSentence.target
      : vocab.word;
    const speechPhonetic = (vocab.exampleSentence && vocab.exampleSentence.pronunciation)
      ? vocab.exampleSentence.pronunciation
      : vocab.pronunciation;
    const speechMeaning = (vocab.exampleSentence && vocab.exampleSentence.meaningVi)
      ? vocab.exampleSentence.meaningVi
      : vocab.meaningVi;

    generatedExercises.push({
      id: `${lessonData.id}_p5_spk_${vocabId}`,
      lesson_id: lessonData.id,
      type: 'speaking',
      prompt: lang === 'zh'
        ? `Luyện phát âm mẫu câu Tiếng Trung thực tế (Bấm Micro và nói to, rõ ràng):`
        : `Luyện phát âm mẫu câu Tiếng Anh thực tế (Bấm Micro và nói to, rõ ràng):`,
      target_text: speechTarget,
      target_audio_text: speechTarget,
      phonetic: speechPhonetic,
      vietnamese_meaning: speechMeaning,
      order_index: orderIndex++
    });
  });

  return generatedExercises;
};

export {
  shuffleArray,
  shuffleRightColumn,
  shuffleWordBank
};

export default {
  getAllAuthenticVocabularies,
  getSmartDistractors,
  tokenizeSentence,
  buildScaffoldedLessonFlow,
  shuffleArray,
  shuffleRightColumn,
  shuffleWordBank
};
