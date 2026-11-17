import React from 'react';
import { X, ShieldCheck, Award, CheckCircle2 } from 'lucide-react';

export default function ConditionGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#111522] border border-[#282E40] rounded-3xl shadow-2xl p-6 sm:p-8 text-[#F5F5F7] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#171C2B] text-[#9CA3B5] hover:text-white hover:bg-[#282E40] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2.5 rounded-xl bg-[#D9B45B]/10 text-[#D9B45B] border border-[#D9B45B]/30">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">TCG Condition & Grading Scale</h3>
            <p className="text-xs text-[#9CA3B5]">Industry standard criteria applied to every single card in our inventory.</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Gem Mint */}
          <div className="p-4 rounded-2xl bg-[#171C2B] border border-[#D9B45B]/30 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-[#D9B45B]">Gem Mint / Pack Fresh (NM+)</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#D9B45B]/15 text-[#D9B45B] border border-[#D9B45B]/30 font-bold uppercase">PSA 10 / BGS 9.5 Contender</span>
            </div>
            <p className="text-xs text-[#9CA3B5] leading-relaxed">
              Virtually flawless in all four grading categories: four crisp sharp corners with zero whitening, clean factory edges, immaculate scratch-free foil surface, and 55/45 or better border centering.
            </p>
          </div>

          {/* Near Mint */}
          <div className="p-4 rounded-2xl bg-[#171C2B] border border-[#282E40] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white">Near Mint (NM)</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase">PSA 8 - 9 Grade</span>
            </div>
            <p className="text-xs text-[#9CA3B5] leading-relaxed">
              Shows minimal microscopic wear visible only under tilted directional lighting. May exhibit a microscopic white specks on one corner or minor factory print line. Zero structural bends, creases, or water marks.
            </p>
          </div>

          {/* Lightly Played */}
          <div className="p-4 rounded-2xl bg-[#171C2B] border border-[#282E40] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white">Lightly Played (LP)</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold uppercase">PSA 6 - 7 Grade</span>
            </div>
            <p className="text-xs text-[#9CA3B5] leading-relaxed">
              Minor surface scratches, edge silvering, or light corner fraying from casual play. Ideal for tournament play in sleeves or budget binder collections.
            </p>
          </div>

          {/* Factory Sealed */}
          <div className="p-4 rounded-2xl bg-[#171C2B] border border-[#8957E5]/30 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-[#A277EF]">Factory Sealed (Booster Boxes & ETBs)</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#8957E5]/15 text-[#A277EF] border border-[#8957E5]/30 font-bold uppercase">Brand New Sealed</span>
            </div>
            <p className="text-xs text-[#9CA3B5] leading-relaxed">
              Original manufacturer cellophane shrinkwrap with official logos (Pokéball shrinkwrap, Bandai logo tape, Konami wrap). Box corners inspected for crushing, warping, or punctures.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#282E40] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#171C2B] hover:bg-[#282E40] text-xs font-bold text-white transition-colors cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
