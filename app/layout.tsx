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
        <script
          type="application/ld+json"
          data-seo="contentfix"
          dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@graph":[{"@type":"WebSite","@id":"https://business.neonstack.net/#website","url":"https://business.neonstack.net/","name":"华商联合 · 东南亚旅游生活导览","description":"中国华商企业名录与东南亚旅游生活导览，提供商旅对接、城市生活与本地商家信息。","inLanguage":"zh-CN","publisher":{"@id":"https://business.neonstack.net/#organization"}},{"@type":"Organization","@id":"https://business.neonstack.net/#organization","name":"华商联合 · 东南亚旅游生活导览","url":"https://business.neonstack.net/","description":"中国华商企业名录与东南亚旅游生活导览，提供商旅对接、城市生活与本地商家信息。"}]}' }}
        />
        
        <UnifiedHeader />
        <main className="flex-1">{children}</main>
        <UnifiedFooter />
      </body>
    </html>
  );
}
