"use client";

import { useState } from "react";
import { HARI_OPTIONS, type Hari, type SlotKetersediaan } from "./dummy";

export type SlotFormValues = {
  hari: Hari;
  jamMulai: string;
  jamSelesai: string;
};

const EMPTY: SlotFormValues = { hari: "Senin", jamMulai: "15:00", jamSelesai: "18:00" };

function toFormValues(initial?: SlotKetersediaan | null): SlotFormValues {
  return initial
    ? { hari: initial.hari, jamMulai: initial.jamMulai, jamSelesai: initial.jamSelesai }
    : EMPTY;
}

export default function SlotForm({
  initial,
  onSubmit,
  formId,
}: {
  initial?: SlotKetersediaan | null;
  onSubmit: (values: SlotFormValues) => void;
  formId: string;
}) {
  const [values, setValues] = useState<SlotFormValues>(() => toFormValues(initial));
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (values.jamMulai >= values.jamSelesai) {
      setError("Jam mulai harus lebih awal dari jam selesai.");
      return;
    }
    onSubmit(values);
  }

  return (
    <form id={formId} onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Hari</label>
        <select
          value={values.hari}
          onChange={(e) => setValues((v) => ({ ...v, hari: e.target.value as Hari }))}
          className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        >
          {HARI_OPTIONS.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">Jam Mulai</label>
          <input
            type="time"
            value={values.jamMulai}
            onChange={(e) => setValues((v) => ({ ...v, jamMulai: e.target.value }))}
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">Jam Selesai</label>
          <input
            type="time"
            value={values.jamSelesai}
            onChange={(e) => setValues((v) => ({ ...v, jamSelesai: e.target.value }))}
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </div>
      </div>
    </form>
  );
}
