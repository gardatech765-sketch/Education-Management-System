export type ProfilTentorSaya = {
  namaLengkap: string;
  noWa: string;
  alamatDomisili: string;
  namaBank: string;
  noRekening: string;
  namaPemilikRekening: string;
};

export const profilSayaSeed: ProfilTentorSaya = {
  namaLengkap: "Andi Saputra",
  noWa: "081234567890",
  alamatDomisili: "Jl. Kaliurang KM 5, Sleman, Yogyakarta",
  namaBank: "BCA",
  noRekening: "1234567890",
  namaPemilikRekening: "Andi Saputra",
};

export type StatusDokumen = "Terunggah" | "Belum Diunggah";

export type DokumenWajib = {
  key: "ktp" | "cv" | "ijazah";
  label: string;
  status: StatusDokumen;
  namaFile: string;
};

export const dokumenWajibSeed: DokumenWajib[] = [
  { key: "ktp", label: "KTP", status: "Terunggah", namaFile: "ktp-andi-saputra.pdf" },
  { key: "cv", label: "CV", status: "Terunggah", namaFile: "cv-andi-saputra.pdf" },
  { key: "ijazah", label: "Ijazah", status: "Belum Diunggah", namaFile: "" },
];
