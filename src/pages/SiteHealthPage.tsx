import { useNavigate } from 'react-router-dom';
import {
  HeartPulse, Zap, AlertTriangle, SprayCan,
  Eye, CalendarPlus, FileText,
  Building2, MapPin, Package, ArrowLeft,
  CheckCircle2, Clock, Wrench, Shield, Thermometer,
  Cable, Battery, Sun as SunIcon,
} from 'lucide-react';
import Header from '../components/Header';
import { KpiCard, SectionCard, StatusBadge, TimelineItem } from '../components/ui';
import { formatCurrency } from '../data';

// This page always shows the Auro Fresh Farms detail as specified
const siteData = {
  customerName: 'Auro Fresh Farms',
  siteName: 'Guntur Plant',
  location: 'Andhra Pradesh',
  segment: 'Commercial',
  systemSize: '48 kW',
  packageTier: 'Premium',
  nextVisit: '16 Jul 2026',
  healthScore: 84,
  lastOutput: '182 kWh/day',
  inverterStatus: 'Stable',
  openAlerts: 2,
  lastCleaning: '03 Jul 2026',
  daysSinceCleaning: 13,
};

const timelineEntries = [
  { date: '16 Jul 2026', title: 'Upcoming service visit scheduled', upcoming: true },
  { date: '03 Jul 2026', title: 'Preventive maintenance and cleaning completed' },
  { date: '24 Jun 2026', title: 'Inverter inspection and output review completed' },
  { date: '18 Jun 2026', title: 'Dust buildup note logged by crew' },
  { date: '10 Jun 2026', title: 'Wet cleaning completed' },
];

const issues = [
  {
    issue: 'Dust and bird dropping buildup on east-facing array',
    severity: 'Medium',
    observation: 'Localized shading visible',
    action: 'Perform next wet cleaning cycle and inspect output after cleaning',
  },
  {
    issue: 'Inverter warning observed twice this week',
    severity: 'Low',
    observation: 'No shutdown but warning repeated',
    action: 'Inspect during next maintenance visit',
  },
  {
    issue: 'Output slightly below expected baseline',
    severity: 'Medium',
    observation: 'May be due to dust and seasonal conditions',
    action: 'Compare after cleaning and check inverter logs',
  },
];

const serviceHistory = [
  { date: '03 Jul 2026', type: 'Preventive Maintenance', technician: 'Ravi Kumar', result: 'Completed', report: 'Available' },
  { date: '24 Jun 2026', type: 'Inverter Inspection', technician: 'Harish', result: 'Completed', report: 'Available' },
  { date: '10 Jun 2026', type: 'Wet Cleaning', technician: 'Arun', result: 'Completed', report: 'Available' },
];

const maintenanceScope = [
  { label: 'Weekly dry brushing review', icon: SprayCan, status: 'Active' },
  { label: 'Fortnightly wet cleaning target', icon: SprayCan, status: 'Active' },
  { label: 'Periodic full system checkup', icon: Shield, status: 'Active' },
  { label: 'Inverter review', icon: Zap, status: 'Active' },
  { label: 'Performance comparison', icon: Eye, status: 'Active' },
  { label: 'Hotspot / thermal scan planning', icon: Thermometer, status: 'Planned' },
  { label: 'Torque / earthing checks', icon: Cable, status: 'Periodic' },
];

export default function SiteHealthPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Header
        title="Customer Site Detail"
        subtitle="Solar asset health, maintenance timeline, and service coverage for this site"
        actions={[
          { label: 'Schedule Visit', variant: 'primary', to: '/customers' },
        ]}
      />

      <main className="p-8 space-y-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/customers')}
          className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Customers & Sites
        </button>

        {/* Section A — Site Header */}
        <div className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 p-6 text-white">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Building2 className="w-5 h-5 text-emerald-200" />
                  <h2 className="text-xl font-bold">{siteData.customerName}</h2>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-emerald-100 text-sm mt-1">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{siteData.siteName}, {siteData.location}</span>
                  <span className="text-emerald-300">•</span>
                  <span>{siteData.segment} Site</span>
                  <span className="text-emerald-300">•</span>
                  <span>{siteData.systemSize}</span>
                  <span className="text-emerald-300">•</span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white/20 rounded-full text-xs font-semibold">
                    <Package className="w-3 h-3" />{siteData.packageTier} Package
                  </span>
                </div>
                <p className="text-emerald-200 text-sm mt-2">
                  Next service due: <span className="text-white font-bold">{siteData.nextVisit}</span>
                </p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button className="px-4 py-2 bg-white/15 hover:bg-white/25 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5">
                  <Eye className="w-4 h-4" /> Open Performance View
                </button>
                <button className="px-4 py-2 bg-white/15 hover:bg-white/25 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5">
                  <FileText className="w-4 h-4" /> View Latest Service
                </button>
                <button className="px-4 py-2 bg-white hover:bg-emerald-50 text-emerald-700 rounded-lg text-sm font-bold transition-colors flex items-center gap-1.5">
                  <CalendarPlus className="w-4 h-4" /> Schedule Visit
                </button>
              </div>
            </div>
          </div>

          {/* Section B — Health Snapshot */}
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <KpiCard
                title="System Health Score"
                value={`${siteData.healthScore} / 100`}
                subtext="Stable but dust buildup observed recently"
                icon={HeartPulse}
                color="emerald"
              />
              <KpiCard
                title="Last Output Snapshot"
                value={siteData.lastOutput}
                subtext="Maintenance monitoring snapshot"
                icon={Battery}
                color="blue"
              />
              <KpiCard
                title="Inverter Status"
                value={siteData.inverterStatus}
                subtext="Warning observed once in the last 7 days"
                icon={Zap}
                color="amber"
              />
              <KpiCard
                title="Open Alerts"
                value={siteData.openAlerts}
                subtext="Dust accumulation and warning follow-up"
                icon={AlertTriangle}
                color="red"
              />
              <KpiCard
                title="Last Cleaning"
                value={siteData.lastCleaning}
                subtext={`${siteData.daysSinceCleaning} days since last cleaning`}
                icon={SprayCan}
                color="slate"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2/3 */}
          <div className="lg:col-span-2 space-y-6">
            {/* Section C — Package Summary */}
            <SectionCard title="Package Summary" subtitle="Active maintenance coverage for this site">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <StatusBadge status="Premium" variant="success" />
                    <span className="text-sm text-slate-500">Active Package</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-slate-500">Cleaning visits included</span><span className="font-semibold">4</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Checkup visits included</span><span className="font-semibold">2</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Subscription</span><span className="font-semibold">Included</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Bundle price reference</span><span className="font-bold text-emerald-700">{formatCurrency(2999)}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Last checkup</span><span className="font-semibold">24 Jun 2026</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Next scheduled cleaning</span><span className="font-semibold">16 Jul 2026</span></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Coverage Used This Cycle</p>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-600">Cleaning visits</span>
                        <span className="font-bold text-slate-800">2 / 4</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5">
                        <div className="bg-emerald-500 rounded-full h-2.5 transition-all" style={{ width: '50%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-600">Checkups</span>
                        <span className="font-bold text-slate-800">1 / 2</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5">
                        <div className="bg-blue-500 rounded-full h-2.5 transition-all" style={{ width: '50%' }} />
                      </div>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2">
                    Premium package includes 4 cleanings and 2 checkups per cycle
                  </p>
                </div>
              </div>
            </SectionCard>

            {/* Section E — Issues & Recommendations */}
            <SectionCard title="Issues & Recommendations" subtitle="Active observations requiring follow-up">
              <div className="overflow-x-auto">
                <table className="w-full text-left" id="issues-table">
                  <thead>
                    <tr className="border-b border-slate-100">
                      {['Issue', 'Severity', 'Observation', 'Recommended Action'].map((h) => (
                        <th key={h} className="py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {issues.map((row, i) => (
                      <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                        <td className="py-3 px-4 text-sm text-slate-700 font-medium max-w-[200px]">{row.issue}</td>
                        <td className="py-3 px-4">
                          <StatusBadge
                            status={row.severity}
                            variant={row.severity === 'Medium' ? 'warning' : 'info'}
                          />
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-500">{row.observation}</td>
                        <td className="py-3 px-4 text-sm text-slate-600">{row.action}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SectionCard>

            {/* Section G — Service History */}
            <SectionCard title="Recent Service History" subtitle="Completed maintenance visits for this site">
              <div className="overflow-x-auto">
                <table className="w-full text-left" id="service-history-table">
                  <thead>
                    <tr className="border-b border-slate-100">
                      {['Date', 'Service Type', 'Technician', 'Result', 'Report Status'].map((h) => (
                        <th key={h} className="py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {serviceHistory.map((row, i) => (
                      <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                        <td className="py-3 px-4 text-sm font-medium text-slate-700">{row.date}</td>
                        <td className="py-3 px-4 text-sm text-slate-600">{row.type}</td>
                        <td className="py-3 px-4 text-sm text-slate-600">{row.technician}</td>
                        <td className="py-3 px-4">
                          <StatusBadge status={row.result} variant="success" />
                        </td>
                        <td className="py-3 px-4">
                          <span className="flex items-center gap-1 text-sm text-emerald-600 font-medium cursor-pointer hover:text-emerald-700">
                            <FileText className="w-3.5 h-3.5" />
                            Report {row.report}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SectionCard>
          </div>

          {/* Right 1/3 */}
          <div className="space-y-6">
            {/* Section D — Maintenance Timeline */}
            <SectionCard title="Maintenance Timeline" subtitle="Recent and upcoming service events">
              <div className="space-y-0">
                {timelineEntries.map((entry, i) => (
                  <TimelineItem key={i} date={entry.date} title={entry.title} upcoming={entry.upcoming} />
                ))}
              </div>
            </SectionCard>

            {/* Section F — Maintenance Scope */}
            <SectionCard title="Maintenance Scope for This Site" subtitle="Applicable maintenance activities and SOP coverage">
              <div className="space-y-3">
                {maintenanceScope.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50/50 hover:bg-emerald-50/30 transition-colors">
                      <Icon className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="text-sm text-slate-700 flex-1">{item.label}</span>
                      <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                        item.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                        item.status === 'Planned' ? 'bg-blue-100 text-blue-700' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </SectionCard>
          </div>
        </div>
      </main>
    </div>
  );
}
