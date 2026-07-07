import { useNavigate } from 'react-router-dom';
import {
  SprayCan, ClipboardCheck, ShieldCheck, Zap,
  Thermometer, AlertTriangle, ArrowRight,
  Droplets, Sun, Eye, Wrench,
} from 'lucide-react';
import Header from '../components/Header';
import { SectionCard } from '../components/ui';

interface ServiceCardData {
  title: string;
  description: string;
  icon: React.ElementType;
  frequency?: string;
  includes: string[];
  pricing?: string;
  cta: string;
  ctaTo?: string;
  iconColor: string;
  iconBg: string;
}

const services: ServiceCardData[] = [
  {
    title: 'Panel Cleaning',
    description: 'Routine cleaning of solar panels to remove dust, bird droppings, debris, and surface buildup that can reduce efficiency.',
    icon: SprayCan,
    frequency: 'Dry brushing: once a week · Wet cleaning: once every 15 days (minimum)',
    includes: [
      'Pre-cleaning inspection',
      'Dust / debris / bird dropping removal',
      'Wet cleaning with safe water pressure',
      'Rinse and drying support',
    ],
    pricing: 'Pricing varies by kW slab. Starting slab: 3–5 kW = ₹1,350',
    cta: 'View Cleaning Prices',
    ctaTo: '/amc-packages',
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-50',
  },
  {
    title: 'System Checkup',
    description: 'Scheduled solar system checkup covering structure, cables, junction box, inverter, performance observations, shading, and damaged panels.',
    icon: ClipboardCheck,
    frequency: 'Recommended frequency: every 3–6 months',
    includes: [
      'Mounting structure inspection',
      'Wiring and cable review',
      'Junction box and connector inspection',
      'Inverter functioning and error review',
      'Voltage / current and performance comparison',
      'Shading and obstruction review',
    ],
    pricing: 'Starting slab: 3–5 kW checkup = ₹500',
    cta: 'View Checkup Pricing',
    ctaTo: '/amc-packages',
    iconColor: 'text-emerald-600',
    iconBg: 'bg-emerald-50',
  },
  {
    title: 'Preventive Maintenance',
    description: 'A bundled preventive maintenance service that combines cleaning, inspection, and maintenance checks to improve long-term system performance and safety.',
    icon: ShieldCheck,
    frequency: 'Monthly / quarterly depending on site',
    includes: [
      'Visual inspection',
      'Cleaning cycle adherence',
      'Inverter filter checks',
      'Hotspot / thermal scan planning',
      'Torque / earthing checks',
    ],
    cta: 'Included in Plans',
    ctaTo: '/amc-packages',
    iconColor: 'text-teal-700',
    iconBg: 'bg-teal-50',
  },
  {
    title: 'Inverter & Performance Review',
    description: 'Maintenance-focused review of inverter status, warnings, alarms, and system output notes collected during service visits.',
    icon: Zap,
    includes: [
      'Inverter display / error review',
      'Output vs expected check',
      'Recurring warning note logging',
      'Maintenance observations for follow-up',
    ],
    cta: 'Open Site Health',
    ctaTo: '/site-health/site-002',
    iconColor: 'text-amber-600',
    iconBg: 'bg-amber-50',
  },
  {
    title: 'Hotspot / Thermal Inspection',
    description: 'Inspection activity used during preventive maintenance cycles to identify abnormal heating, hotspot risks, and early panel issues.',
    icon: Thermometer,
    frequency: 'Quarterly for higher-load or larger systems',
    includes: [
      'Infrared / thermal imaging scan',
      'Hotspot identification and documentation',
      'Panel-level risk assessment',
      'Follow-up action recommendations',
    ],
    cta: 'See Preventive Scope',
    ctaTo: '/amc-packages',
    iconColor: 'text-red-500',
    iconBg: 'bg-red-50',
  },
  {
    title: 'Emergency Service Visit',
    description: 'Urgent maintenance response for visible panel issues, sudden output drop, electrical concerns, or repeated inverter warnings.',
    icon: AlertTriangle,
    includes: [
      'Low output investigation',
      'Damaged panel assessment',
      'Electrical issue check',
      'Repeated inverter warning review',
    ],
    cta: 'Request Service',
    iconColor: 'text-red-600',
    iconBg: 'bg-red-50',
  },
];

const steps = [
  {
    step: 1,
    title: 'Choose a service or package',
    desc: 'Choose a one-time service or bundled package',
    icon: Sun,
  },
  {
    step: 2,
    title: 'Site is scheduled',
    desc: 'Site is scheduled based on maintenance need and package coverage',
    icon: Eye,
  },
  {
    step: 3,
    title: 'Technician performs service',
    desc: 'GCH technician performs cleaning / checkup / preventive checklist',
    icon: Wrench,
  },
  {
    step: 4,
    title: 'Findings are logged',
    desc: 'Maintenance findings, health notes, and next service recommendations are logged',
    icon: Droplets,
  },
];

export default function ServicesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Header
        title="Maintenance Services"
        subtitle="Routine cleaning, system checkups, preventive maintenance, and operational support for residential and commercial solar sites."
        actions={[
          { label: 'View AMC Packages', variant: 'primary', to: '/amc-packages' },
        ]}
      />

      <main className="p-8 space-y-8">
        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.title}
                className="bg-white rounded-xl border border-slate-200/60 hover:shadow-lg hover:border-slate-300 transition-all duration-300 flex flex-col"
              >
                <div className="p-6 flex-1">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`${svc.iconBg} p-3 rounded-xl`}>
                      <Icon className={`w-6 h-6 ${svc.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-slate-900">{svc.title}</h3>
                      {svc.frequency && (
                        <p className="text-[11px] text-emerald-600 font-medium mt-0.5">{svc.frequency}</p>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">{svc.description}</p>
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">What's Included</p>
                    <ul className="space-y-1.5">
                      {svc.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {svc.pricing && (
                    <div className="mt-4 p-3 rounded-lg bg-slate-50 border border-slate-100">
                      <p className="text-xs text-slate-500">{svc.pricing}</p>
                    </div>
                  )}
                </div>
                <div className="px-6 py-4 border-t border-slate-100">
                  <button
                    onClick={() => svc.ctaTo && navigate(svc.ctaTo)}
                    className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                  >
                    {svc.cta}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* How GCH Maintenance Works */}
        <SectionCard title="How GCH Maintenance Works" subtitle="Our maintenance process from service selection to completion">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.step} className="relative">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-emerald-600" />
                    </div>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Step {s.step}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 mb-1">{s.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
                  {s.step < 4 && (
                    <ArrowRight className="hidden lg:block absolute top-5 -right-4 w-5 h-5 text-slate-300" />
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-100">
            <p className="text-xs text-slate-500 leading-relaxed">
              Routine maintenance follows weekly dry cleaning, fortnightly wet cleaning, periodic checkups, and preventive inspections depending on the site.
            </p>
          </div>
        </SectionCard>
      </main>
    </div>
  );
}
