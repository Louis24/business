import './globals.css';
import type { Metadata } from 'next';
import UnifiedHeader from '@/components/layout/UnifiedHeader';
import UnifiedFooter from '@/components/layout/UnifiedFooter';

export const metadata: Metadata = {
  title: '环球商业与旅游导览 | Global Business & Travel Guide',
  description: '华商联合 B2B 商会平台与普吉岛旅游导览——商业对接与全球旅行一站式服务。',
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
