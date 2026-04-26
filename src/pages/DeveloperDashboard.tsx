import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Settings, LogOut, Image, FileText, Phone, Users, Save, Plus, Trash2, 
  Shield, Palette, Type, Layout, Eye, Code, Upload, RefreshCw, Check,
  Edit3, Globe, Heart, Star, Sparkles, Download, Database, BarChart3,
  Bell, Lock, Zap, Monitor, Smartphone, Moon, Sun, Copy, ExternalLink,
  Trash, AlertTriangle, CheckCircle, Clock, TrendingUp, PieChart
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { Rule, Teacher } from '../types';

type TabType = 'general' | 'branding' | 'rules' | 'teachers' | 'content' | 'analytics' | 'backup' | 'appearance';

const DeveloperDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { config, updateConfig, addTeacher, removeTeacher, reports, getPerpetrators } = useData();
  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [schoolName, setSchoolName] = useState(config.schoolName);
  const [schoolContact, setSchoolContact] = useState(config.schoolContact);
  const [heroTitle, setHeroTitle] = useState(config.heroTitle);
  const [heroSubtitle, setHeroSubtitle] = useState(config.heroSubtitle);
  const [footerText, setFooterText] = useState(config.footerText);
  const [posterUrl, setPosterUrl] = useState(config.posterUrl);
  const [logoUrl, setLogoUrl] = useState(config.logoUrl);
  const [ikrarTaruna, setIkrarTaruna] = useState(config.ikrarTaruna);
  const [perduptar, setPerduptar] = useState<Rule[]>(config.perduptar);
  const [uudPerundungan, setUudPerundungan] = useState<Rule[]>(config.uudPerundungan);
  const [newTeacher, setNewTeacher] = useState({ name: '', password: '' });
  
  // Appearance states
  const [primaryColor, setPrimaryColor] = useState('#3b82f6');
  const [secondaryColor, setSecondaryColor] = useState('#6366f1');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem('developer_authenticated')) {
      navigate('/developer/login');
    }
  }, [navigate]);

  useEffect(() => {
    setSchoolName(config.schoolName);
    setSchoolContact(config.schoolContact);
    setHeroTitle(config.heroTitle);
    setHeroSubtitle(config.heroSubtitle);
    setFooterText(config.footerText);
    setPosterUrl(config.posterUrl);
    setLogoUrl(config.logoUrl);
    setIkrarTaruna(config.ikrarTaruna);
    setPerduptar(config.perduptar);
    setUudPerundungan(config.uudPerundungan);
  }, [config]);

  const handleLogout = () => {
    sessionStorage.removeItem('developer_authenticated');
    navigate('/');
  };

  const handleSave = () => {
    updateConfig({
      schoolName,
      schoolContact,
      heroTitle,
      heroSubtitle,
      footerText,
      posterUrl,
      logoUrl,
      ikrarTaruna,
      perduptar,
      uudPerundungan
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'poster' | 'logo') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'poster') {
          setPosterUrl(reader.result as string);
        } else {
          setLogoUrl(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addPerduptarRule = () => {
    setPerduptar([...perduptar, { id: Date.now().toString(), article: '', description: '', punishment: '' }]);
  };

  const updatePerduptarRule = (id: string, field: keyof Rule, value: string) => {
    setPerduptar(perduptar.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const removePerduptarRule = (id: string) => {
    setPerduptar(perduptar.filter(r => r.id !== id));
  };

  const addUudRule = () => {
    setUudPerundungan([...uudPerundungan, { id: Date.now().toString(), article: '', description: '', punishment: '' }]);
  };

  const updateUudRule = (id: string, field: keyof Rule, value: string) => {
    setUudPerundungan(uudPerundungan.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const removeUudRule = (id: string) => {
    setUudPerundungan(uudPerundungan.filter(r => r.id !== id));
  };

  const handleAddTeacher = () => {
    if (newTeacher.name && newTeacher.password) {
      addTeacher(newTeacher);
      setNewTeacher({ name: '', password: '' });
    }
  };

  // Export data as JSON
  const exportData = () => {
    const data = {
      config,
      reports,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `suaranasa-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  // Import data from JSON
  const importData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string);
          if (data.config) {
            updateConfig(data.config);
            alert('Data berhasil diimport!');
          }
        } catch (error) {
          alert('Error: File tidak valid');
        }
      };
      reader.readAsText(file);
    }
  };

  // Clear all reports
  const clearAllReports = () => {
    if (confirm('Apakah Anda yakin ingin menghapus semua laporan? Tindakan ini tidak dapat dibatalkan.')) {
      localStorage.removeItem('suaranasa_reports');
      window.location.reload();
    }
  };

  // Reset to default config
  const resetToDefault = () => {
    if (confirm('Apakah Anda yakin ingin reset semua pengaturan ke default? Tindakan ini tidak dapat dibatalkan.')) {
      localStorage.removeItem('suaranasa_config');
      window.location.reload();
    }
  };

  const perpetrators = getPerpetrators();
  const pendingReports = reports.filter(r => r.status === 'pending').length;
  const resolvedReports = reports.filter(r => r.status === 'resolved').length;

  const tabs: { id: TabType; label: string; icon: React.ElementType }[] = [
    { id: 'general', label: 'Umum', icon: Settings },
    { id: 'branding', label: 'Branding', icon: Palette },
    { id: 'appearance', label: 'Tampilan', icon: Monitor },
    { id: 'rules', label: 'Peraturan', icon: FileText },
    { id: 'teachers', label: 'Guru', icon: Users },
    { id: 'content', label: 'Konten', icon: Layout },
    { id: 'analytics', label: 'Analitik', icon: BarChart3 },
    { id: 'backup', label: 'Backup', icon: Database },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-xl border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-xl">
                <Code className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Developer Dashboard</h1>
                <p className="text-slate-400 text-sm">Kelola semua aspek website</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleSave}
                className={`inline-flex items-center px-5 py-2.5 rounded-xl font-medium transition-all ${
                  saved 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg'
                }`}
              >
                {saved ? (
                  <><Check className="h-5 w-5 mr-2" /> Tersimpan!</>
                ) : (
                  <><Save className="h-5 w-5 mr-2" /> Simpan Semua</>
                )}
              </button>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Keluar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-4 space-y-2 lg:sticky lg:top-24">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* General Tab */}
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                      <Settings className="h-6 w-6 mr-3 text-purple-400" />
                      Pengaturan Umum
                    </h2>
                    
                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Nama Sekolah</label>
                        <input
                          type="text"
                          value={schoolName}
                          onChange={(e) => setSchoolName(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          <Phone className="h-4 w-4 inline mr-2" />
                          Kontak Sekolah
                        </label>
                        <input
                          type="text"
                          value={schoolContact}
                          onChange={(e) => setSchoolContact(e.target.value)}
                          placeholder="Nomor telepon atau email sekolah"
                          className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          <Heart className="h-4 w-4 inline mr-2" />
                          Teks Footer
                        </label>
                        <input
                          type="text"
                          value={footerText}
                          onChange={(e) => setFooterText(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-slate-400 text-sm">Total Laporan</p>
                          <p className="text-3xl font-bold text-white">{reports.length}</p>
                        </div>
                        <div className="bg-blue-500/20 p-3 rounded-xl">
                          <FileText className="h-6 w-6 text-blue-400" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-slate-400 text-sm">Guru Terdaftar</p>
                          <p className="text-3xl font-bold text-white">{config.teachers.length}</p>
                        </div>
                        <div className="bg-green-500/20 p-3 rounded-xl">
                          <Users className="h-6 w-6 text-green-400" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-slate-400 text-sm">Pelaku Terdeteksi</p>
                          <p className="text-3xl font-bold text-white">{perpetrators.length}</p>
                        </div>
                        <div className="bg-red-500/20 p-3 rounded-xl">
                          <AlertTriangle className="h-6 w-6 text-red-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Branding Tab */}
              {activeTab === 'branding' && (
                <div className="space-y-6">
                  {/* Logo */}
                  <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                      <Shield className="h-6 w-6 mr-3 text-purple-400" />
                      Logo Website
                    </h2>
                    
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        {logoUrl ? (
                          <div className="relative group">
                            <img src={logoUrl} alt="Logo" className="w-32 h-32 rounded-2xl object-cover shadow-lg" />
                            <button
                              onClick={() => setLogoUrl('')}
                              className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="w-32 h-32 rounded-2xl bg-slate-700 flex items-center justify-center">
                            <Shield className="h-12 w-12 text-slate-500" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">URL Logo</label>
                          <input
                            type="text"
                            value={logoUrl}
                            onChange={(e) => setLogoUrl(e.target.value)}
                            placeholder="https://example.com/logo.png atau /images/logo.png"
                            className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none"
                          />
                        </div>
                        <div className="text-slate-400 text-sm">atau</div>
                        <input
                          type="file"
                          ref={logoInputRef}
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 'logo')}
                          className="hidden"
                        />
                        <button
                          onClick={() => logoInputRef.current?.click()}
                          className="inline-flex items-center px-4 py-2 bg-purple-500/20 text-purple-300 rounded-xl hover:bg-purple-500/30 transition-colors"
                        >
                          <Upload className="h-5 w-5 mr-2" />
                          Upload Logo
                        </button>
                        <p className="text-slate-500 text-xs">Rekomendasi: Gambar persegi, minimal 200x200 pixel</p>
                      </div>
                    </div>
                  </div>

                  {/* Poster */}
                  <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                      <Image className="h-6 w-6 mr-3 text-purple-400" />
                      Poster Kampanye
                    </h2>
                    
                    <div className="space-y-4">
                      {posterUrl && (
                        <div className="relative group">
                          <img src={posterUrl} alt="Poster" className="w-full max-w-2xl rounded-2xl shadow-lg" />
                          <button
                            onClick={() => setPosterUrl('')}
                            className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      )}
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">URL Poster</label>
                        <input
                          type="text"
                          value={posterUrl}
                          onChange={(e) => setPosterUrl(e.target.value)}
                          placeholder="https://example.com/poster.jpg"
                          className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none"
                        />
                      </div>
                      <div className="text-slate-400 text-sm">atau</div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'poster')}
                        className="hidden"
                      />
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center px-4 py-2 bg-purple-500/20 text-purple-300 rounded-xl hover:bg-purple-500/30 transition-colors"
                      >
                        <Upload className="h-5 w-5 mr-2" />
                        Upload Poster
                      </button>
                    </div>
                  </div>

                  {/* Hero Section */}
                  <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                      <Sparkles className="h-6 w-6 mr-3 text-purple-400" />
                      Hero Section
                    </h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Judul Hero</label>
                        <input
                          type="text"
                          value={heroTitle}
                          onChange={(e) => setHeroTitle(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Subtitle Hero</label>
                        <input
                          type="text"
                          value={heroSubtitle}
                          onChange={(e) => setHeroSubtitle(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Appearance Tab */}
              {activeTab === 'appearance' && (
                <div className="space-y-6">
                  <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                      <Monitor className="h-6 w-6 mr-3 text-purple-400" />
                      Pengaturan Tampilan
                    </h2>
                    
                    <div className="space-y-6">
                      {/* Color Picker */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Warna Utama</label>
                          <div className="flex items-center space-x-3">
                            <input
                              type="color"
                              value={primaryColor}
                              onChange={(e) => setPrimaryColor(e.target.value)}
                              className="w-12 h-12 rounded-xl cursor-pointer border-2 border-slate-600"
                            />
                            <input
                              type="text"
                              value={primaryColor}
                              onChange={(e) => setPrimaryColor(e.target.value)}
                              className="flex-1 px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600 text-white font-mono"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Warna Sekunder</label>
                          <div className="flex items-center space-x-3">
                            <input
                              type="color"
                              value={secondaryColor}
                              onChange={(e) => setSecondaryColor(e.target.value)}
                              className="w-12 h-12 rounded-xl cursor-pointer border-2 border-slate-600"
                            />
                            <input
                              type="text"
                              value={secondaryColor}
                              onChange={(e) => setSecondaryColor(e.target.value)}
                              className="flex-1 px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600 text-white font-mono"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Preview */}
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-3">Preview Warna</label>
                        <div className="flex space-x-4">
                          <div 
                            className="w-24 h-24 rounded-xl shadow-lg flex items-center justify-center text-white font-bold"
                            style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
                          >
                            Gradient
                          </div>
                          <div 
                            className="w-24 h-24 rounded-xl shadow-lg flex items-center justify-center text-white font-bold"
                            style={{ backgroundColor: primaryColor }}
                          >
                            Primary
                          </div>
                          <div 
                            className="w-24 h-24 rounded-xl shadow-lg flex items-center justify-center text-white font-bold"
                            style={{ backgroundColor: secondaryColor }}
                          >
                            Secondary
                          </div>
                        </div>
                      </div>

                      {/* Preset Colors */}
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-3">Preset Warna</label>
                        <div className="flex flex-wrap gap-3">
                          {[
                            { name: 'Ocean', primary: '#3b82f6', secondary: '#6366f1' },
                            { name: 'Sunset', primary: '#f97316', secondary: '#ef4444' },
                            { name: 'Forest', primary: '#22c55e', secondary: '#14b8a6' },
                            { name: 'Berry', primary: '#a855f7', secondary: '#ec4899' },
                            { name: 'Midnight', primary: '#1e293b', secondary: '#475569' },
                            { name: 'Gold', primary: '#eab308', secondary: '#f97316' },
                          ].map(preset => (
                            <button
                              key={preset.name}
                              onClick={() => {
                                setPrimaryColor(preset.primary);
                                setSecondaryColor(preset.secondary);
                              }}
                              className="flex items-center space-x-2 px-4 py-2 bg-slate-700/50 rounded-xl hover:bg-slate-600/50 transition-colors"
                            >
                              <div 
                                className="w-6 h-6 rounded-full"
                                style={{ background: `linear-gradient(135deg, ${preset.primary}, ${preset.secondary})` }}
                              />
                              <span className="text-slate-300 text-sm">{preset.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Device Preview */}
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-3">Preview Device</label>
                        <div className="flex space-x-4">
                          <button className="flex items-center space-x-2 px-4 py-2 bg-purple-500/20 text-purple-300 rounded-xl">
                            <Monitor className="h-5 w-5" />
                            <span>Desktop</span>
                          </button>
                          <button className="flex items-center space-x-2 px-4 py-2 bg-slate-700/50 text-slate-400 rounded-xl hover:bg-slate-600/50">
                            <Smartphone className="h-5 w-5" />
                            <span>Mobile</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Rules Tab */}
              {activeTab === 'rules' && (
                <div className="space-y-6">
                  {/* PERDUPTAR */}
                  <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-white flex items-center">
                        <FileText className="h-6 w-6 mr-3 text-blue-400" />
                        PERDUPTAR (Peraturan Kehidupan Taruna)
                      </h2>
                      <button
                        onClick={addPerduptarRule}
                        className="inline-flex items-center px-4 py-2 bg-blue-500/20 text-blue-300 rounded-xl hover:bg-blue-500/30 transition-colors"
                      >
                        <Plus className="h-5 w-5 mr-2" />
                        Tambah Pasal
                      </button>
                    </div>
                    
                    {perduptar.length === 0 ? (
                      <div className="text-center py-8">
                        <FileText className="h-12 w-12 text-slate-600 mx-auto mb-3" />
                        <p className="text-slate-400">Belum ada peraturan. Klik tombol di atas untuk menambah.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {perduptar.map((rule, index) => (
                          <div key={rule.id} className="bg-slate-700/50 rounded-xl p-4 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-slate-400">Peraturan #{index + 1}</span>
                              <button
                                onClick={() => removePerduptarRule(rule.id)}
                                className="p-1.5 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                            <div className="grid grid-cols-1 gap-3">
                              <input
                                type="text"
                                value={rule.article}
                                onChange={(e) => updatePerduptarRule(rule.id, 'article', e.target.value)}
                                placeholder="Pasal/Nomor (contoh: Pasal 1)"
                                className="px-3 py-2 rounded-lg bg-slate-600/50 border border-slate-500 text-white placeholder-slate-400 focus:border-blue-500 outline-none"
                              />
                              <textarea
                                value={rule.description}
                                onChange={(e) => updatePerduptarRule(rule.id, 'description', e.target.value)}
                                placeholder="Keterangan/Isi Pasal"
                                rows={2}
                                className="px-3 py-2 rounded-lg bg-slate-600/50 border border-slate-500 text-white placeholder-slate-400 focus:border-blue-500 outline-none resize-none"
                              />
                              <input
                                type="text"
                                value={rule.punishment}
                                onChange={(e) => updatePerduptarRule(rule.id, 'punishment', e.target.value)}
                                placeholder="Hukuman/Sanksi"
                                className="px-3 py-2 rounded-lg bg-slate-600/50 border border-slate-500 text-white placeholder-slate-400 focus:border-blue-500 outline-none"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* UUD Perundungan */}
                  <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-xl font-bold text-white flex items-center">
                          <FileText className="h-6 w-6 mr-3 text-emerald-400" />
                          UUD Indonesia tentang Perundungan
                        </h2>
                        <p className="text-slate-400 text-sm mt-1">Berisi pasal-pasal hukum Indonesia yang mengatur tentang perundungan/bullying</p>
                      </div>
                      <button
                        onClick={addUudRule}
                        className="inline-flex items-center px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-xl hover:bg-emerald-500/30 transition-colors"
                      >
                        <Plus className="h-5 w-5 mr-2" />
                        Tambah Pasal
                      </button>
                    </div>
                    
                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                      {uudPerundungan.map((rule, index) => (
                        <div key={rule.id} className="bg-slate-700/50 rounded-xl p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-emerald-400">#{index + 1}</span>
                            <button
                              onClick={() => removeUudRule(rule.id)}
                              className="p-1.5 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="grid grid-cols-1 gap-3">
                            <input
                              type="text"
                              value={rule.article}
                              onChange={(e) => updateUudRule(rule.id, 'article', e.target.value)}
                              placeholder="UU/Pasal/Ayat (contoh: KUHP Pasal 351 Ayat 1)"
                              className="px-3 py-2 rounded-lg bg-slate-600/50 border border-slate-500 text-white placeholder-slate-400 focus:border-emerald-500 outline-none"
                            />
                            <textarea
                              value={rule.description}
                              onChange={(e) => updateUudRule(rule.id, 'description', e.target.value)}
                              placeholder="Keterangan/Bunyi Pasal"
                              rows={3}
                              className="px-3 py-2 rounded-lg bg-slate-600/50 border border-slate-500 text-white placeholder-slate-400 focus:border-emerald-500 outline-none resize-none"
                            />
                            <input
                              type="text"
                              value={rule.punishment}
                              onChange={(e) => updateUudRule(rule.id, 'punishment', e.target.value)}
                              placeholder="Sanksi/Ancaman Pidana"
                              className="px-3 py-2 rounded-lg bg-slate-600/50 border border-slate-500 text-white placeholder-slate-400 focus:border-emerald-500 outline-none"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Teachers Tab */}
              {activeTab === 'teachers' && (
                <div className="space-y-6">
                  <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                      <Users className="h-6 w-6 mr-3 text-purple-400" />
                      Kelola Akses Guru
                    </h2>
                    
                    {/* Add Teacher Form */}
                    <div className="bg-slate-700/50 rounded-xl p-4 mb-6">
                      <h3 className="text-sm font-medium text-slate-300 mb-4">Tambah Guru Baru</h3>
                      <div className="flex flex-col md:flex-row gap-3">
                        <input
                          type="text"
                          value={newTeacher.name}
                          onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                          placeholder="Nama guru"
                          className="flex-1 px-4 py-3 rounded-xl bg-slate-600/50 border border-slate-500 text-white placeholder-slate-400 focus:border-purple-500 outline-none"
                        />
                        <input
                          type="password"
                          value={newTeacher.password}
                          onChange={(e) => setNewTeacher({ ...newTeacher, password: e.target.value })}
                          placeholder="Password"
                          className="flex-1 px-4 py-3 rounded-xl bg-slate-600/50 border border-slate-500 text-white placeholder-slate-400 focus:border-purple-500 outline-none"
                        />
                        <button
                          onClick={handleAddTeacher}
                          className="px-6 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors flex items-center justify-center"
                        >
                          <Plus className="h-5 w-5 mr-2" />
                          Tambah
                        </button>
                      </div>
                    </div>

                    {/* Teachers List */}
                    <div className="space-y-3">
                      {config.teachers.map((teacher, index) => (
                        <div key={teacher.id} className="flex items-center justify-between bg-slate-700/50 rounded-xl p-4">
                          <div className="flex items-center space-x-4">
                            <div className="bg-purple-500/20 p-2 rounded-lg">
                              <Users className="h-5 w-5 text-purple-400" />
                            </div>
                            <div>
                              <p className="font-medium text-white">{teacher.name}</p>
                              <p className="text-sm text-slate-400">Guru #{index + 1}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeTeacher(teacher.id)}
                            className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Content Tab */}
              {activeTab === 'content' && (
                <div className="space-y-6">
                  <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                      <Edit3 className="h-6 w-6 mr-3 text-purple-400" />
                      Ikrar Taruna Taruni
                    </h2>
                    
                    <textarea
                      value={ikrarTaruna}
                      onChange={(e) => setIkrarTaruna(e.target.value)}
                      rows={15}
                      placeholder="Masukkan teks Ikrar Taruna Taruni di sini...

Contoh:
IKRAR TARUNA TARUNI SMAN 3 TARUNA ANGKASA JAWA TIMUR

Kami Taruna dan Taruni SMAN 3 Taruna Angkasa Jawa Timur berjanji:

1. Setia kepada Pancasila dan UUD 1945
2. Menjunjung tinggi nama baik almamater
3. Menghormati guru dan sesama
4. Menjaga kedisiplinan dan kehormatan
5. Tidak melakukan perundungan dalam bentuk apapun
..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none resize-none"
                    />
                    <p className="text-slate-500 text-sm mt-2">Tip: Gunakan enter untuk baris baru. Format akan dipertahankan saat ditampilkan.</p>
                  </div>
                </div>
              )}

              {/* Analytics Tab */}
              {activeTab === 'analytics' && (
                <div className="space-y-6">
                  {/* Stats Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6">
                      <div className="flex items-center justify-between mb-2">
                        <FileText className="h-8 w-8 text-blue-400" />
                        <span className="text-xs text-blue-400 bg-blue-500/20 px-2 py-1 rounded-full">Total</span>
                      </div>
                      <p className="text-3xl font-bold text-white">{reports.length}</p>
                      <p className="text-slate-400 text-sm">Laporan Masuk</p>
                    </div>
                    <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6">
                      <div className="flex items-center justify-between mb-2">
                        <Clock className="h-8 w-8 text-yellow-400" />
                        <span className="text-xs text-yellow-400 bg-yellow-500/20 px-2 py-1 rounded-full">Pending</span>
                      </div>
                      <p className="text-3xl font-bold text-white">{pendingReports}</p>
                      <p className="text-slate-400 text-sm">Menunggu Ditinjau</p>
                    </div>
                    <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6">
                      <div className="flex items-center justify-between mb-2">
                        <CheckCircle className="h-8 w-8 text-green-400" />
                        <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded-full">Done</span>
                      </div>
                      <p className="text-3xl font-bold text-white">{resolvedReports}</p>
                      <p className="text-slate-400 text-sm">Selesai Ditangani</p>
                    </div>
                    <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6">
                      <div className="flex items-center justify-between mb-2">
                        <AlertTriangle className="h-8 w-8 text-red-400" />
                        <span className="text-xs text-red-400 bg-red-500/20 px-2 py-1 rounded-full">Alert</span>
                      </div>
                      <p className="text-3xl font-bold text-white">{perpetrators.length}</p>
                      <p className="text-slate-400 text-sm">Pelaku Terdeteksi</p>
                    </div>
                  </div>

                  {/* Top Perpetrators */}
                  <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                      <TrendingUp className="h-6 w-6 mr-3 text-red-400" />
                      Top Pelaku Perundungan
                    </h2>
                    
                    {perpetrators.length === 0 ? (
                      <div className="text-center py-8">
                        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                        <p className="text-slate-400">Belum ada pelaku yang terdeteksi</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {perpetrators.slice(0, 10).map((perp, index) => (
                          <div key={`${perp.name}-${perp.class}`} className="flex items-center justify-between bg-slate-700/50 rounded-xl p-4">
                            <div className="flex items-center space-x-4">
                              <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                                index === 0 ? 'bg-red-500 text-white' :
                                index === 1 ? 'bg-orange-500 text-white' :
                                index === 2 ? 'bg-yellow-500 text-white' :
                                'bg-slate-600 text-slate-300'
                              }`}>
                                {index + 1}
                              </span>
                              <div>
                                <p className="font-medium text-white">{perp.name}</p>
                                <p className="text-sm text-slate-400">Kelas {perp.class}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-2xl font-bold text-red-400">{perp.count}</span>
                              <span className="text-slate-500 text-sm">laporan</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bullying Types Distribution */}
                  <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                      <PieChart className="h-6 w-6 mr-3 text-purple-400" />
                      Distribusi Jenis Perundungan
                    </h2>
                    
                    {reports.length === 0 ? (
                      <div className="text-center py-8">
                        <PieChart className="h-12 w-12 text-slate-600 mx-auto mb-3" />
                        <p className="text-slate-400">Belum ada data untuk ditampilkan</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {Array.from(new Set(reports.map(r => r.bullyingType))).map(type => {
                          const count = reports.filter(r => r.bullyingType === type).length;
                          const percentage = Math.round((count / reports.length) * 100);
                          return (
                            <div key={type} className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-slate-300">{type}</span>
                                <span className="text-slate-400">{count} ({percentage}%)</span>
                              </div>
                              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Backup Tab */}
              {activeTab === 'backup' && (
                <div className="space-y-6">
                  {/* Export */}
                  <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                      <Download className="h-6 w-6 mr-3 text-green-400" />
                      Export Data
                    </h2>
                    <p className="text-slate-400 mb-4">
                      Download semua data website termasuk konfigurasi, laporan, dan pengaturan dalam format JSON.
                    </p>
                    <button
                      onClick={exportData}
                      className="inline-flex items-center px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                    >
                      <Download className="h-5 w-5 mr-2" />
                      Download Backup
                    </button>
                  </div>

                  {/* Import */}
                  <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                      <Upload className="h-6 w-6 mr-3 text-blue-400" />
                      Import Data
                    </h2>
                    <p className="text-slate-400 mb-4">
                      Restore data dari file backup JSON. Ini akan menimpa konfigurasi yang ada.
                    </p>
                    <input
                      type="file"
                      accept=".json"
                      onChange={importData}
                      className="hidden"
                      id="import-file"
                    />
                    <label
                      htmlFor="import-file"
                      className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors cursor-pointer"
                    >
                      <Upload className="h-5 w-5 mr-2" />
                      Upload Backup File
                    </label>
                  </div>

                  {/* Danger Zone */}
                  <div className="bg-red-500/10 backdrop-blur-xl rounded-2xl border border-red-500/30 p-6">
                    <h2 className="text-xl font-bold text-red-400 mb-6 flex items-center">
                      <AlertTriangle className="h-6 w-6 mr-3" />
                      Zona Berbahaya
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl">
                        <div>
                          <p className="font-medium text-white">Hapus Semua Laporan</p>
                          <p className="text-sm text-slate-400">Menghapus semua laporan perundungan yang masuk</p>
                        </div>
                        <button
                          onClick={clearAllReports}
                          className="px-4 py-2 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-colors"
                        >
                          <Trash className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl">
                        <div>
                          <p className="font-medium text-white">Reset ke Default</p>
                          <p className="text-sm text-slate-400">Mengembalikan semua pengaturan ke nilai awal</p>
                        </div>
                        <button
                          onClick={resetToDefault}
                          className="px-4 py-2 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-colors"
                        >
                          <RefreshCw className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperDashboard;
