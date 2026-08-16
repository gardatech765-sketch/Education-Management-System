"use client";

import { useState } from "react";
import Toggle from "@/components/admin/ui/Toggle";
import { profilOrtuSeed, type JenisKelamin, type ProfilSiswa } from "./dummy";

export type ProfilSiswaFormValues = {
  ortu_id: string;
  nama_siswa: string;
  jenis_kelamin: JenisKelamin;
  tanggal_lahir: string;
  asal_sekolah: string;
  kelas: string;
  catatan_khusus: string;
  is_active: boolean;
};

const EMPTY: ProfilSiswaFormValues = {
  ortu_id: profilOrtuSeed[0]?.id ?? "",
  nama_siswa: "",
  jenis_kelamin: "L",
  tanggal_lahir: "",
  asal_sekolah: "",
  kelas: "",
  catatan_khusus: "",
  is_active: true,
};

function toFormValues(initial?: ProfilSiswa | null): ProfilSiswaFormValues {
  return initial
    ? {
        ortu_id: initial.ortu_id,
        nama_siswa: initial.nama_siswa,
        jenis_kelamin: initial.jenis_kelamin,
        tanggal_lahir: initial.tanggal_lahir,
        asal_sekolah: initial.asal_sekolah,
        kelas: initial.kelas,
        catatan_khusus: initial.catatan_khusus,
        is_active: initial.is_active,
      }
    : EMPTY;
}

export default function ProfilSiswaForm({
  initial,
  onSubmit,
  formId,
}: {
  initial?: ProfilSiswa | null;
  onSubmit: (values: ProfilSiswaFormValues) => void;
  formId: string;
}) {
  const [values, setValues] = useState<ProfilSiswaFormValues>(() => toFormValues(initial));
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!values.nama_siswa.trim()) {
      setError("Nama siswa wajib diisi.");
      return;
    }
    if (!values.ortu_id) {
      setError("Orang tua/wali wajib dipilih.");
      return;
    }
    onSubmit(values);
  }

  return (
    <form id={formId} onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">
          Orang Tua / Wali
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
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Nama Siswa</label>
        <input
          type="text"
          value={values.nama_siswa}
          onChange={(e) => setValues((v) => ({ ...v, nama_siswa: e.target.value }))}
          placeholder="cth. Siti Aisyah"
          className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">
            Jenis Kelamin
          </label>
          <select
            value={values.jenis_kelamin}
            onChange={(e) =>
              setValues((v) => ({ ...v, jenis_kelamin: e.target.value as JenisKelamin }))
            }
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          >
            <option value="L">Laki-laki</option>
            <option value="P">Perempuan</option>
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">
            Tanggal Lahir
          </label>
          <input
            type="date"
            value={values.tanggal_lahir}
            onChange={(e) => setValues((v) => ({ ...v, tanggal_lahir: e.target.value }))}
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">
            Asal Sekolah
          </label>
          <input
            type="text"
            value={values.asal_sekolah}
            onChange={(e) => setValues((v) => ({ ...v, asal_sekolah: e.target.value }))}
            placeholder="cth. SMA Negeri 1 Sleman"
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">Kelas</label>
          <input
            type="text"
            value={values.kelas}
            onChange={(e) => setValues((v) => ({ ...v, kelas: e.target.value }))}
            placeholder="cth. XI IPA 2"
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">
          Catatan Khusus
        </label>
        <textarea
          value={values.catatan_khusus}
          onChange={(e) => setValues((v) => ({ ...v, catatan_khusus: e.target.value }))}
          rows={2}
          placeholder="cth. kebutuhan belajar khusus, alergi, dsb (opsional)"
          className="w-full resize-none rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        />
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