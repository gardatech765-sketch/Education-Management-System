export function genId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

export type TipeNilai = "String" | "Integer" | "Decimal" | "Boolean" | "JSON";
export const TIPE_NILAI_OPTIONS: TipeNilai[] = ["String", "Integer", "Decimal", "Boolean", "JSON"];

export type Pengaturan = {
  id: string;
  kunci: string;
  nilai: string;
  tipe: TipeNilai;
  deskripsi: string;
  updated_at: string; // yyyy-mm-dd
};

export const pengaturanSeed: Pengaturan[] = [
  {
    id: "pg-1",
    kunci: "nama_aplikasi",
    nilai: "Bimbel Privat - Edukom Jaya Abadi",
    tipe: "String",
    deskripsi: "Nama aplikasi yang ditampilkan di seluruh sistem.",
    updated_at: "2025-01-05",
  },
  {
    id: "pg-2",
    kunci: "biaya_platform_persen",
    nilai: "10",
    tipe: "Integer",
    deskripsi: "Persentase potongan platform dari setiap transaksi tagihan.",
    updated_at: "2025-03-12",
  },
  {
    id: "pg-3",
    kunci: "radius_maksimal_km",
    nilai: "15.5",
    tipe: "Decimal",
    deskripsi: "Radius maksimal pencarian tutor dari lokasi siswa (dalam km).",
    updated_at: "2025-02-20",
  },
  {
    id: "pg-4",
    kunci: "mode_maintenance",
    nilai: "false",
    tipe: "Boolean",
    deskripsi: "Aktifkan untuk menutup sementara akses aplikasi ke pengguna non-admin.",
    updated_at: "2025-08-01",
  },
  {
    id: "pg-5",
    kunci: "kontak_admin",
    nilai: '{"whatsapp":"6281234567890","email":"admin@edukomjayaabadi.id"}',
    tipe: "JSON",
    deskripsi: "Kontak admin yang ditampilkan di halaman bantuan aplikasi.",
    updated_at: "2025-06-15",
  },
];