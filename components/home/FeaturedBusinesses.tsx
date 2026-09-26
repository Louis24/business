import Link from 'next/link';
import type { Business } from '@/lib/types';
import BusinessCard from '@/components/businesses/BusinessCard';

interface FeaturedBusinessesProps {
  businesses: Business[];
  city: string;
}

export default function FeaturedBusinesses({ businesses, city }: FeaturedBusinessesProps) {
  if (businesses.length === 0) return null;

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="section-label mb-3">Curated Selection</p>
          <h2 className="font-serif text-3xl sm:text-4xl text-foreground">
            Featured in {city.charAt(0).toUpperCase() + city.slice(1)}
          </h2>
          <div className="divider-gold" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our hand-picked selection of the most highly-rated and luxurious experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {businesses.map((business) => (
            <BusinessCard
              key={business.id}
              business={business}
              city={business.city}
              category={business.category}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href={`/${city}/massage`} className="btn-gold">
            Explore All Listings
          </Link>
        </div>
      </div>
    </section>
  );
}
