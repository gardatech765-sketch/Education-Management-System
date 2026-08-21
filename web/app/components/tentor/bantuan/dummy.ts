export function genId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

export type KategoriTiket = "Siswa/Orang Tua" | "Pembayaran" | "Jadwal" | "Teknis" | "Lainnya";
export const KATEGORI_TIKET_OPTIONS: KategoriTiket[] = [
  "Siswa/Orang Tua",
  "Pembayaran",
  "Jadwal",
  "Teknis",
  "Lainnya",
];

export type StatusTiket = "Terbuka" | "Diproses" | "Selesai";

export type Tiket = {
  id: string;
  subjek: string;
  kategori: KategoriTiket;
  deskripsi: string;
  status: StatusTiket;
  dibuatPada: string;
};

export const tiketSeed: Tiket[] = [
  {
    id: "tk-1",
    subjek: "Uang bensin kurang sesuai",
    kategori: "Pembayaran",
    deskripsi: "Jarak ke rumah Budi sekitar 12km tapi transport yang tercatat cuma untuk 6km.",
    status: "Diproses",
    dibuatPada: "10 Okt 2026",
  },
  {
    id: "tk-2",
    subjek: "Siswa sering telat datang",
    kategori: "Siswa/Orang Tua",
    deskripsi: "Kelas Bahasa Inggris Group sering mulai 15-20 menit lebih lambat karena siswa telat.",
    status: "Terbuka",
    dibuatPada: "14 Okt 2026",
  },
  {
    id: "tk-3",
    subjek: "Tidak bisa upload foto laporan",
    kategori: "Teknis",
    deskripsi: "Saat submit laporan belajar, foto dokumentasi gagal terupload beberapa kali.",
    status: "Selesai",
    dibuatPada: "2 Okt 2026",
  },
];
