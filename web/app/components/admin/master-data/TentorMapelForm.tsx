"use client";

import { useState } from "react";
import Toggle from "@/components/admin/ui/Toggle";
import {
  TINGKAT_KEAHLIAN_OPTIONS,
  mataPelajaranSeed,
  tentorOptions,
  type TentorMapel,
  type TingkatKeahlian,
} from "./dummy";

export type TentorMapelFormValues = {
  tentor_id: string;
  mapel_id: string;
  tingkat_keahlian: TingkatKeahlian | null;
  is_active: boolean;
};

const EMPTY: TentorMapelFormValues = {
  tentor_id: tentorOptions[0]?.id ?? "",
  mapel_id: mataPelajaranSeed[0]?.id ?? "",
  tingkat_keahlian: null,
  is_active: true,
};

function toFormValues(initial?: TentorMapel | null): TentorMapelFormValues {
  return initial
    ? {
        tentor_id: initial.tentor_id,
        mapel_id: initial.mapel_id,
        tingkat_keahlian: initial.tingkat_keahlian,
        is_active: initial.is_active,
      }
    : EMPTY;
}

export default function TentorMapelForm({
  initial,
  onSubmit,
  formId,
}: {
  initial?: TentorMapel | null;
  onSubmit: (values: TentorMapelFormValues) => void;
  formId: string;
}) {
  const [values, setValues] = useState<TentorMapelFormValues>(() => toFormValues(initial));
  const [error, setError] = useState<string | null>(null);


  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!values.tentor_id || !values.mapel_id) {
      setError("Tentor dan mata pelajaran wajib dipilih.");
      return;
    }
    onSubmit(values);
  }

  return (
    <form id={formId} onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      )}

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Tentor</label>
        <select
          value={values.tentor_id}
          onChange={(e) => setValues((v) => ({ ...v, tentor_id: e.target.value }))}
          className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        >
          {tentorOptions.map((t) => (
            <option key={t.id} value={t.id}>
              {t.nama}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Mata Pelajaran</label>
        <select
          value={values.mapel_id}
          onChange={(e) => setValues((v) => ({ ...v, mapel_id: e.target.value }))}
          className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        >
          {mataPelajaranSeed.map((m) => (
            <option key={m.id} value={m.id}>
              {m.nama_mapel} ({m.jenjang})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">
          Tingkat Keahlian
        </label>
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => setValues((v) => ({ ...v, tingkat_keahlian: null }))}
            className={`w-full rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
              values.tingkat_keahlian === null
                ? "border-amber-400 bg-amber-50 text-amber-700"
                : "border-zinc-200 text-zinc-600 hover:bg-zinc-50"
            }`}
          >
            Belum Ditentukan
          </button>
          <div className="grid grid-cols-3 gap-2">
            {TINGKAT_KEAHLIAN_OPTIONS.map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setValues((v) => ({ ...v, tingkat_keahlian: level }))}
                className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                  values.tingkat_keahlian === level
                    ? "border-amber-400 bg-amber-50 text-amber-700"
                    : "border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-lg border border-zinc-200 px-3 py-2.5">
        <span className="text-sm font-medium text-zinc-700">Status Aktif</span>
        <Toggle
          checked={values.is_active}
          onChange={(v) => setValues((prev) => ({ ...prev, is_active: v }))}
        />
      </div>
    </form>
  );
}