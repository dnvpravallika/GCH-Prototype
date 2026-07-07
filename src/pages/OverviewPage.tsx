import { useNavigate } from 'react-router-dom';
import {
  Users, CalendarCheck, AlertCircle, Radio, RefreshCw,
  Droplets, ClipboardCheck, Zap, CloudRain,
  ArrowRight, Sparkles,
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Header from '../components/Header';
import { KpiCard, SectionCard, StatusBadge, AlertCard, getStatusVariant, getPackageVariant } from '../components/ui';
import { bundledPackages, upcomingVisits, serviceActivityData, formatCurrency } from '../data';

export default function OverviewPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Header
        title="Maintenance Overview"
        subtitle="Operational snapshot of Green Carbon Hub's maintenance customers, service schedules, bundled packages, and solar site health."
        actions={[
          { label: 'Schedule Visit', variant: 'primary', to: '/customers' },
          { label: 'View AMC Pricing', variant: 'secondary', to: '/amc-packages' },
        ]}
      />

      <main className="p-8 space-y-8">
        {/* KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <KpiCard
            title="Active Maintenance Customers"
            value={248}
            subtext="Across bundled plans and one-time service customers"
            icon={Users}
            color="emerald"
          />
          <KpiCard
            title="Today's Scheduled Visits"
            value={18}
            subtext="Cleaning, checkups, and preventive maintenance"
            icon={CalendarCheck}
            color="blue"
          />
          <KpiCard
            title="Open Service Requests"
            value={12}
            subtext="4 marked urgent"
            icon={AlertCircle}
            color="amber"
          />
          <KpiCard
            title="Sites Under Monitoring"
            value={112}
            subtext="Tracked for cleaning cycle, checkup, and performance notes"
            icon={Radio}
            color="slate"
          />
          <KpiCard
            title="Renewals Due This Month"
            value={26}
            subtext="Bundle renewal follow-up required"
            icon={RefreshCw}
            color="red"
          />
        </div>

        {/* Bundled Package Snapshot + Service Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bundled Package Snapshot */}
          <div className="lg:col-span-2">
            <SectionCard
              title="Bundled Package Snapshot"
              subtitle="Active GCH maintenance bundles with real pricing"
              action={{ label: 'View full pricing', onClick: () => navigate('/amc-packages') }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {bundledPackages.map((pkg) => (
                  <div
                    key={pkg.name}
                    className={`relative rounded-xl border p-5 transition-all duration-300 hover:shadow-lg cursor-pointer ${
                      pkg.recommended
                        ? 'border-emerald-300 bg-gradient-to-br from-emerald-50 to-teal-50 ring-1 ring-emerald-200'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                    onClick={() => navigate('/amc-packages')}
                  >
                    {pkg.recommended && (
                      <div className="absolute -top-2.5 left-4">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-bold uppercase rounded-full shadow-sm">
                          <Sparkles className="w-3 h-3" /> Best Value
                        </span>
                      </div>
                    )}
                    <p className="text-sm font-semibold text-slate-700 mb-1">{pkg.name}</p>
                    <p className="text-xs text-slate-400 mb-3">
                      {pkg.cleaningVisits} cleaning{pkg.cleaningVisits > 1 ? 's' : ''} + {pkg.checkupVisits} checkup{pkg.checkupVisits > 1 ? 's' : ''} + subscription
                    </p>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-extrabold text-slate-900">{formatCurrency(pkg.bundledPrice)}</span>
                    </div>
                    <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-[11px] font-bold">
                      {pkg.savingPercent}% savings
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>

          {/* Service Activity Chart */}
          <SectionCard title="Service Activity Overview" subtitle="Current service distribution">
            <div className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={serviceActivityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {serviceActivityData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [value, '']}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 mt-2 w-full">
                {serviceActivityData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-slate-500">{item.name}</span>
                    <span className="text-xs font-bold text-slate-700 ml-auto">{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 w-full space-y-2">
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Weekly dry cleaning and fortnightly wet cleaning make up the largest share of routine visits.
                </p>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Quarterly checkups and preventive maintenance are primarily tied to Standard and Premium customers.
                </p>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Upcoming Maintenance Visits */}
        <SectionCard
          title="Upcoming Maintenance Visits"
          subtitle="Scheduled visits across customer sites"
          action={{ label: 'View All', onClick: () => navigate('/customers') }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  {['Customer', 'Site', 'Service Type', 'Package', 'Date', 'Technician', 'Status'].map((h) => (
                    <th key={h} className="py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {upcomingVisits.map((visit, i) => (
                  <tr
                    key={i}
                    className="border-b border-slate-50 hover:bg-slate-50/80 cursor-pointer transition-colors"
                    onClick={() => navigate('/service-job')}
                  >
                    <td className="py-3 px-4 text-sm font-medium text-slate-800">{visit.customer}</td>
                    <td className="py-3 px-4 text-sm text-slate-600">{visit.site}</td>
                    <td className="py-3 px-4 text-sm text-slate-600">{visit.serviceType}</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={visit.plan} variant={getPackageVariant(visit.plan)} />
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600">{visit.date}</td>
                    <td className="py-3 px-4 text-sm text-slate-600">{visit.technician}</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={visit.status} variant={getStatusVariant(visit.status)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* Sites Needing Attention */}
        <SectionCard title="Sites Needing Attention" subtitle="Critical alerts requiring follow-up">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AlertCard
              title="Overdue Wet Cleaning"
              description="3 sites have exceeded the recommended 15-day wet cleaning cycle"
              severity="high"
              icon={Droplets}
              cta="View Sites"
              onClick={() => navigate('/customers')}
            />
            <AlertCard
              title="Checkup Due"
              description="5 sites are due for a 3–6 month system checkup"
              severity="medium"
              icon={ClipboardCheck}
              cta="View Sites"
              onClick={() => navigate('/customers')}
            />
            <AlertCard
              title="Inverter Warnings"
              description="2 sites have recurring inverter warning notes from recent maintenance visits"
              severity="medium"
              icon={Zap}
              cta="View Sites"
              onClick={() => navigate('/site-health/site-002')}
            />
            <AlertCard
              title="Low Output / Dust Impact"
              description="4 sites show low output notes potentially linked to dust buildup or shading"
              severity="low"
              icon={CloudRain}
              cta="View Sites"
              onClick={() => navigate('/customers')}
            />
          </div>
        </SectionCard>

        {/* Quick Access */}
        <SectionCard title="Quick Access" subtitle="Jump to key areas of the platform">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { label: 'Services Catalog', to: '/services' },
              { label: 'AMC Packages & Pricing', to: '/amc-packages' },
              { label: 'Customers & Sites', to: '/customers' },
              { label: 'Reports & Analytics', to: '/reports' },
              { label: 'Register Customer', to: '/register' },
            ].map((tile) => (
              <button
                key={tile.label}
                onClick={() => navigate(tile.to)}
                className="group flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white hover:bg-emerald-50 hover:border-emerald-200 transition-all duration-200 text-left"
              >
                <span className="text-sm font-medium text-slate-700 group-hover:text-emerald-700">{tile.label}</span>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
              </button>
            ))}
          </div>
        </SectionCard>
      </main>
    </div>
  );
}
