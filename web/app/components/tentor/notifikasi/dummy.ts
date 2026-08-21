export type TipeNotif = "Pengumuman" | "Jadwal" | "Tagihan" | "Sistem";

export type NotifikasiSaya = {
  id: string;
  tipe: TipeNotif;
  judul: string;
  pesan: string;
  waktu: string;
  isRead: boolean;
};

export const notifikasiSayaSeed: NotifikasiSaya[] = [
  { id: "ns-1", tipe: "Pengumuman", judul: "Pengumuman Libur", pesan: "Cabang Utama libur pada 28 Okt 2026 (Hari Sumpah Pemuda).", waktu: "1 jam lalu", isRead: false },
  { id: "ns-2", tipe: "Jadwal", judul: "Reschedule Disetujui", pesan: "Pengajuan Anda untuk kelas Matematika Privat pada 20 Okt 2026 disetujui.", waktu: "3 jam lalu", isRead: false },
  { id: "ns-3", tipe: "Tagihan", judul: "Slip Gaji Tersedia", pesan: "Slip gaji bulan September 2026 sudah tersedia. Silakan download.", waktu: "1 hari lalu", isRead: true },
  { id: "ns-4", tipe: "Sistem", judul: "Perubahan Kurikulum", pesan: "Ada pembaruan modul Kimia SMA kelas 11, silakan cek materi terbaru di grup tentor.", waktu: "2 hari lalu", isRead: true },
  { id: "ns-5", tipe: "Pengumuman", judul: "Promo Referral Tentor", pesan: "Ajak tentor baru bergabung dan dapatkan bonus Rp100.000 per referral yang disetujui.", waktu: "4 hari lalu", isRead: true },
];
