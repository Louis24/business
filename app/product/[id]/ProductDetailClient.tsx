'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ChevronRight, Package, Phone, MapPin, MessageSquare,
  ShieldCheck, Building2, Star, ArrowRight,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Loader2, CheckCircle } from 'lucide-react';
import type { Merchant, Product, InquiryFormData, Inquiry } from '@/lib/types';
import ChamberPositionBadge from '@/components/ui/ChamberPositionBadge';
import ProductCard from '@/components/products/ProductCard';
import { supabase } from '@/lib/supabase';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';

interface Props {
  product: Product;
  merchant: Merchant | null;
  related: Product[];
}

export default function ProductDetailClient({ product, merchant, related }: Props) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [imgError, setImgError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const addInquiry = useAppStore((s) => s.addInquiry);

  const images = product.images?.length > 0 ? product.images : [];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InquiryFormData>({ defaultValues: { quantity: product.moq ?? 1 } });

  const onSubmit = async (data: InquiryFormData) => {
    setLoading(true);
    setError(null);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: row, error: dbError } = await (supabase as any)
        .from('inquiries')
        .insert({
          product_id: product.id,
          merchant_id: product.merchant_id,
          product_name: product.name,
          merchant_name: merchant?.name ?? null,
          contact_name: data.contact_name,
          contact_phone: data.contact_phone,
          contact_company: data.contact_company || null,
          quantity: data.quantity || null,
          message: data.message || null,
        })
        .select()
        .single();

      if (dbError) throw dbError;
      if (row) addInquiry(row as Inquiry);
      setSubmitted(true);
      reset();
    } catch {
      setError('提交失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6 flex-wrap">
        <Link href="/" className="hover:text-foreground">首页</Link>
        <ChevronRight size={12} />
        {merchant && (
          <>
            <Link href={`/merchant/${merchant.id}`} className="hover:text-foreground">{merchant.name}</Link>
            <ChevronRight size={12} />
          </>
        )}
        <span className="text-foreground truncate">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        {/* Image gallery */}
        <div className="space-y-3">
          <div className="aspect-square rounded-2xl bg-muted overflow-hidden">
            {images[selectedImage] && !imgError ? (
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package size={48} className="text-muted-foreground/30" />
              </div>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => { setSelectedImage(i); setImgError(false); }}
                  className={cn(
                    'flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors',
                    selectedImage === i ? 'border-primary' : 'border-border hover:border-primary/40'
                  )}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product info + Inquiry form */}
        <div className="space-y-6">
          {/* Title & category */}
          <div>
            <span className="inline-block mb-2 px-2 py-0.5 rounded-md text-xs font-medium bg-muted text-muted-foreground">
              {product.category}
            </span>
            <h1 className="text-2xl font-bold text-foreground leading-tight">{product.name}</h1>
          </div>

          {/* Price */}
          <div className="flex items-end gap-3 bg-primary-50/60 rounded-xl p-4">
            <div>
              <div className="text-xs text-muted-foreground mb-1">参考价格</div>
              {product.reference_price ? (
                <div className="text-3xl font-bold text-primary">
                  ¥{product.reference_price.toLocaleString()}
                  <span className="text-sm font-normal text-muted-foreground ml-1">/{product.unit}</span>
                </div>
              ) : (
                <div className="text-xl font-semibold text-muted-foreground">价格面议</div>
              )}
            </div>
            {product.moq && product.moq > 1 && (
              <div className="ml-4 text-sm text-muted-foreground">
                <span className="text-foreground font-semibold">{product.moq.toLocaleString()}</span>
                {product.unit} 起订
              </div>
            )}
          </div>

          {/* Specs */}
          {product.specs && Array.isArray(product.specs) && product.specs.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">产品规格</h3>
              <div className="grid grid-cols-2 gap-2">
                {(product.specs as Array<{ name: string; value: string }>).map((spec) => (
                  <div key={spec.name} className="flex gap-2 text-sm">
                    <span className="text-muted-foreground flex-shrink-0">{spec.name}：</span>
                    <span className="text-foreground font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          {product.description && (
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">产品描述</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
            </div>
          )}

          {/* Merchant quick info */}
          {merchant && (
            <Link
              href={`/merchant/${merchant.id}`}
              className="flex items-center gap-3 p-3.5 rounded-xl border border-border hover:border-primary/30 hover:bg-muted/30 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-muted border border-border overflow-hidden flex-shrink-0">
                {merchant.logo_url ? (
                  <img src={merchant.logo_url} alt={merchant.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Building2 size={16} className="text-muted-foreground/50" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors truncate">
                    {merchant.name}
                  </span>
                  <ChamberPositionBadge position={merchant.chamber_position} />
                </div>
                <div className="flex items-center gap-2 mt-0.5 text-[11px] text-muted-foreground">
                  {merchant.phone && (
                    <span className="flex items-center gap-0.5">
                      <Phone size={9} /> {merchant.phone}
                    </span>
                  )}
                  {merchant.address && (
                    <span className="flex items-center gap-0.5 truncate">
                      <MapPin size={9} /> {merchant.address}
                    </span>
                  )}
                </div>
              </div>
              <ArrowRight size={14} className="flex-shrink-0 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
            </Link>
          )}

          {/* Inquiry form */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="px-5 py-4 border-b border-border bg-gradient-to-r from-primary/5 to-transparent">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <MessageSquare size={16} className="text-primary" />
                获取报价
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">填写信息，商家将尽快与您联系</p>
            </div>

            {submitted ? (
              <div className="p-6 flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  <CheckCircle size={24} className="text-emerald-600" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">询价已提交！</p>
                  <p className="text-xs text-muted-foreground mt-1">商家将尽快与您取得联系。</p>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-primary hover:underline"
                >
                  再次询价
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-foreground/80 mb-1.5 block">
                      联系人 <span className="text-destructive">*</span>
                    </label>
                    <input
                      {...register('contact_name', { required: '请填写联系人' })}
                      type="text"
                      placeholder="您的姓名"
                      className={cn(
                        'w-full h-9 px-3 rounded-lg border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all',
                        errors.contact_name ? 'border-destructive' : 'border-border focus:border-primary/50'
                      )}
                    />
                    {errors.contact_name && (
                      <p className="text-[11px] text-destructive mt-1">{errors.contact_name.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-xs font-medium text-foreground/80 mb-1.5 block">
                      联系电话 <span className="text-destructive">*</span>
                    </label>
                    <input
                      {...register('contact_phone', {
                        required: '请填写电话',
                        pattern: { value: /^[\d\-\s+()]{7,20}$/, message: '格式有误' },
                      })}
                      type="tel"
                      placeholder="手机/座机"
                      className={cn(
                        'w-full h-9 px-3 rounded-lg border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all',
                        errors.contact_phone ? 'border-destructive' : 'border-border focus:border-primary/50'
                      )}
                    />
                    {errors.contact_phone && (
                      <p className="text-[11px] text-destructive mt-1">{errors.contact_phone.message}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-foreground/80 mb-1.5 block">公司名称</label>
                    <input
                      {...register('contact_company')}
                      type="text"
                      placeholder="选填"
                      className="w-full h-9 px-3 rounded-lg border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-foreground/80 mb-1.5 block">
                      采购数量 ({product.unit})
                    </label>
                    <input
                      {...register('quantity', { valueAsNumber: true, min: 1 })}
                      type="number"
                      min={1}
                      className="w-full h-9 px-3 rounded-lg border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground/80 mb-1.5 block">备注需求</label>
                  <textarea
                    {...register('message')}
                    rows={3}
                    placeholder="请描述具体需求、规格要求、交货期等..."
                    className="w-full px-3 py-2 rounded-lg border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all resize-none"
                  />
                </div>
                {error && (
                  <p className="text-sm text-destructive bg-destructive/5 px-3 py-2 rounded-lg">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-10 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 disabled:opacity-60 transition-colors flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 size={15} className="animate-spin" />}
                  {loading ? '提交中...' : '提交询价申请'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-lg font-bold text-foreground">同店其他产品</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} merchantName={merchant?.name} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
