import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, User, MapPin, Package, Zap, Clock, Calendar,
  CheckCircle2, Shield, Camera, MessageSquare,
  Building2, Wrench, Eye, AlertTriangle, Heart, SprayCan,
} from 'lucide-react';
import Header from '../components/Header';
import { SectionCard, StatusBadge } from '../components/ui';

const jobData = {
  jobId: 'JOB-2026-0142',
  customer: 'Auro Fresh Farms',
  location: 'Guntur Plant',
  region: 'Andhra Pradesh',
  packageTier: 'Premium',
  capacity: '48 kW',
  technician: 'Ravi Kumar',
  scheduledDate: '16 Jul 2026',
  status: 'Completed',
  duration: '3 Hours 20 Minutes',
  priority: 'Medium',
};

const workPerformed = [
  'Panel Cleaning',
  'Weekly Dry Dust Removal',
  'Wet Cleaning',
  'Junction Box Inspection',
  'Wiring Inspection',
  'Connector Inspection',
  'Inverter Inspection',
  'Voltage Observation',
  'Current Observation',
  'Mounting Structure Inspection',
  'Performance Observation',
  'Shading Inspection',
  'Damaged Panel Inspection',
];

const cleaningChecklist = [
  'Pre-clean visual inspection',
  'Bird droppings removed',
  'Dust removed',
  'Soft brush used',
  'Safe water pressure used',
  'Final rinse completed',
  'Panels dried',
  'Final inspection completed',
];

const safetyChecklist = [
  { item: 'PPE used', detail: 'Full PPE kit' },
  { item: 'Gloves', detail: 'Insulating gloves' },
  { item: 'Helmet', detail: 'Safety helmet worn' },
  { item: 'Safety belt', detail: 'Fall protection harness' },
  { item: 'Non-slip footwear', detail: 'Anti-slip boots' },
  { item: 'System isolated before cleaning', detail: 'De-energized' },
  { item: 'Water pressure below 35 bar', detail: '≤ 35 bar confirmed' },
  { item: 'No abrasive chemicals used', detail: 'Clean water only' },
];

const findings = [
  { finding: 'Heavy dust accumulation', severity: 'Medium', color: 'warning' as const, icon: AlertTriangle },
  { finding: 'Minor connector corrosion', severity: 'Low', color: 'info' as const, icon: Zap },
  { finding: 'One inverter warning', severity: 'Low', color: 'info' as const, icon: Zap },
  { finding: 'Overall generation normal after cleaning', severity: 'Healthy', color: 'success' as const, icon: Heart },
];

const galleryItems = [
  { label: 'Before Cleaning', desc: 'Dust and debris visible on panels' },
  { label: 'After Cleaning', desc: 'Panels cleaned and inspected' },
  { label: 'Inspection Image', desc: 'Junction box and wiring review' },
  { label: 'Thermal Inspection', desc: 'No hotspot anomalies detected' },
];

export default function ServiceJobPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Header
        title="Service Job Detail"
        subtitle={`Job ${jobData.jobId} — Maintenance visit record for ${jobData.customer}`}
        actions={[
          { label: 'Schedule Visit', variant: 'primary', to: '/customers' },
        ]}
      />

      <main className="p-8 space-y-8">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Job Header Bar */}
        <div className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 p-6 text-white">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold tracking-wide">
                    {jobData.jobId}
                  </span>
                  <StatusBadge status={jobData.status} variant="success" />
                  <StatusBadge status={jobData.priority} variant="warning" />
                </div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-emerald-400" />
                  {jobData.customer}
                </h2>
                <div className="flex flex-wrap items-center gap-3 text-slate-300 text-sm mt-1">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{jobData.location}, {jobData.region}</span>
                  <span className="text-slate-500">•</span>
                  <span className="flex items-center gap-1"><Package className="w-3.5 h-3.5" />{jobData.packageTier}</span>
                  <span className="text-slate-500">•</span>
                  <span>{jobData.capacity}</span>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => navigate('/site-health/site-002')}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5"
                >
                  <Eye className="w-4 h-4" /> View Site Health
                </button>
                <button
                  onClick={() => navigate('/performance')}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5"
                >
                  <Zap className="w-4 h-4" /> Performance
                </button>
              </div>
            </div>
          </div>

          {/* Section 1: Job Summary Cards */}
          <div className="p-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
              {[
                { label: 'Customer', value: jobData.customer, icon: Building2 },
                { label: 'Site', value: jobData.location, icon: MapPin },
                { label: 'Package', value: jobData.packageTier, icon: Package },
                { label: 'Capacity', value: jobData.capacity, icon: Zap },
                { label: 'Technician', value: jobData.technician, icon: User },
                { label: 'Duration', value: jobData.duration, icon: Clock },
                { label: 'Status', value: jobData.status, icon: CheckCircle2 },
                { label: 'Scheduled', value: jobData.scheduledDate, icon: Calendar },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="text-center p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <Icon className="w-4 h-4 text-slate-400 mx-auto mb-1.5" />
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mb-0.5">{item.label}</p>
                    <p className="text-xs font-bold text-slate-800 leading-tight">{item.value}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2/3 */}
          <div className="lg:col-span-2 space-y-6">
            {/* Section 2: Maintenance Work Performed */}
            <SectionCard title="Maintenance Work Performed" subtitle="Activities completed during this visit">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {workPerformed.map((task) => (
                  <div key={task} className="flex items-center gap-3 p-3 rounded-lg bg-emerald-50/50 border border-emerald-100/50">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-sm text-slate-700">{task}</span>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Section 3: Cleaning Checklist */}
            <SectionCard title="Cleaning Checklist" subtitle="Pre-clean to post-clean validation steps">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {cleaningChecklist.map((item) => (
                  <div key={item} className="flex items-center gap-3 p-3 rounded-lg bg-white border border-slate-100 hover:border-emerald-200 transition-colors">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <span className="text-sm text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Section 5: Inspection Findings */}
            <SectionCard title="Inspection Findings" subtitle="Observations recorded during maintenance">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {findings.map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-slate-100 hover:shadow-sm transition-all">
                      <div className={`p-2 rounded-lg ${
                        f.color === 'warning' ? 'bg-amber-50' :
                        f.color === 'info' ? 'bg-blue-50' :
                        'bg-emerald-50'
                      }`}>
                        <Icon className={`w-4 h-4 ${
                          f.color === 'warning' ? 'text-amber-600' :
                          f.color === 'info' ? 'text-blue-600' :
                          'text-emerald-600'
                        }`} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{f.finding}</p>
                        <StatusBadge status={f.severity} variant={f.color} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </SectionCard>

            {/* Section 6: Before / After Gallery */}
            <SectionCard title="Before & After Gallery" subtitle="Visual documentation from the maintenance visit">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {galleryItems.map((g) => (
                  <div key={g.label} className="group">
                    <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-200 flex items-center justify-center overflow-hidden hover:shadow-md transition-all cursor-pointer">
                      <div className="text-center p-4">
                        <Camera className="w-8 h-8 text-slate-300 mx-auto mb-2 group-hover:text-emerald-400 transition-colors" />
                        <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">{g.label}</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-1.5 text-center">{g.desc}</p>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Section 7: Technician Remarks */}
            <SectionCard title="Technician Remarks" subtitle={`Notes from ${jobData.technician}`}>
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-100 space-y-3">
                <div className="flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                  <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
                    <p>Dust accumulation significantly reduced after wet cleaning with safe water pressure.</p>
                    <p>Bird droppings removed from east-facing array panels. No panel cracks or physical damage observed.</p>
                    <p>One inverter warning logged for monitoring — no shutdown occurred. Inverter display shows normal operation status.</p>
                    <p className="font-semibold text-emerald-700">Recommend next wet cleaning after 15 days to maintain cleaning cycle adherence.</p>
                  </div>
                </div>
              </div>
            </SectionCard>
          </div>

          {/* Right 1/3 */}
          <div className="space-y-6">
            {/* Section 4: Safety Checklist */}
            <SectionCard title="Safety Checklist" subtitle="PPE and safety compliance">
              <div className="space-y-2">
                {safetyChecklist.map((item) => (
                  <div key={item.item} className="flex items-center gap-3 p-3 rounded-lg bg-emerald-50/40 border border-emerald-100/40">
                    <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-800">{item.item}</p>
                      <p className="text-[11px] text-slate-400">{item.detail}</p>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Section 8: Recommended Next Visit */}
            <SectionCard title="Recommended Next Visit" subtitle="Upcoming maintenance schedule">
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                  <div className="flex items-center gap-2 mb-1">
                    <SprayCan className="w-4 h-4 text-blue-600" />
                    <p className="text-sm font-semibold text-slate-800">Next Cleaning</p>
                  </div>
                  <p className="text-lg font-bold text-blue-700">31 Jul 2026</p>
                  <p className="text-xs text-slate-500 mt-0.5">15 days after last wet cleaning</p>
                </div>
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                  <div className="flex items-center gap-2 mb-1">
                    <Wrench className="w-4 h-4 text-emerald-600" />
                    <p className="text-sm font-semibold text-slate-800">Next Checkup</p>
                  </div>
                  <p className="text-lg font-bold text-emerald-700">October 2026</p>
                  <p className="text-xs text-slate-500 mt-0.5">Quarterly system checkup</p>
                </div>
                <div className="p-4 rounded-xl border border-slate-100">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Package Remaining</p>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-600">Cleaning Visits</span>
                        <span className="font-bold text-slate-800">2 of 4 Remaining</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-emerald-500 rounded-full h-2" style={{ width: '50%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-600">Checkups</span>
                        <span className="font-bold text-slate-800">1 of 2 Remaining</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-blue-500 rounded-full h-2" style={{ width: '50%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SectionCard>
          </div>
        </div>
      </main>
    </div>
  );
}
