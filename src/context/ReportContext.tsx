import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import {
  Report,
  getReports,
  addReport as addReportToCloud,
  updateReportStatus as updateStatusInCloud,
  deleteReport as deleteReportFromCloud,
  subscribeToReports,
  getPerpetrators as calculatePerpetrators
} from '../lib/cloudStorage';

interface Perpetrator {
  name: string;
  class: string;
  count: number;
}

interface ReportContextType {
  reports: Report[];
  loading: boolean;
  error: string | null;
  addReport: (report: Omit<Report, 'id' | 'createdAt' | 'status'>) => Promise<Report>;
  updateReportStatus: (id: string, status: Report['status']) => Promise<void>;
  deleteReport: (id: string) => Promise<void>;
  refreshReports: () => Promise<void>;
  getPerpetrators: () => Perpetrator[];
}

const ReportContext = createContext<ReportContextType | undefined>(undefined);

export const ReportProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Subscribe to reports on mount
  useEffect(() => {
    setLoading(true);
    
    // Subscribe to report updates (polls every 5 seconds)
    const unsubscribe = subscribeToReports((updatedReports) => {
      setReports(updatedReports);
      setLoading(false);
      setError(null);
    }, 5000);
    
    return () => {
      unsubscribe();
    };
  }, []);

  const refreshReports = useCallback(async () => {
    try {
      setLoading(true);
      const freshReports = await getReports();
      setReports(freshReports);
      setError(null);
    } catch (e) {
      setError('Gagal memuat laporan');
      console.error('Failed to refresh reports:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAddReport = useCallback(async (
    reportData: Omit<Report, 'id' | 'createdAt' | 'status'>
  ): Promise<Report> => {
    try {
      const newReport = await addReportToCloud(reportData);
      setReports(prev => [newReport, ...prev]);
      return newReport;
    } catch (e) {
      console.error('Failed to add report:', e);
      throw e;
    }
  }, []);

  const handleUpdateStatus = useCallback(async (id: string, status: Report['status']) => {
    try {
      await updateStatusInCloud(id, status);
      setReports(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    } catch (e) {
      console.error('Failed to update status:', e);
      throw e;
    }
  }, []);

  const handleDeleteReport = useCallback(async (id: string) => {
    try {
      await deleteReportFromCloud(id);
      setReports(prev => prev.filter(r => r.id !== id));
    } catch (e) {
      console.error('Failed to delete report:', e);
      throw e;
    }
  }, []);

  const getPerpetrators = useCallback((): Perpetrator[] => {
    return calculatePerpetrators(reports);
  }, [reports]);

  return (
    <ReportContext.Provider value={{
      reports,
      loading,
      error,
      addReport: handleAddReport,
      updateReportStatus: handleUpdateStatus,
      deleteReport: handleDeleteReport,
      refreshReports,
      getPerpetrators
    }}>
      {children}
    </ReportContext.Provider>
  );
};

export const useReports = () => {
  const context = useContext(ReportContext);
  if (!context) {
    throw new Error('useReports must be used within ReportProvider');
  }
  return context;
};

// Re-export Report type
export type { Report };
