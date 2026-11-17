import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Trash2, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Tag, 
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Cart() {
  const { 
    cart, 
    cartTotal, 
    removeFromCart, 
    updateCartQuantity, 
    clearCart, 
    navigate,
    addToast 
  } = useStore();

  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'LEGEND10') {
      setDiscountPercent(10);
      addToast('Coupon Applied', '10% discount applied to your demo order!', 'gold');
    } else if (couponCode.toUpperCase() === 'TCG2026') {
      setDiscountPercent(15);
      addToast('Coupon Applied', '15% VIP Collector discount applied!', 'gold');
    } else {
      addToast('Invalid Coupon', 'Try code "LEGEND10" or "TCG2026" for demo discount.', 'error');
    }
  };

  const shippingCost = cartTotal > 150 ? 0 : (cart.length > 0 ? 9.99 : 0);
  const discountAmount = (cartTotal * discountPercent) / 100;
  const finalTotal = Math.max(0, cartTotal - discountAmount + shippingCost);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-[#171C2B] border border-[#282E40] flex items-center justify-center mx-auto text-[#656D82]">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-white font-['Cinzel']">
          YOUR VAULT CART IS EMPTY
        </h2>
        <p className="text-xs text-[#9CA3B5] max-w-md mx-auto leading-relaxed">
          You haven't added any trading card grails or accessories to your cart yet. Explore our authentic singles and factory sealed boxes to begin your collection.
        </p>
        <button
          onClick={() => navigate('shop')}
          className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D9B45B] to-[#B3913E] text-[#090B12] font-black text-xs hover:brightness-110 shadow-gold-glow inline-flex items-center space-x-2 cursor-pointer"
        >
          <span>EXPLORE TCG PRODUCTS</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#282E40] pb-6">
        <div>
          <button 
            onClick={() => navigate('shop')}
            className="text-xs text-[#9CA3B5] hover:text-white flex items-center space-x-1 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </button>
          <h1 className="text-3xl font-black text-white font-['Cinzel']">
            YOUR VAULT CART ({cart.length} ITEMS)
          </h1>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-[#F43F5E] hover:underline self-start sm:self-auto flex items-center space-x-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear All Items</span>
        </button>
      </div>

      {/* Main Grid: Cart Items List + Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="divide-y divide-[#282E40] rounded-3xl bg-[#111522] border border-[#282E40] overflow-hidden">
            {cart.map(({ product, quantity }) => (
              <div 
                key={product.id} 
                className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#171C2B]/40 transition-colors"
              >
                {/* Product thumbnail & basic info */}
                <div 
                  onClick={() => navigate(`product/${product.id}`)}
                  className="flex items-center space-x-4 cursor-pointer group"
                >
                  <div className="w-20 h-24 rounded-xl bg-[#090B12] border border-[#282E40] p-1 flex items-center justify-center flex-shrink-0 group-hover:border-[#D9B45B] transition-colors">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="max-h-full max-w-full object-contain filter drop-shadow-md"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[#D9B45B] font-bold block">
                      {product.productCode} • {product.tcgSeries}
                    </span>
                    <h3 className="font-bold text-sm text-white group-hover:text-[#D9B45B] transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <div className="text-[11px] text-[#9CA3B5]">
                      Condition: <span className="text-white font-medium">{product.condition}</span>
                    </div>
                    <div className="text-xs font-black text-[#D9B45B] sm:hidden">
                      ${product.price.toFixed(2)} each
                    </div>
                  </div>
                </div>

                {/* Quantity, Subtotal, Delete */}
                <div className="flex items-center justify-between sm:justify-end space-x-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#282E40]">
                  {/* Quantity controller */}
                  <div className="flex items-center bg-[#171C2B] border border-[#282E40] rounded-xl px-2 py-1">
                    <button
                      onClick={() => updateCartQuantity(product.id, quantity - 1)}
                      className="px-2 py-0.5 text-sm font-bold text-[#9CA3B5] hover:text-white"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-bold text-white">{quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(product.id, Math.min(product.stock, quantity + 1))}
                      className="px-2 py-0.5 text-sm font-bold text-[#9CA3B5] hover:text-white"
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right min-w-[90px]">
                    <div className="text-sm font-black text-white">
                      ${(product.price * quantity).toFixed(2)}
                    </div>
                    <div className="text-[10px] text-[#656D82]">
                      ${product.price.toFixed(2)} ea
                    </div>
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="p-2 rounded-xl text-[#656D82] hover:text-[#F43F5E] hover:bg-[#F43F5E]/10 transition-colors cursor-pointer"
                    title="Remove card"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-[#171C2B]/60 border border-[#282E40] flex items-center justify-between text-xs text-[#9CA3B5]">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Includes museum-grade magnetic cases & tamper-evident seals on single cards</span>
            </div>
          </div>
        </div>

        {/* Right: Order Summary Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-[#111522] border border-[#282E40] space-y-6">
            <h2 className="text-base font-bold text-white uppercase tracking-wider border-b border-[#282E40] pb-4">
              Vault Order Summary
            </h2>

            {/* Calculations */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-[#9CA3B5]">
                <span>Items Subtotal:</span>
                <span className="text-white font-bold font-mono">${cartTotal.toFixed(2)}</span>
              </div>

              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Collector Discount ({discountPercent}%):</span>
                  <span className="font-bold font-mono">-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-[#9CA3B5]">
                <span>Insured Armored Shipping:</span>
                <span className="text-white font-bold font-mono">
                  {shippingCost === 0 ? (
                    <span className="text-emerald-400">FREE ($150+ Order)</span>
                  ) : (
                    `$${shippingCost.toFixed(2)}`
                  )}
                </span>
              </div>

              <div className="pt-3 border-t border-[#282E40] flex justify-between items-baseline">
                <div>
                  <div className="text-sm font-bold text-white">Estimated Total:</div>
                  <div className="text-[10px] text-[#656D82]">Demo simulation only</div>
                </div>
                <div className="text-2xl font-black text-gold-gradient font-mono">
                  ${finalTotal.toFixed(2)}
                </div>
              </div>
            </div>

            {/* Promo Code Input */}
            <form onSubmit={handleApplyCoupon} className="space-y-2 pt-2 border-t border-[#282E40]">
              <div className="text-xs text-[#9CA3B5] font-semibold flex items-center space-x-1">
                <Tag className="w-3.5 h-3.5 text-[#D9B45B]" />
                <span>Promo Code (Try: LEGEND10 or TCG2026)</span>
              </div>
              <div className="flex">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter promo code..."
                  className="bg-[#171C2B] border border-[#282E40] rounded-l-xl px-3 py-2 text-xs text-white placeholder-[#656D82] focus:outline-none focus:border-[#D9B45B] flex-1 uppercase"
                />
                <button
                  type="submit"
                  className="bg-[#282E40] hover:bg-[#D9B45B] hover:text-[#090B12] text-white font-bold px-4 py-2 rounded-r-xl text-xs transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </div>
            </form>

            {/* Checkout Button */}
            <button
              onClick={() => navigate('checkout')}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D9B45B] to-[#B3913E] text-[#090B12] font-black text-xs tracking-wider uppercase hover:brightness-110 shadow-gold-glow flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <span>PROCEED TO DEMO CHECKOUT</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
