import fs from 'fs';
import path from 'path';
import https from 'https';

const onePieceCards = [
  {
    name: 'Monkey D. Luffy Gear 5 (OP05-119)',
    dest: 'Images/one-piece/luffy_gear5.png',
    url: 'https://en.onepiece-cardgame.com/images/cardlist/card/OP05-119_p1.png'
  },
  {
    name: 'Shanks Secret Rare (OP01-120)',
    dest: 'Images/one-piece/shanks_sec.png',
    url: 'https://en.onepiece-cardgame.com/images/cardlist/card/OP01-120_p1.png'
  },
  {
    name: 'Portgas D. Ace (OP02-013)',
    dest: 'Images/one-piece/ace_sr.png',
    url: 'https://en.onepiece-cardgame.com/images/cardlist/card/OP02-013_p1.png'
  },
  {
    name: 'Roronoa Zoro (OP01-025)',
    dest: 'Images/one-piece/zoro_sr.png',
    url: 'https://en.onepiece-cardgame.com/images/cardlist/card/OP01-025_p1.png'
  },
  {
    name: 'Trafalgar Law (OP01-047)',
    dest: 'Images/one-piece/law_sr.png',
    url: 'https://en.onepiece-cardgame.com/images/cardlist/card/OP01-047_p1.png'
  },
  {
    name: 'Nami Alternate Art (OP01-016)',
    dest: 'Images/one-piece/nami_r.png',
    url: 'https://en.onepiece-cardgame.com/images/cardlist/card/OP01-016_p1.png'
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
  for (const c of onePieceCards) {
    try {
      const fullPath = path.resolve(c.dest);
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
      await download(c.url, fullPath);
      console.log(`✓ Downloaded ${c.name} -> ${c.dest}`);
    } catch (e) {
      console.warn(`! Failed ${c.name}: ${e.message}`);
    }
  }
}

run();
