import { Suspense } from 'react';
import type { Metadata } from 'next';
import NewsPageClient from './NewsPageClient';

export const metadata: Metadata = {
  title: '商会动态 — 华商联合 B2B 平台',
};

export default function NewsPage() {
  return (
    <Suspense fallback={<div className="h-96 flex items-center justify-center text-muted-foreground text-sm">加载中...</div>}>
      <NewsPageClient />
    </Suspense>
  );
}
