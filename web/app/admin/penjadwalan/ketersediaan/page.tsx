"use client";

import { useMemo, useState } from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import Drawer from "@/components/admin/ui/Drawer";
import ConfirmDialog from "@/components/admin/ui/ConfirmDialog";
import Badge from "@/components/admin/ui/Badge";
import Toggle from "@/components/admin/ui/Toggle";
import EmptyState from "@/components/admin/ui/EmptyState";
import KetersediaanForm, {
  type KetersediaanFormValues,
} from "@/components/admin/penjadwalan/KetersediaanForm";
import {
  genId,
  ketersediaanSeed,
  profilTentorSeed,
  tentorName,
  type KetersediaanTentor,
} from "@/components/admin/penjadwalan/dummy";

const FORM_ID = "form-ketersediaan";

export default function KetersediaanTutorPage() {
  const [items, setItems] = useState<KetersediaanTentor[]>(ketersediaanSeed);
  const [search, setSearch] = useState("");
  const [tentorFilter, setTentorFilter] = useState<string>("Semua");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState<KetersediaanTentor | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<KetersediaanTentor | null>(null);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchSearch = tentorName(item.tentor_id).toLowerCase().includes(search.toLowerCase());
      const matchTentor = tentorFilter === "Semua" || item.tentor_id === tentorFilter;
      return matchSearch && matchTentor;
    });
  }, [items, search, tentorFilter]);

  function openCreate() {
    setEditing(null);
    setDrawerOpen(true);
  }

  function openEdit(item: KetersediaanTentor) {
    setEditing(item);
    setDrawerOpen(true);
  }

  function handleSubmit(values: KetersediaanFormValues) {
    if (editing) {
      setItems((prev) =>
        prev.map((item) => (item.id === editing.id ? { ...item, ...values } : item))
      );
    } else {
      setItems((prev) => [{ id: genId("kt"), ...values }, ...prev]);
    }
    setDrawerOpen(false);
  }

  function toggleActive(item: KetersediaanTentor) {
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
          <h1 className="text-2xl font-bold text-zinc-900">Ketersediaan Tutor</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Kelola jadwal ketersediaan mengajar setiap tutor per hari.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="flex shrink-0 items-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-amber-600"
        >
          <Plus className="h-4 w-4" />
          Tambah Ketersediaan
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
              placeholder="Cari nama tutor..."
              className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-100"
            />
          </div>
          <select
            value={tentorFilter}
            onChange={(e) => setTentorFilter(e.target.value)}
            className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-100"
          >
            <option value="Semua">Semua Tutor</option>
            {profilTentorSeed.map((t) => (
              <option key={t.id} value={t.id}>
                {t.nama_lengkap}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-100 text-xs text-zinc-400">
                <th className="pb-3 pr-3 font-medium">Tentor</th>
                <th className="pb-3 pr-3 font-medium">Hari</th>
                <th className="pb-3 pr-3 font-medium">Jam</th>
                <th className="pb-3 pr-3 font-medium">Status</th>
                <th className="pb-3 text-right font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-b border-zinc-50 last:border-0">
                  <td className="py-3 pr-3 font-medium text-zinc-800">
                    {tentorName(item.tentor_id)}
                  </td>
                  <td className="py-3 pr-3">
                    <Badge color="blue">{item.hari}</Badge>
                  </td>
                  <td className="whitespace-nowrap py-3 pr-3 text-zinc-600">
                    {item.jam_mulai} – {item.jam_selesai}
                  </td>
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
            <EmptyState
              title="Tidak ada jadwal ketersediaan"
              description="Coba ubah kata kunci pencarian atau filter tutor."
            />
          )}
        </div>

        <p className="mt-4 text-xs text-zinc-400">
          Menampilkan {filtered.length} dari {items.length} jadwal ketersediaan
        </p>
      </div>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={editing ? "Edit Ketersediaan" : "Tambah Ketersediaan"}
        description={editing ? `${tentorName(editing.tentor_id)} — ${editing.hari}` : "Tambahkan slot ketersediaan mengajar tutor."}
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
        <KetersediaanForm formId={FORM_ID} initial={editing} onSubmit={handleSubmit} />
      </Drawer>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Hapus jadwal ketersediaan ini?"
        description={
          deleteTarget
            ? `${tentorName(deleteTarget.tentor_id)} — ${deleteTarget.hari}, ${deleteTarget.jam_mulai}–${deleteTarget.jam_selesai}`
            : undefined
        }
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}