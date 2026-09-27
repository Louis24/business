export const metadata = {
  alternates: { canonical: '/[city]/[category]' },
};

import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { CITIES_CONFIG } from '@/lib/config/cities';
import { CATEGORY_META } from '@/lib/types';
import type { BusinessCategory, CitySlug } from '@/lib/types';
import { getBusinesses } from '@/lib/getBusinesses';
import BusinessGrid from '@/components/guide/businesses/BusinessGrid';

export function generateStaticParams() {
  return Object.entries(CITIES_CONFIG).flatMap(([city, info]) =>
    info.categories.map((category) => ({ city, category }))
  );
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: { city: string; category: string };
}): Promise<Metadata> {
  const info = CITIES_CONFIG[params.city as CitySlug];
  const cat = CATEGORY_META[params.category as BusinessCategory];
  if (!info || !cat) return {};
  return {
    title: `Best ${cat.label} in ${info.name} · ${info.nameZh}${cat.labelZh}`,
    description: `${cat.description} in ${info.name}, ${info.country}.`,
  };
}

export default async function CategoryListingPage({
  params,
}: {
  params: { city: string; category: string };
}) {
  const city = params.city as CitySlug;
  const category = params.category as BusinessCategory;
  const info = CITIES_CONFIG[city];
  if (!info || !info.categories.includes(category)) notFound();
  const cat = CATEGORY_META[category];
  if (!cat) notFound();

  const businesses = await getBusinesses(city, category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="text-xs text-muted-foreground mb-4 flex items-center gap-1.5">
        <Link href={`/${city}`} className="hover:text-gold transition-colors">
          {info.name}
        </Link>
        <span>/</span>
        <span className="text-foreground">{cat.label}</span>
      </nav>

      {/* Page heading */}
      <header className="mb-8">
        <h1 className="font-serif text-3xl sm:text-4xl text-foreground mb-2">
          <span className="mr-2">{cat.emoji}</span>
          Best {cat.label} in {info.name} <span className="text-gold-gradient italic">{info.nameZh}{cat.labelZh}</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl">{cat.description}</p>
      </header>

      {/* Listing grid */}
      <BusinessGrid businesses={businesses} city={city} category={category} />

      {/* Other categories */}
      <div className="mt-14">
        <h2 className="font-serif text-xl text-foreground mb-4">Explore more in {info.name}</h2>
        <div className="flex flex-wrap gap-3">
          {info.categories
            .filter((c) => c !== category)
            .map((key) => {
              const c = CATEGORY_META[key as BusinessCategory];
              if (!c) return null;
              return (
                <Link
                  key={key}
                  href={`/${city}/${key}`}
                  className="px-4 py-2 rounded-full text-sm border border-border text-muted-foreground hover:text-gold hover:border-gold/50 transition-all"
                >
                  <span className="mr-1.5">{c.emoji}</span>
                  {c.label}
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}
