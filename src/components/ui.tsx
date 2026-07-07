import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string | number;
  subtext: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  color?: 'emerald' | 'blue' | 'amber' | 'red' | 'slate';
}

const colorMap = {
  emerald: {
    bg: 'bg-emerald-50',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    valueShadow: 'text-slate-900',
  },
  blue: {
    bg: 'bg-blue-50',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    valueShadow: 'text-slate-900',
  },
  amber: {
    bg: 'bg-amber-50',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    valueShadow: 'text-slate-900',
  },
  red: {
    bg: 'bg-red-50',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    valueShadow: 'text-slate-900',
  },
  slate: {
    bg: 'bg-slate-50',
    iconBg: 'bg-slate-200',
    iconColor: 'text-slate-600',
    valueShadow: 'text-slate-900',
  },
};

export function KpiCard({ title, value, subtext, icon: Icon, color = 'emerald' }: KpiCardProps) {
  const c = colorMap[color];
  return (
    <div className="bg-white rounded-xl border border-slate-200/60 p-5 hover:shadow-md transition-all duration-300 hover:border-slate-300/80">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="text-2xl font-bold text-slate-900 tracking-tight">{value}</p>
        </div>
        <div className={`${c.iconBg} p-2.5 rounded-lg`}>
          <Icon className={`w-5 h-5 ${c.iconColor}`} />
        </div>
      </div>
      <p className="text-xs text-slate-400 mt-2">{subtext}</p>
    </div>
  );
}

interface StatusBadgeProps {
  status: string;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
}

const badgeVariants = {
  success: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  warning: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  danger: 'bg-red-50 text-red-700 ring-red-600/20',
  info: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  neutral: 'bg-slate-100 text-slate-600 ring-slate-500/20',
};

export function StatusBadge({ status, variant = 'neutral' }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ring-1 ring-inset ${badgeVariants[variant]}`}>
      {status}
    </span>
  );
}

export function getStatusVariant(status: string): 'success' | 'warning' | 'danger' | 'info' | 'neutral' {
  const map: Record<string, 'success' | 'warning' | 'danger' | 'info' | 'neutral'> = {
    'Good': 'success',
    'Completed': 'success',
    'Stable': 'success',
    'Attention': 'warning',
    'In Progress': 'warning',
    'Scheduled': 'info',
    'Alert': 'danger',
    'Delayed': 'danger',
    'Critical': 'danger',
  };
  return map[status] || 'neutral';
}

export function getPackageVariant(tier: string): 'success' | 'warning' | 'danger' | 'info' | 'neutral' {
  const map: Record<string, 'success' | 'warning' | 'danger' | 'info' | 'neutral'> = {
    'Basic': 'neutral',
    'Standard': 'info',
    'Premium': 'success',
    'One-Time': 'warning',
  };
  return map[tier] || 'neutral';
}

interface SectionCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  action?: { label: string; onClick?: () => void };
  className?: string;
}

export function SectionCard({ title, subtitle, children, action, className = '' }: SectionCardProps) {
  return (
    <div className={`bg-white rounded-xl border border-slate-200/60 overflow-hidden ${className}`}>
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
        {action && (
          <button
            onClick={action.onClick}
            className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            {action.label}
          </button>
        )}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

interface AlertCardProps {
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  cta: string;
  icon: LucideIcon;
  onClick?: () => void;
}

const severityStyles = {
  high: { badge: 'bg-red-100 text-red-700', border: 'border-l-red-500', icon: 'text-red-500' },
  medium: { badge: 'bg-amber-100 text-amber-700', border: 'border-l-amber-500', icon: 'text-amber-500' },
  low: { badge: 'bg-blue-100 text-blue-700', border: 'border-l-blue-500', icon: 'text-blue-500' },
};

export function AlertCard({ title, description, severity, cta, icon: Icon, onClick }: AlertCardProps) {
  const s = severityStyles[severity];
  return (
    <div className={`bg-white rounded-xl border border-slate-200/60 border-l-4 ${s.border} p-5 hover:shadow-md transition-all duration-300`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 mt-0.5 ${s.icon}`} />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
            <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${s.badge}`}>
              {severity}
            </span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
          <button onClick={onClick} className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 mt-2 transition-colors">
            {cta} →
          </button>
        </div>
      </div>
    </div>
  );
}

interface TimelineItemProps {
  date: string;
  title: string;
  upcoming?: boolean;
}

export function TimelineItem({ date, title, upcoming }: TimelineItemProps) {
  return (
    <div className="flex gap-4 relative">
      <div className="flex flex-col items-center">
        <div className={`w-3 h-3 rounded-full ring-4 ring-white z-10 ${upcoming ? 'bg-blue-500' : 'bg-emerald-500'}`} />
        <div className="w-px flex-1 bg-slate-200" />
      </div>
      <div className="pb-6">
        <p className="text-xs font-semibold text-slate-400 mb-0.5">{date}</p>
        <p className={`text-sm ${upcoming ? 'text-blue-700 font-semibold' : 'text-slate-700'}`}>{title}</p>
      </div>
    </div>
  );
}
