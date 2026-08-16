import Link from "next/link";
import { Activity } from "lucide-react";
import { recentActivity } from "./data";

export default function RecentActivityList() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <h2 className="text-sm font-semibold text-zinc-900">Aktivitas Terbaru</h2>
      <ul className="mt-4 space-y-4">
        {recentActivity.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
              <Activity className="h-3.5 w-3.5" strokeWidth={2} />
            </span>
            <div className="min-w-0">
              <p className="text-sm leading-snug text-zinc-700">{item.text}</p>
              <p className="text-xs text-zinc-400">{item.time}</p>
            </div>
          </li>
        ))}
      </ul>
      <Link
        href="/admin/laporan/audit-logs"
        className="mt-4 inline-block text-sm font-medium text-amber-600 hover:text-amber-700"
      >
        Lihat semua aktivitas →
      </Link>
    </div>
  );
}