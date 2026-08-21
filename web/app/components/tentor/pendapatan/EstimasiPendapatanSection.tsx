import { formatRupiah, sesiUnpaidSeed } from "./dummy";

export default function EstimasiPendapatanSection() {
  const totalHonor = sesiUnpaidSeed.reduce((sum, s) => sum + s.honorMengajar, 0);
  const totalTransport = sesiUnpaidSeed.reduce((sum, s) => sum + s.uangTransport, 0);
  const totalEstimasi = totalHonor + totalTransport;

  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-amber-50 p-5">
        <p className="text-xs font-medium text-amber-700">
          Total Estimasi Pendapatan (Belum Dibayar)
        </p>
        <p className="mt-1 text-3xl font-bold text-amber-800">{formatRupiah(totalEstimasi)}</p>
        <div className="mt-4 grid grid-cols-2 gap-4 border-t border-amber-200 pt-4 text-sm">
          <div>
            <p className="text-zinc-500">Honor Mengajar</p>
            <p className="font-semibold text-zinc-800">{formatRupiah(totalHonor)}</p>
          </div>
          <div>
            <p className="text-zinc-500">Uang Transport</p>
            <p className="font-semibold text-zinc-800">{formatRupiah(totalTransport)}</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-zinc-900">
          Rincian Sesi Belum Dibayar ({sesiUnpaidSeed.length} sesi)
        </h2>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-100 text-xs text-zinc-400">
                <th className="pb-3 pr-3 font-medium">Tanggal</th>
                <th className="pb-3 pr-3 font-medium">Kelas</th>
                <th className="pb-3 pr-3 font-medium">Honor Mengajar</th>
                <th className="pb-3 font-medium">Uang Transport</th>
              </tr>
            </thead>
            <tbody>
              {sesiUnpaidSeed.map((s) => (
                <tr key={s.id} className="border-b border-zinc-50 last:border-0">
                  <td className="whitespace-nowrap py-3 pr-3 text-zinc-500">{s.tanggal}</td>
                  <td className="py-3 pr-3 font-medium text-zinc-800">{s.kelas}</td>
                  <td className="whitespace-nowrap py-3 pr-3 text-zinc-700">
                    {formatRupiah(s.honorMengajar)}
                  </td>
                  <td className="whitespace-nowrap py-3 text-zinc-500">
                    {s.uangTransport > 0 ? formatRupiah(s.uangTransport) : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
