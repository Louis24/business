import Link from 'next/link';
import { Building2, ArrowRight } from 'lucide-react';
import type { Merchant } from '@/lib/types';
import ChamberPositionBadge from '@/components/ui/ChamberPositionBadge';
import { MERCHANT_TYPE_LABELS } from '@/lib/types';

interface FeaturedMerchantsProps {
  merchants: Merchant[];
}

const sortOrder = { president: 0, vice_president: 1, director: 2, member: 3 } as const;

export default function FeaturedMerchantsSection({ merchants }: FeaturedMerchantsProps) {
  const sorted = [...merchants].sort(
    (a, b) => sortOrder[a.chamber_position] - sortOrder[b.chamber_position]
  );

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {sorted.slice(0, 6).map((merchant) => (
          <MerchantSpotlightCard key={merchant.id} merchant={merchant} />
        ))}
      </div>
      <div className="mt-4">
        <Link
          href="/merchants"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          查看全部企业
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

function MerchantSpotlightCard({ merchant }: { merchant: Merchant }) {
  const isTopTier = merchant.chamber_position === 'president' || merchant.chamber_position === 'vice_president';

  return (
    <Link href={`/merchant/${merchant.id}`}>
      <div
        className={`group relative bg-card rounded-xl border hover-lift overflow-hidden cursor-pointer ${
          isTopTier ? 'border-amber-200/60' : 'border-border'
        }`}
      >
        {isTopTier && (
          <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-amber-400/0 via-amber-400 to-amber-400/0" />
        )}

        <div className="p-4 flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-muted border border-border overflow-hidden flex-shrink-0">
            {merchant.logo_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={merchant.logo_url}
                alt={merchant.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Building2 size={18} className="text-muted-foreground/40" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors truncate leading-tight">
                {merchant.name}
              </h3>
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <ChamberPositionBadge position={merchant.chamber_position} />
              <span className="text-[10px] text-muted-foreground">{merchant.industry}</span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-1 mt-1">
              {merchant.description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
