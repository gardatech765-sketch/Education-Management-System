export type TingkatKeahlian = "Basic" | "Intermediate" | "Expert";

export type MapelTersertifikasi = {
  id: string;
  namaMapel: string;
  jenjang: string;
  tingkatKeahlian: TingkatKeahlian;
};

export const mapelTersertifikasiSeed: MapelTersertifikasi[] = [
  { id: "mt-1", namaMapel: "Matematika", jenjang: "SMA", tingkatKeahlian: "Expert" },
  { id: "mt-2", namaMapel: "Matematika", jenjang: "SMP", tingkatKeahlian: "Expert" },
  { id: "mt-3", namaMapel: "Fisika", jenjang: "SMA", tingkatKeahlian: "Intermediate" },
];
