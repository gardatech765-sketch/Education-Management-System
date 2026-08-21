export function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(
    value
  );
}

export type SesiUnpaid = {
  id: string;
  tanggal: string;
  kelas: string;
  honorMengajar: number;
  uangTransport: number;
};

export const sesiUnpaidSeed: SesiUnpaid[] = [
  { id: "su-1", tanggal: "1 Okt 2026", kelas: "Matematika Privat - Andi Saputra", honorMengajar: 300000, uangTransport: 50000 },
  { id: "su-2", tanggal: "2 Okt 2026", kelas: "Bahasa Inggris Group - Kelas 10", honorMengajar: 250000, uangTransport: 0 },
  { id: "su-3", tanggal: "3 Okt 2026", kelas: "Fisika Semi Privat - Kelas 12 IPA", honorMengajar: 350000, uangTransport: 0 },
  { id: "su-4", tanggal: "5 Okt 2026", kelas: "Kimia Grup - Kelas 11", honorMengajar: 300000, uangTransport: 60000 },
  { id: "su-5", tanggal: "8 Okt 2026", kelas: "Matematika Privat - Andi Saputra", honorMengajar: 300000, uangTransport: 50000 },
  { id: "su-6", tanggal: "9 Okt 2026", kelas: "Bahasa Inggris Group - Kelas 10", honorMengajar: 250000, uangTransport: 0 },
  { id: "su-7", tanggal: "10 Okt 2026", kelas: "Fisika Semi Privat - Kelas 12 IPA", honorMengajar: 350000, uangTransport: 0 },
  { id: "su-8", tanggal: "12 Okt 2026", kelas: "Kimia Grup - Kelas 11", honorMengajar: 300000, uangTransport: 60000 },
  { id: "su-9", tanggal: "13 Okt 2026", kelas: "Bahasa Inggris Group - Kelas 10", honorMengajar: 250000, uangTransport: 0 },
  { id: "su-10", tanggal: "14 Okt 2026", kelas: "Matematika Privat - Andi Saputra", honorMengajar: 300000, uangTransport: 50000 },
  { id: "su-11", tanggal: "17 Okt 2026", kelas: "Matematika Privat - Andi Saputra", honorMengajar: 300000, uangTransport: 50000 },
  { id: "su-12", tanggal: "17 Okt 2026", kelas: "Bahasa Inggris Group - Kelas 10", honorMengajar: 250000, uangTransport: 0 },
];

export type StatusGaji = "Transferred";

export type RiwayatGaji = {
  id: string;
  periode: string;
  totalSesi: number;
  honorDasar: number;
  transport: number;
  bonus: number;
  potongan: number;
  status: StatusGaji;
};

export const riwayatGajiSeed: RiwayatGaji[] = [
  { id: "rg-1", periode: "September 2026", totalSesi: 15, honorDasar: 4200000, transport: 600000, bonus: 100000, potongan: 0, status: "Transferred" },
  { id: "rg-2", periode: "Agustus 2026", totalSesi: 16, honorDasar: 4400000, transport: 650000, bonus: 0, potongan: 0, status: "Transferred" },
  { id: "rg-3", periode: "Juli 2026", totalSesi: 14, honorDasar: 3900000, transport: 550000, bonus: 0, potongan: 50000, status: "Transferred" },
  { id: "rg-4", periode: "Juni 2026", totalSesi: 17, honorDasar: 4650000, transport: 700000, bonus: 150000, potongan: 0, status: "Transferred" },
];

export function totalDiterima(g: RiwayatGaji) {
  return g.honorDasar + g.transport + g.bonus - g.potongan;
}
