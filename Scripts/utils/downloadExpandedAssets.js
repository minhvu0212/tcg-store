import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

const expandedItems = [
  // --- YU-GI-OH! SINGLES ---
  { name: 'Mystical Space Typhoon', dest: 'Images/yugioh/mystical_space_typhoon.jpg', url: 'https://images.ygoprodeck.com/images/cards/5318639.jpg' },
  { name: 'Monster Reborn', dest: 'Images/yugioh/monster_reborn.jpg', url: 'https://images.ygoprodeck.com/images/cards/83764718.jpg' },
  { name: 'Polymerization', dest: 'Images/yugioh/polymerization.jpg', url: 'https://images.ygoprodeck.com/images/cards/24094653.jpg' },
  { name: 'Solemn Judgment', dest: 'Images/yugioh/solemn_judgment.jpg', url: 'https://images.ygoprodeck.com/images/cards/41420027.jpg' },
  { name: 'Droll & Lock Bird', dest: 'Images/yugioh/droll_and_lock_bird.jpg', url: 'https://images.ygoprodeck.com/images/cards/94145021.jpg' },
  { name: 'Nibiru the Primal Being', dest: 'Images/yugioh/nibiru.jpg', url: 'https://images.ygoprodeck.com/images/cards/27204311.jpg' },
  { name: 'Ghost Belle & Haunted Mansion', dest: 'Images/yugioh/ghost_belle.jpg', url: 'https://images.ygoprodeck.com/images/cards/73832387.jpg' },
  { name: 'Pot of Prosperity', dest: 'Images/yugioh/pot_of_prosperity.jpg', url: 'https://images.ygoprodeck.com/images/cards/84211599.jpg' },
  { name: 'Triple Tactics Talent', dest: 'Images/yugioh/triple_tactics_talent.jpg', url: 'https://images.ygoprodeck.com/images/cards/44095762.jpg' },
  { name: 'Crossout Designator', dest: 'Images/yugioh/crossout_designator.jpg', url: 'https://images.ygoprodeck.com/images/cards/65681982.jpg' },
  { name: 'Apollousa Bow of the Goddess', dest: 'Images/yugioh/apollousa.jpg', url: 'https://images.ygoprodeck.com/images/cards/4280258.jpg' },
  { name: 'Baronne de Fleur', dest: 'Images/yugioh/baronne_de_fleur.jpg', url: 'https://images.ygoprodeck.com/images/cards/84815190.jpg' },
  { name: 'S:P Little Knight', dest: 'Images/yugioh/sp_little_knight.jpg', url: 'https://images.ygoprodeck.com/images/cards/29301450.jpg' },
  { name: 'Promethean Princess', dest: 'Images/yugioh/promethean_princess.jpg', url: 'https://images.ygoprodeck.com/images/cards/47655842.jpg' },
  { name: 'Divine Temple of the Snake-Eye', dest: 'Images/yugioh/divine_temple.jpg', url: 'https://images.ygoprodeck.com/images/cards/87188910.jpg' },
  { name: 'Tenpai Dragon Chiku', dest: 'Images/yugioh/tenpai_chiku.jpg', url: 'https://images.ygoprodeck.com/images/cards/89312388.jpg' },
  { name: 'Mirrorjade the Iceblade Dragon', dest: 'Images/yugioh/mirrorjade.jpg', url: 'https://images.ygoprodeck.com/images/cards/44146295.jpg' },
  { name: 'Bystial Lubellion', dest: 'Images/yugioh/bystial_lubellion.jpg', url: 'https://images.ygoprodeck.com/images/cards/32731036.jpg' },
  { name: 'Kashtira Fenrir', dest: 'Images/yugioh/kashtira_fenrir.jpg', url: 'https://images.ygoprodeck.com/images/cards/32909498.jpg' },
  { name: 'Kashtira Unicorn', dest: 'Images/yugioh/kashtira_unicorn.jpg', url: 'https://images.ygoprodeck.com/images/cards/68618157.jpg' },
  { name: 'Diabellstar the Black Witch', dest: 'Images/yugioh/diabellstar.jpg', url: 'https://images.ygoprodeck.com/images/cards/28265983.jpg' },
  { name: 'Snake-Eye Ash', dest: 'Images/yugioh/snake_eye_ash.jpg', url: 'https://images.ygoprodeck.com/images/cards/74094021.jpg' },
  { name: 'Mulcharmy Purulia', dest: 'Images/yugioh/mulcharmy_purulia.jpg', url: 'https://images.ygoprodeck.com/images/cards/65801012.jpg' },
  { name: 'Red-Eyes Dark Dragoon', dest: 'Images/yugioh/red_eyes_dark_dragoon.jpg', url: 'https://images.ygoprodeck.com/images/cards/37818794.jpg' },
  { name: 'Super Polymerization', dest: 'Images/yugioh/super_polymerization.jpg', url: 'https://images.ygoprodeck.com/images/cards/48130397.jpg' },
  { name: 'Called by the Grave', dest: 'Images/yugioh/called_by_the_grave.jpg', url: 'https://images.ygoprodeck.com/images/cards/24224830.jpg' },
  { name: 'Harpies Feather Duster', dest: 'Images/yugioh/harpies_feather_duster.jpg', url: 'https://images.ygoprodeck.com/images/cards/18144506.jpg' },
  { name: 'Raigeki', dest: 'Images/yugioh/raigeki.jpg', url: 'https://images.ygoprodeck.com/images/cards/12580477.jpg' },
  { name: 'Evenly Matched', dest: 'Images/yugioh/evenly_matched.jpg', url: 'https://images.ygoprodeck.com/images/cards/15693423.jpg' },
  { name: 'Dimension Shifter', dest: 'Images/yugioh/dimension_shifter.jpg', url: 'https://images.ygoprodeck.com/images/cards/91800273.jpg' },

  // --- YU-GI-OH! SETS & BOXES ---
  { name: 'The Infinite Forbidden Booster Box', dest: 'Images/products/ygo_info_box.jpg', url: 'https://images.ygoprodeck.com/images/sets/INFO.jpg' },
  { name: 'Legacy of Destruction Booster Box', dest: 'Images/products/ygo_lede_box.jpg', url: 'https://images.ygoprodeck.com/images/sets/LEDE.jpg' },
  { name: 'Age of Overlord Booster Box', dest: 'Images/products/ygo_agov_box.jpg', url: 'https://images.ygoprodeck.com/images/sets/AGOV.jpg' },
  { name: '2024 Dueling Mirrors Tin', dest: 'Images/products/ygo_mp24_tin.jpg', url: 'https://images.ygoprodeck.com/images/sets/MP24.jpg' },
  { name: 'Structure Deck Fire Kings', dest: 'Images/products/ygo_fire_kings.jpg', url: 'https://images.ygoprodeck.com/images/sets/SR14.jpg' },

  // --- POKEMON SINGLES ---
  { name: 'Pikachu 151 Common', dest: 'Images/pokemon/pikachu_151_common.png', url: 'https://images.pokemontcg.io/sv3pt5/25_hires.png' },
  { name: 'Charmander 151 Common', dest: 'Images/pokemon/charmander_151_common.png', url: 'https://images.pokemontcg.io/sv3pt5/4_hires.png' },
  { name: 'Bulbasaur 151 Common', dest: 'Images/pokemon/bulbasaur_151_common.png', url: 'https://images.pokemontcg.io/sv3pt5/1_hires.png' },
  { name: 'Squirtle 151 Common', dest: 'Images/pokemon/squirtle_151_common.png', url: 'https://images.pokemontcg.io/sv3pt5/7_hires.png' },
  { name: 'Mewtwo 151 Rare', dest: 'Images/pokemon/mewtwo_151_rare.png', url: 'https://images.pokemontcg.io/sv3pt5/150_hires.png' },
  { name: 'Blastoise ex 151', dest: 'Images/pokemon/blastoise_ex_151.png', url: 'https://images.pokemontcg.io/sv3pt5/9_hires.png' },
  { name: 'Venusaur ex 151', dest: 'Images/pokemon/venusaur_ex_151.png', url: 'https://images.pokemontcg.io/sv3pt5/3_hires.png' },
  { name: 'Alakazam ex 151', dest: 'Images/pokemon/alakazam_ex_151.png', url: 'https://images.pokemontcg.io/sv3pt5/65_hires.png' },
  { name: 'Zapdos ex 151', dest: 'Images/pokemon/zapdos_ex_151.png', url: 'https://images.pokemontcg.io/sv3pt5/145_hires.png' },
  { name: 'Charmander Illustration Rare', dest: 'Images/pokemon/charmander_ir.png', url: 'https://images.pokemontcg.io/sv3pt5/168_hires.png' },
  { name: 'Squirtle Illustration Rare', dest: 'Images/pokemon/squirtle_ir.png', url: 'https://images.pokemontcg.io/sv3pt5/170_hires.png' },
  { name: 'Dragonair Illustration Rare', dest: 'Images/pokemon/dragonair_ir.png', url: 'https://images.pokemontcg.io/sv3pt5/181_hires.png' },
  { name: 'Machoke Illustration Rare', dest: 'Images/pokemon/machoke_ir.png', url: 'https://images.pokemontcg.io/sv3pt5/177_hires.png' },
  { name: 'Iono Supporter', dest: 'Images/pokemon/iono_uncommon.png', url: 'https://images.pokemontcg.io/sv2/185_hires.png' },
  { name: 'Boss Orders', dest: 'Images/pokemon/boss_orders.png', url: 'https://images.pokemontcg.io/sv2/172_hires.png' },
  { name: 'Ultra Ball', dest: 'Images/pokemon/ultra_ball.png', url: 'https://images.pokemontcg.io/sv1/196_hires.png' },
  { name: 'Professors Research', dest: 'Images/pokemon/professors_research.png', url: 'https://images.pokemontcg.io/sv1/189_hires.png' },
  { name: 'Giratina V Alternate Art', dest: 'Images/pokemon/giratina_v_alt.png', url: 'https://images.pokemontcg.io/swsh11/186_hires.png' },
  { name: 'Arceus VSTAR', dest: 'Images/pokemon/arceus_vstar.png', url: 'https://images.pokemontcg.io/swsh9/123_hires.png' },
  { name: 'Roaring Moon ex', dest: 'Images/pokemon/roaring_moon_ex.png', url: 'https://images.pokemontcg.io/sv4/124_hires.png' },
  { name: 'Iron Valiant ex', dest: 'Images/pokemon/iron_valiant_ex.png', url: 'https://images.pokemontcg.io/sv4/89_hires.png' },
  { name: 'Magikarp Illustration Rare', dest: 'Images/pokemon/magikarp_ir.png', url: 'https://images.pokemontcg.io/sv2/203_hires.png' },
  { name: 'Raichu Illustration Rare', dest: 'Images/pokemon/raichu_ir.png', url: 'https://images.pokemontcg.io/sv2/211_hires.png' },
  { name: 'Gengar V', dest: 'Images/pokemon/gengar_v.png', url: 'https://images.pokemontcg.io/swsh8/156_hires.png' },
  { name: 'Tyranitar ex', dest: 'Images/pokemon/tyranitar_ex.png', url: 'https://images.pokemontcg.io/sv3/66_hires.png' },
  { name: 'Miraidon ex', dest: 'Images/pokemon/miraidon_ex.png', url: 'https://images.pokemontcg.io/sv1/81_hires.png' },
  { name: 'Koraidon ex', dest: 'Images/pokemon/koraidon_ex.png', url: 'https://images.pokemontcg.io/sv1/125_hires.png' },
  { name: 'Pidgeot ex', dest: 'Images/pokemon/pidgeot_ex.png', url: 'https://images.pokemontcg.io/sv3/164_hires.png' },
  { name: 'Snorlax Promo 151 ETB', dest: 'Images/pokemon/snorlax_etb_promo.png', url: 'https://images.pokemontcg.io/svp/51_hires.png' },

  // --- ONE PIECE SINGLES ---
  { name: 'Edward Newgate Leader', dest: 'Images/one-piece/whitebeard_leader.png', url: 'https://en.onepiece-cardgame.com/images/cardlist/card/OP02-001_p1.png' },
  { name: 'Yamato Secret Rare', dest: 'Images/one-piece/yamato_sec.png', url: 'https://en.onepiece-cardgame.com/images/cardlist/card/OP01-121_p1.png' },
  { name: 'Kuzan Secret Rare', dest: 'Images/one-piece/kuzan_sec.png', url: 'https://en.onepiece-cardgame.com/images/cardlist/card/OP02-096_p1.png' },
  { name: 'Sogeking Secret Rare', dest: 'Images/one-piece/sogeking_sec.png', url: 'https://en.onepiece-cardgame.com/images/cardlist/card/OP03-122_p1.png' },
  { name: 'Charlotte Katakuri Secret Rare', dest: 'Images/one-piece/katakuri_sec.png', url: 'https://en.onepiece-cardgame.com/images/cardlist/card/OP03-123_p1.png' },
  { name: 'Sabo Secret Rare', dest: 'Images/one-piece/sabo_sec.png', url: 'https://en.onepiece-cardgame.com/images/cardlist/card/OP04-083_p1.png' },
  { name: 'Monkey D Luffy Character', dest: 'Images/one-piece/luffy_op05.png', url: 'https://en.onepiece-cardgame.com/images/cardlist/card/OP05-060_p1.png' },
  { name: 'Otama Common', dest: 'Images/one-piece/otama_c.png', url: 'https://en.onepiece-cardgame.com/images/cardlist/card/OP01-006_p1.png' },
  { name: 'Radical Beam Event', dest: 'Images/one-piece/radical_beam.png', url: 'https://en.onepiece-cardgame.com/images/cardlist/card/OP01-029_p1.png' },
  { name: 'Gum-Gum Jet Pistol Event', dest: 'Images/one-piece/jet_pistol.png', url: 'https://en.onepiece-cardgame.com/images/cardlist/card/OP01-014_p1.png' },
  { name: 'Guard Point Event', dest: 'Images/one-piece/guard_point.png', url: 'https://en.onepiece-cardgame.com/images/cardlist/card/OP01-028_p1.png' },
  { name: 'Makino Common', dest: 'Images/one-piece/makino_c.png', url: 'https://en.onepiece-cardgame.com/images/cardlist/card/OP02-014_p1.png' },
  { name: 'Curly Dadan Common', dest: 'Images/one-piece/curly_dadan.png', url: 'https://en.onepiece-cardgame.com/images/cardlist/card/OP02-005_p1.png' },
  { name: 'Borsalino Super Rare', dest: 'Images/one-piece/borsalino_sr.png', url: 'https://en.onepiece-cardgame.com/images/cardlist/card/OP02-114_p1.png' },
  { name: 'Monkey D Dragon Super Rare', dest: 'Images/one-piece/dragon_sr.png', url: 'https://en.onepiece-cardgame.com/images/cardlist/card/OP07-015_p1.png' },
  { name: 'Boa Hancock Super Rare', dest: 'Images/one-piece/boa_hancock_sr.png', url: 'https://en.onepiece-cardgame.com/images/cardlist/card/OP07-051_p1.png' }
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const client = url.startsWith('https') ? https : http;

    client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
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
  console.log(`Starting download of ${expandedItems.length} authentic cards/boxes...`);
  let success = 0;
  for (const item of expandedItems) {
    try {
      const fullPath = path.resolve(item.dest);
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
      await download(item.url, fullPath);
      console.log(`✓ Downloaded ${item.name} -> ${item.dest}`);
      success++;
    } catch (e) {
      console.warn(`! Skipped ${item.name}: ${e.message}`);
    }
  }
  console.log(`Finished ${success}/${expandedItems.length} downloads.`);
}

run();
