"use client";

import { useState } from "react";
import type { ProfilOrtu } from "./dummy";

export type ProfilOrtuFormValues = {
  nama_wali: string;
  no_wa: string;
  alamat_tagih: string;
};

const EMPTY: ProfilOrtuFormValues = {
  nama_wali: "",
  no_wa: "",
  alamat_tagih: "",
};

function toFormValues(initial?: ProfilOrtu | null): ProfilOrtuFormValues {
  return initial
    ? {
        nama_wali: initial.nama_wali,
        no_wa: initial.no_wa,
        alamat_tagih: initial.alamat_tagih,
      }
    : EMPTY;
}

export default function ProfilOrtuForm({
  initial,
  onSubmit,
  formId,
}: {
  initial?: ProfilOrtu | null;
  onSubmit: (values: ProfilOrtuFormValues) => void;
  formId: string;
}) {
  const [values, setValues] = useState<ProfilOrtuFormValues>(() => toFormValues(initial));
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!values.nama_wali.trim()) {
      setError("Nama wali wajib diisi.");
      return;
    }
    onSubmit(values);
  }

  return (
    <form id={formId} onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">
          Nama Wali / Orang Tua
        </label>
        <input
          type="text"
          value={values.nama_wali}
          onChange={(e) => setValues((v) => ({ ...v, nama_wali: e.target.value }))}
          placeholder="cth. Hendra Wijaya"
          className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">No. WhatsApp</label>
        <input
          type="text"
          value={values.no_wa}
          onChange={(e) => setValues((v) => ({ ...v, no_wa: e.target.value }))}
          placeholder="cth. 08211234560"
          className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">
          Alamat Tagih
        </label>
        <textarea
          value={values.alamat_tagih}
          onChange={(e) => setValues((v) => ({ ...v, alamat_tagih: e.target.value }))}
          rows={3}
          placeholder="Alamat lengkap untuk penagihan"
          className="w-full resize-none rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        />
      </div>

      <div className="rounded-lg border border-dashed border-zinc-200 p-3">
        <p className="text-xs font-medium text-zinc-500">
          Titik lokasi peta (Google Maps) akan bisa diisi setelah modul ini disambungkan ke
          backend.
        </p>
      </div>
    </form>
  );
}