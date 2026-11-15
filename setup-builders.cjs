const fs = require('fs');
const path = require('path');

// We will construct the full advanced datasets
console.log('Writing builder for advancedZhData and advancedEnData...');

// Let's create the script that builds the files
const zhScriptPath = path.join(__dirname, 'build-zh-advanced.cjs');
const enScriptPath = path.join(__dirname, 'build-en-advanced.cjs');

fs.writeFileSync(zhScriptPath, `
const fs = require('fs');
const path = require('path');

// Read existing HSK 3
const existing = fs.readFileSync(path.join(__dirname, 'client/src/data/advancedZhData.js'), 'utf8');

// Build HSK 4, HSK 5, HSK 6
const hsk4Data = require('./generate-part1.cjs');
`);

console.log('Script written.');
