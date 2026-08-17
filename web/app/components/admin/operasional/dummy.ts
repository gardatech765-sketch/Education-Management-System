import {
  kontrakLesSeed,
  mapelName,
  sesiKbmSeed,
  siswaName,
  tentorName,
  type SesiKbm,
} from "@/components/admin/penjadwalan/dummy";
import { profilOrtuSeed, profilSiswaSeed, type ProfilOrtu } from "@/components/admin/crm/dummy";

export function genId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

/** Sesi yang statusnya sudah "Done" — hanya sesi ini yang bisa punya presensi/laporan/rating. */
export const sesiSelesaiSeed: SesiKbm[] = sesiKbmSeed.filter((s) => s.status === "Done");

export { sesiKbmSeed, kontrakLesSeed, profilOrtuSeed, profilSiswaSeed };

export function sesiLabel(sesiId: string): string {
  const s = sesiKbmSeed.find((s) => s.id === sesiId);
  if (!s) return "—";
  const k = kontrakLesSeed.find((k) => k.id === s.kontrak_id);
  if (!k) return s.tanggal_sesi;
  return `${s.tanggal_sesi} • ${siswaName(k.siswa_id)} — ${tentorName(k.tentor_id)} (${mapelName(k.mapel_id)})`;
}

export function sesiTanggal(sesiId: string): string {
  return sesiKbmSeed.find((s) => s.id === sesiId)?.tanggal_sesi ?? "—";
}

export function tentorOfSesi(sesiId: string): string {
  const s = sesiKbmSeed.find((s) => s.id === sesiId);
  if (!s) return "—";
  const k = kontrakLesSeed.find((k) => k.id === s.kontrak_id);
  return k ? tentorName(k.tentor_id) : "—";
}

export function siswaOfSesi(sesiId: string): string {
  const s = sesiKbmSeed.find((s) => s.id === sesiId);
  if (!s) return "—";
  const k = kontrakLesSeed.find((k) => k.id === s.kontrak_id);
  return k ? siswaName(k.siswa_id) : "—";
}

/** Cari ortu dari siswa yang mengikuti sesi tertentu (dipakai sebagai default form rating). */
export function ortuOfSesi(sesiId: string): ProfilOrtu | null {
  const s = sesiKbmSeed.find((s) => s.id === sesiId);
  if (!s) return null;
  const k = kontrakLesSeed.find((k) => k.id === s.kontrak_id);
  if (!k) return null;
  const siswa = profilSiswaSeed.find((p) => p.id === k.siswa_id);
  if (!siswa) return null;
  return profilOrtuSeed.find((o) => o.id === siswa.ortu_id) ?? null;
}

export function ortuName(ortuId: string): string {
  return profilOrtuSeed.find((o) => o.id === ortuId)?.nama_wali ?? "—";
}

/* ---------------- Presensi ---------------- */

export type StatusHadir = "Hadir" | "Izin" | "Sakit" | "Alpa";
export const STATUS_HADIR_OPTIONS: StatusHadir[] = ["Hadir", "Izin", "Sakit", "Alpa"];

export type Presensi = {
  id: string;
  sesi_id: string;
  waktu_checkin: string; // HH:mm, kosong jika belum check-in
  lat_checkin: number | null;
  long_checkin: number | null;
  jarak_meter_in: number | null;
  is_valid_geo_in: boolean;
  mock_loc_in: boolean;
  foto_checkin: string; // nama file (simulasi upload)
  waktu_checkout: string;
  lat_checkout: number | null;
  long_checkout: number | null;
  jarak_meter_out: number | null;
  is_valid_geo_out: boolean;
  mock_loc_out: boolean;
  foto_checkout: string;
  device_id: string;
  ip_address: string;
  status_hadir: StatusHadir;
  keterangan: string;
};

export const presensiSeed: Presensi[] = [
  {
    id: "pr-1",
    sesi_id: "sk-1",
    waktu_checkin: "14:55",
    lat_checkin: -7.7823,
    long_checkin: 110.3671,
    jarak_meter_in: 32,
    is_valid_geo_in: true,
    mock_loc_in: false,
    foto_checkin: "checkin_sk1.jpg",
    waktu_checkout: "16:32",
    lat_checkout: -7.7823,
    long_checkout: 110.3671,
    jarak_meter_out: 30,
    is_valid_geo_out: true,
    mock_loc_out: false,
    foto_checkout: "checkout_sk1.jpg",
    device_id: "AND-9F21-BS",
    ip_address: "114.10.22.101",
    status_hadir: "Hadir",
    keterangan: "",
  },
  {
    id: "pr-2",
    sesi_id: "sk-3",
    waktu_checkin: "13:02",
    lat_checkin: -7.7935,
    long_checkin: 110.3841,
    jarak_meter_in: 18,
    is_valid_geo_in: true,
    mock_loc_in: false,
    foto_checkin: "checkin_sk3.jpg",
    waktu_checkout: "14:31",
    lat_checkout: -7.7935,
    long_checkout: 110.3841,
    jarak_meter_out: 20,
    is_valid_geo_out: true,
    mock_loc_out: false,
    foto_checkout: "checkout_sk3.jpg",
    device_id: "IOS-77A3-DL",
    ip_address: "114.10.22.140",
    status_hadir: "Hadir",
    keterangan: "",
  },
  {
    id: "pr-3",
    sesi_id: "sk-7",
    waktu_checkin: "16:10",
    lat_checkin: -7.8102,
    long_checkin: 110.4210,
    jarak_meter_in: 210,
    is_valid_geo_in: false,
    mock_loc_in: true,
    foto_checkin: "checkin_sk7.jpg",
    waktu_checkout: "17:02",
    lat_checkout: -7.8105,
    long_checkout: 110.4215,
    jarak_meter_out: 205,
    is_valid_geo_out: false,
    mock_loc_out: true,
    foto_checkout: "checkout_sk7.jpg",
    device_id: "AND-4C10-AR",
    ip_address: "36.85.14.22",
    status_hadir: "Hadir",
    keterangan: "Terdeteksi lokasi mencurigakan, perlu ditinjau admin.",
  },
  {
    id: "pr-4",
    sesi_id: "sk-8",
    waktu_checkin: "",
    lat_checkin: null,
    long_checkin: null,
    jarak_meter_in: null,
    is_valid_geo_in: false,
    mock_loc_in: false,
    foto_checkin: "",
    waktu_checkout: "",
    lat_checkout: null,
    long_checkout: null,
    jarak_meter_out: null,
    is_valid_geo_out: false,
    mock_loc_out: false,
    foto_checkout: "",
    device_id: "",
    ip_address: "",
    status_hadir: "Sakit",
    keterangan: "Siswa mengirim surat sakit via WhatsApp ke ortu.",
  },
  {
    id: "pr-5",
    sesi_id: "sk-9",
    waktu_checkin: "15:03",
    lat_checkin: -7.8267,
    long_checkin: 110.3652,
    jarak_meter_in: 45,
    is_valid_geo_in: true,
    mock_loc_in: false,
    foto_checkin: "checkin_sk9.jpg",
    waktu_checkout: "16:35",
    lat_checkout: -7.8267,
    long_checkout: 110.3652,
    jarak_meter_out: 40,
    is_valid_geo_out: true,
    mock_loc_out: false,
    foto_checkout: "checkout_sk9.jpg",
    device_id: "AND-9F21-BS",
    ip_address: "114.10.22.101",
    status_hadir: "Hadir",
    keterangan: "",
  },
  {
    id: "pr-6",
    sesi_id: "sk-10",
    waktu_checkin: "",
    lat_checkin: null,
    long_checkin: null,
    jarak_meter_in: null,
    is_valid_geo_in: false,
    mock_loc_in: false,
    foto_checkin: "",
    waktu_checkout: "",
    lat_checkout: null,
    long_checkout: null,
    jarak_meter_out: null,
    is_valid_geo_out: false,
    mock_loc_out: false,
    foto_checkout: "",
    device_id: "",
    ip_address: "",
    status_hadir: "Alpa",
    keterangan: "Tidak ada konfirmasi kehadiran dari tutor maupun siswa.",
  },
];

/* ---------------- Laporan Belajar ---------------- */

export type LaporanBelajar = {
  id: string;
  sesi_id: string;
  materi: string;
  sub_materi: string;
  kendala_siswa: string;
  pr_diberikan: string;
  nilai_harian: number | null;
  catatan_tentor: string;
  is_read_by_ortu: boolean;
};

export const laporanBelajarSeed: LaporanBelajar[] = [
  {
    id: "lb-1",
    sesi_id: "sk-1",
    materi: "Persamaan Kuadrat",
    sub_materi: "Pemfaktoran & rumus ABC",
    kendala_siswa: "Masih tertukar tanda saat memfaktorkan.",
    pr_diberikan: "Latihan soal hal. 45 no. 1–10",
    nilai_harian: 82,
    catatan_tentor: "Siswa aktif bertanya, perlu lebih banyak latihan pemfaktoran.",
    is_read_by_ortu: true,
  },
  {
    id: "lb-2",
    sesi_id: "sk-3",
    materi: "Hukum Newton",
    sub_materi: "Hukum II Newton & penerapannya",
    kendala_siswa: "Kesulitan menentukan arah gaya pada soal cerita.",
    pr_diberikan: "Rangkuman + 5 soal penerapan",
    nilai_harian: 75,
    catatan_tentor: "Perlu latihan menggambar diagram gaya.",
    is_read_by_ortu: false,
  },
  {
    id: "lb-3",
    sesi_id: "sk-7",
    materi: "Reaksi Redoks",
    sub_materi: "Penyetaraan reaksi metode setengah reaksi",
    kendala_siswa: "Belum lancar menghitung bilangan oksidasi.",
    pr_diberikan: "Soal latihan bab 4 no. 1–8",
    nilai_harian: 68,
    catatan_tentor: "Butuh pengulangan konsep dasar bilangan oksidasi di sesi berikutnya.",
    is_read_by_ortu: true,
  },
  {
    id: "lb-4",
    sesi_id: "sk-9",
    materi: "Vocabulary & Reading Comprehension",
    sub_materi: "Narrative text",
    kendala_siswa: "Kosakata masih terbatas.",
    pr_diberikan: "Baca 1 teks narrative + buat ringkasan",
    nilai_harian: 88,
    catatan_tentor: "Progres bagus, lanjutkan latihan membaca teks panjang.",
    is_read_by_ortu: false,
  },
];

/* ---------------- Rating Tentor ---------------- */

export type RatingTentor = {
  id: string;
  sesi_id: string;
  ortu_id: string;
  skor_bintang: number; // 1-5
  ulasan_teks: string;
  is_active: boolean;
};

export const ratingTentorSeed: RatingTentor[] = [
  {
    id: "rt-1",
    sesi_id: "sk-1",
    ortu_id: "po-1",
    skor_bintang: 5,
    ulasan_teks: "Tentor sangat sabar dan mudah dipahami, anak saya jadi lebih percaya diri.",
    is_active: true,
  },
  {
    id: "rt-2",
    sesi_id: "sk-3",
    ortu_id: "po-2",
    skor_bintang: 4,
    ulasan_teks: "Penjelasan bagus, hanya kadang datang mepet waktu.",
    is_active: true,
  },
  {
    id: "rt-3",
    sesi_id: "sk-7",
    ortu_id: "po-3",
    skor_bintang: 3,
    ulasan_teks: "Materi tersampaikan, tapi lokasi check-in sempat bermasalah.",
    is_active: true,
  },
  {
    id: "rt-4",
    sesi_id: "sk-9",
    ortu_id: "po-1",
    skor_bintang: 5,
    ulasan_teks: "Sangat komunikatif dengan orang tua, laporan belajar selalu detail.",
    is_active: true,
  },
];
