import { cn } from '@/lib/utils';
import { CHAMBER_POSITION_LABELS, type ChamberPosition } from '@/lib/types';
import { Crown, Star, Award, Users } from 'lucide-react';

interface ChamberPositionBadgeProps {
  position: ChamberPosition;
  size?: 'sm' | 'md';
  className?: string;
}

const POSITION_CONFIG: Record<ChamberPosition, {
  icon: React.ElementType;
  className: string;
  dotColor: string;
}> = {
  president: {
    icon: Crown,
    className: 'bg-amber-50 text-amber-700 border border-amber-200 ring-1 ring-amber-300/50',
    dotColor: 'bg-amber-500',
  },
  vice_president: {
    icon: Star,
    className: 'bg-amber-50/70 text-amber-600 border border-amber-200/70',
    dotColor: 'bg-amber-400',
  },
  director: {
    icon: Award,
    className: 'bg-primary-50 text-primary-700 border border-primary-100',
    dotColor: 'bg-primary-500',
  },
  member: {
    icon: Users,
    className: 'bg-muted text-muted-foreground border border-border',
    dotColor: 'bg-muted-foreground',
  },
};

export default function ChamberPositionBadge({
  position,
  size = 'sm',
  className,
}: ChamberPositionBadgeProps) {
  const config = POSITION_CONFIG[position];
  const Icon = config.icon;
  const label = CHAMBER_POSITION_LABELS[position];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-medium',
        size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs',
        config.className,
        className
      )}
    >
      <Icon size={size === 'sm' ? 10 : 12} className="flex-shrink-0" />
      {label}
    </span>
  );
}
