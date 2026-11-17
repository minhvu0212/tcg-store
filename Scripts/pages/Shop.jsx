import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  SlidersHorizontal, 
  X, 
  ChevronDown, 
  Search, 
  Sparkles, 
  RotateCcw,
  Check,
  Grid,
  List
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { products, tcgSeriesList, productTypes, rarities, conditions } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Shop() {
  const { categoryFilter, setCategoryFilter, navigate } = useStore();

  const [selectedSeries, setSelectedSeries] = useState(categoryFilter || 'All');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedRarity, setSelectedRarity] = useState('All Rarities');
  const [selectedCondition, setSelectedCondition] = useState('All Conditions');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [priceRange, setPriceRange] = useState(3000);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync categoryFilter from context if changed from outside
  React.useEffect(() => {
    if (categoryFilter) {
      setSelectedSeries(categoryFilter);
    }
  }, [categoryFilter]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Series filter
      if (selectedSeries !== 'All' && item.tcgSeries !== selectedSeries) {
        return false;
      }
      // Type filter
      if (selectedType !== 'All Types' && item.category !== selectedType) {
        return false;
      }
      // Rarity filter
      if (selectedRarity !== 'All Rarities' && !item.rarity.includes(selectedRarity)) {
        return false;
      }
      // Condition filter
      if (selectedCondition !== 'All Conditions' && item.condition !== selectedCondition) {
        return false;
      }
      // Language filter
      if (selectedLanguage !== 'All' && item.language !== selectedLanguage) {
        return false;
      }
      // Price filter
      if (item.price > priceRange) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchCode = item.productCode.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        if (!matchName && !matchCode && !matchDesc) return false;
      }
      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'newest':
          return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        case 'bestselling':
          return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
        case 'rating':
          return b.rating - a.rating;
        default:
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      }
    });
  }, [selectedSeries, selectedType, selectedRarity, selectedCondition, selectedLanguage, priceRange, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSelectedSeries('All');
    setCategoryFilter('All');
    setSelectedType('All Types');
    setSelectedRarity('All Rarities');
    setSelectedCondition('All Conditions');
    setSelectedLanguage('All');
    setPriceRange(3000);
    setSearchQuery('');
    setSortBy('featured');
  };

  const activeFiltersCount = [
    selectedSeries !== 'All',
    selectedType !== 'All Types',
    selectedRarity !== 'All Rarities',
    selectedCondition !== 'All Conditions',
    selectedLanguage !== 'All',
    priceRange < 3000,
    searchQuery.trim().length > 0
  ].filter(Boolean).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Breadcrumb & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#282E40] pb-6">
        <div>
          <nav className="text-xs text-[#9CA3B5] mb-2 flex items-center space-x-2">
            <button onClick={() => navigate('home')} className="hover:text-white transition-colors">Home</button>
            <span>/</span>
            <span className="text-[#D9B45B] font-semibold">Shop Products</span>
            {selectedSeries !== 'All' && (
              <>
                <span>/</span>
                <span className="text-white font-semibold">{selectedSeries}</span>
              </>
            )}
          </nav>
          <h1 className="text-3xl font-black text-white font-['Cinzel'] tracking-tight">
            {selectedSeries === 'All' ? 'ALL TCG PRODUCTS' : `${selectedSeries.toUpperCase()} COLLECTION`}
          </h1>
          <p className="text-xs text-[#9CA3B5] mt-1">
            Displaying {filteredProducts.length} authentic verified trading card items.
          </p>
        </div>

        {/* Top Controls: Search & Sort & Mobile Filter Toggle */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Shop Search */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter within shop..."
              className="w-48 sm:w-60 bg-[#111522] border border-[#282E40] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-[#656D82] focus:outline-none focus:border-[#D9B45B]"
            />
            <Search className="w-3.5 h-3.5 text-[#656D82] absolute left-3 top-2.5" />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2 text-[#656D82] hover:text-white text-xs"
              >
                ×
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center space-x-2 bg-[#111522] border border-[#282E40] rounded-xl px-3 py-1.5">
            <span className="text-[11px] text-[#656D82] font-semibold whitespace-nowrap">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs text-white font-medium focus:outline-none cursor-pointer"
            >
              <option value="featured" className="bg-[#111522] text-white">Featured</option>
              <option value="newest" className="bg-[#111522] text-white">Newest Arrivals</option>
              <option value="bestselling" className="bg-[#111522] text-white">Best Selling</option>
              <option value="price-asc" className="bg-[#111522] text-white">Price: Low to High</option>
              <option value="price-desc" className="bg-[#111522] text-white">Price: High to Low</option>
              <option value="rating" className="bg-[#111522] text-white">Highest Rated</option>
            </select>
          </div>

          {/* Mobile Filter Toggle Button */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden px-3.5 py-2 rounded-xl bg-[#171C2B] border border-[#282E40] text-xs font-bold text-white flex items-center space-x-1.5"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#D9B45B]" />
            <span>Filters ({activeFiltersCount})</span>
          </button>
        </div>
      </div>

      {/* Active Filter Tags */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-[#9CA3B5] mr-1">Active Filters:</span>
          {selectedSeries !== 'All' && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs bg-[#171C2B] border border-[#D9B45B]/40 text-[#D9B45B] font-semibold">
              Series: {selectedSeries}
              <button onClick={() => { setSelectedSeries('All'); setCategoryFilter('All'); }} className="ml-1.5 hover:text-white">×</button>
            </span>
          )}
          {selectedType !== 'All Types' && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs bg-[#171C2B] border border-[#282E40] text-white font-semibold">
              Type: {selectedType}
              <button onClick={() => setSelectedType('All Types')} className="ml-1.5 text-[#9CA3B5] hover:text-white">×</button>
            </span>
          )}
          {selectedRarity !== 'All Rarities' && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs bg-[#171C2B] border border-[#282E40] text-white font-semibold">
              Rarity: {selectedRarity}
              <button onClick={() => setSelectedRarity('All Rarities')} className="ml-1.5 text-[#9CA3B5] hover:text-white">×</button>
            </span>
          )}
          {priceRange < 3000 && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs bg-[#171C2B] border border-[#282E40] text-white font-semibold">
              Max Price: ${priceRange}
              <button onClick={() => setPriceRange(3000)} className="ml-1.5 text-[#9CA3B5] hover:text-white">×</button>
            </span>
          )}
          <button
            onClick={handleResetFilters}
            className="text-xs font-bold text-[#F43F5E] hover:underline ml-2 flex items-center space-x-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        </div>
      )}

      {/* Main Content Layout: Sidebar + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* SIDEBAR FILTERS (Desktop + Mobile slide-over) */}
        <aside 
          className={`lg:col-span-1 bg-[#111522] rounded-3xl border border-[#282E40] p-6 space-y-6 ${
            mobileFilterOpen 
              ? 'block fixed inset-y-0 left-0 z-50 w-80 overflow-y-auto shadow-2xl bg-[#111522]' 
              : 'hidden lg:block'
          }`}
        >
          {/* Mobile header */}
          <div className="flex items-center justify-between lg:hidden pb-4 border-b border-[#282E40]">
            <h3 className="font-bold text-sm text-white">Filter Products</h3>
            <button onClick={() => setMobileFilterOpen(false)} className="text-[#9CA3B5]">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 1. TCG Series Filter */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-l-2 border-[#D9B45B] pl-2">
              TCG Series
            </h4>
            <div className="space-y-1.5">
              {tcgSeriesList.map((series) => (
                <button
                  key={series}
                  onClick={() => {
                    setSelectedSeries(series);
                    setCategoryFilter(series);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                    selectedSeries === series
                      ? 'bg-gradient-to-r from-[#D9B45B] to-[#B3913E] text-[#090B12] shadow-gold-glow'
                      : 'text-[#9CA3B5] hover:text-white hover:bg-[#171C2B]'
                  }`}
                >
                  <span>{series === 'All' ? 'All Franchises' : series}</span>
                  {selectedSeries === series && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Product Type Filter */}
          <div className="space-y-3 pt-4 border-t border-[#282E40]">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-l-2 border-[#8957E5] pl-2">
              Product Type
            </h4>
            <div className="space-y-1">
              {productTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                    selectedType === type
                      ? 'text-[#8957E5] font-bold bg-[#8957E5]/10'
                      : 'text-[#9CA3B5] hover:text-white'
                  }`}
                >
                  <span>{type}</span>
                  {selectedType === type && <Check className="w-3 h-3" />}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Price Range Slider */}
          <div className="space-y-3 pt-4 border-t border-[#282E40]">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider border-l-2 border-[#438DFF] pl-2">
                Price Cap
              </h4>
              <span className="text-xs font-black text-[#D9B45B] font-mono">
                ${priceRange.toFixed(0)}
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="3000"
              step="20"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-[#D9B45B] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#656D82] font-mono">
              <span>$10</span>
              <span>$1500</span>
              <span>$3000+</span>
            </div>
          </div>

          {/* 4. Rarity Filter */}
          <div className="space-y-3 pt-4 border-t border-[#282E40]">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-l-2 border-[#10B981] pl-2">
              Rarity Grade
            </h4>
            <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
              {rarities.map((r) => (
                <button
                  key={r}
                  onClick={() => setSelectedRarity(r)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                    selectedRarity === r
                      ? 'text-emerald-400 font-bold bg-emerald-400/10'
                      : 'text-[#9CA3B5] hover:text-white'
                  }`}
                >
                  <span className="truncate">{r}</span>
                  {selectedRarity === r && <Check className="w-3 h-3 flex-shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Condition Filter */}
          <div className="space-y-3 pt-4 border-t border-[#282E40]">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-l-2 border-amber-500 pl-2">
              Condition
            </h4>
            <div className="space-y-1">
              {conditions.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCondition(c)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                    selectedCondition === c
                      ? 'text-amber-400 font-bold bg-amber-400/10'
                      : 'text-[#9CA3B5] hover:text-white'
                  }`}
                >
                  <span className="truncate">{c}</span>
                  {selectedCondition === c && <Check className="w-3 h-3" />}
                </button>
              ))}
            </div>
          </div>

          {/* Reset button inside sidebar */}
          <button
            onClick={handleResetFilters}
            className="w-full py-2.5 rounded-xl bg-[#171C2B] hover:bg-[#1E2438] text-xs font-bold text-[#F43F5E] border border-[#282E40] transition-colors flex items-center justify-center space-x-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>

        </aside>

        {/* PRODUCT GRID (3 columns on desktop, responsive) */}
        <main className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-[#111522] border border-[#282E40] space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-[#171C2B] border border-[#282E40] flex items-center justify-center mx-auto text-[#656D82]">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white">No Trading Cards Found</h3>
              <p className="text-xs text-[#9CA3B5] max-w-md mx-auto">
                No products match your selected filters. Try broadening your criteria or reset the filters below.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-xl bg-[#D9B45B] text-[#090B12] font-black text-xs hover:brightness-110 shadow-gold-glow"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>

      </div>
    </div>
  );
}
