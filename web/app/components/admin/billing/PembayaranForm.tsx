"use client";

import { useState } from "react";
import {
  METODE_BAYAR_OPTIONS,
  STATUS_VALIDASI_OPTIONS,
  tagihanLabel,
  tagihanOrtuSeed,
  type MetodeBayar,
  type Pembayaran,
  type StatusValidasi,
} from "./dummy";

export type PembayaranFormValues = {
  tagihan_id: string;
  tanggal_bayar: string;
  metode_bayar: MetodeBayar;
  referensi_gateway: string;
  nominal_bayar: number;
  status_validasi: StatusValidasi;
  catatan_admin: string;
};

const EMPTY: PembayaranFormValues = {
  tagihan_id: tagihanOrtuSeed[0]?.id ?? "",
  tanggal_bayar: new Date().toISOString().slice(0, 10),
  metode_bayar: "Transfer",
  referensi_gateway: "",
  nominal_bayar: 0,
  status_validasi: "Pending",
  catatan_admin: "",
};

function toFormValues(initial?: Pembayaran | null): PembayaranFormValues {
  return initial
    ? {
        tagihan_id: initial.tagihan_id,
        tanggal_bayar: initial.tanggal_bayar,
        metode_bayar: initial.metode_bayar,
        referensi_gateway: initial.referensi_gateway,
        nominal_bayar: initial.nominal_bayar,
        status_validasi: initial.status_validasi,
        catatan_admin: initial.catatan_admin,
      }
    : EMPTY;
}

export default function PembayaranForm({
  initial,
  onSubmit,
  formId,
}: {
  initial?: Pembayaran | null;
  onSubmit: (values: PembayaranFormValues) => void;
  formId: string;
}) {
  const [values, setValues] = useState<PembayaranFormValues>(() => toFormValues(initial));
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (values.nominal_bayar <= 0) {
      setError("Nominal pembayaran harus lebih dari 0.");
      return;
    }
    onSubmit(values);
  }

  return (
    <form id={formId} onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Invoice</label>
        <select
          value={values.tagihan_id}
          onChange={(e) => setValues((v) => ({ ...v, tagihan_id: e.target.value }))}
          className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        >
          {tagihanOrtuSeed.map((t) => (
            <option key={t.id} value={t.id}>
              {tagihanLabel(t.id)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">
            Tanggal Bayar
          </label>
          <input
            type="date"
            value={values.tanggal_bayar}
            onChange={(e) => setValues((v) => ({ ...v, tanggal_bayar: e.target.value }))}
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">
            Metode Bayar
          </label>
          <select
            value={values.metode_bayar}
            onChange={(e) =>
              setValues((v) => ({ ...v, metode_bayar: e.target.value as MetodeBayar }))
            }
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          >
            {METODE_BAYAR_OPTIONS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">
            Nominal Bayar (Rp)
          </label>
          <input
            type="number"
            min={0}
            value={values.nominal_bayar}
            onChange={(e) =>
              setValues((v) => ({ ...v, nominal_bayar: Number(e.target.value) }))
            }
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">
            Referensi Gateway
          </label>
          <input
            type="text"
            value={values.referensi_gateway}
            onChange={(e) => setValues((v) => ({ ...v, referensi_gateway: e.target.value }))}
            placeholder="cth. TRX-88213 (opsional)"
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">
          Status Validasi
        </label>
        <div className="grid grid-cols-3 gap-2">
          {STATUS_VALIDASI_OPTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setValues((v) => ({ ...v, status_validasi: s }))}
              className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                values.status_validasi === s
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
          Catatan Admin
        </label>
        <textarea
          value={values.catatan_admin}
          onChange={(e) => setValues((v) => ({ ...v, catatan_admin: e.target.value }))}
          rows={2}
          placeholder="Catatan tambahan (opsional)"
          className="w-full resize-none rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        />
      </div>

      <div className="rounded-lg border border-dashed border-zinc-200 p-3">
        <p className="text-xs font-medium text-zinc-500">
          Upload bukti bayar akan bisa dilakukan setelah modul ini disambungkan ke
          backend/storage.
        </p>
      </div>
    </form>
  );
}