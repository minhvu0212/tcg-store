import React from 'react';
import { Eye, Heart, ShoppingBag, Sparkles, Star } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function ProductCard({ product }) {
  const { navigate, addToCart, toggleWishlist, isWishlisted, setQuickViewProduct } = useStore();

  const wish = isWishlisted(product.id);

  const getSeriesColor = (series) => {
    switch (series) {
      case 'Yu-Gi-Oh!':
        return 'text-[#D9B45B] border-[#D9B45B]/30 bg-[#D9B45B]/10';
      case 'Pokémon TCG':
        return 'text-[#8957E5] border-[#8957E5]/30 bg-[#8957E5]/10';
      case 'One Piece':
        return 'text-[#F43F5E] border-[#F43F5E]/30 bg-[#F43F5E]/10';
      default:
        return 'text-[#438DFF] border-[#438DFF]/30 bg-[#438DFF]/10';
    }
  };

  return (
    <div 
      className="group relative bg-[#171C2B] rounded-2xl border border-[#282E40] hover:border-[#D9B45B]/60 p-3.5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover overflow-hidden"
    >
      {/* Subtle top ambient glow on hover */}
      <div className="absolute -top-12 -right-12 w-28 h-28 bg-[#8957E5]/10 rounded-full blur-2xl group-hover:bg-[#D9B45B]/15 transition-all pointer-events-none"></div>

      <div>
        {/* Top Badges & Actions */}
        <div className="flex items-center justify-between mb-2.5 z-10 relative">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-wider ${getSeriesColor(product.tcgSeries)}`}>
            {product.tcgSeries}
          </span>

          <div className="flex items-center space-x-1">
            {/* Quick View Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setQuickViewProduct(product);
              }}
              className="p-1.5 rounded-lg bg-[#111522]/80 border border-[#282E40] text-[#9CA3B5] hover:text-white hover:border-[#D9B45B] transition-colors cursor-pointer"
              title="Quick Preview"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(product);
              }}
              className={`p-1.5 rounded-lg bg-[#111522]/80 border transition-colors cursor-pointer ${
                wish 
                  ? 'border-[#F43F5E]/60 text-[#F43F5E]' 
                  : 'border-[#282E40] text-[#9CA3B5] hover:text-[#F43F5E]'
              }`}
              title="Save to Wishlist"
            >
              <Heart className={`w-3.5 h-3.5 ${wish ? 'fill-[#F43F5E]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Product Image Showcase */}
        <div 
          onClick={() => navigate(`product/${product.id}`)}
          className="relative aspect-[3/4] w-full rounded-xl bg-[#090B12]/80 border border-[#282E40]/60 p-2 flex items-center justify-center cursor-pointer overflow-hidden group/img"
        >
          {/* Card Image */}
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] group-hover/img:scale-105 transition-transform duration-300"
          />

          {/* Condition / Badge tag */}
          {product.badge && (
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#090B12]/85 border border-[#D9B45B]/40 text-[#D9B45B] text-[9px] font-black tracking-wider uppercase backdrop-blur-sm shadow-md">
              {product.badge}
            </div>
          )}

          {/* Holographic light reflection on hover */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
        </div>

        {/* Product Meta & Title */}
        <div className="mt-3.5 space-y-1">
          <div className="flex items-center justify-between text-[11px] text-[#9CA3B5]">
            <span className="font-mono text-[#656D82]">{product.productCode}</span>
            <span className="text-[#D9B45B] font-medium truncate max-w-[120px]">{product.rarity}</span>
          </div>

          <h3 
            onClick={() => navigate(`product/${product.id}`)}
            className="font-bold text-sm text-[#F5F5F7] hover:text-[#D9B45B] transition-colors cursor-pointer line-clamp-1 leading-snug"
            title={product.name}
          >
            {product.name}
          </h3>

          <div className="flex items-center space-x-1.5 text-[11px] text-[#9CA3B5]">
            <span className="text-emerald-400 font-semibold">{product.condition}</span>
            <span>•</span>
            <span>{product.language}</span>
          </div>
        </div>
      </div>

      {/* Pricing & Add to Cart Footer */}
      <div className="mt-4 pt-3 border-t border-[#282E40]/80 flex items-center justify-between">
        <div>
          <div className="text-[10px] text-[#656D82] uppercase tracking-wider font-semibold">Demo Price</div>
          <div className="flex items-baseline space-x-2">
            <span className="font-black text-base text-white">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#656D82] line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Quick Add Button */}
        <button
          onClick={() => addToCart(product, 1)}
          className="px-3 py-2 rounded-xl bg-gradient-to-r from-[#D9B45B] to-[#B3913E] text-[#090B12] font-black text-xs hover:brightness-110 hover:shadow-gold-glow transition-all flex items-center space-x-1.5 cursor-pointer"
        >
          <ShoppingBag className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Add</span>
        </button>
      </div>
    </div>
  );
}
