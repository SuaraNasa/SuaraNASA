import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, AlertTriangle, FileText, Users, ChevronRight, Heart, Phone, Scale, BookOpen, Zap, Eye, Lock, MessageCircle, Clock, CheckCircle, ArrowRight, Quote, Sparkles, HandHeart, ShieldCheck } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useReports } from '../context/ReportContext';

const Home: React.FC = () => {
  const { config } = useData();
  const { reports, getPerpetrators } = useReports();
  const perpetrators = getPerpetrators();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const features = [
    {
      icon: Lock,
      title: '100% Anonim',
      description: 'Identitas pelapor dijamin kerahasiaannya. Tidak ada yang tahu siapa Anda.',
      color: 'from-violet-500 to-purple-600'
    },
    {
      icon: Scale,
      title: 'Dasar Hukum Kuat',
      description: 'Dilindungi UUD 1945, KUHP, UU Perlindungan Anak, dan UU ITE.',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: Zap,
      title: 'Respon Cepat',
      description: 'Tim guru dan konselor siap menindaklanjuti dalam 24 jam.',
      color: 'from-amber-500 to-orange-600'
    },
    {
      icon: HandHeart,
      title: 'Pendampingan',
      description: 'Korban mendapat dukungan psikologis dan perlindungan penuh.',
      color: 'from-rose-500 to-pink-600'
    }
  ];

  const stats = [
    { label: 'Laporan Masuk', value: reports.length, icon: FileText, color: 'bg-blue-500' },
    { label: 'Sudah Ditangani', value: reports.filter(r => r.status === 'resolved').length, icon: CheckCircle, color: 'bg-emerald-500' },
    { label: 'Dalam Proses', value: reports.filter(r => r.status === 'reviewed').length, icon: Clock, color: 'bg-amber-500' },
    { label: 'Pelaku Terdeteksi', value: perpetrators.length, icon: Eye, color: 'bg-red-500' },
  ];

  const testimonials = [
    {
      quote: "SuaraNASA membantu saya melaporkan perundungan yang saya alami tanpa takut. Sekarang saya merasa lebih aman di sekolah.",
      author: "Siswa Anonim",
      role: "Kelas XI"
    },
    {
      quote: "Platform ini sangat membantu kami para guru untuk mendeteksi dan menangani kasus perundungan lebih cepat.",
      author: "Guru BK",
      role: "SMAN 3 Taruna Angkasa"
    },
    {
      quote: "Dengan adanya SuaraNASA, lingkungan sekolah menjadi lebih kondusif dan aman untuk belajar.",
      author: "Wali Kelas",
      role: "SMAN 3 Taruna Angkasa"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const bullyingTypes = [
    { title: 'Verbal', desc: 'Mengejek, menghina, mengancam', color: 'bg-red-500' },
    { title: 'Fisik', desc: 'Memukul, mendorong, menendang', color: 'bg-orange-500' },
    { title: 'Sosial', desc: 'Mengucilkan, menyebarkan gosip', color: 'bg-purple-500' },
    { title: 'Siber', desc: 'Pelecehan di media sosial', color: 'bg-cyan-500' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900"></div>
          <div className="absolute inset-0 bg-[url('/images/indonesia-students.jpg')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
          
          {/* Animated elements */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full mb-8 border border-white/20">
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span className="text-sm font-semibold text-white">{config.schoolName}</span>
              </div>
              
              <h1 className="text-5xl sm:text-7xl font-black mb-6 leading-tight">
                <span className="text-white">{config.heroTitle}</span>
              </h1>
              <p className="text-2xl sm:text-3xl font-light mb-6 text-cyan-300">
                {config.heroSubtitle}
              </p>
              <p className="text-lg text-white/70 max-w-xl mb-10 leading-relaxed">
                Platform pelaporan perundungan anonim yang dilindungi UUD 1945. Suaramu penting, kerahasiaanmu terjamin 100%.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/lapor"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg rounded-2xl shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 transition-all duration-300"
                >
                  <AlertTriangle className="h-6 w-6 mr-3" />
                  Laporkan Sekarang
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/peraturan"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-md text-white font-bold text-lg rounded-2xl border-2 border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300"
                >
                  <Scale className="h-6 w-6 mr-3" />
                  Dasar Hukum
                </Link>
              </div>
              
              {/* Trust badges */}
              <div className="flex items-center gap-6 mt-12">
                <div className="flex items-center gap-2 text-white/60">
                  <ShieldCheck className="h-5 w-5 text-green-400" />
                  <span className="text-sm">Dilindungi UUD 1945</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <Lock className="h-5 w-5 text-cyan-400" />
                  <span className="text-sm">100% Anonim</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-3xl blur-2xl"></div>
                <img 
                  src="/images/stop-hand.jpg" 
                  alt="Stop Bullying" 
                  className="relative rounded-3xl shadow-2xl border-2 border-white/10"
                />
                
                {/* Floating stats */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute -left-8 top-1/4 bg-white rounded-2xl p-4 shadow-2xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-xl">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-800">{reports.filter(r => r.status === 'resolved').length}</p>
                      <p className="text-slate-500 text-sm">Kasus Ditangani</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                  className="absolute -right-8 bottom-1/4 bg-white rounded-2xl p-4 shadow-2xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-xl">
                      <Shield className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-800">100%</p>
                      <p className="text-slate-500 text-sm">Kerahasiaan</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/60 rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow"
              >
                <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <p className="text-4xl font-black text-slate-800">{stat.value}</p>
                <p className="text-slate-500 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Poster Section */}
      {config.posterUrl && (
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="max-w-5xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-bold mb-4">KAMPANYE</span>
              <h2 className="text-3xl font-bold text-slate-800">Poster Anti-Perundungan</h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-3xl blur-2xl"></div>
              <img src={config.posterUrl} alt="Poster" className="relative w-full rounded-2xl shadow-2xl" />
            </motion.div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-bold mb-4">KEUNGGULAN</span>
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Mengapa Memilih SuaraNASA?</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Platform terpercaya untuk melaporkan perundungan dengan jaminan keamanan dan kerahasiaan
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 h-full relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${feature.color} opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500`}></div>
                  <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="relative text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
                  <p className="relative text-slate-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bullying Types */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1.5 bg-white/10 text-cyan-300 rounded-full text-sm font-bold mb-6">EDUKASI</span>
              <h2 className="text-4xl font-bold mb-6">Kenali Jenis Perundungan</h2>
              <p className="text-white/70 text-lg mb-10 leading-relaxed">
                Perundungan dapat terjadi dalam berbagai bentuk. Kenali tanda-tandanya untuk melindungi diri dan orang lain.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {bullyingTypes.map((type, i) => (
                  <motion.div
                    key={type.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <div className={`${type.color} w-10 h-10 rounded-xl flex items-center justify-center mb-3`}>
                      <AlertTriangle className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="font-bold text-white mb-1">{type.title}</h4>
                    <p className="text-white/60 text-sm">{type.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img src="/images/counselor.jpg" alt="Counselor" className="rounded-3xl shadow-2xl border border-white/10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Legal Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-bold mb-4">PERLINDUNGAN HUKUM</span>
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Dilindungi Hukum Indonesia</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Perundungan adalah tindak pidana yang diatur dalam berbagai undang-undang
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { title: 'UUD 1945', subtitle: 'Pasal 28B, 28G, 28I', desc: 'Jaminan konstitusional perlindungan dari kekerasan dan diskriminasi', color: 'from-amber-500 to-orange-600' },
              { title: 'KUHP', subtitle: 'Pasal 170, 310, 351', desc: 'Sanksi pidana penganiayaan, pengeroyokan, dan pencemaran nama baik', color: 'from-red-500 to-rose-600' },
              { title: 'UU ITE', subtitle: 'Pasal 27A, 27B', desc: 'Perlindungan dari cyberbullying dengan sanksi hingga 6 tahun penjara', color: 'from-cyan-500 to-blue-600' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`bg-gradient-to-br ${item.color} rounded-3xl p-8 text-white h-full relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                  <Scale className="h-12 w-12 mb-6 relative" />
                  <h3 className="text-2xl font-bold mb-1 relative">{item.title}</h3>
                  <p className="text-white/80 text-sm mb-4 relative">{item.subtitle}</p>
                  <p className="text-white/90 relative">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/peraturan"
              className="inline-flex items-center px-8 py-4 bg-slate-800 text-white font-bold rounded-2xl hover:bg-slate-700 transition-colors shadow-xl"
            >
              <BookOpen className="h-5 w-5 mr-2" />
              Lihat Semua Pasal Lengkap
              <ChevronRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 bg-pink-100 text-pink-700 rounded-full text-sm font-bold mb-4">TESTIMONI</span>
            <h2 className="text-4xl font-bold text-slate-800">Apa Kata Mereka?</h2>
          </motion.div>

          <div className="relative">
            <Quote className="absolute -top-4 left-0 h-16 w-16 text-slate-100" />
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-10 text-center relative border border-slate-100"
              >
                <p className="text-2xl text-slate-700 italic mb-8 leading-relaxed">
                  "{testimonials[currentTestimonial].quote}"
                </p>
                <div>
                  <p className="font-bold text-slate-800 text-lg">{testimonials[currentTestimonial].author}</p>
                  <p className="text-slate-500">{testimonials[currentTestimonial].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
            
            <div className="flex justify-center space-x-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`h-2.5 rounded-full transition-all ${i === currentTestimonial ? 'bg-blue-600 w-8' : 'bg-slate-300 w-2.5 hover:bg-slate-400'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-8">
              <AlertTriangle className="h-10 w-10" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Jangan Diam, Laporkan!</h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Setiap laporan adalah langkah menuju sekolah yang lebih aman. Suaramu penting, kerahasiaanmu terjamin 100%.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/lapor"
                className="inline-flex items-center justify-center px-10 py-5 bg-white text-blue-600 font-bold text-lg rounded-2xl shadow-2xl hover:shadow-white/30 hover:scale-105 transition-all duration-300"
              >
                <AlertTriangle className="h-6 w-6 mr-3" />
                Buat Laporan Sekarang
              </Link>
              {config.schoolContact && (
                <a
                  href={`tel:${config.schoolContact}`}
                  className="inline-flex items-center justify-center px-10 py-5 bg-white/10 backdrop-blur-sm text-white font-bold text-lg rounded-2xl border-2 border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <Phone className="h-6 w-6 mr-3" />
                  Hubungi Sekolah
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
