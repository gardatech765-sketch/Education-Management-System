"use client";

import { useMemo, useState } from "react";
import { KeyRound, Pencil, Plus, Search, Trash2 } from "lucide-react";
import Drawer from "@/components/admin/ui/Drawer";
import ConfirmDialog from "@/components/admin/ui/ConfirmDialog";
import Badge from "@/components/admin/ui/Badge";
import Toggle from "@/components/admin/ui/Toggle";
import EmptyState from "@/components/admin/ui/EmptyState";
import UserForm, { type UserFormValues } from "@/components/admin/pengguna/UserForm";
import {
  formatDateTime,
  genId,
  roleName,
  rolesSeed,
  usersSeed,
  type User,
} from "@/components/admin/pengguna/dummy";

const FORM_ID = "form-user";

export default function UsersSection() {
  const [items, setItems] = useState<User[]>(usersSeed);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("Semua");
  const [resetTarget, setResetTarget] = useState<User | null>(null);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchSearch = item.email.toLowerCase().includes(search.toLowerCase());
      const matchRole = roleFilter === "Semua" || item.role_id === roleFilter;
      return matchSearch && matchRole;
    });
  }, [items, search, roleFilter]);

  function openCreate() {
    setEditing(null);
    setDrawerOpen(true);
  }

  function openEdit(item: User) {
    setEditing(item);
    setDrawerOpen(true);
  }

  function handleSubmit(values: UserFormValues) {
    if (editing) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === editing.id
            ? {
                ...item,
                email: values.email,
                role_id: values.role_id,
                is_verified: values.is_verified,
                is_active: values.is_active,
              }
            : item
        )
      );
    } else {
      setItems((prev) => [
        {
          id: genId("us"),
          email: values.email,
          role_id: values.role_id,
          is_verified: values.is_verified,
          is_active: values.is_active,
          last_login: null,
          created_at: new Date().toISOString().slice(0, 10),
        },
        ...prev,
      ]);
    }
    setDrawerOpen(false);
  }

  function toggleActive(item: User) {
    setItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, is_active: !i.is_active } : i))
    );
  }

  function handleDelete() {
    if (!deleteTarget) return;
    setItems((prev) => prev.filter((i) => i.id !== deleteTarget.id));
    setDeleteTarget(null);
  }

  return (
    <div>
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari email pengguna..."
              className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-100"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-100"
          >
            <option value="Semua">Semua Role</option>
            {rolesSeed.map((r) => (
              <option key={r.id} value={r.id}>
                {r.nama_role}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="flex shrink-0 items-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-amber-600"
        >
          <Plus className="h-4 w-4" />
          Tambah Pengguna
        </button>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-100 text-xs text-zinc-400">
              <th className="pb-3 pr-3 font-medium">Email</th>
              <th className="pb-3 pr-3 font-medium">Role</th>
              <th className="pb-3 pr-3 font-medium">Verifikasi</th>
              <th className="pb-3 pr-3 font-medium">Login Terakhir</th>
              <th className="pb-3 pr-3 font-medium">Status</th>
              <th className="pb-3 text-right font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="border-b border-zinc-50 last:border-0">
                <td className="py-3 pr-3 font-medium text-zinc-800">{item.email}</td>
                <td className="py-3 pr-3">
                  <Badge color="blue">{roleName(item.role_id)}</Badge>
                </td>
                <td className="py-3 pr-3">
                  <Badge color={item.is_verified ? "green" : "amber"}>
                    {item.is_verified ? "Terverifikasi" : "Belum"}
                  </Badge>
                </td>
                <td className="whitespace-nowrap py-3 pr-3 text-zinc-500">
                  {formatDateTime(item.last_login)}
                </td>
                <td className="py-3 pr-3">
                  <Toggle checked={item.is_active} onChange={() => toggleActive(item)} />
                </td>
                <td className="py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => setResetTarget(item)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-50 hover:text-amber-600"
                      aria-label="Reset password"
                    >
                      <KeyRound className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => openEdit(item)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-50 hover:text-amber-600"
                      aria-label="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(item)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 hover:bg-red-50 hover:text-red-600"
                      aria-label="Hapus"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <EmptyState title="Tidak ada pengguna" description="Coba ubah kata kunci pencarian atau filter role." />
        )}
      </div>

      <p className="mt-4 text-xs text-zinc-400">
        Menampilkan {filtered.length} dari {items.length} pengguna
      </p>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={editing ? "Edit Pengguna" : "Tambah Pengguna"}
        description={editing ? editing.email : "Buat akun pengguna baru."}
        footer={
          <>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            >
              Batal
            </button>
            <button
              type="submit"
              form={FORM_ID}
              className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600"
            >
              Simpan
            </button>
          </>
        }
      >
        <UserForm formId={FORM_ID} initial={editing} onSubmit={handleSubmit} />
      </Drawer>

      <ConfirmDialog
        open={!!deleteTarget}
        title={`Hapus akun "${deleteTarget?.email}"?`}
        description="Tindakan ini tidak dapat dibatalkan. Pengguna tidak akan bisa login lagi."
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      <ConfirmDialog
        open={!!resetTarget}
        title="Reset password pengguna ini?"
        description={
          resetTarget
            ? `Tautan reset password akan dikirim ke ${resetTarget.email} setelah modul ini disambungkan ke backend/email service.`
            : undefined
        }
        confirmLabel="Kirim Reset"
        onConfirm={() => setResetTarget(null)}
        onCancel={() => setResetTarget(null)}
      />
    </div>
  );
}