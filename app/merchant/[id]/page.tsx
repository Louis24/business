import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import type { Merchant, Product, NewsItem } from '@/lib/types';
import MerchantDetailClient from './MerchantDetailClient';

interface Props {
  params: { id: string };
}

async function getData(id: string) {
  const [merchantRes, productsRes, newsRes] = await Promise.all([
    supabase.from('merchants').select('*').eq('id', id).maybeSingle(),
    supabase
      .from('products')
      .select('*')
      .eq('merchant_id', id)
      .order('category')
      .order('created_at'),
    supabase
      .from('news_items')
      .select('*')
      .eq('merchant_id', id)
      .order('published_at', { ascending: false })
      .limit(5),
  ]);

  return {
    merchant: merchantRes.data as Merchant | null,
    products: (productsRes.data ?? []) as Product[],
    news: (newsRes.data ?? []) as NewsItem[],
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { merchant } = await getData(params.id);
  return {
    title: merchant ? `${merchant.name} — 华商联合 B2B 平台` : '企业详情',
  };
}

export const dynamic = 'force-dynamic';

export default async function MerchantDetailPage({ params }: Props) {
  const { merchant, products, news } = await getData(params.id);
  if (!merchant) notFound();
  return <MerchantDetailClient merchant={merchant} products={products} news={news} />;
}
