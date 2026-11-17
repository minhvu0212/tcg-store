import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Package, 
  RefreshCcw, 
  HelpCircle, 
  Mail, 
  Send,
  Heart
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Footer() {
  const { navigate, setCategoryFilter } = useStore();

  const handleNavCategory = (series) => {
    setCategoryFilter(series);
    navigate('shop');
  };

  return (
    <footer className="bg-[#090B12] border-t border-[#282E40] text-[#9CA3B5] pt-16 pb-12 mt-20 relative overflow-hidden">
      {/* Subtle background glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-[#8957E5]/10 to-transparent blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Perks Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-[#282E40]/80">
          <div className="flex items-start space-x-3 p-4 rounded-xl bg-[#111522]/50 border border-[#282E40]/40">
            <div className="p-2.5 rounded-lg bg-[#D9B45B]/10 text-[#D9B45B] border border-[#D9B45B]/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">100% Authentic Grails</div>
              <div className="text-xs text-[#9CA3B5] mt-0.5">Every card strictly inspected by senior authenticators.</div>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 rounded-xl bg-[#111522]/50 border border-[#282E40]/40">
            <div className="p-2.5 rounded-lg bg-[#8957E5]/10 text-[#8957E5] border border-[#8957E5]/20">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Armor-Clad Packaging</div>
              <div className="text-xs text-[#9CA3B5] mt-0.5">Double-sleeved in magnetic toploaders & rigid box casing.</div>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 rounded-xl bg-[#111522]/50 border border-[#282E40]/40">
            <div className="p-2.5 rounded-lg bg-[#438DFF]/10 text-[#438DFF] border border-[#438DFF]/20">
              <RefreshCcw className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Collector Guarantee</div>
              <div className="text-xs text-[#9CA3B5] mt-0.5">Exact card condition matching detailed high-res scans.</div>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 rounded-xl bg-[#111522]/50 border border-[#282E40]/40">
            <div className="p-2.5 rounded-lg bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Collector Concierge</div>
              <div className="text-xs text-[#9CA3B5] mt-0.5">Expert guidance for appraisal, grading and rarity advice.</div>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-[#171C2B] border border-[#D9B45B]/40 flex items-center justify-center shadow-gold-glow">
                <Sparkles className="w-4 h-4 text-[#D9B45B]" />
              </div>
              <div className="flex items-baseline space-x-1.5">
                <span className="font-['Cinzel'] font-black text-xl tracking-wider text-gold-gradient">TCG</span>
                <span className="font-bold text-xl tracking-wide text-white">STORE</span>
              </div>
            </div>
            
            <p className="text-xs font-semibold text-[#D9B45B] tracking-widest uppercase">
              YOUR COLLECTION. YOUR LEGEND.
            </p>
            
            <p className="text-xs text-[#9CA3B5] leading-relaxed max-w-sm">
              The premier destination for discerning trading card game collectors and competitive players. Featuring authenticated single cards, sealed booster boxes, and luxury protective gear.
            </p>

            {/* Newsletter input */}
            <div className="pt-2">
              <div className="text-xs font-bold text-white mb-2">Subscribe to Grail Drop Alerts</div>
              <form onSubmit={(e) => { e.preventDefault(); alert('Demo simulation: You are now subscribed to Grail Drop Alerts!'); }} className="flex max-w-sm">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  className="bg-[#111522] border border-[#282E40] rounded-l-xl px-3.5 py-2 text-xs text-white placeholder-[#656D82] focus:outline-none focus:border-[#D9B45B] flex-1"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#D9B45B] to-[#B3913E] text-[#090B12] font-bold px-4 py-2 rounded-r-xl text-xs hover:brightness-110 transition-all flex items-center space-x-1 cursor-pointer"
                >
                  <span>Join</span>
                  <Send className="w-3 h-3" />
                </button>
              </form>
            </div>
          </div>

          {/* TCG Categories */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#D9B45B] pl-2">
              TCG Collections
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => handleNavCategory('Yu-Gi-Oh!')} className="hover:text-[#D9B45B] transition-colors">
                  Yu-Gi-Oh! Singles
                </button>
              </li>
              <li>
                <button onClick={() => handleNavCategory('Pokémon TCG')} className="hover:text-[#D9B45B] transition-colors">
                  Pokémon TCG (151 & Modern)
                </button>
              </li>
              <li>
                <button onClick={() => handleNavCategory('One Piece')} className="hover:text-[#D9B45B] transition-colors">
                  One Piece Manga Rares
                </button>
              </li>
              <li>
                <button onClick={() => handleNavCategory('Accessories')} className="hover:text-[#D9B45B] transition-colors">
                  Sleeves, Binders & Toploaders
                </button>
              </li>
              <li>
                <button onClick={() => { setCategoryFilter('All'); navigate('shop'); }} className="hover:text-[#D9B45B] transition-colors">
                  Factory Sealed Booster Boxes
                </button>
              </li>
            </ul>
          </div>

          {/* Collector Knowledge */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#8957E5] pl-2">
              Collector Knowledge
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => navigate('news')} className="hover:text-[#8957E5] transition-colors">
                  Market Trends & Investment
                </button>
              </li>
              <li>
                <button onClick={() => navigate('faq')} className="hover:text-[#8957E5] transition-colors">
                  PSA & BGS Grading Scale
                </button>
              </li>
              <li>
                <button onClick={() => navigate('faq')} className="hover:text-[#8957E5] transition-colors">
                  Card Condition Guide (NM/LP/MP)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('faq')} className="hover:text-[#8957E5] transition-colors">
                  Authenticity Verification Protocol
                </button>
              </li>
              <li>
                <button onClick={() => navigate('about')} className="hover:text-[#8957E5] transition-colors">
                  About TCG STORE Vault
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links & Demo Admin */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#438DFF] pl-2">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => navigate('profile')} className="hover:text-[#438DFF] transition-colors">
                  User Account Profile
                </button>
              </li>
              <li>
                <button onClick={() => navigate('orders')} className="hover:text-[#438DFF] transition-colors">
                  Order History (Demo)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('wishlist')} className="hover:text-[#438DFF] transition-colors">
                  Grail Wishlist
                </button>
              </li>
              <li>
                <button onClick={() => navigate('contact')} className="hover:text-[#438DFF] transition-colors">
                  Contact Support
                </button>
              </li>
              <li>
                <button onClick={() => navigate('admin')} className="text-[#8957E5] font-semibold hover:text-[#A277EF] transition-colors flex items-center space-x-1">
                  <span>Admin Dashboard</span>
                  <Sparkles className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 border-t border-[#282E40]/60 flex flex-col md:flex-row items-center justify-between text-[11px] text-[#656D82] space-y-4 md:space-y-0">
          <div>
            © {new Date().getFullYear()} TCG STORE. All rights reserved. Phase 1 Frontend UI Prototype.
          </div>

          <div className="text-center md:text-right max-w-xl">
            Pokémon and its respective trademarks are registered trademarks of Nintendo, Creatures Inc., and GAME FREAK inc. Yu-Gi-Oh! is a registered trademark of Studio Dice/SHUEISHA, TV TOKYO, KONAMI. One Piece is a registered trademark of Eiichiro Oda / Shueisha, Toei Animation, Bandai.
          </div>
        </div>

      </div>
    </footer>
  );
}
