import React from 'react';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Wishlist() {
  const { wishlist, addToCart, toggleWishlist, navigate } = useStore();

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  const handleMoveAllToCart = () => {
    wishlistedProducts.forEach(p => addToCart(p, 1));
  };

  if (wishlistedProducts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-[#171C2B] border border-[#282E40] flex items-center justify-center mx-auto text-[#656D82]">
          <Heart className="w-10 h-10 text-[#F43F5E]" />
        </div>
        <h2 className="text-2xl font-black text-white font-['Cinzel']">
          YOUR GRAIL WISHLIST IS EMPTY
        </h2>
        <p className="text-xs text-[#9CA3B5] max-w-md mx-auto leading-relaxed">
          Save your dream cards and chase booster boxes to track their availability and easily add them to your cart.
        </p>
        <button
          onClick={() => navigate('shop')}
          className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D9B45B] to-[#B3913E] text-[#090B12] font-black text-xs hover:brightness-110 shadow-gold-glow inline-flex items-center space-x-2 cursor-pointer"
        >
          <span>BROWSE TCG VAULT</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#282E40] pb-6">
        <div>
          <span className="text-xs font-bold text-[#F43F5E] uppercase tracking-wider">
            Saved Grails
          </span>
          <h1 className="text-3xl font-black text-white font-['Cinzel'] mt-1">
            MY WISHLIST ({wishlistedProducts.length} ITEMS)
          </h1>
        </div>

        <button
          onClick={handleMoveAllToCart}
          className="px-5 py-2.5 rounded-xl bg-[#171C2B] hover:bg-[#D9B45B] hover:text-[#090B12] text-[#D9B45B] border border-[#D9B45B]/40 font-bold text-xs transition-all flex items-center space-x-2 cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Move All to Cart</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

    </div>
  );
}
