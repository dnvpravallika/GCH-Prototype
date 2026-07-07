import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User, Phone, Mail, MapPin, Building2, Sun, Calendar,
  Layers, Zap, Check, Sparkles, ArrowRight, CheckCircle2,
  Package, ChevronDown, ChevronUp,
} from 'lucide-react';
import Header from '../components/Header';
import { SectionCard, StatusBadge } from '../components/ui';
import { bundledPackages, cleaningPriceSlabs, checkupPriceSlabs, formatCurrency } from '../data';

const tierAccent = {
  basic: {
    ring: 'ring-slate-200',
    gradient: 'from-slate-50 to-white',
    badge: 'bg-slate-100 text-slate-700',
    button: 'bg-slate-800 hover:bg-slate-900 text-white',
    check: 'text-slate-400',
  },
  standard: {
    ring: 'ring-blue-200',
    gradient: 'from-blue-50 to-white',
    badge: 'bg-blue-100 text-blue-700',
    button: 'bg-blue-600 hover:bg-blue-700 text-white',
    check: 'text-blue-500',
  },
  premium: {
    ring: 'ring-emerald-300',
    gradient: 'from-emerald-50 via-teal-50 to-white',
    badge: 'bg-emerald-100 text-emerald-700',
    button: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200',
    check: 'text-emerald-500',
  },
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState<string>('Premium');
  const [segment, setSegment] = useState<'Residential' | 'Commercial'>('Commercial');
  const [showPricingTable, setShowPricingTable] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const selectedPkg = bundledPackages.find((p) => p.name === selectedPackage);

  return (
    <div className="min-h-screen">
      <Header
        title="Customer Registration"
        subtitle="Register a new customer, add site details, and select a maintenance package or one-time service."
        actions={[
          { label: 'View Customers', variant: 'secondary', to: '/customers' },
        ]}
      />

      <main className="p-8 space-y-8">
        {showConfirmation ? (
          /* Section 6: Registration Confirmation */
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl border border-emerald-200 overflow-hidden shadow-lg">
              <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 p-8 text-white text-center">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Customer Registered Successfully</h2>
                <p className="text-emerald-100 text-sm">Site added and maintenance schedule ready</p>
              </div>
              <div className="p-8 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-xs text-slate-400 font-semibold uppercase mb-1">Package Selected</p>
                    <p className="text-lg font-bold text-emerald-700">{selectedPackage}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-xs text-slate-400 font-semibold uppercase mb-1">Bundle Price</p>
                    <p className="text-lg font-bold text-emerald-700">{selectedPkg && formatCurrency(selectedPkg.bundledPrice)}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-xs text-slate-400 font-semibold uppercase mb-1">Site</p>
                    <p className="text-sm font-semibold text-slate-800">Guntur Plant — 48 kW</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-xs text-slate-400 font-semibold uppercase mb-1">Savings</p>
                    <p className="text-lg font-bold text-emerald-700">{selectedPkg?.savingPercent}%</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/site-health/site-002')}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold transition-all shadow-sm shadow-emerald-200 flex items-center justify-center gap-2"
                >
                  Go To Customer Dashboard
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="w-full py-2.5 text-slate-500 hover:text-slate-700 text-sm font-medium transition-colors"
                >
                  Register Another Customer
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2/3 */}
            <div className="lg:col-span-2 space-y-6">
              {/* Section 1: Customer Information */}
              <SectionCard title="Customer Information" subtitle="Basic customer details for the maintenance account">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Full Name', placeholder: 'Auro Fresh Farms', icon: User },
                    { label: 'Phone', placeholder: '+91 98765 43210', icon: Phone },
                    { label: 'Email', placeholder: 'contact@aurofresh.in', icon: Mail },
                    { label: 'Address', placeholder: 'Industrial Area, NH-5', icon: MapPin },
                    { label: 'City', placeholder: 'Guntur', icon: Building2 },
                    { label: 'State', placeholder: 'Andhra Pradesh', icon: MapPin },
                    { label: 'PIN Code', placeholder: '522001', icon: MapPin },
                  ].map((field) => {
                    const Icon = field.icon;
                    return (
                      <div key={field.label}>
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">{field.label}</label>
                        <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 rounded-lg border border-slate-200 focus-within:border-emerald-300 focus-within:ring-2 focus-within:ring-emerald-100 transition-all">
                          <Icon className="w-4 h-4 text-slate-400 shrink-0" />
                          <input
                            type="text"
                            defaultValue={field.placeholder}
                            className="bg-transparent text-sm text-slate-800 placeholder:text-slate-400 outline-none w-full"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </SectionCard>

              {/* Section 2: Site Details */}
              <SectionCard title="Site Details" subtitle="Solar installation and site configuration">
                <div className="space-y-4">
                  {/* Segment Toggle */}
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Segment</label>
                    <div className="flex gap-2">
                      {(['Residential', 'Commercial'] as const).map((s) => (
                        <button
                          key={s}
                          onClick={() => setSegment(s)}
                          className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                            segment === s
                              ? 'bg-emerald-600 text-white shadow-sm'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: 'System Capacity', value: '48 kW', icon: Zap },
                      { label: 'Installation Year', value: '2024', icon: Calendar },
                      { label: 'Number of Panels', value: '96', icon: Layers },
                      { label: 'Inverter Brand', value: 'Growatt', icon: Zap },
                    ].map((field) => {
                      const Icon = field.icon;
                      return (
                        <div key={field.label}>
                          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">{field.label}</label>
                          <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 rounded-lg border border-slate-200 focus-within:border-emerald-300 focus-within:ring-2 focus-within:ring-emerald-100 transition-all">
                            <Icon className="w-4 h-4 text-slate-400 shrink-0" />
                            <input
                              type="text"
                              defaultValue={field.value}
                              className="bg-transparent text-sm text-slate-800 placeholder:text-slate-400 outline-none w-full"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </SectionCard>

              {/* Section 3: Choose Maintenance Package */}
              <SectionCard title="Choose Maintenance Package" subtitle="Select a bundled maintenance plan for this site">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {bundledPackages.map((pkg) => {
                    const accent = tierAccent[pkg.tier];
                    const isSelected = selectedPackage === pkg.name;
                    return (
                      <div
                        key={pkg.name}
                        onClick={() => setSelectedPackage(pkg.name)}
                        className={`relative cursor-pointer rounded-xl ring-1 p-5 transition-all duration-300 ${
                          isSelected
                            ? `${accent.ring} ring-2 bg-gradient-to-b ${accent.gradient} shadow-md`
                            : 'ring-slate-200 bg-white hover:ring-slate-300 hover:shadow-sm'
                        }`}
                      >
                        {pkg.recommended && (
                          <div className="absolute -top-2.5 left-4">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-bold uppercase rounded-full shadow-sm">
                              <Sparkles className="w-3 h-3" /> Best Value
                            </span>
                          </div>
                        )}
                        {isSelected && (
                          <div className="absolute top-3 right-3">
                            <CheckCircle2 className={`w-5 h-5 ${accent.check}`} />
                          </div>
                        )}
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold mb-2 ${accent.badge}`}>
                          {pkg.name}
                        </span>
                        <div className="flex items-baseline gap-1 mb-2">
                          <span className="text-2xl font-extrabold text-slate-900">{formatCurrency(pkg.bundledPrice)}</span>
                        </div>
                        <div className="flex items-center gap-1 mb-3">
                          <span className="text-xs line-through text-slate-400">{formatCurrency(pkg.totalBeforeBundle)}</span>
                          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-full">
                            {pkg.savingPercent}% off
                          </span>
                        </div>
                        <ul className="space-y-1 text-sm text-slate-600">
                          <li className="flex items-center gap-1.5"><Check className={`w-3.5 h-3.5 ${accent.check}`} />{pkg.cleaningVisits} Cleaning{pkg.cleaningVisits > 1 ? 's' : ''}</li>
                          <li className="flex items-center gap-1.5"><Check className={`w-3.5 h-3.5 ${accent.check}`} />{pkg.checkupVisits} Checkup{pkg.checkupVisits > 1 ? 's' : ''}</li>
                          <li className="flex items-center gap-1.5"><Check className={`w-3.5 h-3.5 ${accent.check}`} />Subscription Included</li>
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </SectionCard>

              {/* Section 4: One-Time Services + Pricing Tables */}
              <SectionCard title="One-Time Services" subtitle="Browse individual service pricing or select one-time panel cleaning or system checkup">
                <div className="flex gap-3 mb-4">
                  <div className="flex-1 p-4 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/20 transition-all cursor-pointer">
                    <div className="flex items-center gap-2 mb-1">
                      <Sun className="w-4 h-4 text-blue-600" />
                      <p className="text-sm font-semibold text-slate-800">Panel Cleaning</p>
                    </div>
                    <p className="text-xs text-slate-500">Starting from ₹1,350 (3–5 kW)</p>
                  </div>
                  <div className="flex-1 p-4 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/20 transition-all cursor-pointer">
                    <div className="flex items-center gap-2 mb-1">
                      <Zap className="w-4 h-4 text-emerald-600" />
                      <p className="text-sm font-semibold text-slate-800">System Checkup</p>
                    </div>
                    <p className="text-xs text-slate-500">Starting from ₹500 (3–5 kW)</p>
                  </div>
                </div>

                <button
                  onClick={() => setShowPricingTable(!showPricingTable)}
                  className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  {showPricingTable ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  {showPricingTable ? 'Hide' : 'View'} Complete Pricing
                </button>

                {showPricingTable && (
                  <div className="mt-4 space-y-6">
                    {/* Cleaning Slab Table */}
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 mb-3">Cleaning Prices up to 100 kW</h4>
                      <div className="overflow-x-auto rounded-lg border border-slate-100">
                        <table className="w-full text-left">
                          <thead>
                            <tr className="bg-slate-50">
                              <th className="py-2 px-3 text-xs font-semibold text-slate-400 uppercase">SI.No</th>
                              <th className="py-2 px-3 text-xs font-semibold text-slate-400 uppercase">System Size</th>
                              <th className="py-2 px-3 text-xs font-semibold text-slate-400 uppercase text-right">Rate/kW (₹)</th>
                              <th className="py-2 px-3 text-xs font-semibold text-slate-400 uppercase text-right">Total (₹)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {cleaningPriceSlabs.map((s, i) => (
                              <tr key={s.slNo} className={`border-t border-slate-50 ${i % 2 !== 0 ? 'bg-slate-50/30' : ''}`}>
                                <td className="py-1.5 px-3 text-xs text-slate-500">{s.slNo}</td>
                                <td className="py-1.5 px-3 text-xs font-medium text-slate-700">{s.systemSize}</td>
                                <td className="py-1.5 px-3 text-xs text-slate-600 text-right">{formatCurrency(s.ratePerUnit)}</td>
                                <td className="py-1.5 px-3 text-xs font-semibold text-slate-800 text-right">{formatCurrency(s.total)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Checkup Slab Table */}
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 mb-3">System Checkup Prices up to 100 kW</h4>
                      <div className="overflow-x-auto rounded-lg border border-slate-100">
                        <table className="w-full text-left">
                          <thead>
                            <tr className="bg-slate-50">
                              <th className="py-2 px-3 text-xs font-semibold text-slate-400 uppercase">SI.No</th>
                              <th className="py-2 px-3 text-xs font-semibold text-slate-400 uppercase">System Slab</th>
                              <th className="py-2 px-3 text-xs font-semibold text-slate-400 uppercase text-right">Rate/Visit (₹)</th>
                              <th className="py-2 px-3 text-xs font-semibold text-slate-400 uppercase text-right">Total (₹)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {checkupPriceSlabs.map((s, i) => (
                              <tr key={s.slNo} className={`border-t border-slate-50 ${i % 2 !== 0 ? 'bg-slate-50/30' : ''}`}>
                                <td className="py-1.5 px-3 text-xs text-slate-500">{s.slNo}</td>
                                <td className="py-1.5 px-3 text-xs font-medium text-slate-700">{s.systemSize}</td>
                                <td className="py-1.5 px-3 text-xs text-slate-600 text-right">{formatCurrency(s.ratePerUnit)}</td>
                                <td className="py-1.5 px-3 text-xs font-semibold text-slate-800 text-right">{formatCurrency(s.total)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </SectionCard>
            </div>

            {/* Right 1/3 */}
            <div className="space-y-6">
              {/* Section 5: Estimated Maintenance Summary */}
              <SectionCard title="Estimated Maintenance Summary" subtitle="Based on selected package and site">
                <div className="space-y-3">
                  {selectedPkg && (
                    <>
                      <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Package className="w-5 h-5 text-emerald-600" />
                          <p className="text-sm font-bold text-slate-800">Selected Package</p>
                        </div>
                        <p className="text-2xl font-extrabold text-emerald-700 mb-1">{selectedPkg.name}</p>
                        <p className="text-3xl font-extrabold text-slate-900">{formatCurrency(selectedPkg.bundledPrice)}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm line-through text-slate-400">{formatCurrency(selectedPkg.totalBeforeBundle)}</span>
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                            {selectedPkg.savingPercent}% savings
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {[
                          { label: 'System Capacity', value: '48 kW' },
                          { label: 'Segment', value: segment },
                          { label: 'Cleaning Visits', value: String(selectedPkg.cleaningVisits) },
                          { label: 'Checkups', value: String(selectedPkg.checkupVisits) },
                          { label: 'Subscription', value: 'Included' },
                        ].map((row) => (
                          <div key={row.label} className="flex justify-between text-sm py-2 border-b border-slate-50 last:border-0">
                            <span className="text-slate-500">{row.label}</span>
                            <span className="font-semibold text-slate-800">{row.value}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </SectionCard>

              {/* Register Button */}
              <button
                onClick={() => setShowConfirmation(true)}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold transition-all duration-200 shadow-sm shadow-emerald-200 flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                Register Customer & Select Package
              </button>

              <p className="text-xs text-slate-400 text-center leading-relaxed">
                This is a static prototype. Registration does not create an actual customer record.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
