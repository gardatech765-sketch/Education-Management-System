export const statCards = [
  {
    label: "Sesi Selesai Bulan Ini",
    value: "18",
    trend: "+4 dari bulan lalu",
    icon: "sesi" as const,
  },
  {
    label: "Estimasi Pendapatan",
    value: "Rp 4.250.000",
    trend: "Belum dibayar",
    icon: "pendapatan" as const,
  },
  {
    label: "Uang Transport",
    value: "Rp 650.000",
    trend: "Dari 12 sesi",
    icon: "transport" as const,
  },
  {
    label: "Rating Saya",
    value: "4.8 / 5.0",
    trend: "Dari 32 ulasan",
    icon: "rating" as const,
  },
];

export const kelasTerdekat = {
  waktu: "16:00 - 18:00",
  tipeLokasi: "Home Visit" as const,
  namaKelas: "Matematika Privat",
  siswa: "Andi Saputra",
  alamat: "Jl. Mawar No. 12, Sleman, Yogyakarta",
  jarak: "2.3 km dari lokasi Anda",
};

export const todoList = [
  {
    tipe: "urgent" as const,
    judul: "Laporan Belajar Belum Diisi",
    detail: "Matematika Privat - Andi Saputra (15 Okt 2026)",
    tombol: "Isi Laporan",
    href: "/tentor/laporan-belajar",
  },
  {
    tipe: "warning" as const,
    judul: "Pengajuan Reschedule Menunggu",
    detail: "Bahasa Inggris Group (18 Okt 2026)",
    tombol: "Lihat Status",
    href: "/tentor/reschedule",
  },
  {
    tipe: "info" as const,
    judul: "Perbarui Ketersediaan Waktu",
    detail: "Jadwal minggu depan belum diatur",
    tombol: "Atur Sekarang",
    href: "/tentor/ketersediaan",
  },
];

export type JadwalStatus = "Aktif" | "Terjadwal";

export const jadwalHariIni: {
  hariLabel: string | null;
  waktu: string;
  judul: string;
  detail: string;
  lokasi: string;
  status: JadwalStatus;
}[] = [
  {
    hariLabel: null,
    waktu: "16:00 - 18:00",
    judul: "Matematika Privat",
    detail: "Andi Saputra",
    lokasi: "Home Visit",
    status: "Aktif",
  },
  {
    hariLabel: null,
    waktu: "19:00 - 20:30",
    judul: "Bahasa Inggris Group",
    detail: "Kelas 10 - 3 Siswa",
    lokasi: "Cabang Utama - Ruang Einstein",
    status: "Aktif",
  },
  {
    hariLabel: "Sabtu, 18 Okt 2026",
    waktu: "10:00 - 12:00",
    judul: "Fisika Semi Privat",
    detail: "2 Siswa (Kelas 12 IPA)",
    lokasi: "Cabang Utama - Ruang Newton",
    status: "Terjadwal",
  },
  {
    hariLabel: "Minggu, 19 Okt 2026",
    waktu: "13:00 - 15:00",
    judul: "Kimia Grup",
    detail: "Kelas 11 - 4 Siswa",
    lokasi: "Home Visit",
    status: "Terjadwal",
  },
];

export const ringkasanPendapatan = {
  periode: "Oktober 2026",
  totalEstimasi: "Rp 4.250.000",
  honorMengajar: "Rp 3.600.000",
  uangTransport: "Rp 650.000",
  sesiBelumDibayar: 12,
};

export const grafikPendapatanMingguan = [
  { label: "M1", value: 1.2 },
  { label: "M2", value: 1.5 },
  { label: "M3", value: 1.1 },
  { label: "M4", value: 1.8 },
  { label: "M5", value: 2.0 },
];

export const grafikPendapatanBulanan = [
  { label: "Mei", value: 3.8 },
  { label: "Jun", value: 4.1 },
  { label: "Jul", value: 3.6 },
  { label: "Agu", value: 4.4 },
  { label: "Sep", value: 4.0 },
  { label: "Okt", value: 4.25 },
];

export const kelasTerakhir = [
  { tanggal: "14 Okt 2026", kelas: "Matematika Privat - Andi Saputra", lokasi: "Home Visit", durasi: "16:00 - 18:00", status: "Selesai", laporanSelesai: true },
  { tanggal: "13 Okt 2026", kelas: "Bahasa Inggris Group - Kelas 10", lokasi: "Cabang Utama", durasi: "19:00 - 20:30", status: "Selesai", laporanSelesai: true },
  { tanggal: "12 Okt 2026", kelas: "Fisika Semi Privat - Kelas 12 IPA", lokasi: "Cabang Utama", durasi: "10:00 - 12:00", status: "Selesai", laporanSelesai: true },
  { tanggal: "11 Okt 2026", kelas: "Kimia Grup - Kelas 11", lokasi: "Home Visit", durasi: "13:00 - 15:00", status: "Selesai", laporanSelesai: true },
];

export const notifikasiTerbaru = [
  {
    tipe: "pengumuman" as const,
    judul: "Pengumuman Libur",
    pesan: "Cabang Utama libur pada 28 Okt 2026 (Hari Sumpah Pemuda).",
    waktu: "1 jam lalu",
  },
  {
    tipe: "reschedule" as const,
    judul: "Reschedule Disetujui",
    pesan: "Pengajuan Anda untuk kelas Matematika Privat pada 20 Okt 2026 disetujui.",
    waktu: "3 jam lalu",
  },
  {
    tipe: "gaji" as const,
    judul: "Slip Gaji Tersedia",
    pesan: "Slip gaji bulan September 2026 sudah tersedia. Silakan download.",
    waktu: "1 hari lalu",
  },
];