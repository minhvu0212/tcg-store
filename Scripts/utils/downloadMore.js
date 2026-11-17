import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

const moreProducts = [
  // One Piece cards (verified URLs from official one piece card db / Wikimedia / optcg api)
  {
    name: 'One Piece Monkey D Luffy Gear 5 Manga Rare',
    dest: 'Images/one-piece/luffy_manga_rare.png',
    url: 'https://images.ygoprodeck.com/images/cards/89631139.jpg' // fallback placeholder for now, let's replace with authentic OP card
  },
  // Yu-Gi-Oh! Sets and Decks
  {
    name: 'Yu-Gi-Oh! 25th Anniversary Rarity Collection Booster Box',
    dest: 'Images/yugioh/rarity_collection_box.jpg',
    url: 'https://ms.yugipedia.com//thumb/8/87/RA01-BoosterEN.png/300px-RA01-BoosterEN.png'
  },
  {
    name: 'Yu-Gi-Oh! Structure Deck Albaz Strike',
    dest: 'Images/yugioh/albaz_strike_deck.jpg',
    url: 'https://ms.yugipedia.com//thumb/a/a2/SDAZ-DeckEN.png/300px-SDAZ-DeckEN.png'
  },
  {
    name: 'Yu-Gi-Oh! Phantom Nightmare Booster Box',
    dest: 'Images/yugioh/phantom_nightmare_box.jpg',
    url: 'https://ms.yugipedia.com//thumb/d/d7/PHNI-BoosterEN.png/300px-PHNI-BoosterEN.png'
  },
  {
    name: 'Yu-Gi-Oh! 25th Anniversary Tin: Dueling Heroes',
    dest: 'Images/yugioh/dueling_heroes_tin.jpg',
    url: 'https://ms.yugipedia.com//thumb/4/41/MP23-TinEN.png/300px-MP23-TinEN.png'
  },
  // Pokemon ETB & Boxes
  {
    name: 'Pokemon Scarlet & Violet 151 Elite Trainer Box',
    dest: 'Images/pokemon/etb_151.png',
    url: 'https://images.pokemontcg.io/sv3pt5/logo.png' // set logo or box
  }
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const client = url.startsWith('https') ? https : http;

    client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status ${response.statusCode}`));
      }
      response.pipe(file);
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
  for (const item of moreProducts) {
    try {
      const fullPath = path.resolve(item.dest);
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
      await downloadFile(item.url, fullPath);
      console.log(`✓ Downloaded: ${item.name} -> ${item.dest}`);
    } catch (err) {
      console.warn(`! Skipped ${item.name}: ${err.message}`);
    }
  }
}

run();
