
import {
  Sparkles, Check, ArrowRight, CalendarRange,
  BarChart3, History, RefreshCw, ChevronDown, ChevronUp,
} from 'lucide-react';
import { useState } from 'react';
import Header from '../components/Header';
import { SectionCard } from '../components/ui';
import { bundledPackages, cleaningPriceSlabs, checkupPriceSlabs, formatCurrency } from '../data';

const tierAccent = {
  basic: {
    ring: 'ring-slate-200',
    gradient: 'from-slate-50 to-white',
    badge: 'bg-slate-100 text-slate-700',
    button: 'bg-slate-800 hover:bg-slate-900 text-white',
    check: 'text-slate-400',
    highlight: false,
  },
  standard: {
    ring: 'ring-blue-200',
    gradient: 'from-blue-50 to-white',
    badge: 'bg-blue-100 text-blue-700',
    button: 'bg-blue-600 hover:bg-blue-700 text-white',
    check: 'text-blue-500',
    highlight: false,
  },
  premium: {
    ring: 'ring-emerald-300',
    gradient: 'from-emerald-50 via-teal-50 to-white',
    badge: 'bg-emerald-100 text-emerald-700',
    button: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200',
    check: 'text-emerald-500',
    highlight: true,
  },
};

export default function AmcPackagesPage() {
  const [expandedPkg, setExpandedPkg] = useState<string | null>('Premium');

  return (
    <div className="min-h-screen">
      <Header
        title="AMC Packages & Pricing"
        subtitle="Choose a Green Carbon Hub maintenance package or review one-time pricing for panel cleaning and system checkups."
        actions={[
          { label: 'Schedule Consultation', variant: 'primary', to: '/customers' },
        ]}
      />

      <main className="p-8 space-y-10">
        {/* Section A — Package Comparison Cards */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Choose Your Maintenance Package</h2>
            <p className="text-sm text-slate-500 max-w-2xl mx-auto">
              Bundled maintenance packages designed for residential and commercial solar sites.
              All packages include subscription, scheduled visits, and service history tracking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {bundledPackages.map((pkg) => {
              const accent = tierAccent[pkg.tier];
              const isExpanded = expandedPkg === pkg.name;
              return (
                <div
                  key={pkg.name}
                  className={`relative bg-gradient-to-b ${accent.gradient} rounded-2xl ring-1 ${accent.ring} overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col ${
                    accent.highlight ? 'ring-2 scale-[1.02]' : ''
                  }`}
                >
                  {pkg.recommended && (
                    <div className="bg-emerald-600 text-white text-center py-1.5">
                      <span className="text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" /> Most Comprehensive
                      </span>
                    </div>
                  )}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${accent.badge}`}>
                        {pkg.name}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-extrabold text-slate-900">{formatCurrency(pkg.bundledPrice)}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm line-through text-slate-400">{formatCurrency(pkg.totalBeforeBundle)}</span>
                        <span className="inline-flex items-center px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">
                          {pkg.savingPercent}% off
                        </span>
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-2 mb-5 flex-1">
                      {pkg.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                          <Check className={`w-4 h-4 mt-0.5 shrink-0 ${accent.check}`} />
                          {f}
                        </li>
                      ))}
                    </ul>

                    {/* Expandable breakdown */}
                    <button
                      onClick={() => setExpandedPkg(isExpanded ? null : pkg.name)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 mb-4 transition-colors"
                    >
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      {isExpanded ? 'Hide' : 'View'} Price Breakdown
                    </button>

                    {isExpanded && (
                      <div className="mb-5 p-4 bg-white/60 rounded-xl border border-slate-100 space-y-2 text-sm">
                        <div className="flex justify-between text-slate-600">
                          <span>Cleaning ({pkg.cleaningVisits} × {formatCurrency(pkg.cleaningRate)})</span>
                          <span className="font-semibold">{formatCurrency(pkg.cleaningTotal)}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>Checkup ({pkg.checkupVisits} × {formatCurrency(pkg.checkupRate)})</span>
                          <span className="font-semibold">{formatCurrency(pkg.checkupTotal)}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>Subscription</span>
                          <span className="font-semibold">{formatCurrency(pkg.subscriptionFee)}</span>
                        </div>
                        <div className="border-t border-slate-200 pt-2 flex justify-between text-slate-400">
                          <span>Total before bundle</span>
                          <span className="line-through">{formatCurrency(pkg.totalBeforeBundle)}</span>
                        </div>
                        <div className="flex justify-between text-emerald-700 font-bold">
                          <span>Bundled price</span>
                          <span>{formatCurrency(pkg.bundledPrice)}</span>
                        </div>
                      </div>
                    )}

                    {/* CTA */}
                    <button className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${accent.button}`}>
                      Choose {pkg.name}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section B — Cleaning Price Table */}
        <SectionCard
          title="Cleaning Prices up to 100 kW"
          subtitle="Cleaning pricing is slab-based by system size. The bundled package examples are based on the 3–5 kW cleaning slab of ₹1,350."
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left" id="cleaning-price-table">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider w-16">SI.No</th>
                  <th className="py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">System Size</th>
                  <th className="py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Rate/kW (₹)</th>
                  <th className="py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Total Cleaning (₹)</th>
                </tr>
              </thead>
              <tbody>
                {cleaningPriceSlabs.map((slab, i) => (
                  <tr key={slab.slNo} className={`border-b border-slate-50 ${i % 2 === 0 ? '' : 'bg-slate-50/30'} hover:bg-emerald-50/40 transition-colors`}>
                    <td className="py-2.5 px-4 text-sm text-slate-500">{slab.slNo}</td>
                    <td className="py-2.5 px-4 text-sm font-medium text-slate-700">{slab.systemSize}</td>
                    <td className="py-2.5 px-4 text-sm text-slate-600 text-right">{formatCurrency(slab.ratePerUnit)}</td>
                    <td className="py-2.5 px-4 text-sm font-semibold text-slate-800 text-right">{formatCurrency(slab.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* Section C — Checkup Price Table */}
        <SectionCard
          title="System Checkup Prices up to 100 kW"
          subtitle="Bundled package examples use the 3–5 kW checkup slab of ₹500 for package breakdown calculations."
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left" id="checkup-price-table">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider w-16">SI.No</th>
                  <th className="py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">System Slab</th>
                  <th className="py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Rate/Visit (₹)</th>
                  <th className="py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Total Checkup (₹)</th>
                </tr>
              </thead>
              <tbody>
                {checkupPriceSlabs.map((slab, i) => (
                  <tr key={slab.slNo} className={`border-b border-slate-50 ${i % 2 === 0 ? '' : 'bg-slate-50/30'} hover:bg-emerald-50/40 transition-colors`}>
                    <td className="py-2.5 px-4 text-sm text-slate-500">{slab.slNo}</td>
                    <td className="py-2.5 px-4 text-sm font-medium text-slate-700">{slab.systemSize}</td>
                    <td className="py-2.5 px-4 text-sm text-slate-600 text-right">{formatCurrency(slab.ratePerUnit)}</td>
                    <td className="py-2.5 px-4 text-sm font-semibold text-slate-800 text-right">{formatCurrency(slab.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* Section D — Why choose a bundle */}
        <SectionCard title="Why choose a bundled maintenance package?" subtitle="Benefits of subscribing to a GCH maintenance bundle">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: BarChart3,
                title: 'Lower Effective Price',
                desc: 'Lower effective price compared to one-time booking for the same services',
              },
              {
                icon: CalendarRange,
                title: 'Scheduled Planning',
                desc: 'Scheduled cleaning and checkup planning based on your site needs',
              },
              {
                icon: History,
                title: 'Maintenance Continuity',
                desc: 'Better maintenance continuity and detailed service history tracking',
              },
              {
                icon: RefreshCw,
                title: 'Easier Recurring Care',
                desc: 'Easier recurring care for residential and commercial sites with bundled coverage',
              },
            ].map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="p-5 rounded-xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 mb-1">{b.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </SectionCard>

        {/* Section E — Package Selection Helper */}
        <SectionCard title="Which package is right for you?" subtitle="Choose the plan that matches your maintenance needs">
          <div className="space-y-4">
            {[
              {
                name: 'Basic',
                desc: 'For smaller sites looking for one cleaning + one checkup cycle',
                badge: 'bg-slate-100 text-slate-700',
              },
              {
                name: 'Standard',
                desc: 'For customers who want recurring cleaning and at least one checkup',
                badge: 'bg-blue-100 text-blue-700',
              },
              {
                name: 'Premium',
                desc: 'For customers who want more frequent cleaning and deeper maintenance coverage',
                badge: 'bg-emerald-100 text-emerald-700',
              },
            ].map((p) => (
              <div
                key={p.name}
                className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/20 transition-all cursor-pointer"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${p.badge}`}>{p.name}</span>
                <span className="text-sm text-slate-600 flex-1">{p.desc}</span>
                <ArrowRight className="w-4 h-4 text-slate-300" />
              </div>
            ))}
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 mt-4">
              <p className="text-xs text-slate-500 leading-relaxed">
                Site conditions, dust exposure, and usage can influence the recommended plan.
                Contact GCH maintenance ops for a tailored recommendation based on your site assessment.
              </p>
            </div>
          </div>
        </SectionCard>
      </main>
    </div>
  );
}
