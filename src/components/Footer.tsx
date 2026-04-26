import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Heart, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { useData } from '../context/DataContext';

const Footer: React.FC = () => {
  const { config } = useData();

  const quickLinks = [
    { label: 'Beranda', path: '/' },
    { label: 'Laporkan', path: '/lapor' },
    { label: 'Peraturan', path: '/peraturan' },
    { label: 'Portal Guru', path: '/guru/login' },
  ];

  const legalLinks = [
    { label: 'UU Perlindungan Anak', path: '/peraturan' },
    { label: 'KUHP Penganiayaan', path: '/peraturan' },
    { label: 'UU ITE', path: '/peraturan' },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              {config.logoUrl ? (
                <img src={config.logoUrl} alt="Logo" className="h-12 w-12 rounded-xl object-cover" />
              ) : (
                <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2.5 rounded-xl">
                  <Shield className="h-7 w-7 text-white" />
                </div>
              )}
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">SuaraNASA</span>
                <p className="text-slate-400 text-xs">Sekolah Tanpa Perundungan</p>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Platform pelaporan perundungan anonim untuk menciptakan lingkungan sekolah yang aman dan nyaman bagi seluruh siswa.
            </p>
            <div className="flex space-x-3">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Icon className="h-5 w-5 text-slate-400" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Menu Cepat</h3>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-slate-400 hover:text-cyan-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-bold mb-6">Dasar Hukum</h3>
            <ul className="space-y-3">
              {legalLinks.map(link => (
                <li key={link.label}>
                  <Link to={link.path} className="text-slate-400 hover:text-cyan-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6">Kontak</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <p className="text-slate-400">{config.schoolName}</p>
              </div>
              {config.schoolContact && (
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                  <p className="text-slate-400">{config.schoolContact}</p>
                </div>
              )}
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                <p className="text-slate-400">suaranasa@sman3taruna.sch.id</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-500 text-sm">
              {config.footerText}
            </p>
            <p className="text-slate-500 text-sm flex items-center">
              Dibuat dengan <Heart className="h-4 w-4 text-red-500 mx-1 animate-pulse" /> untuk pendidikan yang lebih baik
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
