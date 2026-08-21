export type Hari = "Senin" | "Selasa" | "Rabu" | "Kamis" | "Jumat" | "Sabtu" | "Minggu";
export const HARI_OPTIONS: Hari[] = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

export function genId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

export type SlotKetersediaan = {
  id: string;
  hari: Hari;
  jamMulai: string;
  jamSelesai: string;
  isActive: boolean;
};

export const slotKetersediaanSeed: SlotKetersediaan[] = [
  { id: "sl-1", hari: "Senin", jamMulai: "15:00", jamSelesai: "18:00", isActive: true },
  { id: "sl-2", hari: "Rabu", jamMulai: "15:00", jamSelesai: "18:00", isActive: true },
  { id: "sl-3", hari: "Jumat", jamMulai: "18:00", jamSelesai: "20:00", isActive: true },
  { id: "sl-4", hari: "Sabtu", jamMulai: "09:00", jamSelesai: "15:00", isActive: true },
];
