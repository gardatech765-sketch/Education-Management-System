export type SesiPresensiHariIni = {
  id: string;
  waktu: string;
  judul: string;
  peserta: string;
  lokasiModel: "Home Visit" | "Di Cabang";
  lokasiDetail: string;
  radiusMeter: number;
};

export const sesiPresensiHariIni: SesiPresensiHariIni = {
  id: "sp-1",
  waktu: "16:00 - 18:00",
  judul: "Matematika Privat",
  peserta: "Andi Saputra",
  lokasiModel: "Home Visit",
  lokasiDetail: "Jl. Mawar No. 12, Sleman, Yogyakarta",
  radiusMeter: 200,
};

export type PresensiStatus = "Hadir" | "Anomali";

export type RiwayatPresensi = {
  id: string;
  tanggal: string;
  kelas: string;
  checkIn: string;
  checkOut: string;
  jarakMeter: number;
  status: PresensiStatus;
};

export const riwayatPresensiSeed: RiwayatPresensi[] = [
  { id: "rp-1", tanggal: "14 Okt 2026", kelas: "Matematika Privat - Andi Saputra", checkIn: "15:58", checkOut: "18:03", jarakMeter: 42, status: "Hadir" },
  { id: "rp-2", tanggal: "13 Okt 2026", kelas: "Bahasa Inggris Group - Kelas 10", checkIn: "18:55", checkOut: "20:31", jarakMeter: 15, status: "Hadir" },
  { id: "rp-3", tanggal: "12 Okt 2026", kelas: "Fisika Semi Privat - Kelas 12 IPA", checkIn: "09:57", checkOut: "12:02", jarakMeter: 8, status: "Hadir" },
  { id: "rp-4", tanggal: "11 Okt 2026", kelas: "Kimia Grup - Kelas 11", checkIn: "13:12", checkOut: "15:05", jarakMeter: 265, status: "Anomali" },
];
