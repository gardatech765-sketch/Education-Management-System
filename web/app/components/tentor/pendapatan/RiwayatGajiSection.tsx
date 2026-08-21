"use client";

import { Download } from "lucide-react";
import Badge from "@/components/admin/ui/Badge";
import { formatRupiah, riwayatGajiSeed, totalDiterima } from "./dummy";

export default function RiwayatGajiSection() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <h2 className="text-sm font-semibold text-zinc-900">Riwayat Penggajian</h2>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-100 text-xs text-zinc-400">
              <th className="pb-3 pr-3 font-medium">Periode</th>
              <th className="pb-3 pr-3 font-medium">Total Sesi</th>
              <th className="pb-3 pr-3 font-medium">Honor + Transport</th>
              <th className="pb-3 pr-3 font-medium">Bonus</th>
              <th className="pb-3 pr-3 font-medium">Potongan</th>
              <th className="pb-3 pr-3 font-medium">Total Diterima</th>
              <th className="pb-3 pr-3 font-medium">Status</th>
              <th className="pb-3 text-right font-medium">Slip</th>
            </tr>
          </thead>
          <tbody>
            {riwayatGajiSeed.map((g) => (
              <tr key={g.id} className="border-b border-zinc-50 last:border-0">
                <td className="whitespace-nowrap py-3 pr-3 font-medium text-zinc-800">
                  {g.periode}
                </td>
                <td className="py-3 pr-3 text-zinc-600">{g.totalSesi}x</td>
                <td className="whitespace-nowrap py-3 pr-3 text-zinc-600">
                  {formatRupiah(g.honorDasar + g.transport)}
                </td>
                <td className="whitespace-nowrap py-3 pr-3 text-emerald-600">
                  {g.bonus > 0 ? `+${formatRupiah(g.bonus)}` : "—"}
                </td>
                <td className="whitespace-nowrap py-3 pr-3 text-red-500">
                  {g.potongan > 0 ? `-${formatRupiah(g.potongan)}` : "—"}
                </td>
                <td className="whitespace-nowrap py-3 pr-3 font-semibold text-zinc-900">
                  {formatRupiah(totalDiterima(g))}
                </td>
                <td className="py-3 pr-3">
                  <Badge color="green">{g.status}</Badge>
                </td>
                <td className="py-3">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="flex items-center gap-1.5 rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Unduh
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-zinc-400">
        Unduh slip gaji (PDF) akan aktif setelah modul ini disambungkan ke backend penggajian.
      </p>
    </div>
  );
}
