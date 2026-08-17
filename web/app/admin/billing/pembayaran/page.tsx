"use client";

import { useMemo, useState } from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import Drawer from "@/components/admin/ui/Drawer";
import ConfirmDialog from "@/components/admin/ui/ConfirmDialog";
import Badge from "@/components/admin/ui/Badge";
import EmptyState from "@/components/admin/ui/EmptyState";
import PembayaranForm, {
  type PembayaranFormValues,
} from "@/components/admin/billing/PembayaranForm";
import {
  STATUS_VALIDASI_OPTIONS,
  formatRupiah,
  genId,
  pembayaranSeed,
  tagihanLabel,
  type Pembayaran,
  type StatusValidasi,
} from "@/components/admin/billing/dummy";

const FORM_ID = "form-pembayaran";

const STATUS_COLOR: Record<StatusValidasi, "green" | "amber" | "red"> = {
  Approved: "green",
  Pending: "amber",
  Rejected: "red",
};

export default function PembayaranPage() {
  const [items, setItems] = useState<Pembayaran[]>(pembayaranSeed);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusValidasi | "Semua">("Semua");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState<Pembayaran | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Pembayaran | null>(null);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchSearch = tagihanLabel(item.tagihan_id)
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchStatus = statusFilter === "Semua" || item.status_validasi === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [items, search, statusFilter]);

  function openCreate() {
    setEditing(null);
    setDrawerOpen(true);
  }

  function openEdit(item: Pembayaran) {
    setEditing(item);
    setDrawerOpen(true);
  }

  function handleSubmit(values: PembayaranFormValues) {
    if (editing) {
      setItems((prev) =>
        prev.map((item) => (item.id === editing.id ? { ...item, ...values } : item))
      );
    } else {
      setItems((prev) => [{ id: genId("pb"), ...values }, ...prev]);
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
          <h1 className="text-2xl font-bold text-zinc-900">Pembayaran</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Kelola dan validasi pembayaran yang masuk dari orang tua.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="flex shrink-0 items-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-amber-600"
        >
          <Plus className="h-4 w-4" />
          Catat Pembayaran
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
              placeholder="Cari no. invoice atau nama orang tua..."
              className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-100"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusValidasi | "Semua")}
            className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-100"
          >
            <option value="Semua">Semua Status</option>
            {STATUS_VALIDASI_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-100 text-xs text-zinc-400">
                <th className="pb-3 pr-3 font-medium">Invoice</th>
                <th className="pb-3 pr-3 font-medium">Tanggal Bayar</th>
                <th className="pb-3 pr-3 font-medium">Metode</th>
                <th className="pb-3 pr-3 font-medium">Referensi</th>
                <th className="pb-3 pr-3 font-medium">Nominal</th>
                <th className="pb-3 pr-3 font-medium">Status</th>
                <th className="pb-3 text-right font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-b border-zinc-50 last:border-0">
                  <td className="py-3 pr-3 font-medium text-zinc-800">
                    {tagihanLabel(item.tagihan_id)}
                  </td>
                  <td className="whitespace-nowrap py-3 pr-3 text-zinc-500">
                    {item.tanggal_bayar}
                  </td>
                  <td className="py-3 pr-3">
                    <Badge color="blue">{item.metode_bayar}</Badge>
                  </td>
                  <td className="whitespace-nowrap py-3 pr-3 text-zinc-500">
                    {item.referensi_gateway || "—"}
                  </td>
                  <td className="whitespace-nowrap py-3 pr-3 text-zinc-700">
                    {formatRupiah(item.nominal_bayar)}
                  </td>
                  <td className="py-3 pr-3">
                    <Badge color={STATUS_COLOR[item.status_validasi]}>
                      {item.status_validasi}
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
              title="Tidak ada pembayaran"
              description="Coba ubah kata kunci pencarian atau filter status."
            />
          )}
        </div>

        <p className="mt-4 text-xs text-zinc-400">
          Menampilkan {filtered.length} dari {items.length} pembayaran
        </p>
      </div>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={editing ? "Edit Pembayaran" : "Catat Pembayaran"}
        description={editing ? tagihanLabel(editing.tagihan_id) : "Catat pembayaran baru yang masuk."}
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
        <PembayaranForm formId={FORM_ID} initial={editing} onSubmit={handleSubmit} />
      </Drawer>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Hapus pembayaran ini?"
        description={
          deleteTarget
            ? `Pembayaran untuk ${tagihanLabel(deleteTarget.tagihan_id)} akan dihapus permanen.`
            : undefined
        }
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}