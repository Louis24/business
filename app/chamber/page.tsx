import { supabase } from '@/lib/supabase';
import type { Merchant, Product, NewsItem } from '@/lib/types';
import HeroSection from '@/components/chamber/home/HeroSection';
import IndustryCategoriesSection from '@/components/chamber/home/IndustryCategoriesSection';
import NewsTabCard from '@/components/chamber/home/NewsTabCard';
import FeaturedMerchantsSection from '@/components/chamber/home/FeaturedMerchantsSection';
import FeaturedProductsSection from '@/components/chamber/home/FeaturedProductsSection';

async function getData() {
  const [merchantsRes, productsRes, newsRes] = await Promise.all([
    supabase
      .from('merchants')
      .select('*')
      .order('created_at', { ascending: true })
      .limit(12),
    supabase
      .from('products')
      .select('*, merchants(id, name, chamber_position, certifications)')
      .eq('is_featured', true)
      .order('created_at', { ascending: false })
      .limit(8),
    supabase
      .from('news_items')
      .select('*')
      .order('published_at', { ascending: false })
      .limit(20),
  ]);

  return {
    merchants: (merchantsRes.data ?? []) as Merchant[],
    products: (productsRes.data ?? []) as Array<Product & {
      merchants: Pick<Merchant, 'id' | 'name' | 'chamber_position' | 'certifications'> | null;
    }>,
    news: (newsRes.data ?? []) as NewsItem[],
  };
}

export const dynamic = 'force-dynamic';

export default async function ChamberHomePage() {
  const { merchants, products, news } = await getData();

  return (
    <div className="theme-chamber min-h-screen bg-background">
      <HeroSection />
      <IndustryCategoriesSection />

      {/* Dynamic news + featured merchants */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: news tab card */}
          <div className="lg:col-span-2 space-y-2">
            <h2 className="text-xl font-bold text-foreground">商会动态</h2>
            <p className="text-sm text-muted-foreground mb-4">实时公告、供需、活动信息</p>
            <NewsTabCard items={news} />
          </div>

          {/* Right: featured merchants */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-foreground">会员企业风采</h2>
                <p className="text-sm text-muted-foreground">核心理事与优秀会员单位</p>
              </div>
              <a
                href="/merchants"
                className="text-sm font-medium text-primary hover:underline"
              >
                查看全部 &rarr;
              </a>
            </div>
            <FeaturedMerchantsSection merchants={merchants} />
          </div>
        </div>
      </div>

      {/* Featured products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-foreground">商会优选产品</h2>
            <p className="text-sm text-muted-foreground">会员企业一手货源，品质认证</p>
          </div>
          <a
            href="/product"
            className="text-sm font-medium text-primary hover:underline"
          >
            全部产品 &rarr;
          </a>
        </div>
        <FeaturedProductsSection products={products} />
      </div>
    </div>
  );
}
