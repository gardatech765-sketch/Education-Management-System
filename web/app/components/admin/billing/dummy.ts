import { profilOrtuSeed, profilTentorSeed } from "@/components/admin/crm/dummy";

export function genId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

export function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(
    value
  );
}

export function ortuName(id: string): string {
  return profilOrtuSeed.find((o) => o.id === id)?.nama_wali ?? "—";
}

export function tentorName(id: string): string {
  return profilTentorSeed.find((t) => t.id === id)?.nama_lengkap ?? "—";
}

export { profilOrtuSeed, profilTentorSeed };

/* ---------------- Tagihan Orang Tua ---------------- */

export type StatusBayar = "Unpaid" | "Partial" | "Paid";
export const STATUS_BAYAR_OPTIONS: StatusBayar[] = ["Unpaid", "Partial", "Paid"];

export type TagihanOrtu = {
  id: string;
  ortu_id: string;
  no_invoice: string;
  periode_bulan: string; // cth. "Agustus 2025"
  total_sesi: number;
  total_tagihan: number;
  status_bayar: StatusBayar;
  jatuh_tempo: string; // yyyy-mm-dd
};

export const tagihanOrtuSeed: TagihanOrtu[] = [
  { id: "tg-1", ortu_id: "po-1", no_invoice: "INV-2025-001", periode_bulan: "Agustus 2025", total_sesi: 4, total_tagihan: 1250000, status_bayar: "Paid", jatuh_tempo: "2025-08-10" },
  { id: "tg-2", ortu_id: "po-2", no_invoice: "INV-2025-002", periode_bulan: "Agustus 2025", total_sesi: 4, total_tagihan: 950000, status_bayar: "Paid", jatuh_tempo: "2025-08-10" },
  { id: "tg-3", ortu_id: "po-3", no_invoice: "INV-2025-003", periode_bulan: "Agustus 2025", total_sesi: 4, total_tagihan: 1100000, status_bayar: "Partial", jatuh_tempo: "2025-08-15" },
  { id: "tg-4", ortu_id: "po-4", no_invoice: "INV-2025-004", periode_bulan: "Agustus 2025", total_sesi: 4, total_tagihan: 850000, status_bayar: "Unpaid", jatuh_tempo: "2025-08-20" },
  { id: "tg-5", ortu_id: "po-1", no_invoice: "INV-2025-005", periode_bulan: "Juli 2025", total_sesi: 4, total_tagihan: 1200000, status_bayar: "Paid", jatuh_tempo: "2025-07-10" },
];

/* ---------------- Pembayaran ---------------- */

export type MetodeBayar = "Transfer" | "QRIS" | "Cash";
export const METODE_BAYAR_OPTIONS: MetodeBayar[] = ["Transfer", "QRIS", "Cash"];

export type StatusValidasi = "Pending" | "Approved" | "Rejected";
export const STATUS_VALIDASI_OPTIONS: StatusValidasi[] = ["Pending", "Approved", "Rejected"];

export type Pembayaran = {
  id: string;
  tagihan_id: string;
  tanggal_bayar: string;
  metode_bayar: MetodeBayar;
  referensi_gateway: string;
  nominal_bayar: number;
  status_validasi: StatusValidasi;
  catatan_admin: string;
};

export const pembayaranSeed: Pembayaran[] = [
  { id: "pb-1", tagihan_id: "tg-1", tanggal_bayar: "2025-08-05", metode_bayar: "Transfer", referensi_gateway: "TRX-88213", nominal_bayar: 1250000, status_validasi: "Approved", catatan_admin: "" },
  { id: "pb-2", tagihan_id: "tg-2", tanggal_bayar: "2025-08-06", metode_bayar: "QRIS", referensi_gateway: "QR-55210", nominal_bayar: 950000, status_validasi: "Approved", catatan_admin: "" },
  { id: "pb-3", tagihan_id: "tg-3", tanggal_bayar: "2025-08-09", metode_bayar: "Transfer", referensi_gateway: "TRX-88544", nominal_bayar: 500000, status_validasi: "Approved", catatan_admin: "Baru bayar sebagian, sisa Rp 600.000." },
  { id: "pb-4", tagihan_id: "tg-4", tanggal_bayar: "2025-08-14", metode_bayar: "Cash", referensi_gateway: "", nominal_bayar: 850000, status_validasi: "Pending", catatan_admin: "Menunggu konfirmasi kasir cabang." },
  { id: "pb-5", tagihan_id: "tg-5", tanggal_bayar: "2025-07-08", metode_bayar: "Transfer", referensi_gateway: "TRX-87012", nominal_bayar: 1200000, status_validasi: "Approved", catatan_admin: "" },
];

export function tagihanLabel(tagihanId: string): string {
  const t = tagihanOrtuSeed.find((t) => t.id === tagihanId);
  if (!t) return "—";
  return `${t.no_invoice} — ${ortuName(t.ortu_id)}`;
}

/* ---------------- Gaji Tentor ---------------- */

export type StatusGaji = "Draft" | "Approved" | "Transferred";
export const STATUS_GAJI_OPTIONS: StatusGaji[] = ["Draft", "Approved", "Transferred"];

export type GajiTentor = {
  id: string;
  tentor_id: string;
  periode_bulan: string;
  total_sesi: number;
  total_honor: number;
  bonus_tambahan: number;
  potongan_denda: number;
  status_gaji: StatusGaji;
  metode_transfer: string;
};

export function totalTerima(g: Pick<GajiTentor, "total_honor" | "bonus_tambahan" | "potongan_denda">) {
  return g.total_honor + g.bonus_tambahan - g.potongan_denda;
}

export const gajiTentorSeed: GajiTentor[] = [
  { id: "gt-1", tentor_id: "pt-1", periode_bulan: "Agustus 2025", total_sesi: 16, total_honor: 1920000, bonus_tambahan: 100000, potongan_denda: 0, status_gaji: "Transferred", metode_transfer: "Transfer Bank" },
  { id: "gt-2", tentor_id: "pt-2", periode_bulan: "Agustus 2025", total_sesi: 12, total_honor: 1350000, bonus_tambahan: 0, potongan_denda: 50000, status_gaji: "Approved", metode_transfer: "Transfer Bank" },
  { id: "gt-3", tentor_id: "pt-3", periode_bulan: "Agustus 2025", total_sesi: 14, total_honor: 2100000, bonus_tambahan: 150000, potongan_denda: 0, status_gaji: "Draft", metode_transfer: "" },
  { id: "gt-4", tentor_id: "pt-4", periode_bulan: "Agustus 2025", total_sesi: 8, total_honor: 960000, bonus_tambahan: 0, potongan_denda: 0, status_gaji: "Draft", metode_transfer: "" },
  { id: "gt-5", tentor_id: "pt-1", periode_bulan: "Juli 2025", total_sesi: 15, total_honor: 1800000, bonus_tambahan: 0, potongan_denda: 0, status_gaji: "Transferred", metode_transfer: "Transfer Bank" },
];