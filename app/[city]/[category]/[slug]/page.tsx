export const metadata = {
  alternates: { canonical: '/[city]/[category]/[slug]' },
};

import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { CITIES_CONFIG } from '@/lib/config/cities';
import { CATEGORY_META } from '@/lib/types';
import type { BusinessCategory, CitySlug } from '@/lib/types';
import { getBusinessBySlug, getBusinesses } from '@/lib/getBusinesses';
import HeroGallery from '@/components/guide/business/HeroGallery';
import ServiceMenu from '@/components/guide/business/ServiceMenu';
import LocationMap from '@/components/guide/business/LocationMap';
import ContactCTA from '@/components/guide/business/ContactCTA';

export async function generateStaticParams() {
  const params: Array<{ city: string; category: string; slug: string }> = [];
  for (const [city, info] of Object.entries(CITIES_CONFIG)) {
    for (const category of info.categories) {
      const businesses = await getBusinesses(city as CitySlug, category as BusinessCategory);
      for (const b of businesses) {
        params.push({ city, category, slug: b.slug });
      }
    }
  }
  return params;
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: { city: string; category: string; slug: string };
}): Promise<Metadata> {
  const info = CITIES_CONFIG[params.city as CitySlug];
  const cat = CATEGORY_META[params.category as BusinessCategory];
  if (!info || !cat) return {};
  const business = await getBusinessBySlug(params.city as CitySlug, params.category as BusinessCategory, params.slug);
  if (!business) return {};
  return {
    title: `${business.name} · ${cat.label} in ${info.name}`,
    description: business.description.slice(0, 150),
  };
}

export default async function BusinessDetailPage({
  params,
}: {
  params: { city: string; category: string; slug: string };
}) {
  const city = params.city as CitySlug;
  const category = params.category as BusinessCategory;
  const info = CITIES_CONFIG[city];
  if (!info || !info.categories.includes(category)) notFound();

  const business = await getBusinessBySlug(city, category, params.slug);
  if (!business) notFound();

  const cat = CATEGORY_META[category];

  return (
    <div>
      <HeroGallery business={business} />

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="text-xs text-muted-foreground flex items-center gap-1.5 flex-wrap">
          <Link href={`/${city}`} className="hover:text-gold transition-colors">
            {info.name}
          </Link>
          <span>/</span>
          <Link href={`/${city}/${category}`} className="hover:text-gold transition-colors">
            {cat?.label ?? category}
          </Link>
          <span>/</span>
          <span className="text-foreground">{business.name}</span>
        </nav>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-10">
            {/* About */}
            <section>
              <h2 className="font-serif text-2xl text-foreground mb-1">About</h2>
              <div className="divider-gold mb-5" style={{ marginLeft: 0, background: '#C9A96E' }} />
              <p className="text-muted-foreground leading-relaxed">{business.description}</p>
              {business.descriptionZh && (
                <p className="text-muted-foreground leading-relaxed mt-3">{business.descriptionZh}</p>
              )}
              <div className="flex flex-wrap gap-2 mt-4">
                {business.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground capitalize"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            {/* Services */}
            <ServiceMenu services={business.services} />

            {/* Location */}
            <LocationMap location={business.location} businessName={business.name} />
          </div>

          {/* Right column */}
          <aside>
            <ContactCTA business={business} />
          </aside>
        </div>
      </div>
    </div>
  );
}
