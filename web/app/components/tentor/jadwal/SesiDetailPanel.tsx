import { MapPin } from "lucide-react";
import Badge from "@/components/admin/ui/Badge";
import { sesiPadaTanggal } from "./dummy";

const STATUS_COLOR = {
  Terjadwal: "blue",
  Selesai: "green",
  Dibatalkan: "red",
} as const;

function formatTanggal(dateKey: string) {
  const d = new Date(dateKey + "T00:00:00");
  return d.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

export default function SesiDetailPanel({ dateKey }: { dateKey: string | null }) {
  if (!dateKey) {
    return (
      <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-zinc-200 bg-white p-8 text-center text-sm text-zinc-400">
        Pilih tanggal di kalender untuk melihat detail sesi.
      </div>
    );
  }

  const sesi = sesiPadaTanggal(dateKey);

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <h2 className="text-sm font-semibold text-zinc-900">{formatTanggal(dateKey)}</h2>

      {sesi.length === 0 ? (
        <p className="mt-4 text-sm text-zinc-400">Tidak ada sesi terjadwal pada tanggal ini.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {sesi.map((s) => (
            <li key={s.id} className="rounded-lg border border-zinc-100 p-3.5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-xs font-medium text-zinc-400">{s.waktu}</span>
                  <p className="mt-0.5 text-sm font-semibold text-zinc-800">{s.judul}</p>
                  <p className="text-xs text-zinc-500">{s.peserta}</p>
                </div>
                <Badge color={STATUS_COLOR[s.status]}>{s.status}</Badge>
              </div>

              <div className="mt-2.5 flex items-start gap-1.5 text-xs text-zinc-500">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-zinc-400" />
                <span>{s.lokasiDetail}</span>
              </div>

              {s.status === "Terjadwal" && (
                <button
                  type="button"
                  className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-zinc-200 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-50"
                >
                  <MapPin className="h-3.5 w-3.5" />
                  {s.lokasiModel === "Home Visit" ? "Buka Maps" : "Lihat Info Ruangan"}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
