import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, Home, FileText, AlertTriangle, Users, Settings } from 'lucide-react';
import { useData } from '../context/DataContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { config } = useData();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Beranda', icon: Home },
    { path: '/peraturan', label: 'Peraturan', icon: FileText },
    { path: '/lapor', label: 'Laporkan', icon: AlertTriangle, highlight: true },
    { path: '/guru/login', label: 'Akses Guru', icon: Users },
    { path: '/developer/login', label: 'Developer', icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isHomePage = location.pathname === '/';

  // Always show solid navbar when scrolled OR when not on homepage
  const showSolidNav = scrolled || !isHomePage;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      showSolidNav
        ? 'bg-white shadow-lg shadow-slate-200/50'
        : 'bg-gradient-to-b from-black/50 to-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              {config.logoUrl ? (
                <img src={config.logoUrl} alt="Logo" className="h-12 w-12 rounded-xl object-cover shadow-lg group-hover:scale-105 transition-transform" />
              ) : (
                <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2.5 rounded-xl shadow-lg group-hover:scale-105 transition-transform">
                  <Shield className="h-7 w-7 text-white" />
                </div>
              )}
              <div>
                <span className={`text-xl font-bold transition-colors ${
                  showSolidNav ? 'text-slate-800' : 'text-white'
                }`}>SuaraNASA</span>
                <p className={`text-xs font-medium transition-colors ${
                  showSolidNav ? 'text-slate-500' : 'text-white/80'
                }`}>Anti Perundungan</p>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  item.highlight
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 hover:scale-105'
                    : isActive(item.path)
                    ? showSolidNav
                      ? 'bg-blue-50 text-blue-600'
                      : 'bg-white/20 text-white backdrop-blur-sm'
                    : showSolidNav
                    ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                    : 'text-white/90 hover:bg-white/20 hover:text-white'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2.5 rounded-xl transition-all ${
                showSolidNav
                  ? 'text-slate-800 hover:bg-slate-100'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-xl">
          <div className="px-4 py-4 space-y-2">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all ${
                  item.highlight
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                    : isActive(item.path)
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
