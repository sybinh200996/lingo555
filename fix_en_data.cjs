const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'client/src/data/fullCurriculumEN.js');
let c = fs.readFileSync(file, 'utf8');

c = c.replace(/Ghép cặp từ vựng Tiếng Trung với nghĩa Tiếng Việt tương ứng:/g, 'Ghép cặp từ vựng Tiếng Anh với nghĩa Tiếng Việt tương ứng:');
c = c.replace(/Tập viết chuẩn nét chữ Hán \\"null\\"/g, 'Luyện viết từ vựng Tiếng Anh');
c = c.replace(/Tập viết chuẩn nét chữ Hán/g, 'Luyện viết từ vựng Tiếng Anh');
c = c.replace(/Pinyin: \[/g, 'Phiên âm IPA: [');
c = c.replace(/Tiếng Trung/g, 'Tiếng Anh');
c = c.replace(/chữ Hán/g, 'từ Tiếng Anh');
c = c.replace(/Hán tự/g, 'Từ vựng Tiếng Anh');
c = c.replace(/Pinyin/g, 'Phiên âm IPA');

fs.writeFileSync(file, c, 'utf8');
console.log('fullCurriculumEN.js fully cleaned!');

const remainingHits = c.match(/(Tiếng Trung|chữ Hán|Hán tự|Pinyin)/gi);
console.log('Remaining hits in fullCurriculumEN.js:', remainingHits ? remainingHits.length : 0);
