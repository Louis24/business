import HeroSection from '@/components/home/HeroSection';
import CategoryNav from '@/components/home/CategoryNav';
import FeaturedBusinesses from '@/components/home/FeaturedBusinesses';
import CitySection from '@/components/home/CitySection';
import { getFeaturedBusinesses } from '@/lib/getBusinesses';
import Link from 'next/link';
import { Building2, Sparkles, MapPin } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  // Primary showcased city
  const featuredPhuket = await getFeaturedBusinesses('phuket', 8);

  return (
    <div className="min-h-screen">
      {/* Top Banner for Chamber Quick Link */}
      <div className="bg-primary/10 border-b border-primary/20 py-2.5 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-xs sm:text-sm text-foreground/90">
          <span className="flex items-center gap-1 font-semibold text-primary">
            <Building2 className="w-4 h-4" /> 华商联合 B2B 平台:
          </span>
          <span>会员企业名录、供需信息与商会动态已同步上线。</span>
          <Link
            href="/chamber"
            className="font-bold underline text-primary hover:text-primary/80 transition-colors ml-1"
          >
            进入商会门户 &rarr;
          </Link>
        </div>
      </div>

      <HeroSection />
      <CategoryNav city="phuket" />
      <FeaturedBusinesses businesses={featuredPhuket} city="phuket" />
      <CitySection />

      {/* Multi-Region Showcase Banner (Beijing, Vietnam, Thailand) */}
      <section className="py-12 bg-muted/40 border-y border-border/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Multi-Region Architecture
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground font-bold mb-3">
            多地区扩展与全球目的地导览
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto mb-8">
            一套核心架构驱动不同国家和城市的特色风貌，支持京味古都、越式海滨与热带海岛风情。
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            <div className="p-5 rounded-xl bg-card border border-border/80 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-primary font-bold mb-1">
                <MapPin className="w-4 h-4" /> 泰国站 · Thailand
              </div>
              <p className="text-xs text-muted-foreground mb-3">普吉岛 / 曼谷 / 清迈 / 甲米 / 芭提雅</p>
              <div className="text-xs text-foreground/80 leading-relaxed">
                主打泰式热带奢华 SPA、日间水疗、海岛度假与 WhatsApp 极速预约。
              </div>
            </div>

            <div className="p-5 rounded-xl bg-card border border-border/80 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-[#8B1E1E] font-bold mb-1">
                <MapPin className="w-4 h-4" /> 北京站 · Beijing
              </div>
              <p className="text-xs text-muted-foreground mb-3">故宫 / 三里屯 / 王府井 / 前门胡同</p>
              <div className="text-xs text-foreground/80 leading-relaxed">
                主打文化遗迹、胡同四合院茶馆、地道烤鸭与京味品质度假。
              </div>
            </div>

            <div className="p-5 rounded-xl bg-card border border-border/80 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-[#0D9488] font-bold mb-1">
                <MapPin className="w-4 h-4" /> 越南站 · Vietnam
              </div>
              <p className="text-xs text-muted-foreground mb-3">岘港 / 河内 / 胡志明 / 会安古镇</p>
              <div className="text-xs text-foreground/80 leading-relaxed">
                主打美溪沙滩度假、越式草本疗愈、滴漏咖啡文化与海岛潜水。
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust/Value Prop Section */}
      <section className="py-20 bg-background text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-4">
            Why Book with Our Global Guide?
          </h2>
          <div className="divider-gold" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div>
              <div className="text-4xl mb-4">💎</div>
              <h3 className="font-semibold mb-2">Curated Quality</h3>
              <p className="text-sm text-muted-foreground">Every business is personally vetted for exceptional service and hygiene standards.</p>
            </div>
            <div>
              <div className="text-4xl mb-4">📱</div>
              <h3 className="font-semibold mb-2">Direct Booking</h3>
              <p className="text-sm text-muted-foreground">No middlemen. Connect directly with venues via WhatsApp & WeChat for best rates.</p>
            </div>
            <div>
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="font-semibold mb-2">Real Reviews</h3>
              <p className="text-sm text-muted-foreground">Genuine feedback from verified travelers to help you choose the perfect experience.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
