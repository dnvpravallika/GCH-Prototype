// ============================================================
// GCH Solar Maintenance Platform — Actual Pricing & Data
// All values are from the official Green Carbon Hub document.
// DO NOT replace with placeholder or sample pricing.
// ============================================================

export interface BundledPackage {
  name: string;
  tier: 'basic' | 'standard' | 'premium';
  cleaningVisits: number;
  checkupVisits: number;
  cleaningRate: number;
  cleaningTotal: number;
  checkupRate: number;
  checkupTotal: number;
  subscriptionFee: number;
  totalBeforeBundle: number;
  bundledPrice: number;
  savingPercent: number;
  features: string[];
  recommended?: boolean;
}

export const bundledPackages: BundledPackage[] = [
  {
    name: 'Basic',
    tier: 'basic',
    cleaningVisits: 1,
    checkupVisits: 1,
    cleaningRate: 1350,
    cleaningTotal: 1350,
    checkupRate: 500,
    checkupTotal: 500,
    subscriptionFee: 500,
    totalBeforeBundle: 2350,
    bundledPrice: 1199,
    savingPercent: 49,
    features: [
      '1 panel cleaning visit',
      '1 system checkup visit',
      'Subscription included',
      'Service history tracking',
    ],
  },
  {
    name: 'Standard',
    tier: 'standard',
    cleaningVisits: 2,
    checkupVisits: 1,
    cleaningRate: 1350,
    cleaningTotal: 2700,
    checkupRate: 500,
    checkupTotal: 500,
    subscriptionFee: 500,
    totalBeforeBundle: 3700,
    bundledPrice: 1699,
    savingPercent: 54,
    features: [
      '2 panel cleaning visits',
      '1 system checkup visit',
      'Subscription included',
      'Priority scheduling',
      'Maintenance reports',
    ],
  },
  {
    name: 'Premium',
    tier: 'premium',
    cleaningVisits: 4,
    checkupVisits: 2,
    cleaningRate: 1350,
    cleaningTotal: 5400,
    checkupRate: 500,
    checkupTotal: 1000,
    subscriptionFee: 500,
    totalBeforeBundle: 6900,
    bundledPrice: 2999,
    savingPercent: 57,
    recommended: true,
    features: [
      '4 panel cleaning visits',
      '2 system checkup visits',
      'Subscription included',
      'Priority scheduling',
      'Detailed maintenance reports',
      'Preventive maintenance planning',
    ],
  },
];

export interface PriceSlab {
  slNo: number;
  systemSize: string;
  ratePerUnit: number;
  total: number;
}

export const cleaningPriceSlabs: PriceSlab[] = [
  { slNo: 1, systemSize: '3–5 kW', ratePerUnit: 270, total: 1350 },
  { slNo: 2, systemSize: '6–10 kW', ratePerUnit: 260, total: 2600 },
  { slNo: 3, systemSize: '11–15 kW', ratePerUnit: 250, total: 3750 },
  { slNo: 4, systemSize: '16–20 kW', ratePerUnit: 240, total: 4800 },
  { slNo: 5, systemSize: '21–25 kW', ratePerUnit: 230, total: 5750 },
  { slNo: 6, systemSize: '26–30 kW', ratePerUnit: 220, total: 6600 },
  { slNo: 7, systemSize: '31–35 kW', ratePerUnit: 210, total: 7350 },
  { slNo: 8, systemSize: '36–40 kW', ratePerUnit: 200, total: 8000 },
  { slNo: 9, systemSize: '41–45 kW', ratePerUnit: 190, total: 8550 },
  { slNo: 10, systemSize: '46–50 kW', ratePerUnit: 180, total: 9000 },
  { slNo: 11, systemSize: '51–55 kW', ratePerUnit: 170, total: 9350 },
  { slNo: 12, systemSize: '56–60 kW', ratePerUnit: 160, total: 9600 },
  { slNo: 13, systemSize: '61–65 kW', ratePerUnit: 154, total: 10010 },
  { slNo: 14, systemSize: '66–70 kW', ratePerUnit: 148, total: 10360 },
  { slNo: 15, systemSize: '71–75 kW', ratePerUnit: 142, total: 10650 },
  { slNo: 16, systemSize: '76–80 kW', ratePerUnit: 136, total: 10880 },
  { slNo: 17, systemSize: '81–85 kW', ratePerUnit: 130, total: 11050 },
  { slNo: 18, systemSize: '86–90 kW', ratePerUnit: 124, total: 11160 },
  { slNo: 19, systemSize: '91–95 kW', ratePerUnit: 118, total: 11210 },
  { slNo: 20, systemSize: '96–100 kW', ratePerUnit: 112, total: 11200 },
];

export const checkupPriceSlabs: PriceSlab[] = [
  { slNo: 1, systemSize: '3–5 kW', ratePerUnit: 500, total: 500 },
  { slNo: 2, systemSize: '6–10 kW', ratePerUnit: 600, total: 600 },
  { slNo: 3, systemSize: '11–15 kW', ratePerUnit: 700, total: 700 },
  { slNo: 4, systemSize: '16–20 kW', ratePerUnit: 800, total: 800 },
  { slNo: 5, systemSize: '21–25 kW', ratePerUnit: 900, total: 900 },
  { slNo: 6, systemSize: '26–30 kW', ratePerUnit: 1000, total: 1000 },
  { slNo: 7, systemSize: '31–35 kW', ratePerUnit: 1100, total: 1100 },
  { slNo: 8, systemSize: '36–40 kW', ratePerUnit: 1200, total: 1200 },
  { slNo: 9, systemSize: '41–45 kW', ratePerUnit: 1300, total: 1300 },
  { slNo: 10, systemSize: '46–50 kW', ratePerUnit: 1400, total: 1400 },
  { slNo: 11, systemSize: '51–55 kW', ratePerUnit: 1500, total: 1500 },
  { slNo: 12, systemSize: '56–60 kW', ratePerUnit: 1600, total: 1600 },
  { slNo: 13, systemSize: '61–65 kW', ratePerUnit: 1700, total: 1700 },
  { slNo: 14, systemSize: '66–70 kW', ratePerUnit: 1800, total: 1800 },
  { slNo: 15, systemSize: '71–75 kW', ratePerUnit: 1900, total: 1900 },
  { slNo: 16, systemSize: '76–80 kW', ratePerUnit: 2000, total: 2000 },
  { slNo: 17, systemSize: '81–85 kW', ratePerUnit: 2100, total: 2100 },
  { slNo: 18, systemSize: '86–90 kW', ratePerUnit: 2200, total: 2200 },
  { slNo: 19, systemSize: '91–95 kW', ratePerUnit: 2300, total: 2300 },
  { slNo: 20, systemSize: '96–100 kW', ratePerUnit: 2400, total: 2400 },
];

export interface CustomerSite {
  id: string;
  customerName: string;
  siteName: string;
  segment: 'Residential' | 'Commercial';
  systemSize: string;
  systemSizeKw: number;
  packageTier: 'Basic' | 'Standard' | 'Premium' | 'One-Time';
  lastService: string;
  nextVisit: string;
  healthStatus: 'Good' | 'Attention' | 'Alert';
  openAlerts: number;
}

export const customerSites: CustomerSite[] = [
  {
    id: 'site-001',
    customerName: 'Sree Lakshmi Residency',
    siteName: 'Vijayawada Block A',
    segment: 'Residential',
    systemSize: '5 kW',
    systemSizeKw: 5,
    packageTier: 'Basic',
    lastService: '28 Jun 2026',
    nextVisit: '14 Jul 2026',
    healthStatus: 'Good',
    openAlerts: 1,
  },
  {
    id: 'site-002',
    customerName: 'Auro Fresh Farms',
    siteName: 'Guntur Plant',
    segment: 'Commercial',
    systemSize: '48 kW',
    systemSizeKw: 48,
    packageTier: 'Premium',
    lastService: '03 Jul 2026',
    nextVisit: '16 Jul 2026',
    healthStatus: 'Attention',
    openAlerts: 2,
  },
  {
    id: 'site-003',
    customerName: 'Sai Enclave',
    siteName: 'Ongole Rooftop',
    segment: 'Residential',
    systemSize: '10 kW',
    systemSizeKw: 10,
    packageTier: 'Standard',
    lastService: '20 Jun 2026',
    nextVisit: '22 Jul 2026',
    healthStatus: 'Good',
    openAlerts: 0,
  },
  {
    id: 'site-004',
    customerName: 'Veda Agro Industries',
    siteName: 'Tenali Unit 2',
    segment: 'Commercial',
    systemSize: '65 kW',
    systemSizeKw: 65,
    packageTier: 'Premium',
    lastService: '01 Jul 2026',
    nextVisit: '18 Jul 2026',
    healthStatus: 'Alert',
    openAlerts: 3,
  },
  {
    id: 'site-005',
    customerName: 'Nitya Villas',
    siteName: 'Guntur Cluster',
    segment: 'Residential',
    systemSize: '15 kW',
    systemSizeKw: 15,
    packageTier: 'Standard',
    lastService: '26 Jun 2026',
    nextVisit: '12 Jul 2026',
    healthStatus: 'Attention',
    openAlerts: 1,
  },
  {
    id: 'site-006',
    customerName: 'Mangalya Heights',
    siteName: 'Vijayawada Tower B',
    segment: 'Residential',
    systemSize: '5 kW',
    systemSizeKw: 5,
    packageTier: 'Basic',
    lastService: '15 Jun 2026',
    nextVisit: '10 Jul 2026',
    healthStatus: 'Attention',
    openAlerts: 2,
  },
];

export interface UpcomingVisit {
  customer: string;
  site: string;
  serviceType: string;
  plan: string;
  date: string;
  technician: string;
  status: 'Scheduled' | 'In Progress' | 'Delayed' | 'Completed';
}

export const upcomingVisits: UpcomingVisit[] = [
  {
    customer: 'Sree Lakshmi Residency',
    site: 'Vijayawada Block A',
    serviceType: 'Panel Cleaning',
    plan: 'Basic',
    date: '12 Jul 2026',
    technician: 'Ravi Kumar',
    status: 'Scheduled',
  },
  {
    customer: 'Auro Fresh Farms',
    site: 'Guntur Plant',
    serviceType: 'Preventive Maintenance',
    plan: 'Premium',
    date: '12 Jul 2026',
    technician: 'Harish',
    status: 'In Progress',
  },
  {
    customer: 'Sai Enclave',
    site: 'Ongole Rooftop',
    serviceType: 'System Checkup',
    plan: 'Standard',
    date: '13 Jul 2026',
    technician: 'Nikhil',
    status: 'Scheduled',
  },
  {
    customer: 'Veda Agro Industries',
    site: 'Tenali Unit 2',
    serviceType: 'Inverter Inspection',
    plan: 'Premium',
    date: '13 Jul 2026',
    technician: 'Mahesh',
    status: 'Scheduled',
  },
  {
    customer: 'Nitya Villas',
    site: 'Guntur Cluster',
    serviceType: 'Panel Cleaning',
    plan: 'Standard',
    date: '14 Jul 2026',
    technician: 'Arun',
    status: 'Delayed',
  },
];

export const serviceActivityData = [
  { name: 'Scheduled', value: 24, color: '#3b82f6' },
  { name: 'In Progress', value: 6, color: '#f59e0b' },
  { name: 'Completed', value: 142, color: '#10b981' },
  { name: 'Delayed', value: 5, color: '#ef4444' },
];

export const formatCurrency = (value: number): string => {
  return '₹' + value.toLocaleString('en-IN');
};
