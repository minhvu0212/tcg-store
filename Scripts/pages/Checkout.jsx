import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CreditCard, 
  CheckCircle2, 
  Lock, 
  ArrowLeft, 
  Sparkles, 
  AlertTriangle,
  Package,
  Truck
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Checkout() {
  const { cart, cartTotal, clearCart, navigate, addToast } = useStore();

  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: 'Alexander Collector',
    email: 'alex.collector@tcgstore.com',
    address: '742 Evergreen Terrace',
    city: 'Springfield',
    state: 'OR',
    zip: '97477',
    country: 'United States',
    phone: '+1 (555) 234-5678',
    notes: 'Please pack in extra bubble wrap for grading inspection.'
  });

  const shippingPrice = shippingMethod === 'express' ? 19.99 : (cartTotal > 150 ? 0 : 9.99);
  const finalTotal = cartTotal + shippingPrice;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    clearCart();
    addToast(
      'Demo Order Placed',
      'Simulation order #TCG-8942 has been generated! No real payment taken.',
      'gold'
    );
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-2xl">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#D9B45B]/15 text-[#D9B45B] border border-[#D9B45B]/30 uppercase tracking-widest">
          Interactive Demo Prototype
        </span>

        <h1 className="text-3xl font-black text-white font-['Cinzel']">
          DEMO ORDER CONFIRMED!
        </h1>

        <p className="text-xs text-[#9CA3B5] leading-relaxed max-w-lg mx-auto">
          Thank you for testing the TCG STORE checkout interface. Your simulated order code is <strong className="text-white font-mono">#TCG-8942</strong>. As this is Phase 1 Frontend UI design, no payment has occurred and no items will be shipped.
        </p>

        <div className="p-6 rounded-2xl bg-[#111522] border border-[#282E40] text-left text-xs space-y-2 max-w-md mx-auto">
          <div className="flex justify-between">
            <span className="text-[#9CA3B5]">Recipient:</span>
            <span className="font-bold text-white">{formData.fullName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#9CA3B5]">Shipping To:</span>
            <span className="text-white truncate max-w-[200px]">{formData.address}, {formData.city}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#9CA3B5]">Total Simulated:</span>
            <span className="font-bold text-[#D9B45B] font-mono">${finalTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#9CA3B5]">Status:</span>
            <span className="text-emerald-400 font-bold">Processing Simulation</span>
          </div>
        </div>

        <div className="pt-4 flex justify-center space-x-4">
          <button
            onClick={() => navigate('orders')}
            className="px-6 py-3 rounded-xl bg-[#171C2B] hover:bg-[#1E2438] text-white border border-[#282E40] text-xs font-bold transition-colors cursor-pointer"
          >
            View Demo Order History
          </button>
          <button
            onClick={() => navigate('shop')}
            className="px-6 py-3 rounded-xl bg-[#D9B45B] text-[#090B12] font-black text-xs hover:brightness-110 shadow-gold-glow transition-all cursor-pointer"
          >
            Continue Browsing
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner: Clear Demo Notice */}
      <div className="p-3.5 rounded-2xl bg-[#D9B45B]/10 border border-[#D9B45B]/30 flex items-center space-x-3 text-xs text-[#F5DE93]">
        <AlertTriangle className="w-4 h-4 flex-shrink-0 text-[#D9B45B]" />
        <span>
          <strong>PHASE 1 FRONTEND PROTOTYPE:</strong> This checkout flow is an interactive simulation for UI/UX testing. No real card charging or financial transactions will take place.
        </span>
      </div>

      <div className="flex items-center space-x-2 text-xs text-[#9CA3B5]">
        <button onClick={() => navigate('cart')} className="hover:text-white flex items-center space-x-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Cart</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Form: Shipping Address & Method */}
        <form onSubmit={handlePlaceOrder} className="lg:col-span-7 space-y-8">
          
          {/* 1. Recipient Information */}
          <div className="p-6 rounded-3xl bg-[#111522] border border-[#282E40] space-y-4">
            <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center space-x-2 border-b border-[#282E40] pb-3">
              <span className="w-6 h-6 rounded-full bg-[#D9B45B]/20 text-[#D9B45B] text-xs flex items-center justify-center font-bold">1</span>
              <span>Collector Delivery Details</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="text-[#9CA3B5] font-semibold">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#171C2B] border border-[#282E40] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#D9B45B]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#9CA3B5] font-semibold">Email (Tracking Alerts)</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#171C2B] border border-[#282E40] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#D9B45B]"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-[#9CA3B5] font-semibold">Street Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#171C2B] border border-[#282E40] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#D9B45B]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#9CA3B5] font-semibold">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#171C2B] border border-[#282E40] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#D9B45B]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#9CA3B5] font-semibold">State / Postal Code</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full bg-[#171C2B] border border-[#282E40] rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#D9B45B]"
                  />
                  <input
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    className="w-full bg-[#171C2B] border border-[#282E40] rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#D9B45B]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 2. Shipping Tier */}
          <div className="p-6 rounded-3xl bg-[#111522] border border-[#282E40] space-y-4">
            <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center space-x-2 border-b border-[#282E40] pb-3">
              <span className="w-6 h-6 rounded-full bg-[#D9B45B]/20 text-[#D9B45B] text-xs flex items-center justify-center font-bold">2</span>
              <span>Armored Shipping Method</span>
            </h2>

            <div className="space-y-2 text-xs">
              <label 
                className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-colors ${
                  shippingMethod === 'standard' 
                    ? 'bg-[#171C2B] border-[#D9B45B]/60' 
                    : 'bg-[#171C2B]/40 border-[#282E40]'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === 'standard'}
                    onChange={() => setShippingMethod('standard')}
                    className="accent-[#D9B45B]"
                  />
                  <div>
                    <div className="font-bold text-white">Insured Armored Priority (3-5 Days)</div>
                    <div className="text-[#9CA3B5] text-[11px]">Sleeved in rigid toploaders & tamper-sealed poly bag</div>
                  </div>
                </div>
                <span className="font-mono font-bold text-white">
                  {cartTotal > 150 ? 'FREE' : '$9.99'}
                </span>
              </label>

              <label 
                className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-colors ${
                  shippingMethod === 'express' 
                    ? 'bg-[#171C2B] border-[#D9B45B]/60' 
                    : 'bg-[#171C2B]/40 border-[#282E40]'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === 'express'}
                    onChange={() => setShippingMethod('express')}
                    className="accent-[#D9B45B]"
                  />
                  <div>
                    <div className="font-bold text-white">Grail Express Over-Night (1-2 Days)</div>
                    <div className="text-[#9CA3B5] text-[11px]">Signature required with armored vault crush-box</div>
                  </div>
                </div>
                <span className="font-mono font-bold text-white">$19.99</span>
              </label>
            </div>
          </div>

          {/* 3. Payment Method Simulation */}
          <div className="p-6 rounded-3xl bg-[#111522] border border-[#282E40] space-y-4">
            <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center space-x-2 border-b border-[#282E40] pb-3">
              <span className="w-6 h-6 rounded-full bg-[#D9B45B]/20 text-[#D9B45B] text-xs flex items-center justify-center font-bold">3</span>
              <span>Demo Payment Simulation</span>
            </h2>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  paymentMethod === 'card'
                    ? 'bg-[#171C2B] border-[#D9B45B] text-white font-bold'
                    : 'bg-[#171C2B]/40 border-[#282E40] text-[#9CA3B5]'
                }`}
              >
                Credit Card (Demo)
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('paypal')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  paymentMethod === 'paypal'
                    ? 'bg-[#171C2B] border-[#D9B45B] text-white font-bold'
                    : 'bg-[#171C2B]/40 border-[#282E40] text-[#9CA3B5]'
                }`}
              >
                PayPal (Demo)
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('crypto')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  paymentMethod === 'crypto'
                    ? 'bg-[#171C2B] border-[#D9B45B] text-white font-bold'
                    : 'bg-[#171C2B]/40 border-[#282E40] text-[#9CA3B5]'
                }`}
              >
                Crypto / BTC (Demo)
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#171C2B] border border-[#282E40] text-xs text-[#9CA3B5] space-y-2">
              <div className="flex items-center space-x-2 text-white font-semibold">
                <Lock className="w-4 h-4 text-emerald-400" />
                <span>Simulated Secure Payment Channel</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Clicking the button below submits the demo order and adds it to your test order history. No financial information is stored or transmitted.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D9B45B] to-[#B3913E] text-[#090B12] font-black text-xs tracking-wider uppercase hover:brightness-110 shadow-gold-glow flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 stroke-[2.5]" />
              <span>CONFIRM DEMO ORDER (${finalTotal.toFixed(2)})</span>
            </button>
          </div>

        </form>

        {/* Right: Order Summary Preview */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-[#111522] border border-[#282E40] space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-[#282E40] pb-3">
              Order Summary ({cart.length} Products)
            </h2>

            <div className="max-h-60 overflow-y-auto divide-y divide-[#282E40] pr-1">
              {cart.map(({ product, quantity }) => (
                <div key={product.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-14 object-contain rounded bg-[#090B12] border border-[#282E40]"
                    />
                    <div>
                      <div className="font-bold text-white line-clamp-1">{product.name}</div>
                      <div className="text-[10px] text-[#9CA3B5]">
                        Qty: {quantity} • <span className="text-[#D9B45B]">{product.condition}</span>
                      </div>
                    </div>
                  </div>
                  <div className="font-mono font-bold text-white text-right">
                    ${(product.price * quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#282E40] space-y-2 text-xs">
              <div className="flex justify-between text-[#9CA3B5]">
                <span>Items Subtotal:</span>
                <span className="font-mono text-white">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#9CA3B5]">
                <span>Shipping:</span>
                <span className="font-mono text-white">${shippingPrice.toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t border-[#282E40] flex justify-between items-baseline">
                <span className="text-sm font-bold text-white">Order Total:</span>
                <span className="text-xl font-black text-gold-gradient font-mono">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
