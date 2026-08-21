export type TipeKelas = "Privat" | "Grup";
export type StatusKehadiranAnak = "Hadir" | "Sakit" | "Izin" | "Alpa";
export const STATUS_KEHADIRAN_OPTIONS: StatusKehadiranAnak[] = ["Hadir", "Sakit", "Izin", "Alpa"];

export type SiswaGrup = { id: string; nama: string };

export type EvaluasiAnak = {
  siswaId: string;
  status: StatusKehadiranAnak;
  nilai: string; // opsional, disimpan sebagai string biar bisa kosong
  catatan: string;
};

export type SesiLaporan = {
  id: string;
  tanggal: string;
  kelas: string;
  tipeKelas: TipeKelas;
  siswaList: SiswaGrup[];
  statusLaporan: "Belum Diisi" | "Sudah Diisi";
  materi: string;
  fotoDokumentasi: string;
  evaluasi: EvaluasiAnak[];
};

export const sesiLaporanSeed: SesiLaporan[] = [
  {
    id: "lp-1",
    tanggal: "15 Okt 2026",
    kelas: "Matematika Privat - Andi Saputra",
    tipeKelas: "Privat",
    siswaList: [{ id: "s-1", nama: "Andi Saputra" }],
    statusLaporan: "Belum Diisi",
    materi: "",
    fotoDokumentasi: "",
    evaluasi: [],
  },
  {
    id: "lp-2",
    tanggal: "14 Okt 2026",
    kelas: "Matematika Privat - Andi Saputra",
    tipeKelas: "Privat",
    siswaList: [{ id: "s-1", nama: "Andi Saputra" }],
    statusLaporan: "Sudah Diisi",
    materi: "Persamaan kuadrat dan pemfaktoran.",
    fotoDokumentasi: "dokumentasi-14okt.jpg",
    evaluasi: [{ siswaId: "s-1", status: "Hadir", nilai: "85", catatan: "Sudah mulai paham pemfaktoran, perlu latihan soal cerita." }],
  },
  {
    id: "lp-3",
    tanggal: "13 Okt 2026",
    kelas: "Bahasa Inggris Group - Kelas 10",
    tipeKelas: "Grup",
    siswaList: [
      { id: "s-2", nama: "Maya Sari" },
      { id: "s-3", nama: "Rizky Pratama" },
      { id: "s-4", nama: "Budi Hartono" },
    ],
    statusLaporan: "Sudah Diisi",
    materi: "Simple past tense dan latihan percakapan.",
    fotoDokumentasi: "dokumentasi-13okt.jpg",
    evaluasi: [
      { siswaId: "s-2", status: "Hadir", nilai: "90", catatan: "" },
      { siswaId: "s-3", status: "Hadir", nilai: "78", catatan: "Perlu latihan pronunciation." },
      { siswaId: "s-4", status: "Sakit", nilai: "", catatan: "Izin sakit, sudah dikabari orang tua." },
    ],
  },
  {
    id: "lp-4",
    tanggal: "12 Okt 2026",
    kelas: "Fisika Semi Privat - Kelas 12 IPA",
    tipeKelas: "Grup",
    siswaList: [
      { id: "s-5", nama: "Dewi Kartika" },
      { id: "s-6", nama: "Fajar Nugroho" },
    ],
    statusLaporan: "Sudah Diisi",
    materi: "Hukum Newton dan aplikasinya.",
    fotoDokumentasi: "dokumentasi-12okt.jpg",
    evaluasi: [
      { siswaId: "s-5", status: "Hadir", nilai: "88", catatan: "" },
      { siswaId: "s-6", status: "Hadir", nilai: "72", catatan: "Kurang fokus karena mengantuk." },
    ],
  },
];
