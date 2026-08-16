export type JenisKelamin = "L" | "P";

export type StatusAkunTutor = "Pending" | "Approved" | "Suspended";
export const STATUS_AKUN_OPTIONS: StatusAkunTutor[] = ["Pending", "Approved", "Suspended"];

export type ProfilTentor = {
  id: string;
  nik: string;
  nama_lengkap: string;
  jenis_kelamin: JenisKelamin;
  no_wa: string;
  alamat_domisili: string;
  maps_place_id: string;
  pendidikan_terakhir: string;
  file_cv: string;
  file_sertifikat: string;
  status_akun: StatusAkunTutor;
  tanggal_bergabung: string; // yyyy-mm-dd
};

export const profilTentorSeed: ProfilTentor[] = [
  {
    id: "pt-1",
    nik: "3471012345670001",
    nama_lengkap: "Budi Santoso",
    jenis_kelamin: "L",
    no_wa: "081234567801",
    alamat_domisili: "Jl. Kaliurang KM 5, Sleman, Yogyakarta",
    maps_place_id: "",
    pendidikan_terakhir: "S1 Pendidikan Matematika - UNY",
    file_cv: "",
    file_sertifikat: "",
    status_akun: "Approved",
    tanggal_bergabung: "2024-01-15",
  },
  {
    id: "pt-2",
    nik: "3471012345670002",
    nama_lengkap: "Dewi Lestari",
    jenis_kelamin: "P",
    no_wa: "081234567802",
    alamat_domisili: "Jl. Malioboro No. 12, Yogyakarta",
    maps_place_id: "",
    pendidikan_terakhir: "S1 Pendidikan Fisika - UGM",
    file_cv: "",
    file_sertifikat: "",
    status_akun: "Approved",
    tanggal_bergabung: "2024-02-20",
  },
  {
    id: "pt-3",
    nik: "3471012345670003",
    nama_lengkap: "Ahmad Rizki",
    jenis_kelamin: "L",
    no_wa: "081234567803",
    alamat_domisili: "Jl. Godean KM 3, Sleman, Yogyakarta",
    maps_place_id: "",
    pendidikan_terakhir: "S1 Pendidikan Kimia - UNY",
    file_cv: "",
    file_sertifikat: "",
    status_akun: "Approved",
    tanggal_bergabung: "2024-03-05",
  },
  {
    id: "pt-4",
    nik: "3471012345670004",
    nama_lengkap: "Siti Nurhaliza",
    jenis_kelamin: "P",
    no_wa: "081234567804",
    alamat_domisili: "Jl. Magelang KM 7, Sleman, Yogyakarta",
    maps_place_id: "",
    pendidikan_terakhir: "S1 Sastra Inggris - USD",
    file_cv: "",
    file_sertifikat: "",
    status_akun: "Pending",
    tanggal_bergabung: "2025-04-10",
  },
  {
    id: "pt-5",
    nik: "3471012345670005",
    nama_lengkap: "Rina Marlina",
    jenis_kelamin: "P",
    no_wa: "081234567805",
    alamat_domisili: "Jl. Wates KM 4, Bantul, Yogyakarta",
    maps_place_id: "",
    pendidikan_terakhir: "S1 Pendidikan Bahasa Inggris - UAD",
    file_cv: "",
    file_sertifikat: "",
    status_akun: "Suspended",
    tanggal_bergabung: "2023-11-01",
  },
];

export type ProfilOrtu = {
  id: string;
  nama_wali: string;
  no_wa: string;
  alamat_tagih: string;
  maps_place_id: string;
};

export const profilOrtuSeed: ProfilOrtu[] = [
  { id: "po-1", nama_wali: "Hendra Wijaya", no_wa: "082112345601", alamat_tagih: "Jl. Kaliurang KM 8, Sleman, Yogyakarta", maps_place_id: "" },
  { id: "po-2", nama_wali: "Maya Kartika", no_wa: "082112345602", alamat_tagih: "Jl. Solo KM 10, Sleman, Yogyakarta", maps_place_id: "" },
  { id: "po-3", nama_wali: "Agus Setiawan", no_wa: "082112345603", alamat_tagih: "Jl. Parangtritis KM 6, Bantul, Yogyakarta", maps_place_id: "" },
  { id: "po-4", nama_wali: "Rina Wulandari", no_wa: "082112345604", alamat_tagih: "Jl. Wonosari KM 5, Gunungkidul, Yogyakarta", maps_place_id: "" },
];

export type ProfilSiswa = {
  id: string;
  ortu_id: string;
  nama_siswa: string;
  jenis_kelamin: JenisKelamin;
  tanggal_lahir: string; // yyyy-mm-dd
  asal_sekolah: string;
  kelas: string;
  catatan_khusus: string;
  is_active: boolean;
};

export const profilSiswaSeed: ProfilSiswa[] = [
  { id: "ps-1", ortu_id: "po-1", nama_siswa: "Siti Aisyah", jenis_kelamin: "P", tanggal_lahir: "2009-03-12", asal_sekolah: "SMA Negeri 1 Sleman", kelas: "XI IPA 2", catatan_khusus: "", is_active: true },
  { id: "ps-2", ortu_id: "po-2", nama_siswa: "Ahmad Wijaya", jenis_kelamin: "L", tanggal_lahir: "2010-07-22", asal_sekolah: "SMP Negeri 2 Sleman", kelas: "VIII B", catatan_khusus: "Perlu pendampingan ekstra di Matematika.", is_active: true },
  { id: "ps-3", ortu_id: "po-3", nama_siswa: "Maya Sari", jenis_kelamin: "P", tanggal_lahir: "2008-11-02", asal_sekolah: "SMA Negeri 3 Bantul", kelas: "XII IPA 1", catatan_khusus: "Persiapan UTBK.", is_active: true },
  { id: "ps-4", ortu_id: "po-4", nama_siswa: "Rizky Pratama", jenis_kelamin: "L", tanggal_lahir: "2012-01-18", asal_sekolah: "SD Negeri 1 Wonosari", kelas: "VI", catatan_khusus: "", is_active: true },
  { id: "ps-5", ortu_id: "po-1", nama_siswa: "Dewi Kartika", jenis_kelamin: "P", tanggal_lahir: "2011-09-30", asal_sekolah: "SMP Negeri 4 Sleman", kelas: "VII A", catatan_khusus: "", is_active: false },
];

export function genId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

export function calculateAge(tanggalLahir: string): number {
  if (!tanggalLahir) return 0;
  const birth = new Date(tanggalLahir);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
  return age;
}