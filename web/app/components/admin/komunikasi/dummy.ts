import { usersSeed } from "@/components/admin/pengguna/dummy";

export function genId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

export { usersSeed };

export type TipeNotif = "Jadwal" | "Tagihan" | "Sistem" | "Lainnya";
export const TIPE_NOTIF_OPTIONS: TipeNotif[] = ["Jadwal", "Tagihan", "Sistem", "Lainnya"];

export type Notifikasi = {
  id: string;
  user_id: string;
  judul: string;
  pesan: string;
  tipe_notif: TipeNotif;
  data_referensi: string; // raw JSON text, optional
  is_read: boolean;
  created_at: string; // ISO datetime
};

export const notifikasiSeed: Notifikasi[] = [
  {
    id: "nt-1",
    user_id: "us-3",
    judul: "Jadwal Sesi Besok",
    pesan: "Anda memiliki sesi Matematika SMA bersama Siti Aisyah besok pukul 15:00.",
    tipe_notif: "Jadwal",
    data_referensi: '{"sesi_id":"sk-2"}',
    is_read: false,
    created_at: "2025-08-17T18:00:00",
  },
  {
    id: "nt-2",
    user_id: "us-6",
    judul: "Tagihan Baru Diterbitkan",
    pesan: "Invoice INV-2025-005 untuk periode Juli 2025 telah diterbitkan.",
    tipe_notif: "Tagihan",
    data_referensi: '{"tagihan_id":"tg-5"}',
    is_read: true,
    created_at: "2025-08-15T09:00:00",
  },
  {
    id: "nt-3",
    user_id: "us-4",
    judul: "Sesi Direschedule",
    pesan: "Sesi Fisika SMA tanggal 9 Agustus dipindahkan ke 16 Agustus karena siswa sakit.",
    tipe_notif: "Jadwal",
    data_referensi: '{"sesi_id":"sk-5"}',
    is_read: true,
    created_at: "2025-08-09T10:30:00",
  },
  {
    id: "nt-4",
    user_id: "us-1",
    judul: "Pemeliharaan Sistem",
    pesan: "Sistem akan menjalani pemeliharaan pada Minggu, 24 Agustus pukul 00:00-02:00 WIB.",
    tipe_notif: "Sistem",
    data_referensi: "",
    is_read: false,
    created_at: "2025-08-18T08:00:00",
  },
  {
    id: "nt-5",
    user_id: "us-5",
    judul: "Akun Anda Disetujui",
    pesan: "Selamat! Akun tutor Anda telah disetujui oleh admin dan siap digunakan.",
    tipe_notif: "Sistem",
    data_referensi: "",
    is_read: false,
    created_at: "2025-08-12T10:05:00",
  },
];

export function userEmail(id: string): string {
  return usersSeed.find((u) => u.id === id)?.email ?? "—";
}

export function formatDateTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}