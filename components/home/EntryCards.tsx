'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Building2, MapPin, ChevronDown } from 'lucide-react';
import { CITIES_CONFIG } from '@/lib/config/cities';
import { REGIONS } from '@/lib/types';

const cardClass =
  'group relative p-10 rounded-2xl border border-border/60 bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col items-center gap-4';

export default function EntryCards() {
  const [regionOpen, setRegionOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);

  const thailandCities = Object.values(CITIES_CONFIG).filter((c) => c.country === 'Thailand');

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
      {/* 左：华商联合（中国） */}
      <div className={cardClass}>
        <Link href="/chamber" className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Building2 className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-foreground">华商联合</h2>
            <p className="text-sm text-muted-foreground mt-1">中国 · B2B 商会平台 · 会员企业名录</p>
          </div>
        </Link>

        {/* 按地区浏览企业 */}
        <div
          className="relative w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => { setRegionOpen(!regionOpen); setCityOpen(false); }}
            className="flex items-center justify-center gap-1.5 w-full px-4 py-2 rounded-full text-sm border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors"
          >
            按地区浏览企业
            <ChevronDown size={14} className={regionOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />
          </button>
          {regionOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 z-10 bg-card border border-border rounded-xl shadow-lg overflow-hidden animate-fade-in">
              {REGIONS.map((region) => (
                <Link
                  key={region}
                  href={`/merchants?region=${encodeURIComponent(region)}`}
                  onClick={() => setRegionOpen(false)}
                  className="flex items-center justify-between px-4 py-2.5 text-sm text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors"
                >
                  <span>{region}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 右：东南亚旅游生活导览 */}
      <div className={cardClass}>
        <Link href="/phuket" className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <MapPin className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-foreground">东南亚</h2>
            <p className="text-sm text-muted-foreground mt-1">旅游生活导览 · Travel &amp; Living Guide</p>
          </div>
        </Link>

        {/* 国家 Tab（后续可扩展越南等） */}
        <div className="flex items-center justify-center gap-2 w-full">
          <span className="px-4 py-2 rounded-full text-sm font-medium bg-primary/10 border border-primary/30 text-primary">
            🇹🇭 泰国
          </span>
        </div>

        {/* 城市下拉 */}
        <div
          className="relative w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => { setCityOpen(!cityOpen); setRegionOpen(false); }}
            className="flex items-center justify-center gap-1.5 w-full px-4 py-2 rounded-full text-sm border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors"
          >
            选择城市 · 普吉岛
            <ChevronDown size={14} className={cityOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />
          </button>
          {cityOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 z-10 bg-card border border-border rounded-xl shadow-lg overflow-hidden animate-fade-in">
              {thailandCities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/${city.slug}`}
                  onClick={() => setCityOpen(false)}
                  className="flex items-center justify-between px-4 py-2.5 text-sm text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors"
                >
                  <span>{city.name}</span>
                  <span className="text-xs opacity-70">{city.nameZh}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
