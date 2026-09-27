export const metadata = {
  alternates: { canonical: '/' },
};

import EntryCards from '@/components/home/EntryCards';

export const dynamic = 'force-static';

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="max-w-4xl w-full px-4 sm:px-6 lg:px-8 text-center py-16">
        {/* Title */}
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-3">
          华商联合 · 东南亚旅游生活导览
        </h1>
        <p className="text-muted-foreground text-lg mb-16">
          Chinese Business Chamber × Southeast Asia Travel &amp; Living Guide
        </p>
        <p className="seo-intro text-muted-foreground">华商联合收录中国华商企业名录与东南亚旅游生活指南，提供商旅对接、城市生活与本地商家信息。</p>

        {/* Two entries: 中国商会 × 东南亚旅游生活 */}
        <EntryCards />
      </div>
    </div>
  );
}
