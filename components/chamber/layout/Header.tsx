'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Building2,
  Search,
  Menu,
  X,
  ChevronRight,
  Bell,
  UserCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/', label: '首页' },
  { href: '/merchants', label: '企业名录' },
  { href: '/news', label: '商会动态' },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-50 h-16 transition-all duration-300',
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-header'
            : 'bg-white/80 backdrop-blur-sm border-b border-border/50'
        )}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center group-hover:bg-primary/90 transition-colors">
              <Building2 className="w-4.5 h-4.5 text-white" size={18} />
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="text-sm font-bold text-primary tracking-tight">华商联合</span>
              <span className="text-[10px] text-muted-foreground font-medium tracking-wider">B2B 企业平台</span>
            </div>
          </Link>

          {/* Main Nav */}
          <nav className="hidden md:flex items-center gap-1 flex-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3.5 py-1.5 rounded-md text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'text-primary bg-primary/8'
                    : 'text-foreground/70 hover:text-foreground hover:bg-muted'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Search */}
            {searchOpen ? (
              <div className="flex items-center gap-2 animate-fade-in">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                  <input
                    autoFocus
                    type="text"
                    placeholder="搜索企业、产品..."
                    className="h-8 pl-9 pr-4 rounded-md border border-border bg-muted/50 text-sm w-56 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
                    onBlur={() => setSearchOpen(false)}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') setSearchOpen(false);
                    }}
                  />
                </div>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="h-8 w-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="搜索"
              >
                <Search size={16} />
              </button>
            )}

            <Link
              href="/user"
              className="h-8 w-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="用户中心"
            >
              <UserCircle size={18} />
            </Link>

            <Link
              href="/merchants"
              className="hidden sm:flex h-8 items-center gap-1.5 px-3.5 rounded-md bg-primary text-white text-xs font-medium hover:bg-primary/90 transition-colors"
            >
              申请入驻
              <ChevronRight size={13} />
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden h-8 w-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="菜单"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden bg-white/98 backdrop-blur-md border-t border-border animate-fade-in">
            <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'px-3 py-2.5 rounded-md text-sm font-medium transition-colors flex items-center justify-between',
                    pathname === link.href
                      ? 'text-primary bg-primary/8'
                      : 'text-foreground/70 hover:text-foreground hover:bg-muted'
                  )}
                >
                  {link.label}
                  <ChevronRight size={14} className="text-muted-foreground" />
                </Link>
              ))}
              <Link
                href="/merchants"
                onClick={() => setMobileOpen(false)}
                className="mt-2 flex h-9 items-center justify-center gap-1.5 px-4 rounded-md bg-primary text-white text-sm font-medium"
              >
                申请入驻
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}
