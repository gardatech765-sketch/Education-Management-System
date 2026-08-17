"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { ortuOfSesi, profilOrtuSeed, sesiLabel, sesiSelesaiSeed, type RatingTentor } from "./dummy";

export type RatingTentorFormValues = {
  sesi_id: string;
  ortu_id: string;
  skor_bintang: number;
  ulasan_teks: string;
  is_active: boolean;
};

function defaultValues(): RatingTentorFormValues {
  const sesiId = sesiSelesaiSeed[0]?.id ?? "";
  return {
    sesi_id: sesiId,
    ortu_id: ortuOfSesi(sesiId)?.id ?? profilOrtuSeed[0]?.id ?? "",
    skor_bintang: 5,
    ulasan_teks: "",
    is_active: true,
  };
}

function toFormValues(initial?: RatingTentor | null): RatingTentorFormValues {
  return initial
    ? {
        sesi_id: initial.sesi_id,
        ortu_id: initial.ortu_id,
        skor_bintang: initial.skor_bintang,
        ulasan_teks: initial.ulasan_teks,
        is_active: initial.is_active,
      }
    : defaultValues();
}

export default function RatingTentorForm({
  initial,
  onSubmit,
  formId,
}: {
  initial?: RatingTentor | null;
  onSubmit: (values: RatingTentorFormValues) => void;
  formId: string;
}) {
  const [values, setValues] = useState<RatingTentorFormValues>(() => toFormValues(initial));
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (values.skor_bintang < 1 || values.skor_bintang > 5) {
      setError("Skor bintang harus 1–5.");
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
          onChange={(e) => {
            const sesiId = e.target.value;
            setValues((v) => ({
              ...v,
              sesi_id: sesiId,
              ortu_id: ortuOfSesi(sesiId)?.id ?? v.ortu_id,
            }));
          }}
          className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 disabled:bg-zinc-50 disabled:text-zinc-400"
        >
          {sesiSelesaiSeed.map((s) => (
            <option key={s.id} value={s.id}>
              {sesiLabel(s.id)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">
          Orang Tua Pemberi Rating
        </label>
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

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Skor Bintang</label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setValues((v) => ({ ...v, skor_bintang: n }))}
              aria-label={`${n} bintang`}
              className="p-0.5"
            >
              <Star
                className={`h-6 w-6 ${
                  n <= values.skor_bintang
                    ? "fill-amber-400 text-amber-400"
                    : "fill-transparent text-zinc-300"
                }`}
              />
            </button>
          ))}
          <span className="ml-2 text-sm text-zinc-500">{values.skor_bintang}/5</span>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Ulasan</label>
        <textarea
          value={values.ulasan_teks}
          onChange={(e) => setValues((v) => ({ ...v, ulasan_teks: e.target.value }))}
          rows={3}
          placeholder="Tulis ulasan orang tua tentang tentor pada sesi ini"
          className="w-full resize-none rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        />
      </div>

      <div>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-700">
          <input
            type="checkbox"
            checked={values.is_active}
            onChange={(e) => setValues((v) => ({ ...v, is_active: e.target.checked }))}
            className="h-4 w-4 rounded border-zinc-300 text-amber-500 focus:ring-amber-400"
          />
          Tampilkan ulasan ini (moderasi aktif)
        </label>
      </div>
    </form>
  );
}
