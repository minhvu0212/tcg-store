import React from 'react';
import { ShieldCheck, Award, Sparkles, Package, Users, Compass } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { getAssetUrl } from '../utils/assetHelper';

export default function About() {
  const { navigate } = useStore();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-[#D9B45B] uppercase tracking-widest">
          YOUR COLLECTION. YOUR LEGEND.
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-['Cinzel'] leading-tight">
          ABOUT TCG STORE VAULT
        </h1>
        <p className="text-xs sm:text-sm text-[#9CA3B5] leading-relaxed">
          Founded by dedicated trading card game specialists and tournament duelists, TCG STORE was established to solve the greatest challenge in the hobby: absolute trust, condition accuracy, and museum-grade protection.
        </p>
      </div>

      {/* Story & Philosophy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-4 text-xs sm:text-sm text-[#9CA3B5] leading-relaxed">
          <h2 className="text-xl font-black text-white font-['Cinzel']">
            Our Collector Philosophy
          </h2>
          <p>
            Whether it is pulling a 1st Edition Blue-Eyes White Dragon, sleeve-protecting a Moonbreon VMAX Alternate Art, or uncovering a Manga Secret Rare Luffy, every card carries passion, nostalgia, and artistic mastery.
          </p>
          <p>
            In an era plagued by bootleg cards and misleading condition descriptions, TCG STORE enforces zero compromise. We photograph real cards, inspect card cores and foil security seals under magnification, and package every shipment in armor-plated casing.
          </p>
        </div>

        <div className="aspect-[4/3] rounded-3xl bg-[#111522] border border-[#282E40] p-4 overflow-hidden relative shadow-2xl">
          <img
            src={getAssetUrl('/Images/banners/hero_banner.jpg')}
            alt="TCG Store Collector Vault"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
      </div>

      {/* Four Pillars of Excellence */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-white font-['Cinzel'] text-center">
          OUR FOUR PILLARS OF EXCELLENCE
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-[#111522] border border-[#282E40] space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#D9B45B]/10 text-[#D9B45B] border border-[#D9B45B]/30 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-sm">Authenticity Guarantee</h3>
            <p className="text-xs text-[#9CA3B5] leading-relaxed">
              Every card undergoes 4-point verification checking rosettes, paper core, and holographic stamps.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#111522] border border-[#282E40] space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#8957E5]/10 text-[#8957E5] border border-[#8957E5]/30 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-sm">Rigorous Grading Standards</h3>
            <p className="text-xs text-[#9CA3B5] leading-relaxed">
              We separate Near Mint from Gem Mint with strict centering, edge whitening, and surface inspection.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#111522] border border-[#282E40] space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#438DFF]/10 text-[#438DFF] border border-[#438DFF]/30 flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-sm">Armor-Clad Packaging</h3>
            <p className="text-xs text-[#9CA3B5] leading-relaxed">
              All high-value singles ship in 35pt magnetic One-Touch cases encased in tamper-sealed poly bags.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#111522] border border-[#282E40] space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-sm">Collector Community</h3>
            <p className="text-xs text-[#9CA3B5] leading-relaxed">
              Built by players and passionate hobbyists who understand card culture and tournament formats.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
