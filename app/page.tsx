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
        {/* seo-content */}
                <h2 className="text-xl font-semibold mt-6 mb-2 text-foreground">中国华商企业名录</h2>
        <p className="text-sm leading-relaxed text-muted-foreground mb-3">华商联合收录分布在中国港澳台及东南亚各地的华商企业信息，覆盖贸易、制造、餐饮、文旅、物流与专业服务等常见行业。名录按地区与行业归类，帮助商会成员、采购方与合作伙伴快速找到可以对接的华商企业。</p>
        <h2 className="text-xl font-semibold mt-6 mb-2 text-foreground">东南亚旅游与生活指南</h2>
        <p className="text-sm leading-relaxed text-muted-foreground mb-3">面向计划在东南亚长期旅居或短期出差的人群，我们整理了签证、落地交通、居住成本、医疗与教育资源、本地商超与餐饮等实用信息，按城市拆分，尽量给出可以立刻执行的建议，而不是泛泛的介绍。</p>
        <h2 className="text-xl font-semibold mt-6 mb-2 text-foreground">我们提供什么</h2>
        <ul className="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
          <li><a href="/" className="underline underline-offset-2">企业名录查询与推荐 — 按行业与地区筛选</a></li>
          <li><a href="/" className="underline underline-offset-2">商旅对接 — 行程安排与本地资源对接</a></li>
          <li><a href="/" className="underline underline-offset-2">生活指南 — 城市居住、就医与子女教育信息</a></li>
          <li><a href="/" className="underline underline-offset-2">本地商家 — 可以长期合作的商户与服务商</a></li>
        </ul>
        {/* /seo-content */}

        {/* Two entries: 中国商会 × 东南亚旅游生活 */}
        <EntryCards />
      </div>
    </div>
  );
}
