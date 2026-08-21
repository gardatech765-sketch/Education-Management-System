export type LokasiModel = "Home Visit" | "Di Cabang";
export type TipeKelas = "Privat" | "Grup";
export type StatusSesi = "Terjadwal" | "Selesai" | "Dibatalkan";

export type KelasAktif = {
  id: string;
  tipeKelas: TipeKelas;
  namaKelas: string;
  peserta: string;
  jumlahSiswa: number;
  lokasiModel: LokasiModel;
  lokasiDetail: string;
  hariRutin: string;
  jam: string;
};

export const kelasAktifSeed: KelasAktif[] = [
  {
    id: "ka-1",
    tipeKelas: "Privat",
    namaKelas: "Matematika Privat",
    peserta: "Andi Saputra",
    jumlahSiswa: 1,
    lokasiModel: "Home Visit",
    lokasiDetail: "Jl. Mawar No. 12, Sleman, Yogyakarta",
    hariRutin: "Senin",
    jam: "16:00 - 18:00",
  },
  {
    id: "ka-2",
    tipeKelas: "Grup",
    namaKelas: "Bahasa Inggris Group",
    peserta: "Kelas 10",
    jumlahSiswa: 3,
    lokasiModel: "Di Cabang",
    lokasiDetail: "Cabang Utama - Ruang Einstein",
    hariRutin: "Senin",
    jam: "19:00 - 20:30",
  },
  {
    id: "ka-3",
    tipeKelas: "Grup",
    namaKelas: "Fisika Semi Privat",
    peserta: "Kelas 12 IPA",
    jumlahSiswa: 2,
    lokasiModel: "Di Cabang",
    lokasiDetail: "Cabang Utama - Ruang Newton",
    hariRutin: "Sabtu",
    jam: "10:00 - 12:00",
  },
  {
    id: "ka-4",
    tipeKelas: "Grup",
    namaKelas: "Kimia Grup",
    peserta: "Kelas 11",
    jumlahSiswa: 4,
    lokasiModel: "Home Visit",
    lokasiDetail: "Jl. Kaliurang KM 8, Sleman, Yogyakarta",
    hariRutin: "Minggu",
    jam: "13:00 - 15:00",
  },
];

export type SesiKalender = {
  id: string;
  tanggal: string; // yyyy-mm-dd
  waktu: string;
  judul: string;
  peserta: string;
  lokasiModel: LokasiModel;
  lokasiDetail: string;
  status: StatusSesi;
};

export const sesiKalenderSeed: SesiKalender[] = [
  { id: "sk-1", tanggal: "2026-10-05", waktu: "16:00 - 18:00", judul: "Matematika Privat", peserta: "Andi Saputra", lokasiModel: "Home Visit", lokasiDetail: "Jl. Mawar No. 12, Sleman, Yogyakarta", status: "Selesai" },
  { id: "sk-2", tanggal: "2026-10-05", waktu: "19:00 - 20:30", judul: "Bahasa Inggris Group", peserta: "Kelas 10 - 3 Siswa", lokasiModel: "Di Cabang", lokasiDetail: "Cabang Utama - Ruang Einstein", status: "Selesai" },
  { id: "sk-3", tanggal: "2026-10-10", waktu: "10:00 - 12:00", judul: "Fisika Semi Privat", peserta: "2 Siswa (Kelas 12 IPA)", lokasiModel: "Di Cabang", lokasiDetail: "Cabang Utama - Ruang Newton", status: "Selesai" },
  { id: "sk-4", tanggal: "2026-10-12", waktu: "16:00 - 18:00", judul: "Matematika Privat", peserta: "Andi Saputra", lokasiModel: "Home Visit", lokasiDetail: "Jl. Mawar No. 12, Sleman, Yogyakarta", status: "Selesai" },
  { id: "sk-5", tanggal: "2026-10-13", waktu: "19:00 - 20:30", judul: "Bahasa Inggris Group", peserta: "Kelas 10 - 3 Siswa", lokasiModel: "Di Cabang", lokasiDetail: "Cabang Utama - Ruang Einstein", status: "Selesai" },
  { id: "sk-6", tanggal: "2026-10-14", waktu: "16:00 - 18:00", judul: "Matematika Privat", peserta: "Andi Saputra", lokasiModel: "Home Visit", lokasiDetail: "Jl. Mawar No. 12, Sleman, Yogyakarta", status: "Selesai" },
  { id: "sk-7", tanggal: "2026-10-17", waktu: "16:00 - 18:00", judul: "Matematika Privat", peserta: "Andi Saputra", lokasiModel: "Home Visit", lokasiDetail: "Jl. Mawar No. 12, Sleman, Yogyakarta", status: "Terjadwal" },
  { id: "sk-8", tanggal: "2026-10-17", waktu: "19:00 - 20:30", judul: "Bahasa Inggris Group", peserta: "Kelas 10 - 3 Siswa", lokasiModel: "Di Cabang", lokasiDetail: "Cabang Utama - Ruang Einstein", status: "Terjadwal" },
  { id: "sk-9", tanggal: "2026-10-18", waktu: "10:00 - 12:00", judul: "Fisika Semi Privat", peserta: "2 Siswa (Kelas 12 IPA)", lokasiModel: "Di Cabang", lokasiDetail: "Cabang Utama - Ruang Newton", status: "Terjadwal" },
  { id: "sk-10", tanggal: "2026-10-19", waktu: "13:00 - 15:00", judul: "Kimia Grup", peserta: "Kelas 11 - 4 Siswa", lokasiModel: "Home Visit", lokasiDetail: "Jl. Kaliurang KM 8, Sleman, Yogyakarta", status: "Terjadwal" },
  { id: "sk-11", tanggal: "2026-10-24", waktu: "16:00 - 18:00", judul: "Matematika Privat", peserta: "Andi Saputra", lokasiModel: "Home Visit", lokasiDetail: "Jl. Mawar No. 12, Sleman, Yogyakarta", status: "Terjadwal" },
  { id: "sk-12", tanggal: "2026-10-26", waktu: "13:00 - 15:00", judul: "Kimia Grup", peserta: "Kelas 11 - 4 Siswa", lokasiModel: "Home Visit", lokasiDetail: "Jl. Kaliurang KM 8, Sleman, Yogyakarta", status: "Dibatalkan" },
];

export function sesiPadaTanggal(tanggal: string): SesiKalender[] {
  return sesiKalenderSeed.filter((s) => s.tanggal === tanggal);
}
