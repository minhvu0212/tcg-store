import fs from 'fs';
import path from 'path';
import https from 'https';

const downloads = [
  {
    dest: 'Images/products/yugioh_booster_box.jpg',
    url: 'https://images.ygoprodeck.com/images/sets/RA01.jpg'
  },
  {
    dest: 'Images/products/pokemon_151_box.jpg',
    url: 'https://images.pokemontcg.io/sv3pt5/logo.png'
  }
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  for (const item of downloads) {
    try {
      await download(item.url, path.resolve(item.dest));
      console.log(`✓ Downloaded ${item.dest}`);
    } catch (e) {
      console.error(`✗ Error ${item.dest}: ${e.message}`);
    }
  }
}

run();
