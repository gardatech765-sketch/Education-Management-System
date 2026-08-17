"use client";

import { useState } from "react";
import { sesiLabel, sesiSelesaiSeed, type LaporanBelajar } from "./dummy";

export type LaporanBelajarFormValues = {
  sesi_id: string;
  materi: string;
  sub_materi: string;
  kendala_siswa: string;
  pr_diberikan: string;
  nilai_harian: number | null;
  catatan_tentor: string;
  is_read_by_ortu: boolean;
};

const EMPTY: LaporanBelajarFormValues = {
  sesi_id: sesiSelesaiSeed[0]?.id ?? "",
  materi: "",
  sub_materi: "",
  kendala_siswa: "",
  pr_diberikan: "",
  nilai_harian: null,
  catatan_tentor: "",
  is_read_by_ortu: false,
};

function toFormValues(initial?: LaporanBelajar | null): LaporanBelajarFormValues {
  return initial
    ? {
        sesi_id: initial.sesi_id,
        materi: initial.materi,
        sub_materi: initial.sub_materi,
        kendala_siswa: initial.kendala_siswa,
        pr_diberikan: initial.pr_diberikan,
        nilai_harian: initial.nilai_harian,
        catatan_tentor: initial.catatan_tentor,
        is_read_by_ortu: initial.is_read_by_ortu,
      }
    : EMPTY;
}

export default function LaporanBelajarForm({
  initial,
  onSubmit,
  formId,
}: {
  initial?: LaporanBelajar | null;
  onSubmit: (values: LaporanBelajarFormValues) => void;
  formId: string;
}) {
  const [values, setValues] = useState<LaporanBelajarFormValues>(() => toFormValues(initial));
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!values.materi.trim()) {
      setError("Materi wajib diisi.");
      return;
    }
    if (values.nilai_harian !== null && (values.nilai_harian < 0 || values.nilai_harian > 100)) {
      setError("Nilai harian harus di antara 0–100.");
      return;
    }
    onSubmit(values);
  }

  return (
    <form id={formId} onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Sesi KBM</label>
        <select
          value={values.sesi_id}
          disabled={!!initial}
          onChange={(e) => setValues((v) => ({ ...v, sesi_id: e.target.value }))}
          className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 disabled:bg-zinc-50 disabled:text-zinc-400"
        >
          {sesiSelesaiSeed.map((s) => (
            <option key={s.id} value={s.id}>
              {sesiLabel(s.id)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">Materi</label>
          <input
            type="text"
            value={values.materi}
            onChange={(e) => setValues((v) => ({ ...v, materi: e.target.value }))}
            placeholder="cth. Persamaan Kuadrat"
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">Sub Materi</label>
          <input
            type="text"
            value={values.sub_materi}
            onChange={(e) => setValues((v) => ({ ...v, sub_materi: e.target.value }))}
            placeholder="cth. Pemfaktoran & rumus ABC"
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">
          Kendala Siswa
        </label>
        <textarea
          value={values.kendala_siswa}
          onChange={(e) => setValues((v) => ({ ...v, kendala_siswa: e.target.value }))}
          rows={2}
          placeholder="Kesulitan yang ditemui siswa saat sesi berlangsung"
          className="w-full resize-none rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">PR Diberikan</label>
        <textarea
          value={values.pr_diberikan}
          onChange={(e) => setValues((v) => ({ ...v, pr_diberikan: e.target.value }))}
          rows={2}
          placeholder="Tugas/latihan yang diberikan untuk di rumah"
          className="w-full resize-none rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">
            Nilai Harian (opsional)
          </label>
          <input
            type="number"
            min={0}
            max={100}
            value={values.nilai_harian ?? ""}
            onChange={(e) =>
              setValues((v) => ({
                ...v,
                nilai_harian: e.target.value === "" ? null : Number(e.target.value),
              }))
            }
            placeholder="0–100"
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </div>
        <div className="flex items-end pb-2">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-700">
            <input
              type="checkbox"
              checked={values.is_read_by_ortu}
              onChange={(e) => setValues((v) => ({ ...v, is_read_by_ortu: e.target.checked }))}
              className="h-4 w-4 rounded border-zinc-300 text-amber-500 focus:ring-amber-400"
            />
            Sudah dibaca orang tua
          </label>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">
          Catatan Tentor
        </label>
        <textarea
          value={values.catatan_tentor}
          onChange={(e) => setValues((v) => ({ ...v, catatan_tentor: e.target.value }))}
          rows={2}
          placeholder="Catatan tambahan tentor untuk sesi berikutnya"
          className="w-full resize-none rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        />
      </div>
    </form>
  );
}
