"use client";

import { useMemo, useState } from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import Drawer from "@/components/admin/ui/Drawer";
import ConfirmDialog from "@/components/admin/ui/ConfirmDialog";
import Badge from "@/components/admin/ui/Badge";
import EmptyState from "@/components/admin/ui/EmptyState";
import NotifikasiForm, {
  type NotifikasiFormValues,
} from "@/components/admin/komunikasi/NotifikasiForm";
import {
  TIPE_NOTIF_OPTIONS,
  formatDateTime,
  genId,
  notifikasiSeed,
  userEmail,
  type Notifikasi,
  type TipeNotif,
} from "@/components/admin/komunikasi/dummy";

const FORM_ID = "form-notifikasi";

const TIPE_COLOR: Record<TipeNotif, "blue" | "amber" | "purple" | "zinc"> = {
  Jadwal: "blue",
  Tagihan: "amber",
  Sistem: "purple",
  Lainnya: "zinc",
};

export default function NotifikasiPage() {
  const [items, setItems] = useState<Notifikasi[]>(notifikasiSeed);
  const [search, setSearch] = useState("");
  const [tipeFilter, setTipeFilter] = useState<TipeNotif | "Semua">("Semua");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState<Notifikasi | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Notifikasi | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return items
      .filter((item) => {
        const matchSearch =
          item.judul.toLowerCase().includes(q) || userEmail(item.user_id).toLowerCase().includes(q);
        const matchTipe = tipeFilter === "Semua" || item.tipe_notif === tipeFilter;
        return matchSearch && matchTipe;
      })
      .sort((a, b) => b.created_at.localeCompare(a.created_at));
  }, [items, search, tipeFilter]);

  function openCreate() {
    setEditing(null);
    setDrawerOpen(true);
  }

  function openEdit(item: Notifikasi) {
    setEditing(item);
    setDrawerOpen(true);
  }

  function handleSubmit(values: NotifikasiFormValues) {
    if (editing) {
      setItems((prev) =>
        prev.map((item) => (item.id === editing.id ? { ...item, ...values } : item))
      );
    } else {
      setItems((prev) => [
        { id: genId("nt"), ...values, is_read: false, created_at: new Date().toISOString() },
        ...prev,
      ]);
    }
    setDrawerOpen(false);
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
          <h1 className="text-2xl font-bold text-zinc-900">Notifikasi</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Kelola dan kirim notifikasi ke pengguna sistem.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="flex shrink-0 items-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-amber-600"
        >
          <Plus className="h-4 w-4" />
          Kirim Notifikasi
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
              placeholder="Cari judul atau email penerima..."
              className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-100"
            />
          </div>
          <select
            value={tipeFilter}
            onChange={(e) => setTipeFilter(e.target.value as TipeNotif | "Semua")}
            className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-100"
          >
            <option value="Semua">Semua Tipe</option>
            {TIPE_NOTIF_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-100 text-xs text-zinc-400">
                <th className="pb-3 pr-3 font-medium">Judul</th>
                <th className="pb-3 pr-3 font-medium">Penerima</th>
                <th className="pb-3 pr-3 font-medium">Tipe</th>
                <th className="pb-3 pr-3 font-medium">Dikirim</th>
                <th className="pb-3 pr-3 font-medium">Status</th>
                <th className="pb-3 text-right font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-b border-zinc-50 last:border-0">
                  <td className="py-3 pr-3">
                    <p className="font-medium text-zinc-800">{item.judul}</p>
                    <p className="max-w-xs truncate text-xs text-zinc-400">{item.pesan}</p>
                  </td>
                  <td className="py-3 pr-3 text-zinc-600">{userEmail(item.user_id)}</td>
                  <td className="py-3 pr-3">
                    <Badge color={TIPE_COLOR[item.tipe_notif]}>{item.tipe_notif}</Badge>
                  </td>
                  <td className="whitespace-nowrap py-3 pr-3 text-zinc-500">
                    {formatDateTime(item.created_at)}
                  </td>
                  <td className="py-3 pr-3">
                    <Badge color={item.is_read ? "zinc" : "green"}>
                      {item.is_read ? "Sudah Dibaca" : "Belum Dibaca"}
                    </Badge>
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
              title="Tidak ada notifikasi"
              description="Coba ubah kata kunci pencarian atau filter tipe."
            />
          )}
        </div>

        <p className="mt-4 text-xs text-zinc-400">
          Menampilkan {filtered.length} dari {items.length} notifikasi
        </p>
      </div>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={editing ? "Edit Notifikasi" : "Kirim Notifikasi"}
        description={editing ? editing.judul : "Kirim notifikasi baru ke pengguna."}
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
              {editing ? "Simpan" : "Kirim"}
            </button>
          </>
        }
      >
        <NotifikasiForm formId={FORM_ID} initial={editing} onSubmit={handleSubmit} />
      </Drawer>

      <ConfirmDialog
        open={!!deleteTarget}
        title={`Hapus notifikasi "${deleteTarget?.judul}"?`}
        description="Tindakan ini tidak dapat dibatalkan."
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}