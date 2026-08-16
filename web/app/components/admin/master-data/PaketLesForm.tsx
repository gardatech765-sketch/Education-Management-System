"use client";

import { useState } from "react";
import Toggle from "@/components/admin/ui/Toggle";
import type { PaketLes } from "./dummy";

export type PaketLesFormValues = {
  nama_paket: string;
  deskripsi: string;
  harga_dasar_ortu: number;
  harga_dasar_tentor: number;
  durasi_menit: number;
  minimal_sesi: number;
  is_active: boolean;
};

const EMPTY: PaketLesFormValues = {
  nama_paket: "",
  deskripsi: "",
  harga_dasar_ortu: 0,
  harga_dasar_tentor: 0,
  durasi_menit: 90,
  minimal_sesi: 1,
  is_active: true,
};

function toFormValues(initial?: PaketLes | null): PaketLesFormValues {
  return initial
    ? {
        nama_paket: initial.nama_paket,
        deskripsi: initial.deskripsi,
        harga_dasar_ortu: initial.harga_dasar_ortu,
        harga_dasar_tentor: initial.harga_dasar_tentor,
        durasi_menit: initial.durasi_menit,
        minimal_sesi: initial.minimal_sesi,
        is_active: initial.is_active,
      }
    : EMPTY;
}

export default function PaketLesForm({
  initial,
  onSubmit,
  formId,
}: {
  initial?: PaketLes | null;
  onSubmit: (values: PaketLesFormValues) => void;
  formId: string;
}) {
  const [values, setValues] = useState<PaketLesFormValues>(() => toFormValues(initial));
  const [error, setError] = useState<string | null>(null);


  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!values.nama_paket.trim()) {
      setError("Nama paket wajib diisi.");
      return;
    }
    if (values.harga_dasar_ortu <= 0) {
      setError("Harga dasar ortu harus lebih dari 0.");
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
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Nama Paket</label>
        <input
          type="text"
          value={values.nama_paket}
          onChange={(e) => setValues((v) => ({ ...v, nama_paket: e.target.value }))}
          placeholder="cth. Paket Reguler 4x"
          className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Deskripsi</label>
        <textarea
          value={values.deskripsi}
          onChange={(e) => setValues((v) => ({ ...v, deskripsi: e.target.value }))}
          rows={2}
          placeholder="Deskripsi singkat paket"
          className="w-full resize-none rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">
            Harga Dasar Ortu (Rp)
          </label>
          <input
            type="number"
            min={0}
            value={values.harga_dasar_ortu}
            onChange={(e) =>
              setValues((v) => ({ ...v, harga_dasar_ortu: Number(e.target.value) }))
            }
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">
            Honor Dasar Tentor (Rp)
          </label>
          <input
            type="number"
            min={0}
            value={values.harga_dasar_tentor}
            onChange={(e) =>
              setValues((v) => ({ ...v, harga_dasar_tentor: Number(e.target.value) }))
            }
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">
            Durasi (menit)
          </label>
          <input
            type="number"
            min={0}
            value={values.durasi_menit}
            onChange={(e) => setValues((v) => ({ ...v, durasi_menit: Number(e.target.value) }))}
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">
            Minimal Sesi
          </label>
          <input
            type="number"
            min={1}
            value={values.minimal_sesi}
            onChange={(e) => setValues((v) => ({ ...v, minimal_sesi: Number(e.target.value) }))}
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