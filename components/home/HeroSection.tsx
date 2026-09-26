'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CITY_META } from '@/lib/types';
import type { City } from '@/lib/types';

const CITIES: City[] = ['phuket', 'bangkok', 'chiang-mai'];

export default function HeroSection() {
  const [activeCity, setActiveCity] = useState<City>('phuket');

  return (
    <section className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-dark">
      {/* Background Image Placeholder (gradient for now) */}
      <div className="absolute inset-0 bg-dark-gradient">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay" />
      </div>

      {/* Hero Shadow Overlay */}
      <div className="absolute inset-0 shadow-hero pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* City Toggle */}
        <div className="flex bg-dark-card/50 backdrop-blur-md p-1 rounded-full border border-gold/30 mb-8 overflow-hidden">
          {CITIES.map((city) => (
            <button
              key={city}
              onClick={() => setActiveCity(city)}
              className={cn(
                'px-5 py-2 rounded-full text-sm font-medium transition-all duration-300',
                activeCity === city
                  ? 'bg-gold text-dark shadow-gold'
                  : 'text-cream-muted hover:text-cream hover:bg-white/5'
              )}
            >
              {CITY_META[city].label}
            </button>
          ))}
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl text-cream drop-shadow-xl mb-4 leading-tight animate-fade-in-up">
          Discover the Best of <br className="hidden sm:block" />
          <span className="text-gold-gradient italic">{CITY_META[activeCity].label}</span>
        </h1>

        <p className="text-lg sm:text-xl text-cream-muted mb-10 max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          Your curated guide to premium massage, luxury spa, hotels, restaurants, and tours.
        </p>

        {/* Search Bar */}
        <div
          className="w-full max-w-2xl relative animate-fade-in-up"
          style={{ animationDelay: '0.2s' }}
        >
          <div className="glass-light p-1.5 rounded-full flex items-center shadow-lg transition-transform focus-within:scale-[1.02]">
            <div className="pl-4 pr-3 text-gold">
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder={`Search for spa, massage, or dining in ${CITY_META[activeCity].label}...`}
              className="flex-1 bg-transparent border-none text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0 text-base py-3"
            />
            <button className="btn-gold rounded-full px-8 py-3 ml-2">
              Search
            </button>
          </div>
        </div>

        {/* Quick links below search */}
        <div
          className="flex items-center justify-center gap-6 mt-8 text-sm font-medium animate-fade-in-up"
          style={{ animationDelay: '0.3s' }}
        >
          <span className="text-cream-subtle tracking-widest uppercase text-[10px]">Popular:</span>
          <Link href={`/${activeCity}/massage`} className="text-cream-muted hover:text-gold transition-colors">Thai Massage</Link>
          <Link href={`/${activeCity}/spa`} className="text-cream-muted hover:text-gold transition-colors">Couples Spa</Link>
          <Link href={`/${activeCity}/restaurants`} className="text-cream-muted hover:text-gold transition-colors">Seafood</Link>
        </div>
      </div>
    </section>
  );
}
