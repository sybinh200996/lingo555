/**
 * shuffleUtils.js
 * Advanced Fisher-Yates and Anti-Aligned Shuffling Utilities
 * Guarantees zero horizontally aligned rows in matching pairs and
 * uniform random distributions for multiple-choice options & word bank tokens.
 */

/**
 * Standard Fisher-Yates (Knuth) Array Shuffle
 * Returns a new array with all elements shuffled with uniform probability.
 * @param {Array} array
 * @returns {Array}
 */
export const shuffleArray = (array) => {
  if (!array || !Array.isArray(array)) return [];
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

/**
 * Anti-Aligned Shuffle for the right column of Matching Pairs.
 * Guarantees that NO row on the right matches horizontally with the corresponding row on the left.
 * Implements a strict Derangement algorithm with fallback circular shift.
 * 
 * @param {Array<Object>} pairs - Array of pair objects (e.g. [{ left, right }, ...])
 * @returns {Array<Object>}
 */
export const shuffleRightColumn = (pairs) => {
  if (!pairs || pairs.length <= 1) return pairs ? [...pairs] : [];
  let rightItems = pairs.map((p, idx) => ({ ...p, originalIndex: idx }));
  let attempts = 0;

  // Xáo trộn cho đến khi không có dòng nào nằm trùng vị trí ngang hàng với cột trái
  do {
    rightItems = shuffleArray(rightItems);
    attempts++;
  } while (
    attempts < 20 &&
    rightItems.some((item, idx) => item.originalIndex === idx) // Chống trùng từng vị trí ngang hàng
  );

  // Nếu vẫn còn cặp thẳng hàng sau các lần thử ngẫu nhiên, tạo hoán vị vòng tròn chắc chắn 100% không trùng điểm nào
  const remainingAligned = rightItems.filter((item, idx) => item.originalIndex === idx).length;
  if (remainingAligned > 0 && rightItems.length > 1) {
    const n = pairs.length;
    const shifted = [];
    for (let i = 0; i < n; i++) {
      shifted.push({ ...pairs[(i + 1) % n], originalIndex: (i + 1) % n });
    }
    rightItems = shifted;
  }

  return rightItems;
};

/**
 * Smart Word Bank Shuffler.
 * Guarantees word tiles are thoroughly scrambled and NOT already arranged in the correct target sentence order.
 * 
 * @param {Array<string>} tokens - All word tokens including distractors
 * @param {Array<string>} targetTokens - Target sentence tokens
 * @returns {Array<string>}
 */
export const shuffleWordBank = (tokens, targetTokens = []) => {
  if (!tokens || tokens.length <= 1) return tokens ? [...tokens] : [];
  let shuffled = shuffleArray(tokens);

  if (targetTokens && targetTokens.length > 1) {
    const targetStr = targetTokens.join(' ').trim().toLowerCase();
    let attempts = 0;
    while (
      attempts < 15 &&
      shuffled.slice(0, targetTokens.length).join(' ').trim().toLowerCase() === targetStr
    ) {
      shuffled = shuffleArray(tokens);
      attempts++;
    }

    // Nếu vẫn vô tình trùng thứ tự câu đích, đảo ngược mảng
    if (shuffled.slice(0, targetTokens.length).join(' ').trim().toLowerCase() === targetStr) {
      shuffled.reverse();
    }
  }

  return shuffled;
};

export default {
  shuffleArray,
  shuffleRightColumn,
  shuffleWordBank
};
