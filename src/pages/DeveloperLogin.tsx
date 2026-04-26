import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Settings, Lock, LogIn, AlertCircle, ArrowLeft, Code } from 'lucide-react';
import { useData } from '../context/DataContext';

const DeveloperLogin: React.FC = () => {
  const navigate = useNavigate();
  const { authenticateDeveloper } = useData();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (authenticateDeveloper(username, password)) {
      sessionStorage.setItem('developer_authenticated', 'true');
      navigate('/developer/dashboard');
    } else {
      setError('Username atau password salah');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Kembali ke Beranda
        </Link>

        <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-slate-700">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-10 text-center">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Code className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Developer Access</h1>
            <p className="text-white/80 mt-2">Akses penuh untuk mengelola website</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-xl flex items-center space-x-3"
              >
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-300">Username</label>
              <div className="relative">
                <Settings className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Masukkan username"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-300">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Masukkan password"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2"
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

export default DeveloperLogin;
