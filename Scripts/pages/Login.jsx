import React, { useState } from 'react';
import { Sparkles, Lock, Mail, ArrowRight, ShieldCheck, User } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Login() {
  const { navigate, addToast, setUser } = useStore();
  const [email, setEmail] = useState('alex.collector@tcgstore.com');
  const [password, setPassword] = useState('••••••••••••');

  const handleLogin = (e) => {
    e.preventDefault();
    setUser({
      name: email.split('@')[0],
      email: email,
      tier: 'Platinum VIP',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
      points: 5200
    });
    addToast('Signed In', `Welcome back to TCG STORE Vault!`, 'gold');
    navigate('profile');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-6">
      
      {/* Brand Icon */}
      <div className="text-center space-y-2">
        <div className="w-14 h-14 rounded-2xl bg-[#171C2B] border border-[#D9B45B]/40 flex items-center justify-center mx-auto shadow-gold-glow">
          <Sparkles className="w-6 h-6 text-[#D9B45B]" />
        </div>
        <h1 className="text-2xl font-black text-white font-['Cinzel']">
          SIGN IN TO TCG VAULT
        </h1>
        <p className="text-xs text-[#9CA3B5]">
          Access your authenticated collections, tracking, and grail alerts.
        </p>
      </div>

      {/* Form */}
      <div className="p-8 rounded-3xl bg-[#111522] border border-[#282E40] shadow-2xl space-y-6">
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="text-[#9CA3B5] font-semibold">Collector Email</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#171C2B] border border-[#282E40] rounded-xl pl-9 pr-3.5 py-2.5 text-white focus:outline-none focus:border-[#D9B45B]"
              />
              <Mail className="w-4 h-4 text-[#656D82] absolute left-3 top-3" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-[#9CA3B5] font-semibold">Password</label>
              <button type="button" onClick={() => alert('Demo simulation: password reset link sent.')} className="text-[#D9B45B] hover:underline text-[11px]">
                Forgot?
              </button>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#171C2B] border border-[#282E40] rounded-xl pl-9 pr-3.5 py-2.5 text-white focus:outline-none focus:border-[#D9B45B]"
              />
              <Lock className="w-4 h-4 text-[#656D82] absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D9B45B] to-[#B3913E] text-[#090B12] font-black text-xs tracking-wider uppercase hover:brightness-110 shadow-gold-glow flex items-center justify-center space-x-2 transition-all cursor-pointer"
          >
            <span>SIGN IN (DEMO)</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </form>

        <div className="pt-4 border-t border-[#282E40] text-center text-xs text-[#9CA3B5]">
          <span>Don't have a collector account yet? </span>
          <button
            onClick={() => navigate('register')}
            className="text-[#D9B45B] font-bold hover:underline cursor-pointer"
          >
            Register Now
          </button>
        </div>
      </div>

    </div>
  );
}
