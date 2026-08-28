import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Product, Merchant } from '@/lib/types';
import ProductCard from '@/components/products/ProductCard';

interface FeaturedProductsProps {
  products: Array<Product & { merchants: Pick<Merchant, 'id' | 'name' | 'chamber_position' | 'certifications'> | null }>;
}

export default function FeaturedProductsSection({ products }: FeaturedProductsProps) {
  return (
    <section className="bg-muted/30 py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-bold text-foreground">精选产品橱窗</h2>
            <p className="text-sm text-muted-foreground mt-1">来自认证会员企业的优质产品</p>
          </div>
          <Link
            href="/merchants"
            className="hidden sm:flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            浏览更多
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              merchantName={product.merchants?.name}
            />
          ))}
        </div>

        <div className="mt-8 sm:hidden text-center">
          <Link
            href="/merchants"
            className="inline-flex items-center gap-1.5 text-sm text-primary"
          >
            浏览更多产品 <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
