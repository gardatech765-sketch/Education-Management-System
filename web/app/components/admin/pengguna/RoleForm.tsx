"use client";

import { useState } from "react";
import Toggle from "@/components/admin/ui/Toggle";
import type { Role } from "./dummy";

export type RoleFormValues = {
  nama_role: string;
  deskripsi: string;
  is_active: boolean;
};

const EMPTY: RoleFormValues = {
  nama_role: "",
  deskripsi: "",
  is_active: true,
};

function toFormValues(initial?: Role | null): RoleFormValues {
  return initial
    ? { nama_role: initial.nama_role, deskripsi: initial.deskripsi, is_active: initial.is_active }
    : EMPTY;
}

export default function RoleForm({
  initial,
  onSubmit,
  formId,
}: {
  initial?: Role | null;
  onSubmit: (values: RoleFormValues) => void;
  formId: string;
}) {
  const [values, setValues] = useState<RoleFormValues>(() => toFormValues(initial));
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!values.nama_role.trim()) {
      setError("Nama role wajib diisi.");
      return;
    }
    onSubmit(values);
  }

  return (
    <form id={formId} onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Nama Role</label>
        <input
          type="text"
          value={values.nama_role}
          onChange={(e) => setValues((v) => ({ ...v, nama_role: e.target.value }))}
          placeholder="cth. Admin Keuangan"
          className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Deskripsi</label>
        <textarea
          value={values.deskripsi}
          onChange={(e) => setValues((v) => ({ ...v, deskripsi: e.target.value }))}
          rows={3}
          placeholder="Cakupan akses role ini"
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