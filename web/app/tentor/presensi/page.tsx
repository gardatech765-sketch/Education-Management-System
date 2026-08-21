import { Info } from "lucide-react";
import CheckInFlow from "@/components/tentor/presensi/CheckInFlow";
import RiwayatPresensiTable from "@/components/tentor/presensi/RiwayatPresensiTable";

export default function PresensiPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Presensi</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Check-in dan check-out untuk sesi mengajar Anda hari ini.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RiwayatPresensiTable />
        </div>
        <CheckInFlow />
      </div>

      <div className="flex items-start gap-2 rounded-xl border border-amber-100 bg-amber-50 p-4 text-sm text-amber-800">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        <p>
          Deteksi lokasi & validasi GPS di sini masih simulasi untuk keperluan tampilan. Deteksi
          fake-GPS (is_mock_location) yang sesungguhnya perlu akses sensor native, biasanya lewat
          aplikasi mobile (bukan browser web biasa).
        </p>
      </div>
    </div>
  );
}
