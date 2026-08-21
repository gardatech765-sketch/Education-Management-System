import Link from "next/link";
import { MapPin, Navigation } from "lucide-react";
import { kelasTerdekat } from "./data";

export default function KelasTerdekatCard() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <h2 className="text-sm font-semibold text-zinc-900">Kelas Terdekat Hari Ini</h2>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <span className="inline-block rounded-md bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">
            {kelasTerdekat.waktu}
          </span>
          <p className="mt-3 text-lg font-bold text-zinc-900">{kelasTerdekat.namaKelas}</p>
          <p className="mt-0.5 text-sm text-zinc-500">Siswa: {kelasTerdekat.siswa}</p>

          <div className="mt-3 flex items-start gap-1.5 text-sm text-zinc-500">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" />
            <span>{kelasTerdekat.alamat}</span>
          </div>
          <div className="mt-1.5 flex items-center gap-1.5 text-sm text-zinc-500">
            <Navigation className="h-4 w-4 shrink-0 text-zinc-400" />
            <span>{kelasTerdekat.jarak}</span>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-center gap-1.5">
          <div className="h-16 w-16 overflow-hidden rounded-full bg-gradient-to-br from-amber-200 to-amber-300" />
          <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-600">
            {kelasTerdekat.tipeLokasi}
          </span>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-zinc-200 px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
        >
          <MapPin className="h-4 w-4" />
          Lihat Arah (Maps)
        </button>
        <Link
          href="/tentor/presensi"
          className="flex flex-1 items-center justify-center rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-amber-600"
        >
          Check-In
        </Link>
      </div>
    </div>
  );
}