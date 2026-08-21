import type { LucideIcon } from "lucide-react";
import {
  Bell,
  CalendarClock,
  CircleDollarSign,
  GraduationCap,
  Headset,
  Home,
  MapPin,
  NotebookText,
  Repeat,
  Settings,
  User,
} from "lucide-react";

export type TentorNavItem = {
  label: string;
  icon: LucideIcon;
  href: string;
};

export const NAV_UTAMA: TentorNavItem[] = [
  { label: "Beranda", icon: Home, href: "/tentor" },
  { label: "Jadwal Saya", icon: CalendarClock, href: "/tentor/jadwal" },
  { label: "Presensi", icon: MapPin, href: "/tentor/presensi" },
  { label: "Laporan Belajar", icon: NotebookText, href: "/tentor/laporan-belajar" },
  { label: "Pendapatan", icon: CircleDollarSign, href: "/tentor/pendapatan" },
];

export const NAV_AKUN: TentorNavItem[] = [
  { label: "Profil Saya", icon: User, href: "/tentor/profil" },
  { label: "Ketersediaan Waktu", icon: CalendarClock, href: "/tentor/ketersediaan" },
  { label: "Mata Pelajaran", icon: GraduationCap, href: "/tentor/mata-pelajaran" },
  { label: "Reschedule", icon: Repeat, href: "/tentor/reschedule" },
  { label: "Bantuan & Tiket", icon: Headset, href: "/tentor/bantuan" },
  { label: "Notifikasi", icon: Bell, href: "/tentor/notifikasi" },
  { label: "Pengaturan", icon: Settings, href: "/tentor/pengaturan" },
];