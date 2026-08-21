"use client";

import { useState } from "react";
import { kelasOptions } from "./dummy";

export type RescheduleFormValues = {
  kelasId: string;
  tanggalUsulan: string;
  jamUsulan: string;
  alasan: string;
};

const EMPTY: RescheduleFormValues = {
  kelasId: kelasOptions[0]?.id ?? "",
  tanggalUsulan: "",
  jamUsulan: "",
  alasan: "",
};

export default function RescheduleForm({
  onSubmit,
  formId,
}: {
  onSubmit: (values: RescheduleFormValues) => void;
  formId: string;
}) {
  const [values, setValues] = useState<RescheduleFormValues>(EMPTY);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!values.tanggalUsulan || !values.jamUsulan) {
      setError("Tanggal dan jam usulan wajib diisi.");
      return;
    }
    if (!values.alasan.trim()) {
      setError("Alasan wajib diisi.");
      return;
    }
    onSubmit(values);
  }

  return (
    <form id={formId} onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">
          Kelas yang Dibatalkan
        </label>
        <select
          value={values.kelasId}
          onChange={(e) => setValues((v) => ({ ...v, kelasId: e.target.value }))}
          className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        >
          {kelasOptions.map((k) => (
            <option key={k.id} value={k.id}>
              {k.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">
            Tanggal Usulan Pengganti
          </label>
          <input
            type="date"
            value={values.tanggalUsulan}
            onChange={(e) => setValues((v) => ({ ...v, tanggalUsulan: e.target.value }))}
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">Jam Usulan</label>
          <input
            type="text"
            value={values.jamUsulan}
            onChange={(e) => setValues((v) => ({ ...v, jamUsulan: e.target.value }))}
            placeholder="cth. 16:00 - 18:00"
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Alasan</label>
        <textarea
          value={values.alasan}
          onChange={(e) => setValues((v) => ({ ...v, alasan: e.target.value }))}
          rows={3}
          placeholder="cth. Sedang kurang sehat / ada keperluan mendadak"
          className="w-full resize-none rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        />
      </div>

      <p className="rounded-lg bg-blue-50 px-3 py-2 text-xs text-blue-700">
        Pengajuan ini akan menunggu persetujuan dari Admin dan Orang Tua siswa sebelum jadwal
        resmi berubah.
      </p>
    </form>
  );
}
