"use client";

import { useState } from "react";
import {
  HARI_OPTIONS,
  STATUS_KONTRAK_OPTIONS,
  mataPelajaranSeed,
  paketLesSeed,
  profilSiswaSeed,
  profilTentorSeed,
  type Hari,
  type KontrakLes,
  type StatusKontrak,
} from "./dummy";

export type KontrakLesFormValues = {
  siswa_id: string;
  tentor_id: string;
  mapel_id: string;
  paket_id: string;
  hari_rutin: Hari;
  jam_mulai: string;
  jam_selesai: string;
  jarak_km: number;
  biaya_sesi_ortu: number;
  honor_sesi_tentor: number;
  biaya_transport: number;
  catatan: string;
  status_kontrak: StatusKontrak;
  tanggal_mulai: string;
  tanggal_selesai: string | null;
};

const EMPTY: KontrakLesFormValues = {
  siswa_id: profilSiswaSeed[0]?.id ?? "",
  tentor_id: profilTentorSeed[0]?.id ?? "",
  mapel_id: mataPelajaranSeed[0]?.id ?? "",
  paket_id: paketLesSeed[0]?.id ?? "",
  hari_rutin: "Senin",
  jam_mulai: "15:00",
  jam_selesai: "16:30",
  jarak_km: 0,
  biaya_sesi_ortu: 0,
  honor_sesi_tentor: 0,
  biaya_transport: 0,
  catatan: "",
  status_kontrak: "Aktif",
  tanggal_mulai: new Date().toISOString().slice(0, 10),
  tanggal_selesai: null,
};

function toFormValues(initial?: KontrakLes | null): KontrakLesFormValues {
  return initial
    ? {
        siswa_id: initial.siswa_id,
        tentor_id: initial.tentor_id,
        mapel_id: initial.mapel_id,
        paket_id: initial.paket_id,
        hari_rutin: initial.hari_rutin,
        jam_mulai: initial.jam_mulai,
        jam_selesai: initial.jam_selesai,
        jarak_km: initial.jarak_km,
        biaya_sesi_ortu: initial.biaya_sesi_ortu,
        honor_sesi_tentor: initial.honor_sesi_tentor,
        biaya_transport: initial.biaya_transport,
        catatan: initial.catatan,
        status_kontrak: initial.status_kontrak,
        tanggal_mulai: initial.tanggal_mulai,
        tanggal_selesai: initial.tanggal_selesai,
      }
    : EMPTY;
}

export default function KontrakLesForm({
  initial,
  onSubmit,
  formId,
}: {
  initial?: KontrakLes | null;
  onSubmit: (values: KontrakLesFormValues) => void;
  formId: string;
}) {
  const [values, setValues] = useState<KontrakLesFormValues>(() => toFormValues(initial));
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (values.jam_mulai >= values.jam_selesai) {
      setError("Jam mulai harus lebih awal dari jam selesai.");
      return;
    }
    if (values.biaya_sesi_ortu <= 0) {
      setError("Biaya sesi orang tua harus lebih dari 0.");
      return;
    }
    onSubmit(values);
  }

  return (
    <form id={formId} onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">Siswa</label>
          <select
            value={values.siswa_id}
            onChange={(e) => setValues((v) => ({ ...v, siswa_id: e.target.value }))}
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          >
            {profilSiswaSeed.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nama_siswa}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">Tentor</label>
          <select
            value={values.tentor_id}
            onChange={(e) => setValues((v) => ({ ...v, tentor_id: e.target.value }))}
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          >
            {profilTentorSeed.map((t) => (
              <option key={t.id} value={t.id}>
                {t.nama_lengkap}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">
            Mata Pelajaran
          </label>
          <select
            value={values.mapel_id}
            onChange={(e) => setValues((v) => ({ ...v, mapel_id: e.target.value }))}
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          >
            {mataPelajaranSeed.map((m) => (
              <option key={m.id} value={m.id}>
                {m.nama_mapel} ({m.jenjang})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">Paket Les</label>
          <select
            value={values.paket_id}
            onChange={(e) => setValues((v) => ({ ...v, paket_id: e.target.value }))}
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          >
            {paketLesSeed.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nama_paket}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">Hari Rutin</label>
          <select
            value={values.hari_rutin}
            onChange={(e) => setValues((v) => ({ ...v, hari_rutin: e.target.value as Hari }))}
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          >
            {HARI_OPTIONS.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">Jam Mulai</label>
          <input
            type="time"
            value={values.jam_mulai}
            onChange={(e) => setValues((v) => ({ ...v, jam_mulai: e.target.value }))}
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">
            Jam Selesai
          </label>
          <input
            type="time"
            value={values.jam_selesai}
            onChange={(e) => setValues((v) => ({ ...v, jam_selesai: e.target.value }))}
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">
          Jarak Tempuh (km)
        </label>
        <input
          type="number"
          min={0}
          step={0.1}
          value={values.jarak_km}
          onChange={(e) => setValues((v) => ({ ...v, jarak_km: Number(e.target.value) }))}
          className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">
            Biaya/Sesi Ortu (Rp)
          </label>
          <input
            type="number"
            min={0}
            value={values.biaya_sesi_ortu}
            onChange={(e) =>
              setValues((v) => ({ ...v, biaya_sesi_ortu: Number(e.target.value) }))
            }
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">
            Honor/Sesi Tentor (Rp)
          </label>
          <input
            type="number"
            min={0}
            value={values.honor_sesi_tentor}
            onChange={(e) =>
              setValues((v) => ({ ...v, honor_sesi_tentor: Number(e.target.value) }))
            }
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">
            Biaya Transport (Rp)
          </label>
          <input
            type="number"
            min={0}
            value={values.biaya_transport}
            onChange={(e) =>
              setValues((v) => ({ ...v, biaya_transport: Number(e.target.value) }))
            }
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">
            Tanggal Mulai
          </label>
          <input
            type="date"
            value={values.tanggal_mulai}
            onChange={(e) => setValues((v) => ({ ...v, tanggal_mulai: e.target.value }))}
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">
            Tanggal Selesai (opsional)
          </label>
          <input
            type="date"
            value={values.tanggal_selesai ?? ""}
            onChange={(e) =>
              setValues((v) => ({ ...v, tanggal_selesai: e.target.value || null }))
            }
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">
          Status Kontrak
        </label>
        <div className="grid grid-cols-4 gap-2">
          {STATUS_KONTRAK_OPTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setValues((v) => ({ ...v, status_kontrak: s }))}
              className={`rounded-lg border px-2 py-2 text-xs font-medium transition-colors ${
                values.status_kontrak === s
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
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Catatan</label>
        <textarea
          value={values.catatan}
          onChange={(e) => setValues((v) => ({ ...v, catatan: e.target.value }))}
          rows={2}
          placeholder="Catatan tambahan tentang kontrak (opsional)"
          className="w-full resize-none rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        />
      </div>
    </form>
  );
}