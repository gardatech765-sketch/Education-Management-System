"use client";

import { useState } from "react";
import { profilSayaSeed, type ProfilTentorSaya } from "./dummy";

export default function BiodataSection() {
  const [values, setValues] = useState<ProfilTentorSaya>(profilSayaSeed);
  const [saved, setSaved] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <h2 className="text-sm font-semibold text-zinc-900">Biodata</h2>

      {saved && (
        <p className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          Perubahan biodata tersimpan.
        </p>
      )}

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">Nama Lengkap</label>
          <input
            type="text"
            value={values.namaLengkap}
            onChange={(e) => setValues((v) => ({ ...v, namaLengkap: e.target.value }))}
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">No. WhatsApp</label>
          <input
            type="text"
            value={values.noWa}
            onChange={(e) => setValues((v) => ({ ...v, noWa: e.target.value }))}
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Alamat Domisili</label>
        <textarea
          value={values.alamatDomisili}
          onChange={(e) => setValues((v) => ({ ...v, alamatDomisili: e.target.value }))}
          rows={2}
          className="w-full resize-none rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        />
      </div>

      <div className="mt-5 border-t border-zinc-100 pt-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-400">
          Rekening untuk Penggajian
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">Nama Bank</label>
            <input
              type="text"
              value={values.namaBank}
              onChange={(e) => setValues((v) => ({ ...v, namaBank: e.target.value }))}
              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">No. Rekening</label>
            <input
              type="text"
              value={values.noRekening}
              onChange={(e) => setValues((v) => ({ ...v, noRekening: e.target.value }))}
              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">
              Nama Pemilik Rekening
            </label>
            <input
              type="text"
              value={values.namaPemilikRekening}
              onChange={(e) => setValues((v) => ({ ...v, namaPemilikRekening: e.target.value }))}
              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="mt-5 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-amber-600"
      >
        Simpan Perubahan
      </button>
    </form>
  );
}
