import Link from 'next/link';
import { Building2, MapPin } from 'lucide-react';

export const dynamic = 'force-static';

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="max-w-4xl w-full px-4 sm:px-6 lg:px-8 text-center">
        {/* Title */}
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-3">
          环球商业与旅游导览
        </h1>
        <p className="text-muted-foreground text-lg mb-16">
          Global Business & Travel Guide
        </p>

        {/* Two entries */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {/* Chamber */}
          <Link
            href="/chamber"
            className="group relative p-10 rounded-2xl border border-border/60 bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground">
                  华商联合
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  B2B 商会平台 · 会员企业名录
                </p>
              </div>
              <span className="text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                进入商会门户 →
              </span>
            </div>
          </Link>

          {/* Phuket */}
          <Link
            href="/phuket"
            className="group relative p-10 rounded-2xl border border-border/60 bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground">
                  普吉岛
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Phuket Travel Guide · 旅游导览
                </p>
              </div>
              <span className="text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                进入旅游导览 →
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
