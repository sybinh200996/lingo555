/**
 * advancedCurriculumData.js
 * Comprehensive authentic advanced curriculum (HSK 3-6 & English B1-C2).
 * Aggregates advanced Chinese and English datasets into cohesive units & lessons.
 */

import { ADVANCED_ZH_DATA } from './advancedZhData.js';
import { ADVANCED_EN_DATA } from './advancedEnData.js';

export { ADVANCED_ZH_DATA, ADVANCED_EN_DATA };

/**
 * Get all vocabulary items for a given advanced level
 */
export const getAdvancedVocabulariesForLevel = (levelId) => {
  const isZh = levelId.startsWith('zh');
  const dataset = isZh ? ADVANCED_ZH_DATA[levelId] : ADVANCED_EN_DATA[levelId];
  if (!dataset || !dataset.lessons) return [];

  const list = [];
  for (const lesson of dataset.lessons) {
    if (lesson.vocabularies) {
      list.push(...lesson.vocabularies);
    }
  }
  return list;
};

/**
 * Get a specific lesson by lessonId from the advanced dataset
 */
export const getAdvancedLesson = (lessonId) => {
  for (const levelKey of Object.keys(ADVANCED_ZH_DATA)) {
    const level = ADVANCED_ZH_DATA[levelKey];
    const found = level.lessons?.find(l => l.id === lessonId);
    if (found) {
      return {
        ...found,
        levelId: level.levelId,
        code: level.code,
        language: 'zh'
      };
    }
  }

  for (const levelKey of Object.keys(ADVANCED_EN_DATA)) {
    const level = ADVANCED_EN_DATA[levelKey];
    const found = level.lessons?.find(l => l.id === lessonId);
    if (found) {
      return {
        ...found,
        levelId: level.levelId,
        code: level.code,
        language: 'en'
      };
    }
  }

  return null;
};

/**
 * Build UI curriculum units for an advanced level
 */
export const getAdvancedUnitsForLevel = (levelId) => {
  const isZh = levelId.startsWith('zh');
  const dataset = isZh ? ADVANCED_ZH_DATA[levelId] : ADVANCED_EN_DATA[levelId];
  if (!dataset || !dataset.lessons || dataset.lessons.length === 0) return [];

  const lessons = dataset.lessons;
  const chunkSize = 5;
  const units = [];

  for (let i = 0; i < lessons.length; i += chunkSize) {
    const chunkLessons = lessons.slice(i, i + chunkSize);
    const unitIdx = Math.floor(i / chunkSize) + 1;
    const unitId = `unit_adv_${levelId}_${unitIdx}`;

    units.push({
      id: unitId,
      level_id: levelId,
      unit_number: unitIdx,
      title: `${dataset.title} - Phần ${unitIdx}`,
      description: `Lộ trình nâng cao 5 giai đoạn thực chiến: Từ vựng chuyên sâu ➔ Nghe phản xạ ➔ Luyện viết ➔ Cấu trúc câu ➔ Phát âm chuẩn AI`,
      icon: unitIdx === 1 ? 'Sparkles' : 'BookOpen',
      banner_color: isZh ? (unitIdx === 1 ? '#059669' : '#0d9488') : (unitIdx === 1 ? '#4f46e5' : '#7c3aed'),
      levelBadge: dataset.code || 'CAO CẤP',
      lessons: chunkLessons.map((l, lIdx) => ({
        id: l.id,
        unit_id: unitId,
        lesson_number: i + lIdx + 1,
        title: l.title,
        description: l.grammarFocus || l.description || 'Kho từ vựng & cấu trúc nâng cao chuẩn quốc tế',
        xp_reward: 35,
        type: 'standard',
        completed: false,
        status: 'unlocked',
        vocabularies: l.vocabularies || [],
        exercises: []
      }))
    });
  }

  return units;
};

export default {
  ADVANCED_ZH_DATA,
  ADVANCED_EN_DATA,
  getAdvancedVocabulariesForLevel,
  getAdvancedLesson,
  getAdvancedUnitsForLevel
};
