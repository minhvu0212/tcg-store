import React from 'react';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Flame,
  Award,
  Package,
  ExternalLink,
  Layers,
  Zap,
  ChevronRight,
  TrendingUp,
  Star
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { products } from '../data/products';
import { categories } from '../data/categories';
import ProductCard from '../components/ProductCard';
import { getAssetUrl } from '../utils/assetHelper';

export default function Home() {
  const { navigate, setCategoryFilter } = useStore();

  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 8);
  const newArrivals = products.filter(p => p.isNewArrival || p.badge === 'New & Hot').slice(0, 4);
  const yugiohFeatured = products.filter(p => p.tcgSeries === 'Yu-Gi-Oh!').slice(0, 4);
  const pokemonFeatured = products.filter(p => p.tcgSeries === 'Pokémon TCG').slice(0, 4);
  const onepieceFeatured = products.filter(p => p.tcgSeries === 'One Piece').slice(0, 4);
  const accessoriesFeatured = products.filter(p => p.tcgSeries === 'Accessories').slice(0, 4);

  const handleNavCategory = (series) => {
    setCategoryFilter(series);
    navigate('shop');
  };

  return (
    <div className="space-y-24">

      {/* 1. HERO BANNER */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24">
        {/* Ambient lighting glows */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-96 h-96 bg-[#8957E5]/15 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#D9B45B]/10 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#171C2B] border border-[#D9B45B]/40 shadow-gold-glow">
                <Sparkles className="w-4 h-4 text-[#D9B45B]" />
                <span className="text-xs font-bold tracking-wider text-gold-gradient uppercase">
                  Premium Trading Card Game & Collectibles Store
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.08] font-['Cinzel']">
                ENTER THE <br />
                <span className="text-gold-gradient">WORLD OF TCG</span>
              </h1>

              <p className="text-sm sm:text-base text-[#9CA3B5] max-w-xl leading-relaxed">
                Discover your favorite Trading Card Games, collect iconic holy grails, and explore premium booster boxes, structure decks, and museum-grade protective gear.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <button
                  onClick={() => { setCategoryFilter('All'); navigate('shop'); }}
                  className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#D9B45B] via-[#E5C77A] to-[#B3913E] text-[#090B12] font-black text-sm tracking-wide hover:brightness-110 shadow-gold-glow flex items-center space-x-2 transition-all cursor-pointer"
                >
                  <span>SHOP NOW</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>

                <button
                  onClick={() => handleNavCategory('Pokémon TCG')}
                  className="px-6 py-3.5 rounded-xl bg-[#171C2B] hover:bg-[#1E2438] text-white border border-[#282E40] hover:border-[#8957E5] font-bold text-sm transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <span>EXPLORE COLLECTION</span>
                  <ChevronRight className="w-4 h-4 text-[#9CA3B5]" />
                </button>
              </div>

              {/* Trust badges */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#282E40]/60 max-w-md">
                <div>
                  <div className="text-xl font-black text-white">100%</div>
                  <div className="text-[11px] text-[#9CA3B5]">Authentic Scans</div>
                </div>
                <div>
                  <div className="text-xl font-black text-[#D9B45B]">PSA 10</div>
                  <div className="text-[11px] text-[#9CA3B5]">Grading Ready</div>
                </div>
                <div>
                  <div className="text-xl font-black text-[#8957E5]">35pt UV</div>
                  <div className="text-[11px] text-[#9CA3B5]">Slab Protection</div>
                </div>
              </div>

            </div>

            {/* Right Showcase: Real authentic 3D card display */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-square flex items-center justify-center">

                {/* Center Glow Platform */}
                <div className="absolute inset-0 bg-radial from-[#8957E5]/25 via-transparent to-transparent rounded-full blur-2xl"></div>

                {/* Back Left Card: Yu-Gi-Oh! Blue-Eyes */}
                <div
                  onClick={() => navigate('product/ygo-01')}
                  className="absolute left-0 bottom-4 w-48 sm:w-56 -rotate-12 hover:rotate-0 hover:z-30 transition-all duration-500 cursor-pointer group"
                >
                  <div className="p-1 rounded-2xl bg-[#171C2B] border border-[#D9B45B]/50 shadow-2xl group-hover:scale-105 transition-transform">
                    <img
                      src={getAssetUrl('/Images/yugioh/blue_eyes_white_dragon.jpg')}
                      alt="Blue-Eyes White Dragon"
                      className="rounded-xl w-full h-auto object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
                    />
                    <div className="p-2 text-center">
                      <span className="text-[10px] font-bold text-[#D9B45B] block truncate">Blue-Eyes White Dragon</span>
                      <span className="text-[9px] text-[#9CA3B5]">Ultra Rare 1st Ed</span>
                    </div>
                  </div>
                </div>

                {/* Back Right Card: One Piece Gear 5 Luffy */}
                <div
                  onClick={() => navigate('product/op-01')}
                  className="absolute right-0 bottom-6 w-48 sm:w-56 rotate-12 hover:rotate-0 hover:z-30 transition-all duration-500 cursor-pointer group"
                >
                  <div className="p-1 rounded-2xl bg-[#171C2B] border border-[#F43F5E]/50 shadow-2xl group-hover:scale-105 transition-transform">
                    <img
                      src={getAssetUrl('/Images/one-piece/luffy_gear5.png')}
                      alt="Monkey D. Luffy Gear 5 Manga Rare"
                      className="rounded-xl w-full h-auto object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
                    />
                    <div className="p-2 text-center">
                      <span className="text-[10px] font-bold text-[#F43F5E] block truncate">Gear 5 Manga Luffy</span>
                      <span className="text-[9px] text-[#9CA3B5]">Manga Secret Rare</span>
                    </div>
                  </div>
                </div>

                {/* Front Center Card: Pokémon Charizard ex 151 */}
                <div
                  onClick={() => navigate('product/pkm-01')}
                  className="relative z-20 w-56 sm:w-64 -translate-y-4 hover:scale-105 transition-all duration-300 cursor-pointer group"
                >
                  <div className="p-1.5 rounded-2xl bg-[#171C2B] border-2 border-[#D9B45B] shadow-gold-glow">
                    <div className="relative">
                      <img
                        src={getAssetUrl('/Images/pokemon/charizard_ex_151.png')}
                        alt="Charizard ex 151 SIR"
                        className="rounded-xl w-full h-auto object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
                      />
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-[#090B12]/90 border border-[#D9B45B] text-[#D9B45B] text-[9px] font-black uppercase">
                        Grail
                      </div>
                    </div>
                    <div className="p-2.5 text-center bg-[#111522] rounded-xl mt-1.5">
                      <span className="text-xs font-black text-white block">Charizard ex #199</span>
                      <span className="text-[10px] text-[#8957E5] font-semibold">Special Illustration Rare</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. FEATURED CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="text-xs font-bold text-[#D9B45B] uppercase tracking-wider flex items-center space-x-1.5 mb-1">
              <Layers className="w-3.5 h-3.5" />
              <span>Curated Departments</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-['Cinzel']">
              FEATURED CATEGORIES
            </h2>
          </div>
          <button
            onClick={() => { setCategoryFilter('All'); navigate('shop'); }}
            className="mt-3 md:mt-0 text-xs font-bold text-[#D9B45B] hover:underline flex items-center space-x-1"
          >
            <span>View All Departments</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleNavCategory(cat.series)}
              className="group relative bg-[#171C2B] rounded-2xl border border-[#282E40] hover:border-[#D9B45B]/60 p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card cursor-pointer overflow-hidden"
            >
              {/* Background card preview */}
              <div className="aspect-[4/3] w-full rounded-xl bg-[#090B12]/80 border border-[#282E40]/60 p-3 flex items-center justify-center overflow-hidden mb-4">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="max-h-full w-auto object-contain group-hover:scale-110 transition-transform duration-300 filter drop-shadow-md"
                />
              </div>

              <div>
                <span className="text-[10px] font-bold text-[#D9B45B] tracking-wider uppercase">
                  {cat.badge}
                </span>
                <h3 className="text-lg font-bold text-white group-hover:text-[#D9B45B] transition-colors mt-0.5">
                  {cat.name}
                </h3>
                <p className="text-xs text-[#9CA3B5] mt-1 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#282E40] flex items-center justify-between text-xs font-semibold text-[#D9B45B]">
                <span>Explore Category</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. BEST SELLERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="text-xs font-bold text-[#D9B45B] uppercase tracking-wider flex items-center space-x-1.5 mb-1">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>Highest Demand</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-['Cinzel']">
              BEST SELLERS
            </h2>
          </div>
          <button
            onClick={() => { setCategoryFilter('All'); navigate('shop'); }}
            className="mt-3 md:mt-0 text-xs font-bold text-[#D9B45B] hover:underline flex items-center space-x-1"
          >
            <span>Browse Full Catalog</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. YU-GI-OH! FEATURED COLLECTION (SECTION V & VII.5) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#171C2B] to-[#111522] border border-[#282E40] p-6 sm:p-10 overflow-hidden">

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-[#282E40]">
            <div>
              <span className="text-xs font-bold text-[#D9B45B] tracking-widest uppercase">
                Duel Monsters Vault
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-['Cinzel'] mt-1">
                YU-GI-OH! FEATURED COLLECTION
              </h2>
              <p className="text-xs text-[#9CA3B5] mt-1">
                Showcasing Blue-Eyes White Dragon, Dark Magician, Dark Magician Girl, Red-Eyes & 25th Rarity Boxes.
              </p>
            </div>

            <button
              onClick={() => handleNavCategory('Yu-Gi-Oh!')}
              className="mt-4 md:mt-0 px-5 py-2.5 rounded-xl bg-[#171C2B] hover:bg-[#D9B45B] hover:text-[#090B12] text-[#D9B45B] border border-[#D9B45B]/40 font-bold text-xs transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <span>Explore All Yu-Gi-Oh!</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {yugiohFeatured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </section>

      {/* 5. POKÉMON FEATURED COLLECTION (SECTION V & VII.6) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#171C2B] via-[#111522] to-[#171C2B] border border-[#282E40] p-6 sm:p-10 overflow-hidden">

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-[#282E40]">
            <div>
              <span className="text-xs font-bold text-[#8957E5] tracking-widest uppercase">
                Gotta Catch \'Em All
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-['Cinzel'] mt-1">
                POKÉMON FEATURED COLLECTION
              </h2>
              <p className="text-xs text-[#9CA3B5] mt-1">
                Featuring Charizard ex 151, Umbreon VMAX Moonbreon, Pikachu Secret Rare, and Sealed 151 ETBs.
              </p>
            </div>

            <button
              onClick={() => handleNavCategory('Pokémon TCG')}
              className="mt-4 md:mt-0 px-5 py-2.5 rounded-xl bg-[#171C2B] hover:bg-[#8957E5] hover:text-white text-[#8957E5] border border-[#8957E5]/40 font-bold text-xs transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <span>Explore All Pokémon</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {pokemonFeatured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </section>

      {/* 6. ONE PIECE CARD GAME SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="text-xs font-bold text-[#F43F5E] uppercase tracking-wider flex items-center space-x-1.5 mb-1">
              <Zap className="w-3.5 h-3.5" />
              <span>Awakening of the New Era</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-['Cinzel']">
              ONE PIECE CARD GAME
            </h2>
          </div>
          <button
            onClick={() => handleNavCategory('One Piece')}
            className="mt-3 md:mt-0 text-xs font-bold text-[#F43F5E] hover:underline flex items-center space-x-1"
          >
            <span>View All One Piece Cards</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {onepieceFeatured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 7. TCG ACCESSORIES SHOWCASE (SECTION VII.7) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="text-xs font-bold text-[#438DFF] uppercase tracking-wider flex items-center space-x-1.5 mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Grail Preservation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-['Cinzel']">
              TCG ACCESSORIES & PROTECTION
            </h2>
          </div>
          <button
            onClick={() => handleNavCategory('Accessories')}
            className="mt-3 md:mt-0 text-xs font-bold text-[#438DFF] hover:underline flex items-center space-x-1"
          >
            <span>View All Accessories</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {accessoriesFeatured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 8. PROMOTIONAL BANNER (SECTION VII.8) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-[#D9B45B]/40 bg-gradient-to-r from-[#171C2B] via-[#111522] to-[#171C2B] p-8 sm:p-12 shadow-2xl">
          <div className="max-w-2xl relative z-10 space-y-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black bg-[#D9B45B]/15 text-[#D9B45B] border border-[#D9B45B]/30 uppercase tracking-widest">
              Demo Showcase Collection
            </span>

            <h3 className="text-3xl sm:text-4xl font-black text-white font-['Cinzel'] leading-tight">
              COLLECT TODAY. <br />
              <span className="text-gold-gradient">FORGE YOUR LEGEND.</span>
            </h3>

            <p className="text-xs sm:text-sm text-[#9CA3B5] leading-relaxed">
              Explore authentic certified holy grails from modern alternate arts to vintage 1st Edition classics. All pricing and orders are interactive prototype simulations for UI demonstration.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => { setCategoryFilter('All'); navigate('shop'); }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D9B45B] to-[#B3913E] text-[#090B12] font-black text-xs hover:brightness-110 shadow-gold-glow flex items-center space-x-2 cursor-pointer"
              >
                <span>EXPLORE ALL GRAILS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate('news')}
                className="px-6 py-3 rounded-xl bg-[#111522] hover:bg-[#1E2438] text-white border border-[#282E40] text-xs font-bold transition-all cursor-pointer"
              >
                READ COLLECTOR GUIDES
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. WHY CHOOSE US (SECTION VII.9) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#D9B45B] uppercase tracking-wider">
            The Collector\'s Standard
          </span>
          <h2 className="text-3xl font-black text-white font-['Cinzel'] mt-1">
            WHY COLLECTORS CHOOSE TCG STORE
          </h2>
          <p className="text-xs text-[#9CA3B5] mt-2">
            Built by collectors, for collectors. We set the benchmark for authenticity, protective packaging, and catalog accuracy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-[#171C2B] border border-[#282E40] text-left space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#D9B45B]/10 border border-[#D9B45B]/30 flex items-center justify-center text-[#D9B45B]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-white">100% Genuine Cards</h3>
            <p className="text-xs text-[#9CA3B5] leading-relaxed">
              Every card undergoes multi-point optical inspection including rosette printing, core stock check, and holographic seal verification.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#171C2B] border border-[#282E40] text-left space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#8957E5]/10 border border-[#8957E5]/30 flex items-center justify-center text-[#8957E5]">
              <Package className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-white">Armor-Plated Shipping</h3>
            <p className="text-xs text-[#9CA3B5] leading-relaxed">
              Cards are sleeved, placed in UV magnetic cases, sealed in team bags, and sandwiched between rigid board armor.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#171C2B] border border-[#282E40] text-left space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#438DFF]/10 border border-[#438DFF]/30 flex items-center justify-center text-[#438DFF]">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-white">PSA / BGS Ready</h3>
            <p className="text-xs text-[#9CA3B5] leading-relaxed">
              Accurate condition grading. What you see in the high-resolution scans is the exact card delivered to your vault.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#171C2B] border border-[#282E40] text-left space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-center text-[#10B981]">
              <Star className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-white">Collector Community</h3>
            <p className="text-xs text-[#9CA3B5] leading-relaxed">
              Dedicated duelist and collector community with weekly deck strategy analysis, set reviews, and grail giveaways.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
