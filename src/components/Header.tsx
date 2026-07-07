import { Bell, Search, CalendarPlus, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
  subtitle: string;
  actions?: { label: string; to?: string; variant?: 'primary' | 'secondary' }[];
}

export default function Header({ title, subtitle, actions }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
      <div className="flex items-center justify-between px-8 py-4">
        {/* Left: Title + Subtitle */}
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h1>
          <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>
        </div>

        {/* Right: Actions + utilities */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-lg border border-slate-200/80 text-slate-400 text-sm w-56">
            <Search className="w-4 h-4" />
            <span>Search...</span>
          </div>

          {/* Action buttons */}
          {actions?.map((action) => (
            <button
              key={action.label}
              onClick={() => action.to && navigate(action.to)}
              className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                action.variant === 'primary'
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm shadow-emerald-200'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              {action.variant === 'primary' && <CalendarPlus className="w-4 h-4" />}
              {action.label}
            </button>
          ))}

          {/* Notification bell */}
          <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors" id="notification-bell">
            <Bell className="w-5 h-5 text-slate-500" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
          </button>

          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-sm cursor-pointer" id="user-avatar">
            <User className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </header>
  );
}
