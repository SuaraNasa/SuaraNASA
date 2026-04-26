export interface Report {
  id: string;
  timestamp: Date;
  perpetratorName: string;
  perpetratorClass: string;
  location: string;
  dateTime: string;
  bullyingType: string;
  description: string;
  evidence?: string;
  status: 'pending' | 'reviewed' | 'resolved';
}

export interface Teacher {
  id: string;
  name: string;
  password: string;
}

export interface Perpetrator {
  name: string;
  class: string;
  count: number;
}

export interface Rule {
  id: string;
  article: string;
  description: string;
  punishment: string;
}

export interface SiteConfig {
  schoolName: string;
  schoolContact: string;
  posterUrl: string;
  logoUrl: string;
  ikrarTaruna: string;
  perduptar: Rule[];
  uudPerundungan: Rule[];
  teachers: Teacher[];
  heroTitle: string;
  heroSubtitle: string;
  footerText: string;
}
