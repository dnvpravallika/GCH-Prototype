import { useNavigate } from 'react-router-dom';
import {
  MapPin, Users, UserCheck, CalendarClock, Search, Filter,
  TrendingUp,
} from 'lucide-react';
import Header from '../components/Header';
import { KpiCard, SectionCard, StatusBadge, getStatusVariant, getPackageVariant } from '../components/ui';
import { customerSites } from '../data';

export default function CustomersPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Header
        title="Customers & Sites Portfolio"
        subtitle="Track customer sites, bundled package coverage, service schedules, and maintenance health across Green Carbon Hub accounts."
        actions={[
          { label: 'Add Site Record', variant: 'primary', to: '/customers' },
          { label: 'Export List', variant: 'secondary' },
        ]}
      />

      <main className="p-8 space-y-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard title="Total Sites Covered" value={112} subtext="Residential and commercial solar sites" icon={MapPin} color="emerald" />
          <KpiCard title="Bundle Customers" value={84} subtext="Active bundled maintenance plans" icon={Users} color="blue" />
          <KpiCard title="One-Time Service Customers" value={28} subtext="Individual service bookings" icon={UserCheck} color="amber" />
          <KpiCard title="Sites Due This Week" value={14} subtext="Cleaning, checkup, and renewal visits" icon={CalendarClock} color="red" />
        </div>

        {/* Filter Row */}
        <div className="bg-white rounded-xl border border-slate-200/60 p-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg border border-slate-200 flex-1 min-w-[200px] max-w-sm">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by customer or site..."
                className="bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none w-full"
                readOnly
              />
            </div>
            {[
              { label: 'Segment', options: ['Residential', 'Commercial'] },
              { label: 'Package', options: ['Basic', 'Standard', 'Premium', 'One-Time'] },
              { label: 'Health', options: ['Good', 'Attention', 'Alert'] },
              { label: 'Due', options: ['Cleaning Due', 'Checkup Due', 'Renewal Due'] },
            ].map((filter) => (
              <div key={filter.label} className="relative">
                <button className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-100 transition-colors">
                  <Filter className="w-3.5 h-3.5" />
                  {filter.label}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Main Portfolio Table */}
        <SectionCard
          title="Customer Site Portfolio"
          subtitle="All active customer sites under GCH maintenance coverage"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left" id="customer-portfolio-table">
              <thead>
                <tr className="border-b border-slate-100">
                  {['Customer Name', 'Site Name / Location', 'Segment', 'System Size', 'Package', 'Last Service', 'Next Visit', 'Health Status', 'Open Alerts'].map((h) => (
                    <th key={h} className="py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {customerSites.map((site) => (
                  <tr
                    key={site.id}
                    className="border-b border-slate-50 hover:bg-emerald-50/30 cursor-pointer transition-colors group"
                    onClick={() => navigate(`/site-health/${site.id}`)}
                  >
                    <td className="py-3 px-4 text-sm font-medium text-slate-800 group-hover:text-emerald-700 transition-colors">{site.customerName}</td>
                    <td className="py-3 px-4 text-sm text-slate-600">{site.siteName}</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={site.segment} variant={site.segment === 'Commercial' ? 'info' : 'neutral'} />
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600 font-medium">{site.systemSize}</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={site.packageTier} variant={getPackageVariant(site.packageTier)} />
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-500">{site.lastService}</td>
                    <td className="py-3 px-4 text-sm text-slate-600 font-medium">{site.nextVisit}</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={site.healthStatus} variant={getStatusVariant(site.healthStatus)} />
                    </td>
                    <td className="py-3 px-4">
                      {site.openAlerts > 0 ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-700 text-xs font-bold">
                          {site.openAlerts}
                        </span>
                      ) : (
                        <span className="text-sm text-slate-300">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* Portfolio Insights */}
        <SectionCard title="Portfolio Insights" subtitle="Key observations across the maintenance portfolio">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: 'Renewal Follow-Up',
                text: '8 sites are due for renewal this month',
                icon: TrendingUp,
                color: 'text-emerald-600',
                bg: 'bg-emerald-50',
              },
              {
                title: 'Cleaning Cycle Alert',
                text: '5 sites are due for wet cleaning based on the 15-day cleaning cycle',
                icon: CalendarClock,
                color: 'text-amber-600',
                bg: 'bg-amber-50',
              },
              {
                title: 'Quarterly Checkup Due',
                text: '3 commercial sites are due for system checkup this quarter',
                icon: MapPin,
                color: 'text-blue-600',
                bg: 'bg-blue-50',
              },
              {
                title: 'Premium Coverage',
                text: 'Premium customers contribute the highest recurring maintenance coverage',
                icon: Users,
                color: 'text-emerald-600',
                bg: 'bg-emerald-50',
              },
            ].map((insight) => {
              const Icon = insight.icon;
              return (
                <div
                  key={insight.title}
                  className="flex items-start gap-3 p-4 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/20 transition-all"
                >
                  <div className={`${insight.bg} p-2 rounded-lg`}>
                    <Icon className={`w-4 h-4 ${insight.color}`} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800">{insight.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{insight.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>
      </main>
    </div>
  );
}
