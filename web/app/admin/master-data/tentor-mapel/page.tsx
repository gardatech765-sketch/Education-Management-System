"use client";

import { useMemo, useState } from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import Drawer from "@/components/admin/ui/Drawer";
import ConfirmDialog from "@/components/admin/ui/ConfirmDialog";
import Badge from "@/components/admin/ui/Badge";
import Toggle from "@/components/admin/ui/Toggle";
import EmptyState from "@/components/admin/ui/EmptyState";
import TentorMapelForm, {
  type TentorMapelFormValues,
} from "@/components/admin/master-data/TentorMapelForm";
import {
  genId,
  mataPelajaranSeed,
  tentorMapelSeed,
  tentorOptions,
  type TentorMapel,
  type TingkatKeahlian,
} from "@/components/admin/master-data/dummy";

const FORM_ID = "form-tentor-mapel";

const KEAHLIAN_COLOR: Record<TingkatKeahlian, "zinc" | "amber" | "green"> = {
  Basic: "zinc",
  Intermediate: "amber",
  Expert: "green",
};

function tentorName(id: string) {
  return tentorOptions.find((t) => t.id === id)?.nama ?? "—";
}

function mapelName(id: string) {
  const m = mataPelajaranSeed.find((m) => m.id === id);
  return m ? `${m.nama_mapel} (${m.jenjang})` : "—";
}

export default function TentorMapelPage() {
  const [items, setItems] = useState<TentorMapel[]>(tentorMapelSeed);
  const [search, setSearch] = useState("");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState<TentorMapel | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<TentorMapel | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return items.filter(
      (item) =>
        tentorName(item.tentor_id).toLowerCase().includes(q) ||
        mapelName(item.mapel_id).toLowerCase().includes(q)
    );
  }, [items, search]);

  function openCreate() {
    setEditing(null);
    setDrawerOpen(true);
  }

  function openEdit(item: TentorMapel) {
    setEditing(item);
    setDrawerOpen(true);
  }

  function handleSubmit(values: TentorMapelFormValues) {
    if (editing) {
      setItems((prev) =>
        prev.map((item) => (item.id === editing.id ? { ...item, ...values } : item))
      );
    } else {
      setItems((prev) => [{ id: genId("tm"), ...values }, ...prev]);
    }
    setDrawerOpen(false);
  }

  function toggleActive(item: TentorMapel) {
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
          <h1 className="text-2xl font-bold text-zinc-900">Tentor & Keahlian</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Kelola pemetaan tentor terhadap mata pelajaran dan tingkat keahliannya.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="flex shrink-0 items-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-amber-600"
        >
          <Plus className="h-4 w-4" />
          Tambah Pemetaan
        </button>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama tentor atau mata pelajaran..."
            className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-100"
          />
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-100 text-xs text-zinc-400">
                <th className="pb-3 pr-3 font-medium">Tentor</th>
                <th className="pb-3 pr-3 font-medium">Mata Pelajaran</th>
                <th className="pb-3 pr-3 font-medium">Tingkat Keahlian</th>
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
                  <td className="py-3 pr-3 text-zinc-600">{mapelName(item.mapel_id)}</td>
                  <td className="py-3 pr-3">
                    {item.tingkat_keahlian ? (
                      <Badge color={KEAHLIAN_COLOR[item.tingkat_keahlian]}>
                        {item.tingkat_keahlian}
                      </Badge>
                    ) : (
                      <Badge color="zinc">Belum Ditentukan</Badge>
                    )}
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
              title="Tidak ada pemetaan tentor"
              description="Coba ubah kata kunci pencarian."
            />
          )}
        </div>

        <p className="mt-4 text-xs text-zinc-400">
          Menampilkan {filtered.length} dari {items.length} pemetaan
        </p>
      </div>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={editing ? "Edit Pemetaan Tentor" : "Tambah Pemetaan Tentor"}
        description={
          editing ? `${tentorName(editing.tentor_id)} — ${mapelName(editing.mapel_id)}` : "Hubungkan tentor dengan mata pelajaran yang dikuasainya."
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
        <TentorMapelForm formId={FORM_ID} initial={editing} onSubmit={handleSubmit} />
      </Drawer>

      <ConfirmDialog
        open={!!deleteTarget}
        title={`Hapus pemetaan ini?`}
        description={
          deleteTarget
            ? `${tentorName(deleteTarget.tentor_id)} akan dilepas dari ${mapelName(deleteTarget.mapel_id)}.`
            : undefined
        }
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}