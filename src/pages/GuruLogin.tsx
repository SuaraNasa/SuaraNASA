import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Lock, LogIn, AlertCircle, ArrowLeft } from 'lucide-react';
import { useData } from '../context/DataContext';

const GuruLogin: React.FC = () => {
  const navigate = useNavigate();
  const { authenticateTeacher } = useData();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (authenticateTeacher(name, password)) {
      sessionStorage.setItem('guru_authenticated', 'true');
      sessionStorage.setItem('guru_name', name);
      navigate('/guru/dashboard');
    } else {
      setError('Nama atau password salah');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center text-slate-600 hover:text-blue-600 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Kembali ke Beranda
        </Link>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-10 text-center">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Portal Guru</h1>
            <p className="text-white/80 mt-2">Masuk untuk melihat laporan siswa</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center space-x-3"
              >
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Nama Guru</label>
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Masukkan nama guru"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Masukkan password"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <LogIn className="h-5 w-5" />
              <span>Masuk</span>
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default GuruLogin;
