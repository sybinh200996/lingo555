const fs = require('fs');
const path = require('path');
const https = require('https');

const rawDir = path.join(__dirname, '../../data/raw');
if (!fs.existsSync(rawDir)) {
  fs.mkdirSync(rawDir, { recursive: true });
}

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 1000000) {
      console.log(`File already exists: ${destPath} (${(fs.statSync(destPath).size / 1024 / 1024).toFixed(2)} MB)`);
      return resolve(destPath);
    }

    console.log(`Downloading ${url} -> ${destPath}...`);
    const file = fs.createWriteStream(destPath);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadFile(response.headers.location, destPath).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status code ${response.statusCode}`));
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          console.log(`Downloaded ${destPath} successfully (${(fs.statSync(destPath).size / 1024 / 1024).toFixed(2)} MB)!`);
          resolve(destPath);
        });
      });
    }).on('error', (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

async function main() {
  const enUrl = 'https://raw.githubusercontent.com/yenthanh132/avdict-database-sqlite-converter/master/anhviet109K.txt';
  const zhUrl = 'https://raw.githubusercontent.com/ph0ngp/CVDICT/main/CVDICT.u8';

  const enDest = path.join(rawDir, 'anhviet109K.txt');
  const zhDest = path.join(rawDir, 'CVDICT.u8');

  console.log('Starting dictionary download...');
  await downloadFile(enUrl, enDest);
  await downloadFile(zhUrl, zhDest);
  console.log('Both dictionary raw datasets are ready in data/raw!');
}

main().catch(console.error);
