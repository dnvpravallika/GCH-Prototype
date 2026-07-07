import { useState } from 'react';
import {
  CheckCircle2, Circle, Shield, SprayCan, Wrench, Zap,
  AlertTriangle, ArrowDown, Eye, Droplets, Sun,
  Cable, Battery, Thermometer, Settings, ClipboardCheck,
  HardHat, Clock, BookOpen,
} from 'lucide-react';
import Header from '../components/Header';
import { SectionCard, StatusBadge } from '../components/ui';

type TabId = 'cleaning' | 'maintenance' | 'daily' | 'troubleshooting';

const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: 'cleaning', label: 'Cleaning SOP', icon: SprayCan },
  { id: 'maintenance', label: 'Maintenance SOP', icon: Wrench },
  { id: 'daily', label: 'Daily Checklist', icon: ClipboardCheck },
  { id: 'troubleshooting', label: 'Troubleshooting', icon: AlertTriangle },
];

const cleaningSteps = [
  { step: 1, title: 'Preparation', desc: 'Gather PPE, cleaning tools, and ensure system is de-energized. Confirm schedule and site access.' },
  { step: 2, title: 'Visual Inspection', desc: 'Inspect panels for visible damage, debris, bird droppings, and shading obstructions before cleaning.' },
  { step: 3, title: 'Dry Brushing', desc: 'Use soft brush to remove loose dust and debris. Start from top and work downward. Avoid scratching.' },
  { step: 4, title: 'Wet Cleaning', desc: 'Apply clean water with safe pressure (≤ 35 bar). Use gentle motion to remove stubborn dirt and residue.' },
  { step: 5, title: 'Final Rinse', desc: 'Rinse panels thoroughly with clean water to remove all soap residue and loosened debris.' },
  { step: 6, title: 'Drying', desc: 'Allow panels to air dry or use squeegee. Avoid leaving water spots that could cause mineral deposits.' },
  { step: 7, title: 'Final Inspection', desc: 'Verify all panels are clean, no damage occurred, and document the cleaning with photos and notes.' },
];

const safetyNotes = [
  { icon: Clock, label: 'Timing', value: 'Before sunrise or after sunset' },
  { icon: HardHat, label: 'PPE Required', value: 'Gloves, helmet, safety belt, non-slip boots, goggles' },
  { icon: Droplets, label: 'Max Water Pressure', value: '35 Bar' },
  { icon: Shield, label: 'Chemicals', value: 'No abrasive chemicals — clean water only' },
  { icon: SprayCan, label: 'Brush', value: 'Soft brush only — no metal or abrasive materials' },
  { icon: Zap, label: 'Electrical Safety', value: 'System must be de-energized before cleaning' },
];

const maintenanceModules = [
  { title: 'Mounting Structure', desc: 'Inspect tilt angle, bolt tightness, rust, and structural integrity', icon: Settings },
  { title: 'Solar Modules', desc: 'Check for cracks, discoloration, hotspots, and physical damage', icon: Sun },
  { title: 'DC Wiring', desc: 'Inspect DC cables, insulation, and connector integrity', icon: Cable },
  { title: 'AC Wiring', desc: 'Review AC cabling, circuit breakers, and connection points', icon: Cable },
  { title: 'Junction Boxes', desc: 'Check junction box seals, terminals, and moisture ingress', icon: Battery },
  { title: 'Earthing', desc: 'Test earthing resistance and inspect ground connections', icon: Zap },
  { title: 'Lightning Protection', desc: 'Verify lightning arrestor and SPD functionality', icon: Zap },
  { title: 'Inverter', desc: 'Check display, error logs, fan operation, and filter cleanliness', icon: Zap },
  { title: 'Performance Review', desc: 'Compare actual vs expected generation, review trends', icon: Eye },
  { title: 'Shading Analysis', desc: 'Identify new shading sources — trees, structures, debris', icon: Sun },
  { title: 'Hotspot Inspection', desc: 'Thermal scan for abnormal heating and cell degradation', icon: Thermometer },
  { title: 'Torque Check', desc: 'Verify bolt torque on mounting structure and module clamps', icon: Wrench },
  { title: 'Thermal Scan', desc: 'Full thermal imaging of array and electrical components', icon: Thermometer },
];

const dailyChecklist = [
  { task: 'Visual Inspection', frequency: 'Daily', desc: 'Quick visual check for obvious damage or debris', completed: true },
  { task: 'Weekly Dry Cleaning', frequency: 'Weekly', desc: 'Soft brush dry cleaning to remove loose dust', completed: true },
  { task: 'Fortnightly Wet Cleaning', frequency: 'Every 15 days', desc: 'Full wet cleaning with safe water pressure', completed: true },
  { task: 'Monthly Inverter Filter Cleaning', frequency: 'Monthly', desc: 'Clean inverter air filters and check ventilation', completed: false },
  { task: 'Quarterly Checkup', frequency: 'Quarterly', desc: 'Full system checkup — structure, wiring, inverter, performance', completed: false },
  { task: 'Quarterly Thermal Scan', frequency: 'Quarterly', desc: 'Infrared thermal imaging for hotspot detection', completed: false },
  { task: 'Annual Earthing Test', frequency: 'Yearly', desc: 'Professional earthing resistance measurement and verification', completed: false },
  { task: 'Annual Torque Check', frequency: 'Yearly', desc: 'Verify all structural bolt torque values meet specifications', completed: false },
];

const troubleshootingCards = [
  {
    issue: 'Low Power Output',
    causes: ['Dust accumulation on panels', 'Shading from nearby objects', 'Loose electrical connections', 'Inverter warning or fault'],
    action: 'Full inspection required — check panels, wiring, inverter, and shading',
    severity: 'warning' as const,
  },
  {
    issue: 'Inverter Error / Warning',
    causes: ['Grid voltage fluctuation', 'Overheating', 'String mismatch', 'Internal component fault'],
    action: 'Check error code, review logs, inspect connections, contact support if recurring',
    severity: 'danger' as const,
  },
  {
    issue: 'Panel Physical Damage',
    causes: ['Hail or weather damage', 'Impact from debris', 'Bird or animal damage', 'Installation defect'],
    action: 'Document damage with photos, isolate affected string if needed, schedule replacement',
    severity: 'danger' as const,
  },
  {
    issue: 'Hotspot Detected',
    causes: ['Cell cracking', 'Soldering defect', 'Partial shading', 'Bypass diode failure'],
    action: 'Isolate affected panel, perform detailed thermal scan, plan replacement if severe',
    severity: 'warning' as const,
  },
];

const emergencyFlow = [
  { step: 'Issue Detected', desc: 'Output drop, damage, electrical concern, or repeated warning' },
  { step: 'Inspection', desc: 'Remote assessment and initial diagnosis' },
  { step: 'Technician Assigned', desc: 'Priority dispatch based on severity and location' },
  { step: 'Maintenance Visit', desc: 'On-site troubleshooting, repair, or replacement' },
  { step: 'Verification', desc: 'Post-maintenance output and safety verification' },
  { step: 'Report Generated', desc: 'Full service report with findings and recommendations' },
];

export default function SopPage() {
  const [activeTab, setActiveTab] = useState<TabId>('cleaning');

  return (
    <div className="min-h-screen">
      <Header
        title="SOP & Maintenance Checklist"
        subtitle="Standard operating procedures, safety protocols, checklists, and troubleshooting guides for GCH solar maintenance operations."
        actions={[
          { label: 'View Services', variant: 'secondary', to: '/services' },
        ]}
      />

      <main className="p-8 space-y-6">
        {/* Tab Navigation */}
        <div className="bg-white rounded-xl border border-slate-200/60 p-1.5 flex gap-1.5 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-200'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === 'cleaning' && (
          <div className="space-y-6">
            {/* Cleaning Steps */}
            <SectionCard title="Panel Cleaning Procedure" subtitle="Step-by-step standard operating procedure for solar panel cleaning">
              <div className="space-y-4">
                {cleaningSteps.map((s) => (
                  <div key={s.step} className="flex gap-4 p-4 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/20 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-emerald-700">{s.step}</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{s.title}</h4>
                      <p className="text-sm text-slate-500 mt-0.5 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Safety Notes */}
            <SectionCard title="Safety Notes & Requirements" subtitle="Mandatory safety protocols during cleaning operations">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {safetyNotes.map((n) => {
                  const Icon = n.icon;
                  return (
                    <div key={n.label} className="flex items-start gap-3 p-4 rounded-xl bg-red-50/30 border border-red-100/50 hover:border-red-200 transition-colors">
                      <div className="bg-red-100 p-2 rounded-lg shrink-0">
                        <Icon className="w-4 h-4 text-red-600" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{n.label}</p>
                        <p className="text-sm font-semibold text-slate-800 mt-0.5">{n.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </SectionCard>
          </div>
        )}

        {activeTab === 'maintenance' && (
          <div className="space-y-6">
            <SectionCard title="Maintenance Inspection Modules" subtitle="Comprehensive checkup areas covered during system maintenance visits">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {maintenanceModules.map((m) => {
                  const Icon = m.icon;
                  return (
                    <div key={m.title} className="flex items-start gap-3 p-4 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/20 transition-all">
                      <div className="bg-emerald-50 p-2.5 rounded-lg shrink-0">
                        <Icon className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{m.title}</h4>
                        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{m.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </SectionCard>
          </div>
        )}

        {activeTab === 'daily' && (
          <div className="space-y-6">
            <SectionCard title="Maintenance Frequency Checklist" subtitle="Track routine maintenance activities and their schedules">
              <div className="space-y-3">
                {dailyChecklist.map((item) => (
                  <div key={item.task} className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${
                    item.completed
                      ? 'border-emerald-100 bg-emerald-50/30'
                      : 'border-slate-100 hover:border-slate-200'
                  }`}>
                    <div className="mt-0.5">
                      {item.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-300" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h4 className={`text-sm font-semibold ${item.completed ? 'text-emerald-800' : 'text-slate-800'}`}>
                          {item.task}
                        </h4>
                        <StatusBadge
                          status={item.frequency}
                          variant={item.completed ? 'success' : 'neutral'}
                        />
                      </div>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                    {item.completed && (
                      <span className="text-[10px] font-bold uppercase text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full shrink-0">
                        Done
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
        )}

        {activeTab === 'troubleshooting' && (
          <div className="space-y-6">
            {/* Troubleshooting Cards */}
            <SectionCard title="Common Issues & Resolution" subtitle="Diagnostic guide for frequently encountered solar maintenance issues">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {troubleshootingCards.map((t) => (
                  <div key={t.issue} className={`rounded-xl border p-5 ${
                    t.severity === 'danger'
                      ? 'border-red-100 bg-red-50/20'
                      : 'border-amber-100 bg-amber-50/20'
                  }`}>
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className={`w-5 h-5 ${t.severity === 'danger' ? 'text-red-500' : 'text-amber-500'}`} />
                      <h4 className="text-sm font-bold text-slate-900">{t.issue}</h4>
                      <StatusBadge
                        status={t.severity === 'danger' ? 'Critical' : 'Warning'}
                        variant={t.severity}
                      />
                    </div>
                    <div className="mb-3">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Possible Causes</p>
                      <ul className="space-y-1">
                        {t.causes.map((c) => (
                          <li key={c} className="flex items-center gap-2 text-sm text-slate-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-3 rounded-lg bg-white/60 border border-slate-100">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Recommended Action</p>
                      <p className="text-sm text-slate-700">{t.action}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Emergency Response Flow */}
            <SectionCard title="Emergency Response Flow" subtitle="Standard escalation process for critical maintenance issues">
              <div className="flex flex-col lg:flex-row gap-3 items-stretch">
                {emergencyFlow.map((e, i) => (
                  <div key={e.step} className="flex-1 flex items-start lg:flex-col lg:items-center gap-3 lg:gap-2 relative">
                    <div className="flex flex-col items-center lg:flex-row lg:w-full">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-sm shrink-0">
                        <span className="text-sm font-bold text-white">{i + 1}</span>
                      </div>
                      {i < emergencyFlow.length - 1 && (
                        <div className="hidden lg:block flex-1 h-px bg-slate-200 mx-2" />
                      )}
                    </div>
                    <div className="lg:text-center lg:mt-2">
                      <p className="text-sm font-bold text-slate-800">{e.step}</p>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{e.desc}</p>
                    </div>
                    {i < emergencyFlow.length - 1 && (
                      <div className="lg:hidden w-px h-6 bg-slate-200 self-center ml-6" />
                    )}
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
        )}
      </main>
    </div>
  );
}
