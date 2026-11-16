// Spaced Repetition System (SRS) Engine - SuperMemo SM-2 Algorithm
// Optimized for vocabulary and sentence acquisition in Lingo555

/**
 * Calculates new interval, repetition count, and easiness factor based on SM-2
 * 
 * @param {Object} item Current item SRS state { repetition, interval, easinessFactor }
 * @param {number} grade Quality of response (0 to 5):
 *   5 - Hoàn hảo, không do dự
 *   4 - Đúng, nhưng có chút ngập ngừng
 *   3 - Đúng, nhưng tốn nhiều sức nhớ
 *   2 - Sai, nhưng khi thấy đáp án thì nhớ ra ngay
 *   1 - Sai, nhìn đáp án vẫn thấy mơ hồ
 *   0 - Hoàn toàn không nhớ gì
 * @returns {Object} { repetition, interval, easinessFactor, nextReviewDate, isMastered }
 */
export function calculateSM2(item = {}, grade = 4) {
  let repetition = Number(item.repetition) || 0;
  let interval = Number(item.interval) || 0;
  let easinessFactor = Number(item.easinessFactor) || 2.5;

  const validGrade = Math.max(0, Math.min(5, Math.round(grade)));

  // If grade is 3 or higher, the response was considered correct
  if (validGrade >= 3) {
    if (repetition === 0) {
      interval = 1;
    } else if (repetition === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easinessFactor);
    }
    repetition += 1;
  } else {
    // Failed recall: Reset repetition to 0 and interval to 1
    repetition = 0;
    interval = 1;
  }

  // Update Easiness Factor according to SM-2 formula:
  // EF' = EF + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02))
  easinessFactor = easinessFactor + (0.1 - (5 - validGrade) * (0.08 + (5 - validGrade) * 0.02));
  
  // Easiness Factor must never drop below 1.3
  if (easinessFactor < 1.3) {
    easinessFactor = 1.3;
  }

  // Compute next review date
  const now = new Date();
  const nextReviewDate = new Date(now.getTime() + interval * 24 * 60 * 60 * 1000).toISOString();

  return {
    repetition,
    interval,
    easinessFactor: Number(easinessFactor.toFixed(2)),
    nextReviewDate,
    isMastered: repetition >= 3
  };
}

export default { calculateSM2 };
