import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Scale, BookOpen, ChevronDown, ChevronUp, AlertCircle, Search, Gavel, Shield, Wifi, Book, ScrollText, Users, ExternalLink } from 'lucide-react';
import { useData } from '../context/DataContext';

const Peraturan: React.FC = () => {
  const { config } = useData();
  const [activeTab, setActiveTab] = useState<'uud' | 'perduptar' | 'ikrar'>('uud');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const tabs = [
    { id: 'uud', label: 'Hukum Indonesia', icon: Scale, description: 'UUD 1945, KUHP & UU terkait' },
    { id: 'perduptar', label: 'PERDUPTAR', icon: BookOpen, description: 'Peraturan Kehidupan Taruna' },
    { id: 'ikrar', label: 'Ikrar Taruna', icon: FileText, description: 'Ikrar Taruna Taruni' },
  ];

  const categories = [
    { id: 'all', label: 'Semua Pasal', count: config.uudPerundungan.length },
    { id: 'uud-1945', label: 'UUD 1945', count: config.uudPerundungan.filter(r => r.article.includes('UUD 1945')).length },
    { id: 'uu-pa', label: 'UU Perlindungan Anak', count: config.uudPerundungan.filter(r => r.article.includes('UU No. 35')).length },
    { id: 'kuhp-aniaya', label: 'KUHP Penganiayaan', count: config.uudPerundungan.filter(r => r.article.includes('Pasal 351') || r.article.includes('Pasal 352') || r.article.includes('Pasal 353')).length },
    { id: 'kuhp-keroyok', label: 'KUHP Pengeroyokan', count: config.uudPerundungan.filter(r => r.article.includes('Pasal 170')).length },
    { id: 'kuhp-cemar', label: 'KUHP Pencemaran', count: config.uudPerundungan.filter(r => r.article.includes('Pasal 310') || r.article.includes('Pasal 311') || r.article.includes('Pasal 335') || r.article.includes('Pasal 369')).length },
    { id: 'uu-ite', label: 'UU ITE', count: config.uudPerundungan.filter(r => r.article.includes('UU ITE')).length },
    { id: 'kuhp-baru', label: 'KUHP Baru 2023', count: config.uudPerundungan.filter(r => r.article.includes('KUHP Baru')).length },
  ];

  const getCategoryFromArticle = (article: string): string => {
    if (article.includes('UUD 1945')) return 'uud-1945';
    if (article.includes('UU No. 35')) return 'uu-pa';
    if (article.includes('Pasal 351') || article.includes('Pasal 352') || article.includes('Pasal 353')) return 'kuhp-aniaya';
    if (article.includes('Pasal 170')) return 'kuhp-keroyok';
    if (article.includes('Pasal 310') || article.includes('Pasal 311') || article.includes('Pasal 335') || article.includes('Pasal 369')) return 'kuhp-cemar';
    if (article.includes('UU ITE')) return 'uu-ite';
    if (article.includes('KUHP Baru')) return 'kuhp-baru';
    return 'other';
  };

  const filteredUud = config.uudPerundungan.filter(rule => {
    const matchesSearch = searchQuery === '' || 
      rule.article.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rule.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || getCategoryFromArticle(rule.article) === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryStyle = (category: string) => {
    switch (category) {
      case 'uud-1945': return { bg: 'bg-amber-500', light: 'bg-amber-100 text-amber-700 border-amber-200', icon: ScrollText };
      case 'uu-pa': return { bg: 'bg-blue-500', light: 'bg-blue-100 text-blue-700 border-blue-200', icon: Shield };
      case 'kuhp-aniaya': return { bg: 'bg-red-500', light: 'bg-red-100 text-red-700 border-red-200', icon: Gavel };
      case 'kuhp-keroyok': return { bg: 'bg-orange-500', light: 'bg-orange-100 text-orange-700 border-orange-200', icon: Users };
      case 'kuhp-cemar': return { bg: 'bg-purple-500', light: 'bg-purple-100 text-purple-700 border-purple-200', icon: FileText };
      case 'uu-ite': return { bg: 'bg-cyan-500', light: 'bg-cyan-100 text-cyan-700 border-cyan-200', icon: Wifi };
      case 'kuhp-baru': return { bg: 'bg-emerald-500', light: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: Book };
      default: return { bg: 'bg-slate-500', light: 'bg-slate-100 text-slate-700 border-slate-200', icon: FileText };
    }
  };

  const getCategoryLabel = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat?.label || 'Lainnya';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-600 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/stop-hand.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/90 via-blue-600/90 to-cyan-600/90"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
              <Scale className="h-10 w-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Dasar Hukum Indonesia</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              UUD 1945, KUHP, dan Undang-Undang yang melindungi dari perundungan
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-10 pb-16">
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-3 px-6 py-4 rounded-2xl font-medium transition-all duration-300 shadow-lg ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-xl scale-105'
                  : 'bg-white/80 backdrop-blur-sm text-slate-600 hover:bg-white hover:shadow-xl'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <div className="text-left">
                <div className="font-bold">{tab.label}</div>
                <div className="text-xs opacity-70">{tab.description}</div>
              </div>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'uud' && (
              <div className="space-y-6">
                {/* Search */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Cari pasal, ayat, atau keterangan..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-lg"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="font-bold text-slate-800 mb-4">Filter Berdasarkan Kategori</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {categories.map(cat => {
                      const style = getCategoryStyle(cat.id);
                      const isActive = selectedCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                            isActive
                              ? `${style.light} border-current shadow-lg`
                              : 'bg-slate-50 border-transparent hover:bg-slate-100'
                          }`}
                        >
                          <span className="font-medium text-sm">{cat.label}</span>
                          <span className={`text-xs font-bold px-2 py-1 rounded-full ${isActive ? 'bg-white/50' : 'bg-slate-200'}`}>
                            {cat.count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Results Count */}
                <div className="flex items-center justify-between">
                  <p className="text-slate-600">
                    Menampilkan <span className="font-bold text-blue-600">{filteredUud.length}</span> dari {config.uudPerundungan.length} pasal
                  </p>
                  {selectedCategory !== 'all' && (
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      Reset Filter
                    </button>
                  )}
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 gap-4">
                  {filteredUud.map((rule, index) => {
                    const category = getCategoryFromArticle(rule.article);
                    const style = getCategoryStyle(category);
                    const isExpanded = expandedRow === rule.id;
                    
                    return (
                      <motion.div
                        key={rule.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.02 }}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                      >
                        <div
                          className="p-6 cursor-pointer"
                          onClick={() => setExpandedRow(isExpanded ? null : rule.id)}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`${style.bg} p-3 rounded-xl text-white flex-shrink-0`}>
                              <style.icon className="h-6 w-6" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${style.light} mb-2`}>
                                    {getCategoryLabel(category)}
                                  </span>
                                  <h3 className="font-bold text-slate-800 text-lg">{rule.article}</h3>
                                </div>
                                <button className="flex-shrink-0 p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                  {isExpanded ? (
                                    <ChevronUp className="h-5 w-5 text-slate-400" />
                                  ) : (
                                    <ChevronDown className="h-5 w-5 text-slate-400" />
                                  )}
                                </button>
                              </div>
                              <p className={`text-slate-600 mt-2 ${isExpanded ? '' : 'line-clamp-2'}`}>
                                {rule.description}
                              </p>
                            </div>
                          </div>
                          
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-4 pt-4 border-t border-slate-100"
                              >
                                <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-4 border border-red-100">
                                  <div className="flex items-center gap-2 mb-2">
                                    <AlertCircle className="h-5 w-5 text-red-500" />
                                    <span className="font-bold text-red-700">Sanksi / Ancaman Pidana</span>
                                  </div>
                                  <p className="text-red-800 font-medium">{rule.punishment}</p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {filteredUud.length === 0 && (
                  <div className="bg-white rounded-2xl shadow-xl p-16 text-center">
                    <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Search className="h-10 w-10 text-slate-400" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-700 mb-2">Tidak Ditemukan</h3>
                    <p className="text-slate-500">Tidak ada pasal yang sesuai dengan pencarian Anda</p>
                  </div>
                )}

                {/* Info Box */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-amber-400 p-3 rounded-xl flex-shrink-0">
                      <AlertCircle className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-amber-800 text-lg mb-3">Catatan Penting</h3>
                      <ul className="text-amber-700 space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-amber-500 mt-1">•</span>
                          <span><strong>UUD 1945</strong> adalah dasar konstitusional tertinggi yang menjamin perlindungan dari kekerasan</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-500 mt-1">•</span>
                          <span><strong>KUHP Baru (UU No. 1/2023)</strong> mulai berlaku efektif pada 2 Januari 2026</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-500 mt-1">•</span>
                          <span>Perundungan terhadap anak dikenakan sanksi lebih berat sesuai <strong>UU Perlindungan Anak</strong></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-500 mt-1">•</span>
                          <span>Cyberbullying diatur khusus dalam <strong>UU ITE</strong> dengan sanksi hingga 6 tahun penjara</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'perduptar' && (
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-8">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-xl">
                      <BookOpen className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">PERDUPTAR</h2>
                      <p className="text-white/80">Peraturan Kehidupan Taruna - {config.schoolName}</p>
                    </div>
                  </div>
                </div>
                
                {config.perduptar.length > 0 ? (
                  <div className="divide-y divide-slate-100">
                    {config.perduptar.map((rule, index) => (
                      <div key={rule.id} className="p-6 hover:bg-slate-50 transition-colors">
                        <div className="flex items-start gap-4">
                          <span className="bg-blue-100 text-blue-700 font-bold px-4 py-2 rounded-xl">
                            {rule.article}
                          </span>
                          <div className="flex-1">
                            <p className="text-slate-700 mb-2">{rule.description}</p>
                            <p className="text-sm">
                              <span className="text-slate-500">Sanksi:</span>{' '}
                              <span className="text-red-600 font-medium">{rule.punishment}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-16 text-center">
                    <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <BookOpen className="h-10 w-10 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-700 mb-2">Belum Ada Peraturan</h3>
                    <p className="text-slate-500">Peraturan PERDUPTAR akan ditampilkan setelah ditambahkan oleh developer</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'ikrar' && (
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-8">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-xl">
                      <FileText className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Ikrar Taruna Taruni</h2>
                      <p className="text-white/80">{config.schoolName}</p>
                    </div>
                  </div>
                </div>
                
                {config.ikrarTaruna ? (
                  <div className="p-8">
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-100">
                      <div className="prose prose-lg max-w-none text-slate-700 whitespace-pre-wrap leading-relaxed">
                        {config.ikrarTaruna}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-16 text-center">
                    <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FileText className="h-10 w-10 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-700 mb-2">Belum Ada Ikrar</h3>
                    <p className="text-slate-500">Ikrar Taruna Taruni akan ditampilkan setelah ditambahkan oleh developer</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Peraturan;
