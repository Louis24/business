import { Suspense } from 'react';
import type { Metadata } from 'next';
import MerchantsPageClient from './MerchantsPageClient';

export const metadata: Metadata = {
  title: '企业名录 — 华商联合 B2B 平台',
};

export default function MerchantsPage() {
  return (
    <Suspense fallback={<div className="h-96 flex items-center justify-center text-muted-foreground text-sm">加载中...</div>}>
      <MerchantsPageClient />
    </Suspense>
  );
}
