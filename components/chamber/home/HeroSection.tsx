'use client';

import { useState } from 'react';
import { Search, ArrowRight, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function HeroSection() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/merchants?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const STATS = [
    { value: '120+', label: '会员企业' },
    { value: '15', label: '覆盖行业' },
    { value: '2,800+', label: '产品展示' },
    { value: '98%', label: '认证率' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50/60 via-background to-background pt-10 pb-16">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-hero-pattern pointer-events-none" />
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-[0.04] bg-primary"
        style={{ filter: 'blur(80px)', transform: 'translate(20%, -30%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-[0.05] bg-gold"
        style={{ filter: 'blur(60px)', transform: 'translate(-20%, 20%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-medium bg-primary/8 text-primary border border-primary/20">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            华商联合 · 官方认证 B2B 平台
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-center text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.12] mb-5">
          <span className="text-gradient-primary">商会圈层</span>
          <span className="text-foreground">，赋能</span>
          <br />
          <span className="text-foreground">优质企业</span>
          <span className="text-gradient-primary">对接</span>
        </h1>

        <p className="text-center text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
          依托商会背书，汇聚经过认证的会员企业。<br className="hidden sm:block" />
          产品展示 · 询价对接 · 可信商业圈层
        </p>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-12">
          <div className="flex items-center gap-2 bg-white rounded-xl shadow-[0_2px_16px_rgb(0,0,0,0.08)] border border-border p-1.5">
            <Search className="ml-2 text-muted-foreground flex-shrink-0" size={18} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索企业名称、产品、行业..."
              className="flex-1 bg-transparent text-sm py-1.5 px-2 focus:outline-none text-foreground placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              className="h-9 px-5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors flex-shrink-0 flex items-center gap-1.5"
            >
              搜索
              <ArrowRight size={14} />
            </button>
          </div>
          <div className="flex items-center justify-center gap-4 mt-3">
            {['机械制造', '新能源', '医疗器械', '电子元器件'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => router.push(`/merchants?industry=${encodeURIComponent(tag)}`)}
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </form>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-primary">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
