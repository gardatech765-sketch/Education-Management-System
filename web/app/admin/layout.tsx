import type { Metadata } from "next";
import type { ReactNode } from "react";
import AdminShell from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: "Admin Dashboard | Bimbel Privat - Edukom Jaya Abadi",
  description: "Panel admin Sistem Bimbel Privat Edukom Jaya Abadi",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}