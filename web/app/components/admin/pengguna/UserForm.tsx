"use client";

import { useState } from "react";
import Toggle from "@/components/admin/ui/Toggle";
import { rolesSeed, type User } from "./dummy";

export type UserFormValues = {
  email: string;
  role_id: string;
  password: string;
  is_verified: boolean;
  is_active: boolean;
};

const EMPTY: UserFormValues = {
  email: "",
  role_id: rolesSeed[0]?.id ?? "",
  password: "",
  is_verified: false,
  is_active: true,
};

function toFormValues(initial?: User | null): UserFormValues {
  return initial
    ? {
        email: initial.email,
        role_id: initial.role_id,
        password: "",
        is_verified: initial.is_verified,
        is_active: initial.is_active,
      }
    : EMPTY;
}

export default function UserForm({
  initial,
  onSubmit,
  formId,
}: {
  initial?: User | null;
  onSubmit: (values: UserFormValues) => void;
  formId: string;
}) {
  const isEdit = !!initial;
  const [values, setValues] = useState<UserFormValues>(() => toFormValues(initial));
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!values.email.trim() || !values.email.includes("@")) {
      setError("Email tidak valid.");
      return;
    }
    if (!isEdit && values.password.trim().length < 6) {
      setError("Password sementara minimal 6 karakter.");
      return;
    }
    onSubmit(values);
  }

  return (
    <form id={formId} onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Email</label>
        <input
          type="email"
          value={values.email}
          onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
          placeholder="nama@email.com"
          className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Role</label>
        <select
          value={values.role_id}
          onChange={(e) => setValues((v) => ({ ...v, role_id: e.target.value }))}
          className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        >
          {rolesSeed.map((r) => (
            <option key={r.id} value={r.id}>
              {r.nama_role}
            </option>
          ))}
        </select>
      </div>

      {isEdit ? (
        <div className="rounded-lg border border-dashed border-zinc-200 p-3">
          <p className="text-xs font-medium text-zinc-500">
            Untuk mengganti password, gunakan tombol &quot;Reset Password&quot; di tabel — akan
            mengirim tautan reset ke email pengguna setelah tersambung ke backend.
          </p>
        </div>
      ) : (
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">
            Password Sementara
          </label>
          <input
            type="text"
            value={values.password}
            onChange={(e) => setValues((v) => ({ ...v, password: e.target.value }))}
            placeholder="Minimal 6 karakter"
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
          <p className="mt-1 text-xs text-zinc-400">
            Pengguna akan diminta mengganti password saat login pertama kali.
          </p>
        </div>
      )}

      <div className="flex items-center justify-between rounded-lg border border-zinc-200 px-3 py-2.5">
        <span className="text-sm font-medium text-zinc-700">Email Terverifikasi</span>
        <Toggle
          checked={values.is_verified}
          onChange={(v) => setValues((prev) => ({ ...prev, is_verified: v }))}
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