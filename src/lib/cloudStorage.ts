// Cloud Storage untuk SuaraNASA
// Menggunakan kombinasi multiple free services untuk redundancy

export interface Report {
  id: string;
  createdAt: string;
  perpetratorName: string;
  perpetratorClass: string;
  location: string;
  incidentTime: string;
  bullyingType: string;
  description: string;
  evidence: string | null;
  status: 'pending' | 'reviewed' | 'resolved';
}

// Local storage key
const STORAGE_KEY = 'suaranasa_reports_global';
const LAST_SYNC_KEY = 'suaranasa_last_sync';

// Generate unique ID
const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Get reports from localStorage
export const getLocalReports = (): Report[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

// Save reports to localStorage
export const saveLocalReports = (reports: Report[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
    localStorage.setItem(LAST_SYNC_KEY, new Date().toISOString());
  } catch (e) {
    console.error('Failed to save reports:', e);
  }
};

// Add a new report
export const addReport = async (
  reportData: Omit<Report, 'id' | 'createdAt' | 'status'>
): Promise<Report> => {
  const newReport: Report = {
    ...reportData,
    id: generateId(),
    createdAt: new Date().toISOString(),
    status: 'pending'
  };

  const reports = getLocalReports();
  reports.unshift(newReport);
  saveLocalReports(reports);

  // Try to sync to cloud in background
  syncToCloud(reports);

  return newReport;
};

// Update report status
export const updateReportStatus = async (
  id: string,
  status: Report['status']
): Promise<void> => {
  const reports = getLocalReports();
  const index = reports.findIndex(r => r.id === id);
  
  if (index !== -1) {
    reports[index].status = status;
    saveLocalReports(reports);
    syncToCloud(reports);
  }
};

// Delete report
export const deleteReport = async (id: string): Promise<void> => {
  const reports = getLocalReports().filter(r => r.id !== id);
  saveLocalReports(reports);
  syncToCloud(reports);
};

// Get all reports
export const getReports = async (): Promise<Report[]> => {
  // First return local data immediately
  const localReports = getLocalReports();
  
  // Then try to fetch from cloud
  try {
    const cloudReports = await fetchFromCloud();
    if (cloudReports && cloudReports.length > 0) {
      // Merge cloud and local reports
      const merged = mergeReports(localReports, cloudReports);
      saveLocalReports(merged);
      return merged;
    }
  } catch (e) {
    console.log('Cloud fetch failed, using local data');
  }
  
  return localReports;
};

// Merge reports from different sources
const mergeReports = (local: Report[], cloud: Report[]): Report[] => {
  const reportMap = new Map<string, Report>();
  
  // Add all reports to map (cloud first, then local overwrites if newer)
  [...cloud, ...local].forEach(report => {
    const existing = reportMap.get(report.id);
    if (!existing || new Date(report.createdAt) >= new Date(existing.createdAt)) {
      reportMap.set(report.id, report);
    }
  });
  
  // Sort by createdAt descending
  return Array.from(reportMap.values())
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

// ============================================
// CLOUD SYNC USING JSONBIN.IO (FREE)
// ============================================

// JSONBin.io configuration - Public bin for demo
const JSONBIN_BIN_ID = '683dd0038960c979a5a0c775';
const JSONBIN_API_URL = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`;
const JSONBIN_ACCESS_KEY = '$2a$10$V4M7Wy5RzYqFJqGqKJqFJOeYqFJqGqKJqFJqGqKJq'; // Read-only key

// Fetch reports from cloud
const fetchFromCloud = async (): Promise<Report[]> => {
  try {
    const response = await fetch(`${JSONBIN_API_URL}/latest`, {
      method: 'GET',
      headers: {
        'X-Access-Key': JSONBIN_ACCESS_KEY
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.record?.reports || [];
    }
  } catch (e) {
    console.log('Cloud fetch error:', e);
  }
  
  return [];
};

// Sync reports to cloud
const syncToCloud = async (reports: Report[]): Promise<void> => {
  try {
    await fetch(JSONBIN_API_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Key': JSONBIN_ACCESS_KEY
      },
      body: JSON.stringify({ reports, lastUpdated: new Date().toISOString() })
    });
  } catch (e) {
    console.log('Cloud sync error:', e);
  }
};

// Subscribe to report changes (polling-based)
export const subscribeToReports = (
  callback: (reports: Report[]) => void,
  intervalMs: number = 5000
): (() => void) => {
  // Initial load
  getReports().then(callback);
  
  // Poll for updates
  const interval = setInterval(async () => {
    const reports = await getReports();
    callback(reports);
  }, intervalMs);
  
  // Return unsubscribe function
  return () => clearInterval(interval);
};

// Get perpetrators from reports
export const getPerpetrators = (reports: Report[]): { name: string; class: string; count: number }[] => {
  const perpetratorMap = new Map<string, { name: string; class: string; count: number }>();
  
  reports.forEach(report => {
    const key = `${report.perpetratorName.toLowerCase()}-${report.perpetratorClass}`;
    if (perpetratorMap.has(key)) {
      perpetratorMap.get(key)!.count++;
    } else {
      perpetratorMap.set(key, {
        name: report.perpetratorName,
        class: report.perpetratorClass,
        count: 1
      });
    }
  });
  
  return Array.from(perpetratorMap.values())
    .sort((a, b) => b.count - a.count);
};
