import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Contact() {
  const { addToast } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Grail Card Inquiry',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addToast('Message Sent', 'Thank you! A collector concierge will reply within 24 hours.', 'gold');
    setFormData({ name: '', email: '', subject: 'Grail Card Inquiry', message: '' });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-[#D9B45B] uppercase tracking-wider">
          Collector Concierge
        </span>
        <h1 className="text-3xl font-black text-white font-['Cinzel']">
          CONTACT TCG STORE VAULT
        </h1>
        <p className="text-xs text-[#9CA3B5]">
          Have questions regarding card authentication, bulk grading, or consignment? Reach out to our specialist team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left: Contact Info & Hours */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-[#111522] border border-[#282E40] space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-[#282E40] pb-3">
              Vault Headquarters
            </h2>

            <div className="space-y-4 text-xs text-[#9CA3B5]">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-[#D9B45B] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">TCG Store Vault Flagship</div>
                  <div>88 Akihabara Avenue, Suite 400</div>
                  <div>Collector District, Tokyo & San Francisco</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-[#8957E5] flex-shrink-0" />
                <div>
                  <div className="font-bold text-white">Concierge Support Email</div>
                  <div>concierge@tcgstore-vault.io</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-[#438DFF] flex-shrink-0" />
                <div>
                  <div className="font-bold text-white">Direct Phone Line</div>
                  <div>+1 (800) 555-VAULT (Demo)</div>
                </div>
              </div>

              <div className="flex items-start space-x-3 pt-2 border-t border-[#282E40]">
                <Clock className="w-4 h-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">Specialist Appraisal Hours</div>
                  <div>Monday – Friday: 9:00 AM – 7:00 PM EST</div>
                  <div>Saturday – Sunday: 10:00 AM – 5:00 PM EST</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Message Form */}
        <div className="lg:col-span-7">
          <div className="p-8 rounded-3xl bg-[#111522] border border-[#282E40] space-y-6">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-[#282E40] pb-3">
              Send Concierge Inquiry
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[#9CA3B5] font-semibold">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Collector full name..."
                    className="w-full bg-[#171C2B] border border-[#282E40] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#D9B45B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#9CA3B5] font-semibold">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@collector.com..."
                    className="w-full bg-[#171C2B] border border-[#282E40] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#D9B45B]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[#9CA3B5] font-semibold">Inquiry Topic</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-[#171C2B] border border-[#282E40] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#D9B45B]"
                >
                  <option value="Grail Card Inquiry">Grail Card Acquisition / Specific Single Card</option>
                  <option value="Authenticity Check">Card Authenticity & Grading Question</option>
                  <option value="Packaging & Delivery">Armored Shipping & Transit Security</option>
                  <option value="Order Status">Existing Demo Order Inquiry</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[#9CA3B5] font-semibold">Message</label>
                <textarea
                  rows="4"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Detail your request or the specific set / card code you are inquiring about..."
                  className="w-full bg-[#171C2B] border border-[#282E40] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#D9B45B]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D9B45B] to-[#B3913E] text-[#090B12] font-black text-xs tracking-wider uppercase hover:brightness-110 shadow-gold-glow flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4 stroke-[2.5]" />
                <span>DISPATCH MESSAGE TO VAULT</span>
              </button>
            </form>
          </div>
        </div>

      </div>

    </div>
  );
}
