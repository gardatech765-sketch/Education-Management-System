"use client";

import { useMemo, useState } from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import Drawer from "@/components/admin/ui/Drawer";
import ConfirmDialog from "@/components/admin/ui/ConfirmDialog";
import Badge from "@/components/admin/ui/Badge";
import EmptyState from "@/components/admin/ui/EmptyState";
import LaporanBelajarForm, {
  type LaporanBelajarFormValues,
} from "@/components/admin/operasional/LaporanBelajarForm";
import {
  genId,
  laporanBelajarSeed,
  sesiLabel,
  sesiTanggal,
  siswaOfSesi,
  tentorOfSesi,
  type LaporanBelajar,
} from "@/components/admin/operasional/dummy";

const FORM_ID = "form-laporan-belajar";

export default function LaporanBelajarPage() {
  const [items, setItems] = useState<LaporanBelajar[]>(laporanBelajarSeed);
  const [search, setSearch] = useState("");
  const [readFilter, setReadFilter] = useState<"Semua" | "Sudah" | "Belum">("Semua");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState<LaporanBelajar | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<LaporanBelajar | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return items
      .filter((item) => {
        const matchSearch =
          siswaOfSesi(item.sesi_id).toLowerCase().includes(q) ||
          item.materi.toLowerCase().includes(q);
        const matchRead =
          readFilter === "Semua" ||
          (readFilter === "Sudah" && item.is_read_by_ortu) ||
          (readFilter === "Belum" && !item.is_read_by_ortu);
        return matchSearch && matchRead;
      })
      .sort((a, b) => sesiTanggal(b.sesi_id).localeCompare(sesiTanggal(a.sesi_id)));
  }, [items, search, readFilter]);

  function openCreate() {
    setEditing(null);
    setDrawerOpen(true);
  }

  function openEdit(item: LaporanBelajar) {
    setEditing(item);
    setDrawerOpen(true);
  }

  function handleSubmit(values: LaporanBelajarFormValues) {
    if (editing) {
      setItems((prev) =>
        prev.map((item) => (item.id === editing.id ? { ...item, ...values } : item))
      );
    } else {
      setItems((prev) => [{ id: genId("lb"), ...values }, ...prev]);
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
          <h1 className="text-2xl font-bold text-zinc-900">Laporan Belajar</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Rekap materi, kendala, dan progres belajar siswa dari setiap sesi KBM.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="flex shrink-0 items-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-amber-600"
        >
          <Plus className="h-4 w-4" />
          Tambah Laporan
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
              placeholder="Cari siswa atau materi..."
              className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-100"
            />
          </div>
          <select
            value={readFilter}
            onChange={(e) => setReadFilter(e.target.value as "Semua" | "Sudah" | "Belum")}
            className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-100"
          >
            <option value="Semua">Semua Status Baca</option>
            <option value="Sudah">Sudah Dibaca Ortu</option>
            <option value="Belum">Belum Dibaca Ortu</option>
          </select>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[880px] text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-100 text-xs text-zinc-400">
                <th className="pb-3 pr-3 font-medium">Siswa — Tentor</th>
                <th className="pb-3 pr-3 font-medium">Tanggal</th>
                <th className="pb-3 pr-3 font-medium">Materi</th>
                <th className="pb-3 pr-3 font-medium">Nilai Harian</th>
                <th className="pb-3 pr-3 font-medium">Status Baca</th>
                <th className="pb-3 text-right font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-b border-zinc-50 last:border-0">
                  <td className="py-3 pr-3">
                    <p className="font-medium text-zinc-800">{siswaOfSesi(item.sesi_id)}</p>
                    <p className="text-xs text-zinc-400">{tentorOfSesi(item.sesi_id)}</p>
                  </td>
                  <td className="whitespace-nowrap py-3 pr-3 text-zinc-600">
                    {sesiTanggal(item.sesi_id)}
                  </td>
                  <td className="py-3 pr-3">
                    <p className="text-zinc-800">{item.materi}</p>
                    {item.sub_materi && (
                      <p className="text-xs text-zinc-400">{item.sub_materi}</p>
                    )}
                  </td>
                  <td className="py-3 pr-3 text-zinc-700">
                    {item.nilai_harian ?? "—"}
                  </td>
                  <td className="py-3 pr-3">
                    <Badge color={item.is_read_by_ortu ? "green" : "zinc"}>
                      {item.is_read_by_ortu ? "Sudah dibaca" : "Belum dibaca"}
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
              title="Tidak ada laporan belajar"
              description="Coba ubah kata kunci pencarian atau filter status baca."
            />
          )}
        </div>

        <p className="mt-4 text-xs text-zinc-400">
          Menampilkan {filtered.length} dari {items.length} laporan
        </p>
      </div>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={editing ? "Edit Laporan Belajar" : "Tambah Laporan Belajar"}
        description={editing ? sesiLabel(editing.sesi_id) : "Catat hasil belajar dari sesi KBM yang telah selesai."}
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
        <LaporanBelajarForm formId={FORM_ID} initial={editing} onSubmit={handleSubmit} />
      </Drawer>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Hapus laporan belajar ini?"
        description={deleteTarget ? `${siswaOfSesi(deleteTarget.sesi_id)} — ${deleteTarget.materi}` : undefined}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
