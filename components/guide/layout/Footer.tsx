import Link from 'next/link';
import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';

const CATEGORIES = [
  { href: '/phuket/massage', emoji: '💆', label: 'Massage' },
  { href: '/phuket/spa', emoji: '🌸', label: 'Spa' },
  { href: '/phuket/hotel', emoji: '🏨', label: 'Hotel' },
  { href: '/phuket/restaurants', emoji: '🍜', label: 'Restaurants' },
  { href: '/phuket/tour', emoji: '⛵', label: 'Tours' },
];

const CITIES = [
  { href: '/phuket/massage', label: 'Phuket' },
  { href: '/bangkok/massage', label: 'Bangkok' },
  { href: '/chiang-mai/massage', label: 'Chiang Mai' },
  { href: '/krabi/massage', label: 'Krabi' },
  { href: '/pattaya/massage', label: 'Pattaya' },
];

const QUICK_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/phuket/massage', label: 'Best Massage' },
  { href: '/phuket/spa', label: 'Luxury Spa' },
  { href: '/phuket/tour', label: 'Island Tours' },
];

export default function Footer() {
  return (
    <footer className="bg-dark text-cream mt-20">
      {/* Decorative gold top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">

          {/* Brand — 2 columns wide */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-sm bg-gold flex items-center justify-center shadow-gold">
                <span className="text-dark font-serif font-bold text-base">T</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-base font-semibold text-cream tracking-wide">Thailand Guide</span>
                <span className="text-[10px] text-cream-subtle tracking-widest uppercase">Travel Directory</span>
              </div>
            </div>

            <p className="text-sm text-cream-muted leading-relaxed mb-5 max-w-xs">
              Your trusted guide to the best massage, spa, hotels, restaurants, and tours across Thailand. Curated listings, real reviews, direct WhatsApp booking.
            </p>

            {/* Stats */}
            <div className="flex gap-4 mb-6">
              <div className="bg-dark-surface rounded-lg px-4 py-3 border border-dark-border">
                <div className="text-xl font-bold text-gold font-serif">200+</div>
                <div className="text-xs text-cream-subtle mt-0.5">Listings</div>
              </div>
              <div className="bg-dark-surface rounded-lg px-4 py-3 border border-dark-border">
                <div className="text-xl font-bold text-cream font-serif">5</div>
                <div className="text-xs text-cream-subtle mt-0.5">Cities</div>
              </div>
              <div className="bg-dark-surface rounded-lg px-4 py-3 border border-dark-border">
                <div className="text-xl font-bold text-gold font-serif">Free</div>
                <div className="text-xs text-cream-subtle mt-0.5">Booking</div>
              </div>
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-2 text-xs text-cream-subtle">
              <span className="flex items-center gap-2">
                <MapPin size={11} className="text-gold" />
                Phuket, Thailand
              </span>
              <span className="flex items-center gap-2">
                <Mail size={11} className="text-gold" />
                hello@thailand-guide.com
              </span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-semibold text-gold/70 uppercase tracking-widest mb-4">
              Categories
            </h4>
            <ul className="flex flex-col gap-2.5">
              {CATEGORIES.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 text-sm text-cream-muted hover:text-gold transition-colors"
                  >
                    <span>{item.emoji}</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h4 className="text-xs font-semibold text-gold/70 uppercase tracking-widest mb-4">
              Destinations
            </h4>
            <ul className="flex flex-col gap-2.5">
              {CITIES.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-cream-muted hover:text-gold transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-gold/70 uppercase tracking-widest mb-4">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5">
              {QUICK_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-cream-muted hover:text-gold transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Languages */}
            <div className="mt-6">
              <h4 className="text-xs font-semibold text-gold/70 uppercase tracking-widest mb-3">
                Language
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {['EN', '中文', '日本語', '한국어'].map((lang) => (
                  <button
                    key={lang}
                    className="text-xs px-2 py-1 rounded-sm border border-dark-border text-cream-subtle hover:border-gold/50 hover:text-gold transition-colors"
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-dark-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-cream-subtle">
            © 2025 Thailand Guide · Travel Directory · All rights reserved
          </span>
          <div className="flex items-center gap-5 text-xs text-cream-subtle">
            <Link href="#" className="hover:text-gold transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-gold transition-colors">Terms of Use</Link>
            <Link href="#" className="hover:text-gold transition-colors">List Your Business</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
