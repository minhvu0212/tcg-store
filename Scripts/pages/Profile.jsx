import React from 'react';
import { User, Award, ShieldCheck, MapPin, Package, Heart, Sparkles, ExternalLink } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Profile() {
  const { user, wishlist, navigate } = useStore();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Profile Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#111522] border border-[#282E40] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#8957E5]/15 to-transparent rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center space-x-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-[#D9B45B] shadow-gold-glow"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-black text-white">{user.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-[#D9B45B]/15 text-[#D9B45B] border border-[#D9B45B]/30 text-[10px] font-bold uppercase">
                  {user.tier}
                </span>
              </div>
              <p className="text-xs text-[#9CA3B5] mt-1">{user.email}</p>
              <div className="flex items-center space-x-3 text-xs text-[#D9B45B] mt-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="font-bold">{user.points} Collector Reward Points</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => navigate('orders')}
              className="px-4 py-2 rounded-xl bg-[#171C2B] hover:bg-[#1E2438] text-white border border-[#282E40] text-xs font-bold transition-colors cursor-pointer"
            >
              Order History
            </button>
            <button
              onClick={() => navigate('admin')}
              className="px-4 py-2 rounded-xl bg-[#8957E5] hover:bg-[#A277EF] text-white text-xs font-bold transition-colors cursor-pointer flex items-center space-x-1"
            >
              <span>Admin Portal</span>
              <Sparkles className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Profile Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Collector Badges */}
        <div className="p-6 rounded-3xl bg-[#111522] border border-[#282E40] space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider border-l-2 border-[#D9B45B] pl-2">
            Collector Credentials
          </h3>
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-[#171C2B] border border-[#282E40] flex items-center space-x-3">
              <Award className="w-5 h-5 text-[#D9B45B]" />
              <div>
                <div className="font-bold text-white">PSA 10 Grail Hunter</div>
                <div className="text-[10px] text-[#9CA3B5]">Acquired 3+ Secret Illustration Rares</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#171C2B] border border-[#282E40] flex items-center space-x-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <div>
                <div className="font-bold text-white">Verified Vault Member</div>
                <div className="text-[10px] text-[#9CA3B5]">Identity & Authenticity KYC Passed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Saved Shipping Address */}
        <div className="p-6 rounded-3xl bg-[#111522] border border-[#282E40] space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider border-l-2 border-[#8957E5] pl-2">
            Primary Vault Address
          </h3>
          <div className="p-4 rounded-xl bg-[#171C2B] border border-[#282E40] text-xs space-y-1">
            <div className="font-bold text-white">{user.name}</div>
            <div className="text-[#9CA3B5]">742 Evergreen Terrace</div>
            <div className="text-[#9CA3B5]">Springfield, OR 97477</div>
            <div className="text-[#9CA3B5]">United States</div>
            <div className="text-[10px] text-[#D9B45B] pt-2 font-mono">Status: Verified for High-Value Delivery</div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="p-6 rounded-3xl bg-[#111522] border border-[#282E40] space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider border-l-2 border-[#438DFF] pl-2">
            Account Activity
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between p-2.5 rounded-lg bg-[#171C2B]">
              <span className="text-[#9CA3B5]">Orders Placed (Demo):</span>
              <span className="font-bold text-white">6 Orders</span>
            </div>
            <div className="flex justify-between p-2.5 rounded-lg bg-[#171C2B]">
              <span className="text-[#9CA3B5]">Wishlist Items:</span>
              <span className="font-bold text-[#F43F5E]">{wishlist.length} Items</span>
            </div>
            <div className="flex justify-between p-2.5 rounded-lg bg-[#171C2B]">
              <span className="text-[#9CA3B5]">Member Since:</span>
              <span className="font-bold text-white">January 2025</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
