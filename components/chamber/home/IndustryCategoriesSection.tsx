'use client';

import { useRouter } from 'next/navigation';
import {
  Settings, Zap, FlaskConical, Layers, HeartPulse, Cpu,
  UtensilsCrossed, Shirt, Truck, Atom, Sprout, Package,
} from 'lucide-react';

const CATEGORIES = [
  { name: '机械制造', icon: Settings, color: 'bg-blue-50 text-blue-600' },
  { name: '新能源', icon: Zap, color: 'bg-amber-50 text-amber-600' },
  { name: '化工贸易', icon: FlaskConical, color: 'bg-purple-50 text-purple-600' },
  { name: '建材', icon: Layers, color: 'bg-stone-50 text-stone-600' },
  { name: '医疗器械', icon: HeartPulse, color: 'bg-rose-50 text-rose-600' },
  { name: '电子元器件', icon: Cpu, color: 'bg-cyan-50 text-cyan-600' },
  { name: '食品配料', icon: UtensilsCrossed, color: 'bg-orange-50 text-orange-600' },
  { name: '纺织原料', icon: Shirt, color: 'bg-pink-50 text-pink-600' },
  { name: '物流仓储', icon: Truck, color: 'bg-sky-50 text-sky-600' },
  { name: '化工新材料', icon: Atom, color: 'bg-violet-50 text-violet-600' },
  { name: '农业科技', icon: Sprout, color: 'bg-green-50 text-green-600' },
  { name: '包装材料', icon: Package, color: 'bg-teal-50 text-teal-600' },
];

export default function IndustryCategoriesSection() {
  const router = useRouter();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold text-foreground">行业分类</h2>
          <p className="text-sm text-muted-foreground mt-1">按行业快速找到目标企业</p>
        </div>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-3">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.name}
              onClick={() => router.push(`/merchants?industry=${encodeURIComponent(cat.name)}`)}
              className="group flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white hover:shadow-card-hover border border-transparent hover:border-border transition-all duration-200"
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${cat.color} group-hover:scale-110 transition-transform duration-200`}>
                <Icon size={20} />
              </div>
              <span className="text-[11px] font-medium text-muted-foreground group-hover:text-foreground transition-colors text-center leading-tight">
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
