"use client";

import { useState } from "react";
import {
  STATUS_HADIR_OPTIONS,
  sesiLabel,
  sesiSelesaiSeed,
  type Presensi,
  type StatusHadir,
} from "./dummy";

export type PresensiFormValues = {
  sesi_id: string;
  waktu_checkin: string;
  waktu_checkout: string;
  status_hadir: StatusHadir;
  keterangan: string;
};

const EMPTY: PresensiFormValues = {
  sesi_id: sesiSelesaiSeed[0]?.id ?? "",
  waktu_checkin: "",
  waktu_checkout: "",
  status_hadir: "Hadir",
  keterangan: "",
};

function toFormValues(initial?: Presensi | null): PresensiFormValues {
  return initial
    ? {
        sesi_id: initial.sesi_id,
        waktu_checkin: initial.waktu_checkin,
        waktu_checkout: initial.waktu_checkout,
        status_hadir: initial.status_hadir,
        keterangan: initial.keterangan,
      }
    : EMPTY;
}

export default function PresensiForm({
  initial,
  onSubmit,
  formId,
}: {
  initial?: Presensi | null;
  onSubmit: (values: PresensiFormValues) => void;
  formId: string;
}) {
  const [values, setValues] = useState<PresensiFormValues>(() => toFormValues(initial));
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (
      (values.status_hadir === "Izin" || values.status_hadir === "Sakit" || values.status_hadir === "Alpa") &&
      !values.keterangan.trim()
    ) {
      setError("Keterangan wajib diisi untuk status selain Hadir.");
      return;
    }
    onSubmit(values);
  }

  return (
    <form id={formId} onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Sesi KBM</label>
        <select
          value={values.sesi_id}
          disabled={!!initial}
          onChange={(e) => setValues((v) => ({ ...v, sesi_id: e.target.value }))}
          className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 disabled:bg-zinc-50 disabled:text-zinc-400"
        >
          {sesiSelesaiSeed.map((s) => (
            <option key={s.id} value={s.id}>
              {sesiLabel(s.id)}
            </option>
          ))}
        </select>
        <p className="mt-1 text-xs text-zinc-400">
          Hanya sesi berstatus &quot;Done&quot; yang dapat direkap presensinya.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">
            Waktu Check-in
          </label>
          <input
            type="time"
            value={values.waktu_checkin}
            onChange={(e) => setValues((v) => ({ ...v, waktu_checkin: e.target.value }))}
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">
            Waktu Check-out
          </label>
          <input
            type="time"
            value={values.waktu_checkout}
            onChange={(e) => setValues((v) => ({ ...v, waktu_checkout: e.target.value }))}
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Status Hadir</label>
        <div className="grid grid-cols-4 gap-2">
          {STATUS_HADIR_OPTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setValues((v) => ({ ...v, status_hadir: s }))}
              className={`rounded-lg border px-2 py-2 text-xs font-medium transition-colors ${
                values.status_hadir === s
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
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Keterangan</label>
        <textarea
          value={values.keterangan}
          onChange={(e) => setValues((v) => ({ ...v, keterangan: e.target.value }))}
          rows={3}
          placeholder="cth. alasan izin/sakit, atau catatan koreksi presensi"
          className="w-full resize-none rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        />
      </div>

      <p className="rounded-lg bg-zinc-50 px-3 py-2 text-xs text-zinc-500">
        Data lokasi, foto, device, dan IP tercatat otomatis dari aplikasi mobile tutor dan hanya
        bisa dilihat di menu Detail — tidak dapat diedit manual dari admin panel.
      </p>
    </form>
  );
}
