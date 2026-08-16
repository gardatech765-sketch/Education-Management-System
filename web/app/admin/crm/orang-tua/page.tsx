"use client";

import { useMemo, useState } from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import Drawer from "@/components/admin/ui/Drawer";
import ConfirmDialog from "@/components/admin/ui/ConfirmDialog";
import Badge from "@/components/admin/ui/Badge";
import EmptyState from "@/components/admin/ui/EmptyState";
import ProfilOrtuForm, {
  type ProfilOrtuFormValues,
} from "@/components/admin/crm/ProfilOrtuForm";
import { genId, profilOrtuSeed, profilSiswaSeed, type ProfilOrtu } from "@/components/admin/crm/dummy";

const FORM_ID = "form-profil-ortu";

export default function ProfilOrangTuaPage() {
  const [items, setItems] = useState<ProfilOrtu[]>(profilOrtuSeed);
  const [search, setSearch] = useState("");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState<ProfilOrtu | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ProfilOrtu | null>(null);

  const filtered = useMemo(
    () =>
      items.filter(
        (item) =>
          item.nama_wali.toLowerCase().includes(search.toLowerCase()) ||
          item.no_wa.includes(search)
      ),
    [items, search]
  );

  function jumlahAnak(ortuId: string) {
    return profilSiswaSeed.filter((s) => s.ortu_id === ortuId).length;
  }

  function openCreate() {
    setEditing(null);
    setDrawerOpen(true);
  }

  function openEdit(item: ProfilOrtu) {
    setEditing(item);
    setDrawerOpen(true);
  }

  function handleSubmit(values: ProfilOrtuFormValues) {
    if (editing) {
      setItems((prev) =>
        prev.map((item) => (item.id === editing.id ? { ...item, ...values } : item))
      );
    } else {
      setItems((prev) => [{ id: genId("po"), maps_place_id: "", ...values }, ...prev]);
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
          <h1 className="text-2xl font-bold text-zinc-900">Profil Orang Tua</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Kelola data orang tua/wali beserta alamat penagihan.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="flex shrink-0 items-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-amber-600"
        >
          <Plus className="h-4 w-4" />
          Tambah Orang Tua
        </button>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama wali atau no. WA..."
            className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-100"
          />
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-100 text-xs text-zinc-400">
                <th className="pb-3 pr-3 font-medium">Nama Wali</th>
                <th className="pb-3 pr-3 font-medium">No. WA</th>
                <th className="pb-3 pr-3 font-medium">Alamat Tagih</th>
                <th className="pb-3 pr-3 font-medium">Jumlah Anak</th>
                <th className="pb-3 text-right font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-b border-zinc-50 last:border-0">
                  <td className="py-3 pr-3 font-medium text-zinc-800">{item.nama_wali}</td>
                  <td className="whitespace-nowrap py-3 pr-3 text-zinc-600">{item.no_wa}</td>
                  <td className="max-w-xs truncate py-3 pr-3 text-zinc-500">
                    {item.alamat_tagih || "—"}
                  </td>
                  <td className="py-3 pr-3">
                    <Badge color="blue">{jumlahAnak(item.id)} siswa</Badge>
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
              title="Tidak ada orang tua"
              description="Coba ubah kata kunci pencarian."
            />
          )}
        </div>

        <p className="mt-4 text-xs text-zinc-400">
          Menampilkan {filtered.length} dari {items.length} orang tua
        </p>
      </div>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={editing ? "Edit Profil Orang Tua" : "Tambah Orang Tua"}
        description={editing ? editing.nama_wali : "Isi data orang tua/wali baru."}
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
        <ProfilOrtuForm formId={FORM_ID} initial={editing} onSubmit={handleSubmit} />
      </Drawer>

      <ConfirmDialog
        open={!!deleteTarget}
        title={`Hapus "${deleteTarget?.nama_wali}"?`}
        description="Tindakan ini tidak dapat dibatalkan. Menghapus orang tua tidak otomatis menghapus data siswa terkait."
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}