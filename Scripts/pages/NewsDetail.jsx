import React from 'react';
import { ArrowLeft, Clock, User, Share2, Sparkles, BookOpen } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { newsArticles } from '../data/news';

export default function NewsDetail() {
  const { selectedNewsId, navigate, addToast } = useStore();

  const article = newsArticles.find(a => a.id === selectedNewsId) || newsArticles[0];

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast('Link Copied', 'Article link copied to clipboard.', 'info');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('news')}
          className="text-xs text-[#9CA3B5] hover:text-[#D9B45B] flex items-center space-x-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Articles</span>
        </button>

        <button
          onClick={handleShare}
          className="p-2 rounded-xl bg-[#111522] border border-[#282E40] text-[#9CA3B5] hover:text-white transition-colors cursor-pointer"
          title="Share Article"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Article Header */}
      <div className="space-y-4">
        <span className="px-3 py-1 rounded-md bg-[#171C2B] border border-[#D9B45B]/40 text-[#D9B45B] text-xs font-bold uppercase tracking-wider">
          {article.category}
        </span>

        <h1 className="text-3xl sm:text-4xl font-black text-white font-['Cinzel'] leading-tight">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-[#9CA3B5] pt-2 border-b border-[#282E40] pb-4">
          <div className="flex items-center space-x-1.5">
            <User className="w-4 h-4 text-[#D9B45B]" />
            <span className="text-white font-medium">{article.author}</span>
          </div>
          <span>•</span>
          <div>Published: {article.date}</div>
          <span>•</span>
          <div className="flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{article.readTime}</span>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="aspect-video w-full rounded-3xl bg-[#111522] border border-[#282E40] overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Body */}
      <div className="p-6 sm:p-10 rounded-3xl bg-[#111522] border border-[#282E40] text-[#F5F5F7] space-y-6 leading-relaxed text-sm">
        <p className="text-base text-[#D9B45B] font-medium leading-relaxed">
          {article.summary}
        </p>

        <div className="prose prose-invert max-w-none text-[#9CA3B5] space-y-4 text-xs sm:text-sm whitespace-pre-line leading-relaxed">
          {article.content}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#171C2B] to-[#111522] border border-[#282E40] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-white">Looking for the grail cards mentioned?</h3>
          <p className="text-xs text-[#9CA3B5]">Browse our authenticated single card vault inventory.</p>
        </div>
        <button
          onClick={() => navigate('shop')}
          className="px-5 py-2.5 rounded-xl bg-[#D9B45B] text-[#090B12] font-black text-xs hover:brightness-110 shadow-gold-glow whitespace-nowrap cursor-pointer"
        >
          Explore TCG Vault
        </button>
      </div>

    </div>
  );
}
