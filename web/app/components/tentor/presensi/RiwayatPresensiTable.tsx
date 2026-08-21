import Badge from "@/components/admin/ui/Badge";
import { riwayatPresensiSeed } from "./dummy";

export default function RiwayatPresensiTable() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <h2 className="text-sm font-semibold text-zinc-900">Riwayat Presensi</h2>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-100 text-xs text-zinc-400">
              <th className="pb-3 pr-3 font-medium">Tanggal</th>
              <th className="pb-3 pr-3 font-medium">Kelas</th>
              <th className="pb-3 pr-3 font-medium">Check-In</th>
              <th className="pb-3 pr-3 font-medium">Check-Out</th>
              <th className="pb-3 pr-3 font-medium">Jarak</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {riwayatPresensiSeed.map((row) => (
              <tr key={row.id} className="border-b border-zinc-50 last:border-0">
                <td className="whitespace-nowrap py-3 pr-3 text-zinc-500">{row.tanggal}</td>
                <td className="py-3 pr-3 font-medium text-zinc-800">{row.kelas}</td>
                <td className="whitespace-nowrap py-3 pr-3 text-zinc-600">{row.checkIn}</td>
                <td className="whitespace-nowrap py-3 pr-3 text-zinc-600">{row.checkOut}</td>
                <td className="whitespace-nowrap py-3 pr-3 text-zinc-500">{row.jarakMeter}m</td>
                <td className="py-3">
                  <Badge color={row.status === "Hadir" ? "green" : "red"}>{row.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
