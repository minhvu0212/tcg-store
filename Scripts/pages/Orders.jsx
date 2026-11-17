import React from 'react';
import { Package, Truck, CheckCircle2, Clock, AlertTriangle, ArrowRight, ExternalLink } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { adminOrders } from '../data/adminMock';
import { formatPrice } from '../utils/priceHelper';

export default function Orders() {
  const { navigate } = useStore();

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Shipped':
        return 'bg-[#438DFF]/10 text-[#438DFF] border-[#438DFF]/30';
      case 'Processing':
        return 'bg-[#D9B45B]/10 text-[#D9B45B] border-[#D9B45B]/30';
      default:
        return 'bg-[#282E40] text-[#9CA3B5] border-[#282E40]';
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="p-3.5 rounded-2xl bg-[#111522] border border-[#282E40] flex items-center justify-between text-xs text-[#9CA3B5]">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 text-[#D9B45B]" />
          <span>Demo Order History: Simulated records showcasing collector packaging and tracking status.</span>
        </div>
        <button onClick={() => navigate('shop')} className="text-[#D9B45B] hover:underline font-bold">
          Shop More →
        </button>
      </div>

      <div className="border-b border-[#282E40] pb-6">
        <h1 className="text-3xl font-black text-white font-['Cinzel']">
          ORDER HISTORY & DISPATCH STATUS
        </h1>
        <p className="text-xs text-[#9CA3B5] mt-1">
          Review your authentic trading card deliveries and vault manifests.
        </p>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {adminOrders.map((order) => (
          <div
            key={order.id}
            className="p-6 rounded-3xl bg-[#111522] border border-[#282E40] space-y-4 hover:border-[#D9B45B]/40 transition-colors"
          >
            {/* Order Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#282E40] pb-4 text-xs">
              <div className="flex items-center space-x-3">
                <span className="font-mono font-black text-white text-sm">{order.id}</span>
                <span className="text-[#9CA3B5]">• Date: {order.date}</span>
                <span className="text-[#9CA3B5]">• {order.paymentMethod}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-2.5 py-0.5 rounded-full border text-[11px] font-bold ${getStatusBadge(order.status)}`}>
                  {order.status}
                </span>
                <span className="font-mono font-bold text-white text-sm">
                  {formatPrice(order.total)}
                </span>
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-2">
              <span className="text-[10px] text-[#656D82] uppercase tracking-wider font-bold">
                Manifest Items ({order.items.length})
              </span>
              <div className="divide-y divide-[#282E40]/60">
                {order.items.map((item, idx) => (
                  <div key={idx} className="py-2 flex items-center justify-between text-xs">
                    <span className="text-white font-medium">{item.name}</span>
                    <span className="text-[#9CA3B5] font-mono">
                      {item.quantity}x @ {formatPrice(item.price)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Tracking Mockup */}
            <div className="pt-3 border-t border-[#282E40] flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#9CA3B5] gap-2">
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4 text-[#438DFF]" />
                <span>Armored Courier: Priority Armored Dispatch #VAULT-{order.id.replace('ORD-', '')}-EXP</span>
              </div>
              <button
                onClick={() => alert(`Tracking Demo: Package for ${order.id} is currently marked as ${order.status}.`)}
                className="text-xs font-bold text-[#D9B45B] hover:underline self-start sm:self-auto cursor-pointer"
              >
                Track Live Simulation →
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
