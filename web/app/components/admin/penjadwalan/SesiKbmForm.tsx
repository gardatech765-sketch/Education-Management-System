"use client";

import { useState } from "react";
import {
  STATUS_SESI_OPTIONS,
  kontrakLabel,
  kontrakLesSeed,
  type SesiKbm,
  type StatusSesi,
} from "./dummy";

export type SesiKbmFormValues = {
  kontrak_id: string;
  tanggal_sesi: string;
  jam_mulai_plan: string;
  jam_selesai_plan: string;
  status: StatusSesi;
  alasan_reschedule: string;
};

const EMPTY: SesiKbmFormValues = {
  kontrak_id: kontrakLesSeed[0]?.id ?? "",
  tanggal_sesi: new Date().toISOString().slice(0, 10),
  jam_mulai_plan: "15:00",
  jam_selesai_plan: "16:30",
  status: "Scheduled",
  alasan_reschedule: "",
};

function toFormValues(initial?: SesiKbm | null): SesiKbmFormValues {
  return initial
    ? {
        kontrak_id: initial.kontrak_id,
        tanggal_sesi: initial.tanggal_sesi,
        jam_mulai_plan: initial.jam_mulai_plan,
        jam_selesai_plan: initial.jam_selesai_plan,
        status: initial.status,
        alasan_reschedule: initial.alasan_reschedule,
      }
    : EMPTY;
}

export default function SesiKbmForm({
  initial,
  onSubmit,
  formId,
}: {
  initial?: SesiKbm | null;
  onSubmit: (values: SesiKbmFormValues) => void;
  formId: string;
}) {
  const [values, setValues] = useState<SesiKbmFormValues>(() => toFormValues(initial));
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (values.jam_mulai_plan >= values.jam_selesai_plan) {
      setError("Jam mulai harus lebih awal dari jam selesai.");
      return;
    }
    if (
      (values.status === "Rescheduled" || values.status === "Canceled") &&
      !values.alasan_reschedule.trim()
    ) {
      setError("Alasan wajib diisi untuk status Rescheduled/Canceled.");
      return;
    }
    onSubmit(values);
  }

  const needsReason = values.status === "Rescheduled" || values.status === "Canceled";

  return (
    <form id={formId} onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Kontrak Les</label>
        <select
          value={values.kontrak_id}
          onChange={(e) => setValues((v) => ({ ...v, kontrak_id: e.target.value }))}
          className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        >
          {kontrakLesSeed.map((k) => (
            <option key={k.id} value={k.id}>
              {kontrakLabel(k.id)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Tanggal Sesi</label>
        <input
          type="date"
          value={values.tanggal_sesi}
          onChange={(e) => setValues((v) => ({ ...v, tanggal_sesi: e.target.value }))}
          className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">Jam Mulai</label>
          <input
            type="time"
            value={values.jam_mulai_plan}
            onChange={(e) => setValues((v) => ({ ...v, jam_mulai_plan: e.target.value }))}
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">
            Jam Selesai
          </label>
          <input
            type="time"
            value={values.jam_selesai_plan}
            onChange={(e) => setValues((v) => ({ ...v, jam_selesai_plan: e.target.value }))}
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Status Sesi</label>
        <div className="grid grid-cols-3 gap-2">
          {STATUS_SESI_OPTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setValues((v) => ({ ...v, status: s }))}
              className={`rounded-lg border px-2 py-2 text-xs font-medium transition-colors ${
                values.status === s
                  ? "border-amber-400 bg-amber-50 text-amber-700"
                  : "border-zinc-200 text-zinc-600 hover:bg-zinc-50"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {needsReason && (
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">
            Alasan Reschedule/Pembatalan
          </label>
          <textarea
            value={values.alasan_reschedule}
            onChange={(e) => setValues((v) => ({ ...v, alasan_reschedule: e.target.value }))}
            rows={2}
            placeholder="cth. Siswa sakit, tutor berhalangan, dsb."
            className="w-full resize-none rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </div>
      )}
    </form>
  );
}