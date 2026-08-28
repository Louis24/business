'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Grid3X3, List, SlidersHorizontal, X, ChevronDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import type { Merchant, ChamberPosition } from '@/lib/types';
import {
  CHAMBER_POSITION_LABELS, MERCHANT_TYPE_LABELS, INDUSTRIES, REGIONS,
} from '@/lib/types';
import MerchantCard from '@/components/merchants/MerchantCard';
import ChamberPositionBadge from '@/components/ui/ChamberPositionBadge';

type ViewMode = 'grid' | 'list';

interface Filters {
  industry: string;
  chamber_position: string;
  region: string;
  search: string;
}

export default function MerchantsPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filters, setFilters] = useState<Filters>({
    industry: searchParams.get('industry') ?? '',
    chamber_position: '',
    region: '',
    search: searchParams.get('search') ?? '',
  });
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(filters.search);

  const fetchMerchants = useCallback(async () => {
    setLoading(true);
    let query = supabase.from('merchants').select('*');

    if (filters.industry) query = query.eq('industry', filters.industry);
    if (filters.chamber_position) query = query.eq('chamber_position', filters.chamber_position);
    if (filters.region) query = query.eq('region', filters.region);
    if (filters.search) query = query.ilike('name', `%${filters.search}%`);

    const { data } = await query.order('chamber_position').order('created_at');
    setMerchants((data ?? []) as Merchant[]);
    setLoading(false);
  }, [filters]);

  useEffect(() => { fetchMerchants(); }, [fetchMerchants]);

  const updateFilter = (key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: prev[key] === value ? '' : value }));
  };

  const resetFilters = () => {
    setFilters({ industry: '', chamber_position: '', region: '', search: '' });
    setSearchInput('');
  };

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters((prev) => ({ ...prev, search: searchInput }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">企业名录</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {loading ? '加载中...' : `共 ${merchants.length} 家认证会员企业`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* View toggle */}
          <div className="hidden sm:flex items-center bg-muted/50 rounded-lg p-0.5">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                'p-1.5 rounded-md transition-colors',
                viewMode === 'grid' ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Grid3X3 size={15} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                'p-1.5 rounded-md transition-colors',
                viewMode === 'list' ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <List size={15} />
            </button>
          </div>

          {/* Mobile filter toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="sm:hidden flex items-center gap-1.5 h-8 px-3 rounded-lg border border-border text-sm text-foreground hover:bg-muted transition-colors"
          >
            <SlidersHorizontal size={14} />
            筛选
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-primary text-white text-[10px] flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="flex gap-7">
        {/* Sidebar filters */}
        <aside
          className={cn(
            'w-56 flex-shrink-0 space-y-1',
            'hidden sm:block',
            sidebarOpen && 'block fixed inset-0 z-40 bg-white/95 backdrop-blur sm:relative sm:z-auto sm:bg-transparent sm:backdrop-blur-none w-72 sm:w-56 p-4 sm:p-0 overflow-y-auto'
          )}
        >
          {sidebarOpen && (
            <button
              className="sm:hidden ml-auto flex mb-3"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={20} className="text-muted-foreground" />
            </button>
          )}

          <div className="glass-card rounded-xl p-4 space-y-5">
            {/* Search */}
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="搜索企业名称..."
                  className="w-full h-8 pl-9 pr-3 rounded-lg border border-border bg-muted/40 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </form>

            {activeFilterCount > 0 && (
              <button
                onClick={resetFilters}
                className="w-full flex items-center justify-center gap-1.5 h-7 px-3 rounded-md border border-border text-xs text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
              >
                <X size={11} />
                清除全部筛选
              </button>
            )}

            {/* Chamber position filter */}
            <div>
              <h4 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">
                商会职位
              </h4>
              <div className="space-y-1">
                {(['president', 'vice_president', 'director', 'member'] as ChamberPosition[]).map((pos) => (
                  <button
                    key={pos}
                    onClick={() => updateFilter('chamber_position', pos)}
                    className={cn(
                      'w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs transition-colors',
                      filters.chamber_position === pos
                        ? 'bg-primary/8 text-primary'
                        : 'text-foreground/70 hover:bg-muted hover:text-foreground'
                    )}
                  >
                    <ChamberPositionBadge position={pos} />
                  </button>
                ))}
              </div>
            </div>

            {/* Industry filter */}
            <div>
              <h4 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">
                所属行业
              </h4>
              <div className="space-y-1 max-h-52 overflow-y-auto scrollbar-thin pr-1">
                {INDUSTRIES.map((ind) => (
                  <button
                    key={ind}
                    onClick={() => updateFilter('industry', ind)}
                    className={cn(
                      'w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors',
                      filters.industry === ind
                        ? 'bg-primary/8 text-primary font-medium'
                        : 'text-foreground/70 hover:bg-muted hover:text-foreground'
                    )}
                  >
                    <span>{ind}</span>
                    {filters.industry === ind && (
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Region filter */}
            <div>
              <h4 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">
                所在地区
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {REGIONS.map((reg) => (
                  <button
                    key={reg}
                    onClick={() => updateFilter('region', reg)}
                    className={cn(
                      'px-2 py-0.5 rounded-md text-[11px] transition-colors border',
                      filters.region === reg
                        ? 'bg-primary text-white border-primary'
                        : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                    )}
                  >
                    {reg.replace(/省|市/, '')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Merchant grid/list */}
        <div className="flex-1 min-w-0">
          {loading ? (
            <div className={cn(
              'grid gap-4',
              viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1'
            )}>
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-40 bg-muted/50 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : merchants.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-muted-foreground text-sm">未找到符合条件的企业</p>
              <button onClick={resetFilters} className="mt-3 text-sm text-primary hover:underline">
                清除筛选
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {merchants.map((m) => (
                <MerchantCard key={m.id} merchant={m} />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {merchants.map((m) => (
                <MerchantListRow key={m.id} merchant={m} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MerchantListRow({ merchant }: { merchant: Merchant }) {
  return (
    <a href={`/merchant/${merchant.id}`}>
      <div className="bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-card transition-all flex items-center gap-4 px-5 py-3.5 group">
        <div className="w-10 h-10 rounded-lg bg-muted border border-border overflow-hidden flex-shrink-0">
          {merchant.logo_url ? (
            <img src={merchant.logo_url} alt={merchant.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground/40 text-lg font-bold">
              {merchant.name[0]}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors truncate">
              {merchant.name}
            </h3>
            <ChamberPositionBadge position={merchant.chamber_position} />
          </div>
          <p className="text-xs text-muted-foreground mt-0.5 truncate">{merchant.description}</p>
        </div>
        <div className="hidden md:flex items-center gap-4 text-xs text-muted-foreground flex-shrink-0">
          <span>{merchant.industry}</span>
          <span>{merchant.region}</span>
          <span>{merchant.product_count ?? 0} 产品</span>
        </div>
        <ChevronDown size={15} className="flex-shrink-0 text-muted-foreground/50 group-hover:text-primary -rotate-90 transition-colors" />
      </div>
    </a>
  );
}
