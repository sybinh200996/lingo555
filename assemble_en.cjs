const fs = require('fs');
const path = require('path');

const b1 = JSON.parse(fs.readFileSync(path.join(__dirname, 'data-chunks/en_b1.json'), 'utf8'));
const b2 = JSON.parse(fs.readFileSync(path.join(__dirname, 'data-chunks/en_b2.json'), 'utf8'));
const c1 = JSON.parse(fs.readFileSync(path.join(__dirname, 'data-chunks/en_c1.json'), 'utf8'));
const c2Units = JSON.parse(fs.readFileSync(path.join(__dirname, 'data-chunks/en_c2.json'), 'utf8'));

const c2Lessons = [];
c2Units.forEach(u => {
  u.lessons.forEach(l => {
    c2Lessons.push(l);
  });
});

const c2 = {
  levelId: "en_c2",
  code: "C2",
  title: "CEFR C2 - Thành Thạo Bản Ngữ & Tư Tưởng Tối Cao",
  lessons: c2Lessons
};

const enData = {
  en_b1: b1,
  en_b2: b2,
  en_c1: c1,
  en_c2: c2
};

const outputContent = `/**
 * advancedEnData.js
 * Comprehensive authentic English curriculum for CEFR B1, B2, C1, C2.
 * Complete 40 deep-level lessons with IPA, collocations, etymology, grammar notes, and real-world example sentences.
 */

export const ADVANCED_EN_DATA = ${JSON.stringify(enData, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, 'client/src/data/advancedEnData.js'), outputContent, 'utf8');
console.log('Successfully wrote client/src/data/advancedEnData.js with 40 English lessons!');
