import type { Business } from '@/lib/types';

interface HeroGalleryProps {
  business: Business;
}

export default function HeroGallery({ business }: HeroGalleryProps) {
  return (
    <section className="relative w-full h-[50vh] min-h-[320px] max-h-[560px] overflow-hidden bg-dark">
      {/* Hero gradient placeholder (replace with Image component when real photos exist) */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-card to-dark-surface flex items-center justify-center">
        <div className="text-center">
          <span className="text-8xl opacity-20">
            {business.category === 'massage' ? '💆' :
             business.category === 'spa' ? '🌸' :
             business.category === 'hotel' ? '🏨' :
             business.category === 'restaurants' ? '🍜' : '⛵'}
          </span>
        </div>
      </div>

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />

      {/* Business name overlay at bottom */}
      <div className="absolute bottom-0 inset-x-0 px-6 pb-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-serif text-3xl sm:text-4xl text-cream drop-shadow-lg">
            {business.name}
          </h1>
          {business.tagline && (
            <p className="text-gold italic font-serif text-lg mt-1 drop-shadow">
              {business.tagline}
            </p>
          )}
        </div>
      </div>

      {/* Gallery thumbnails (visible when images exist) */}
      {business.gallery.length > 0 && (
        <div className="absolute right-4 bottom-4 flex gap-2">
          {business.gallery.slice(0, 3).map((img, i) => (
            <div
              key={i}
              className="w-16 h-12 rounded-sm bg-dark-surface border border-dark-border overflow-hidden"
            >
              <div className="w-full h-full bg-dark-card" />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
