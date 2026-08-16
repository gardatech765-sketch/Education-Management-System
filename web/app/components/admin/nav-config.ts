import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Database,
  UserPlus,
  CalendarClock,
  Radio,
  Wallet,
  MessagesSquare,
  ClipboardList,
  MonitorCog,
  Settings,
  ShieldCheck,
} from "lucide-react";

export type NavChild = {
  label: string;
  href: string;
};

export type NavItem = {
  label: string;
  icon: LucideIcon;
  href?: string;
  children?: NavChild[];
};

export type NavSection = {
  title: string;
  items: NavItem[];
};

// Submenus are mapped from the ERD modules (Master Data, CRM, Penjadwalan,
// Operasional, Billing, Komunikasi) — adjust routes as real pages are built.
export const NAV_SECTIONS: NavSection[] = [
  {
    title: "Menu Utama",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
      {
        label: "Master Data",
        icon: Database,
        children: [
          { label: "Mata Pelajaran", href: "/admin/master-data/mata-pelajaran" },
          { label: "Paket Les", href: "/admin/master-data/paket-les" },
          { label: "Tentor & Keahlian", href: "/admin/master-data/tentor-mapel" },
        ],
      },
      {
        label: "CRM & Pendaftaran",
        icon: UserPlus,
        children: [
          { label: "Profil Tutor", href: "/admin/crm/tutor" },
          { label: "Profil Siswa", href: "/admin/crm/siswa" },
          { label: "Profil Orang Tua", href: "/admin/crm/orang-tua" },
        ],
      },
      {
        label: "Penjadwalan & Mapping",
        icon: CalendarClock,
        children: [
          { label: "Ketersediaan Tutor", href: "/admin/penjadwalan/ketersediaan" },
          { label: "Kontrak Les", href: "/admin/penjadwalan/kontrak-les" },
          { label: "Sesi KBM", href: "/admin/penjadwalan/sesi-kbm" },
        ],
      },
      {
        label: "Operasional Live",
        icon: Radio,
        children: [
          { label: "Presensi", href: "/admin/operasional/presensi" },
          { label: "Laporan Belajar", href: "/admin/operasional/laporan-belajar" },
          { label: "Rating Tutor", href: "/admin/operasional/rating-tutor" },
        ],
      },
      {
        label: "Billing & Payroll",
        icon: Wallet,
        children: [
          { label: "Tagihan Orang Tua", href: "/admin/billing/tagihan" },
          { label: "Pembayaran", href: "/admin/billing/pembayaran" },
          { label: "Gaji Tentor", href: "/admin/billing/gaji-tentor" },
        ],
      },
      {
        label: "Komunikasi & Helpdesk",
        icon: MessagesSquare,
        href: "/admin/komunikasi/notifikasi",
      },
    ],
  },
  {
    title: "Laporan & Analitik",
    items: [
      { label: "Laporan & Audit Logs", icon: ClipboardList, href: "/admin/laporan/audit-logs" },
      { label: "Monitoring Sistem", icon: MonitorCog, href: "/admin/laporan/monitoring" },
    ],
  },
  {
    title: "Pengaturan Sistem",
    items: [
      { label: "Pengaturan", icon: Settings, href: "/admin/pengaturan" },
      { label: "Manajemen Pengguna", icon: ShieldCheck, href: "/admin/pengguna" },
    ],
  },
];