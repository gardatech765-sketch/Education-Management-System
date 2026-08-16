import Link from "next/link";
import { todayClasses } from "./data";
import StatusBadge from "./StatusBadge";

export default function TodayClassesTable() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <h2 className="text-sm font-semibold text-zinc-900">Kelas Hari Ini</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-100 text-xs text-zinc-400">
              <th className="pb-3 pr-3 font-medium">Waktu</th>
              <th className="pb-3 pr-3 font-medium">Kelas</th>
              <th className="pb-3 pr-3 font-medium">Tutor</th>
              <th className="pb-3 pr-3 font-medium">Siswa</th>
              <th className="pb-3 pr-3 font-medium">Cabang</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {todayClasses.map((row, i) => (
              <tr key={i} className="border-b border-zinc-50 last:border-0">
                <td className="whitespace-nowrap py-3 pr-3 text-zinc-500">{row.waktu}</td>
                <td className="py-3 pr-3 font-medium text-zinc-800">{row.kelas}</td>
                <td className="py-3 pr-3 text-zinc-600">{row.tutor}</td>
                <td className="py-3 pr-3 text-zinc-600">{row.siswa}</td>
                <td className="py-3 pr-3 text-zinc-600">{row.cabang}</td>
                <td className="py-3">
                  <StatusBadge status={row.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link
        href="/admin/penjadwalan/kalender"
        className="mt-4 inline-block text-sm font-medium text-amber-600 hover:text-amber-700"
      >
        Lihat semua kelas hari ini →
      </Link>
    </div>
  );
}