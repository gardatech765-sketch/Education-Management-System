"use client";

import { useState } from "react";
import { STATUS_BAYAR_OPTIONS, profilOrtuSeed, type StatusBayar, type TagihanOrtu } from "./dummy";

export type TagihanOrtuFormValues = {
  ortu_id: string;
  no_invoice: string;
  periode_bulan: string;
  total_sesi: number;
  total_tagihan: number;
  status_bayar: StatusBayar;
  jatuh_tempo: string;
};

const EMPTY: TagihanOrtuFormValues = {
  ortu_id: profilOrtuSeed[0]?.id ?? "",
  no_invoice: "",
  periode_bulan: "",
  total_sesi: 4,
  total_tagihan: 0,
  status_bayar: "Unpaid",
  jatuh_tempo: new Date().toISOString().slice(0, 10),
};

function toFormValues(initial?: TagihanOrtu | null): TagihanOrtuFormValues {
  return initial
    ? {
        ortu_id: initial.ortu_id,
        no_invoice: initial.no_invoice,
        periode_bulan: initial.periode_bulan,
        total_sesi: initial.total_sesi,
        total_tagihan: initial.total_tagihan,
        status_bayar: initial.status_bayar,
        jatuh_tempo: initial.jatuh_tempo,
      }
    : EMPTY;
}

export default function TagihanOrtuForm({
  initial,
  onSubmit,
  formId,
}: {
  initial?: TagihanOrtu | null;
  onSubmit: (values: TagihanOrtuFormValues) => void;
  formId: string;
}) {
  const [values, setValues] = useState<TagihanOrtuFormValues>(() => toFormValues(initial));
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!values.no_invoice.trim()) {
      setError("Nomor invoice wajib diisi.");
      return;
    }
    if (values.total_tagihan <= 0) {
      setError("Total tagihan harus lebih dari 0.");
      return;
    }
    onSubmit(values);
  }

  return (
    <form id={formId} onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Orang Tua</label>
        <select
          value={values.ortu_id}
          onChange={(e) => setValues((v) => ({ ...v, ortu_id: e.target.value }))}
          className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        >
          {profilOrtuSeed.map((o) => (
            <option key={o.id} value={o.id}>
              {o.nama_wali}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">
            No. Invoice
          </label>
          <input
            type="text"
            value={values.no_invoice}
            onChange={(e) => setValues((v) => ({ ...v, no_invoice: e.target.value }))}
            placeholder="cth. INV-2025-006"
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
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
            Total Tagihan (Rp)
          </label>
          <input
            type="number"
            min={0}
            value={values.total_tagihan}
            onChange={(e) =>
              setValues((v) => ({ ...v, total_tagihan: Number(e.target.value) }))
            }
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Jatuh Tempo</label>
        <input
          type="date"
          value={values.jatuh_tempo}
          onChange={(e) => setValues((v) => ({ ...v, jatuh_tempo: e.target.value }))}
          className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">
          Status Pembayaran
        </label>
        <div className="grid grid-cols-3 gap-2">
          {STATUS_BAYAR_OPTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setValues((v) => ({ ...v, status_bayar: s }))}
              className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                values.status_bayar === s
                  ? "border-amber-400 bg-amber-50 text-amber-700"
                  : "border-zinc-200 text-zinc-600 hover:bg-zinc-50"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-dashed border-zinc-200 p-3">
        <p className="text-xs font-medium text-zinc-500">
          Rincian sesi per siswa & item tambahan/potongan (detail_tagihan, item_tagihan) akan
          bisa diisi lewat halaman detail invoice setelah modul ini disambungkan ke backend.
        </p>
      </div>
    </form>
  );
}