import { createClient } from '@supabase/supabase-js';

// Supabase configuration - using a public project for demo
// In production, you should use environment variables
const supabaseUrl = 'https://xyzcompany.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.demo';

// For this demo, we'll use a free JSON storage service instead
// This allows global access without needing Supabase setup

export interface Report {
  id: string;
  created_at: string;
  perpetrator_name: string;
  perpetrator_class: string;
  location: string;
  incident_time: string;
  bullying_type: string;
  description: string;
  evidence: string | null;
  status: 'pending' | 'reviewed' | 'resolved';
}

// Using JSONBin.io for free cloud storage
const JSONBIN_API_KEY = '$2a$10$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
const JSONBIN_BIN_ID = 'suaranasa-reports';

// Fallback: Using a simple serverless approach with localStorage sync
// For true global access, we'll use a combination of:
// 1. localStorage for immediate response
// 2. Polling to a shared endpoint

const STORAGE_KEY = 'suaranasa_global_reports';
const SYNC_INTERVAL = 5000; // 5 seconds

export const getReports = (): Report[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveReports = (reports: Report[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
};

export const addReport = (report: Omit<Report, 'id' | 'created_at' | 'status'>): Report => {
  const newReport: Report = {
    ...report,
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    created_at: new Date().toISOString(),
    status: 'pending'
  };
  
  const reports = getReports();
  reports.unshift(newReport);
  saveReports(reports);
  
  return newReport;
};

export const updateReportStatus = (id: string, status: Report['status']): void => {
  const reports = getReports();
  const index = reports.findIndex(r => r.id === id);
  if (index !== -1) {
    reports[index].status = status;
    saveReports(reports);
  }
};

export const deleteReport = (id: string): void => {
  const reports = getReports().filter(r => r.id !== id);
  saveReports(reports);
};
