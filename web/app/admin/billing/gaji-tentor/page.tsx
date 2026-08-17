"use client";

import { useMemo, useState } from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import Drawer from "@/components/admin/ui/Drawer";
import ConfirmDialog from "@/components/admin/ui/ConfirmDialog";
import Badge from "@/components/admin/ui/Badge";
import EmptyState from "@/components/admin/ui/EmptyState";
import GajiTentorForm, {
  type GajiTentorFormValues,
} from "@/components/admin/billing/GajiTentorForm";
import {
  STATUS_GAJI_OPTIONS,
  formatRupiah,
  gajiTentorSeed,
  genId,
  tentorName,
  totalTerima,
  type GajiTentor,
  type StatusGaji,
} from "@/components/admin/billing/dummy";

const FORM_ID = "form-gaji-tentor";

const STATUS_COLOR: Record<StatusGaji, "green" | "amber" | "zinc"> = {
  Transferred: "green",
  Approved: "amber",
  Draft: "zinc",
};

export default function GajiTentorPage() {
  const [items, setItems] = useState<GajiTentor[]>(gajiTentorSeed);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusGaji | "Semua">("Semua");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState<GajiTentor | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<GajiTentor | null>(null);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchSearch = tentorName(item.tentor_id).toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "Semua" || item.status_gaji === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [items, search, statusFilter]);

  function openCreate() {
    setEditing(null);
    setDrawerOpen(true);
  }

  function openEdit(item: GajiTentor) {
    setEditing(item);
    setDrawerOpen(true);
  }

  function handleSubmit(values: GajiTentorFormValues) {
    if (editing) {
      setItems((prev) =>
        prev.map((item) => (item.id === editing.id ? { ...item, ...values } : item))
      );
    } else {
      setItems((prev) => [{ id: genId("gt"), ...values }, ...prev]);
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
          <h1 className="text-2xl font-bold text-zinc-900">Gaji Tentor</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Kelola rekap honor bulanan tutor beserta bonus dan potongan.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="flex shrink-0 items-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-amber-600"
        >
          <Plus className="h-4 w-4" />
          Buat Rekap Gaji
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
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusGaji | "Semua")}
            className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-100"
          >
            <option value="Semua">Semua Status</option>
            {STATUS_GAJI_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-100 text-xs text-zinc-400">
                <th className="pb-3 pr-3 font-medium">Tentor</th>
                <th className="pb-3 pr-3 font-medium">Periode</th>
                <th className="pb-3 pr-3 font-medium">Total Sesi</th>
                <th className="pb-3 pr-3 font-medium">Honor</th>
                <th className="pb-3 pr-3 font-medium">Bonus</th>
                <th className="pb-3 pr-3 font-medium">Potongan</th>
                <th className="pb-3 pr-3 font-medium">Total Diterima</th>
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
                  <td className="whitespace-nowrap py-3 pr-3 text-zinc-500">
                    {item.periode_bulan}
                  </td>
                  <td className="py-3 pr-3 text-zinc-600">{item.total_sesi}x</td>
                  <td className="whitespace-nowrap py-3 pr-3 text-zinc-600">
                    {formatRupiah(item.total_honor)}
                  </td>
                  <td className="whitespace-nowrap py-3 pr-3 text-emerald-600">
                    {item.bonus_tambahan > 0 ? `+${formatRupiah(item.bonus_tambahan)}` : "—"}
                  </td>
                  <td className="whitespace-nowrap py-3 pr-3 text-red-500">
                    {item.potongan_denda > 0 ? `-${formatRupiah(item.potongan_denda)}` : "—"}
                  </td>
                  <td className="whitespace-nowrap py-3 pr-3 font-medium text-zinc-800">
                    {formatRupiah(totalTerima(item))}
                  </td>
                  <td className="py-3 pr-3">
                    <Badge color={STATUS_COLOR[item.status_gaji]}>{item.status_gaji}</Badge>
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
              title="Tidak ada data gaji"
              description="Coba ubah kata kunci pencarian atau filter status."
            />
          )}
        </div>

        <p className="mt-4 text-xs text-zinc-400">
          Menampilkan {filtered.length} dari {items.length} rekap gaji
        </p>
      </div>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={editing ? "Edit Rekap Gaji" : "Buat Rekap Gaji"}
        description={editing ? `${tentorName(editing.tentor_id)} — ${editing.periode_bulan}` : "Buat rekap honor bulanan tutor baru."}
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
        <GajiTentorForm formId={FORM_ID} initial={editing} onSubmit={handleSubmit} />
      </Drawer>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Hapus rekap gaji ini?"
        description={
          deleteTarget
            ? `Rekap gaji ${tentorName(deleteTarget.tentor_id)} periode ${deleteTarget.periode_bulan} akan dihapus permanen.`
            : undefined
        }
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}