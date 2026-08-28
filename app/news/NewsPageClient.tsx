'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Megaphone, TrendingUp, TrendingDown, Calendar,
  Phone, MapPin, ArrowRight, Filter, ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import type { NewsItem, NewsType } from '@/lib/types';

const TAB_CONFIG = [
  { key: 'all', label: '全部动态', icon: Filter },
  { key: 'announcement', label: '商会公告', icon: Megaphone },
  { key: 'supply', label: '供应信息', icon: TrendingUp },
  { key: 'demand', label: '采购需求', icon: TrendingDown },
  { key: 'event', label: '近期活动', icon: Calendar },
] as const;

type TabKey = 'all' | NewsType;

const TYPE_CONFIG: Record<NewsType, { label: string; badgeClass: string; bgClass: string }> = {
  announcement: {
    label: '公告',
    badgeClass: 'bg-primary/10 text-primary',
    bgClass: 'border-l-2 border-primary/30',
  },
  supply: {
    label: '供应',
    badgeClass: 'bg-emerald-50 text-emerald-700',
    bgClass: 'border-l-2 border-emerald-300',
  },
  demand: {
    label: '求购',
    badgeClass: 'bg-orange-50 text-orange-700',
    bgClass: 'border-l-2 border-orange-300',
  },
  event: {
    label: '活动',
    badgeClass: 'bg-violet-50 text-violet-700',
    bgClass: 'border-l-2 border-violet-300',
  },
};

export default function NewsPageClient() {
  const searchParams = useSearchParams();
  const initialType = (searchParams.get('type') ?? 'all') as TabKey;
  const [activeTab, setActiveTab] = useState<TabKey>(initialType);
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      let query = supabase
        .from('news_items')
        .select('*')
        .order('published_at', { ascending: false });

      if (activeTab !== 'all') {
        query = query.eq('type', activeTab);
      }

      const { data } = await query.limit(50);
      setItems((data ?? []) as NewsItem[]);
      setLoading(false);
    };

    fetchNews();
  }, [activeTab]);

  // Events for mini calendar
  const events = items.filter((i) => i.type === 'event' && i.event_date);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">商会动态</h1>
        <p className="text-sm text-muted-foreground mt-1">商会公告、供需信息、近期活动一览</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main feed */}
        <div className="lg:col-span-2 space-y-5">
          {/* Tabs */}
          <div className="flex items-center gap-1 bg-muted/50 rounded-xl p-1">
            {TAB_CONFIG.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as TabKey)}
                  className={cn(
                    'flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium transition-all',
                    activeTab === tab.key
                      ? 'bg-white text-primary shadow-sm border border-border/60'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <Icon size={12} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* News list */}
          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-24 bg-muted/50 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center text-muted-foreground text-sm">
              暂无相关信息
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => {
                const config = TYPE_CONFIG[item.type];
                const isExpanded = expanded === item.id;
                return (
                  <article
                    key={item.id}
                    className={cn(
                      'bg-card rounded-xl border border-border overflow-hidden transition-shadow hover:shadow-card',
                      config.bgClass
                    )}
                  >
                    <button
                      className="w-full text-left px-5 py-4"
                      onClick={() => setExpanded(isExpanded ? null : item.id)}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={cn(
                            'flex-shrink-0 mt-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold',
                            config.badgeClass
                          )}
                        >
                          {config.label}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-foreground line-clamp-2 leading-snug">
                            {item.title}
                          </p>
                          <div className="flex items-center gap-3 mt-1.5 flex-wrap text-[11px] text-muted-foreground">
                            {item.author && <span>{item.author}</span>}
                            <span>
                              {new Date(item.published_at).toLocaleDateString('zh-CN', {
                                year: 'numeric', month: 'long', day: 'numeric',
                              })}
                            </span>
                            {item.event_date && (
                              <span className="flex items-center gap-0.5 text-violet-600 font-medium">
                                <Calendar size={10} />
                                活动时间: {item.event_date}
                              </span>
                            )}
                            {item.contact_phone && item.type !== 'announcement' && (
                              <span className="flex items-center gap-0.5">
                                <Phone size={10} />
                                {item.contact_phone}
                              </span>
                            )}
                          </div>
                        </div>
                        <ChevronRight
                          size={16}
                          className={cn(
                            'flex-shrink-0 text-muted-foreground/50 transition-transform mt-0.5',
                            isExpanded && 'rotate-90'
                          )}
                        />
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-5 pb-5 animate-fade-in">
                        <div className="pt-3 border-t border-border/60">
                          <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">
                            {item.content ?? item.summary}
                          </p>
                          {item.event_location && (
                            <p className="mt-3 flex items-start gap-1.5 text-sm text-muted-foreground">
                              <MapPin size={13} className="mt-0.5 flex-shrink-0" />
                              {item.event_location}
                            </p>
                          )}
                          {item.contact_phone && (
                            <p className="mt-2 flex items-center gap-1.5 text-sm">
                              <Phone size={13} className="flex-shrink-0 text-muted-foreground" />
                              <a href={`tel:${item.contact_phone}`} className="text-primary hover:underline">
                                {item.contact_phone}
                              </a>
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {/* Sidebar: activity calendar + quick post */}
        <div className="space-y-6">
          {/* Events list */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="px-4 py-3.5 border-b border-border flex items-center gap-2">
              <Calendar size={15} className="text-primary" />
              <h3 className="font-semibold text-sm text-foreground">近期活动</h3>
            </div>
            <div className="divide-y divide-border/60">
              {events.length === 0 ? (
                <p className="py-8 text-center text-xs text-muted-foreground">暂无活动</p>
              ) : (
                events.map((ev) => (
                  <button
                    key={ev.id}
                    onClick={() => setActiveTab('event')}
                    className="w-full text-left px-4 py-3.5 hover:bg-muted/30 transition-colors group"
                  >
                    <div className="flex gap-3 items-start">
                      <div className="flex-shrink-0 w-10 rounded-lg bg-primary/8 text-primary text-center py-1">
                        <div className="text-xs font-bold leading-none">
                          {ev.event_date ? new Date(ev.event_date).getDate() : ''}
                        </div>
                        <div className="text-[9px] font-medium mt-0.5">
                          {ev.event_date ? new Date(ev.event_date).toLocaleDateString('zh-CN', { month: 'short' }) : ''}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                          {ev.title}
                        </p>
                        {ev.event_location && (
                          <p className="mt-1 text-[10px] text-muted-foreground flex items-center gap-0.5 truncate">
                            <MapPin size={9} /> {ev.event_location}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Supply/demand quick links */}
          <div className="bg-card rounded-xl border border-border p-4 space-y-3">
            <h3 className="font-semibold text-sm text-foreground mb-1">供需快速入口</h3>
            <button
              onClick={() => setActiveTab('supply')}
              className="w-full flex items-center gap-3 p-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center flex-shrink-0">
                <TrendingUp size={15} className="text-white" />
              </div>
              <div className="text-left">
                <div className="text-xs font-semibold text-emerald-800">查看供应信息</div>
                <div className="text-[10px] text-emerald-600">会员企业产品供应</div>
              </div>
              <ArrowRight size={13} className="ml-auto text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={() => setActiveTab('demand')}
              className="w-full flex items-center gap-3 p-3 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center flex-shrink-0">
                <TrendingDown size={15} className="text-white" />
              </div>
              <div className="text-left">
                <div className="text-xs font-semibold text-orange-800">查看求购信息</div>
                <div className="text-[10px] text-orange-600">会员企业采购需求</div>
              </div>
              <ArrowRight size={13} className="ml-auto text-orange-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* CTA */}
          <div className="bg-primary rounded-xl p-5 text-white">
            <h3 className="font-bold text-sm mb-1">发布供需信息</h3>
            <p className="text-xs text-white/70 leading-relaxed mb-4">
              会员企业可发布供应或求购信息，精准对接商业伙伴。
            </p>
            <Link
              href="/user"
              className="flex items-center justify-center gap-1.5 h-8 px-4 rounded-lg bg-white text-primary text-xs font-semibold hover:bg-white/90 transition-colors"
            >
              申请发布
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
