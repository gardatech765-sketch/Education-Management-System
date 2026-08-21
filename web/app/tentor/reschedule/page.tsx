"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Drawer from "@/components/admin/ui/Drawer";
import Badge from "@/components/admin/ui/Badge";
import EmptyState from "@/components/admin/ui/EmptyState";
import RescheduleForm, {
  type RescheduleFormValues,
} from "@/components/tentor/reschedule/RescheduleForm";
import {
  genId,
  kelasLabel,
  pengajuanRescheduleSeed,
  type PengajuanReschedule,
  type StatusReschedule,
} from "@/components/tentor/reschedule/dummy";

const FORM_ID = "form-reschedule";

const STATUS_COLOR: Record<StatusReschedule, "amber" | "green" | "red"> = {
  Menunggu: "amber",
  Disetujui: "green",
  Ditolak: "red",
};

export default function ReschedulePage() {
  const [items, setItems] = useState<PengajuanReschedule[]>(pengajuanRescheduleSeed);
  const [drawerOpen, setDrawerOpen] = useState(false);

  function handleSubmit(values: RescheduleFormValues) {
    setItems((prev) => [
      {
        id: genId("rs"),
        kelasId: values.kelasId,
        tanggalAsli: "—",
        tanggalUsulan: values.tanggalUsulan,
        jamUsulan: values.jamUsulan,
        alasan: values.alasan,
        status: "Menunggu",
        diajukanPada: new Date().toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      },
      ...prev,
    ]);
    setDrawerOpen(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Reschedule</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Ajukan pindah jadwal jika Anda berhalangan mengajar.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="flex shrink-0 items-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-amber-600"
        >
          <Plus className="h-4 w-4" />
          Ajukan Reschedule
        </button>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-zinc-900">Riwayat Pengajuan</h2>

        {items.length === 0 ? (
          <EmptyState title="Belum ada pengajuan" description="Klik tombol di atas untuk mengajukan reschedule." />
        ) : (
          <ul className="mt-4 space-y-3">
            {items.map((item) => (
              <li key={item.id} className="rounded-lg border border-zinc-100 p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-zinc-800">{kelasLabel(item.kelasId)}</p>
                    <p className="mt-0.5 text-xs text-zinc-400">Diajukan {item.diajukanPada}</p>
                  </div>
                  <Badge color={STATUS_COLOR[item.status]}>{item.status}</Badge>
                </div>

                <div className="mt-3 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-zinc-400">Jadwal Asli</p>
                    <p className="text-zinc-700">{item.tanggalAsli}</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400">Usulan Pengganti</p>
                    <p className="text-zinc-700">
                      {item.tanggalUsulan}, {item.jamUsulan}
                    </p>
                  </div>
                </div>

                <p className="mt-2 text-sm text-zinc-500">
                  <span className="text-zinc-400">Alasan: </span>
                  {item.alasan}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Ajukan Reschedule"
        description="Isi detail pengajuan pindah jadwal."
        footer={
          <>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            >
              Batal
            </button>
            <button
              type="submit"
              form={FORM_ID}
              className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600"
            >
              Ajukan
            </button>
          </>
        }
      >
        <RescheduleForm formId={FORM_ID} onSubmit={handleSubmit} />
      </Drawer>
    </div>
  );
}
