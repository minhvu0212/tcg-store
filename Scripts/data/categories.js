import { getAssetUrl } from '../utils/assetHelper';

const rawCategories = [
  {
    id: 'cat-yugioh',
    name: 'Yu-Gi-Oh!',
    slug: 'yugioh',
    series: 'Yu-Gi-Oh!',
    tagline: 'It\'s Time to Duel',
    description: 'Iconic monsters, legendary dragons, and tournament-grade singles from classic to modern formats.',
    image: '/Images/yugioh/blue_eyes_white_dragon.jpg',
    featuredProduct: 'Blue-Eyes White Dragon',
    badge: 'Classic & Modern Meta',
    subcategories: [
      { name: 'Booster Box', count: 18, filter: 'Booster Box' },
      { name: 'Booster Pack', count: 42, filter: 'Booster Pack' },
      { name: 'Structure Deck', count: 12, filter: 'Structure Deck' },
      { name: 'Single Cards', count: 320, filter: 'Single Cards' },
      { name: 'Collectibles & Tins', count: 15, filter: 'Tin Box' }
    ]
  },
  {
    id: 'cat-pokemon',
    name: 'Pokémon TCG',
    slug: 'pokemon',
    series: 'Pokémon TCG',
    tagline: 'Gotta Catch \'Em All',
    description: 'Special Illustration Rares, Elite Trainer Boxes, Booster Displays, and legendary vintage grails.',
    image: '/Images/pokemon/charizard_ex_151.png',
    featuredProduct: 'Charizard ex 151',
    badge: '151 & Scarlet Violet',
    subcategories: [
      { name: 'Booster Box', count: 24, filter: 'Booster Box' },
      { name: 'Booster Pack', count: 56, filter: 'Booster Pack' },
      { name: 'Elite Trainer Box', count: 16, filter: 'Elite Trainer Box' },
      { name: 'Collection Box', count: 20, filter: 'Collection Box' },
      { name: 'Single Cards', count: 450, filter: 'Single Cards' }
    ]
  },
  {
    id: 'cat-onepiece',
    name: 'One Piece Card Game',
    slug: 'one-piece',
    series: 'One Piece',
    tagline: 'Set Sail For The Grand Line',
    description: 'Eiichiro Oda\'s manga art alternate rares, leader parallels, and premium booster cases.',
    image: '/Images/one-piece/luffy_gear5.png',
    featuredProduct: 'Monkey D. Luffy Gear 5',
    badge: 'Global Sensation',
    subcategories: [
      { name: 'Booster Box', count: 8, filter: 'Booster Box' },
      { name: 'Booster Pack', count: 25, filter: 'Booster Pack' },
      { name: 'Starter Deck', count: 10, filter: 'Starter Deck' },
      { name: 'Manga Alt Singles', count: 35, filter: 'Single Cards' }
    ]
  },
  {
    id: 'cat-accessories',
    name: 'TCG Accessories',
    slug: 'accessories',
    series: 'Accessories',
    tagline: 'Armor For Your Grails',
    description: 'Museum-grade toploaders, heavy-duty zip binders, tournament sleeves, and stitched playmats.',
    image: '/Images/accessories/vault_x_binder.jpg',
    featuredProduct: 'Vault X Zip Binder',
    badge: 'Collector Protection',
    subcategories: [
      { name: 'Card Sleeves', count: 45, filter: 'Card Sleeves' },
      { name: 'Card Binders', count: 18, filter: 'Card Binders' },
      { name: 'Deck Boxes', count: 26, filter: 'Deck Boxes' },
      { name: 'Toploaders & Slabs', count: 30, filter: 'Toploaders & Slabs' },
      { name: 'Playmats', count: 22, filter: 'Playmats' },
      { name: 'Storage Boxes', count: 14, filter: 'Storage Boxes' }
    ]
  }
];

export const categories = rawCategories.map(c => ({
  ...c,
  image: getAssetUrl(c.image)
}));

