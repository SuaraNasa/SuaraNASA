import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Send, CheckCircle, Shield, Lock, MapPin, Clock, User, MessageSquare, Camera, Info, Loader2, Wifi, Globe } from 'lucide-react';
import { useReports } from '../context/ReportContext';

const Lapor: React.FC = () => {
  const { addReport } = useReports();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    perpetratorName: '',
    perpetratorClass: '',
    location: '',
    incidentTime: '',
    bullyingType: '',
    description: '',
    evidence: ''
  });

  const classes = [
    'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7', 'X8',
    'XI1', 'XI2', 'XI3', 'XI4', 'XI5', 'XI6', 'XI7', 'XI8',
    'XII1', 'XII2', 'XII3', 'XII4', 'XII5', 'XII6', 'XII7', 'XII8'
  ];

  const bullyingTypes = [
    { value: 'Perundungan Verbal', desc: 'Mengejek, menghina, mengancam' },
    { value: 'Perundungan Fisik', desc: 'Memukul, mendorong, menendang' },
    { value: 'Perundungan Sosial', desc: 'Mengucilkan, menyebarkan gosip' },
    { value: 'Perundungan Siber', desc: 'Pelecehan online, media sosial' },
    { value: 'Perundungan Seksual', desc: 'Pelecehan seksual verbal/fisik' },
    { value: 'Pemerasan/Intimidasi', desc: 'Memaksa, mengancam untuk keuntungan' },
    { value: 'Lainnya', desc: 'Jenis perundungan lainnya' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      await addReport({
        perpetratorName: formData.perpetratorName,
        perpetratorClass: formData.perpetratorClass,
        location: formData.location,
        incidentTime: formData.incidentTime,
        bullyingType: formData.bullyingType,
        description: formData.description,
        evidence: formData.evidence || null
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Failed to submit report:', error);
      alert('Gagal mengirim laporan. Silakan coba lagi.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const isStep1Valid = formData.perpetratorName && formData.perpetratorClass;
  const isStep2Valid = formData.location && formData.incidentTime && formData.bullyingType;
  const isStep3Valid = formData.description;

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-12 max-w-lg w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-500/30"
          >
            <CheckCircle className="h-14 w-14 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Laporan Terkirim!</h2>
          <p className="text-slate-600 mb-6 leading-relaxed">
            Terima kasih atas keberanian Anda melaporkan. Laporan Anda <strong>sudah tersimpan di cloud</strong> dan akan segera ditinjau oleh pihak sekolah.
          </p>
          
          <div className="bg-green-50 rounded-2xl p-4 mb-6 border border-green-100">
            <div className="flex items-center justify-center gap-2 text-green-700">
              <Globe className="h-5 w-5" />
              <span className="font-medium">Laporan tersinkronisasi secara global</span>
            </div>
            <p className="text-green-600 text-sm mt-1">Guru dapat melihat laporan dari mana saja</p>
          </div>

          <div className="bg-blue-50 rounded-2xl p-4 mb-8 border border-blue-100">
            <p className="text-blue-700 text-sm">
              <Info className="h-4 w-4 inline mr-2" />
              Identitas Anda 100% anonim dan terlindungi
            </p>
          </div>
          
          <button
            onClick={() => {
              setSubmitted(false);
              setCurrentStep(1);
              setFormData({
                perpetratorName: '',
                perpetratorClass: '',
                location: '',
                incidentTime: '',
                bullyingType: '',
                description: '',
                evidence: ''
              });
            }}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
          >
            Buat Laporan Baru
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl shadow-lg shadow-orange-500/30 mb-6">
            <AlertTriangle className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Laporkan Perundungan</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Laporkan kasus perundungan secara anonim. Identitas Anda dijamin 100% rahasia.
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                    currentStep >= step
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                      : 'bg-white/10 text-white/50'
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 rounded-full transition-all ${currentStep > step ? 'bg-cyan-500' : 'bg-white/10'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Global Sync Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 backdrop-blur-xl rounded-2xl p-6 mb-8 border border-white/10"
        >
          <div className="flex items-start space-x-4">
            <div className="bg-emerald-500 p-3 rounded-xl flex-shrink-0">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white mb-1">Terhubung Secara Global</h3>
              <p className="text-white/70">
                Laporan Anda akan langsung tersimpan di cloud dan dapat diakses oleh guru dari mana saja. Sistem ini memastikan setiap laporan tidak akan hilang.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Anonymous Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-xl rounded-2xl p-6 mb-8 border border-white/10"
        >
          <div className="flex items-start space-x-4">
            <div className="bg-cyan-500 p-3 rounded-xl flex-shrink-0">
              <Lock className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white mb-1">100% Anonim</h3>
              <p className="text-white/70">
                Identitas pelapor tidak akan pernah diketahui. Anda aman untuk melaporkan tanpa takut.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-xl p-8 md:p-10 border border-white/10"
        >
          {/* Step 1: Pelaku */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-red-500 p-2 rounded-lg">
                  <User className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">Informasi Pelaku</h2>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-white/80">
                  Nama Pelaku <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="perpetratorName"
                  value={formData.perpetratorName}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan nama pelaku"
                  className="w-full px-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 transition-all outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-white/80">
                  Kelas Pelaku <span className="text-red-400">*</span>
                </label>
                <select
                  name="perpetratorClass"
                  value={formData.perpetratorClass}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 transition-all outline-none appearance-none"
                >
                  <option value="" className="bg-slate-800">Pilih kelas</option>
                  {classes.map(cls => (
                    <option key={cls} value={cls} className="bg-slate-800">{cls}</option>
                  ))}
                </select>
              </div>
            </motion.div>
          )}

          {/* Step 2: Kejadian */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-orange-500 p-2 rounded-lg">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">Detail Kejadian</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white/80">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    Tempat Kejadian <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    placeholder="Contoh: Kantin, Lapangan, Kelas X1"
                    className="w-full px-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 transition-all outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white/80">
                    <Clock className="h-4 w-4 inline mr-1" />
                    Waktu Kejadian <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    name="incidentTime"
                    value={formData.incidentTime}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 transition-all outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-white/80">
                  Jenis Perundungan <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {bullyingTypes.map(type => (
                    <label
                      key={type.value}
                      className={`flex items-start space-x-3 p-4 rounded-xl border cursor-pointer transition-all ${
                        formData.bullyingType === type.value
                          ? 'bg-cyan-500/20 border-cyan-500'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <input
                        type="radio"
                        name="bullyingType"
                        value={type.value}
                        checked={formData.bullyingType === type.value}
                        onChange={handleChange}
                        className="mt-1"
                      />
                      <div>
                        <p className="font-semibold text-white">{type.value}</p>
                        <p className="text-white/50 text-sm">{type.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Deskripsi */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-purple-500 p-2 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">Kronologi & Bukti</h2>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-white/80">
                  Deskripsi Kejadian <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Ceritakan kronologi kejadian secara detail..."
                  className="w-full px-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 transition-all outline-none resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-white/80">
                  <Camera className="h-4 w-4 inline mr-1" />
                  Bukti (opsional)
                </label>
                <textarea
                  name="evidence"
                  value={formData.evidence}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Link Google Drive, nama saksi, atau keterangan bukti lainnya..."
                  className="w-full px-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 transition-all outline-none resize-none"
                />
              </div>

              {/* Summary */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h3 className="font-semibold text-white mb-3">Ringkasan Laporan</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-white/50">Pelaku</p>
                    <p className="text-white font-medium">{formData.perpetratorName} ({formData.perpetratorClass})</p>
                  </div>
                  <div>
                    <p className="text-white/50">Tempat</p>
                    <p className="text-white font-medium">{formData.location}</p>
                  </div>
                  <div>
                    <p className="text-white/50">Jenis</p>
                    <p className="text-white font-medium">{formData.bullyingType}</p>
                  </div>
                  <div>
                    <p className="text-white/50">Waktu</p>
                    <p className="text-white font-medium">{formData.incidentTime ? new Date(formData.incidentTime).toLocaleString('id-ID') : '-'}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-10">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-colors"
              >
                Kembali
              </button>
            ) : (
              <div></div>
            )}

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={currentStep === 1 ? !isStep1Valid : !isStep2Valid}
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl transition-all"
              >
                Lanjutkan
              </button>
            ) : (
              <button
                type="submit"
                disabled={!isStep3Valid || submitting}
                className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg rounded-xl shadow-lg shadow-green-500/25 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-3" />
                    Kirim Laporan
                  </>
                )}
              </button>
            )}
          </div>

          {/* Privacy Notice */}
          <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-white/50">
                Laporan akan tersimpan secara aman di cloud dan hanya dapat diakses oleh guru yang berwenang. Identitas Anda sepenuhnya anonim.
              </p>
            </div>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default Lapor;
