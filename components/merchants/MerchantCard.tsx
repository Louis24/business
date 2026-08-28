'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Building2, MapPin, Package, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Merchant } from '@/lib/types';
import ChamberPositionBadge from '@/components/ui/ChamberPositionBadge';
import { MERCHANT_TYPE_LABELS } from '@/lib/types';

interface MerchantCardProps {
  merchant: Merchant;
  className?: string;
}

export default function MerchantCard({ merchant, className }: MerchantCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link href={`/merchant/${merchant.id}`}>
      <article
        className={cn(
          'group bg-card rounded-xl border border-border hover-lift cursor-pointer overflow-hidden',
          className
        )}
      >
        {/* Header with logo */}
        <div className="p-5 pb-4">
          <div className="flex items-start gap-3.5">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-muted border border-border overflow-hidden">
              {merchant.logo_url && !imgError ? (
                <img
                  src={merchant.logo_url}
                  alt={merchant.name}
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Building2 size={22} className="text-muted-foreground/50" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-sm text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-2">
                  {merchant.name}
                </h3>
              </div>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <ChamberPositionBadge position={merchant.chamber_position} />
                {merchant.certifications.includes('商会认证') && (
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-1 h-1 rounded-full bg-emerald-500 flex-shrink-0" />
                    商会认证
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="mt-3 text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {merchant.description}
          </p>
        </div>

        {/* Footer info */}
        <div className="px-5 py-3 border-t border-border/60 bg-muted/30 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-[11px] text-muted-foreground flex-wrap">
            <span className="flex items-center gap-1">
              <MapPin size={11} />
              {merchant.region}
            </span>
            <span className="flex items-center gap-1">
              <Package size={11} />
              {merchant.product_count ?? 0} 产品
            </span>
            <span className="px-1.5 py-0.5 rounded bg-muted text-[10px] font-medium text-muted-foreground">
              {MERCHANT_TYPE_LABELS[merchant.type]}
            </span>
          </div>
          <ArrowRight size={13} className="text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0" />
        </div>
      </article>
    </Link>
  );
}
