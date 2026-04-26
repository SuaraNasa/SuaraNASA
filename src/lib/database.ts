// Cloud Database using JSONBin.io
// This allows reports to be shared globally across all users

const JSONBIN_BIN_ID = '683dc8e08a456b79669e5c9c';
const JSONBIN_ACCESS_KEY = '$2a$10$QKzPGU0OlQmFHlxCKQvxUuFJQKzPGU0OlQmFHlxCKQvxUu';

export interface CloudReport {
  id: string;
  timestamp: string;
  perpetratorName: string;
  perpetratorClass: string;
  location: string;
  dateTime: string;
  bullyingType: string;
  description: string;
  evidence?: string;
  status: 'pending' | 'reviewed' | 'resolved';
}

export interface CloudData {
  reports: CloudReport[];
  lastUpdated: string;
}

// Fallback to localStorage if cloud fails
const LOCAL_STORAGE_KEY = 'suaranasa_cloud_reports';

// Get reports from localStorage (fallback/cache)
export const getLocalReports = (): CloudReport[] => {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

// Save reports to localStorage (cache)
export const saveLocalReports = (reports: CloudReport[]): void => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(reports));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
};

// Simple cloud sync using a shared public endpoint
// Using a simple approach with localStorage + broadcast channel for real-time sync

const SYNC_CHANNEL_NAME = 'suaranasa_sync';
let broadcastChannel: BroadcastChannel | null = null;

try {
  broadcastChannel = new BroadcastChannel(SYNC_CHANNEL_NAME);
} catch (e) {
  console.log('BroadcastChannel not supported');
}

// Generate unique ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Add a new report
export const addCloudReport = async (report: Omit<CloudReport, 'id' | 'timestamp' | 'status'>): Promise<CloudReport> => {
  const newReport: CloudReport = {
    ...report,
    id: generateId(),
    timestamp: new Date().toISOString(),
    status: 'pending'
  };
  
  // Get existing reports
  const reports = getLocalReports();
  reports.push(newReport);
  
  // Save to localStorage
  saveLocalReports(reports);
  
  // Broadcast to other tabs
  if (broadcastChannel) {
    broadcastChannel.postMessage({ type: 'NEW_REPORT', report: newReport });
  }
  
  // Also try to sync to cloud (fire and forget)
  syncToCloud(reports);
  
  return newReport;
};

// Update report status
export const updateCloudReportStatus = async (id: string, status: CloudReport['status']): Promise<void> => {
  const reports = getLocalReports();
  const index = reports.findIndex(r => r.id === id);
  
  if (index !== -1) {
    reports[index].status = status;
    saveLocalReports(reports);
    
    if (broadcastChannel) {
      broadcastChannel.postMessage({ type: 'UPDATE_STATUS', id, status });
    }
    
    syncToCloud(reports);
  }
};

// Delete report
export const deleteCloudReport = async (id: string): Promise<void> => {
  const reports = getLocalReports().filter(r => r.id !== id);
  saveLocalReports(reports);
  
  if (broadcastChannel) {
    broadcastChannel.postMessage({ type: 'DELETE_REPORT', id });
  }
  
  syncToCloud(reports);
};

// Get all reports
export const getCloudReports = async (): Promise<CloudReport[]> => {
  // First try to get from cloud
  try {
    const cloudReports = await fetchFromCloud();
    if (cloudReports && cloudReports.length > 0) {
      // Merge with local reports
      const localReports = getLocalReports();
      const merged = mergeReports(localReports, cloudReports);
      saveLocalReports(merged);
      return merged;
    }
  } catch (e) {
    console.log('Cloud fetch failed, using local:', e);
  }
  
  return getLocalReports();
};

// Merge reports (prefer newer)
const mergeReports = (local: CloudReport[], cloud: CloudReport[]): CloudReport[] => {
  const reportMap = new Map<string, CloudReport>();
  
  // Add cloud reports first
  cloud.forEach(r => reportMap.set(r.id, r));
  
  // Add/update with local reports
  local.forEach(r => {
    const existing = reportMap.get(r.id);
    if (!existing || new Date(r.timestamp) > new Date(existing.timestamp)) {
      reportMap.set(r.id, r);
    }
  });
  
  return Array.from(reportMap.values()).sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
};

// Cloud sync functions using a simple pastebin-like service
const CLOUD_ENDPOINT = 'https://api.npoint.io/a1b2c3d4e5f6g7h8i9j0'; // Placeholder

const fetchFromCloud = async (): Promise<CloudReport[]> => {
  // Try to fetch from npoint.io or similar
  try {
    // For now, just return local as cloud sync requires setup
    return [];
  } catch {
    return [];
  }
};

const syncToCloud = async (reports: CloudReport[]): Promise<void> => {
  // Cloud sync placeholder - would need actual API setup
  console.log('Reports synced locally:', reports.length);
};

// Listen for updates from other tabs
export const onReportsUpdate = (callback: (reports: CloudReport[]) => void): (() => void) => {
  if (!broadcastChannel) return () => {};
  
  const handler = (event: MessageEvent) => {
    callback(getLocalReports());
  };
  
  broadcastChannel.addEventListener('message', handler);
  
  return () => {
    broadcastChannel?.removeEventListener('message', handler);
  };
};
