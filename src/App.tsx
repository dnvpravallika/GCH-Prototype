import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import OverviewPage from './pages/OverviewPage';
import ServicesPage from './pages/ServicesPage';
import AmcPackagesPage from './pages/AmcPackagesPage';
import CustomersPage from './pages/CustomersPage';
import SiteHealthPage from './pages/SiteHealthPage';
import ServiceJobPage from './pages/ServiceJobPage';
import PerformancePage from './pages/PerformancePage';
import SopPage from './pages/SopPage';
import ReportsPage from './pages/ReportsPage';
import RegisterPage from './pages/RegisterPage';

export default function App() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64 min-h-screen bg-slate-50">
        <Routes>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/amc-packages" element={<AmcPackagesPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/site-health/:siteId" element={<SiteHealthPage />} />
          <Route path="/service-job" element={<ServiceJobPage />} />
          <Route path="/performance" element={<PerformancePage />} />
          <Route path="/sop" element={<SopPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </div>
  );
}
