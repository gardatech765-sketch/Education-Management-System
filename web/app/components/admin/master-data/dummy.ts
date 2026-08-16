export type Jenjang = "Pra-Sekolah" | "SD" | "SMP" | "SMA" | "Umum";

export const JENJANG_OPTIONS: Jenjang[] = ["Pra-Sekolah", "SD", "SMP", "SMA", "Umum"];

export type MataPelajaran = {
  id: string;
  nama_mapel: string;
  jenjang: Jenjang;
  deskripsi: string;
  is_active: boolean;
};

export const mataPelajaranSeed: MataPelajaran[] = [
  { id: "mp-1", nama_mapel: "Matematika", jenjang: "SMA", deskripsi: "Aljabar, kalkulus, dan geometri untuk jenjang SMA.", is_active: true },
  { id: "mp-2", nama_mapel: "Fisika", jenjang: "SMA", deskripsi: "Mekanika, listrik, dan gelombang.", is_active: true },
  { id: "mp-3", nama_mapel: "Kimia", jenjang: "SMA", deskripsi: "Kimia dasar hingga reaksi organik.", is_active: true },
  { id: "mp-4", nama_mapel: "Bahasa Inggris", jenjang: "SMP", deskripsi: "Grammar, speaking, dan reading comprehension.", is_active: true },
  { id: "mp-5", nama_mapel: "Matematika", jenjang: "SMP", deskripsi: "Aljabar dasar dan bangun ruang.", is_active: true },
  { id: "mp-6", nama_mapel: "Calistung", jenjang: "SD", deskripsi: "Baca, tulis, dan berhitung dasar.", is_active: true },
  { id: "mp-7", nama_mapel: "Bahasa Indonesia", jenjang: "SD", deskripsi: "Membaca pemahaman dan menulis.", is_active: false },
  { id: "mp-8", nama_mapel: "Persiapan Calistung", jenjang: "Pra-Sekolah", deskripsi: "Pengenalan huruf dan angka.", is_active: true },
  { id: "mp-9", nama_mapel: "TOEFL Preparation", jenjang: "Umum", deskripsi: "Persiapan tes TOEFL untuk umum.", is_active: true },
];

export type PaketLes = {
  id: string;
  nama_paket: string;
  deskripsi: string;
  harga_dasar_ortu: number;
  harga_dasar_tentor: number;
  durasi_menit: number;
  minimal_sesi: number;
  is_active: boolean;
};

export const paketLesSeed: PaketLes[] = [
  { id: "pk-1", nama_paket: "Paket Reguler 4x", deskripsi: "4 sesi per bulan, 1 mata pelajaran.", harga_dasar_ortu: 800000, harga_dasar_tentor: 480000, durasi_menit: 90, minimal_sesi: 4, is_active: true },
  { id: "pk-2", nama_paket: "Paket Intensif 8x", deskripsi: "8 sesi per bulan, cocok untuk persiapan ujian.", harga_dasar_ortu: 1500000, harga_dasar_tentor: 900000, durasi_menit: 90, minimal_sesi: 8, is_active: true },
  { id: "pk-3", nama_paket: "Paket Privat 1 Sesi", deskripsi: "Sesi tunggal tanpa komitmen bulanan.", harga_dasar_ortu: 250000, harga_dasar_tentor: 150000, durasi_menit: 60, minimal_sesi: 1, is_active: true },
  { id: "pk-4", nama_paket: "Paket Kelompok 4x", deskripsi: "4 sesi per bulan untuk maksimal 3 siswa.", harga_dasar_ortu: 600000, harga_dasar_tentor: 360000, durasi_menit: 90, minimal_sesi: 4, is_active: false },
];

export type TingkatKeahlian = "Basic" | "Intermediate" | "Expert";

export const TINGKAT_KEAHLIAN_OPTIONS: TingkatKeahlian[] = ["Basic", "Intermediate", "Expert"];

export type TentorOption = { id: string; nama: string };

export const tentorOptions: TentorOption[] = [
  { id: "t-1", nama: "Budi Santoso" },
  { id: "t-2", nama: "Dewi Lestari" },
  { id: "t-3", nama: "Ahmad Rizki" },
  { id: "t-4", nama: "Siti Nurhaliza" },
  { id: "t-5", nama: "Rina Marlina" },
];

export type TentorMapel = {
  id: string;
  tentor_id: string;
  mapel_id: string;
  tingkat_keahlian: TingkatKeahlian | null;
  is_active: boolean;
};

export const tentorMapelSeed: TentorMapel[] = [
  { id: "tm-1", tentor_id: "t-1", mapel_id: "mp-1", tingkat_keahlian: "Expert", is_active: true },
  { id: "tm-2", tentor_id: "t-1", mapel_id: "mp-5", tingkat_keahlian: "Expert", is_active: true },
  { id: "tm-3", tentor_id: "t-2", mapel_id: "mp-2", tingkat_keahlian: "Intermediate", is_active: true },
  { id: "tm-4", tentor_id: "t-3", mapel_id: "mp-3", tingkat_keahlian: "Expert", is_active: true },
  { id: "tm-5", tentor_id: "t-4", mapel_id: "mp-4", tingkat_keahlian: "Basic", is_active: true },
  { id: "tm-6", tentor_id: "t-5", mapel_id: "mp-9", tingkat_keahlian: null, is_active: false },
];

export function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(
    value
  );
}

export function genId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}