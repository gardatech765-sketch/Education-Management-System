export type AksiLog = "CREATE" | "UPDATE" | "DELETE" | "LOGIN" | "LOGOUT";
export const AKSI_OPTIONS: AksiLog[] = ["CREATE", "UPDATE", "DELETE", "LOGIN", "LOGOUT"];

export type UserRole = "Admin" | "Tutor" | "Orang Tua";

export type AuditLog = {
  id: string;
  user_nama: string;
  user_role: UserRole;
  modul: string;
  aksi: AksiLog;
  payload_lama: Record<string, unknown> | null;
  payload_baru: Record<string, unknown> | null;
  ip_address: string;
  created_at: string; // ISO datetime
};

export const auditLogsSeed: AuditLog[] = [
  {
    id: "al-1",
    user_nama: "Admin",
    user_role: "Admin",
    modul: "Kontrak Les",
    aksi: "UPDATE",
    payload_lama: { status_kontrak: "Aktif" },
    payload_baru: { status_kontrak: "Cuti" },
    ip_address: "182.253.10.21",
    created_at: "2025-08-16T08:12:00",
  },
  {
    id: "al-2",
    user_nama: "Budi Santoso",
    user_role: "Tutor",
    modul: "Autentikasi",
    aksi: "LOGIN",
    payload_lama: null,
    payload_baru: null,
    ip_address: "36.85.12.104",
    created_at: "2025-08-16T07:58:00",
  },
  {
    id: "al-3",
    user_nama: "Admin",
    user_role: "Admin",
    modul: "Mata Pelajaran",
    aksi: "CREATE",
    payload_lama: null,
    payload_baru: { nama_mapel: "TOEFL Preparation", jenjang: "Umum" },
    ip_address: "182.253.10.21",
    created_at: "2025-08-15T16:40:00",
  },
  {
    id: "al-4",
    user_nama: "Admin",
    user_role: "Admin",
    modul: "Pembayaran",
    aksi: "UPDATE",
    payload_lama: { status_validasi: "Pending" },
    payload_baru: { status_validasi: "Approved" },
    ip_address: "182.253.10.21",
    created_at: "2025-08-15T14:22:00",
  },
  {
    id: "al-5",
    user_nama: "Hendra Wijaya",
    user_role: "Orang Tua",
    modul: "Autentikasi",
    aksi: "LOGIN",
    payload_lama: null,
    payload_baru: null,
    ip_address: "114.10.55.230",
    created_at: "2025-08-15T13:05:00",
  },
  {
    id: "al-6",
    user_nama: "Admin",
    user_role: "Admin",
    modul: "Paket Les",
    aksi: "DELETE",
    payload_lama: { nama_paket: "Paket Kelompok 4x", is_active: false },
    payload_baru: null,
    ip_address: "182.253.10.21",
    created_at: "2025-08-14T11:30:00",
  },
  {
    id: "al-7",
    user_nama: "Dewi Lestari",
    user_role: "Tutor",
    modul: "Autentikasi",
    aksi: "LOGOUT",
    payload_lama: null,
    payload_baru: null,
    ip_address: "36.85.12.201",
    created_at: "2025-08-14T18:45:00",
  },
  {
    id: "al-8",
    user_nama: "Admin",
    user_role: "Admin",
    modul: "Gaji Tentor",
    aksi: "UPDATE",
    payload_lama: { status_gaji: "Approved" },
    payload_baru: { status_gaji: "Transferred" },
    ip_address: "182.253.10.21",
    created_at: "2025-08-13T09:15:00",
  },
  {
    id: "al-9",
    user_nama: "Admin",
    user_role: "Admin",
    modul: "Profil Tutor",
    aksi: "UPDATE",
    payload_lama: { status_akun: "Pending" },
    payload_baru: { status_akun: "Approved" },
    ip_address: "182.253.10.21",
    created_at: "2025-08-12T10:02:00",
  },
  {
    id: "al-10",
    user_nama: "Siti Nurhaliza",
    user_role: "Tutor",
    modul: "Autentikasi",
    aksi: "LOGIN",
    payload_lama: null,
    payload_baru: null,
    ip_address: "202.67.40.18",
    created_at: "2025-08-11T15:20:00",
  },
];

export const MODUL_OPTIONS = Array.from(new Set(auditLogsSeed.map((l) => l.modul)));

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