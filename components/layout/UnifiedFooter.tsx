'use client';

import { usePathname } from 'next/navigation';
import GuideFooter from '@/components/guide/layout/Footer';
import ChamberFooter from '@/components/chamber/layout/Footer';

export default function UnifiedFooter() {
  const pathname = usePathname();

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
