import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import { ReportProvider } from './context/ReportContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Peraturan from './pages/Peraturan';
import Lapor from './pages/Lapor';
import GuruLogin from './pages/GuruLogin';
import GuruDashboard from './pages/GuruDashboard';
import DeveloperLogin from './pages/DeveloperLogin';
import DeveloperDashboard from './pages/DeveloperDashboard';

const AppContent: React.FC = () => {
  const location = useLocation();
  const isDashboard = location.pathname === '/guru/dashboard' || location.pathname === '/developer/dashboard';

  if (isDashboard) {
    return (
      <Routes>
        <Route path="/guru/dashboard" element={<GuruDashboard />} />
        <Route path="/developer/dashboard" element={<DeveloperDashboard />} />
      </Routes>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/peraturan" element={<Peraturan />} />
          <Route path="/lapor" element={<Lapor />} />
          <Route path="/guru/login" element={<GuruLogin />} />
          <Route path="/developer/login" element={<DeveloperLogin />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

function App() {
  return (
    <DataProvider>
      <ReportProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <AppContent />
          </div>
        </BrowserRouter>
      </ReportProvider>
    </DataProvider>
  );
}

export default App;
