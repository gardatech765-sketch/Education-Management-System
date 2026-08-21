"use client";

import { useMemo, useState } from "react";
import { Info, Pencil, Plus, Trash2 } from "lucide-react";
import Drawer from "@/components/admin/ui/Drawer";
import ConfirmDialog from "@/components/admin/ui/ConfirmDialog";
import SlotForm, { type SlotFormValues } from "@/components/tentor/ketersediaan/SlotForm";
import {
  HARI_OPTIONS,
  genId,
  slotKetersediaanSeed,
  type SlotKetersediaan,
} from "@/components/tentor/ketersediaan/dummy";

const FORM_ID = "form-slot-ketersediaan";

export default function KetersediaanWaktuPage() {
  const [items, setItems] = useState<SlotKetersediaan[]>(slotKetersediaanSeed);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState<SlotKetersediaan | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<SlotKetersediaan | null>(null);

  const grouped = useMemo(() => {
    return HARI_OPTIONS.map((hari) => ({
      hari,
      slots: items
        .filter((s) => s.hari === hari)
        .sort((a, b) => a.jamMulai.localeCompare(b.jamMulai)),
    }));
  }, [items]);

  const belumDiatur = grouped.filter((g) => g.slots.length === 0).map((g) => g.hari);

  function openCreate() {
    setEditing(null);
    setDrawerOpen(true);
  }

  function openEdit(item: SlotKetersediaan) {
    setEditing(item);
    setDrawerOpen(true);
  }

  function handleSubmit(values: SlotFormValues) {
    if (editing) {
      setItems((prev) =>
        prev.map((item) => (item.id === editing.id ? { ...item, ...values } : item))
      );
    } else {
      setItems((prev) => [{ id: genId("sl"), ...values, isActive: true }, ...prev]);
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
          <h1 className="text-2xl font-bold text-zinc-900">Ketersediaan Waktu</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Atur jadwal kosong Anda supaya bisa dicocokkan Admin saat penjadwalan.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="flex shrink-0 items-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-amber-600"
        >
          <Plus className="h-4 w-4" />
          Tambah Slot
        </button>
      </div>

      {belumDiatur.length > 0 && (
        <div className="flex items-start gap-2 rounded-xl border border-amber-100 bg-amber-50 p-4 text-sm text-amber-800">
          <Info className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            Hari <strong>{belumDiatur.join(", ")}</strong> belum ada slot ketersediaan. Tanpa
            jadwal kosong, Anda tidak akan muncul di rekomendasi Smart Mapping Admin.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {grouped.map(({ hari, slots }) => (
          <div key={hari} className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
            <p className="text-sm font-semibold text-zinc-900">{hari}</p>

            {slots.length === 0 ? (
              <p className="mt-3 text-xs text-zinc-400">Belum ada slot.</p>
            ) : (
              <ul className="mt-3 space-y-2">
                {slots.map((s) => (
                  <li
                    key={s.id}
                    className="flex items-center justify-between rounded-lg bg-amber-50 px-3 py-2 text-sm"
                  >
                    <span className="font-medium text-amber-700">
                      {s.jamMulai} - {s.jamSelesai}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => openEdit(s)}
                        className="flex h-7 w-7 items-center justify-center rounded-md text-amber-500 hover:bg-amber-100"
                        aria-label="Edit"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(s)}
                        className="flex h-7 w-7 items-center justify-center rounded-md text-amber-500 hover:bg-red-100 hover:text-red-600"
                        aria-label="Hapus"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={editing ? "Edit Slot Ketersediaan" : "Tambah Slot Ketersediaan"}
        description="Tentukan hari dan rentang jam Anda kosong untuk mengajar."
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
        <SlotForm formId={FORM_ID} initial={editing} onSubmit={handleSubmit} />
      </Drawer>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Hapus slot ketersediaan ini?"
        description={
          deleteTarget ? `${deleteTarget.hari}, ${deleteTarget.jamMulai}-${deleteTarget.jamSelesai}` : undefined
        }
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
