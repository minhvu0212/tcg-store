import React, { useState } from 'react';
import { Sparkles, Lock, Mail, ArrowRight, User, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Register() {
  const { navigate, addToast, setUser } = useStore();
  const [fullName, setFullName] = useState('Alexander Vance');
  const [email, setEmail] = useState('alex.vance@tcgcollector.io');
  const [password, setPassword] = useState('Password123!');

  const handleRegister = (e) => {
    e.preventDefault();
    setUser({
      name: fullName,
      email: email,
      tier: 'Gold Collector',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
      points: 1000
    });
    addToast('Account Registered', 'Welcome to TCG STORE! 1,000 welcome points credited.', 'gold');
    navigate('profile');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-6">
      
      {/* Brand Icon */}
      <div className="text-center space-y-2">
        <div className="w-14 h-14 rounded-2xl bg-[#171C2B] border border-[#8957E5]/40 flex items-center justify-center mx-auto shadow-purple-glow">
          <Sparkles className="w-6 h-6 text-[#8957E5]" />
        </div>
        <h1 className="text-2xl font-black text-white font-['Cinzel']">
          JOIN TCG STORE VAULT
        </h1>
        <p className="text-xs text-[#9CA3B5]">
          Create your collector profile to track grails and receive drop alerts.
        </p>
      </div>

      {/* Form */}
      <div className="p-8 rounded-3xl bg-[#111522] border border-[#282E40] shadow-2xl space-y-6">
        <form onSubmit={handleRegister} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="text-[#9CA3B5] font-semibold">Collector Name</label>
            <div className="relative">
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-[#171C2B] border border-[#282E40] rounded-xl pl-9 pr-3.5 py-2.5 text-white focus:outline-none focus:border-[#8957E5]"
              />
              <User className="w-4 h-4 text-[#656D82] absolute left-3 top-3" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[#9CA3B5] font-semibold">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#171C2B] border border-[#282E40] rounded-xl pl-9 pr-3.5 py-2.5 text-white focus:outline-none focus:border-[#8957E5]"
              />
              <Mail className="w-4 h-4 text-[#656D82] absolute left-3 top-3" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[#9CA3B5] font-semibold">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#171C2B] border border-[#282E40] rounded-xl pl-9 pr-3.5 py-2.5 text-white focus:outline-none focus:border-[#8957E5]"
              />
              <Lock className="w-4 h-4 text-[#656D82] absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#8957E5] to-[#438DFF] text-white font-black text-xs tracking-wider uppercase hover:brightness-110 shadow-purple-glow flex items-center justify-center space-x-2 transition-all cursor-pointer"
          >
            <span>CREATE COLLECTOR ACCOUNT</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </form>

        <div className="pt-4 border-t border-[#282E40] text-center text-xs text-[#9CA3B5]">
          <span>Already registered with us? </span>
          <button
            onClick={() => navigate('login')}
            className="text-[#8957E5] font-bold hover:underline cursor-pointer"
          >
            Sign In
          </button>
        </div>
      </div>

    </div>
  );
}
