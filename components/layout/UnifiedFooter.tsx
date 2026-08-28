'use client';

import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

const GuideFooter = dynamic(() => import('@/components/guide/layout/Footer'));
const ChamberFooter = dynamic(() => import('@/components/chamber/layout/Footer'));

export default function UnifiedFooter() {
  const pathname = usePathname();

  // Homepage: no footer (clean landing page)
  if (pathname === '/') {
    return null;
  }

  const isChamberSection =
    pathname.startsWith('/chamber') ||
    pathname.startsWith('/merchants') ||
    pathname.startsWith('/merchant') ||
    pathname.startsWith('/news') ||
    pathname.startsWith('/product') ||
    pathname.startsWith('/user');

  if (isChamberSection) {
    return <ChamberFooter />;
  }

  return <GuideFooter />;
}
