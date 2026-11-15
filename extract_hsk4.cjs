const fs = require('fs');
const path = require('path');

// Execute part 1 to get HSK 4
const content = fs.readFileSync(path.join(__dirname, 'generate-part1.cjs'), 'utf8');
const match = content.match(/const zhHsk4 = ([\s\S]*?);\s*console\.log/);
if (match) {
  const parsed = new Function('return ' + match[1])();
  fs.writeFileSync(path.join(__dirname, 'data-chunks/zh_hsk4.json'), JSON.stringify(parsed, null, 2));
  console.log('zh_hsk4.json written! Lessons count:', parsed.lessons.length);
} else {
  console.error('Failed to match zhHsk4');
}
