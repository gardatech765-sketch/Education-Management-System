"use client";

import { useState } from "react";
import Tabs from "@/components/admin/ui/Tabs";
import CalendarView from "@/components/tentor/jadwal/CalendarView";
import SesiDetailPanel from "@/components/tentor/jadwal/SesiDetailPanel";
import KelasAktifList from "@/components/tentor/jadwal/KelasAktifList";

export default function JadwalSayaPage() {
  const [tab, setTab] = useState<"kalender" | "kelas-aktif">("kalender");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Jadwal Saya</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Lihat kalender kelas dan daftar kontrak kelas aktif Anda.
        </p>
      </div>

      <Tabs
        tabs={[
          { key: "kalender", label: "Kalender" },
          { key: "kelas-aktif", label: "Kelas Aktif Saya" },
        ]}
        active={tab}
        onChange={(k) => setTab(k as "kalender" | "kelas-aktif")}
      />

      {tab === "kalender" ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CalendarView onSelectDate={setSelectedDate} />
          </div>
          <SesiDetailPanel dateKey={selectedDate} />
        </div>
      ) : (
        <KelasAktifList />
      )}
    </div>
  );
}
