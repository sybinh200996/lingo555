/**
 * cacheSanitizer.js
 * Tự động quét và xóa/làm mới bộ nhớ đệm (localStorage) bài học cũ nếu phát hiện
 * bài học Tiếng Anh đang lưu chuỗi "Tiếng Trung", "chữ Hán", "Hán tự", hoặc "Pinyin".
 */

export const sanitizeLocalStorageLessonCache = () => {
  if (typeof window === 'undefined' || !window.localStorage) return;

  try {
    const keysToInspect = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) keysToInspect.push(key);
    }

    let modifiedCount = 0;

    for (const key of keysToInspect) {
      try {
        const rawValue = localStorage.getItem(key);
        if (!rawValue || typeof rawValue !== 'string') continue;

        // Kiểm tra xem key hoặc nội dung có liên quan đến bài học Tiếng Anh không
        const isEnglishRelated = 
          key.includes('en_') || 
          key.includes('english') || 
          rawValue.includes('"level_id":"en_') ||
          rawValue.includes('"levelId":"en_') ||
          rawValue.includes('"id":"en_') ||
          rawValue.includes('"language":"en"') ||
          rawValue.includes('en_a1') ||
          rawValue.includes('en_a2') ||
          rawValue.includes('en_b1') ||
          rawValue.includes('en_b2') ||
          rawValue.includes('en_c1') ||
          rawValue.includes('en_c2');

        // Kiểm tra xem có chứa từ ngữ Tiếng Trung bị gán nhầm không
        const hasChineseTerminology = 
          rawValue.includes('Tiếng Trung') ||
          rawValue.includes('chữ Hán') ||
          rawValue.includes('Hán tự') ||
          rawValue.includes('Pinyin');

        if (isEnglishRelated && hasChineseTerminology) {
          // Nếu là key cache chuyên biệt của một bài học (ví dụ: lingo555_lesson_en_..., lesson_cache_..., v.v.)
          if (
            key.startsWith('lingo555_lesson_') || 
            key.startsWith('cached_lesson_') || 
            key.startsWith('lesson_') ||
            key.startsWith('en_')
          ) {
            localStorage.removeItem(key);
            modifiedCount++;
            console.log(`[CacheSanitizer] Đã tự động XÓA cache bài học cũ bị sai ngôn ngữ: ${key}`);
          } else {
            // Đối với các key tổng (như user profile, danh sách hoàn thành), làm sạch nội dung chuỗi và lưu lại
            const cleaned = rawValue
              .replace(/Ghép cặp từ vựng Tiếng Trung với nghĩa Tiếng Việt tương ứng:/g, 'Ghép cặp từ vựng Tiếng Anh với nghĩa Tiếng Việt tương ứng:')
              .replace(/Tập viết chuẩn nét chữ Hán/g, 'Luyện viết từ vựng Tiếng Anh')
              .replace(/Tiếng Trung/g, 'Tiếng Anh')
              .replace(/chữ Hán/g, 'từ Tiếng Anh')
              .replace(/Hán tự/g, 'Từ vựng Tiếng Anh')
              .replace(/Pinyin/g, 'Phiên âm IPA')
              .replace(/Chiết tự & Bộ thủ/g, 'Gốc từ & Cấu trúc (Etymology)');

            localStorage.setItem(key, cleaned);
            modifiedCount++;
            console.log(`[CacheSanitizer] Đã tự động LÀM MỚI nội dung cache Tiếng Anh cho key: ${key}`);
          }
        }
      } catch (err) {
        console.warn(`[CacheSanitizer] Lỗi khi xử lý key ${key}:`, err);
      }
    }

    if (modifiedCount > 0) {
      console.log(`[CacheSanitizer] Đã tự động xử lý thành công ${modifiedCount} mục cache trong localStorage.`);
    }
  } catch (e) {
    console.warn('[CacheSanitizer] Lỗi quét localStorage:', e);
  }
};

/**
 * Xóa ngay lập tức cache của một bài học cụ thể nếu phát hiện là bài học Tiếng Anh
 * @param {string} lessonId
 */
export const cleanLessonCacheIfOutdated = (lessonId) => {
  if (typeof window === 'undefined' || !window.localStorage || !lessonId) return;

  const isEnglish = lessonId.startsWith('en_') || lessonId.includes('_en_');
  if (!isEnglish) return;

  try {
    const candidateKeys = [
      `lingo555_lesson_${lessonId}`,
      `cached_lesson_${lessonId}`,
      `lesson_${lessonId}`,
      `exercise_${lessonId}`,
      lessonId
    ];

    candidateKeys.forEach(k => {
      const val = localStorage.getItem(k);
      if (val && (val.includes('Tiếng Trung') || val.includes('chữ Hán') || val.includes('Pinyin'))) {
        localStorage.removeItem(k);
        console.log(`[CacheSanitizer] Đã làm mới cache bài học Tiếng Anh: ${k}`);
      }
    });
  } catch (_) {}
};

export default {
  sanitizeLocalStorageLessonCache,
  cleanLessonCacheIfOutdated
};
