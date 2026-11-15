/**
 * seedEspCurriculum.js
 * Seeds all 14 ESP (English for Specific Purposes & Tiếng Trung Chuyên Ngành)
 * Career Tracks into SQLite database (levels, units, lessons, exercises).
 */

const db = require('./database');
const path = require('path');

// Import ESP definitions
const { ESP_LEVELS, ESP_ZH_DATA, ESP_EN_DATA } = require('../../../client/src/data/espCurriculumData.js');

function seedEspCurriculum() {
  console.log('💼 [ESP Curriculum] Seeding 14 Specialized Career Tracks into SQLite...');

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

  let seededLevels = 0;
  let seededUnits = 0;
  let seededLessons = 0;
  let seededExercises = 0;

  const runSeed = db.transaction(() => {
    // 1. Seed Levels
    for (const lvl of ESP_LEVELS) {
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

      const isZh = lvl.language_id === 'zh';
      const dataset = isZh ? ESP_ZH_DATA[lvl.id] : ESP_EN_DATA[lvl.id];
      if (!dataset || !dataset.lessons) continue;

      // 2. Seed Unit
      const unitId = `unit_esp_${lvl.id}`;
      insertUnit.run(
        unitId,
        lvl.id,
        1,
        `Chuyên Sâu Thực Chiến: ${dataset.title}`,
        `Thuật ngữ chuyên ngành, soạn thảo văn bản và đàm phán công sở`,
        'Briefcase',
        lvl.color
      );
      seededUnits++;

      // 3. Seed Lessons & Exercises
      dataset.lessons.forEach((l, lIdx) => {
        insertLesson.run(
          l.id,
          unitId,
          lIdx + 1,
          l.title,
          l.grammarFocus || 'Thuật ngữ & kỹ năng làm việc thực chiến',
          30,
          'standard'
        );
        seededLessons++;

        if (l.vocabularies && Array.isArray(l.vocabularies)) {
          let exOrder = 1;

          // Exercise 1: Flashcard / Từ vựng
          l.vocabularies.forEach((v) => {
            insertExercise.run(
              `${l.id}_v_${v.id}`,
              l.id,
              'word_select',
              `Làm quen thuật ngữ chuyên ngành: ${v.word}`,
              v.word,
              v.word,
              v.pronunciation,
              v.meaningVi,
              JSON.stringify([v.meaningVi, 'Nhiệm vụ chung', 'Kế hoạch sơ bộ', 'Báo cáo tuần']),
              v.meaningVi,
              v.grammarNote || v.meaningVi,
              null,
              exOrder++
            );
            seededExercises++;
          });

          // Exercise 2: Nghe phản xạ thuật ngữ
          l.vocabularies.forEach((v) => {
            insertExercise.run(
              `${l.id}_lis_${v.id}`,
              l.id,
              'listening',
              `Nghe và chọn đúng thuật ngữ chuyên ngành:`,
              v.word,
              v.word,
              v.pronunciation,
              v.meaningVi,
              JSON.stringify([v.word, '公司', '业务', '工作']),
              v.word,
              `Nghĩa tiếng Việt: ${v.meaningVi}`,
              null,
              exOrder++
            );
            seededExercises++;
          });

          // Exercise 3: Câu tình huống giao tiếp thực tế
          l.vocabularies.forEach((v) => {
            if (v.exampleSentence) {
              const target = v.exampleSentence.target;
              // Split into word tokens for sentence assembly
              const tokens = isZh ? target.split('') : target.split(' ');
              insertExercise.run(
                `${l.id}_sen_${v.id}`,
                l.id,
                'translation',
                `Dịch và sắp xếp câu tình huống công việc: "${v.exampleSentence.meaningVi}"`,
                target,
                target,
                v.exampleSentence.pronunciation,
                v.exampleSentence.meaningVi,
                JSON.stringify(tokens.slice(0, 8)),
                target,
                v.exampleSentence.meaningVi,
                null,
                exOrder++
              );
              seededExercises++;
            }
          });
        }
      });
    }
  });

  runSeed();

  console.log(`✅ [ESP Curriculum] Seed completed successfully:`);
  console.log(`   - Levels: ${seededLevels}`);
  console.log(`   - Units: ${seededUnits}`);
  console.log(`   - Lessons: ${seededLessons}`);
  console.log(`   - Exercises: ${seededExercises}`);
}

if (require.main === module) {
  seedEspCurriculum();
}

module.exports = { seedEspCurriculum };
