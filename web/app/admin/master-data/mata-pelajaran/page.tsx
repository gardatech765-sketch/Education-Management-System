"use client";

import { useMemo, useState } from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import Drawer from "@/components/admin/ui/Drawer";
import ConfirmDialog from "@/components/admin/ui/ConfirmDialog";
import Badge from "@/components/admin/ui/Badge";
import Toggle from "@/components/admin/ui/Toggle";
import EmptyState from "@/components/admin/ui/EmptyState";
import MataPelajaranForm, {
  type MataPelajaranFormValues,
} from "@/components/admin/master-data/MataPelajaranForm";
import {
  JENJANG_OPTIONS,
  genId,
  mataPelajaranSeed,
  type Jenjang,
  type MataPelajaran,
} from "@/components/admin/master-data/dummy";

const FORM_ID = "form-mata-pelajaran";

export default function MataPelajaranPage() {
  const [items, setItems] = useState<MataPelajaran[]>(mataPelajaranSeed);
  const [search, setSearch] = useState("");
  const [jenjangFilter, setJenjangFilter] = useState<Jenjang | "Semua">("Semua");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState<MataPelajaran | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<MataPelajaran | null>(null);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchSearch = item.nama_mapel.toLowerCase().includes(search.toLowerCase());
      const matchJenjang = jenjangFilter === "Semua" || item.jenjang === jenjangFilter;
      return matchSearch && matchJenjang;
    });
  }, [items, search, jenjangFilter]);

  function openCreate() {
    setEditing(null);
    setDrawerOpen(true);
  }

  function openEdit(item: MataPelajaran) {
    setEditing(item);
    setDrawerOpen(true);
  }

  function handleSubmit(values: MataPelajaranFormValues) {
    if (editing) {
      setItems((prev) =>
        prev.map((item) => (item.id === editing.id ? { ...item, ...values } : item))
      );
    } else {
      setItems((prev) => [{ id: genId("mp"), ...values }, ...prev]);
    }
    setDrawerOpen(false);
  }

  function toggleActive(item: MataPelajaran) {
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
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Mata Pelajaran</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Kelola daftar mata pelajaran yang tersedia untuk setiap jenjang.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="flex shrink-0 items-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-amber-600"
        >
          <Plus className="h-4 w-4" />
          Tambah Mata Pelajaran
        </button>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama mata pelajaran..."
              className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-100"
            />
          </div>
          <select
            value={jenjangFilter}
            onChange={(e) => setJenjangFilter(e.target.value as Jenjang | "Semua")}
            className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-100"
          >
            <option value="Semua">Semua Jenjang</option>
            {JENJANG_OPTIONS.map((j) => (
              <option key={j} value={j}>
                {j}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-100 text-xs text-zinc-400">
                <th className="pb-3 pr-3 font-medium">Nama Mata Pelajaran</th>
                <th className="pb-3 pr-3 font-medium">Jenjang</th>
                <th className="pb-3 pr-3 font-medium">Deskripsi</th>
                <th className="pb-3 pr-3 font-medium">Status</th>
                <th className="pb-3 text-right font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-b border-zinc-50 last:border-0">
                  <td className="py-3 pr-3 font-medium text-zinc-800">{item.nama_mapel}</td>
                  <td className="py-3 pr-3">
                    <Badge color="blue">{item.jenjang}</Badge>
                  </td>
                  <td className="max-w-xs truncate py-3 pr-3 text-zinc-500">
                    {item.deskripsi || "—"}
                  </td>
                  <td className="py-3 pr-3">
                    <div className="flex items-center gap-2">
                      <Toggle checked={item.is_active} onChange={() => toggleActive(item)} />
                      <span
                        className={`text-xs font-medium ${
                          item.is_active ? "text-emerald-600" : "text-zinc-400"
                        }`}
                      >
                        {item.is_active ? "Aktif" : "Non-Aktif"}
                      </span>
                    </div>
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
            <EmptyState
              title="Tidak ada mata pelajaran"
              description="Coba ubah kata kunci pencarian atau filter jenjang."
            />
          )}
        </div>

        <p className="mt-4 text-xs text-zinc-400">
          Menampilkan {filtered.length} dari {items.length} mata pelajaran
        </p>
      </div>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={editing ? "Edit Mata Pelajaran" : "Tambah Mata Pelajaran"}
        description={editing ? editing.nama_mapel : "Isi detail mata pelajaran baru."}
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
        <MataPelajaranForm formId={FORM_ID} initial={editing} onSubmit={handleSubmit} />
      </Drawer>

      <ConfirmDialog
        open={!!deleteTarget}
        title={`Hapus "${deleteTarget?.nama_mapel}"?`}
        description="Tindakan ini tidak dapat dibatalkan. Data mata pelajaran akan dihapus secara permanen."
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}