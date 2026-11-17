import React, { useState } from 'react';
import { BookOpen, Clock, User, ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { newsArticles } from '../data/news';

export default function News() {
  const { navigate, setSelectedNewsId } = useStore();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Market Trends', 'Competitive Strategy', 'Collector Guide'];

  const filteredArticles = selectedCategory === 'All'
    ? newsArticles
    : newsArticles.filter(a => a.category === selectedCategory);

  const handleReadArticle = (id) => {
    setSelectedNewsId(id);
    navigate(`news/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-[#D9B45B] uppercase tracking-wider">
          TCG Vault Dispatch
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white font-['Cinzel']">
          NEWS, MARKET TRENDS & GUIDES
        </h1>
        <p className="text-xs sm:text-sm text-[#9CA3B5]">
          Expert analysis, pull rate statistics, tournament meta strategies, and grading breakdowns.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-[#D9B45B] to-[#B3913E] text-[#090B12] shadow-gold-glow'
                : 'bg-[#111522] border border-[#282E40] text-[#9CA3B5] hover:text-white hover:bg-[#171C2B]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredArticles.map((article) => (
          <article
            key={article.id}
            onClick={() => handleReadArticle(article.id)}
            className="group rounded-3xl bg-[#111522] border border-[#282E40] hover:border-[#D9B45B]/60 p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card cursor-pointer overflow-hidden"
          >
            <div>
              <div className="aspect-video w-full rounded-2xl bg-[#090B12] overflow-hidden mb-4 relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md bg-[#090B12]/80 backdrop-blur-md border border-[#D9B45B]/40 text-[#D9B45B] text-[10px] font-bold uppercase">
                  {article.category}
                </span>
              </div>

              <div className="flex items-center space-x-3 text-[11px] text-[#656D82] mb-2">
                <span>{article.date}</span>
                <span>•</span>
                <span>{article.readTime}</span>
              </div>

              <h2 className="text-base font-bold text-white group-hover:text-[#D9B45B] transition-colors leading-snug line-clamp-2">
                {article.title}
              </h2>

              <p className="text-xs text-[#9CA3B5] mt-2 line-clamp-3 leading-relaxed">
                {article.summary}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#282E40] flex items-center justify-between text-xs">
              <span className="text-[#656D82] text-[11px] font-medium">{article.author}</span>
              <span className="text-[#D9B45B] font-bold flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                <span>Read Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
}
