import './globals.css';
import type { Metadata } from 'next';
import UnifiedHeader from '@/components/layout/UnifiedHeader';
import UnifiedFooter from '@/components/layout/UnifiedFooter';

export const metadata: Metadata = {
  metadataBase: new URL('https://business.neonstack.net'),
  title: '华商联合 · 东南亚旅游生活导览 | Chamber & SEA Travel Guide',
  description: '中国华商企业名录与东南亚旅游生活导览——商业对接与旅行生活一站式服务。',
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
