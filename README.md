# GCH Solar Maintenance Platform

A premium **10-page static web application prototype** for [Green Carbon Hub](https://greencarbonhub.com)'s solar maintenance operations. Built as a clickable product concept to demonstrate how a real enterprise-grade maintenance management platform could look and flow — without requiring backend, APIs, or databases.

> **This is a design prototype, not a production application.** All data is static and representative. Pricing reflects actual GCH maintenance packages and slab-based service rates.

## What Is This?

Green Carbon Hub offers **Annual Maintenance Contracts (AMC)**, panel cleaning services, system health checkups, and preventive maintenance for residential and commercial solar installations.

This prototype communicates that GCH is not just selling solar maintenance services — it is operating a **full maintenance platform**. Stakeholders can walk through the entire product vision without needing Figma or design tools.

---

## Pages

| # | Page | Route | Purpose |
|---|------|-------|---------|
| 1 | **Overview Dashboard** | `/` | Operational snapshot — KPIs, package pricing, service activity chart, upcoming visits, site alerts |
| 2 | **Maintenance Services** | `/services` | Service catalog — panel cleaning, system checkup, preventive maintenance SOPs |
| 3 | **AMC Packages & Pricing** | `/amc-packages` | Bundled packages (Basic / Standard / Premium) with full 20-row cleaning and checkup slab tables |
| 4 | **Customers & Sites** | `/customers` | Customer portfolio — site tracking, package coverage, service schedules |
| 5 | **Customer Site Detail** | `/site-health/:siteId` | Individual site health — asset health score, maintenance timeline, issues, SOP coverage |
| 6 | **Service Job Detail** | `/service-job` | Maintenance visit record — work performed, checklists, inspection findings, technician remarks |
| 7 | **Performance & Monitoring** | `/performance` | Maintenance impact visualization — generation trend chart, performance comparison, inverter summary |
| 8 | **SOP & Checklist** | `/sop` | Operational SOPs — cleaning procedure, maintenance modules, daily checklist, troubleshooting guides |
| 9 | **Reports & Analytics** | `/reports` | Management dashboard — job stats, revenue, charts, report repository, activity timeline |
| 10 | **Customer Registration** | `/register` | Registration flow — customer form, site details, package selection, pricing tables, confirmation |

### Prerequisites

- [Node.js](https://nodejs.org) 18+ and npm

### Install & Run

```bash
# Clone the repository
git clone https://github.com/dnvpravallika/GCH-Prototype.git
cd GCH-Prototype

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at **http://localhost:5173/**

### Build for Production

```bash
npm run build
npm run preview
```

---

## Project Structure

```
src/
├── components/
│   ├── Header.tsx          # Page header with search, actions, notifications
│   ├── Sidebar.tsx         # Navigation sidebar with 10 page links
│   └── ui.tsx              # Reusable components (KpiCard, StatusBadge, SectionCard, etc.)
├── data/
│   └── index.ts            # All GCH pricing data, customer records, and constants
├── pages/
│   ├── OverviewPage.tsx    # Dashboard overview
│   ├── ServicesPage.tsx    # Service catalog
│   ├── AmcPackagesPage.tsx # Packages & pricing tables
│   ├── CustomersPage.tsx   # Customer portfolio
│   ├── SiteHealthPage.tsx  # Individual site health detail
│   ├── ServiceJobPage.tsx  # Maintenance visit record
│   ├── PerformancePage.tsx # Performance monitoring
│   ├── SopPage.tsx         # SOP & maintenance checklists
│   ├── ReportsPage.tsx     # Reports & analytics
│   └── RegisterPage.tsx    # Customer registration flow
├── App.tsx                 # Route definitions
├── main.tsx                # App entry point
└── index.css               # Tailwind directives & global styles
```

## Notes

- This is a **static frontend prototype** — no backend, no authentication, no database
- All data is hardcoded in `src/data/index.ts` and individual page files
- The prototype is intended for **stakeholder presentations** and product vision communication
- Performance page data is labeled as "maintenance monitoring snapshots," not live IoT data
- Registration page includes a disclaimer that it does not create actual records

---
