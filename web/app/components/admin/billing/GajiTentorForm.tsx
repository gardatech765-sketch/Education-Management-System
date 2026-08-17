"use client";

import { useMemo, useState } from "react";
import {
  STATUS_GAJI_OPTIONS,
  formatRupiah,
  profilTentorSeed,
  totalTerima,
  type GajiTentor,
  type StatusGaji,
} from "./dummy";

export type GajiTentorFormValues = {
  tentor_id: string;
  periode_bulan: string;
  total_sesi: number;
  total_honor: number;
  bonus_tambahan: number;
  potongan_denda: number;
  status_gaji: StatusGaji;
  metode_transfer: string;
};

const EMPTY: GajiTentorFormValues = {
  tentor_id: profilTentorSeed[0]?.id ?? "",
  periode_bulan: "",
  total_sesi: 0,
  total_honor: 0,
  bonus_tambahan: 0,
  potongan_denda: 0,
  status_gaji: "Draft",
  metode_transfer: "",
};

function toFormValues(initial?: GajiTentor | null): GajiTentorFormValues {
  return initial
    ? {
        tentor_id: initial.tentor_id,
        periode_bulan: initial.periode_bulan,
        total_sesi: initial.total_sesi,
        total_honor: initial.total_honor,
        bonus_tambahan: initial.bonus_tambahan,
        potongan_denda: initial.potongan_denda,
        status_gaji: initial.status_gaji,
        metode_transfer: initial.metode_transfer,
      }
    : EMPTY;
}

export default function GajiTentorForm({
  initial,
  onSubmit,
  formId,
}: {
  initial?: GajiTentor | null;
  onSubmit: (values: GajiTentorFormValues) => void;
  formId: string;
}) {
  const [values, setValues] = useState<GajiTentorFormValues>(() => toFormValues(initial));
  const [error, setError] = useState<string | null>(null);

  const preview = useMemo(() => totalTerima(values), [values]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (values.total_honor < 0) {
      setError("Total honor tidak boleh negatif.");
      return;
    }
    onSubmit(values);
  }

  return (
    <form id={formId} onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <div className="grid grid-cols-2 gap-3">
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
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">
            Periode Bulan
          </label>
          <input
            type="text"
            value={values.periode_bulan}
            onChange={(e) => setValues((v) => ({ ...v, periode_bulan: e.target.value }))}
            placeholder="cth. Agustus 2025"
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">
            Total Sesi
          </label>
          <input
            type="number"
            min={0}
            value={values.total_sesi}
            onChange={(e) => setValues((v) => ({ ...v, total_sesi: Number(e.target.value) }))}
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">
            Total Honor (Rp)
          </label>
          <input
            type="number"
            min={0}
            value={values.total_honor}
            onChange={(e) => setValues((v) => ({ ...v, total_honor: Number(e.target.value) }))}
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">
            Bonus Tambahan (Rp)
          </label>
          <input
            type="number"
            min={0}
            value={values.bonus_tambahan}
            onChange={(e) =>
              setValues((v) => ({ ...v, bonus_tambahan: Number(e.target.value) }))
            }
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">
            Potongan/Denda (Rp)
          </label>
          <input
            type="number"
            min={0}
            value={values.potongan_denda}
            onChange={(e) =>
              setValues((v) => ({ ...v, potongan_denda: Number(e.target.value) }))
            }
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </div>
      </div>

      <div className="rounded-lg bg-amber-50 px-3 py-2.5">
        <p className="text-xs text-amber-700">Total Diterima (otomatis)</p>
        <p className="text-lg font-bold text-amber-800">{formatRupiah(preview)}</p>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">
          Status Penggajian
        </label>
        <div className="grid grid-cols-3 gap-2">
          {STATUS_GAJI_OPTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setValues((v) => ({ ...v, status_gaji: s }))}
              className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                values.status_gaji === s
                  ? "border-amber-400 bg-amber-50 text-amber-700"
                  : "border-zinc-200 text-zinc-600 hover:bg-zinc-50"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">
          Metode Transfer
        </label>
        <input
          type="text"
          value={values.metode_transfer}
          onChange={(e) => setValues((v) => ({ ...v, metode_transfer: e.target.value }))}
          placeholder="cth. Transfer Bank (opsional sampai gaji di-approve)"
          className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        />
      </div>
    </form>
  );
}