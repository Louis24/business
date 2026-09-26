import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { CITIES_CONFIG } from '@/lib/config/cities';
import { CATEGORY_META } from '@/lib/types';
import type { BusinessCategory, CitySlug } from '@/lib/types';
import { getBusinesses } from '@/lib/getBusinesses';
import BusinessGrid from '@/components/guide/businesses/BusinessGrid';

export function generateStaticParams() {
  return Object.keys(CITIES_CONFIG).map((city) => ({ city }));
}

export async function generateMetadata({
  params,
}: {
  params: { city: string };
}): Promise<Metadata> {
  const info = CITIES_CONFIG[params.city as CitySlug];
  if (!info) return {};
  return {
    title: `${info.name} Travel Guide · ${info.nameZh}旅游导览`,
    description: info.description,
  };
}

export const dynamicParams = false;

export default async function CityPage({ params }: { params: { city: string } }) {
  const city = params.city as CitySlug;
  const info = CITIES_CONFIG[city];
  if (!info) notFound();

  const lists = await Promise.all(info.categories.map((c) => getBusinesses(city, c)));
  const featured = lists.flat().filter((b) => b.tier === 'featured');
  const hasListings = lists.some((l) => l.length > 0);

  return (
    <div>
      {/* City hero */}
      <section
        className="relative w-full h-[55vh] min-h-[420px] flex items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, #0f1418 0%, ${info.themeColor}33 60%, #0f1418 100%)` }}
      >
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80')] bg-cover bg-center" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm tracking-widest uppercase text-cream-subtle mb-3">
            {info.country} · Travel Directory
          </p>
          <h1 className="font-serif text-4xl sm:text-6xl text-cream drop-shadow-xl mb-3">
            {info.name} <span className="text-gold-gradient italic">{info.nameZh}</span>
          </h1>
          <p className="text-cream-muted text-base sm:text-lg max-w-2xl mx-auto">
            {info.description}
          </p>

          {/* Category quick links */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            {info.categories.map((key) => {
              const cat = CATEGORY_META[key as BusinessCategory];
              if (!cat) return null;
              return (
                <Link
                  key={key}
                  href={`/${city}/${key}`}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-dark-card/60 backdrop-blur-md border border-gold/30 text-cream-muted hover:text-gold hover:border-gold transition-all"
                >
                  <span className="mr-1.5">{cat.emoji}</span>
                  {cat.label}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular areas */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Popular Areas</p>
        <div className="flex flex-wrap gap-2">
          {info.popularAreas.map((area) => (
            <span
              key={area}
              className="text-sm px-3 py-1 rounded-full border border-border text-muted-foreground"
            >
              {area}
            </span>
          ))}
        </div>
      </section>

      {/* Featured listings */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-6">
          Featured in {info.name}
        </h2>
        {!hasListings ? (
          <div className="text-center py-16">
            <p className="text-5xl mb-4">🌴</p>
            <p className="text-muted-foreground">Listings coming soon.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {info.categories.map((key, i) => {
              const items = lists[i];
              const cat = CATEGORY_META[key as BusinessCategory];
              if (!cat || items.length === 0) return null;
              return (
                <section key={key}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-serif text-xl text-foreground">
                      <span className="mr-2">{cat.emoji}</span>
                      {cat.label}
                    </h3>
                    <Link
                      href={`/${city}/${key}`}
                      className="text-sm text-muted-foreground hover:text-gold transition-colors"
                    >
                      View all &rarr;
                    </Link>
                  </div>
                  <BusinessGrid businesses={items} city={city} category={key as BusinessCategory} />
                </section>
              );
            })}
          </div>
        )}
      </div>

      {/* All categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {info.categories.map((key) => {
            const cat = CATEGORY_META[key as BusinessCategory];
            if (!cat) return null;
            return (
              <Link key={key} href={`/${city}/${key}`} className="block">
                <div className="category-card h-full text-center group">
                  <div className="text-4xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
                    {cat.emoji}
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-gold transition-colors">
                    {cat.label}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 px-2 line-clamp-2">
                    {cat.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
