/**
 * seedFullCurriculum.js
 * Automatically seeds all Chinese (8 stages, 80 lessons) and English (7 stages, 70 lessons)
 * into SQLite database (levels, units, lessons, exercises).
 */

const db = require('./database');
const path = require('path');
const fs = require('fs');

function seedFullCurriculum() {
  console.log('🌱 [Full Curriculum] Checking database levels and units...');

  // 1. Ensure levels exist
  const insertLevel = db.prepare(`
    INSERT OR REPLACE INTO levels (id, language_id, code, title, subtitle, color, order_index)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const insertUnit = db.prepare(`
    INSERT OR REPLACE INTO units (id, level_id, unit_number, title, description, icon, banner_color)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const insertLesson = db.prepare(`
    INSERT OR REPLACE INTO lessons (id, unit_id, lesson_number, title, description, xp_reward, type)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const insertExercise = db.prepare(`
    INSERT OR REPLACE INTO exercises (
      id, lesson_id, type, prompt, target_text, target_audio_text,
      phonetic, vietnamese_meaning, options_json, correct_answer, hint, stroke_char, order_index
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  // Ensure zh_practical level
  insertLevel.run(
    'zh_practical',
    'zh',
    'THỰC CHIẾN',
    'Tiếng Trung Thực Chiến',
    'Xưởng may, nhà máy, xuất nhập khẩu, logistics và đời sống',
    '#059669',
    8
  );

  // Read fullCurriculumZH.js and fullCurriculumEN.js
  const zhPath = path.join(__dirname, '../../../client/src/data/fullCurriculumZH.js');
  const enPath = path.join(__dirname, '../../../client/src/data/fullCurriculumEN.js');

  let allUnits = [];

  if (fs.existsSync(zhPath)) {
    try {
      const content = fs.readFileSync(zhPath, 'utf8');
      const jsonStr = content.replace(/^[\s\S]*?export const EXTRA_UNITS_ZH = /, '').replace(/;\s*export default EXTRA_UNITS_ZH;[\s\S]*$/, '');
      const zhUnits = JSON.parse(jsonStr);
      allUnits = allUnits.concat(zhUnits);
    } catch (e) {
      console.warn('Failed to parse fullCurriculumZH.js:', e.message);
    }
  }

  if (fs.existsSync(enPath)) {
    try {
      const content = fs.readFileSync(enPath, 'utf8');
      const jsonStr = content.replace(/^[\s\S]*?export const EXTRA_UNITS_EN = /, '').replace(/;\s*export default EXTRA_UNITS_EN;[\s\S]*$/, '');
      const enUnits = JSON.parse(jsonStr);
      allUnits = allUnits.concat(enUnits);
    } catch (e) {
      console.warn('Failed to parse fullCurriculumEN.js:', e.message);
    }
  }

  if (allUnits.length === 0) {
    console.log('No extra units found to seed.');
    return;
  }

  console.log(`📚 Seeding ${allUnits.length} curriculum stages into SQLite database...`);

  let unitCount = 0;
  let lessonCount = 0;
  let exerciseCount = 0;

  const runSeed = db.transaction(() => {
    for (const unit of allUnits) {
      insertUnit.run(
        unit.id,
        unit.level_id,
        unit.unit_number || 1,
        unit.title,
        unit.description || '',
        unit.icon || 'BookOpen',
        unit.banner_color || '#58CC02'
      );
      unitCount++;

      if (unit.lessons && Array.isArray(unit.lessons)) {
        for (const lesson of unit.lessons) {
          insertLesson.run(
            lesson.id,
            unit.id,
            lesson.lesson_number,
            lesson.title,
            lesson.description || '',
            lesson.xp_reward || 25,
            lesson.type || 'standard'
          );
          lessonCount++;

          if (lesson.exercises && Array.isArray(lesson.exercises)) {
            for (const ex of lesson.exercises) {
              const opts = typeof ex.options === 'object' ? JSON.stringify(ex.options) : JSON.stringify(ex.options || []);
              insertExercise.run(
                ex.id,
                lesson.id,
                ex.type || 'listening',
                ex.prompt || '',
                ex.target_text || ex.correct_answer || 'N/A',
                ex.target_audio_text || ex.target_text || '',
                ex.phonetic || '',
                ex.vietnamese_meaning || '',
                opts,
                ex.correct_answer || '',
                ex.hint || '',
                ex.stroke_char || null,
                ex.order_index || 1
              );
              exerciseCount++;
            }
          }
        }
      }
    }
  });

  runSeed();
  console.log(`✅ [Full Curriculum Seeded] ${unitCount} units, ${lessonCount} lessons, ${exerciseCount} exercises!`);
}

module.exports = { seedFullCurriculum };

if (require.main === module) {
  seedFullCurriculum();
}
