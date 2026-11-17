import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ShoppingBag, 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  Award, 
  HelpCircle, 
  Share2, 
  Eye, 
  Package, 
  Clock, 
  Layers,
  AlertCircle 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import ConditionGuideModal from '../components/ConditionGuideModal';
import { formatPrice } from '../utils/priceHelper';

export default function ProductDetail() {
  const { 
    selectedProductId, 
    navigate, 
    addToCart, 
    toggleWishlist, 
    isWishlisted,
    addToast 
  } = useStore();

  const product = products.find(p => p.id === selectedProductId) || products[0];
  const [activeImage, setActiveImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isConditionModalOpen, setIsConditionModalOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    setActiveImage(product.image);
    setQuantity(1);
  }, [product]);

  const wish = isWishlisted(product.id);

  // Related products from same series
  const relatedProducts = products
    .filter(p => p.id !== product.id && p.tcgSeries === product.tcgSeries)
    .slice(0, 4);

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('checkout');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast('Link Copied', 'Product link copied to clipboard.', 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Condition Guide Modal */}
      <ConditionGuideModal 
        isOpen={isConditionModalOpen} 
        onClose={() => setIsConditionModalOpen(false)} 
      />

      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('shop')}
          className="text-xs text-[#9CA3B5] hover:text-[#D9B45B] flex items-center space-x-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Shop</span>
        </button>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-[#111522] border border-[#282E40] text-[#9CA3B5] hover:text-white transition-colors cursor-pointer"
            title="Share Card"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Gallery & High-Res Card Zoom */}
        <div className="lg:col-span-6 space-y-4">
          <div 
            className="relative aspect-[3/4] max-h-[580px] w-full bg-[#111522] rounded-3xl border border-[#282E40] p-6 flex items-center justify-center overflow-hidden group cursor-crosshair"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
          >
            {/* Real Card High Res Image */}
            <img
              src={activeImage}
              alt={product.name}
              className={`max-h-full max-w-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)] transition-transform duration-300 ${
                isZoomed ? 'scale-125' : 'scale-100'
              }`}
            />

            {/* Badges on image */}
            <div className="absolute top-4 left-4 flex flex-col space-y-2 pointer-events-none">
              <span className="px-3 py-1 rounded-md bg-[#090B12]/90 border border-[#D9B45B]/60 text-[#D9B45B] text-[10px] font-black uppercase tracking-wider backdrop-blur-md shadow-lg">
                {product.tcgSeries}
              </span>
              {product.badge && (
                <span className="px-3 py-1 rounded-md bg-[#8957E5]/90 text-white text-[10px] font-black uppercase tracking-wider shadow-lg">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Hint overlay */}
            <div className="absolute bottom-4 right-4 px-2.5 py-1 rounded-lg bg-[#090B12]/80 border border-[#282E40] text-[10px] text-[#9CA3B5] pointer-events-none">
              Hover to Zoom 125%
            </div>
          </div>

          {/* Thumbnail Gallery (if multiple) */}
          {product.images && product.images.length > 1 && (
            <div className="flex items-center space-x-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-24 rounded-xl border p-1 bg-[#111522] overflow-hidden transition-all ${
                    activeImage === img
                      ? 'border-[#D9B45B] shadow-gold-glow scale-105'
                      : 'border-[#282E40] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}

          {/* Authenticity Guarantee Card */}
          <div className="p-4 rounded-2xl bg-[#171C2B] border border-[#282E40] flex items-center space-x-3 text-xs">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white">4-Point Authenticity Guarantee</div>
              <div className="text-[11px] text-[#9CA3B5]">
                Verified under microscope for rosette dots, core layer, surface gloss & official foil stamps.
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Card Details & Purchase Controls */}
        <div className="lg:col-span-6 space-y-6">
          
          <div>
            <div className="flex items-center space-x-2 text-xs text-[#9CA3B5] mb-1">
              <span className="font-mono text-[#D9B45B] font-bold">{product.productCode}</span>
              <span>•</span>
              <span className="text-white font-medium">{product.category}</span>
              <span>•</span>
              <span className="text-[#8957E5] font-semibold">{product.rarity}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight font-['Cinzel']">
              {product.name}
            </h1>

            {product.japaneseName && (
              <div className="text-xs text-[#9CA3B5] font-serif mt-1">
                Japanese: {product.japaneseName}
              </div>
            )}
          </div>

          {/* Price Box */}
          <div className="p-5 rounded-2xl bg-[#171C2B] border border-[#282E40] flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <div className="text-[10px] text-[#656D82] uppercase tracking-wider font-semibold flex items-center space-x-1.5">
                <span>{product.isPriceUnverified ? 'Giá tham khảo (Chưa xác minh thực tế)' : 'Giá niêm yết tham khảo (Mô phỏng)'}</span>
                {product.isPriceUnverified && (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40">
                    Chưa xác minh
                  </span>
                )}
              </div>
              <div className="flex items-baseline space-x-3 mt-1">
                <span className="text-3xl font-black text-white font-mono">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-[#656D82] line-through font-mono">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            <div className="text-right">
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${
                product.stock > 0
                  ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                  : 'bg-red-500/15 text-red-400 border-red-500/30'
              }`}>
                <Check className="w-3.5 h-3.5 mr-1" />
                {product.stock > 0 ? `Còn hàng (${product.stock} có sẵn)` : 'Tạm hết hàng'}
              </span>
              <div className="text-[10px] text-[#9CA3B5] mt-1">Đóng gói bọc giáp bảo vệ cao cấp</div>
            </div>

            {/* Holy Grail / High-Value Price Disclaimer Notice */}
            {product.isPriceUnverified && (
              <div className="w-full mt-2 pt-3 border-t border-[#282E40]/80 text-[11px] text-amber-300/90 bg-amber-500/10 border border-amber-500/20 px-3 py-2 rounded-xl flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-amber-400" />
                <span>{product.priceDisclaimer || 'Mức giá thẻ sưu tầm mang tính chất tham khảo ước tính, chưa xác thực theo giá giao dịch thị trường thực tế.'}</span>
              </div>
            )}
          </div>

          {/* Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[#111522] border border-[#282E40]">
              <div className="text-[10px] text-[#656D82] font-semibold uppercase">Condition</div>
              <div className="font-bold text-white mt-0.5">{product.condition}</div>
              <button 
                onClick={() => setIsConditionModalOpen(true)}
                className="text-[10px] text-[#D9B45B] hover:underline flex items-center space-x-0.5 mt-1 cursor-pointer"
              >
                <span>Grading scale</span>
                <HelpCircle className="w-2.5 h-2.5" />
              </button>
            </div>

            <div className="p-3 rounded-xl bg-[#111522] border border-[#282E40]">
              <div className="text-[10px] text-[#656D82] font-semibold uppercase">Language</div>
              <div className="font-bold text-white mt-0.5">{product.language}</div>
              <span className="text-[10px] text-[#9CA3B5]">Original Print</span>
            </div>

            <div className="p-3 rounded-xl bg-[#111522] border border-[#282E40]">
              <div className="text-[10px] text-[#656D82] font-semibold uppercase">Edition / Set</div>
              <div className="font-bold text-white mt-0.5 truncate">{product.edition || '1st Edition'}</div>
              <span className="text-[10px] text-[#9CA3B5]">Collector Release</span>
            </div>

            {product.atk !== undefined && (
              <div className="p-3 rounded-xl bg-[#111522] border border-[#282E40]">
                <div className="text-[10px] text-[#656D82] font-semibold uppercase">ATK / DEF</div>
                <div className="font-bold text-white mt-0.5">{product.atk} / {product.def}</div>
              </div>
            )}

            {product.hp && (
              <div className="p-3 rounded-xl bg-[#111522] border border-[#282E40]">
                <div className="text-[10px] text-[#656D82] font-semibold uppercase">HP / Stage</div>
                <div className="font-bold text-white mt-0.5">{product.hp} HP ({product.stage || 'Basic'})</div>
              </div>
            )}

            {product.power && (
              <div className="p-3 rounded-xl bg-[#111522] border border-[#282E40]">
                <div className="text-[10px] text-[#656D82] font-semibold uppercase">Power / Cost</div>
                <div className="font-bold text-white mt-0.5">{product.power} / {product.cost} Cost</div>
              </div>
            )}
          </div>

          {/* Action Buttons: Quantity, Add to Cart, Buy Now, Wishlist */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center space-x-3">
              {/* Quantity Adjuster */}
              <div className="flex items-center bg-[#111522] border border-[#282E40] rounded-xl px-3 py-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 text-base font-bold text-[#9CA3B5] hover:text-white"
                >
                  -
                </button>
                <span className="px-4 text-sm font-black text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-2 text-base font-bold text-[#9CA3B5] hover:text-white"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={() => addToCart(product, quantity)}
                className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#D9B45B] to-[#B3913E] text-[#090B12] font-black text-xs hover:brightness-110 shadow-gold-glow flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
                <span>ADD TO VAULT CART</span>
              </button>

              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3.5 rounded-xl border transition-colors cursor-pointer ${
                  wish 
                    ? 'bg-[#F43F5E]/15 border-[#F43F5E] text-[#F43F5E]' 
                    : 'bg-[#111522] border-[#282E40] text-[#9CA3B5] hover:text-white hover:border-[#D9B45B]'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-5 h-5 ${wish ? 'fill-[#F43F5E]' : ''}`} />
              </button>
            </div>

            {/* Buy Now Direct Button */}
            <button
              onClick={handleBuyNow}
              className="w-full py-3.5 rounded-xl bg-[#8957E5] hover:bg-[#A277EF] text-white font-black text-xs tracking-wider uppercase transition-all shadow-purple-glow cursor-pointer"
            >
              PROCEED TO DEMO CHECKOUT NOW
            </button>
          </div>

          {/* Collector Protection Bullet Points */}
          <div className="p-4 rounded-2xl bg-[#111522] border border-[#282E40] space-y-2 text-xs text-[#9CA3B5]">
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Miễn phí vận chuyển bảo hiểm cho đơn hàng từ {formatPrice(1500000)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Includes exact-fit sleeve & 35pt UV-filtering magnetic holder</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Tamper-evident sealed security sleeve for verification</span>
            </div>
          </div>

        </div>

      </div>

      {/* Tabs: Description / Specifications / Grading Protocol */}
      <div className="border-t border-[#282E40] pt-8">
        <div className="flex space-x-4 border-b border-[#282E40] pb-2">
          <button
            onClick={() => setActiveTab('description')}
            className={`pb-2 text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'description'
                ? 'text-[#D9B45B] border-b-2 border-[#D9B45B]'
                : 'text-[#9CA3B5] hover:text-white'
            }`}
          >
            Description & Card Lore
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-2 text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'specs'
                ? 'text-[#D9B45B] border-b-2 border-[#D9B45B]'
                : 'text-[#9CA3B5] hover:text-white'
            }`}
          >
            Technical Specifications
          </button>
          <button
            onClick={() => setActiveTab('packaging')}
            className={`pb-2 text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'packaging'
                ? 'text-[#D9B45B] border-b-2 border-[#D9B45B]'
                : 'text-[#9CA3B5] hover:text-white'
            }`}
          >
            Armored Packaging Guide
          </button>
        </div>

        <div className="py-6 text-xs text-[#9CA3B5] leading-relaxed max-w-3xl">
          {activeTab === 'description' && (
            <div className="space-y-4">
              <p className="text-sm text-white font-medium">
                {product.description}
              </p>
              <p>
                Each individual copy listed under this catalog code is physically checked by our grading team. Cards identified as Near Mint or Gem Mint are pulled straight into protective sleeves to avoid micro-scratches or foil clouding.
              </p>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-bold text-white block">Card Code:</span>
                  <span>{product.productCode}</span>
                </div>
                <div>
                  <span className="font-bold text-white block">TCG Franchise:</span>
                  <span>{product.tcgSeries}</span>
                </div>
                <div>
                  <span className="font-bold text-white block">Official Rarity:</span>
                  <span>{product.rarity}</span>
                </div>
                <div>
                  <span className="font-bold text-white block">Current Condition:</span>
                  <span>{product.condition}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'packaging' && (
            <div className="space-y-2">
              <p className="text-white font-bold">How this card will be packaged for delivery:</p>
              <ol className="list-decimal pl-4 space-y-1">
                <li>Placed into a Japanese exact-fit clear inner sleeve.</li>
                <li>Housed within an Ultra PRO 35pt UV-absorbing Magnetic One-Touch case.</li>
                <li>Sealed in a graded card team poly-bag to keep dust and moisture out.</li>
                <li>Sandwiched between two rigid corrugated cardboard armor pads.</li>
                <li>Shipped in a crush-proof bubble mailer or rigid box with tracking.</li>
              </ol>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-[#282E40] pt-12 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white font-['Cinzel']">
              Related {product.tcgSeries} Grails
            </h2>
            <button
              onClick={() => navigate('shop')}
              className="text-xs font-bold text-[#D9B45B] hover:underline"
            >
              Browse All →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
