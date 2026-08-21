export function genId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

export type KelasOption = { id: string; label: string };

export const kelasOptions: KelasOption[] = [
  { id: "kl-1", label: "Matematika Privat - Andi Saputra (Senin, 16:00-18:00)" },
  { id: "kl-2", label: "Bahasa Inggris Group - Kelas 10 (Senin, 19:00-20:30)" },
  { id: "kl-3", label: "Fisika Semi Privat - Kelas 12 IPA (Sabtu, 10:00-12:00)" },
  { id: "kl-4", label: "Kimia Grup - Kelas 11 (Minggu, 13:00-15:00)" },
];

export type StatusReschedule = "Menunggu" | "Disetujui" | "Ditolak";

export type PengajuanReschedule = {
  id: string;
  kelasId: string;
  tanggalAsli: string;
  tanggalUsulan: string;
  jamUsulan: string;
  alasan: string;
  status: StatusReschedule;
  diajukanPada: string;
};

export const pengajuanRescheduleSeed: PengajuanReschedule[] = [
  {
    id: "rs-1",
    kelasId: "kl-2",
    tanggalAsli: "18 Okt 2026",
    tanggalUsulan: "20 Okt 2026",
    jamUsulan: "19:00 - 20:30",
    alasan: "Ada keperluan keluarga mendadak.",
    status: "Menunggu",
    diajukanPada: "16 Okt 2026",
  },
  {
    id: "rs-2",
    kelasId: "kl-1",
    tanggalAsli: "6 Okt 2026",
    tanggalUsulan: "7 Okt 2026",
    jamUsulan: "16:00 - 18:00",
    alasan: "Kondisi kurang sehat.",
    status: "Disetujui",
    diajukanPada: "5 Okt 2026",
  },
  {
    id: "rs-3",
    kelasId: "kl-3",
    tanggalAsli: "27 Sep 2026",
    tanggalUsulan: "28 Sep 2026",
    jamUsulan: "10:00 - 12:00",
    alasan: "Bentrok dengan jadwal kelas lain.",
    status: "Ditolak",
    diajukanPada: "25 Sep 2026",
  },
];

export function kelasLabel(id: string): string {
  return kelasOptions.find((k) => k.id === id)?.label ?? "—";
}
