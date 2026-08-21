import type { Metadata } from "next";
import TentorShell from "@/components/tentor/TentorShell";

export const metadata: Metadata = {
  title: "Dashboard Tentor | BimbelPrivat",
  description: "Aplikasi Tentor Edukom Jaya Abadi",
};

export default function TentorLayout({ children }: { children: React.ReactNode }) {
  return <TentorShell>{children}</TentorShell>;
}