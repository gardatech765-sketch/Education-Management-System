import Link from "next/link";
import { Calendar, Megaphone, Wallet } from "lucide-react";
import { notifikasiTerbaru } from "./data";

const ICONS = {
  pengumuman: { icon: Megaphone, bg: "bg-amber-100 text-amber-600" },
  reschedule: { icon: Calendar, bg: "bg-blue-100 text-blue-600" },
  gaji: { icon: Wallet, bg: "bg-emerald-100 text-emerald-600" },
} as const;

export default function NotifikasiTerbaruCard() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-zinc-900">Notifikasi Terbaru</h2>
        <Link href="/tentor/notifikasi" className="text-sm font-medium text-amber-600 hover:text-amber-700">
          Lihat Semua
        </Link>
      </div>

      <ul className="mt-4 space-y-4">
        {notifikasiTerbaru.map((item, i) => {
          const cfg = ICONS[item.tipe];
          const Icon = cfg.icon;
          return (
            <li key={i} className="flex items-start gap-3">
              <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${cfg.bg}`}>
                <Icon className="h-4 w-4" strokeWidth={2} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-zinc-800">{item.judul}</p>
                  <span className="shrink-0 text-xs text-zinc-400">{item.waktu}</span>
                </div>
                <p className="mt-0.5 text-xs leading-relaxed text-zinc-500">{item.pesan}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}