/**
 * fullCurriculumGenerator.js
 * Central curriculum registry & loader for Chinese HSK 1-6 and English A1-C2.
 * Provides unified access to all Units and Lessons.
 */

import { EXTRA_UNITS_ZH } from './fullCurriculumZH.js';
import { EXTRA_UNITS_EN } from './fullCurriculumEN.js';

export const FULL_CURRICULUM_ZH = EXTRA_UNITS_ZH;
export const FULL_CURRICULUM_EN = EXTRA_UNITS_EN;

export const getCurriculumUnitsForLevel = (levelId) => {
  if (levelId.startsWith('zh_')) {
    return EXTRA_UNITS_ZH.filter(u => u.level_id === levelId);
  }
  if (levelId.startsWith('en_')) {
    return EXTRA_UNITS_EN.filter(u => u.level_id === levelId);
  }
  return [];
};

export const getCurriculumLessonById = (lessonId) => {
  for (const unit of [...EXTRA_UNITS_ZH, ...EXTRA_UNITS_EN]) {
    const found = unit.lessons?.find(l => l.id === lessonId);
    if (found) return found;
  }
  return null;
};

export default {
  FULL_CURRICULUM_ZH,
  FULL_CURRICULUM_EN,
  getCurriculumUnitsForLevel,
  getCurriculumLessonById
};
