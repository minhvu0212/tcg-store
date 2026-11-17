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
  List,
  CheckCircle2
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { products, tcgSeriesList, productTypes, rarities, conditions } from '../data/products';
import ProductCard from '../components/ProductCard';
import { formatPrice } from '../utils/priceHelper';

const MAX_CATALOG_PRICE = 55000000;

const PRICE_PRESETS = [
  { label: 'Tất cả mức giá', min: 0, max: MAX_CATALOG_PRICE },
  { label: 'Dưới 100.000 ₫', min: 0, max: 100000 },
  { label: '100.000 ₫ – 500.000 ₫', min: 100000, max: 500000 },
  { label: '500.000 ₫ – 2.000.000 ₫', min: 500000, max: 2000000 },
  { label: 'Trên 2.000.000 ₫ (Grail)', min: 2000000, max: MAX_CATALOG_PRICE }
];

export default function Shop() {
  const { categoryFilter, setCategoryFilter, navigate } = useStore();

  const [selectedSeries, setSelectedSeries] = useState(categoryFilter || 'All');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedRarity, setSelectedRarity] = useState('All Rarities');
  const [selectedCondition, setSelectedCondition] = useState('All Conditions');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [priceRange, setPriceRange] = useState(MAX_CATALOG_PRICE);
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync categoryFilter from context if changed from outside
  React.useEffect(() => {
    if (categoryFilter) {
      setSelectedSeries(categoryFilter);
    }
  }, [categoryFilter]);

  // Handle Preset Selection
  const handleSelectPreset = (index) => {
    setSelectedPreset(index);
    setPriceRange(PRICE_PRESETS[index].max);
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    const activePreset = PRICE_PRESETS[selectedPreset];

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
      // In-stock filter
      if (onlyInStock && item.stock <= 0) {
        return false;
      }
      // Preset Min Price filter
      if (activePreset && item.price < activePreset.min) {
        return false;
      }
      // Price Cap filter
      if (item.price > priceRange) {
        return false;
      }
      // Search query (name, code, series, description, japaneseName)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchJp = item.japaneseName ? item.japaneseName.toLowerCase().includes(q) : false;
        const matchCode = item.productCode ? item.productCode.toLowerCase().includes(q) : false;
        const matchDesc = item.description ? item.description.toLowerCase().includes(q) : false;
        if (!matchName && !matchJp && !matchCode && !matchDesc) return false;
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
          return (b.rating || 0) - (a.rating || 0);
        default:
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      }
    });
  }, [selectedSeries, selectedType, selectedRarity, selectedCondition, selectedLanguage, priceRange, selectedPreset, onlyInStock, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSelectedSeries('All');
    setCategoryFilter('All');
    setSelectedType('All Types');
    setSelectedRarity('All Rarities');
    setSelectedCondition('All Conditions');
    setSelectedLanguage('All');
    setSelectedPreset(0);
    setPriceRange(MAX_CATALOG_PRICE);
    setOnlyInStock(false);
    setSearchQuery('');
    setSortBy('featured');
  };

  const activeFiltersCount = [
    selectedSeries !== 'All',
    selectedType !== 'All Types',
    selectedRarity !== 'All Rarities',
    selectedCondition !== 'All Conditions',
    selectedLanguage !== 'All',
    selectedPreset !== 0,
    priceRange < MAX_CATALOG_PRICE,
    onlyInStock,
    searchQuery.trim().length > 0
  ].filter(Boolean).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Breadcrumb & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#282E40] pb-6">
        <div>
          <nav className="text-xs text-[#9CA3B5] mb-2 flex items-center space-x-2">
            <button onClick={() => navigate('home')} className="hover:text-white transition-colors cursor-pointer">Trang chủ</button>
            <span>/</span>
            <span className="text-[#D9B45B] font-semibold">Kho sản phẩm TCG</span>
            {selectedSeries !== 'All' && (
              <>
                <span>/</span>
                <span className="text-white font-semibold">{selectedSeries}</span>
              </>
            )}
          </nav>
          <h1 className="text-3xl font-black text-white font-['Cinzel'] tracking-tight">
            {selectedSeries === 'All' ? 'TẤT CẢ SẢN PHẨM TCG' : `BỘ SƯU TẬP ${selectedSeries.toUpperCase()}`}
          </h1>
          <p className="text-xs text-[#9CA3B5] mt-1">
            Hiển thị <span className="text-white font-bold font-mono">{filteredProducts.length}</span> sản phẩm chính hãng (Tổng kho {products.length} sản phẩm).
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
              placeholder="Tìm theo tên thẻ, mã số..."
              className="w-48 sm:w-64 bg-[#111522] border border-[#282E40] rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-[#656D82] focus:outline-none focus:border-[#D9B45B]"
            />
            <Search className="w-3.5 h-3.5 text-[#656D82] absolute left-3 top-2.5" />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2 text-[#656D82] hover:text-white text-xs cursor-pointer"
              >
                ×
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center space-x-2 bg-[#111522] border border-[#282E40] rounded-xl px-3 py-1.5">
            <span className="text-[11px] text-[#656D82] font-semibold whitespace-nowrap">Sắp xếp:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs text-white font-medium focus:outline-none cursor-pointer"
            >
              <option value="featured" className="bg-[#111522] text-white">Nổi bật nhất</option>
              <option value="newest" className="bg-[#111522] text-white">Mới cập bến</option>
              <option value="bestselling" className="bg-[#111522] text-white">Bán chạy nhất</option>
              <option value="price-asc" className="bg-[#111522] text-white">Giá: Thấp đến Cao</option>
              <option value="price-desc" className="bg-[#111522] text-white">Giá: Cao đến Thấp (Grails)</option>
              <option value="rating" className="bg-[#111522] text-white">Đánh giá cao</option>
            </select>
          </div>

          {/* Mobile Filter Toggle Button */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden px-3.5 py-2 rounded-xl bg-[#171C2B] border border-[#282E40] text-xs font-bold text-white flex items-center space-x-1.5 cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#D9B45B]" />
            <span>Bộ lọc ({activeFiltersCount})</span>
          </button>
        </div>
      </div>

      {/* Active Filter Tags */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-[#9CA3B5] mr-1">Đang lọc:</span>
          {selectedSeries !== 'All' && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs bg-[#171C2B] border border-[#D9B45B]/40 text-[#D9B45B] font-semibold">
              Dòng: {selectedSeries}
              <button onClick={() => { setSelectedSeries('All'); setCategoryFilter('All'); }} className="ml-1.5 hover:text-white cursor-pointer">×</button>
            </span>
          )}
          {selectedType !== 'All Types' && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs bg-[#171C2B] border border-[#282E40] text-white font-semibold">
              Loại: {selectedType}
              <button onClick={() => setSelectedType('All Types')} className="ml-1.5 text-[#9CA3B5] hover:text-white cursor-pointer">×</button>
            </span>
          )}
          {selectedPreset !== 0 && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs bg-[#171C2B] border border-[#282E40] text-emerald-400 font-semibold">
              Khoảng giá: {PRICE_PRESETS[selectedPreset].label}
              <button onClick={() => handleSelectPreset(0)} className="ml-1.5 text-[#9CA3B5] hover:text-white cursor-pointer">×</button>
            </span>
          )}
          {priceRange < MAX_CATALOG_PRICE && selectedPreset === 0 && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs bg-[#171C2B] border border-[#282E40] text-white font-semibold">
              Giá tối đa: {formatPrice(priceRange)}
              <button onClick={() => setPriceRange(MAX_CATALOG_PRICE)} className="ml-1.5 text-[#9CA3B5] hover:text-white cursor-pointer">×</button>
            </span>
          )}
          {selectedRarity !== 'All Rarities' && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs bg-[#171C2B] border border-[#282E40] text-white font-semibold">
              Độ hiếm: {selectedRarity}
              <button onClick={() => setSelectedRarity('All Rarities')} className="ml-1.5 text-[#9CA3B5] hover:text-white cursor-pointer">×</button>
            </span>
          )}
          {onlyInStock && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold">
              Chỉ hàng có sẵn
              <button onClick={() => setOnlyInStock(false)} className="ml-1.5 hover:text-white cursor-pointer">×</button>
            </span>
          )}
          <button
            onClick={handleResetFilters}
            className="text-xs font-bold text-[#F43F5E] hover:underline ml-2 flex items-center space-x-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Xóa tất cả</span>
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
            <h3 className="font-bold text-sm text-white">Bộ lọc sản phẩm</h3>
            <button onClick={() => setMobileFilterOpen(false)} className="text-[#9CA3B5] cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 1. TCG Series Filter */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-l-2 border-[#D9B45B] pl-2">
              Dòng Game TCG
            </h4>
            <div className="space-y-1.5">
              {tcgSeriesList.map((series) => (
                <button
                  key={series}
                  onClick={() => {
                    setSelectedSeries(series);
                    setCategoryFilter(series);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                    selectedSeries === series
                      ? 'bg-gradient-to-r from-[#D9B45B] to-[#B3913E] text-[#090B12] shadow-gold-glow'
                      : 'text-[#9CA3B5] hover:text-white hover:bg-[#171C2B]'
                  }`}
                >
                  <span>{series === 'All' ? 'Tất cả các dòng' : series}</span>
                  {selectedSeries === series && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Product Type Filter */}
          <div className="space-y-3 pt-4 border-t border-[#282E40]">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-l-2 border-[#8957E5] pl-2">
              Phân loại sản phẩm
            </h4>
            <div className="space-y-1">
              {productTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer ${
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

          {/* 3. Price Preset Brackets & Slider */}
          <div className="space-y-3 pt-4 border-t border-[#282E40]">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider border-l-2 border-[#438DFF] pl-2">
                Phân khúc giá (VNĐ)
              </h4>
              <span className="text-xs font-black text-[#D9B45B] font-mono">
                {formatPrice(priceRange)}
              </span>
            </div>

            {/* Presets List */}
            <div className="space-y-1">
              {PRICE_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectPreset(idx)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-colors flex items-center justify-between cursor-pointer ${
                    selectedPreset === idx
                      ? 'text-[#438DFF] font-bold bg-[#438DFF]/15 border border-[#438DFF]/30'
                      : 'text-[#9CA3B5] hover:text-white hover:bg-[#171C2B]'
                  }`}
                >
                  <span>{preset.label}</span>
                  {selectedPreset === idx && <Check className="w-3 h-3" />}
                </button>
              ))}
            </div>

            {/* Slider */}
            <div className="pt-2">
              <input
                type="range"
                min="30000"
                max={MAX_CATALOG_PRICE}
                step="500000"
                value={priceRange}
                onChange={(e) => {
                  setPriceRange(Number(e.target.value));
                  setSelectedPreset(0);
                }}
                className="w-full accent-[#D9B45B] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#656D82] font-mono">
                <span>30k ₫</span>
                <span>25tr ₫</span>
                <span>55tr+ ₫</span>
              </div>
            </div>
          </div>

          {/* 4. In-Stock Filter Toggle */}
          <div className="pt-4 border-t border-[#282E40]">
            <label className="flex items-center space-x-2.5 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="accent-[#10B981] w-4 h-4 rounded cursor-pointer"
              />
              <span className="text-white font-medium">Chỉ hiện sản phẩm còn hàng</span>
            </label>
          </div>

          {/* 5. Rarity Grade Filter */}
          <div className="space-y-3 pt-4 border-t border-[#282E40]">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-l-2 border-[#10B981] pl-2">
              Độ hiếm thẻ (Rarity)
            </h4>
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              {rarities.map((r) => (
                <button
                  key={r}
                  onClick={() => setSelectedRarity(r)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer ${
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

          {/* 6. Condition Filter */}
          <div className="space-y-3 pt-4 border-t border-[#282E40]">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-l-2 border-amber-500 pl-2">
              Tình trạng thẻ (Condition)
            </h4>
            <div className="space-y-1">
              {conditions.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCondition(c)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer ${
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
            className="w-full py-2.5 rounded-xl bg-[#171C2B] hover:bg-[#1E2438] text-xs font-bold text-[#F43F5E] border border-[#282E40] transition-colors flex items-center justify-center space-x-2 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Xóa tất cả bộ lọc</span>
          </button>

        </aside>

        {/* PRODUCT GRID (3 columns on desktop, responsive) */}
        <main className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-[#111522] border border-[#282E40] space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-[#171C2B] border border-[#282E40] flex items-center justify-center mx-auto text-[#656D82]">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white">Không tìm thấy sản phẩm phù hợp</h3>
              <p className="text-xs text-[#9CA3B5] max-w-md mx-auto">
                Không có thẻ bài hoặc sản phẩm nào khớp với bộ lọc hiện tại. Hãy thử mở rộng khoảng giá hoặc chọn phân loại khác.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-xl bg-[#D9B45B] text-[#090B12] font-black text-xs hover:brightness-110 shadow-gold-glow cursor-pointer"
              >
                Đặt lại bộ lọc
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
