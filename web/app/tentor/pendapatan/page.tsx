"use client";

import { useState } from "react";
import Tabs from "@/components/admin/ui/Tabs";
import EstimasiPendapatanSection from "@/components/tentor/pendapatan/EstimasiPendapatanSection";
import RiwayatGajiSection from "@/components/tentor/pendapatan/RiwayatGajiSection";

export default function PendapatanPage() {
  const [tab, setTab] = useState<"estimasi" | "riwayat">("estimasi");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Pendapatan</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Estimasi pendapatan berjalan dan riwayat penggajian Anda.
        </p>
      </div>

      <Tabs
        tabs={[
          { key: "estimasi", label: "Estimasi Berjalan" },
          { key: "riwayat", label: "Riwayat & Slip Gaji" },
        ]}
        active={tab}
        onChange={(k) => setTab(k as "estimasi" | "riwayat")}
      />

      {tab === "estimasi" ? <EstimasiPendapatanSection /> : <RiwayatGajiSection />}
    </div>
  );
}
