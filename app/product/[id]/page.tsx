import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import type { Merchant, Product } from '@/lib/types';
import ProductDetailClient from './ProductDetailClient';

interface Props {
  params: { id: string };
}

async function getData(id: string) {
  const productRes = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  const product = productRes.data as Product | null;
  if (!product) return { product: null, merchant: null, related: [] };

  const [merchantRes, relatedRes] = await Promise.all([
    supabase.from('merchants').select('*').eq('id', product.merchant_id).maybeSingle(),
    supabase
      .from('products')
      .select('*')
      .eq('merchant_id', product.merchant_id)
      .neq('id', id)
      .limit(4),
  ]);

  return {
    product,
    merchant: merchantRes.data as Merchant | null,
    related: (relatedRes.data ?? []) as Product[],
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { product } = await getData(params.id);
  return {
    title: product ? `${product.name} — 华商联合 B2B 平台` : '产品详情',
  };
}

export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({ params }: Props) {
  const { product, merchant, related } = await getData(params.id);
  if (!product) notFound();
  return <ProductDetailClient product={product} merchant={merchant} related={related} />;
}
