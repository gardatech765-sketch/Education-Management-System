import { GraduationCap, Info } from "lucide-react";
import Badge from "@/components/admin/ui/Badge";
import { mapelTersertifikasiSeed, type TingkatKeahlian } from "@/components/tentor/mata-pelajaran/dummy";

const KEAHLIAN_COLOR: Record<TingkatKeahlian, "zinc" | "amber" | "green"> = {
  Basic: "zinc",
  Intermediate: "amber",
  Expert: "green",
};

export default function MataPelajaranPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Mata Pelajaran</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Daftar mata pelajaran dan jenjang yang sudah disetujui Admin untuk Anda ajarkan.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {mapelTersertifikasiSeed.map((m) => (
          <div key={m.id} className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
              <GraduationCap className="h-5 w-5" strokeWidth={2} />
            </div>
            <p className="mt-3 text-base font-bold text-zinc-900">{m.namaMapel}</p>
            <p className="text-sm text-zinc-500">Jenjang {m.jenjang}</p>
            <div className="mt-3">
              <Badge color={KEAHLIAN_COLOR[m.tingkatKeahlian]}>{m.tingkatKeahlian}</Badge>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-start gap-2 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-800">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        <p>
          Daftar ini bersifat baca saja. Untuk menambah mata pelajaran baru atau mengubah
          tingkat keahlian, silakan hubungi Admin melalui menu Bantuan & Tiket.
        </p>
      </div>
    </div>
  );
}
