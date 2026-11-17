import fs from 'fs';
import path from 'path';
import https from 'https';

const extraBatch = [
  // Yu-Gi-Oh extra staples & sets
  { name: 'Red-Eyes Flare Metal Dragon', dest: 'Images/yugioh/flare_metal_dragon.jpg', url: 'https://images.ygoprodeck.com/images/cards/44405066.jpg' },
  { name: 'I:P Masquerena', dest: 'Images/yugioh/ip_masquerena.jpg', url: 'https://images.ygoprodeck.com/images/cards/65741786.jpg' },
  { name: 'Knightmare Unicorn', dest: 'Images/yugioh/knightmare_unicorn.jpg', url: 'https://images.ygoprodeck.com/images/cards/38342335.jpg' },
  { name: 'Accesscode Talker Alt', dest: 'Images/yugioh/accesscode_talker_alt.jpg', url: 'https://images.ygoprodeck.com/images/cards/86066372.jpg' },
  { name: 'Effect Veiler QCSR', dest: 'Images/yugioh/effect_veiler_qcsr.jpg', url: 'https://images.ygoprodeck.com/images/cards/97268402.jpg' },
  { name: 'Ghost Mourner & Moonlit Chill', dest: 'Images/yugioh/ghost_mourner.jpg', url: 'https://images.ygoprodeck.com/images/cards/52038441.jpg' },
  { name: 'Dimension Shifter Alt', dest: 'Images/yugioh/shifter.jpg', url: 'https://images.ygoprodeck.com/images/cards/91800273.jpg' },

  // Pokemon extra
  { name: 'Eevee IR Twilight', dest: 'Images/pokemon/eevee_ir_alt.png', url: 'https://images.pokemontcg.io/sv6/188_hires.png' },
  { name: 'Pikachu VMAX Rainbow', dest: 'Images/pokemon/pikachu_vmax_rainbow.png', url: 'https://images.pokemontcg.io/swsh4/188_hires.png' },
  { name: 'Charizard VSTAR', dest: 'Images/pokemon/charizard_vstar.png', url: 'https://images.pokemontcg.io/swsh9/18_hires.png' },
  { name: 'Blastoise 151 SAR', dest: 'Images/pokemon/blastoise_151_sar.png', url: 'https://images.pokemontcg.io/sv3pt5/200_hires.png' },
  { name: 'Venusaur 151 SAR', dest: 'Images/pokemon/venusaur_151_sar.png', url: 'https://images.pokemontcg.io/sv3pt5/198_hires.png' },
  { name: 'Zapdos 151 SAR', dest: 'Images/pokemon/zapdos_151_sar.png', url: 'https://images.pokemontcg.io/sv3pt5/202_hires.png' },
  { name: 'Alakazam 151 SAR', dest: 'Images/pokemon/alakazam_151_sar.png', url: 'https://images.pokemontcg.io/sv3pt5/201_hires.png' },
  { name: 'Erika Invitation SAR', dest: 'Images/pokemon/erikas_invitation_sar.png', url: 'https://images.pokemontcg.io/sv3pt5/203_hires.png' },
  { name: 'Mew VMAX Alternate Art', dest: 'Images/pokemon/mew_vmax_alt.png', url: 'https://images.pokemontcg.io/swsh8/269_hires.png' },

  // One Piece extra
  { name: 'Trafalgar Law Leader', dest: 'Images/one-piece/law_leader.png', url: 'https://en.onepiece-cardgame.com/images/cardlist/card/OP01-002_p1.png' },
  { name: 'Eustass Captain Kid', dest: 'Images/one-piece/kid_sr.png', url: 'https://en.onepiece-cardgame.com/images/cardlist/card/OP01-051_p1.png' },
  { name: 'Kaido Leader', dest: 'Images/one-piece/kaido_leader.png', url: 'https://en.onepiece-cardgame.com/images/cardlist/card/OP01-061_p1.png' },
  { name: 'Crocodile Leader', dest: 'Images/one-piece/crocodile_leader.png', url: 'https://en.onepiece-cardgame.com/images/cardlist/card/OP01-062_p1.png' },
  { name: 'Donquixote Doflamingo', dest: 'Images/one-piece/doflamingo_sr.png', url: 'https://en.onepiece-cardgame.com/images/cardlist/card/OP01-073_p1.png' },
  { name: 'Dracule Mihawk', dest: 'Images/one-piece/mihawk_sr.png', url: 'https://en.onepiece-cardgame.com/images/cardlist/card/OP01-070_p1.png' }
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
  for (const item of extraBatch) {
    try {
      const fullPath = path.resolve(item.dest);
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
      await download(item.url, fullPath);
      console.log(`✓ Downloaded ${item.name} -> ${item.dest}`);
    } catch (e) {
      console.warn(`! Skipped ${item.name}: ${e.message}`);
    }
  }
}

run();
