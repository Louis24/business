'use client';

import { useState } from 'react';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';

const SORT_OPTIONS = [
  { value: 'rating', label: 'Top Rated' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
];

const PRICE_OPTIONS = [
  { value: '$', label: '฿ Budget' },
  { value: '$$', label: '฿฿ Mid-Range' },
  { value: '$$$', label: '฿฿฿ Premium' },
  { value: '$$$$', label: '฿฿฿฿ Luxury' },
];

export default function FilterBar() {
  const [sortBy, setSortBy] = useState('rating');
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);

  const togglePrice = (price: string) => {
    setSelectedPrices(prev =>
      prev.includes(price) ? prev.filter(p => p !== price) : [...prev, price]
    );
  };

  return (
    <div className="flex flex-wrap items-center gap-3 mb-8 pb-6 border-b border-border">
      {/* Filter icon */}
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <SlidersHorizontal size={15} />
        <span>Filter</span>
      </div>

      {/* Price range buttons */}
      {PRICE_OPTIONS.map(opt => (
        <button
          key={opt.value}
          onClick={() => togglePrice(opt.value)}
          className={
            selectedPrices.includes(opt.value)
              ? 'px-3 py-1.5 rounded-sm text-sm border border-gold bg-gold/10 text-gold font-medium transition-all'
              : 'px-3 py-1.5 rounded-sm text-sm border border-border text-muted-foreground hover:border-gold/50 hover:text-foreground transition-all'
          }
        >
          {opt.label}
        </button>
      ))}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Sort dropdown */}
      <div className="relative">
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="appearance-none pl-3 pr-8 py-1.5 rounded-sm text-sm border border-border bg-background text-foreground focus:outline-none focus:border-gold/50 cursor-pointer"
        >
          {SORT_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
      </div>
    </div>
  );
}
