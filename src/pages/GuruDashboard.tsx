import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, AlertTriangle, LogOut, Clock, MapPin, User, FileText, CheckCircle, Eye, XCircle, TrendingUp, RefreshCw, Loader2 } from 'lucide-react';
import { useReports } from '../context/ReportContext';
import { CloudReport } from '../lib/database';

const GuruDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { reports, loading, updateReportStatus, refreshReports, getPerpetrators } = useReports();
  const [selectedReport, setSelectedReport] = useState<CloudReport | null>(null);
  const [activeTab, setActiveTab] = useState<'reports' | 'perpetrators'>('reports');
  const [refreshing, setRefreshing] = useState(false);
  const guruName = sessionStorage.getItem('guru_name') || 'Guru';

  useEffect(() => {
    if (!sessionStorage.getItem('guru_authenticated')) {
      navigate('/guru/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('guru_authenticated');
    sessionStorage.removeItem('guru_name');
    navigate('/');
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshReports();
    setRefreshing(false);
  };

  const perpetrators = getPerpetrators();

  const getStatusColor = (status: CloudReport['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'reviewed': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'resolved': return 'bg-green-100 text-green-700 border-green-200';
    }
  };

  const getStatusLabel = (status: CloudReport['status']) => {
    switch (status) {
      case 'pending': return 'Menunggu';
      case 'reviewed': return 'Ditinjau';
      case 'resolved': return 'Selesai';
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600">Memuat laporan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div>
              <h1 className="text-2xl font-bold">Dashboard Guru</h1>
              <p className="text-white/80">Selamat datang, {guruName}</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`h-5 w-5 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                {refreshing ? 'Memuat...' : 'Refresh'}
              </button>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Keluar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm">Total Laporan</p>
                <p className="text-3xl font-bold text-slate-800">{reports.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-xl">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm">Menunggu</p>
                <p className="text-3xl font-bold text-yellow-600">{reports.filter(r => r.status === 'pending').length}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-xl">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm">Selesai</p>
                <p className="text-3xl font-bold text-green-600">{reports.filter(r => r.status === 'resolved').length}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-xl">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm">Pelaku Terdeteksi</p>
                <p className="text-3xl font-bold text-red-600">{perpetrators.length}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-xl">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'reports'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            <FileText className="h-5 w-5 inline mr-2" />
            Laporan Masuk
          </button>
          <button
            onClick={() => setActiveTab('perpetrators')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'perpetrators'
                ? 'bg-red-600 text-white shadow-lg'
                : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            <AlertTriangle className="h-5 w-5 inline mr-2" />
            Papan Pelaku
          </button>
        </div>

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Reports List */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-800 mb-4">Daftar Laporan ({reports.length})</h2>
              {reports.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                  <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-slate-400" />
                  </div>
                  <p className="text-slate-500">Belum ada laporan masuk</p>
                  <p className="text-slate-400 text-sm mt-2">Laporan baru akan muncul di sini secara otomatis</p>
                </div>
              ) : (
                reports.map((report, index) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedReport(report)}
                    className={`bg-white rounded-xl shadow-md p-5 cursor-pointer transition-all hover:shadow-lg border-2 ${
                      selectedReport?.id === report.id ? 'border-blue-500' : 'border-transparent'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="bg-red-100 p-2 rounded-lg">
                          <User className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">{report.perpetratorName}</p>
                          <p className="text-sm text-slate-500">Kelas {report.perpetratorClass}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(report.status)}`}>
                        {getStatusLabel(report.status)}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 line-clamp-2 mb-3">{report.description}</p>
                    <div className="flex items-center text-xs text-slate-400 space-x-4">
                      <span className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {report.location}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatDate(report.timestamp)}
                      </span>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Report Detail */}
            <div className="lg:sticky lg:top-24">
              {selectedReport ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-2xl shadow-xl p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-slate-800">Detail Laporan</h2>
                    <button
                      onClick={() => setSelectedReport(null)}
                      className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      <XCircle className="h-5 w-5 text-slate-400" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-red-50 rounded-xl p-4">
                      <p className="text-sm text-red-600 font-medium mb-1">Pelaku</p>
                      <p className="text-lg font-bold text-slate-800">{selectedReport.perpetratorName}</p>
                      <p className="text-slate-600">Kelas {selectedReport.perpetratorClass}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 rounded-xl p-4">
                        <p className="text-sm text-slate-500 mb-1">Tempat</p>
                        <p className="font-medium text-slate-800">{selectedReport.location}</p>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-4">
                        <p className="text-sm text-slate-500 mb-1">Waktu</p>
                        <p className="font-medium text-slate-800">{selectedReport.dateTime}</p>
                      </div>
                    </div>

                    <div className="bg-orange-50 rounded-xl p-4">
                      <p className="text-sm text-orange-600 font-medium mb-1">Jenis Perundungan</p>
                      <p className="text-slate-800">{selectedReport.bullyingType}</p>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-4">
                      <p className="text-sm text-slate-500 mb-2">Deskripsi</p>
                      <p className="text-slate-800 whitespace-pre-wrap">{selectedReport.description}</p>
                    </div>

                    {selectedReport.evidence && (
                      <div className="bg-blue-50 rounded-xl p-4">
                        <p className="text-sm text-blue-600 font-medium mb-2">Bukti</p>
                        <p className="text-slate-800">{selectedReport.evidence}</p>
                      </div>
                    )}

                    <div className="border-t pt-4">
                      <p className="text-sm text-slate-500 mb-3">Ubah Status</p>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => updateReportStatus(selectedReport.id, 'pending')}
                          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                            selectedReport.status === 'pending'
                              ? 'bg-yellow-500 text-white'
                              : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                          }`}
                        >
                          Menunggu
                        </button>
                        <button
                          onClick={() => updateReportStatus(selectedReport.id, 'reviewed')}
                          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                            selectedReport.status === 'reviewed'
                              ? 'bg-blue-500 text-white'
                              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                          }`}
                        >
                          Ditinjau
                        </button>
                        <button
                          onClick={() => updateReportStatus(selectedReport.id, 'resolved')}
                          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                            selectedReport.status === 'resolved'
                              ? 'bg-green-500 text-white'
                              : 'bg-green-100 text-green-700 hover:bg-green-200'
                          }`}
                        >
                          Selesai
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Eye className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="text-slate-500">Pilih laporan untuk melihat detail</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Perpetrators Tab */}
        {activeTab === 'perpetrators' && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-orange-500 px-6 py-5">
              <h2 className="text-xl font-bold text-white flex items-center">
                <AlertTriangle className="h-6 w-6 mr-3" />
                Papan Pelaku Perundungan
              </h2>
              <p className="text-white/80 text-sm mt-1">Data berdasarkan laporan yang masuk</p>
            </div>

            {perpetrators.length === 0 ? (
              <div className="p-12 text-center">
                <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-slate-400" />
                </div>
                <p className="text-slate-500">Belum ada pelaku yang terdeteksi</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50 border-b">
                      <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Ranking</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Nama Pelaku</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Kelas</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Jumlah Laporan</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {perpetrators.map((perp, index) => (
                      <tr key={`${perp.name}-${perp.class}`} className="hover:bg-red-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                            index === 0 ? 'bg-red-500 text-white' :
                            index === 1 ? 'bg-orange-500 text-white' :
                            index === 2 ? 'bg-yellow-500 text-white' :
                            'bg-slate-200 text-slate-600'
                          }`}>
                            {index + 1}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-semibold text-slate-800">{perp.name}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                            {perp.class}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-red-600">{perp.count}</span>
                            <span className="text-slate-500 text-sm">kali</span>
                            {perp.count >= 3 && (
                              <TrendingUp className="h-5 w-5 text-red-500" />
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            perp.count >= 5 ? 'bg-red-100 text-red-700' :
                            perp.count >= 3 ? 'bg-orange-100 text-orange-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {perp.count >= 5 ? 'Kritis' : perp.count >= 3 ? 'Peringatan' : 'Tercatat'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GuruDashboard;
