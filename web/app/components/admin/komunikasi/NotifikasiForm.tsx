"use client";

import { useState } from "react";
import { TIPE_NOTIF_OPTIONS, usersSeed, type Notifikasi, type TipeNotif } from "./dummy";

export type NotifikasiFormValues = {
  user_id: string;
  judul: string;
  pesan: string;
  tipe_notif: TipeNotif;
  data_referensi: string;
};

const EMPTY: NotifikasiFormValues = {
  user_id: usersSeed[0]?.id ?? "",
  judul: "",
  pesan: "",
  tipe_notif: "Sistem",
  data_referensi: "",
};

function toFormValues(initial?: Notifikasi | null): NotifikasiFormValues {
  return initial
    ? {
        user_id: initial.user_id,
        judul: initial.judul,
        pesan: initial.pesan,
        tipe_notif: initial.tipe_notif,
        data_referensi: initial.data_referensi,
      }
    : EMPTY;
}

export default function NotifikasiForm({
  initial,
  onSubmit,
  formId,
}: {
  initial?: Notifikasi | null;
  onSubmit: (values: NotifikasiFormValues) => void;
  formId: string;
}) {
  const [values, setValues] = useState<NotifikasiFormValues>(() => toFormValues(initial));
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!values.judul.trim() || !values.pesan.trim()) {
      setError("Judul dan pesan wajib diisi.");
      return;
    }
    if (values.data_referensi.trim()) {
      try {
        JSON.parse(values.data_referensi);
      } catch {
        setError("Data referensi harus berupa JSON yang valid, atau kosongkan.");
        return;
      }
    }
    onSubmit(values);
  }

  return (
    <form id={formId} onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Penerima</label>
        <select
          value={values.user_id}
          onChange={(e) => setValues((v) => ({ ...v, user_id: e.target.value }))}
          className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        >
          {usersSeed.map((u) => (
            <option key={u.id} value={u.id}>
              {u.email}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Tipe Notifikasi</label>
        <div className="grid grid-cols-4 gap-2">
          {TIPE_NOTIF_OPTIONS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setValues((v) => ({ ...v, tipe_notif: t }))}
              className={`rounded-lg border px-2 py-2 text-xs font-medium transition-colors ${
                values.tipe_notif === t
                  ? "border-amber-400 bg-amber-50 text-amber-700"
                  : "border-zinc-200 text-zinc-600 hover:bg-zinc-50"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Judul</label>
        <input
          type="text"
          value={values.judul}
          onChange={(e) => setValues((v) => ({ ...v, judul: e.target.value }))}
          placeholder="cth. Jadwal Sesi Besok"
          className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Pesan</label>
        <textarea
          value={values.pesan}
          onChange={(e) => setValues((v) => ({ ...v, pesan: e.target.value }))}
          rows={3}
          placeholder="Isi pesan notifikasi"
          className="w-full resize-none rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">
          Data Referensi (JSON, opsional)
        </label>
        <textarea
          value={values.data_referensi}
          onChange={(e) => setValues((v) => ({ ...v, data_referensi: e.target.value }))}
          rows={2}
          placeholder='cth. {"tagihan_id":"tg-5"}'
          className="w-full resize-none rounded-lg border border-zinc-200 px-3 py-2 font-mono text-xs outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        />
        <p className="mt-1 text-xs text-zinc-400">
          Dipakai aplikasi untuk deep-link ke halaman terkait (opsional).
        </p>
      </div>
    </form>
  );
}