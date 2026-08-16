"use client";

import { useMemo, useState } from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import Drawer from "@/components/admin/ui/Drawer";
import ConfirmDialog from "@/components/admin/ui/ConfirmDialog";
import Toggle from "@/components/admin/ui/Toggle";
import EmptyState from "@/components/admin/ui/EmptyState";
import PaketLesForm, {
  type PaketLesFormValues,
} from "@/components/admin/master-data/PaketLesForm";
import {
  formatRupiah,
  genId,
  paketLesSeed,
  type PaketLes,
} from "@/components/admin/master-data/dummy";

const FORM_ID = "form-paket-les";

export default function PaketLesPage() {
  const [items, setItems] = useState<PaketLes[]>(paketLesSeed);
  const [search, setSearch] = useState("");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState<PaketLes | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<PaketLes | null>(null);

  const filtered = useMemo(
    () => items.filter((item) => item.nama_paket.toLowerCase().includes(search.toLowerCase())),
    [items, search]
  );

  function openCreate() {
    setEditing(null);
    setDrawerOpen(true);
  }

  function openEdit(item: PaketLes) {
    setEditing(item);
    setDrawerOpen(true);
  }

  function handleSubmit(values: PaketLesFormValues) {
    if (editing) {
      setItems((prev) =>
        prev.map((item) => (item.id === editing.id ? { ...item, ...values } : item))
      );
    } else {
      setItems((prev) => [{ id: genId("pk"), ...values }, ...prev]);
    }
    setDrawerOpen(false);
  }

  function toggleActive(item: PaketLes) {
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
          <h1 className="text-2xl font-bold text-zinc-900">Paket Les</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Kelola paket harga les yang ditawarkan ke orang tua/siswa.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="flex shrink-0 items-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-amber-600"
        >
          <Plus className="h-4 w-4" />
          Tambah Paket Les
        </button>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama paket..."
            className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-100"
          />
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-100 text-xs text-zinc-400">
                <th className="pb-3 pr-3 font-medium">Nama Paket</th>
                <th className="pb-3 pr-3 font-medium">Harga Ortu</th>
                <th className="pb-3 pr-3 font-medium">Honor Tentor</th>
                <th className="pb-3 pr-3 font-medium">Durasi</th>
                <th className="pb-3 pr-3 font-medium">Min. Sesi</th>
                <th className="pb-3 pr-3 font-medium">Status</th>
                <th className="pb-3 text-right font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-b border-zinc-50 last:border-0">
                  <td className="py-3 pr-3">
                    <p className="font-medium text-zinc-800">{item.nama_paket}</p>
                    <p className="max-w-xs truncate text-xs text-zinc-400">{item.deskripsi}</p>
                  </td>
                  <td className="whitespace-nowrap py-3 pr-3 text-zinc-700">
                    {formatRupiah(item.harga_dasar_ortu)}
                  </td>
                  <td className="whitespace-nowrap py-3 pr-3 text-zinc-500">
                    {formatRupiah(item.harga_dasar_tentor)}
                  </td>
                  <td className="whitespace-nowrap py-3 pr-3 text-zinc-600">
                    {item.durasi_menit} menit
                  </td>
                  <td className="py-3 pr-3 text-zinc-600">{item.minimal_sesi}x</td>
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
              title="Tidak ada paket les"
              description="Coba ubah kata kunci pencarian."
            />
          )}
        </div>

        <p className="mt-4 text-xs text-zinc-400">
          Menampilkan {filtered.length} dari {items.length} paket les
        </p>
      </div>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={editing ? "Edit Paket Les" : "Tambah Paket Les"}
        description={editing ? editing.nama_paket : "Isi detail paket les baru."}
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
        <PaketLesForm formId={FORM_ID} initial={editing} onSubmit={handleSubmit} />
      </Drawer>

      <ConfirmDialog
        open={!!deleteTarget}
        title={`Hapus "${deleteTarget?.nama_paket}"?`}
        description="Tindakan ini tidak dapat dibatalkan. Data paket les akan dihapus secara permanen."
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}