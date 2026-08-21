"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import Drawer from "@/components/admin/ui/Drawer";
import Badge from "@/components/admin/ui/Badge";
import LaporanBelajarForm, {
  type LaporanFormValues,
} from "@/components/tentor/laporan-belajar/LaporanBelajarForm";
import { sesiLaporanSeed, type SesiLaporan } from "@/components/tentor/laporan-belajar/dummy";

const FORM_ID = "form-laporan-belajar";

export default function LaporanBelajarPage() {
  const [items, setItems] = useState<SesiLaporan[]>(sesiLaporanSeed);
  const [selected, setSelected] = useState<SesiLaporan | null>(null);

  function handleSubmit(values: LaporanFormValues) {
    if (!selected) return;
    setItems((prev) =>
      prev.map((item) =>
        item.id === selected.id
          ? { ...item, ...values, statusLaporan: "Sudah Diisi" }
          : item
      )
    );
    setSelected(null);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Laporan Belajar</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Isi jurnal kelas dan evaluasi per siswa setelah sesi selesai.
        </p>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-100 text-xs text-zinc-400">
                <th className="pb-3 pr-3 font-medium">Tanggal</th>
                <th className="pb-3 pr-3 font-medium">Kelas</th>
                <th className="pb-3 pr-3 font-medium">Tipe</th>
                <th className="pb-3 pr-3 font-medium">Status</th>
                <th className="pb-3 text-right font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-zinc-50 last:border-0">
                  <td className="whitespace-nowrap py-3 pr-3 text-zinc-500">{item.tanggal}</td>
                  <td className="py-3 pr-3 font-medium text-zinc-800">{item.kelas}</td>
                  <td className="py-3 pr-3">
                    <Badge color={item.tipeKelas === "Privat" ? "amber" : "blue"}>
                      {item.tipeKelas}
                    </Badge>
                  </td>
                  <td className="py-3 pr-3">
                    <Badge color={item.statusLaporan === "Sudah Diisi" ? "green" : "red"}>
                      {item.statusLaporan}
                    </Badge>
                  </td>
                  <td className="py-3">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => setSelected(item)}
                        className="flex items-center gap-1.5 rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50"
                      >
                        <FileText className="h-3.5 w-3.5" />
                        {item.statusLaporan === "Sudah Diisi" ? "Lihat/Edit" : "Isi Laporan"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Drawer
        open={!!selected}
        onClose={() => setSelected(null)}
        title="Laporan Belajar"
        description={selected ? `${selected.kelas} — ${selected.tanggal}` : undefined}
        footer={
          <>
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            >
              Batal
            </button>
            <button
              type="submit"
              form={FORM_ID}
              className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600"
            >
              Simpan Laporan
            </button>
          </>
        }
      >
        {selected && (
          <LaporanBelajarForm formId={FORM_ID} sesi={selected} onSubmit={handleSubmit} />
        )}
      </Drawer>
    </div>
  );
}
