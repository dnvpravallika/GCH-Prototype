import { useState, useEffect } from 'react';
import { Bell, Search, CalendarPlus, User, Sparkles, X, ChevronRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface HeaderProps {
  title: string;
  subtitle: string;
  actions?: { label: string; to?: string; variant?: 'primary' | 'secondary' }[];
}

const routeLabelMap: Record<string, string> = {
  '/': 'Overview',
  '/services': 'Services',
  '/amc-packages': 'AMC Packages',
  '/customers': 'Customers & Sites',
  '/service-job': 'Service Jobs',
  '/site-health': 'Site Health',
  '/performance': 'Performance',
  '/sop': 'SOP & Checklist',
  '/reports': 'Reports',
  '/register': 'Registration',
};

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning';
  if (h < 17) return 'Good Afternoon';
  return 'Good Evening';
}

export default function Header({ title, subtitle, actions }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Build breadcrumb from current path, handling dynamic routes
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const currentLabel =
    routeLabelMap[location.pathname] ||
    // Match dynamic routes by checking if any key starts with the first segment
    Object.entries(routeLabelMap).find(([key]) => {
      const keyBase = key.split('/').filter(Boolean)[0];
      return keyBase && pathSegments[0] === keyBase;
    })?.[1] ||
    pathSegments[pathSegments.length - 1] ||
    'Overview';

  return (
    <header className="sticky top-0 z-40 overflow-hidden">
      {/* Animated gradient accent line */}
      <div
        className="h-[3px] w-full"
        style={{
          background: 'linear-gradient(90deg, #059669, #34d399, #0d9488, #34d399, #059669)',
          backgroundSize: '200% 100%',
          animation: 'shimmerGradient 4s ease-in-out infinite',
        }}
      />

      {/* Glassmorphism background */}
      <div className="bg-white/70 backdrop-blur-2xl border-b border-slate-200/40">
        {/* Top bar — breadcrumb + greeting + utilities */}
        <div className="flex items-center justify-between px-8 py-2 border-b border-slate-100/60">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <span className="hover:text-emerald-600 transition-colors cursor-pointer" onClick={() => navigate('/')}>
              GCH SolarCare
            </span>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className="text-slate-600">{currentLabel}</span>
          </nav>

          {/* Right side — greeting + quick utils */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/50">
              <Sparkles className="w-3 h-3 text-emerald-500" />
              <span className="text-[11px] font-semibold text-emerald-700">{getGreeting()}</span>
            </div>
          </div>
        </div>

        {/* Main header row */}
        <div
          className={`flex items-center justify-between px-8 py-4 transition-all duration-500 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
          }`}
        >
          {/* Left: Title + Subtitle */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3">
              {/* Animated accent dot */}
              <div className="relative flex-shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping opacity-40" />
              </div>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight truncate">{title}</h1>
            </div>
            <p className="text-sm text-slate-500 mt-1 ml-[22px] line-clamp-1 leading-relaxed">{subtitle}</p>
          </div>

          {/* Right: Search + Actions + utilities */}
          <div className="flex items-center gap-2.5 ml-6 flex-shrink-0">
            {/* Expandable Search */}
            <div
              className={`flex items-center transition-all duration-300 ease-out rounded-xl border overflow-hidden ${
                searchOpen
                  ? 'w-64 bg-white border-emerald-300 shadow-lg shadow-emerald-100/50 ring-2 ring-emerald-200/40'
                  : 'w-10 bg-slate-50/80 border-slate-200/60 hover:border-slate-300 hover:bg-slate-100/80 cursor-pointer'
              }`}
            >
              {searchOpen ? (
                <>
                  <Search className="w-4 h-4 text-emerald-500 ml-3 flex-shrink-0" />
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search anything..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="flex-1 px-2 py-2 text-sm bg-transparent outline-none text-slate-700 placeholder-slate-400"
                    onBlur={() => {
                      if (!searchValue) setSearchOpen(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        setSearchValue('');
                        setSearchOpen(false);
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      setSearchValue('');
                      setSearchOpen(false);
                    }}
                    className="p-1.5 mr-1 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <X className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2.5 flex items-center justify-center"
                  id="search-toggle"
                >
                  <Search className="w-4 h-4 text-slate-500" />
                </button>
              )}
            </div>

            {/* Divider */}
            <div className="w-px h-7 bg-slate-200/80 hidden sm:block" />

            {/* Action buttons */}
            {actions?.map((action) => (
              <button
                key={action.label}
                onClick={() => action.to && navigate(action.to)}
                className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 group ${
                  action.variant === 'primary'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500 shadow-md shadow-emerald-200/60 hover:shadow-lg hover:shadow-emerald-300/50 hover:-translate-y-px active:translate-y-0'
                    : 'bg-white text-slate-700 border border-slate-200/80 hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm active:bg-slate-100'
                }`}
              >
                {action.variant === 'primary' && (
                  <CalendarPlus className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
                )}
                {action.label}
              </button>
            ))}

            {/* Notification bell */}
            <button
              className="relative p-2.5 rounded-xl hover:bg-slate-100/80 transition-all duration-200 group"
              id="notification-bell"
            >
              <Bell className="w-[18px] h-[18px] text-slate-500 group-hover:text-slate-700 transition-colors duration-200 group-hover:animate-[wiggle_0.5s_ease-in-out]" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white">
                <span className="absolute inset-0 w-2 h-2 bg-red-400 rounded-full animate-ping opacity-60" />
              </span>
            </button>

            {/* Avatar with status ring */}
            <div className="relative group cursor-pointer" id="user-avatar">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 flex items-center justify-center shadow-md shadow-emerald-200/50 ring-2 ring-white transition-all duration-300 group-hover:shadow-lg group-hover:shadow-emerald-300/40 group-hover:ring-emerald-200 group-hover:scale-105">
                <User className="w-4 h-4 text-white" />
              </div>
              {/* Online status indicator */}
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full ring-2 ring-white" />
            </div>
          </div>
        </div>
      </div>

      {/* CSS Keyframes */}
      <style>{`
        @keyframes shimmerGradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(8deg); }
          50% { transform: rotate(-6deg); }
          75% { transform: rotate(4deg); }
        }
      `}</style>
    </header>
  );
}
