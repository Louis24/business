import Link from 'next/link';
import { Star, Clock, MessageCircle } from 'lucide-react';
import type { Business } from '@/lib/types';
import { cn } from '@/lib/utils';

interface BusinessCardProps {
  business: Business;
  city: string;
  category: string;
}

export default function BusinessCard({ business, city, category }: BusinessCardProps) {
  const whatsappUrl = business.contact.whatsapp
    ? `https://wa.me/${business.contact.whatsapp.replace(/[^0-9]/g, '')}`
    : null;

  const detailUrl = `/${city}/${category}/${business.slug}`;

  return (
    <article className="business-card group">
      {/* Image */}
      <Link href={detailUrl} className="block relative overflow-hidden aspect-[4/3]">
        {/* Placeholder gradient since we have no real images yet */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-card via-dark-surface to-dark flex items-center justify-center">
          <span className="text-5xl opacity-40">
            {category === 'massage' ? '💆' : category === 'spa' ? '🌸' : category === 'hotel' ? '🏨' : category === 'restaurants' ? '🍜' : '⛵'}
          </span>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          {business.isFeatured && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gold text-dark">
              ⭐ Featured
            </span>
          )}
          {business.isVerified && !business.isFeatured && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sage text-white">
              ✓ Verified
            </span>
          )}
        </div>

        {/* Price badge */}
        <div className="absolute bottom-3 right-3">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-sm bg-dark/80 text-gold backdrop-blur-sm">
            from ฿{business.startingPrice.toLocaleString()}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Link href={detailUrl}>
            <h3 className="font-serif text-lg font-medium text-foreground leading-tight group-hover:text-gold transition-colors line-clamp-2">
              {business.name}
            </h3>
          </Link>
          <span className="text-sm font-medium text-muted-foreground flex-shrink-0">
            {business.priceRange}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={12}
                className={cn(
                  star <= Math.round(business.rating)
                    ? 'fill-gold text-gold'
                    : 'fill-muted text-muted'
                )}
              />
            ))}
          </div>
          <span className="text-sm font-semibold">{business.rating.toFixed(1)}</span>
          <span className="text-xs text-muted-foreground">
            ({business.reviewCount})
          </span>
        </div>

        {/* Opening hours */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
          <Clock size={11} />
          <span>{business.openingHours.days}</span>
          <span>·</span>
          <span>{business.openingHours.open} – {business.openingHours.close}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {business.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground capitalize"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA row */}
        <div className="flex items-center gap-2">
          <Link
            href={detailUrl}
            className="flex-1 text-center py-2 rounded-sm border border-gold text-gold text-sm font-medium hover:bg-gold hover:text-dark transition-all duration-200"
          >
            View Details
          </Link>

          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp py-2 px-3 text-xs"
              aria-label="WhatsApp"
            >
              <MessageCircle size={14} />
              <span>WhatsApp</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
