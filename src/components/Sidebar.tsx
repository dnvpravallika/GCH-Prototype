import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Wrench,
  Package,
  Users,
  HeartPulse,
  ClipboardList,
  BarChart3,
  Settings,
  Sun,
  FileText,
  UserPlus,
} from 'lucide-react';

const navItems = [
  { to: '/', label: 'Overview', icon: LayoutDashboard },
  { to: '/services', label: 'Services', icon: Wrench },
  { to: '/amc-packages', label: 'AMC Packages', icon: Package },
  { to: '/customers', label: 'Customers & Sites', icon: Users },
  { to: '/site-health/site-002', label: 'Site Health', icon: HeartPulse },
  { to: '/service-job', label: 'Service Jobs', icon: ClipboardList },
  { to: '/performance', label: 'Performance', icon: BarChart3 },
  { to: '/sop', label: 'SOP & Checklist', icon: Settings },
  { to: '/reports', label: 'Reports', icon: FileText },
  { to: '/register', label: 'Registration', icon: UserPlus },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-slate-900 text-white flex flex-col z-50">
      {/* Brand */}
      <div className="px-5 py-5 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg">
            <Sun className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-wide text-white leading-tight">GCH SolarCare</h1>
            <p className="text-[10px] text-slate-400 tracking-wider uppercase">Maintenance Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-600/20 text-emerald-400 shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <Icon className="w-[18px] h-[18px]" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-slate-700/50">
        <p className="text-[10px] text-slate-500 text-center">Green Carbon Hub © 2026</p>
      </div>
    </aside>
  );
}
