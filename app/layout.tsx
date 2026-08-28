import './globals.css';
import type { Metadata } from 'next';
import UnifiedHeader from '@/components/layout/UnifiedHeader';
import UnifiedFooter from '@/components/layout/UnifiedFooter';

export const metadata: Metadata = {
  title: 'Global Travel Guide & B2B Chamber | 环球商业与旅游导览平台',
  description: '面向全球旅行者的高端旅游生活导览，以及面向企业与商会资源的 B2B 商业对接平台。',
  icons: {
    icon: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="font-sans bg-background text-foreground antialiased min-h-screen flex flex-col justify-between">
        <UnifiedHeader />
        <main className="flex-1">{children}</main>
        <UnifiedFooter />
      </body>
    </html>
  );
}
