"use client";

import { useState } from "react";
import { STATUS_AKUN_OPTIONS, type JenisKelamin, type ProfilTentor, type StatusAkunTutor } from "./dummy";

export type ProfilTentorFormValues = {
  nik: string;
  nama_lengkap: string;
  jenis_kelamin: JenisKelamin;
  no_wa: string;
  alamat_domisili: string;
  pendidikan_terakhir: string;
  status_akun: StatusAkunTutor;
  tanggal_bergabung: string;
};

const EMPTY: ProfilTentorFormValues = {
  nik: "",
  nama_lengkap: "",
  jenis_kelamin: "L",
  no_wa: "",
  alamat_domisili: "",
  pendidikan_terakhir: "",
  status_akun: "Pending",
  tanggal_bergabung: new Date().toISOString().slice(0, 10),
};

function toFormValues(initial?: ProfilTentor | null): ProfilTentorFormValues {
  return initial
    ? {
        nik: initial.nik,
        nama_lengkap: initial.nama_lengkap,
        jenis_kelamin: initial.jenis_kelamin,
        no_wa: initial.no_wa,
        alamat_domisili: initial.alamat_domisili,
        pendidikan_terakhir: initial.pendidikan_terakhir,
        status_akun: initial.status_akun,
        tanggal_bergabung: initial.tanggal_bergabung,
      }
    : EMPTY;
}

export default function ProfilTentorForm({
  initial,
  onSubmit,
  formId,
}: {
  initial?: ProfilTentor | null;
  onSubmit: (values: ProfilTentorFormValues) => void;
  formId: string;
}) {
  const [values, setValues] = useState<ProfilTentorFormValues>(() => toFormValues(initial));
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!values.nama_lengkap.trim() || !values.nik.trim()) {
      setError("Nama lengkap dan NIK wajib diisi.");
      return;
    }
    onSubmit(values);
  }

  return (
    <form id={formId} onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Nama Lengkap</label>
        <input
          type="text"
          value={values.nama_lengkap}
          onChange={(e) => setValues((v) => ({ ...v, nama_lengkap: e.target.value }))}
          placeholder="cth. Budi Santoso"
          className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">NIK</label>
          <input
            type="text"
            value={values.nik}
            onChange={(e) => setValues((v) => ({ ...v, nik: e.target.value }))}
            placeholder="16 digit NIK"
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </div>
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
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">No. WhatsApp</label>
        <input
          type="text"
          value={values.no_wa}
          onChange={(e) => setValues((v) => ({ ...v, no_wa: e.target.value }))}
          placeholder="cth. 08123456789"
          className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">
          Alamat Domisili
        </label>
        <textarea
          value={values.alamat_domisili}
          onChange={(e) => setValues((v) => ({ ...v, alamat_domisili: e.target.value }))}
          rows={2}
          placeholder="Alamat lengkap domisili tutor"
          className="w-full resize-none rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">
          Pendidikan Terakhir
        </label>
        <input
          type="text"
          value={values.pendidikan_terakhir}
          onChange={(e) => setValues((v) => ({ ...v, pendidikan_terakhir: e.target.value }))}
          placeholder="cth. S1 Pendidikan Matematika - UNY"
          className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">Status Akun</label>
          <select
            value={values.status_akun}
            onChange={(e) =>
              setValues((v) => ({ ...v, status_akun: e.target.value as StatusAkunTutor }))
            }
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          >
            {STATUS_AKUN_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">
            Tanggal Bergabung
          </label>
          <input
            type="date"
            value={values.tanggal_bergabung}
            onChange={(e) => setValues((v) => ({ ...v, tanggal_bergabung: e.target.value }))}
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </div>
      </div>

      <div className="rounded-lg border border-dashed border-zinc-200 p-3">
        <p className="text-xs font-medium text-zinc-500">
          Dokumen (CV, sertifikat) & lokasi peta akan bisa diunggah setelah modul ini
          disambungkan ke backend/storage.
        </p>
      </div>
    </form>
  );
}