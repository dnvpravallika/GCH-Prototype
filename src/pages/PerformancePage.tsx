
import {
  Zap, HeartPulse, BarChart3, Activity, Radio, TrendingUp,
  Droplets, CheckCircle2, AlertTriangle, Clock,
  SprayCan, Wrench, Shield, Eye,
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import Header from '../components/Header';
import { KpiCard, SectionCard, StatusBadge } from '../components/ui';

// Static 30-day generation data with cleaning impact markers
const generationData = [
  { day: 'Jun 17', kWh: 168, cleaned: false },
  { day: 'Jun 18', kWh: 165, cleaned: false },
  { day: 'Jun 19', kWh: 162, cleaned: false },
  { day: 'Jun 20', kWh: 158, cleaned: false },
  { day: 'Jun 21', kWh: 155, cleaned: false },
  { day: 'Jun 22', kWh: 152, cleaned: false },
  { day: 'Jun 23', kWh: 150, cleaned: false },
  { day: 'Jun 24', kWh: 148, cleaned: false },
  { day: 'Jun 25', kWh: 160, cleaned: true },  // Cleaned
  { day: 'Jun 26', kWh: 172, cleaned: false },
  { day: 'Jun 27', kWh: 175, cleaned: false },
  { day: 'Jun 28', kWh: 178, cleaned: false },
  { day: 'Jun 29', kWh: 176, cleaned: false },
  { day: 'Jun 30', kWh: 174, cleaned: false },
  { day: 'Jul 01', kWh: 170, cleaned: false },
  { day: 'Jul 02', kWh: 168, cleaned: false },
  { day: 'Jul 03', kWh: 165, cleaned: false },
  { day: 'Jul 04', kWh: 162, cleaned: false },
  { day: 'Jul 05', kWh: 160, cleaned: false },
  { day: 'Jul 06', kWh: 158, cleaned: false },
  { day: 'Jul 07', kWh: 155, cleaned: false },
  { day: 'Jul 08', kWh: 152, cleaned: false },
  { day: 'Jul 09', kWh: 150, cleaned: false },
  { day: 'Jul 10', kWh: 175, cleaned: true },  // Cleaned
  { day: 'Jul 11', kWh: 180, cleaned: false },
  { day: 'Jul 12', kWh: 183, cleaned: false },
  { day: 'Jul 13', kWh: 185, cleaned: false },
  { day: 'Jul 14', kWh: 182, cleaned: false },
  { day: 'Jul 15', kWh: 180, cleaned: false },
  { day: 'Jul 16', kWh: 182, cleaned: false },
];

const comparisonData = [
  { label: 'Expected Generation', value: '194 kWh/day', status: 'Baseline', color: 'blue' },
  { label: 'Actual Generation', value: '182 kWh/day', status: 'Latest Snapshot', color: 'emerald' },
  { label: 'Efficiency', value: '93.8%', status: 'Above Threshold', color: 'emerald' },
  { label: 'Cleaning Impact', value: '+8% Post-Clean', status: 'Positive', color: 'emerald' },
  { label: 'Maintenance Status', value: 'On Schedule', status: 'Premium Package', color: 'emerald' },
];

const insights = [
  { text: 'Cleaning improved output by approximately 8%', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { text: 'Dust accumulation observed near east-facing array', icon: Droplets, color: 'text-amber-600', bg: 'bg-amber-50' },
  { text: 'No hotspot detected during thermal inspection', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { text: 'Overall system healthy — performance within expected range', icon: HeartPulse, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { text: 'Quarterly checkup recommended within next 3 months', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
];

const alertTimeline = [
  { date: '18 Jun 2026', title: 'Dust Accumulation — Resolved after wet cleaning', status: 'Resolved' },
  { date: '24 Jun 2026', title: 'Inverter Warning — Under monitoring', status: 'Monitoring' },
  { date: '10 Jul 2026', title: 'Cleaning Completed — Output improved', status: 'Completed' },
  { date: 'Oct 2026', title: 'Quarterly Inspection — Upcoming', status: 'Upcoming' },
];

const recommendations = [
  { title: 'Weekly Dry Cleaning', desc: 'Continue weekly dry brushing to prevent dust buildup', icon: SprayCan },
  { title: 'Fortnightly Wet Cleaning', desc: 'Perform wet cleaning every 15 days for optimal output', icon: Droplets },
  { title: 'System Checkup', desc: 'Perform system checkup every 3–6 months', icon: Wrench },
  { title: 'Preventive Maintenance', desc: 'Continue preventive maintenance for long-term performance', icon: Shield },
];

export default function PerformancePage() {

  return (
    <div className="min-h-screen">
      <Header
        title="Performance & Monitoring"
        subtitle="Latest maintenance monitoring snapshot and performance summary for Auro Fresh Farms — Guntur Plant (48 kW)"
        actions={[
          { label: 'View Site Health', variant: 'primary', to: '/site-health/site-002' },
        ]}
      />

      <main className="p-8 space-y-8">
        {/* Monitoring disclaimer */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 rounded-xl border border-blue-100 text-sm text-blue-700">
          <Radio className="w-4 h-4 shrink-0" />
          <span>
            <span className="font-semibold">Monitoring Concept —</span> Values shown are latest maintenance monitoring snapshots. This is not live IoT data.
          </span>
        </div>

        {/* Section 1: Top KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          <KpiCard title="Today's Output" value="182 kWh" subtext="Latest maintenance snapshot" icon={Zap} color="emerald" />
          <KpiCard title="Avg Daily Output" value="176 kWh" subtext="30-day average" icon={BarChart3} color="blue" />
          <KpiCard title="Performance Score" value="94%" subtext="Above target threshold" icon={TrendingUp} color="emerald" />
          <KpiCard title="System Health" value="84%" subtext="Dust buildup observed recently" icon={HeartPulse} color="amber" />
          <KpiCard title="Inverter Status" value="Healthy" subtext="1 warning in last 30 days" icon={Activity} color="emerald" />
          <KpiCard title="Monitoring Status" value="Latest Snapshot" subtext="Updated 16 Jul 2026" icon={Radio} color="blue" />
        </div>

        {/* Section 2: Power Generation Trend */}
        <SectionCard
          title="Power Generation Trend"
          subtitle="Last 30 days — cleaning dates highlighted"
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={generationData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94a3b8' }} interval={4} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} domain={[140, 200]} />
                <Tooltip
                  contentStyle={{ borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                  formatter={(value) => [`${value} kWh`, 'Output']}
                />
                <ReferenceLine x="Jun 25" stroke="#10b981" strokeDasharray="4 4" label={{ value: 'Cleaning', position: 'top', fill: '#10b981', fontSize: 10 }} />
                <ReferenceLine x="Jul 10" stroke="#10b981" strokeDasharray="4 4" label={{ value: 'Cleaning', position: 'top', fill: '#10b981', fontSize: 10 }} />
                <Line
                  type="monotone"
                  dataKey="kWh"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  dot={(props: any) => {
                    const { cx, cy, payload } = props;
                    if (payload.cleaned) {
                      return (
                        <circle key={`dot-${props.index}`} cx={cx} cy={cy} r={6} fill="#10b981" stroke="#fff" strokeWidth={2} />
                      );
                    }
                    return <circle key={`dot-${props.index}`} cx={cx} cy={cy} r={0} />;
                  }}
                  activeDot={{ r: 5, fill: '#059669', stroke: '#fff', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-6 mt-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-xs text-slate-500">Output (kWh/day)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 border-t-2 border-dashed border-emerald-500" />
              <span className="text-xs text-slate-500">Cleaning Date</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 italic">Before Cleaning → Output drops | After Cleaning → Output recovers</span>
            </div>
          </div>
        </SectionCard>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2/3 */}
          <div className="lg:col-span-2 space-y-6">
            {/* Section 3: Performance Comparison */}
            <SectionCard title="Performance Comparison" subtitle="Expected vs actual generation metrics">
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {comparisonData.map((c) => (
                  <div key={c.label} className="p-4 rounded-xl border border-slate-100 hover:border-emerald-200 hover:shadow-sm transition-all text-center">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{c.label}</p>
                    <p className={`text-lg font-bold ${c.color === 'blue' ? 'text-blue-700' : 'text-emerald-700'}`}>{c.value}</p>
                    <StatusBadge status={c.status} variant={c.color === 'blue' ? 'info' : 'success'} />
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Section 4: Inverter Summary */}
            <SectionCard title="Inverter Summary" subtitle="Current inverter status and maintenance history">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {[
                  { label: 'Status', value: 'Operating Normally', icon: CheckCircle2, color: 'text-emerald-600' },
                  { label: 'Warning Count', value: '1', icon: AlertTriangle, color: 'text-amber-600' },
                  { label: 'Last Inspection', value: '24 Jun 2026', icon: Eye, color: 'text-blue-600' },
                  { label: 'Last Maintenance', value: '03 Jul 2026', icon: Wrench, color: 'text-slate-600' },
                  { label: 'Next Inspection', value: 'October 2026', icon: Clock, color: 'text-blue-600' },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-center">
                      <Icon className={`w-5 h-5 ${item.color} mx-auto mb-2`} />
                      <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-0.5">{item.label}</p>
                      <p className="text-sm font-bold text-slate-800">{item.value}</p>
                    </div>
                  );
                })}
              </div>
            </SectionCard>

            {/* Section 5: Maintenance Insights */}
            <SectionCard title="Maintenance Insights" subtitle="Key findings from recent monitoring data">
              <div className="space-y-3">
                {insights.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.text} className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/20 transition-all">
                      <div className={`${item.bg} p-2 rounded-lg shrink-0`}>
                        <Icon className={`w-4 h-4 ${item.color}`} />
                      </div>
                      <p className="text-sm text-slate-700">{item.text}</p>
                    </div>
                  );
                })}
              </div>
            </SectionCard>
          </div>

          {/* Right 1/3 */}
          <div className="space-y-6">
            {/* Section 6: Alert Timeline */}
            <SectionCard title="Alert Timeline" subtitle="Recent alerts and status">
              <div className="space-y-0">
                {alertTimeline.map((a, i) => (
                  <div key={i} className="flex gap-4 relative">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ring-4 ring-white z-10 ${
                        a.status === 'Resolved' ? 'bg-emerald-500' :
                        a.status === 'Monitoring' ? 'bg-amber-500' :
                        a.status === 'Completed' ? 'bg-emerald-500' :
                        'bg-blue-500'
                      }`} />
                      {i < alertTimeline.length - 1 && <div className="w-px flex-1 bg-slate-200" />}
                    </div>
                    <div className="pb-5">
                      <p className="text-xs font-semibold text-slate-400 mb-0.5">{a.date}</p>
                      <p className="text-sm text-slate-700 mb-1">{a.title}</p>
                      <StatusBadge
                        status={a.status}
                        variant={
                          a.status === 'Resolved' || a.status === 'Completed' ? 'success' :
                          a.status === 'Monitoring' ? 'warning' : 'info'
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Section 7: Maintenance Recommendations */}
            <SectionCard title="Maintenance Recommendations" subtitle="Based on latest performance data">
              <div className="space-y-3">
                {recommendations.map((r) => {
                  const Icon = r.icon;
                  return (
                    <div key={r.title} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-colors">
                      <div className="bg-emerald-50 p-2 rounded-lg shrink-0">
                        <Icon className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{r.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{r.desc}</p>
                      </div>
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
