import { MapPin, Users } from "lucide-react";
import Badge from "@/components/admin/ui/Badge";
import { kelasAktifSeed } from "./dummy";

export default function KelasAktifList() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {kelasAktifSeed.map((k) => (
        <div key={k.id} className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-2">
            <div>
              <Badge color={k.tipeKelas === "Privat" ? "amber" : "blue"}>{k.tipeKelas}</Badge>
              <p className="mt-2 text-base font-bold text-zinc-900">{k.namaKelas}</p>
            </div>
            <Badge color={k.lokasiModel === "Home Visit" ? "amber" : "purple"}>
              {k.lokasiModel}
            </Badge>
          </div>

          <div className="mt-3 space-y-2 text-sm text-zinc-500">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 shrink-0 text-zinc-400" />
              <span>
                {k.peserta} {k.jumlahSiswa > 1 ? `(${k.jumlahSiswa} Siswa)` : ""}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" />
              <span>{k.lokasiDetail}</span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3 text-sm">
            <span className="text-zinc-500">Jadwal Rutin</span>
            <span className="font-medium text-zinc-800">
              {k.hariRutin}, {k.jam}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
