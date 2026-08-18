"use client";

import { useMemo, useState } from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import Drawer from "@/components/admin/ui/Drawer";
import ConfirmDialog from "@/components/admin/ui/ConfirmDialog";
import Toggle from "@/components/admin/ui/Toggle";
import EmptyState from "@/components/admin/ui/EmptyState";
import RoleForm, { type RoleFormValues } from "@/components/admin/pengguna/RoleForm";
import { genId, rolesSeed, usersSeed, type Role } from "@/components/admin/pengguna/dummy";

const FORM_ID = "form-role";

export default function RolesSection() {
  const [items, setItems] = useState<Role[]>(rolesSeed);
  const [search, setSearch] = useState("");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState<Role | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Role | null>(null);

  const filtered = useMemo(
    () => items.filter((item) => item.nama_role.toLowerCase().includes(search.toLowerCase())),
    [items, search]
  );

  function jumlahPengguna(roleId: string) {
    return usersSeed.filter((u) => u.role_id === roleId).length;
  }

  function openCreate() {
    setEditing(null);
    setDrawerOpen(true);
  }

  function openEdit(item: Role) {
    setEditing(item);
    setDrawerOpen(true);
  }

  function handleSubmit(values: RoleFormValues) {
    if (editing) {
      setItems((prev) =>
        prev.map((item) => (item.id === editing.id ? { ...item, ...values } : item))
      );
    } else {
      setItems((prev) => [{ id: genId("rl"), ...values }, ...prev]);
    }
    setDrawerOpen(false);
  }

  function toggleActive(item: Role) {
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
        <div className="relative max-w-md flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama role..."
            className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-100"
          />
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="flex shrink-0 items-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-amber-600"
        >
          <Plus className="h-4 w-4" />
          Tambah Role
        </button>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-100 text-xs text-zinc-400">
              <th className="pb-3 pr-3 font-medium">Nama Role</th>
              <th className="pb-3 pr-3 font-medium">Deskripsi</th>
              <th className="pb-3 pr-3 font-medium">Jumlah Pengguna</th>
              <th className="pb-3 pr-3 font-medium">Status</th>
              <th className="pb-3 text-right font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="border-b border-zinc-50 last:border-0">
                <td className="py-3 pr-3 font-medium text-zinc-800">{item.nama_role}</td>
                <td className="max-w-sm truncate py-3 pr-3 text-zinc-500">{item.deskripsi}</td>
                <td className="py-3 pr-3 text-zinc-600">{jumlahPengguna(item.id)} pengguna</td>
                <td className="py-3 pr-3">
                  <Toggle checked={item.is_active} onChange={() => toggleActive(item)} />
                </td>
                <td className="py-3">
                  <div className="flex items-center justify-end gap-1">
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
          <EmptyState title="Tidak ada role" description="Coba ubah kata kunci pencarian." />
        )}
      </div>

      <p className="mt-4 text-xs text-zinc-400">
        Menampilkan {filtered.length} dari {items.length} role
      </p>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={editing ? "Edit Role" : "Tambah Role"}
        description={editing ? editing.nama_role : "Buat role akses baru."}
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
        <RoleForm formId={FORM_ID} initial={editing} onSubmit={handleSubmit} />
      </Drawer>

      <ConfirmDialog
        open={!!deleteTarget}
        title={`Hapus role "${deleteTarget?.nama_role}"?`}
        description="Pengguna dengan role ini perlu dipindahkan ke role lain terlebih dahulu."
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}