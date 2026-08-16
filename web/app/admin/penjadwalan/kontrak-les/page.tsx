"use client";

import { useMemo, useState } from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import Drawer from "@/components/admin/ui/Drawer";
import ConfirmDialog from "@/components/admin/ui/ConfirmDialog";
import Badge from "@/components/admin/ui/Badge";
import EmptyState from "@/components/admin/ui/EmptyState";
import KontrakLesForm, {
  type KontrakLesFormValues,
} from "@/components/admin/penjadwalan/KontrakLesForm";
import {
  STATUS_KONTRAK_OPTIONS,
  formatRupiah,
  genId,
  kontrakLesSeed,
  mapelName,
  siswaName,
  tentorName,
  type KontrakLes,
  type StatusKontrak,
} from "@/components/admin/penjadwalan/dummy";

const FORM_ID = "form-kontrak-les";

const STATUS_COLOR: Record<StatusKontrak, "green" | "amber" | "zinc" | "red"> = {
  Aktif: "green",
  Cuti: "amber",
  Selesai: "zinc",
  Dibatalkan: "red",
};

export default function KontrakLesPage() {
  const [items, setItems] = useState<KontrakLes[]>(kontrakLesSeed);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusKontrak | "Semua">("Semua");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState<KontrakLes | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<KontrakLes | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return items.filter((item) => {
      const matchSearch =
        siswaName(item.siswa_id).toLowerCase().includes(q) ||
        tentorName(item.tentor_id).toLowerCase().includes(q);
      const matchStatus = statusFilter === "Semua" || item.status_kontrak === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [items, search, statusFilter]);

  function openCreate() {
    setEditing(null);
    setDrawerOpen(true);
  }

  function openEdit(item: KontrakLes) {
    setEditing(item);
    setDrawerOpen(true);
  }

  function handleSubmit(values: KontrakLesFormValues) {
    if (editing) {
      setItems((prev) =>
        prev.map((item) => (item.id === editing.id ? { ...item, ...values } : item))
      );
    } else {
      setItems((prev) => [{ id: genId("kl"), ...values }, ...prev]);
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
          <h1 className="text-2xl font-bold text-zinc-900">Kontrak Les</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Kelola kontrak les rutin antara siswa dan tutor beserta tarifnya.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="flex shrink-0 items-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-amber-600"
        >
          <Plus className="h-4 w-4" />
          Tambah Kontrak
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
              placeholder="Cari nama siswa atau tutor..."
              className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-100"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusKontrak | "Semua")}
            className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-100"
          >
            <option value="Semua">Semua Status</option>
            {STATUS_KONTRAK_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[920px] text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-100 text-xs text-zinc-400">
                <th className="pb-3 pr-3 font-medium">Siswa</th>
                <th className="pb-3 pr-3 font-medium">Tentor</th>
                <th className="pb-3 pr-3 font-medium">Mata Pelajaran</th>
                <th className="pb-3 pr-3 font-medium">Jadwal Rutin</th>
                <th className="pb-3 pr-3 font-medium">Biaya/Sesi</th>
                <th className="pb-3 pr-3 font-medium">Status</th>
                <th className="pb-3 text-right font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-b border-zinc-50 last:border-0">
                  <td className="py-3 pr-3 font-medium text-zinc-800">
                    {siswaName(item.siswa_id)}
                  </td>
                  <td className="py-3 pr-3 text-zinc-600">{tentorName(item.tentor_id)}</td>
                  <td className="py-3 pr-3 text-zinc-600">{mapelName(item.mapel_id)}</td>
                  <td className="whitespace-nowrap py-3 pr-3 text-zinc-600">
                    {item.hari_rutin}, {item.jam_mulai}–{item.jam_selesai}
                  </td>
                  <td className="whitespace-nowrap py-3 pr-3 text-zinc-700">
                    {formatRupiah(item.biaya_sesi_ortu)}
                  </td>
                  <td className="py-3 pr-3">
                    <Badge color={STATUS_COLOR[item.status_kontrak]}>
                      {item.status_kontrak}
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
              title="Tidak ada kontrak les"
              description="Coba ubah kata kunci pencarian atau filter status."
            />
          )}
        </div>

        <p className="mt-4 text-xs text-zinc-400">
          Menampilkan {filtered.length} dari {items.length} kontrak
        </p>
      </div>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={editing ? "Edit Kontrak Les" : "Tambah Kontrak Les"}
        description={
          editing ? `${siswaName(editing.siswa_id)} — ${tentorName(editing.tentor_id)}` : "Buat kontrak les rutin baru."
        }
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
        <KontrakLesForm formId={FORM_ID} initial={editing} onSubmit={handleSubmit} />
      </Drawer>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Hapus kontrak les ini?"
        description={
          deleteTarget
            ? `Kontrak ${siswaName(deleteTarget.siswa_id)} dengan ${tentorName(deleteTarget.tentor_id)} akan dihapus permanen.`
            : undefined
        }
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}