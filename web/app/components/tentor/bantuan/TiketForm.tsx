"use client";

import { useState } from "react";
import { KATEGORI_TIKET_OPTIONS, type KategoriTiket } from "./dummy";

export type TiketFormValues = {
  subjek: string;
  kategori: KategoriTiket;
  deskripsi: string;
};

const EMPTY: TiketFormValues = { subjek: "", kategori: "Lainnya", deskripsi: "" };

export default function TiketForm({
  onSubmit,
  formId,
}: {
  onSubmit: (values: TiketFormValues) => void;
  formId: string;
}) {
  const [values, setValues] = useState<TiketFormValues>(EMPTY);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!values.subjek.trim() || !values.deskripsi.trim()) {
      setError("Subjek dan deskripsi wajib diisi.");
      return;
    }
    onSubmit(values);
  }

  return (
    <form id={formId} onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Subjek</label>
        <input
          type="text"
          value={values.subjek}
          onChange={(e) => setValues((v) => ({ ...v, subjek: e.target.value }))}
          placeholder="cth. Uang bensin kurang sesuai"
          className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Kategori</label>
        <select
          value={values.kategori}
          onChange={(e) => setValues((v) => ({ ...v, kategori: e.target.value as KategoriTiket }))}
          className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        >
          {KATEGORI_TIKET_OPTIONS.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Deskripsi</label>
        <textarea
          value={values.deskripsi}
          onChange={(e) => setValues((v) => ({ ...v, deskripsi: e.target.value }))}
          rows={4}
          placeholder="Jelaskan kendala atau pertanyaan Anda secara detail"
          className="w-full resize-none rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        />
      </div>
    </form>
  );
}
