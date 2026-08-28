'use client';

import { MessageCircle, Phone, Mail, Clock, MapPin, QrCode, Star } from 'lucide-react';
import type { Business } from '@/lib/types';

interface ContactCTAProps {
  business: Business;
}

export default function ContactCTA({ business }: ContactCTAProps) {
  const whatsappUrl = business.contact.whatsapp
    ? `https://wa.me/${business.contact.whatsapp.replace(/[^0-9]/g, '')}?text=Hi! I found you on Thailand Guide and would like to book a ${business.services[0]?.name ?? 'session'}.`
    : null;

  const lineUrl = business.contact.line
    ? `https://line.me/ti/p/${business.contact.line.replace('@', '')}`
    : null;

  return (
    <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
      {/* Header */}
      <div className="bg-dark p-5 text-center">
        <div className="text-3xl font-bold text-gold font-serif">
          ฿{business.startingPrice.toLocaleString()}
        </div>
        <div className="text-sm text-cream-muted mt-0.5">Starting price per person</div>

        {/* Rating */}
        <div className="flex items-center justify-center gap-1.5 mt-3">
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map(s => (
              <Star key={s} size={12} className={s <= Math.round(business.rating) ? 'fill-gold text-gold' : 'fill-muted text-muted'} />
            ))}
          </div>
          <span className="text-cream text-sm font-semibold">{business.rating.toFixed(1)}</span>
          <span className="text-cream-muted text-xs">({business.reviewCount})</span>
        </div>
      </div>

      <div className="p-5 space-y-3">
        {/* Primary: WhatsApp */}
        {whatsappUrl && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 w-full py-3 rounded-lg bg-whatsapp text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-md"
            id="whatsapp-cta"
          >
            <MessageCircle size={18} />
            Book via WhatsApp
          </a>
        )}

        {/* Secondary: LINE */}
        {lineUrl && (
          <a
            href={lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 w-full py-2.5 rounded-lg border border-[#00B900] text-[#00B900] font-medium text-sm hover:bg-[#00B900]/5 transition-colors"
          >
            <span className="text-base">LINE</span>
            Chat on LINE
          </a>
        )}

        {/* WeChat */}
        {business.contact.wechat && (
          <button className="flex items-center justify-center gap-2.5 w-full py-2.5 rounded-lg border border-border text-muted-foreground font-medium text-sm hover:border-gold/40 hover:text-foreground transition-colors">
            <span>💬</span>
            WeChat: {business.contact.wechat}
          </button>
        )}

        {/* Phone */}
        {business.contact.phone && (
          <a
            href={`tel:${business.contact.phone}`}
            className="flex items-center justify-center gap-2 w-full py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Phone size={14} />
            {business.contact.phone}
          </a>
        )}

        <hr className="border-border" />

        {/* Opening Hours */}
        <div className="flex items-start gap-2.5 text-sm">
          <Clock size={15} className="text-gold mt-0.5 flex-shrink-0" />
          <div>
            <span className="font-medium text-foreground">Open {business.openingHours.days}</span>
            <br />
            <span className="text-muted-foreground text-xs">
              {business.openingHours.open} – {business.openingHours.close}
            </span>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-2.5 text-sm">
          <MapPin size={15} className="text-gold mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-foreground/80 text-xs leading-relaxed">
              {business.location.address}
            </p>
            {business.location.googleMapsUrl && (
              <a
                href={business.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gold hover:underline mt-1 inline-block"
              >
                Open in Google Maps →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
