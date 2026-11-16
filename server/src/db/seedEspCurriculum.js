/**
 * seedEspCurriculum.js
 * Seeds all 14 ESP Career Tracks (140 Units, 1,540 Lessons, 6,160 Exercises)
 * into SQLite database.
 */

const db = require('./database');
const path = require('path');
const fs = require('fs');

function seedEspCurriculum() {
  console.log('💼 [ESP Curriculum] Seeding 14 Specialized Career Tracks (110 Lessons each) into SQLite...');

  const espFilePath = path.join(__dirname, '../../../client/src/data/espCurriculumFull.js');
  if (!fs.existsSync(espFilePath)) {
    console.warn('espCurriculumFull.js not found, skipping full seed.');
    return;
  }

  // Dynamic import / read
  let content = fs.readFileSync(espFilePath, 'utf8');
  let ESP_FULL_LEVELS = [];
  let ESP_FULL_UNITS = [];

  try {
    const levelsMatch = content.match(/export const ESP_FULL_LEVELS = (\[[\s\S]*?\]);\s*export const/);
    if (levelsMatch) {
      ESP_FULL_LEVELS = JSON.parse(levelsMatch[1]);
    }
    const unitsMatch = content.match(/export const ESP_FULL_UNITS = (\[[\s\S]*?\]);\s*export default/);
    if (unitsMatch) {
      ESP_FULL_UNITS = JSON.parse(unitsMatch[1]);
    }
  } catch (err) {
    console.error('Error parsing espCurriculumFull.js:', err);
    return;
  }

  if (ESP_FULL_LEVELS.length === 0 || ESP_FULL_UNITS.length === 0) {
    console.warn('No ESP data parsed.');
    return;
  }

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

  // Clean old ESP seed to avoid duplicates
  const deleteOldEspUnits = db.prepare(`
    DELETE FROM units WHERE id LIKE 'unit_esp_%' OR id LIKE 'unit_zh_%' OR id LIKE 'unit_en_%'
  `);
  const deleteOldEspLessons = db.prepare(`
    DELETE FROM lessons WHERE id LIKE 'zh_%_u%' OR id LIKE 'en_%_u%'
  `);
  const deleteOldEspExercises = db.prepare(`
    DELETE FROM exercises WHERE id LIKE 'zh_%_u%' OR id LIKE 'en_%_u%'
  `);

  let seededLevels = 0;
  let seededUnits = 0;
  let seededLessons = 0;
  let seededExercises = 0;

  const runSeed = db.transaction(() => {
    deleteOldEspUnits.run();
    deleteOldEspLessons.run();
    deleteOldEspExercises.run();

    // 1. Seed Levels
    for (const lvl of ESP_FULL_LEVELS) {
      insertLevel.run(
        lvl.id,
        lvl.language_id,
        lvl.code,
        lvl.title,
        lvl.subtitle,
        lvl.color,
        lvl.order_index
      );
      seededLevels++;
    }

    // 2. Seed Units, Lessons, Exercises
    for (const unit of ESP_FULL_UNITS) {
      insertUnit.run(
        unit.id,
        unit.level_id,
        unit.unit_number,
        unit.title,
        unit.description,
        unit.icon,
        unit.banner_color
      );
      seededUnits++;

      for (const lesson of (unit.lessons || [])) {
        insertLesson.run(
          lesson.id,
          unit.id,
          lesson.lesson_number,
          lesson.title,
          lesson.description,
          lesson.xp_reward || 30,
          lesson.type || 'standard'
        );
        seededLessons++;

        for (const ex of (lesson.exercises || [])) {
          insertExercise.run(
            ex.id,
            lesson.id,
            ex.type,
            ex.prompt,
            ex.target_text,
            ex.target_audio_text,
            ex.phonetic,
            ex.vietnamese_meaning,
            JSON.stringify(ex.options),
            ex.correct_answer,
            ex.hint,
            ex.stroke_char || null,
            ex.order_index
          );
          seededExercises++;
        }
      }
    }
  });

  runSeed();

  console.log(`✅ [ESP Curriculum] Seed completed successfully:`);
  console.log(`   - Levels: ${seededLevels}`);
  console.log(`   - Units: ${seededUnits} (10 Units per track)`);
  console.log(`   - Lessons: ${seededLessons} (110 Lessons per track!)`);
  console.log(`   - Exercises: ${seededExercises}`);
}

module.exports = { seedEspCurriculum };

if (require.main === module) {
  seedEspCurriculum();
}
