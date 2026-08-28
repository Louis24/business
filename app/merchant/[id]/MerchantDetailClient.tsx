'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Building2, Phone, MapPin, Globe, Calendar, Package,
  ShieldCheck, Star, ChevronRight, ArrowLeft,
} from 'lucide-react';
import type { Merchant, Product, NewsItem } from '@/lib/types';
import { CHAMBER_POSITION_LABELS, MERCHANT_TYPE_LABELS } from '@/lib/types';
import ChamberPositionBadge from '@/components/ui/ChamberPositionBadge';
import ProductCard from '@/components/products/ProductCard';

interface Props {
  merchant: Merchant;
  products: Product[];
  news: NewsItem[];
}

export default function MerchantDetailClient({ merchant, products, news }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'products' | 'news'>('products');
  const [imgError, setImgError] = useState(false);

  const categories = Array.from(new Set(products.map((p) => p.category)));
  const displayProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground transition-colors">首页</Link>
        <ChevronRight size={12} />
        <Link href="/merchants" className="hover:text-foreground transition-colors">企业名录</Link>
        <ChevronRight size={12} />
        <span className="text-foreground truncate">{merchant.name}</span>
      </div>

      {/* Store header */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden mb-8">
        {/* Header banner */}
        <div className="h-24 bg-gradient-to-r from-primary-800 to-primary-700 relative">
          {merchant.chamber_position === 'president' || merchant.chamber_position === 'vice_president' ? (
            <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 via-amber-700/10 to-amber-900/20" />
          ) : null}
          <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-amber-400/0 via-amber-400/60 to-amber-400/0" />
        </div>

        <div className="px-6 pb-6">
          <div className="flex items-end gap-4 -mt-8 mb-4">
            <div className="w-16 h-16 rounded-xl bg-white border-2 border-white shadow-md overflow-hidden flex-shrink-0">
              {merchant.logo_url && !imgError ? (
                <img
                  src={merchant.logo_url}
                  alt={merchant.name}
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted">
                  <Building2 size={24} className="text-muted-foreground/50" />
                </div>
              )}
            </div>
            <div className="pb-1 flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-foreground">{merchant.name}</h1>
                <ChamberPositionBadge position={merchant.chamber_position} size="md" />
              </div>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                {merchant.certifications.map((cert) => (
                  <span
                    key={cert}
                    className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200"
                  >
                    <ShieldCheck size={9} />
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Description */}
            <div className="md:col-span-2">
              <p className="text-sm text-muted-foreground leading-relaxed">{merchant.description}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                <InfoStat label="行业" value={merchant.industry} />
                <InfoStat label="类型" value={MERCHANT_TYPE_LABELS[merchant.type]} />
                <InfoStat label="地区" value={merchant.region} />
                <InfoStat label="入驻年份" value={`${merchant.member_since ?? '—'} 年`} />
              </div>
            </div>

            {/* Contact card */}
            <div className="bg-muted/30 rounded-xl border border-border p-4 space-y-3">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">联系方式</h3>
              {merchant.contact_person && (
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-primary">{merchant.contact_person[0]}</span>
                  </div>
                  <span className="font-medium">{merchant.contact_person}</span>
                  <span className="text-xs text-muted-foreground">· 负责人</span>
                </div>
              )}
              {merchant.phone && (
                <a
                  href={`tel:${merchant.phone}`}
                  className="flex items-center gap-2 text-sm hover:text-primary transition-colors group"
                >
                  <Phone size={13} className="text-muted-foreground group-hover:text-primary flex-shrink-0" />
                  <span className="font-mono">{merchant.phone}</span>
                </a>
              )}
              {merchant.address && (
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin size={13} className="mt-0.5 flex-shrink-0" />
                  <span className="text-xs leading-relaxed">{merchant.address}</span>
                </div>
              )}
              {merchant.website && (
                <a
                  href={`https://${merchant.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-primary hover:underline"
                >
                  <Globe size={12} className="flex-shrink-0" />
                  {merchant.website}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Product category tree */}
        <aside className="lg:col-span-1">
          <div className="bg-card rounded-xl border border-border overflow-hidden sticky top-24">
            <div className="px-4 py-3 border-b border-border flex items-center gap-2">
              <Package size={14} className="text-primary" />
              <span className="text-sm font-semibold text-foreground">产品分类</span>
              <span className="ml-auto text-xs text-muted-foreground">{products.length} 款</span>
            </div>
            <div className="py-1">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`w-full flex items-center justify-between px-4 py-2 text-xs transition-colors ${
                  selectedCategory === null
                    ? 'bg-primary/8 text-primary font-medium'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <span>全部产品</span>
                <span className="text-[10px] bg-muted rounded px-1">{products.length}</span>
              </button>
              {categories.map((cat) => {
                const count = products.filter((p) => p.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full flex items-center justify-between px-4 py-2 text-xs transition-colors ${
                      selectedCategory === cat
                        ? 'bg-primary/8 text-primary font-medium'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className="text-[10px] bg-muted rounded px-1">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="lg:col-span-3">
          {/* Tabs */}
          <div className="flex items-center gap-1 bg-muted/40 rounded-xl p-1 mb-6">
            <button
              onClick={() => setActiveTab('products')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'products'
                  ? 'bg-white shadow-sm text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Package size={14} />
              产品展示
            </button>
            <button
              onClick={() => setActiveTab('news')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'news'
                  ? 'bg-white shadow-sm text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Calendar size={14} />
              企业动态
            </button>
          </div>

          {activeTab === 'products' && (
            displayProducts.length === 0 ? (
              <div className="py-16 text-center text-muted-foreground text-sm">该分类暂无产品</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {displayProducts.map((p) => (
                  <ProductCard key={p.id} product={p} merchantName={merchant.name} />
                ))}
              </div>
            )
          )}

          {activeTab === 'news' && (
            <div className="space-y-3">
              {news.length === 0 ? (
                <div className="py-16 text-center text-muted-foreground text-sm">暂无企业动态</div>
              ) : news.map((item) => (
                <div key={item.id} className="bg-card rounded-xl border border-border px-5 py-4">
                  <p className="font-semibold text-sm text-foreground">{item.title}</p>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-3">
                    {item.summary ?? item.content}
                  </p>
                  <p className="mt-2 text-[11px] text-muted-foreground">
                    {new Date(item.published_at).toLocaleDateString('zh-CN')}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] text-muted-foreground mb-0.5">{label}</div>
      <div className="text-sm font-medium text-foreground">{value}</div>
    </div>
  );
}
