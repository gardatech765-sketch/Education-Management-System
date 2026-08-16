"use client";

import { useMemo, useState } from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import Drawer from "@/components/admin/ui/Drawer";
import ConfirmDialog from "@/components/admin/ui/ConfirmDialog";
import Toggle from "@/components/admin/ui/Toggle";
import EmptyState from "@/components/admin/ui/EmptyState";
import ProfilSiswaForm, {
  type ProfilSiswaFormValues,
} from "@/components/admin/crm/ProfilSiswaForm";
import {
  calculateAge,
  genId,
  profilOrtuSeed,
  profilSiswaSeed,
  type ProfilSiswa,
} from "@/components/admin/crm/dummy";

const FORM_ID = "form-profil-siswa";

function ortuName(id: string) {
  return profilOrtuSeed.find((o) => o.id === id)?.nama_wali ?? "—";
}

export default function ProfilSiswaPage() {
  const [items, setItems] = useState<ProfilSiswa[]>(profilSiswaSeed);
  const [search, setSearch] = useState("");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState<ProfilSiswa | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ProfilSiswa | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return items.filter(
      (item) =>
        item.nama_siswa.toLowerCase().includes(q) ||
        item.asal_sekolah.toLowerCase().includes(q) ||
        ortuName(item.ortu_id).toLowerCase().includes(q)
    );
  }, [items, search]);

  function openCreate() {
    setEditing(null);
    setDrawerOpen(true);
  }

  function openEdit(item: ProfilSiswa) {
    setEditing(item);
    setDrawerOpen(true);
  }

  function handleSubmit(values: ProfilSiswaFormValues) {
    if (editing) {
      setItems((prev) =>
        prev.map((item) => (item.id === editing.id ? { ...item, ...values } : item))
      );
    } else {
      setItems((prev) => [{ id: genId("ps"), ...values }, ...prev]);
    }
    setDrawerOpen(false);
  }

  function toggleActive(item: ProfilSiswa) {
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
          <h1 className="text-2xl font-bold text-zinc-900">Profil Siswa</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Kelola data siswa yang terdaftar beserta orang tua/wali-nya.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="flex shrink-0 items-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-amber-600"
        >
          <Plus className="h-4 w-4" />
          Tambah Siswa
        </button>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama siswa, sekolah, atau orang tua..."
            className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-100"
          />
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-100 text-xs text-zinc-400">
                <th className="pb-3 pr-3 font-medium">Nama Siswa</th>
                <th className="pb-3 pr-3 font-medium">Usia</th>
                <th className="pb-3 pr-3 font-medium">Asal Sekolah</th>
                <th className="pb-3 pr-3 font-medium">Kelas</th>
                <th className="pb-3 pr-3 font-medium">Orang Tua</th>
                <th className="pb-3 pr-3 font-medium">Status</th>
                <th className="pb-3 text-right font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-b border-zinc-50 last:border-0">
                  <td className="py-3 pr-3">
                    <p className="font-medium text-zinc-800">{item.nama_siswa}</p>
                    <p className="text-xs text-zinc-400">
                      {item.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan"}
                    </p>
                  </td>
                  <td className="whitespace-nowrap py-3 pr-3 text-zinc-600">
                    {item.tanggal_lahir ? `${calculateAge(item.tanggal_lahir)} th` : "—"}
                  </td>
                  <td className="max-w-[200px] truncate py-3 pr-3 text-zinc-600">
                    {item.asal_sekolah || "—"}
                  </td>
                  <td className="whitespace-nowrap py-3 pr-3 text-zinc-600">
                    {item.kelas || "—"}
                  </td>
                  <td className="py-3 pr-3 text-zinc-600">{ortuName(item.ortu_id)}</td>
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
              title="Tidak ada siswa"
              description="Coba ubah kata kunci pencarian."
            />
          )}
        </div>

        <p className="mt-4 text-xs text-zinc-400">
          Menampilkan {filtered.length} dari {items.length} siswa
        </p>
      </div>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={editing ? "Edit Profil Siswa" : "Tambah Siswa"}
        description={editing ? editing.nama_siswa : "Isi data siswa baru."}
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
        <ProfilSiswaForm formId={FORM_ID} initial={editing} onSubmit={handleSubmit} />
      </Drawer>

      <ConfirmDialog
        open={!!deleteTarget}
        title={`Hapus "${deleteTarget?.nama_siswa}"?`}
        description="Tindakan ini tidak dapat dibatalkan. Data siswa akan dihapus secara permanen."
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}