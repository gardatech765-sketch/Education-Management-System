"use client";

import { useState } from "react";
import Toggle from "@/components/admin/ui/Toggle";
import { HARI_OPTIONS, profilTentorSeed, type Hari, type KetersediaanTentor } from "./dummy";

export type KetersediaanFormValues = {
  tentor_id: string;
  hari: Hari;
  jam_mulai: string;
  jam_selesai: string;
  is_active: boolean;
};

const EMPTY: KetersediaanFormValues = {
  tentor_id: profilTentorSeed[0]?.id ?? "",
  hari: "Senin",
  jam_mulai: "15:00",
  jam_selesai: "18:00",
  is_active: true,
};

function toFormValues(initial?: KetersediaanTentor | null): KetersediaanFormValues {
  return initial
    ? {
        tentor_id: initial.tentor_id,
        hari: initial.hari,
        jam_mulai: initial.jam_mulai,
        jam_selesai: initial.jam_selesai,
        is_active: initial.is_active,
      }
    : EMPTY;
}

export default function KetersediaanForm({
  initial,
  onSubmit,
  formId,
}: {
  initial?: KetersediaanTentor | null;
  onSubmit: (values: KetersediaanFormValues) => void;
  formId: string;
}) {
  const [values, setValues] = useState<KetersediaanFormValues>(() => toFormValues(initial));
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (values.jam_mulai >= values.jam_selesai) {
      setError("Jam mulai harus lebih awal dari jam selesai.");
      return;
    }
    onSubmit(values);
  }

  return (
    <form id={formId} onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Tentor</label>
        <select
          value={values.tentor_id}
          onChange={(e) => setValues((v) => ({ ...v, tentor_id: e.target.value }))}
          className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        >
          {profilTentorSeed.map((t) => (
            <option key={t.id} value={t.id}>
              {t.nama_lengkap}
            </option>
          ))}
        </select>
      </div>

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
            value={values.jam_mulai}
            onChange={(e) => setValues((v) => ({ ...v, jam_mulai: e.target.value }))}
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">
            Jam Selesai
          </label>
          <input
            type="time"
            value={values.jam_selesai}
            onChange={(e) => setValues((v) => ({ ...v, jam_selesai: e.target.value }))}
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
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