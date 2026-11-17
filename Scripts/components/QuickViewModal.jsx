import React, { useState } from 'react';
import { X, ShoppingBag, Heart, ShieldCheck, Sparkles, Check, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function QuickViewModal() {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    toggleWishlist, 
    isWishlisted,
    navigate 
  } = useStore();

  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const wish = isWishlisted(product.id);

  const handleClose = () => {
    setQuickViewProduct(null);
    setQuantity(1);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleViewFullDetails = () => {
    handleClose();
    navigate(`product/${product.id}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-[#111522] border border-[#282E40] rounded-3xl shadow-2xl overflow-hidden text-[#F5F5F7]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[#171C2B] text-[#9CA3B5] hover:text-white hover:bg-[#282E40] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8">
          
          {/* Left: Product Image Showcase */}
          <div className="flex flex-col items-center justify-center bg-[#090B12] rounded-2xl border border-[#282E40] p-6 relative overflow-hidden group">
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#171C2B] border border-[#D9B45B]/40 text-[#D9B45B] text-[10px] font-bold uppercase tracking-wider">
              {product.tcgSeries}
            </div>

            <img
              src={product.image}
              alt={product.name}
              className="max-h-80 w-auto object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)] transition-transform duration-300 group-hover:scale-105"
            />

            <div className="mt-4 flex items-center space-x-2 text-xs text-[#9CA3B5]">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified Authentic Holographic Security Seal</span>
            </div>
          </div>

          {/* Right: Product Info & Actions */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center space-x-2 text-xs text-[#9CA3B5] mb-1">
                <span className="font-mono text-[#D9B45B]">{product.productCode}</span>
                <span>•</span>
                <span>{product.rarity}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                {product.name}
              </h2>

              {product.japaneseName && (
                <div className="text-xs text-[#9CA3B5] font-serif mt-0.5">
                  {product.japaneseName}
                </div>
              )}

              {/* Price */}
              <div className="mt-3 flex items-baseline space-x-3">
                <span className="text-2xl sm:text-3xl font-black text-white">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#656D82] line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase">
                  In Stock ({product.stock} left)
                </span>
              </div>

              {/* Condition & Spec Badges */}
              <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                <div className="p-2.5 rounded-xl bg-[#171C2B] border border-[#282E40]">
                  <span className="text-[10px] text-[#656D82] block uppercase font-semibold">Condition</span>
                  <span className="font-bold text-[#F5F5F7]">{product.condition}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#171C2B] border border-[#282E40]">
                  <span className="text-[10px] text-[#656D82] block uppercase font-semibold">Language</span>
                  <span className="font-bold text-[#F5F5F7]">{product.language}</span>
                </div>
              </div>

              {/* Short Description */}
              <p className="mt-3 text-xs text-[#9CA3B5] leading-relaxed line-clamp-3">
                {product.description}
              </p>
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-3 pt-3 border-t border-[#282E40]">
              <div className="flex items-center space-x-3">
                <div className="flex items-center bg-[#171C2B] border border-[#282E40] rounded-xl px-2 py-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2 py-1 text-sm font-bold text-[#9CA3B5] hover:text-white"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-2 py-1 text-sm font-bold text-[#9CA3B5] hover:text-white"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#D9B45B] to-[#B3913E] text-[#090B12] font-black text-xs hover:brightness-110 shadow-gold-glow flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
                  <span>Add To Vault Cart</span>
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3 rounded-xl border transition-colors cursor-pointer ${
                    wish 
                      ? 'bg-[#F43F5E]/15 border-[#F43F5E] text-[#F43F5E]' 
                      : 'bg-[#171C2B] border-[#282E40] text-[#9CA3B5] hover:text-white'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${wish ? 'fill-[#F43F5E]' : ''}`} />
                </button>
              </div>

              {/* View Full Product Details */}
              <button
                onClick={handleViewFullDetails}
                className="w-full py-2.5 rounded-xl bg-[#171C2B] hover:bg-[#1E2438] text-xs font-bold text-[#D9B45B] border border-[#282E40] flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
              >
                <span>View Full Collector Specifications & Grading</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
