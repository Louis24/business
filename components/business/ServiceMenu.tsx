import { Clock } from 'lucide-react';
import type { ServiceItem } from '@/lib/types';

interface ServiceMenuProps {
  services: ServiceItem[];
}

export default function ServiceMenu({ services }: ServiceMenuProps) {
  if (services.length === 0) return null;

  return (
    <section>
      <h2 className="font-serif text-2xl text-foreground mb-1">Services & Pricing</h2>
      <div className="divider-gold mb-6" style={{ marginLeft: 0, background: '#C9A96E' }} />

      <div className="space-y-3">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-gold/30 hover:bg-gold/3 transition-all duration-200 group"
          >
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground group-hover:text-gold transition-colors">
                {service.name}
              </h3>
              {/* Translations */}
              {(service.nameZh || service.nameJa || service.nameKo) && (
                <p className="text-xs text-muted-foreground mt-0.5 flex gap-2">
                  {service.nameZh && <span>{service.nameZh}</span>}
                  {service.nameJa && <span>· {service.nameJa}</span>}
                  {service.nameKo && <span>· {service.nameKo}</span>}
                </p>
              )}
              {service.description && (
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {service.description}
                </p>
              )}
              <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
                <Clock size={11} />
                <span>{service.duration} min</span>
              </div>
            </div>

            <div className="flex-shrink-0 ml-4 text-right">
              <div className="text-lg font-bold text-gold font-serif">
                ฿{service.price.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">{service.currency}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
