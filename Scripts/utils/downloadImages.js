import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

const cardImages = [
  // Yu-Gi-Oh! Singles
  {
    name: 'Blue-Eyes White Dragon',
    dest: 'Images/yugioh/blue_eyes_white_dragon.jpg',
    url: 'https://images.ygoprodeck.com/images/cards/89631139.jpg'
  },
  {
    name: 'Dark Magician',
    dest: 'Images/yugioh/dark_magician.jpg',
    url: 'https://images.ygoprodeck.com/images/cards/46986414.jpg'
  },
  {
    name: 'Dark Magician Girl',
    dest: 'Images/yugioh/dark_magician_girl.jpg',
    url: 'https://images.ygoprodeck.com/images/cards/38033121.jpg'
  },
  {
    name: 'Red-Eyes Black Dragon',
    dest: 'Images/yugioh/red_eyes_black_dragon.jpg',
    url: 'https://images.ygoprodeck.com/images/cards/74677422.jpg'
  },
  {
    name: 'Exodia the Forbidden One',
    dest: 'Images/yugioh/exodia_the_forbidden_one.jpg',
    url: 'https://images.ygoprodeck.com/images/cards/33396948.jpg'
  },
  {
    name: 'Stardust Dragon',
    dest: 'Images/yugioh/stardust_dragon.jpg',
    url: 'https://images.ygoprodeck.com/images/cards/44508094.jpg'
  },
  {
    name: 'Number 39: Utopia',
    dest: 'Images/yugioh/number_39_utopia.jpg',
    url: 'https://images.ygoprodeck.com/images/cards/84013237.jpg'
  },
  {
    name: 'Accesscode Talker',
    dest: 'Images/yugioh/accesscode_talker.jpg',
    url: 'https://images.ygoprodeck.com/images/cards/86066372.jpg'
  },
  {
    name: 'Ash Blossom & Joyous Spring',
    dest: 'Images/yugioh/ash_blossom.jpg',
    url: 'https://images.ygoprodeck.com/images/cards/14558127.jpg'
  },
  {
    name: 'Infinite Impermanence',
    dest: 'Images/yugioh/infinite_impermanence.jpg',
    url: 'https://images.ygoprodeck.com/images/cards/10045474.jpg'
  },
  {
    name: 'Effect Veiler',
    dest: 'Images/yugioh/effect_veiler.jpg',
    url: 'https://images.ygoprodeck.com/images/cards/97268402.jpg'
  },
  {
    name: 'Ghost Ogre & Snow Rabbit',
    dest: 'Images/yugioh/ghost_ogre.jpg',
    url: 'https://images.ygoprodeck.com/images/cards/59438930.jpg'
  },
  
  // Pokémon Singles
  {
    name: 'Charizard ex 151 Special Illustration Rare',
    dest: 'Images/pokemon/charizard_ex_151.png',
    url: 'https://images.pokemontcg.io/sv3pt5/199_hires.png'
  },
  {
    name: 'Pikachu Crown Zenith Secret Rare',
    dest: 'Images/pokemon/pikachu_crown_zenith.png',
    url: 'https://images.pokemontcg.io/swsh12pt5/160_hires.png'
  },
  {
    name: 'Umbreon VMAX Alternate Art (Moonbreon)',
    dest: 'Images/pokemon/umbreon_vmax_alt.png',
    url: 'https://images.pokemontcg.io/swsh7/215_hires.png'
  },
  {
    name: 'Gengar VMAX Alternate Art',
    dest: 'Images/pokemon/gengar_vmax_alt.png',
    url: 'https://images.pokemontcg.io/swsh8/271_hires.png'
  },
  {
    name: 'Mew ex 151 Special Illustration Rare',
    dest: 'Images/pokemon/mew_ex_151.png',
    url: 'https://images.pokemontcg.io/sv3pt5/205_hires.png'
  },
  {
    name: 'Mewtwo VSTAR Crown Zenith Secret Rare',
    dest: 'Images/pokemon/mewtwo_vstar_cz.png',
    url: 'https://images.pokemontcg.io/swsh12pt5gg/GG44_hires.png'
  },
  {
    name: 'Rayquaza VMAX Evolving Skies Alternate Art',
    dest: 'Images/pokemon/rayquaza_vmax_alt.png',
    url: 'https://images.pokemontcg.io/swsh7/218_hires.png'
  },
  {
    name: 'Lugia V Silver Tempest Alternate Art',
    dest: 'Images/pokemon/lugia_v_alt.png',
    url: 'https://images.pokemontcg.io/swsh12/186_hires.png'
  },
  {
    name: 'Greninja ex Twilight Masquerade SIR',
    dest: 'Images/pokemon/greninja_ex_tm.png',
    url: 'https://images.pokemontcg.io/sv6/214_hires.png'
  },
  {
    name: 'Gardevoir ex Scarlet & Violet Base',
    dest: 'Images/pokemon/gardevoir_ex_sv.png',
    url: 'https://images.pokemontcg.io/sv1/245_hires.png'
  },
  {
    name: 'Lucario VSTAR Crown Zenith',
    dest: 'Images/pokemon/lucario_vstar_cz.png',
    url: 'https://images.pokemontcg.io/swsh12pt5gg/GG55_hires.png'
  },
  {
    name: 'Eevee Twilight Masquerade Illustration Rare',
    dest: 'Images/pokemon/eevee_ir.png',
    url: 'https://images.pokemontcg.io/sv6/188_hires.png'
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
  console.log(`Starting download of ${cardImages.length} real TCG card images...`);
  let success = 0;
  for (const item of cardImages) {
    try {
      const fullPath = path.resolve(item.dest);
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
      await downloadFile(item.url, fullPath);
      console.log(`✓ [SUCCESS] Downloaded: ${item.name} -> ${item.dest}`);
      success++;
    } catch (err) {
      console.error(`✗ [ERROR] ${item.name}: ${err.message}`);
    }
  }
  console.log(`Downloaded ${success}/${cardImages.length} images.`);
}

run();
