import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import Badge from "@/components/admin/ui/Badge";
import { kelasTerakhir } from "./data";

export default function KelasTerakhirTable() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-zinc-900">Kelas Terakhir</h2>
        <Link href="/tentor/jadwal" className="text-sm font-medium text-amber-600 hover:text-amber-700">
          Lihat Semua
        </Link>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-100 text-xs text-zinc-400">
              <th className="pb-3 pr-3 font-medium">Tanggal</th>
              <th className="pb-3 pr-3 font-medium">Kelas</th>
              <th className="pb-3 pr-3 font-medium">Lokasi</th>
              <th className="pb-3 pr-3 font-medium">Durasi</th>
              <th className="pb-3 pr-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Laporan</th>
            </tr>
          </thead>
          <tbody>
            {kelasTerakhir.map((row, i) => (
              <tr key={i} className="border-b border-zinc-50 last:border-0">
                <td className="whitespace-nowrap py-3 pr-3 text-zinc-500">{row.tanggal}</td>
                <td className="py-3 pr-3 font-medium text-zinc-800">{row.kelas}</td>
                <td className="whitespace-nowrap py-3 pr-3">
                  <Badge color={row.lokasi === "Home Visit" ? "amber" : "blue"}>{row.lokasi}</Badge>
                </td>
                <td className="whitespace-nowrap py-3 pr-3 text-zinc-500">{row.durasi}</td>
                <td className="py-3 pr-3">
                  <Badge color="green">{row.status}</Badge>
                </td>
                <td className="py-3">
                  {row.laporanSelesai && (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" strokeWidth={2} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
