'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Megaphone, TrendingUp, TrendingDown, Calendar, ArrowRight, MapPin, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { NewsItem, NewsType } from '@/lib/types';

interface NewsTabCardProps {
  items: NewsItem[];
}

const TABS: { key: NewsType | 'all'; label: string; icon: React.ElementType }[] = [
  { key: 'announcement', label: '商会公告', icon: Megaphone },
  { key: 'supply', label: '供应速递', icon: TrendingUp },
  { key: 'demand', label: '求购信息', icon: TrendingDown },
  { key: 'event', label: '近期活动', icon: Calendar },
];

const TYPE_BADGE: Record<NewsType, { label: string; className: string }> = {
  announcement: { label: '公告', className: 'bg-primary/8 text-primary' },
  supply: { label: '供应', className: 'bg-emerald-50 text-emerald-700' },
  demand: { label: '求购', className: 'bg-orange-50 text-orange-700' },
  event: { label: '活动', className: 'bg-violet-50 text-violet-700' },
};

export default function NewsTabCard({ items }: NewsTabCardProps) {
  const [activeTab, setActiveTab] = useState<NewsType>('announcement');

  const filtered = items.filter((item) => item.type === activeTab).slice(0, 5);

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      {/* Tab headers */}
      <div className="flex border-b border-border">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as NewsType)}
              className={cn(
                'flex-1 flex items-center justify-center gap-1.5 py-3.5 text-xs font-medium transition-colors',
                isActive
                  ? 'text-primary border-b-2 border-primary bg-primary/3'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
              )}
            >
              <Icon size={13} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="divide-y divide-border/60">
        {filtered.length === 0 ? (
          <div className="py-12 text-center text-sm text-muted-foreground">暂无相关信息</div>
        ) : (
          filtered.map((item) => (
            <Link
              key={item.id}
              href={`/news`}
              className="flex items-start gap-3 px-5 py-4 hover:bg-muted/30 transition-colors group"
            >
              <span
                className={cn(
                  'flex-shrink-0 mt-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium',
                  TYPE_BADGE[item.type].className
                )}
              >
                {TYPE_BADGE[item.type].label}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                  {item.title}
                </p>
                <div className="flex items-center gap-3 mt-1 text-[11px] text-muted-foreground">
                  {item.event_date && (
                    <span className="flex items-center gap-0.5">
                      <Calendar size={10} />
                      {item.event_date}
                    </span>
                  )}
                  {item.event_location && (
                    <span className="flex items-center gap-0.5 truncate">
                      <MapPin size={10} />
                      {item.event_location}
                    </span>
                  )}
                  {item.contact_phone && !item.event_date && (
                    <span className="flex items-center gap-0.5">
                      <Phone size={10} />
                      {item.contact_phone}
                    </span>
                  )}
                  <span className="ml-auto flex-shrink-0">
                    {new Date(item.published_at).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>
              <ArrowRight size={13} className="flex-shrink-0 mt-1 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
            </Link>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-border bg-muted/20">
        <Link
          href="/news"
          className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
        >
          查看全部动态
          <ArrowRight size={11} />
        </Link>
      </div>
    </div>
  );
}
