'use client';

import { usePathname } from 'next/navigation';
import GuideHeader from '@/components/guide/layout/Header';
import ChamberHeader from '@/components/chamber/layout/Header';

export default function UnifiedHeader() {
  const pathname = usePathname();

  // Determine which header to render based on current route
  const isChamberSection =
    pathname.startsWith('/chamber') ||
    pathname.startsWith('/merchants') ||
    pathname.startsWith('/merchant') ||
    pathname.startsWith('/news') ||
    pathname.startsWith('/product') ||
    pathname.startsWith('/user');

  if (isChamberSection) {
    return <ChamberHeader />;
  }

  return <GuideHeader />;
}
