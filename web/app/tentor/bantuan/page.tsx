"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Drawer from "@/components/admin/ui/Drawer";
import Badge from "@/components/admin/ui/Badge";
import EmptyState from "@/components/admin/ui/EmptyState";
import TiketForm, { type TiketFormValues } from "@/components/tentor/bantuan/TiketForm";
import { genId, tiketSeed, type StatusTiket, type Tiket } from "@/components/tentor/bantuan/dummy";

const FORM_ID = "form-tiket";

const STATUS_COLOR: Record<StatusTiket, "amber" | "blue" | "green"> = {
  Terbuka: "amber",
  Diproses: "blue",
  Selesai: "green",
};

export default function BantuanTiketPage() {
  const [items, setItems] = useState<Tiket[]>(tiketSeed);
  const [drawerOpen, setDrawerOpen] = useState(false);

  function handleSubmit(values: TiketFormValues) {
    setItems((prev) => [
      {
        id: genId("tk"),
        ...values,
        status: "Terbuka",
        dibuatPada: new Date().toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      },
      ...prev,
    ]);
    setDrawerOpen(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Bantuan &amp; Tiket</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Hubungi admin untuk kendala atau pertanyaan seputar mengajar.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="flex shrink-0 items-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-amber-600"
        >
          <Plus className="h-4 w-4" />
          Buat Tiket
        </button>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-zinc-900">Tiket Saya</h2>

        {items.length === 0 ? (
          <EmptyState title="Belum ada tiket" description="Klik tombol di atas untuk membuat tiket baru." />
        ) : (
          <ul className="mt-4 space-y-3">
            {items.map((t) => (
              <li key={t.id} className="rounded-lg border border-zinc-100 p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-zinc-800">{t.subjek}</p>
                    <p className="mt-0.5 text-xs text-zinc-400">
                      {t.kategori} &middot; Dibuat {t.dibuatPada}
                    </p>
                  </div>
                  <Badge color={STATUS_COLOR[t.status]}>{t.status}</Badge>
                </div>
                <p className="mt-2 text-sm text-zinc-500">{t.deskripsi}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Buat Tiket Bantuan"
        description="Ceritakan kendala atau pertanyaan Anda ke admin."
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
              Kirim Tiket
            </button>
          </>
        }
      >
        <TiketForm formId={FORM_ID} onSubmit={handleSubmit} />
      </Drawer>
    </div>
  );
}
