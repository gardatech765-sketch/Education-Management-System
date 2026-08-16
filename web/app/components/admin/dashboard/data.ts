// Dummy data for the admin dashboard UI pass.
// Replace with real fetches (e.g. from the backend API) once wired up.

export const statCards = [
  {
    label: "Total Tutor Aktif",
    value: "128",
    trend: "+12 dari bulan lalu",
    trendUp: true,
    color: "amber" as const,
    sparkline: [40, 55, 48, 62, 58, 70, 65],
  },
  {
    label: "Total Siswa Aktif",
    value: "342",
    trend: "+25 dari bulan lalu",
    trendUp: true,
    color: "blue" as const,
    sparkline: [30, 45, 50, 48, 60, 58, 68],
  },
  {
    label: "Total Cabang",
    value: "8",
    trend: "+1 dari bulan lalu",
    trendUp: true,
    color: "purple" as const,
    sparkline: [20, 25, 22, 30, 28, 35, 32],
  },
  {
    label: "Kelas Hari Ini",
    value: "24",
    trend: "-8 dari kemarin",
    trendUp: false,
    color: "orange" as const,
    sparkline: [60, 55, 65, 50, 45, 40, 35],
  },
];

export const miniStats = [
  {
    label: "Pendapatan Bulan Ini",
    value: "Rp 24.750.000",
    trend: "+18,5% dari bulan lalu",
    trendUp: true,
    icon: "revenue" as const,
  },
  {
    label: "Tunggakan Pembayaran",
    value: "Rp 3.250.000",
    trend: "-5,2% dari bulan lalu",
    trendUp: false,
    icon: "invoice" as const,
  },
  {
    label: "Kehadiran Tutor",
    value: "94,2%",
    trend: "+2,1% dari bulan lalu",
    trendUp: true,
    icon: "attendance" as const,
  },
  {
    label: "Kepuasan Siswa",
    value: "4,8/5",
    trend: "+0,3 dari bulan lalu",
    trendUp: true,
    icon: "rating" as const,
  },
];

export const activityChartData = [
  { date: "9 Mei", kelasTerlaksana: 65, kehadiranTutor: 45, presensiSiswa: 28 },
  { date: "10 Mei", kelasTerlaksana: 72, kehadiranTutor: 58, presensiSiswa: 38 },
  { date: "11 Mei", kelasTerlaksana: 85, kehadiranTutor: 68, presensiSiswa: 42 },
  { date: "12 Mei", kelasTerlaksana: 68, kehadiranTutor: 55, presensiSiswa: 25 },
  { date: "13 Mei", kelasTerlaksana: 70, kehadiranTutor: 58, presensiSiswa: 35 },
  { date: "14 Mei", kelasTerlaksana: 75, kehadiranTutor: 65, presensiSiswa: 38 },
  { date: "15 Mei", kelasTerlaksana: 80, kehadiranTutor: 70, presensiSiswa: 45 },
];

export const classStatusData = [
  { name: "Selesai", value: 15, percent: "62,5%", color: "#22c55e" },
  { name: "Berlangsung", value: 6, percent: "25,0%", color: "#f59e0b" },
  { name: "Dijadwalkan", value: 3, percent: "12,5%", color: "#a1a1aa" },
  { name: "Dibatalkan", value: 0, percent: "0%", color: "#ef4444" },
];

export const totalClassesToday = 24;

export const recentActivity = [
  { text: "Tutor Budi Santoso melakukan presensi", time: "2 menit yang lalu" },
  { text: "Kelas Matematika - SMA selesai", time: "15 menit yang lalu" },
  { text: "Pembayaran #INV-2025-001 berhasil", time: "1 jam yang lalu" },
  { text: "Siswa baru Siti Aisyah didaftarkan", time: "2 jam yang lalu" },
  { text: "Jadwal kelas baru dibuat", time: "3 jam yang lalu" },
];

export type ClassStatus = "Selesai" | "Berlangsung" | "Dijadwalkan" | "Dibatalkan";

export const todayClasses: {
  waktu: string;
  kelas: string;
  tutor: string;
  siswa: number;
  cabang: string;
  status: ClassStatus;
}[] = [
  { waktu: "08:00 - 10:00", kelas: "Matematika SMA", tutor: "Budi Santoso", siswa: 2, cabang: "Jakarta Pusat", status: "Selesai" },
  { waktu: "10:00 - 12:00", kelas: "Fisika SMA", tutor: "Dewi Lestari", siswa: 1, cabang: "Jakarta Selatan", status: "Berlangsung" },
  { waktu: "13:00 - 15:00", kelas: "Kimia SMA", tutor: "Ahmad Rizki", siswa: 2, cabang: "Jakarta Pusat", status: "Dijadwalkan" },
  { waktu: "15:00 - 17:00", kelas: "Bahasa Inggris SMP", tutor: "Siti Nurhaliza", siswa: 3, cabang: "Jakarta Barat", status: "Dijadwalkan" },
  { waktu: "19:00 - 21:00", kelas: "Matematika SMP", tutor: "Budi Santoso", siswa: 2, cabang: "Jakarta Pusat", status: "Dijadwalkan" },
];

export type PaymentStatus = "Lunas" | "Pending" | "Terlambat";

export const recentPayments: {
  invoice: string;
  siswa: string;
  tutor: string;
  jumlah: string;
  status: PaymentStatus;
}[] = [
  { invoice: "INV-2025-001", siswa: "Siti Aisyah", tutor: "Budi Santoso", jumlah: "Rp 1.250.000", status: "Lunas" },
  { invoice: "INV-2025-002", siswa: "Ahmad Wijaya", tutor: "Dewi Lestari", jumlah: "Rp 950.000", status: "Lunas" },
  { invoice: "INV-2025-003", siswa: "Maya Sari", tutor: "Ahmad Rizki", jumlah: "Rp 1.100.000", status: "Pending" },
  { invoice: "INV-2025-004", siswa: "Rizky Pratama", tutor: "Siti Nurhaliza", jumlah: "Rp 850.000", status: "Terlambat" },
  { invoice: "INV-2025-005", siswa: "Dewi Kartika", tutor: "Budi Santoso", jumlah: "Rp 1.200.000", status: "Lunas" },
];

export const quickActions = [
  { label: "Tambah Tutor", icon: "addTutor" as const, href: "/admin/crm/tutor" },
  { label: "Tambah Siswa", icon: "addStudent" as const, href: "/admin/crm/siswa" },
  { label: "Buat Kelas", icon: "createClass" as const, href: "/admin/penjadwalan/sesi-kbm" },
  { label: "Jadwal Kelas", icon: "schedule" as const, href: "/admin/penjadwalan/kalender" },
  { label: "Presensi Manual", icon: "attendanceCheck" as const, href: "/admin/operasional/presensi" },
  { label: "Buat Invoice", icon: "invoiceCreate" as const, href: "/admin/billing/tagihan" },
];