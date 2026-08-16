import Link from "next/link";
import { recentPayments } from "./data";
import StatusBadge from "./StatusBadge";

export default function RecentPaymentsTable() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <h2 className="text-sm font-semibold text-zinc-900">Pembayaran Terbaru</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-100 text-xs text-zinc-400">
              <th className="pb-3 pr-3 font-medium">Invoice</th>
              <th className="pb-3 pr-3 font-medium">Siswa</th>
              <th className="pb-3 pr-3 font-medium">Tutor</th>
              <th className="pb-3 pr-3 font-medium">Jumlah</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentPayments.map((row) => (
              <tr key={row.invoice} className="border-b border-zinc-50 last:border-0">
                <td className="whitespace-nowrap py-3 pr-3 font-medium text-zinc-800">
                  {row.invoice}
                </td>
                <td className="py-3 pr-3 text-zinc-600">{row.siswa}</td>
                <td className="py-3 pr-3 text-zinc-600">{row.tutor}</td>
                <td className="whitespace-nowrap py-3 pr-3 text-zinc-600">{row.jumlah}</td>
                <td className="py-3">
                  <StatusBadge status={row.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link
        href="/admin/billing/pembayaran"
        className="mt-4 inline-block text-sm font-medium text-amber-600 hover:text-amber-700"
      >
        Lihat semua pembayaran →
      </Link>
    </div>
  );
}