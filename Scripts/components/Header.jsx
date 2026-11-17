import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  Menu, 
  X, 
  ChevronDown, 
  ShieldCheck, 
  Flame, 
  Sparkles, 
  SlidersHorizontal,
  ExternalLink,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { products } from '../data/products';
import { categories } from '../data/categories';

export default function Header() {
  const { 
    currentRoute, 
    navigate, 
    cartCount, 
    wishlist, 
    setCategoryFilter,
    user 
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [megaMenu, setMegaMenu] = useState(null); // 'yugioh' | 'pokemon' | null
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const searchRef = useRef(null);
  const userMenuRef = useRef(null);

  // Scroll detection for sticky header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Live search handler
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.toLowerCase();
      const filtered = products.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.tcgSeries.toLowerCase().includes(q) ||
        p.productCode.toLowerCase().includes(q) ||
        (p.rarity && p.rarity.toLowerCase().includes(q))
      ).slice(0, 6);
      setSearchResults(filtered);
      setSearchOpen(true);
    } else {
      setSearchResults([]);
      setSearchOpen(false);
    }
  }, [searchQuery]);

  // Click outside to close popups
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectProduct = (id) => {
    setSearchOpen(false);
    setSearchQuery('');
    navigate(`product/${id}`);
  };

  const handleNavCategory = (seriesName) => {
    setCategoryFilter(seriesName);
    setMegaMenu(null);
    setMobileMenuOpen(false);
    navigate('shop');
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#111522] border-b border-[#282E40] text-xs py-1.5 px-4 text-[#9CA3B5]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#D9B45B]/15 text-[#D9B45B] border border-[#D9B45B]/30 uppercase tracking-wider">
              100% Authentic
            </span>
            <span className="hidden sm:inline">Every single card verified with 4-point authenticity inspection.</span>
            <span className="sm:hidden">Guaranteed Authentic TCG Grails.</span>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('faq')} 
              className="hover:text-[#D9B45B] transition-colors cursor-pointer hidden md:inline-flex items-center"
            >
              Grading & Condition Guide
            </button>
            <span className="text-[#282E40] hidden md:inline">•</span>
            <button 
              onClick={() => navigate('admin')}
              className="text-[#8957E5] hover:text-[#A277EF] font-medium transition-colors flex items-center space-x-1 cursor-pointer"
            >
              <Sparkles className="w-3 h-3" />
              <span>Admin Portal Demo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'glass-header py-3 shadow-2xl' 
            : 'bg-[#090B12]/95 border-b border-[#282E40]/60 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Mobile menu button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-[#9CA3B5] hover:text-white hover:bg-[#171C2B] transition-colors"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Logo */}
            <div className="flex items-center">
              <button 
                onClick={() => navigate('home')} 
                className="flex items-center space-x-3 text-left group focus:outline-none"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#171C2B] to-[#111522] border border-[#D9B45B]/40 flex items-center justify-center shadow-gold-glow group-hover:border-[#D9B45B] transition-all">
                  <div className="relative w-6 h-6">
                    <div className="absolute inset-0 bg-[#8957E5] opacity-40 rounded-sm rotate-6"></div>
                    <div className="absolute inset-0 bg-[#171C2B] border border-[#D9B45B] rounded-sm flex items-center justify-center">
                      <Sparkles className="w-3.5 h-3.5 text-[#D9B45B]" />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline space-x-1.5">
                    <span className="font-['Cinzel'] font-black text-xl tracking-wider text-gold-gradient">TCG</span>
                    <span className="font-bold text-xl tracking-wide text-white">STORE</span>
                  </div>
                  <span className="text-[9px] tracking-[0.2em] font-semibold text-[#9CA3B5] uppercase block -mt-1 group-hover:text-[#D9B45B] transition-colors">
                    Premium Collectibles
                  </span>
                </div>
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              <button
                onClick={() => navigate('home')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentRoute === 'home' 
                    ? 'text-[#D9B45B] bg-[#171C2B]' 
                    : 'text-[#F5F5F7] hover:text-[#D9B45B] hover:bg-[#171C2B]/50'
                }`}
              >
                Home
              </button>

              <button
                onClick={() => { setCategoryFilter('All'); navigate('shop'); }}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentRoute === 'shop' && !['yugioh', 'pokemon', 'one-piece', 'accessories'].includes(currentRoute)
                    ? 'text-[#D9B45B] bg-[#171C2B]' 
                    : 'text-[#F5F5F7] hover:text-[#D9B45B] hover:bg-[#171C2B]/50'
                }`}
              >
                Shop All
              </button>

              {/* Yu-Gi-Oh! Mega Menu Trigger */}
              <div 
                className="relative"
                onMouseEnter={() => setMegaMenu('yugioh')}
                onMouseLeave={() => setMegaMenu(null)}
              >
                <button
                  onClick={() => handleNavCategory('Yu-Gi-Oh!')}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-[#F5F5F7] hover:text-[#D9B45B] hover:bg-[#171C2B]/50 flex items-center space-x-1 transition-all"
                >
                  <span>Yu-Gi-Oh!</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${megaMenu === 'yugioh' ? 'rotate-180 text-[#D9B45B]' : ''}`} />
                </button>

                {/* Yu-Gi-Oh! Mega Dropdown */}
                {megaMenu === 'yugioh' && (
                  <div className="absolute top-full left-0 w-80 bg-[#111522] border border-[#282E40] rounded-2xl shadow-2xl p-4 mt-1 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                    <div className="border-b border-[#282E40] pb-2 mb-3">
                      <div className="text-xs font-bold text-[#D9B45B] uppercase tracking-wider">Yu-Gi-Oh! TCG Vault</div>
                      <div className="text-[11px] text-[#9CA3B5]">Original & Modern Tournament Collections</div>
                    </div>
                    <div className="space-y-1">
                      <button 
                        onClick={() => handleNavCategory('Yu-Gi-Oh!')} 
                        className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-[#F5F5F7] hover:bg-[#171C2B] hover:text-[#D9B45B] flex items-center justify-between transition-colors"
                      >
                        <span>Single Cards (Blue-Eyes, Dark Magician)</span>
                        <ArrowRight className="w-3 h-3 text-[#9CA3B5]" />
                      </button>
                      <button 
                        onClick={() => handleNavCategory('Yu-Gi-Oh!')} 
                        className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-[#F5F5F7] hover:bg-[#171C2B] hover:text-[#D9B45B] flex items-center justify-between transition-colors"
                      >
                        <span>Booster Boxes (25th Rarity Collection)</span>
                        <ArrowRight className="w-3 h-3 text-[#9CA3B5]" />
                      </button>
                      <button 
                        onClick={() => handleNavCategory('Yu-Gi-Oh!')} 
                        className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-[#F5F5F7] hover:bg-[#171C2B] hover:text-[#D9B45B] flex items-center justify-between transition-colors"
                      >
                        <span>Structure Decks (Albaz Strike)</span>
                        <ArrowRight className="w-3 h-3 text-[#9CA3B5]" />
                      </button>
                      <button 
                        onClick={() => handleNavCategory('Yu-Gi-Oh!')} 
                        className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-[#F5F5F7] hover:bg-[#171C2B] hover:text-[#D9B45B] flex items-center justify-between transition-colors"
                      >
                        <span>Competitive Hand Traps (Ash Blossom)</span>
                        <ArrowRight className="w-3 h-3 text-[#9CA3B5]" />
                      </button>
                    </div>
                    <div className="mt-3 pt-3 border-t border-[#282E40] bg-[#171C2B]/40 -mx-4 -mb-4 p-3 rounded-b-2xl flex items-center justify-between">
                      <span className="text-[11px] text-[#9CA3B5]">Explore all Yu-Gi-Oh! items</span>
                      <button 
                        onClick={() => handleNavCategory('Yu-Gi-Oh!')} 
                        className="text-xs font-bold text-[#D9B45B] hover:underline"
                      >
                        View All →
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Pokémon TCG Mega Menu Trigger */}
              <div 
                className="relative"
                onMouseEnter={() => setMegaMenu('pokemon')}
                onMouseLeave={() => setMegaMenu(null)}
              >
                <button
                  onClick={() => handleNavCategory('Pokémon TCG')}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-[#F5F5F7] hover:text-[#D9B45B] hover:bg-[#171C2B]/50 flex items-center space-x-1 transition-all"
                >
                  <span>Pokémon TCG</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${megaMenu === 'pokemon' ? 'rotate-180 text-[#D9B45B]' : ''}`} />
                </button>

                {/* Pokémon Mega Dropdown */}
                {megaMenu === 'pokemon' && (
                  <div className="absolute top-full left-0 w-84 bg-[#111522] border border-[#282E40] rounded-2xl shadow-2xl p-4 mt-1 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                    <div className="border-b border-[#282E40] pb-2 mb-3">
                      <div className="text-xs font-bold text-[#8957E5] uppercase tracking-wider">Pokémon TCG Center</div>
                      <div className="text-[11px] text-[#9CA3B5]">Scarlet & Violet 151, Alternate Arts & Grails</div>
                    </div>
                    <div className="space-y-1">
                      <button 
                        onClick={() => handleNavCategory('Pokémon TCG')} 
                        className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-[#F5F5F7] hover:bg-[#171C2B] hover:text-[#D9B45B] flex items-center justify-between transition-colors"
                      >
                        <span>Single Cards (Charizard, Umbreon, Pikachu)</span>
                        <ArrowRight className="w-3 h-3 text-[#9CA3B5]" />
                      </button>
                      <button 
                        onClick={() => handleNavCategory('Pokémon TCG')} 
                        className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-[#F5F5F7] hover:bg-[#171C2B] hover:text-[#D9B45B] flex items-center justify-between transition-colors"
                      >
                        <span>Elite Trainer Boxes (151, Crown Zenith)</span>
                        <ArrowRight className="w-3 h-3 text-[#9CA3B5]" />
                      </button>
                      <button 
                        onClick={() => handleNavCategory('Pokémon TCG')} 
                        className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-[#F5F5F7] hover:bg-[#171C2B] hover:text-[#D9B45B] flex items-center justify-between transition-colors"
                      >
                        <span>Booster Displays & Bundles</span>
                        <ArrowRight className="w-3 h-3 text-[#9CA3B5]" />
                      </button>
                      <button 
                        onClick={() => handleNavCategory('Pokémon TCG')} 
                        className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-[#F5F5F7] hover:bg-[#171C2B] hover:text-[#D9B45B] flex items-center justify-between transition-colors"
                      >
                        <span>Special Illustration Rares (SIR)</span>
                        <ArrowRight className="w-3 h-3 text-[#9CA3B5]" />
                      </button>
                    </div>
                    <div className="mt-3 pt-3 border-t border-[#282E40] bg-[#171C2B]/40 -mx-4 -mb-4 p-3 rounded-b-2xl flex items-center justify-between">
                      <span className="text-[11px] text-[#9CA3B5]">Explore all Pokémon sets</span>
                      <button 
                        onClick={() => handleNavCategory('Pokémon TCG')} 
                        className="text-xs font-bold text-[#8957E5] hover:underline"
                      >
                        View All →
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* One Piece */}
              <button
                onClick={() => handleNavCategory('One Piece')}
                className="px-3 py-2 rounded-lg text-sm font-medium text-[#F5F5F7] hover:text-[#D9B45B] hover:bg-[#171C2B]/50 transition-all"
              >
                One Piece
              </button>

              {/* Accessories */}
              <button
                onClick={() => handleNavCategory('Accessories')}
                className="px-3 py-2 rounded-lg text-sm font-medium text-[#F5F5F7] hover:text-[#D9B45B] hover:bg-[#171C2B]/50 transition-all"
              >
                Accessories
              </button>

              {/* News / Guides */}
              <button
                onClick={() => navigate('news')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentRoute === 'news' 
                    ? 'text-[#D9B45B] bg-[#171C2B]' 
                    : 'text-[#F5F5F7] hover:text-[#D9B45B] hover:bg-[#171C2B]/50'
                }`}
              >
                News & Guides
              </button>
            </nav>

            {/* Search Bar & Action Buttons */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              
              {/* Search Bar (Expandable on desktop) */}
              <div className="relative" ref={searchRef}>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search cards, sets, codes..."
                    className="w-36 sm:w-56 md:w-64 bg-[#111522] border border-[#282E40] rounded-xl pl-9 pr-4 py-2 text-xs text-[#F5F5F7] placeholder-[#656D82] focus:outline-none focus:border-[#D9B45B] focus:ring-1 focus:ring-[#D9B45B] transition-all"
                  />
                  <Search className="w-4 h-4 text-[#656D82] absolute left-3 pointer-events-none" />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 text-[#656D82] hover:text-white text-xs"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* Live Search Results Dropdown */}
                {searchOpen && searchResults.length > 0 && (
                  <div className="absolute right-0 top-full mt-2 w-72 sm:w-96 bg-[#111522] border border-[#282E40] rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="p-3 bg-[#171C2B] border-b border-[#282E40] flex justify-between items-center">
                      <span className="text-xs font-bold text-[#9CA3B5] uppercase tracking-wider">Matching Products ({searchResults.length})</span>
                      <span className="text-[10px] text-[#D9B45B]">Press item to view</span>
                    </div>
                    <div className="max-h-80 overflow-y-auto divide-y divide-[#282E40]">
                      {searchResults.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => handleSelectProduct(product.id)}
                          className="p-3 hover:bg-[#171C2B] cursor-pointer flex items-center space-x-3 transition-colors group"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-16 object-contain rounded bg-[#090B12]/80 border border-[#282E40] p-0.5 group-hover:scale-105 transition-transform"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-semibold text-[#F5F5F7] truncate group-hover:text-[#D9B45B] transition-colors">
                              {product.name}
                            </div>
                            <div className="flex items-center space-x-2 text-[10px] text-[#9CA3B5] mt-0.5">
                              <span>{product.tcgSeries}</span>
                              <span>•</span>
                              <span className="text-[#D9B45B]">{product.rarity}</span>
                            </div>
                            <div className="text-xs font-bold text-white mt-1">
                              ${product.price.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Wishlist Icon */}
              <button
                onClick={() => navigate('wishlist')}
                className="p-2 sm:p-2.5 rounded-xl bg-[#111522] border border-[#282E40] text-[#9CA3B5] hover:text-[#F43F5E] hover:border-[#F43F5E]/40 transition-colors relative cursor-pointer"
                title="Wishlist"
              >
                <Heart className={`w-4 h-4 ${wishlist.length > 0 ? 'fill-[#F43F5E] text-[#F43F5E]' : ''}`} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#F43F5E] text-white text-[10px] font-bold flex items-center justify-center shadow-lg">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Shopping Cart Icon */}
              <button
                onClick={() => navigate('cart')}
                className="p-2 sm:p-2.5 rounded-xl bg-[#111522] border border-[#282E40] text-[#9CA3B5] hover:text-[#D9B45B] hover:border-[#D9B45B]/40 transition-colors relative cursor-pointer"
                title="Shopping Cart"
              >
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#D9B45B] text-[#090B12] text-[10px] font-black flex items-center justify-center shadow-gold-glow">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User Account Dropdown */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="p-2 sm:p-2.5 rounded-xl bg-[#111522] border border-[#282E40] text-[#9CA3B5] hover:text-[#8957E5] hover:border-[#8957E5]/40 transition-colors cursor-pointer flex items-center"
                  title="My Account"
                >
                  <User className="w-4 h-4" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-[#111522] border border-[#282E40] rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in duration-150">
                    <div className="px-3 py-2 border-b border-[#282E40] mb-1">
                      <div className="text-xs font-bold text-white">{user.name}</div>
                      <div className="text-[10px] text-[#D9B45B] font-semibold">{user.tier}</div>
                    </div>
                    <button
                      onClick={() => { setUserMenuOpen(false); navigate('profile'); }}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs text-[#9CA3B5] hover:text-white hover:bg-[#171C2B] transition-colors"
                    >
                      User Profile
                    </button>
                    <button
                      onClick={() => { setUserMenuOpen(false); navigate('orders'); }}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs text-[#9CA3B5] hover:text-white hover:bg-[#171C2B] transition-colors"
                    >
                      Order History (Demo)
                    </button>
                    <button
                      onClick={() => { setUserMenuOpen(false); navigate('wishlist'); }}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs text-[#9CA3B5] hover:text-white hover:bg-[#171C2B] transition-colors"
                    >
                      My Wishlist ({wishlist.length})
                    </button>
                    <div className="my-1 border-t border-[#282E40]"></div>
                    <button
                      onClick={() => { setUserMenuOpen(false); navigate('admin'); }}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-[#8957E5] hover:bg-[#8957E5]/10 transition-colors flex items-center justify-between"
                    >
                      <span>Admin Dashboard</span>
                      <Sparkles className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => { setUserMenuOpen(false); navigate('login'); }}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs text-[#F43F5E] hover:bg-[#F43F5E]/10 transition-colors"
                    >
                      Sign In / Switch Account
                    </button>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#282E40] bg-[#090B12]/98 backdrop-blur-xl px-4 py-4 space-y-2">
            <button
              onClick={() => { navigate('home'); setMobileMenuOpen(false); }}
              className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-white hover:bg-[#171C2B]"
            >
              Home
            </button>
            <button
              onClick={() => { setCategoryFilter('All'); navigate('shop'); setMobileMenuOpen(false); }}
              className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-[#D9B45B] hover:bg-[#171C2B]"
            >
              Shop All Products
            </button>
            <button
              onClick={() => handleNavCategory('Yu-Gi-Oh!')}
              className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-white hover:bg-[#171C2B] flex items-center justify-between"
            >
              <span>Yu-Gi-Oh! TCG</span>
              <span className="text-xs text-[#9CA3B5]">Singles & Boxes</span>
            </button>
            <button
              onClick={() => handleNavCategory('Pokémon TCG')}
              className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-white hover:bg-[#171C2B] flex items-center justify-between"
            >
              <span>Pokémon TCG</span>
              <span className="text-xs text-[#9CA3B5]">151 & ETBs</span>
            </button>
            <button
              onClick={() => handleNavCategory('One Piece')}
              className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-white hover:bg-[#171C2B]"
            >
              One Piece Card Game
            </button>
            <button
              onClick={() => handleNavCategory('Accessories')}
              className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-white hover:bg-[#171C2B]"
            >
              Accessories & Binders
            </button>
            <button
              onClick={() => { navigate('news'); setMobileMenuOpen(false); }}
              className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-white hover:bg-[#171C2B]"
            >
              News & Collector Guides
            </button>
            <div className="pt-2 border-t border-[#282E40]">
              <button
                onClick={() => { navigate('admin'); setMobileMenuOpen(false); }}
                className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold text-[#8957E5] bg-[#8957E5]/10 flex items-center justify-between"
              >
                <span>Admin Dashboard Portal</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
