import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

const extraAssets = [
  // One Piece Real Cards from Limitless / official database
  {
    name: 'Monkey D Luffy Gear 5 Manga Secret Rare (OP05-119)',
    dest: 'Images/one-piece/luffy_gear5_manga.png',
    url: 'https://limitlesstcg.s3.us-east-2.amazonaws.com/one-piece/OP05/OP05-119_EN.webp'
  },
  {
    name: 'Shanks Manga Alternate Art (OP01-120)',
    dest: 'Images/one-piece/shanks_manga.png',
    url: 'https://limitlesstcg.s3.us-east-2.amazonaws.com/one-piece/OP01/OP01-120_EN.webp'
  },
  {
    name: 'Portgas D Ace Manga Alternate Art (OP02-013)',
    dest: 'Images/one-piece/ace_manga.png',
    url: 'https://limitlesstcg.s3.us-east-2.amazonaws.com/one-piece/OP02/OP02-013_EN.webp'
  },
  {
    name: 'Roronoa Zoro Alternate Art (OP01-025)',
    dest: 'Images/one-piece/zoro_alt.png',
    url: 'https://limitlesstcg.s3.us-east-2.amazonaws.com/one-piece/OP01/OP01-025_EN.webp'
  },
  {
    name: 'Trafalgar Law Alternate Art (OP01-047)',
    dest: 'Images/one-piece/law_alt.png',
    url: 'https://limitlesstcg.s3.us-east-2.amazonaws.com/one-piece/OP01/OP01-047_EN.webp'
  },
  {
    name: 'Nami Alternate Art (OP01-016)',
    dest: 'Images/one-piece/nami_alt.png',
    url: 'https://limitlesstcg.s3.us-east-2.amazonaws.com/one-piece/OP01/OP01-016_EN.webp'
  },

  // Real Booster Boxes & Decks (Unsplash / verified product photography)
  {
    name: 'Pokemon 151 Booster Box Showcase',
    dest: 'Images/products/pokemon_151_box.jpg',
    url: 'https://images.unsplash.com/photo-1613770324089-6e3e5760fc5a?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'Pokemon Elite Trainer Box Showcase',
    dest: 'Images/products/pokemon_etb_box.jpg',
    url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'Yu-Gi-Oh Booster Box Showcase',
    dest: 'Images/products/yugioh_booster_box.jpg',
    url: 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'Yu-Gi-Oh Structure Deck Showcase',
    dest: 'Images/products/yugioh_structure_deck.jpg',
    url: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'One Piece Booster Box Showcase',
    dest: 'Images/products/one_piece_box.jpg',
    url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop'
  },

  // Real TCG Accessories
  {
    name: 'Dragon Shield Sleeves Matte',
    dest: 'Images/accessories/dragon_shield_sleeves.jpg',
    url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'Vault X Zip Binder 9 Pocket',
    dest: 'Images/accessories/vault_x_binder.jpg',
    url: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'Gamegenic Watchtower Deck Box',
    dest: 'Images/accessories/gamegenic_deck_box.jpg',
    url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'Ultra PRO Magnetic One-Touch Toploaders',
    dest: 'Images/accessories/ultra_pro_toploader.jpg',
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'Custom Stitched TCG Playmat',
    dest: 'Images/accessories/tcg_playmat.jpg',
    url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'Ultimate Guard Arkhive Storage Box',
    dest: 'Images/accessories/storage_box.jpg',
    url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop'
  },

  // High-end Hero & Section Banners
  {
    name: 'Hero Banner Dark Luxury Gaming',
    dest: 'Images/banners/hero_banner.jpg',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop'
  },
  {
    name: 'Yu-Gi-Oh Showcase Banner',
    dest: 'Images/banners/yugioh_banner.jpg',
    url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1400&auto=format&fit=crop'
  },
  {
    name: 'Pokemon Showcase Banner',
    dest: 'Images/banners/pokemon_banner.jpg',
    url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1400&auto=format&fit=crop'
  },
  {
    name: 'Collector Vault Promo Banner',
    dest: 'Images/banners/promo_banner.jpg',
    url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1400&auto=format&fit=crop'
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
  console.log(`Starting download of ${extraAssets.length} additional assets...`);
  let success = 0;
  for (const item of extraAssets) {
    try {
      const fullPath = path.resolve(item.dest);
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
      await downloadFile(item.url, fullPath);
      console.log(`✓ Downloaded: ${item.name} -> ${item.dest}`);
      success++;
    } catch (err) {
      console.warn(`! Skipped ${item.name}: ${err.message}`);
    }
  }
  console.log(`Finished ${success}/${extraAssets.length} assets.`);
}

run();
