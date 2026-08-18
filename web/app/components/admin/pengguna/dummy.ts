export function genId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

/* ---------------- Roles ---------------- */

export type Role = {
  id: string;
  nama_role: string;
  deskripsi: string;
  is_active: boolean;
};

export const rolesSeed: Role[] = [
  { id: "rl-1", nama_role: "Super Admin", deskripsi: "Akses penuh ke seluruh sistem termasuk pengaturan.", is_active: true },
  { id: "rl-2", nama_role: "Admin", deskripsi: "Mengelola operasional harian (data, jadwal, billing).", is_active: true },
  { id: "rl-3", nama_role: "Tutor", deskripsi: "Akses aplikasi tutor: jadwal, presensi, laporan belajar.", is_active: true },
  { id: "rl-4", nama_role: "Orang Tua", deskripsi: "Akses aplikasi orang tua: tagihan, laporan anak.", is_active: true },
];

/* ---------------- Users ---------------- */

export type User = {
  id: string;
  email: string;
  role_id: string;
  is_verified: boolean;
  is_active: boolean;
  last_login: string | null; // ISO datetime
  created_at: string; // yyyy-mm-dd
};

export const usersSeed: User[] = [
  { id: "us-1", email: "admin@edukomjayaabadi.id", role_id: "rl-1", is_verified: true, is_active: true, last_login: "2025-08-18T08:05:00", created_at: "2024-01-01" },
  { id: "us-2", email: "operasional@edukomjayaabadi.id", role_id: "rl-2", is_verified: true, is_active: true, last_login: "2025-08-17T09:20:00", created_at: "2024-03-12" },
  { id: "us-3", email: "budi.santoso@gmail.com", role_id: "rl-3", is_verified: true, is_active: true, last_login: "2025-08-16T07:58:00", created_at: "2024-01-15" },
  { id: "us-4", email: "dewi.lestari@gmail.com", role_id: "rl-3", is_verified: true, is_active: true, last_login: "2025-08-14T18:45:00", created_at: "2024-02-20" },
  { id: "us-5", email: "siti.nurhaliza@gmail.com", role_id: "rl-3", is_verified: false, is_active: true, last_login: null, created_at: "2025-04-10" },
  { id: "us-6", email: "hendra.wijaya@gmail.com", role_id: "rl-4", is_verified: true, is_active: true, last_login: "2025-08-15T13:05:00", created_at: "2024-05-01" },
  { id: "us-7", email: "rina.marlina@gmail.com", role_id: "rl-3", is_verified: true, is_active: false, last_login: "2025-06-01T10:00:00", created_at: "2023-11-01" },
];

export function roleName(id: string): string {
  return rolesSeed.find((r) => r.id === id)?.nama_role ?? "—";
}

export function formatDateTime(iso: string | null): string {
  if (!iso) return "Belum pernah login";
  const d = new Date(iso);
  return d.toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}