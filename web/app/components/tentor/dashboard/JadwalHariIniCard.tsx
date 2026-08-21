import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Badge from "@/components/admin/ui/Badge";
import { jadwalHariIni } from "./data";

export default function JadwalHariIniCard() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-zinc-900">Jadwal Hari Ini</h2>
        <Link href="/tentor/jadwal" className="text-sm font-medium text-amber-600 hover:text-amber-700">
          Lihat Kalender
        </Link>
      </div>

      <div className="mt-3 space-y-1">
        {jadwalHariIni.map((item, i) => (
          <div key={i}>
            {item.hariLabel && (
              <p className="mb-1.5 mt-3 text-xs font-semibold uppercase tracking-wide text-zinc-400">
                {item.hariLabel}
              </p>
            )}
            <Link
              href="/tentor/jadwal"
              className="flex items-center gap-3 rounded-lg border border-zinc-100 p-3 hover:bg-zinc-50"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-zinc-400">{item.waktu}</span>
                  <Badge color={item.status === "Aktif" ? "green" : "blue"}>{item.status}</Badge>
                </div>
                <p className="mt-1 truncate text-sm font-semibold text-zinc-800">{item.judul}</p>
                <p className="truncate text-xs text-zinc-500">{item.detail}</p>
                <p className="truncate text-xs text-zinc-400">{item.lokasi}</p>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-zinc-300" />
            </Link>
          </div>
        ))}
      </div>

      <Link
        href="/tentor/jadwal"
        className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-zinc-200 py-2.5 text-sm font-medium text-zinc-600 hover:bg-zinc-50"
      >
        Lihat Semua Jadwal
      </Link>
    </div>
  );
}