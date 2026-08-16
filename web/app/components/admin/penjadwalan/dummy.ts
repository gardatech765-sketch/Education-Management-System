import { profilSiswaSeed, profilTentorSeed } from "@/components/admin/crm/dummy";
import { mataPelajaranSeed, paketLesSeed } from "@/components/admin/master-data/dummy";

export type Hari = "Senin" | "Selasa" | "Rabu" | "Kamis" | "Jumat" | "Sabtu" | "Minggu";
export const HARI_OPTIONS: Hari[] = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

export function genId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

export function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(
    value
  );
}

export function tentorName(id: string): string {
  return profilTentorSeed.find((t) => t.id === id)?.nama_lengkap ?? "—";
}

export function siswaName(id: string): string {
  return profilSiswaSeed.find((s) => s.id === id)?.nama_siswa ?? "—";
}

export function mapelName(id: string): string {
  const m = mataPelajaranSeed.find((m) => m.id === id);
  return m ? `${m.nama_mapel} (${m.jenjang})` : "—";
}

export function paketName(id: string): string {
  return paketLesSeed.find((p) => p.id === id)?.nama_paket ?? "—";
}

export { profilSiswaSeed, profilTentorSeed, mataPelajaranSeed, paketLesSeed };

/* ---------------- Ketersediaan Tentor ---------------- */

export type KetersediaanTentor = {
  id: string;
  tentor_id: string;
  hari: Hari;
  jam_mulai: string; // HH:mm
  jam_selesai: string; // HH:mm
  is_active: boolean;
};

export const ketersediaanSeed: KetersediaanTentor[] = [
  { id: "kt-1", tentor_id: "pt-1", hari: "Senin", jam_mulai: "15:00", jam_selesai: "20:00", is_active: true },
  { id: "kt-2", tentor_id: "pt-1", hari: "Rabu", jam_mulai: "15:00", jam_selesai: "20:00", is_active: true },
  { id: "kt-3", tentor_id: "pt-2", hari: "Selasa", jam_mulai: "13:00", jam_selesai: "18:00", is_active: true },
  { id: "kt-4", tentor_id: "pt-3", hari: "Kamis", jam_mulai: "16:00", jam_selesai: "21:00", is_active: true },
  { id: "kt-5", tentor_id: "pt-4", hari: "Sabtu", jam_mulai: "09:00", jam_selesai: "15:00", is_active: true },
  { id: "kt-6", tentor_id: "pt-5", hari: "Minggu", jam_mulai: "09:00", jam_selesai: "12:00", is_active: false },
];

/* ---------------- Kontrak Les ---------------- */

export type StatusKontrak = "Aktif" | "Cuti" | "Selesai" | "Dibatalkan";
export const STATUS_KONTRAK_OPTIONS: StatusKontrak[] = ["Aktif", "Cuti", "Selesai", "Dibatalkan"];

export type KontrakLes = {
  id: string;
  siswa_id: string;
  tentor_id: string;
  mapel_id: string;
  paket_id: string;
  hari_rutin: Hari;
  jam_mulai: string;
  jam_selesai: string;
  jarak_km: number;
  biaya_sesi_ortu: number;
  honor_sesi_tentor: number;
  biaya_transport: number;
  catatan: string;
  status_kontrak: StatusKontrak;
  tanggal_mulai: string;
  tanggal_selesai: string | null;
};

export const kontrakLesSeed: KontrakLes[] = [
  {
    id: "kl-1",
    siswa_id: "ps-1",
    tentor_id: "pt-1",
    mapel_id: "mp-1",
    paket_id: "pk-1",
    hari_rutin: "Senin",
    jam_mulai: "15:00",
    jam_selesai: "16:30",
    jarak_km: 4.2,
    biaya_sesi_ortu: 200000,
    honor_sesi_tentor: 120000,
    biaya_transport: 20000,
    catatan: "Fokus persiapan ulangan harian.",
    status_kontrak: "Aktif",
    tanggal_mulai: "2025-01-10",
    tanggal_selesai: null,
  },
  {
    id: "kl-2",
    siswa_id: "ps-2",
    tentor_id: "pt-2",
    mapel_id: "mp-2",
    paket_id: "pk-2",
    hari_rutin: "Selasa",
    jam_mulai: "13:00",
    jam_selesai: "14:30",
    jarak_km: 6.5,
    biaya_sesi_ortu: 187500,
    honor_sesi_tentor: 112500,
    biaya_transport: 25000,
    catatan: "",
    status_kontrak: "Aktif",
    tanggal_mulai: "2025-02-01",
    tanggal_selesai: null,
  },
  {
    id: "kl-3",
    siswa_id: "ps-3",
    tentor_id: "pt-3",
    mapel_id: "mp-3",
    paket_id: "pk-3",
    hari_rutin: "Kamis",
    jam_mulai: "16:00",
    jam_selesai: "17:00",
    jarak_km: 3.1,
    biaya_sesi_ortu: 250000,
    honor_sesi_tentor: 150000,
    biaya_transport: 15000,
    catatan: "Persiapan UTBK, evaluasi tiap bulan.",
    status_kontrak: "Aktif",
    tanggal_mulai: "2025-03-15",
    tanggal_selesai: null,
  },
  {
    id: "kl-4",
    siswa_id: "ps-4",
    tentor_id: "pt-4",
    mapel_id: "mp-4",
    paket_id: "pk-1",
    hari_rutin: "Sabtu",
    jam_mulai: "09:00",
    jam_selesai: "10:30",
    jarak_km: 8.0,
    biaya_sesi_ortu: 200000,
    honor_sesi_tentor: 120000,
    biaya_transport: 30000,
    catatan: "",
    status_kontrak: "Cuti",
    tanggal_mulai: "2024-11-01",
    tanggal_selesai: null,
  },
  {
    id: "kl-5",
    siswa_id: "ps-5",
    tentor_id: "pt-1",
    mapel_id: "mp-5",
    paket_id: "pk-4",
    hari_rutin: "Rabu",
    jam_mulai: "15:00",
    jam_selesai: "16:30",
    jarak_km: 4.2,
    biaya_sesi_ortu: 150000,
    honor_sesi_tentor: 90000,
    biaya_transport: 20000,
    catatan: "Kontrak selesai sesuai target semester.",
    status_kontrak: "Selesai",
    tanggal_mulai: "2024-08-01",
    tanggal_selesai: "2025-01-31",
  },
];

/* ---------------- Sesi KBM ---------------- */

export type StatusSesi = "Scheduled" | "Rescheduled" | "Ongoing" | "Done" | "Canceled";
export const STATUS_SESI_OPTIONS: StatusSesi[] = [
  "Scheduled",
  "Rescheduled",
  "Ongoing",
  "Done",
  "Canceled",
];

export type SesiKbm = {
  id: string;
  kontrak_id: string;
  tanggal_sesi: string;
  jam_mulai_plan: string;
  jam_selesai_plan: string;
  status: StatusSesi;
  alasan_reschedule: string;
};

export const sesiKbmSeed: SesiKbm[] = [
  { id: "sk-1", kontrak_id: "kl-1", tanggal_sesi: "2025-08-11", jam_mulai_plan: "15:00", jam_selesai_plan: "16:30", status: "Done", alasan_reschedule: "" },
  { id: "sk-2", kontrak_id: "kl-1", tanggal_sesi: "2025-08-18", jam_mulai_plan: "15:00", jam_selesai_plan: "16:30", status: "Scheduled", alasan_reschedule: "" },
  { id: "sk-3", kontrak_id: "kl-2", tanggal_sesi: "2025-08-12", jam_mulai_plan: "13:00", jam_selesai_plan: "14:30", status: "Done", alasan_reschedule: "" },
  { id: "sk-4", kontrak_id: "kl-3", tanggal_sesi: "2025-08-14", jam_mulai_plan: "16:00", jam_selesai_plan: "17:00", status: "Ongoing", alasan_reschedule: "" },
  { id: "sk-5", kontrak_id: "kl-4", tanggal_sesi: "2025-08-16", jam_mulai_plan: "09:00", jam_selesai_plan: "10:30", status: "Rescheduled", alasan_reschedule: "Siswa sakit, dipindah dari 9 Agustus." },
  { id: "sk-6", kontrak_id: "kl-2", tanggal_sesi: "2025-08-19", jam_mulai_plan: "13:00", jam_selesai_plan: "14:30", status: "Canceled", alasan_reschedule: "Tutor berhalangan mendadak." },
];

export function kontrakLabel(kontrakId: string): string {
  const k = kontrakLesSeed.find((k) => k.id === kontrakId);
  if (!k) return "—";
  return `${siswaName(k.siswa_id)} — ${tentorName(k.tentor_id)} (${mapelName(k.mapel_id)})`;
}