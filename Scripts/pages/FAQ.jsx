import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ShieldCheck, Award, Package } from 'lucide-react';
import { faqItems } from '../data/faq';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-[#D9B45B] uppercase tracking-wider">
          Knowledge Base & Protocol
        </span>
        <h1 className="text-3xl font-black text-white font-['Cinzel']">
          FREQUENTLY ASKED QUESTIONS
        </h1>
        <p className="text-xs text-[#9CA3B5]">
          Learn about our card authentication process, grading condition guidelines, and armored packaging.
        </p>
      </div>

      {/* Accordion FAQ List */}
      <div className="space-y-4">
        {faqItems.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all ${
                isOpen 
                  ? 'bg-[#111522] border-[#D9B45B]/60 shadow-lg' 
                  : 'bg-[#111522]/60 border-[#282E40] hover:border-[#282E40]'
              }`}
            >
              <button
                onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <div>
                  <span className="text-[10px] font-bold text-[#D9B45B] uppercase tracking-wider block mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-bold text-sm text-white">
                    {item.question}
                  </h3>
                </div>
                <div className={`p-1.5 rounded-full bg-[#171C2B] text-[#9CA3B5] transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#D9B45B]' : ''}`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs text-[#9CA3B5] leading-relaxed whitespace-pre-line border-t border-[#282E40]/60">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
