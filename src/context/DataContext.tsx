import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Report, SiteConfig, Teacher, Perpetrator, Rule } from '../types';

interface DataContextType {
  reports: Report[];
  addReport: (report: Omit<Report, 'id' | 'timestamp' | 'status'>) => void;
  updateReportStatus: (id: string, status: Report['status']) => void;
  deleteReport: (id: string) => void;
  config: SiteConfig;
  updateConfig: (config: Partial<SiteConfig>) => void;
  getPerpetrators: () => Perpetrator[];
  teachers: Teacher[];
  addTeacher: (teacher: Omit<Teacher, 'id'>) => void;
  removeTeacher: (id: string) => void;
  authenticateTeacher: (name: string, password: string) => boolean;
  authenticateDeveloper: (username: string, password: string) => boolean;
}

const defaultConfig: SiteConfig = {
  schoolName: 'SMAN 3 Taruna Angkasa Jawa Timur',
  schoolContact: '',
  posterUrl: '',
  logoUrl: '/images/logo.png',
  ikrarTaruna: '',
  heroTitle: 'SuaraNASA',
  heroSubtitle: 'Sekolah Hierarki Tanpa Perundungan',
  footerText: '© 2024 SuaraNASA - SMAN 3 Taruna Angkasa Jawa Timur',
  perduptar: [],
  uudPerundungan: [
    // ==================== UUD 1945 ====================
    { id: 'uud-1', article: 'UUD 1945 Pasal 28B Ayat (2)', description: 'Setiap anak berhak atas kelangsungan hidup, tumbuh, dan berkembang serta berhak atas perlindungan dari kekerasan dan diskriminasi.', punishment: 'Dasar konstitusional perlindungan anak' },
    { id: 'uud-2', article: 'UUD 1945 Pasal 28G Ayat (1)', description: 'Setiap orang berhak atas perlindungan diri pribadi, keluarga, kehormatan, martabat, dan harta benda yang di bawah kekuasaannya, serta berhak atas rasa aman dan perlindungan dari ancaman ketakutan untuk berbuat atau tidak berbuat sesuatu yang merupakan hak asasi.', punishment: 'Dasar konstitusional hak perlindungan diri' },
    { id: 'uud-3', article: 'UUD 1945 Pasal 28G Ayat (2)', description: 'Setiap orang berhak untuk bebas dari penyiksaan atau perlakuan yang merendahkan derajat martabat manusia dan berhak memperoleh suaka politik dari negara lain.', punishment: 'Dasar konstitusional bebas dari penyiksaan' },
    { id: 'uud-4', article: 'UUD 1945 Pasal 28I Ayat (1)', description: 'Hak untuk hidup, hak untuk tidak disiksa, hak kemerdekaan pikiran dan hati nurani, hak beragama, hak untuk tidak diperbudak, hak untuk diakui sebagai pribadi di hadapan hukum, dan hak untuk tidak dituntut atas dasar hukum yang berlaku surut adalah hak asasi manusia yang tidak dapat dikurangi dalam keadaan apa pun.', punishment: 'Hak asasi yang tidak dapat dikurangi' },
    { id: 'uud-5', article: 'UUD 1945 Pasal 28I Ayat (2)', description: 'Setiap orang berhak bebas dari perlakuan yang bersifat diskriminatif atas dasar apa pun dan berhak mendapatkan perlindungan terhadap perlakuan yang bersifat diskriminatif itu.', punishment: 'Dasar konstitusional anti diskriminasi' },
    { id: 'uud-6', article: 'UUD 1945 Pasal 34 Ayat (1)', description: 'Fakir miskin dan anak-anak yang terlantar dipelihara oleh negara.', punishment: 'Tanggung jawab negara terhadap anak' },
    
    // ==================== UU Perlindungan Anak No. 35 Tahun 2014 ====================
    { id: 'uu-pa-1', article: 'UU No. 35 Tahun 2014 Pasal 76C', description: 'Setiap Orang dilarang menempatkan, membiarkan, melakukan, menyuruh melakukan, atau turut serta melakukan Kekerasan terhadap Anak.', punishment: 'Lihat Pasal 80' },
    { id: 'uu-pa-2', article: 'UU No. 35 Tahun 2014 Pasal 80 Ayat (1)', description: 'Setiap Orang yang melanggar ketentuan sebagaimana dimaksud dalam Pasal 76C, dipidana dengan pidana penjara paling lama 3 (tiga) tahun 6 (enam) bulan dan/atau denda paling banyak Rp72.000.000,00 (tujuh puluh dua juta rupiah).', punishment: 'Penjara maks. 3 tahun 6 bulan dan/atau denda maks. Rp72.000.000' },
    { id: 'uu-pa-3', article: 'UU No. 35 Tahun 2014 Pasal 80 Ayat (2)', description: 'Dalam hal Anak sebagaimana dimaksud pada ayat (1) luka berat, maka pelaku dipidana dengan pidana penjara paling lama 5 (lima) tahun dan/atau denda paling banyak Rp100.000.000,00 (seratus juta rupiah).', punishment: 'Penjara maks. 5 tahun dan/atau denda maks. Rp100.000.000' },
    { id: 'uu-pa-4', article: 'UU No. 35 Tahun 2014 Pasal 80 Ayat (3)', description: 'Dalam hal Anak sebagaimana dimaksud pada ayat (2) mati, maka pelaku dipidana dengan pidana penjara paling lama 15 (lima belas) tahun dan/atau denda paling banyak Rp3.000.000.000,00 (tiga miliar rupiah).', punishment: 'Penjara maks. 15 tahun dan/atau denda maks. Rp3.000.000.000' },
    { id: 'uu-pa-5', article: 'UU No. 35 Tahun 2014 Pasal 80 Ayat (4)', description: 'Pidana ditambah sepertiga dari ketentuan sebagaimana dimaksud pada ayat (1), ayat (2), dan ayat (3) apabila yang melakukan penganiayaan tersebut Orang Tuanya.', punishment: 'Pidana ditambah 1/3 jika pelaku adalah orang tua' },
    
    // ==================== KUHP - Penganiayaan ====================
    { id: 'kuhp-351-1', article: 'KUHP Pasal 351 Ayat (1)', description: 'Penganiayaan diancam dengan pidana penjara paling lama dua tahun delapan bulan atau pidana denda paling banyak empat ribu lima ratus rupiah.', punishment: 'Penjara maks. 2 tahun 8 bulan atau denda' },
    { id: 'kuhp-351-2', article: 'KUHP Pasal 351 Ayat (2)', description: 'Jika perbuatan mengakibatkan luka-luka berat, yang bersalah diancam dengan pidana penjara paling lama lima tahun.', punishment: 'Penjara maks. 5 tahun' },
    { id: 'kuhp-351-3', article: 'KUHP Pasal 351 Ayat (3)', description: 'Jika mengakibatkan mati, diancam dengan pidana penjara paling lama tujuh tahun.', punishment: 'Penjara maks. 7 tahun' },
    { id: 'kuhp-351-4', article: 'KUHP Pasal 351 Ayat (4)', description: 'Dengan penganiayaan disamakan sengaja merusak kesehatan.', punishment: 'Sama dengan ayat (1)' },
    { id: 'kuhp-352-1', article: 'KUHP Pasal 352 Ayat (1)', description: 'Kecuali yang tersebut dalam pasal 353 dan 356, maka penganiayaan yang tidak menimbulkan penyakit atau halangan untuk menjalankan pekerjaan jabatan atau pencarian, diancam, sebagai penganiayaan ringan, dengan pidana penjara paling lama tiga bulan atau pidana denda paling banyak empat ribu lima ratus rupiah.', punishment: 'Penjara maks. 3 bulan atau denda' },
    { id: 'kuhp-353-1', article: 'KUHP Pasal 353 Ayat (1)', description: 'Penganiayaan dengan rencana lebih dahulu, diancam dengan pidana penjara paling lama empat tahun.', punishment: 'Penjara maks. 4 tahun' },
    { id: 'kuhp-353-2', article: 'KUHP Pasal 353 Ayat (2)', description: 'Jika perbuatan itu mengakibatkan luka-luka berat, yang bersalah dikenakan pidana penjara paling lama tujuh tahun.', punishment: 'Penjara maks. 7 tahun' },
    { id: 'kuhp-353-3', article: 'KUHP Pasal 353 Ayat (3)', description: 'Jika perbuatan itu mengakibatkan kematian, yang bersalah diancam dengan pidana penjara paling lama sembilan tahun.', punishment: 'Penjara maks. 9 tahun' },
    
    // ==================== KUHP - Pengeroyokan ====================
    { id: 'kuhp-170-1', article: 'KUHP Pasal 170 Ayat (1)', description: 'Barang siapa dengan terang-terangan dan dengan tenaga bersama menggunakan kekerasan terhadap orang atau barang, diancam dengan pidana penjara paling lama lima tahun enam bulan.', punishment: 'Penjara maks. 5 tahun 6 bulan' },
    { id: 'kuhp-170-2a', article: 'KUHP Pasal 170 Ayat (2) ke-1', description: 'Yang bersalah diancam dengan pidana penjara paling lama tujuh tahun, jika ia dengan sengaja menghancurkan barang atau jika kekerasan yang digunakan mengakibatkan luka-luka.', punishment: 'Penjara maks. 7 tahun' },
    { id: 'kuhp-170-2b', article: 'KUHP Pasal 170 Ayat (2) ke-2', description: 'Yang bersalah diancam dengan pidana penjara paling lama sembilan tahun, jika kekerasan mengakibatkan luka berat.', punishment: 'Penjara maks. 9 tahun' },
    { id: 'kuhp-170-2c', article: 'KUHP Pasal 170 Ayat (2) ke-3', description: 'Yang bersalah diancam dengan pidana penjara paling lama dua belas tahun, jika kekerasan mengakibatkan maut.', punishment: 'Penjara maks. 12 tahun' },
    
    // ==================== KUHP - Pencemaran Nama Baik ====================
    { id: 'kuhp-310-1', article: 'KUHP Pasal 310 Ayat (1)', description: 'Barang siapa sengaja menyerang kehormatan atau nama baik seseorang dengan menuduhkan sesuatu hal, yang maksudnya terang supaya hal itu diketahui umum, diancam karena pencemaran dengan pidana penjara paling lama sembilan bulan atau pidana denda paling banyak empat ribu lima ratus rupiah.', punishment: 'Penjara maks. 9 bulan atau denda' },
    { id: 'kuhp-310-2', article: 'KUHP Pasal 310 Ayat (2)', description: 'Jika hal itu dilakukan dengan tulisan atau gambaran yang disiarkan, dipertunjukkan atau ditempelkan di muka umum, maka diancam karena pencemaran tertulis dengan pidana penjara paling lama satu tahun empat bulan atau pidana denda paling banyak empat ribu lima ratus rupiah.', punishment: 'Penjara maks. 1 tahun 4 bulan atau denda' },
    { id: 'kuhp-311', article: 'KUHP Pasal 311 Ayat (1)', description: 'Jika yang melakukan kejahatan pencemaran atau pencemaran tertulis dibolehkan untuk membuktikan apa yang dituduhkan itu benar, tidak membuktikannya, dan tuduhan dilakukan bertentangan dengan apa yang diketahui, maka dia diancam melakukan fitnah dengan pidana penjara paling lama empat tahun.', punishment: 'Penjara maks. 4 tahun' },
    
    // ==================== KUHP - Perbuatan Tidak Menyenangkan ====================
    { id: 'kuhp-335-1', article: 'KUHP Pasal 335 Ayat (1)', description: 'Diancam dengan pidana penjara paling lama satu tahun atau denda paling banyak empat ribu lima ratus rupiah, barang siapa secara melawan hukum memaksa orang lain supaya melakukan, tidak melakukan atau membiarkan sesuatu, dengan memakai kekerasan, atau dengan memakai ancaman kekerasan, baik terhadap orang itu sendiri maupun orang lain.', punishment: 'Penjara maks. 1 tahun atau denda' },
    { id: 'kuhp-369', article: 'KUHP Pasal 369 Ayat (1)', description: 'Barang siapa dengan maksud untuk menguntungkan diri sendiri atau orang lain secara melawan hukum, dengan ancaman pencemaran baik dengan lisan maupun tulisan, atau dengan ancaman akan membuka rahasia, memaksa seorang supaya memberikan barang sesuatu yang seluruhnya atau sebagian kepunyaan orang itu atau orang lain, atau supaya membuat hutang atau menghapuskan piutang, diancam dengan pidana penjara paling lama empat tahun.', punishment: 'Penjara maks. 4 tahun' },
    
    // ==================== UU ITE ====================
    { id: 'ite-27a', article: 'UU ITE No. 1/2024 Pasal 27A', description: 'Setiap Orang dengan sengaja menyerang kehormatan atau nama baik orang lain dengan cara menuduhkan suatu hal, dengan maksud supaya hal tersebut diketahui umum dalam bentuk Informasi Elektronik dan/atau Dokumen Elektronik yang dilakukan melalui Sistem Elektronik.', punishment: 'Penjara maks. 2 tahun dan/atau denda maks. Rp400.000.000' },
    { id: 'ite-27b1', article: 'UU ITE No. 1/2024 Pasal 27B Ayat (1)', description: 'Setiap Orang dengan sengaja dan tanpa hak mendistribusikan dan/atau mentransmisikan Informasi Elektronik dan/atau Dokumen Elektronik yang berisi ancaman kekerasan atau menakut-nakuti yang ditujukan secara pribadi.', punishment: 'Penjara maks. 4 tahun dan/atau denda maks. Rp750.000.000' },
    { id: 'ite-27b2', article: 'UU ITE No. 1/2024 Pasal 27B Ayat (2)', description: 'Setiap Orang dengan sengaja dan tanpa hak mendistribusikan dan/atau mentransmisikan Informasi Elektronik dan/atau Dokumen Elektronik yang berisi ancaman kekerasan atau menakut-nakuti dengan maksud untuk memaksa orang lain.', punishment: 'Penjara maks. 6 tahun dan/atau denda maks. Rp1.000.000.000' },
    
    // ==================== KUHP Baru (UU No. 1 Tahun 2023) ====================
    { id: 'kuhp-baru-262-1', article: 'KUHP Baru Pasal 262 Ayat (1)', description: 'Setiap Orang yang dengan terang-terangan atau di muka umum dan dengan tenaga bersama melakukan Kekerasan terhadap orang atau Barang, dipidana dengan pidana penjara paling lama 5 (lima) tahun atau pidana denda paling banyak kategori V.', punishment: 'Penjara maks. 5 tahun atau denda kategori V (Rp500 juta)' },
    { id: 'kuhp-baru-262-2', article: 'KUHP Baru Pasal 262 Ayat (2)', description: 'Jika Kekerasan sebagaimana dimaksud pada ayat (1) mengakibatkan hancurnya Barang atau mengakibatkan luka, dipidana dengan pidana penjara paling lama 7 (tujuh) tahun atau pidana denda paling banyak kategori IV.', punishment: 'Penjara maks. 7 tahun atau denda kategori IV' },
    { id: 'kuhp-baru-262-3', article: 'KUHP Baru Pasal 262 Ayat (3)', description: 'Jika Kekerasan sebagaimana dimaksud pada ayat (1) mengakibatkan Luka Berat, dipidana dengan pidana penjara paling lama 9 (sembilan) tahun.', punishment: 'Penjara maks. 9 tahun' },
    { id: 'kuhp-baru-262-4', article: 'KUHP Baru Pasal 262 Ayat (4)', description: 'Jika Kekerasan sebagaimana dimaksud pada ayat (1) mengakibatkan matinya orang, dipidana dengan pidana penjara paling lama 12 (dua belas) tahun.', punishment: 'Penjara maks. 12 tahun' },
    { id: 'kuhp-baru-433', article: 'KUHP Baru Pasal 433', description: 'Setiap Orang yang dengan lisan menyerang kehormatan atau nama baik orang lain dengan cara menuduhkan suatu hal, dengan maksud supaya hal tersebut diketahui umum, dipidana karena pencemaran, dengan pidana penjara paling lama 9 (sembilan) Bulan atau pidana denda paling banyak kategori II.', punishment: 'Penjara maks. 9 bulan atau denda kategori II' },
    { id: 'kuhp-baru-434', article: 'KUHP Baru Pasal 434 Ayat (1)', description: 'Jika Setiap Orang sebagaimana dimaksud dalam Pasal 433 diberi kesempatan membuktikan kebenaran hal yang dituduhkan tetapi tidak dapat membuktikannya, dan tuduhan tersebut bertentangan dengan yang diketahuinya, dipidana karena fitnah, dengan pidana penjara paling lama 3 (tiga) tahun atau pidana denda paling banyak kategori IV.', punishment: 'Penjara maks. 3 tahun atau denda kategori IV' },
    { id: 'kuhp-baru-436', article: 'KUHP Baru Pasal 436', description: 'Setiap Orang yang melakukan penghinaan ringan terhadap orang lain, dipidana dengan pidana penjara paling lama 6 (enam) Bulan atau pidana denda paling banyak kategori II.', punishment: 'Penjara maks. 6 bulan atau denda kategori II' },
  ],
  teachers: [
    { id: '1', name: 'rifqi adliansyah', password: 'rifqi adliansyah' }
  ]
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [reports, setReports] = useState<Report[]>(() => {
    const saved = localStorage.getItem('suaranasa_reports');
    return saved ? JSON.parse(saved) : [];
  });

  const [config, setConfig] = useState<SiteConfig>(() => {
    const saved = localStorage.getItem('suaranasa_config');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Always use default UUD to ensure latest data
      return { ...defaultConfig, ...parsed, uudPerundungan: defaultConfig.uudPerundungan };
    }
    return defaultConfig;
  });

  useEffect(() => {
    localStorage.setItem('suaranasa_reports', JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem('suaranasa_config', JSON.stringify(config));
  }, [config]);

  const addReport = (report: Omit<Report, 'id' | 'timestamp' | 'status'>) => {
    const newReport: Report = {
      ...report,
      id: Date.now().toString(),
      timestamp: new Date(),
      status: 'pending'
    };
    setReports(prev => [...prev, newReport]);
  };

  const updateReportStatus = (id: string, status: Report['status']) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const deleteReport = (id: string) => {
    setReports(prev => prev.filter(r => r.id !== id));
  };

  const updateConfig = (newConfig: Partial<SiteConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  };

  const getPerpetrators = (): Perpetrator[] => {
    const perpetratorMap = new Map<string, Perpetrator>();
    reports.forEach(report => {
      const key = `${report.perpetratorName.toLowerCase()}-${report.perpetratorClass}`;
      if (perpetratorMap.has(key)) {
        const existing = perpetratorMap.get(key)!;
        existing.count++;
      } else {
        perpetratorMap.set(key, {
          name: report.perpetratorName,
          class: report.perpetratorClass,
          count: 1
        });
      }
    });
    return Array.from(perpetratorMap.values()).sort((a, b) => b.count - a.count);
  };

  const addTeacher = (teacher: Omit<Teacher, 'id'>) => {
    const newTeacher: Teacher = { ...teacher, id: Date.now().toString() };
    setConfig(prev => ({
      ...prev,
      teachers: [...prev.teachers, newTeacher]
    }));
  };

  const removeTeacher = (id: string) => {
    setConfig(prev => ({
      ...prev,
      teachers: prev.teachers.filter(t => t.id !== id)
    }));
  };

  const authenticateTeacher = (name: string, password: string): boolean => {
    return config.teachers.some(t => 
      t.name.toLowerCase() === name.toLowerCase() && t.password === password
    );
  };

  const authenticateDeveloper = (username: string, password: string): boolean => {
    return username === 'rifqi' && password === 'rifqi';
  };

  return (
    <DataContext.Provider value={{
      reports,
      addReport,
      updateReportStatus,
      deleteReport,
      config,
      updateConfig,
      getPerpetrators,
      teachers: config.teachers,
      addTeacher,
      removeTeacher,
      authenticateTeacher,
      authenticateDeveloper
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
};
