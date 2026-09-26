import type { Business, BusinessCategory, City } from '@/lib/types';
import BusinessCard from './BusinessCard';

interface BusinessGridProps {
  businesses: Business[];
  city: City;
  category: BusinessCategory;
}

export default function BusinessGrid({ businesses, city, category }: BusinessGridProps) {
  if (businesses.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-5xl mb-4">🌴</p>
        <h3 className="font-serif text-2xl text-foreground mb-2">No listings yet</h3>
        <p className="text-muted-foreground">
          We&apos;re curating the best businesses in this area. Check back soon!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {businesses.map((business) => (
        <BusinessCard
          key={business.id}
          business={business}
          city={city}
          category={category}
        />
      ))}
    </div>
  );
}
