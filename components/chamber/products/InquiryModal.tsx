'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { X, CheckCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import { useAppStore } from '@/lib/store';
import type { Product, InquiryFormData, Inquiry } from '@/lib/types';

interface InquiryModalProps {
  open: boolean;
  onClose: () => void;
  product: Product;
  merchantName?: string;
}

export default function InquiryModal({ open, onClose, product, merchantName }: InquiryModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const addInquiry = (useAppStore as any)((s: any) => s?.addInquiry);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InquiryFormData>({
    defaultValues: { quantity: 1 },
  });

  const onSubmit = async (data: InquiryFormData) => {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        product_id: product.id,
        merchant_id: product.merchant_id,
        product_name: product.name,
        merchant_name: merchantName ?? null,
        contact_name: data.contact_name,
        contact_phone: data.contact_phone,
        contact_company: data.contact_company || null,
        quantity: data.quantity || null,
        message: data.message || null,
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: row, error: dbError } = await (supabase as any)
        .from('inquiries')
        .insert(payload)
        .select()
        .single();

      if (dbError) throw dbError;

      if (row) {
        addInquiry(row as Inquiry);
      }

      setSubmitted(true);
      reset();
    } catch (err) {
      setError('提交失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setError(null);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-card rounded-2xl shadow-2xl w-full max-w-md border border-border animate-fade-in">
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4">
          <div>
            <h2 className="font-bold text-foreground text-lg">获取报价</h2>
            <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">{product.name}</p>
          </div>
          <button
            onClick={handleClose}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-muted transition-colors text-muted-foreground"
          >
            <X size={16} />
          </button>
        </div>

        {submitted ? (
          <div className="px-6 pb-8 flex flex-col items-center text-center gap-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">
              <CheckCircle size={28} className="text-emerald-600" />
            </div>
            <div>
              <p className="font-semibold text-foreground">询价已提交！</p>
              <p className="text-sm text-muted-foreground mt-1">
                卖家将尽快与您取得联系，请保持电话畅通。
              </p>
            </div>
            <button
              onClick={handleClose}
              className="h-10 px-8 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              完成
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="px-6 pb-6 flex flex-col gap-4">
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
                    'w-full h-9 px-3 rounded-lg border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all',
                    errors.contact_name ? 'border-destructive' : 'border-border'
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
                    pattern: { value: /^[\d\-\s+()]{7,20}$/, message: '电话格式有误' },
                  })}
                  type="tel"
                  placeholder="手机/座机"
                  className={cn(
                    'w-full h-9 px-3 rounded-lg border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all',
                    errors.contact_phone ? 'border-destructive' : 'border-border'
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
                  placeholder={String(product.moq ?? 1)}
                  className="w-full h-9 px-3 rounded-lg border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-foreground/80 mb-1.5 block">备注信息</label>
              <textarea
                {...register('message')}
                rows={3}
                placeholder="请描述您的具体需求、规格要求等..."
                className="w-full px-3 py-2 rounded-lg border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all resize-none"
              />
            </div>

            {error && (
              <p className="text-sm text-destructive bg-destructive/5 px-3 py-2 rounded-lg">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="h-10 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 disabled:opacity-60 transition-colors flex items-center justify-center gap-2"
            >
              {loading && <Loader2 size={15} className="animate-spin" />}
              {loading ? '提交中...' : '提交询价'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
