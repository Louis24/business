import Link from 'next/link';
import { Building2, MapPin, Phone, Mail, ExternalLink } from 'lucide-react';

const QUICK_LINKS = [
  { href: '/', label: '平台首页' },
  { href: '/merchants', label: '企业名录' },
  { href: '/news', label: '商会动态' },
  { href: '/user', label: '用户中心' },
];

const SERVICE_LINKS = [
  { href: '/merchants', label: '申请入驻' },
  { href: '/news?type=supply', label: '发布供应' },
  { href: '/news?type=demand', label: '发布求购' },
  { href: '/user', label: '我的询价' },
];

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <Building2 size={18} className="text-gold" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-sm font-bold text-white tracking-tight">华商联合</span>
                <span className="text-[10px] text-white/50 font-medium tracking-wider">B2B 企业平台</span>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-4">
              依托商会背书的专业B2B信息对接平台，汇聚优质会员企业，构建可信商业生态。
            </p>
            <div className="flex flex-col gap-2 text-xs text-white/50">
              <span className="flex items-center gap-1.5">
                <MapPin size={12} />
                上海市浦东新区陆家嘴金融贸易区
              </span>
              <span className="flex items-center gap-1.5">
                <Phone size={12} />
                021-6888-9999
              </span>
              <span className="flex items-center gap-1.5">
                <Mail size={12} />
                info@huashang-b2b.com
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">平台导航</h4>
            <ul className="flex flex-col gap-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">企业服务</h4>
            <ul className="flex flex-col gap-2.5">
              {SERVICE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Chamber info */}
          <div>
            <h4 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">商会信息</h4>
            <div className="flex flex-col gap-3">
              <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                <div className="text-2xl font-bold text-gold">120+</div>
                <div className="text-xs text-white/50 mt-0.5">会员企业</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                <div className="text-2xl font-bold text-white">2013</div>
                <div className="text-xs text-white/50 mt-0.5">创立年份</div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/35">
          <span>© 2025 华商联合 B2B 企业平台 · 版权所有</span>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-white/60 transition-colors">隐私政策</Link>
            <Link href="#" className="hover:text-white/60 transition-colors">使用条款</Link>
            <Link href="#" className="hover:text-white/60 transition-colors">联系我们</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
