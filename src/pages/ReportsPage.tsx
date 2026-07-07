import { useNavigate } from 'react-router-dom';
import {
  ClipboardList, CheckCircle2, Clock, Users, IndianRupee,
  FileText, Download, TrendingUp, BarChart3, CalendarCheck,
  SprayCan, Wrench, HeartPulse, Eye, Shield,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line,
} from 'recharts';
import Header from '../components/Header';
import { KpiCard, SectionCard, StatusBadge, TimelineItem } from '../components/ui';
import { formatCurrency } from '../data';

const monthlyCleaningData = [
  { month: 'Jan', visits: 32 },
  { month: 'Feb', visits: 38 },
  { month: 'Mar', visits: 42 },
  { month: 'Apr', visits: 48 },
  { month: 'May', visits: 55 },
  { month: 'Jun', visits: 62 },
  { month: 'Jul', visits: 58 },
];

const monthlyCheckupData = [
  { month: 'Jan', checkups: 12 },
  { month: 'Feb', checkups: 14 },
  { month: 'Mar', checkups: 18 },
  { month: 'Apr', checkups: 22 },
  { month: 'May', checkups: 28 },
  { month: 'Jun', checkups: 32 },
  { month: 'Jul', checkups: 26 },
];

const bundleDistribution = [
  { name: 'Basic', value: 38, color: '#94a3b8' },
  { name: 'Standard', value: 46, color: '#3b82f6' },
  { name: 'Premium', value: 28, color: '#10b981' },
];

const maintenanceTrends = [
  { month: 'Jan', jobs: 44, customers: 180 },
  { month: 'Feb', jobs: 52, customers: 195 },
  { month: 'Mar', jobs: 60, customers: 210 },
  { month: 'Apr', jobs: 70, customers: 222 },
  { month: 'May', jobs: 83, customers: 235 },
  { month: 'Jun', jobs: 94, customers: 248 },
];

const reports = [
  { type: 'Cleaning Reports', count: 142, icon: SprayCan, status: 'Available', color: 'text-blue-600', bg: 'bg-blue-50' },
  { type: 'Checkup Reports', count: 68, icon: Wrench, status: 'Available', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { type: 'Maintenance Reports', count: 94, icon: Shield, status: 'Available', color: 'text-teal-700', bg: 'bg-teal-50' },
  { type: 'Site Health Reports', count: 56, icon: HeartPulse, status: 'Available', color: 'text-amber-600', bg: 'bg-amber-50' },
  { type: 'Inspection Reports', count: 42, icon: Eye, status: 'Available', color: 'text-slate-600', bg: 'bg-slate-100' },
];

const recentActivity = [
  { date: '16 Jul 2026', title: 'Cleaning report generated — Auro Fresh Farms, Guntur Plant' },
  { date: '15 Jul 2026', title: 'Preventive maintenance completed — Nitya Villas, Guntur Cluster' },
  { date: '14 Jul 2026', title: 'Inspection approved — Veda Agro Industries, Tenali Unit 2' },
  { date: '13 Jul 2026', title: 'Customer notified — Sai Enclave, Ongole Rooftop checkup scheduled' },
  { date: '12 Jul 2026', title: 'Report downloaded — Sree Lakshmi Residency monthly summary' },
];

export default function ReportsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Header
        title="Reports & Analytics"
        subtitle="Management dashboard — maintenance jobs, bundle distribution, revenue overview, and report repository for GCH operations."
        actions={[
          { label: 'Export Reports', variant: 'primary', to: '/reports' },
        ]}
      />

      <main className="p-8 space-y-8">
        {/* Top KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <KpiCard title="Total Maintenance Jobs" value={402} subtext="Across all service types in 2026" icon={ClipboardList} color="emerald" />
          <KpiCard title="Completed" value={356} subtext="88.6% completion rate" icon={CheckCircle2} color="emerald" />
          <KpiCard title="Pending" value={46} subtext="Scheduled and in-progress" icon={Clock} color="amber" />
          <KpiCard title="AMC Customers" value={112} subtext="Active bundle subscriptions" icon={Users} color="blue" />
          <KpiCard title="Revenue (YTD)" value={formatCurrency(1845000)} subtext="Maintenance services revenue" icon={IndianRupee} color="emerald" />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Cleaning Visits */}
          <SectionCard title="Monthly Cleaning Visits" subtitle="Panel cleaning visits completed per month">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyCleaningData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} />
                  <Tooltip
                    contentStyle={{ borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                    formatter={(value: number) => [value, 'Cleaning Visits']}
                  />
                  <Bar dataKey="visits" fill="#10b981" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>

          {/* Monthly Checkups */}
          <SectionCard title="Monthly Checkups" subtitle="System checkup visits completed per month">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyCheckupData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} />
                  <Tooltip
                    contentStyle={{ borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                    formatter={(value: number) => [value, 'Checkups']}
                  />
                  <Bar dataKey="checkups" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bundle Distribution */}
          <SectionCard title="Bundle Distribution" subtitle="Active package distribution across customers">
            <div className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={bundleDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {bundleDistribution.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                    formatter={(value: number) => [value, 'Customers']}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex gap-6 mt-2">
                {bundleDistribution.map((b) => (
                  <div key={b.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: b.color }} />
                    <span className="text-xs text-slate-500">{b.name}</span>
                    <span className="text-xs font-bold text-slate-700">{b.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>

          {/* Maintenance Trends */}
          <div className="lg:col-span-2">
            <SectionCard title="Maintenance Trends" subtitle="Growth in maintenance jobs and active customers over 2026">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={maintenanceTrends} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} />
                    <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} />
                    <Tooltip
                      contentStyle={{ borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                    />
                    <Line type="monotone" dataKey="jobs" stroke="#10b981" strokeWidth={2.5} name="Jobs" dot={{ r: 4, fill: '#10b981', strokeWidth: 0 }} />
                    <Line type="monotone" dataKey="customers" stroke="#3b82f6" strokeWidth={2.5} name="Customers" dot={{ r: 4, fill: '#3b82f6', strokeWidth: 0 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center gap-6 mt-3 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500" /><span className="text-xs text-slate-500">Maintenance Jobs</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500" /><span className="text-xs text-slate-500">Active Customers</span></div>
              </div>
            </SectionCard>
          </div>
        </div>

        {/* Reports Table */}
        <SectionCard title="Report Repository" subtitle="Access and download maintenance reports by category">
          <div className="overflow-x-auto">
            <table className="w-full text-left" id="reports-table">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Report Type</th>
                  <th className="py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">Count</th>
                  <th className="py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">Status</th>
                  <th className="py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((r) => {
                  const Icon = r.icon;
                  return (
                    <tr key={r.type} className="border-b border-slate-50 hover:bg-emerald-50/30 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className={`${r.bg} p-2 rounded-lg`}>
                            <Icon className={`w-4 h-4 ${r.color}`} />
                          </div>
                          <span className="text-sm font-medium text-slate-800">{r.type}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center text-sm font-bold text-slate-700">{r.count}</td>
                      <td className="py-3 px-4 text-center">
                        <StatusBadge status={r.status} variant="success" />
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                          <Download className="w-3.5 h-3.5" />
                          Download
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* Recent Activity */}
        <SectionCard title="Recent Activity" subtitle="Latest report and maintenance activity timeline">
          <div className="space-y-0">
            {recentActivity.map((a, i) => (
              <TimelineItem key={i} date={a.date} title={a.title} />
            ))}
          </div>
        </SectionCard>
      </main>
    </div>
  );
}
