"use client";

import { useState } from "react";
import { Bell, Calendar, Megaphone, Settings, Wallet } from "lucide-react";
import { notifikasiSayaSeed, type NotifikasiSaya, type TipeNotif } from "@/components/tentor/notifikasi/dummy";

const ICONS: Record<TipeNotif, { icon: typeof Bell; bg: string }> = {
  Pengumuman: { icon: Megaphone, bg: "bg-amber-100 text-amber-600" },
  Jadwal: { icon: Calendar, bg: "bg-blue-100 text-blue-600" },
  Tagihan: { icon: Wallet, bg: "bg-emerald-100 text-emerald-600" },
  Sistem: { icon: Settings, bg: "bg-purple-100 text-purple-600" },
};

export default function NotifikasiPage() {
  const [items, setItems] = useState<NotifikasiSaya[]>(notifikasiSayaSeed);
  const belumDibaca = items.filter((i) => !i.isRead).length;

  function tandaiSemuaDibaca() {
    setItems((prev) => prev.map((i) => ({ ...i, isRead: true })));
  }

  function tandaiDibaca(id: string) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, isRead: true } : i)));
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Notifikasi</h1>
          <p className="mt-1 text-sm text-zinc-500">
            {belumDibaca > 0 ? `${belumDibaca} notifikasi belum dibaca` : "Semua notifikasi sudah dibaca"}
          </p>
        </div>
        {belumDibaca > 0 && (
          <button
            type="button"
            onClick={tandaiSemuaDibaca}
            className="shrink-0 rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
          >
            Tandai Semua Dibaca
          </button>
        )}
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-2 shadow-sm">
        <ul className="divide-y divide-zinc-50">
          {items.map((item) => {
            const cfg = ICONS[item.tipe];
            const Icon = cfg.icon;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => tandaiDibaca(item.id)}
                  className={`flex w-full items-start gap-3 rounded-lg p-3.5 text-left transition-colors hover:bg-zinc-50 ${
                    !item.isRead ? "bg-amber-50/50" : ""
                  }`}
                >
                  <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${cfg.bg}`}>
                    <Icon className="h-4 w-4" strokeWidth={2} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium text-zinc-800">
                        {item.judul}
                        {!item.isRead && (
                          <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-amber-500 align-middle" />
                        )}
                      </p>
                      <span className="shrink-0 text-xs text-zinc-400">{item.waktu}</span>
                    </div>
                    <p className="mt-0.5 text-xs leading-relaxed text-zinc-500">{item.pesan}</p>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
