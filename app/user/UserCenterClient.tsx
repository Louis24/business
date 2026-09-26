'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  MessageSquare, Heart, Building2, Package, Trash2,
  ClipboardList, Clock, CheckCircle, ArrowRight,
  ShieldCheck, Upload, User, Phone, Mail,
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import type { Inquiry } from '@/lib/types';

type TabKey = 'inquiries' | 'favorites' | 'certification';

const STATUS_CONFIG: Record<Inquiry['status'], { label: string; className: string; icon: React.ElementType }> = {
  pending: { label: '待处理', className: 'bg-amber-50 text-amber-700', icon: Clock },
  replied: { label: '已回复', className: 'bg-emerald-50 text-emerald-700', icon: CheckCircle },
  closed: { label: '已关闭', className: 'bg-muted text-muted-foreground', icon: ClipboardList },
};

export default function UserCenterClient() {
  const [activeTab, setActiveTab] = useState<TabKey>('inquiries');
  const { inquiries, clearInquiries, favorites, removeFavorite } = useAppStore();

  const TABS = [
    { key: 'inquiries' as const, label: '询价记录', icon: MessageSquare, count: inquiries.length },
    { key: 'favorites' as const, label: '收藏夹', icon: Heart, count: favorites.length },
    { key: 'certification' as const, label: '企业认证', icon: ShieldCheck, count: 0 },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">用户中心</h1>
        <p className="text-sm text-muted-foreground mt-1">管理您的询价记录、收藏夹与企业认证</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar nav */}
        <aside className="lg:col-span-1">
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            {/* Profile preview */}
            <div className="p-4 border-b border-border bg-muted/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">访客用户</p>
                  <p className="text-[11px] text-muted-foreground">未登录</p>
                </div>
              </div>
            </div>

            <nav className="py-1">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors',
                      activeTab === tab.key
                        ? 'text-primary bg-primary/6 font-medium'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    <Icon size={15} className="flex-shrink-0" />
                    <span>{tab.label}</span>
                    {tab.count > 0 && (
                      <span className="ml-auto text-[10px] bg-primary/10 text-primary rounded-full px-1.5 py-0.5 font-medium">
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <div className="lg:col-span-3">
          {activeTab === 'inquiries' && (
            <InquiriesTab inquiries={inquiries} onClear={clearInquiries} />
          )}
          {activeTab === 'favorites' && (
            <FavoritesTab favorites={favorites} onRemove={removeFavorite} />
          )}
          {activeTab === 'certification' && (
            <CertificationTab />
          )}
        </div>
      </div>
    </div>
  );
}

function InquiriesTab({ inquiries, onClear }: { inquiries: Inquiry[]; onClear: () => void }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-foreground">询价记录</h2>
        {inquiries.length > 0 && (
          <button
            onClick={onClear}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors"
          >
            <Trash2 size={12} />
            清空记录
          </button>
        )}
      </div>

      {inquiries.length === 0 ? (
        <div className="bg-card rounded-xl border border-border py-16 text-center">
          <MessageSquare size={32} className="mx-auto text-muted-foreground/30 mb-3" />
          <p className="text-muted-foreground text-sm">暂无询价记录</p>
          <Link
            href="/merchants"
            className="mt-3 inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            去浏览企业 <ArrowRight size={12} />
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {inquiries.map((inq) => {
            const statusConf = STATUS_CONFIG[inq.status];
            const StatusIcon = statusConf.icon;
            return (
              <div key={inq.id} className="bg-card rounded-xl border border-border p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-sm text-foreground truncate">
                        {inq.product_name ?? '未知产品'}
                      </p>
                      <span
                        className={cn(
                          'inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium',
                          statusConf.className
                        )}
                      >
                        <StatusIcon size={9} />
                        {statusConf.label}
                      </span>
                    </div>
                    {inq.merchant_name && (
                      <p className="text-xs text-muted-foreground mt-0.5">{inq.merchant_name}</p>
                    )}
                  </div>
                  <span className="text-[11px] text-muted-foreground flex-shrink-0">
                    {new Date(inq.created_at).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })}
                  </span>
                </div>

                <div className="mt-3 pt-3 border-t border-border/60 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-muted-foreground">
                  <span><span className="text-foreground/60">联系人：</span>{inq.contact_name}</span>
                  <span><span className="text-foreground/60">电话：</span>{inq.contact_phone}</span>
                  {inq.quantity && (
                    <span><span className="text-foreground/60">数量：</span>{inq.quantity}</span>
                  )}
                  {inq.contact_company && (
                    <span className="col-span-2 sm:col-span-1">
                      <span className="text-foreground/60">公司：</span>{inq.contact_company}
                    </span>
                  )}
                  {inq.message && (
                    <span className="col-span-2 sm:col-span-3 line-clamp-2">
                      <span className="text-foreground/60">备注：</span>{inq.message}
                    </span>
                  )}
                </div>

                {inq.product_id && (
                  <div className="mt-3">
                    <Link
                      href={`/product/${inq.product_id}`}
                      className="text-xs text-primary hover:underline inline-flex items-center gap-0.5"
                    >
                      查看产品 <ArrowRight size={10} />
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function FavoritesTab({
  favorites,
  onRemove,
}: {
  favorites: Array<{ id: string; type: 'merchant' | 'product'; name: string; savedAt: string }>;
  onRemove: (id: string) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-foreground">收藏夹</h2>
      </div>

      {favorites.length === 0 ? (
        <div className="bg-card rounded-xl border border-border py-16 text-center">
          <Heart size={32} className="mx-auto text-muted-foreground/30 mb-3" />
          <p className="text-muted-foreground text-sm">收藏夹为空</p>
          <Link
            href="/merchants"
            className="mt-3 inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            去浏览企业 <ArrowRight size={12} />
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {favorites.map((fav) => (
            <div
              key={fav.id}
              className="bg-card rounded-xl border border-border px-4 py-3 flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                {fav.type === 'merchant' ? (
                  <Building2 size={14} className="text-muted-foreground" />
                ) : (
                  <Package size={14} className="text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{fav.name}</p>
                <p className="text-[11px] text-muted-foreground">
                  {fav.type === 'merchant' ? '企业' : '产品'} · 收藏于 {new Date(fav.savedAt).toLocaleDateString('zh-CN')}
                </p>
              </div>
              <Link
                href={`/${fav.type === 'merchant' ? 'merchant' : 'product'}/${fav.id}`}
                className="text-xs text-primary hover:underline flex-shrink-0 mr-2"
              >
                查看
              </Link>
              <button
                onClick={() => onRemove(fav.id)}
                className="text-muted-foreground hover:text-destructive transition-colors"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CertificationTab() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="bg-card rounded-xl border border-border py-16 text-center">
        <div className="w-14 h-14 rounded-full bg-emerald-100 mx-auto flex items-center justify-center mb-4">
          <CheckCircle size={28} className="text-emerald-600" />
        </div>
        <p className="font-bold text-foreground">认证申请已提交！</p>
        <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
          商会工作人员将在3个工作日内审核您的申请，请保持电话畅通。
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <h2 className="font-bold text-foreground">企业入驻认证</h2>
        <p className="text-xs text-muted-foreground mt-1">
          提交企业资质，经商会审核后可在平台展示企业信息与产品。
        </p>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {/* Info banner */}
        <div className="px-5 py-4 bg-primary/5 border-b border-border flex items-start gap-3">
          <ShieldCheck size={18} className="text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">商会入驻须知</p>
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
              本平台仅对商会会员开放。申请入驻需提供有效营业执照及商会会员资格证明，审核通过后由商会秘书处授予平台展示权限。
            </p>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="p-5 space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-foreground/80 mb-1.5 block">
                企业名称 <span className="text-destructive">*</span>
              </label>
              <input
                required
                type="text"
                placeholder="请输入企业全称"
                className="w-full h-9 px-3 rounded-lg border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-foreground/80 mb-1.5 block">
                统一社会信用代码 <span className="text-destructive">*</span>
              </label>
              <input
                required
                type="text"
                placeholder="18位信用代码"
                maxLength={18}
                className="w-full h-9 px-3 rounded-lg border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-foreground/80 mb-1.5 block">
                负责人姓名 <span className="text-destructive">*</span>
              </label>
              <input
                required
                type="text"
                placeholder="法定代表人或联系人"
                className="w-full h-9 px-3 rounded-lg border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-foreground/80 mb-1.5 block">
                联系电话 <span className="text-destructive">*</span>
              </label>
              <input
                required
                type="tel"
                placeholder="手机或座机"
                className="w-full h-9 px-3 rounded-lg border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-foreground/80 mb-1.5 block">联系邮箱</label>
              <input
                type="email"
                placeholder="business@example.com"
                className="w-full h-9 px-3 rounded-lg border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-foreground/80 mb-1.5 block">
                所属行业 <span className="text-destructive">*</span>
              </label>
              <input
                required
                type="text"
                placeholder="如：机械制造、新能源..."
                className="w-full h-9 px-3 rounded-lg border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-foreground/80 mb-1.5 block">企业简介</label>
            <textarea
              rows={3}
              placeholder="请简要描述企业主营业务、优势及规模..."
              className="w-full px-3 py-2 rounded-lg border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
            />
          </div>

          {/* File upload placeholder */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-foreground/80 mb-1.5 block">
                营业执照副本 <span className="text-destructive">*</span>
              </label>
              <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary/40 transition-colors cursor-pointer group">
                <Upload size={18} className="mx-auto text-muted-foreground group-hover:text-primary transition-colors mb-1.5" />
                <p className="text-xs text-muted-foreground">点击上传</p>
                <p className="text-[10px] text-muted-foreground/70 mt-0.5">PNG / JPG / PDF，≤5MB</p>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-foreground/80 mb-1.5 block">商会会员证明</label>
              <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary/40 transition-colors cursor-pointer group">
                <Upload size={18} className="mx-auto text-muted-foreground group-hover:text-primary transition-colors mb-1.5" />
                <p className="text-xs text-muted-foreground">点击上传</p>
                <p className="text-[10px] text-muted-foreground/70 mt-0.5">PNG / JPG / PDF，≤5MB</p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-10 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            提交认证申请
          </button>
        </form>
      </div>
    </div>
  );
}
