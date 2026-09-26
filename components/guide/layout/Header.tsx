'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search, Globe, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CATEGORY_META, CITY_META } from '@/lib/types';
import type { BusinessCategory, City } from '@/lib/types';

const CATEGORIES: { key: BusinessCategory; emoji: string; label: string }[] = [
  { key: 'massage', emoji: '💆', label: 'Massage' },
  { key: 'spa', emoji: '🌸', label: 'Spa' },
  { key: 'hotel', emoji: '🏨', label: 'Hotel' },
  { key: 'restaurants', emoji: '🍜', label: 'Restaurants' },
  { key: 'tour', emoji: '⛵', label: 'Tours' },
];

const CITIES: { key: City; label: string; labelZh: string }[] = [
  { key: 'phuket', label: 'Phuket', labelZh: '普吉岛' },
  { key: 'bangkok', label: 'Bangkok', labelZh: '曼谷' },
  { key: 'chiang-mai', label: 'Chiang Mai', labelZh: '清迈' },
  { key: 'krabi', label: 'Krabi', labelZh: '甲米' },
];

const LANGUAGES = [
  { code: 'en', label: 'EN', fullLabel: 'English' },
  { code: 'zh', label: '中', fullLabel: '简体中文' },
  { code: 'ja', label: '日', fullLabel: '日本語' },
  { code: 'ko', label: '한', fullLabel: '한국어' },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cityDropdown, setCityDropdown] = useState(false);
  const [activeLang, setActiveLang] = useState('en');

  // Detect current city from URL
  const currentCity = CITIES.find(c => pathname.startsWith(`/${c.key}`))?.key ?? 'phuket';

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = () => setCityDropdown(false);
    if (cityDropdown) document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [cityDropdown]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-400',
          scrolled
            ? 'bg-dark/95 backdrop-blur-lg shadow-header h-16'
            : 'bg-gradient-to-b from-dark/80 to-transparent h-20'
        )}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center gap-6">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
            <div className="w-8 h-8 rounded-sm bg-gold flex items-center justify-center group-hover:bg-gold-light transition-colors shadow-gold">
              <span className="text-dark font-serif font-bold text-sm">T</span>
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="text-sm font-semibold text-cream tracking-wide">
                Thailand Guide
              </span>
              <span className="text-[10px] text-cream-subtle tracking-widest uppercase">
                Travel Directory
              </span>
            </div>
          </Link>

          {/* City Picker */}
          <div className="relative hidden md:block" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setCityDropdown(!cityDropdown)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-cream-muted hover:text-gold text-sm font-medium transition-colors border border-dark-border hover:border-gold/40"
            >
              <span>{CITY_META[currentCity]?.label ?? 'Phuket'}</span>
              <ChevronDown size={14} className={cn('transition-transform', cityDropdown && 'rotate-180')} />
            </button>

            {cityDropdown && (
              <div className="absolute top-full left-0 mt-2 w-44 bg-dark-card border border-dark-border rounded-lg shadow-card-hover overflow-hidden animate-fade-in">
                {CITIES.map(city => (
                  <Link
                    key={city.key}
                    href={`/${city.key}/massage`}
                    onClick={() => setCityDropdown(false)}
                    className={cn(
                      'flex items-center justify-between px-4 py-2.5 text-sm transition-colors',
                      currentCity === city.key
                        ? 'text-gold bg-gold/10'
                        : 'text-cream-muted hover:text-cream hover:bg-dark-surface'
                    )}
                  >
                    <span>{city.label}</span>
                    <span className="text-xs text-cream-subtle">{city.labelZh}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Category Nav */}
          <nav className="hidden lg:flex items-center gap-1 flex-1">
            {CATEGORIES.map(cat => (
              <Link
                key={cat.key}
                href={`/${currentCity}/${cat.key}`}
                className={cn(
                  'px-3 py-1.5 rounded-sm text-sm font-medium transition-all duration-200 flex items-center gap-1.5',
                  pathname === `/${currentCity}/${cat.key}`
                    ? 'text-gold bg-gold/10 border border-gold/20'
                    : 'text-cream-muted hover:text-cream hover:bg-dark-surface'
                )}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Language Toggle */}
            <div className="hidden sm:flex items-center gap-1 border border-dark-border rounded-sm overflow-hidden">
              {LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => setActiveLang(lang.code)}
                  className={cn(
                    'px-2 py-1 text-xs font-medium transition-colors',
                    activeLang === lang.code
                      ? 'bg-gold text-dark'
                      : 'text-cream-subtle hover:text-cream hover:bg-dark-surface'
                  )}
                  title={lang.fullLabel}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <button className="h-8 w-8 flex items-center justify-center rounded-sm text-cream-subtle hover:text-gold hover:bg-dark-surface transition-colors" aria-label="Search">
              <Search size={16} />
            </button>

            {/* Book CTA */}
            <Link
              href={`/${currentCity}/massage`}
              className="hidden sm:flex btn-gold h-8 px-4 text-xs"
            >
              Explore Now
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden h-8 w-8 flex items-center justify-center rounded-sm text-cream-muted hover:text-cream hover:bg-dark-surface transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="lg:hidden bg-dark-card border-t border-dark-border animate-fade-in">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {/* City selector mobile */}
              <p className="text-xs font-semibold text-cream-subtle uppercase tracking-widest px-3 mb-2">Select City</p>
              <div className="flex flex-wrap gap-2 mb-4 px-1">
                {CITIES.map(city => (
                  <Link
                    key={city.key}
                    href={`/${city.key}/massage`}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'px-3 py-1.5 rounded-sm text-sm border transition-colors',
                      currentCity === city.key
                        ? 'border-gold text-gold bg-gold/10'
                        : 'border-dark-border text-cream-muted'
                    )}
                  >
                    {city.label}
                  </Link>
                ))}
              </div>

              <p className="text-xs font-semibold text-cream-subtle uppercase tracking-widest px-3 mb-2">Categories</p>
              {CATEGORIES.map(cat => (
                <Link
                  key={cat.key}
                  href={`/${currentCity}/${cat.key}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm text-cream-muted hover:text-cream hover:bg-dark-surface transition-colors"
                >
                  <span className="text-base">{cat.emoji}</span>
                  <span>{cat.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Spacer - only when not on hero page */}
      <div className="h-20" />
    </>
  );
}
