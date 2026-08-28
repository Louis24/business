import Link from 'next/link';
import { CITY_META } from '@/lib/types';
import type { City } from '@/lib/types';
import { cn } from '@/lib/utils';

const CITIES: City[] = ['phuket', 'bangkok', 'chiang-mai', 'krabi', 'pattaya'];

export default function CitySection() {
  return (
    <section className="py-20 bg-dark text-cream relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sage/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <p className="section-label mb-3 text-gold">Top Destinations</p>
          <h2 className="font-serif text-3xl sm:text-4xl">Explore by City</h2>
          <div className="divider-gold" />
          <p className="text-cream-muted max-w-2xl mx-auto">
            Find the perfect relaxation spot in Thailand's most popular destinations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CITIES.slice(0, 3).map((city, index) => (
            <Link
              key={city}
              href={`/${city}/massage`}
              className={cn(
                'group relative overflow-hidden rounded-xl aspect-[4/3] block',
                index === 0 && 'md:col-span-2 lg:col-span-2 lg:row-span-2 aspect-auto'
              )}
            >
              {/* Image Placeholder (replace with real bg image later) */}
              <div className="absolute inset-0 bg-dark-card border border-dark-border group-hover:border-gold/30 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent z-10" />
                <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-10 transform group-hover:scale-110 transition-transform duration-700">
                  {city === 'phuket' ? '🏖️' : city === 'bangkok' ? '🏙️' : '⛰️'}
                </div>
              </div>

              {/* Content */}
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-8">
                <p className="text-gold font-medium mb-1 tracking-wider uppercase text-sm">
                  {CITY_META[city].country}
                </p>
                <h3 className="font-serif text-3xl md:text-4xl text-white mb-2 group-hover:text-gold transition-colors">
                  {CITY_META[city].label}
                </h3>
                <div className="flex items-center gap-2 text-sm text-cream-muted opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <span>Explore Listings</span>
                  <span className="text-gold">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
