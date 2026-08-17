"use client";

import { useMemo, useState } from "react";
import { Pencil, Search, Star, Trash2 } from "lucide-react";
import Drawer from "@/components/admin/ui/Drawer";
import ConfirmDialog from "@/components/admin/ui/ConfirmDialog";
import Toggle from "@/components/admin/ui/Toggle";
import EmptyState from "@/components/admin/ui/EmptyState";
import RatingTentorForm, {
  type RatingTentorFormValues,
} from "@/components/admin/operasional/RatingTentorForm";
import {
  ortuName,
  ratingTentorSeed,
  sesiLabel,
  sesiTanggal,
  tentorOfSesi,
  type RatingTentor,
} from "@/components/admin/operasional/dummy";

const FORM_ID = "form-rating-tentor";

function Stars({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`h-3.5 w-3.5 ${
            n <= value ? "fill-amber-400 text-amber-400" : "fill-transparent text-zinc-300"
          }`}
        />
      ))}
    </div>
  );
}

export default function RatingTutorPage() {
  const [items, setItems] = useState<RatingTentor[]>(ratingTentorSeed);
  const [search, setSearch] = useState("");
  const [minStar, setMinStar] = useState<number>(0);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState<RatingTentor | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<RatingTentor | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return items
      .filter((item) => {
        const matchSearch =
          tentorOfSesi(item.sesi_id).toLowerCase().includes(q) ||
          ortuName(item.ortu_id).toLowerCase().includes(q);
        const matchStar = item.skor_bintang >= minStar;
        return matchSearch && matchStar;
      })
      .sort((a, b) => sesiTanggal(b.sesi_id).localeCompare(sesiTanggal(a.sesi_id)));
  }, [items, search, minStar]);

  function openEdit(item: RatingTentor) {
    setEditing(item);
    setDrawerOpen(true);
  }

  function handleSubmit(values: RatingTentorFormValues) {
    if (!editing) return;
    setItems((prev) =>
      prev.map((item) => (item.id === editing.id ? { ...item, ...values } : item))
    );
    setDrawerOpen(false);
  }

  function toggleActive(item: RatingTentor) {
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
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Rating Tutor</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Ulasan orang tua terhadap tutor setelah sesi KBM selesai. Gunakan toggle untuk
          menyembunyikan ulasan yang tidak layak tampil.
        </p>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari tutor atau nama orang tua..."
              className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-100"
            />
          </div>
          <select
            value={minStar}
            onChange={(e) => setMinStar(Number(e.target.value))}
            className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-100"
          >
            <option value={0}>Semua Rating</option>
            <option value={4}>4 Bintang ke atas</option>
            <option value={3}>3 Bintang ke atas</option>
            <option value={1}>Di bawah 3 Bintang</option>
          </select>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-100 text-xs text-zinc-400">
                <th className="pb-3 pr-3 font-medium">Tutor</th>
                <th className="pb-3 pr-3 font-medium">Orang Tua</th>
                <th className="pb-3 pr-3 font-medium">Rating</th>
                <th className="pb-3 pr-3 font-medium">Ulasan</th>
                <th className="pb-3 pr-3 font-medium">Tampilkan</th>
                <th className="pb-3 text-right font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-b border-zinc-50 last:border-0">
                  <td className="py-3 pr-3">
                    <p className="font-medium text-zinc-800">{tentorOfSesi(item.sesi_id)}</p>
                    <p className="text-xs text-zinc-400">{sesiTanggal(item.sesi_id)}</p>
                  </td>
                  <td className="py-3 pr-3 text-zinc-600">{ortuName(item.ortu_id)}</td>
                  <td className="py-3 pr-3">
                    <Stars value={item.skor_bintang} />
                  </td>
                  <td className="max-w-xs py-3 pr-3 text-zinc-600">
                    <p className="line-clamp-2">{item.ulasan_teks || "—"}</p>
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
              title="Tidak ada rating tutor"
              description="Coba ubah kata kunci pencarian atau filter rating."
            />
          )}
        </div>

        <p className="mt-4 text-xs text-zinc-400">
          Menampilkan {filtered.length} dari {items.length} rating
        </p>
      </div>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Edit Rating Tutor"
        description={editing ? sesiLabel(editing.sesi_id) : undefined}
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
        <RatingTentorForm formId={FORM_ID} initial={editing} onSubmit={handleSubmit} />
      </Drawer>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Hapus rating ini?"
        description={
          deleteTarget
            ? `${tentorOfSesi(deleteTarget.sesi_id)} — ${ortuName(deleteTarget.ortu_id)}`
            : undefined
        }
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
