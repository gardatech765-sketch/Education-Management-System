"use client";

import { useState } from "react";
import Toggle from "@/components/admin/ui/Toggle";
import { TIPE_NILAI_OPTIONS, type Pengaturan, type TipeNilai } from "./dummy";

export type PengaturanFormValues = {
  kunci: string;
  nilai: string;
  tipe: TipeNilai;
  deskripsi: string;
};

const EMPTY: PengaturanFormValues = {
  kunci: "",
  nilai: "",
  tipe: "String",
  deskripsi: "",
};

function toFormValues(initial?: Pengaturan | null): PengaturanFormValues {
  return initial
    ? { kunci: initial.kunci, nilai: initial.nilai, tipe: initial.tipe, deskripsi: initial.deskripsi }
    : EMPTY;
}

export default function PengaturanForm({
  initial,
  onSubmit,
  formId,
}: {
  initial?: Pengaturan | null;
  onSubmit: (values: PengaturanFormValues) => void;
  formId: string;
}) {
  const isEdit = !!initial;
  const [values, setValues] = useState<PengaturanFormValues>(() => toFormValues(initial));
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!values.kunci.trim()) {
      setError("Kunci wajib diisi.");
      return;
    }
    if (values.tipe === "JSON") {
      try {
        JSON.parse(values.nilai || "{}");
      } catch {
        setError("Nilai harus berupa JSON yang valid.");
        return;
      }
    }
    if ((values.tipe === "Integer" || values.tipe === "Decimal") && values.nilai.trim() === "") {
      setError("Nilai wajib diisi.");
      return;
    }
    onSubmit(values);
  }

  return (
    <form id={formId} onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Kunci</label>
        <input
          type="text"
          value={values.kunci}
          disabled={isEdit}
          onChange={(e) => setValues((v) => ({ ...v, kunci: e.target.value }))}
          placeholder="cth. biaya_platform_persen"
          className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 disabled:bg-zinc-50 disabled:text-zinc-400"
        />
        {isEdit && (
          <p className="mt-1 text-xs text-zinc-400">
            Kunci tidak bisa diubah setelah dibuat (dipakai kode di banyak tempat).
          </p>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Tipe Data</label>
        <div className="grid grid-cols-5 gap-1.5">
          {TIPE_NILAI_OPTIONS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setValues((v) => ({ ...v, tipe: t }))}
              className={`rounded-lg border px-1.5 py-2 text-[11px] font-medium transition-colors ${
                values.tipe === t
                  ? "border-amber-400 bg-amber-50 text-amber-700"
                  : "border-zinc-200 text-zinc-600 hover:bg-zinc-50"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Nilai</label>
        {values.tipe === "Boolean" ? (
          <div className="flex items-center justify-between rounded-lg border border-zinc-200 px-3 py-2.5">
            <span className="text-sm text-zinc-600">
              {values.nilai === "true" ? "Aktif (true)" : "Nonaktif (false)"}
            </span>
            <Toggle
              checked={values.nilai === "true"}
              onChange={(checked) =>
                setValues((v) => ({ ...v, nilai: checked ? "true" : "false" }))
              }
            />
          </div>
        ) : values.tipe === "JSON" ? (
          <textarea
            value={values.nilai}
            onChange={(e) => setValues((v) => ({ ...v, nilai: e.target.value }))}
            rows={4}
            placeholder='{"kunci":"nilai"}'
            className="w-full resize-none rounded-lg border border-zinc-200 px-3 py-2 font-mono text-xs outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        ) : values.tipe === "Integer" ? (
          <input
            type="number"
            step={1}
            value={values.nilai}
            onChange={(e) => setValues((v) => ({ ...v, nilai: e.target.value }))}
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        ) : values.tipe === "Decimal" ? (
          <input
            type="number"
            step={0.01}
            value={values.nilai}
            onChange={(e) => setValues((v) => ({ ...v, nilai: e.target.value }))}
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        ) : (
          <input
            type="text"
            value={values.nilai}
            onChange={(e) => setValues((v) => ({ ...v, nilai: e.target.value }))}
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Deskripsi</label>
        <textarea
          value={values.deskripsi}
          onChange={(e) => setValues((v) => ({ ...v, deskripsi: e.target.value }))}
          rows={2}
          placeholder="Kegunaan pengaturan ini"
          className="w-full resize-none rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        />
      </div>
    </form>
  );
}