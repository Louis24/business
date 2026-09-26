import Link from 'next/link';
import { CATEGORY_META } from '@/lib/types';
import type { BusinessCategory } from '@/lib/types';

interface CategoryNavProps {
  city: string;
}

export default function CategoryNav({ city }: CategoryNavProps) {
  const categories = Object.keys(CATEGORY_META) as BusinessCategory[];

  return (
    <section className="py-16 bg-background relative z-20 -mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((key) => {
            const cat = CATEGORY_META[key];
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
    </section>
  );
}
