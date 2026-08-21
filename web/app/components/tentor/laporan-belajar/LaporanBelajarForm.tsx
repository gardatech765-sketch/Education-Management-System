"use client";

import { useState } from "react";
import { AlertTriangle, Camera, CheckCircle2 } from "lucide-react";
import {
  STATUS_KEHADIRAN_OPTIONS,
  type EvaluasiAnak,
  type SesiLaporan,
  type StatusKehadiranAnak,
} from "./dummy";

export type LaporanFormValues = {
  materi: string;
  fotoDokumentasi: string;
  evaluasi: EvaluasiAnak[];
};

function buildEmptyEvaluasi(sesi: SesiLaporan): EvaluasiAnak[] {
  return sesi.siswaList.map((s) => ({ siswaId: s.id, status: "Hadir", nilai: "", catatan: "" }));
}

const STATUS_STYLE: Record<StatusKehadiranAnak, string> = {
  Hadir: "border-emerald-400 bg-emerald-50 text-emerald-700",
  Sakit: "border-amber-400 bg-amber-50 text-amber-700",
  Izin: "border-blue-400 bg-blue-50 text-blue-700",
  Alpa: "border-red-400 bg-red-50 text-red-700",
};

export default function LaporanBelajarForm({
  sesi,
  onSubmit,
  formId,
}: {
  sesi: SesiLaporan;
  onSubmit: (values: LaporanFormValues) => void;
  formId: string;
}) {
  const [materi, setMateri] = useState(sesi.materi);
  const [fotoDokumentasi, setFotoDokumentasi] = useState(sesi.fotoDokumentasi);
  const [evaluasi, setEvaluasi] = useState<EvaluasiAnak[]>(
    sesi.evaluasi.length > 0 ? sesi.evaluasi : buildEmptyEvaluasi(sesi)
  );
  const [error, setError] = useState<string | null>(null);

  const adaAlpa = evaluasi.some((e) => e.status === "Alpa");

  function updateEvaluasi(siswaId: string, patch: Partial<EvaluasiAnak>) {
    setEvaluasi((prev) => prev.map((e) => (e.siswaId === siswaId ? { ...e, ...patch } : e)));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!materi.trim()) {
      setError("Materi yang diajarkan wajib diisi.");
      return;
    }
    onSubmit({ materi, fotoDokumentasi, evaluasi });
  }

  return (
    <form id={formId} onSubmit={handleSubmit} className="space-y-6">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      {/* 4.1 Jurnal Kelas */}
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-400">
          Jurnal Kelas
        </p>

        <label className="mb-1.5 block text-sm font-medium text-zinc-700">
          Materi yang Diajarkan Hari Ini
        </label>
        <textarea
          value={materi}
          onChange={(e) => setMateri(e.target.value)}
          rows={3}
          placeholder="cth. Persamaan kuadrat dan pemfaktoran"
          className="w-full resize-none rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        />

        <label className="mb-1.5 mt-3 block text-sm font-medium text-zinc-700">
          Foto Dokumentasi KBM
        </label>
        <label className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-zinc-200 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50">
          <Camera className="h-4 w-4" />
          {fotoDokumentasi ? "Ganti Foto" : "Unggah Foto"}
          <input
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setFotoDokumentasi(file.name);
            }}
          />
        </label>
        {fotoDokumentasi && (
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-emerald-600">
            <CheckCircle2 className="h-3.5 w-3.5" />
            {fotoDokumentasi}
          </p>
        )}
      </div>

      {/* 4.2 Presensi & Evaluasi Individu */}
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-400">
          Presensi & Evaluasi Individu
        </p>

        {adaAlpa && (
          <div className="mb-3 flex items-start gap-2 rounded-lg bg-red-50 p-3 text-xs text-red-700">
            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>
              Ada siswa berstatus Alpa — notifikasi WhatsApp akan otomatis terkirim ke orang tua
              siswa tersebut setelah laporan disimpan.
            </span>
          </div>
        )}

        <div className="space-y-4">
          {sesi.siswaList.map((siswa) => {
            const ev = evaluasi.find((e) => e.siswaId === siswa.id)!;
            return (
              <div key={siswa.id} className="rounded-lg border border-zinc-200 p-3.5">
                <p className="text-sm font-semibold text-zinc-800">{siswa.nama}</p>

                <div className="mt-2 grid grid-cols-4 gap-1.5">
                  {STATUS_KEHADIRAN_OPTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => updateEvaluasi(siswa.id, { status: s })}
                      className={`rounded-lg border px-2 py-1.5 text-xs font-medium transition-colors ${
                        ev.status === s ? STATUS_STYLE[s] : "border-zinc-200 text-zinc-500 hover:bg-zinc-50"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={ev.nilai}
                    onChange={(e) => updateEvaluasi(siswa.id, { nilai: e.target.value })}
                    placeholder="Nilai (opsional)"
                    className="rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 sm:col-span-1"
                  />
                  <input
                    type="text"
                    value={ev.catatan}
                    onChange={(e) => updateEvaluasi(siswa.id, { catatan: e.target.value })}
                    placeholder="Catatan/kendala (opsional)"
                    className="rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 sm:col-span-2"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </form>
  );
}
