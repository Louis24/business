'use client';

import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

const GuideHeader = dynamic(() => import('@/components/guide/layout/Header'));
const ChamberHeader = dynamic(() => import('@/components/chamber/layout/Header'));

export default function UnifiedHeader() {
  const pathname = usePathname();

  // Homepage: no header (clean landing page)
  if (pathname === '/') {
    return null;
  }

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
