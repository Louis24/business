'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Tag, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Product } from '@/lib/types';
import InquiryModal from '@/components/products/InquiryModal';

interface ProductCardProps {
  product: Product;
  merchantName?: string;
  className?: string;
}

export default function ProductCard({ product, merchantName, className }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);

  const firstImage = product.images?.[0];

  return (
    <>
      <article
        className={cn(
          'group bg-card rounded-xl border border-border hover-lift overflow-hidden flex flex-col',
          className
        )}
      >
        {/* Image */}
        <Link href={`/product/${product.id}`} className="block relative aspect-[4/3] overflow-hidden bg-muted">
          {firstImage && !imgError ? (
            <img
              src={firstImage}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground/30">
              <Tag size={32} />
            </div>
          )}
          {/* Category label — soft, high contrast */}
          <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white/90 backdrop-blur-sm text-foreground/80 shadow-sm">
            {product.category}
          </span>
        </Link>

        {/* Content */}
        <div className="flex flex-col flex-1 p-4">
          <Link href={`/product/${product.id}`}>
            <h3 className="font-semibold text-sm text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>

          {merchantName && (
            <p className="mt-1 text-[11px] text-muted-foreground truncate">{merchantName}</p>
          )}

          {/* Price & MOQ */}
          <div className="mt-3 flex items-end justify-between gap-2">
            <div>
              {product.reference_price ? (
                <div className="text-primary font-bold text-base leading-none">
                  ¥{product.reference_price.toLocaleString()}
                  <span className="text-[11px] font-normal text-muted-foreground ml-1">/{product.unit}</span>
                </div>
              ) : (
                <div className="text-muted-foreground text-sm">面议</div>
              )}
              {product.moq && product.moq > 1 && (
                <div className="text-[11px] text-muted-foreground mt-0.5">
                  起订 {product.moq.toLocaleString()} {product.unit}
                </div>
              )}
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                setInquiryOpen(true);
              }}
              className="flex-shrink-0 flex items-center gap-1 h-7 px-3 rounded-md bg-primary text-white text-xs font-medium hover:bg-primary/90 transition-colors"
            >
              <MessageSquare size={11} />
              询价
            </button>
          </div>
        </div>
      </article>

      <InquiryModal
        open={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        product={product}
        merchantName={merchantName}
      />
    </>
  );
}
