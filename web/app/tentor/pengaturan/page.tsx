"use client";

import { useState } from "react";
import Toggle from "@/components/admin/ui/Toggle";

export default function PengaturanPage() {
  const [notifJadwal, setNotifJadwal] = useState(true);
  const [notifTagihan, setNotifTagihan] = useState(true);
  const [notifPengumuman, setNotifPengumuman] = useState(true);
  const [saved, setSaved] = useState(false);

  function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Pengaturan</h1>
        <p className="mt-1 text-sm text-zinc-500">Kelola keamanan akun dan preferensi notifikasi.</p>
      </div>

      <form onSubmit={handlePasswordSubmit} className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-zinc-900">Ubah Password</h2>

        {saved && (
          <p className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            Password berhasil diperbarui.
          </p>
        )}

        <div className="mt-4 space-y-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">
              Password Saat Ini
            </label>
            <input
              type="password"
              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
            />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                Password Baru
              </label>
              <input
                type="password"
                className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                Konfirmasi Password Baru
              </label>
              <input
                type="password"
                className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="mt-5 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-amber-600"
        >
          Perbarui Password
        </button>
      </form>

      <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-zinc-900">Preferensi Notifikasi</h2>
        <p className="mt-0.5 text-xs text-zinc-400">
          Pilih jenis notifikasi yang ingin Anda terima lewat aplikasi dan WhatsApp.
        </p>

        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between rounded-lg border border-zinc-100 px-3.5 py-3">
            <div>
              <p className="text-sm font-medium text-zinc-700">Pengingat Jadwal</p>
              <p className="text-xs text-zinc-400">Notifikasi sebelum kelas dimulai.</p>
            </div>
            <Toggle checked={notifJadwal} onChange={setNotifJadwal} />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-zinc-100 px-3.5 py-3">
            <div>
              <p className="text-sm font-medium text-zinc-700">Slip Gaji & Tagihan</p>
              <p className="text-xs text-zinc-400">Notifikasi saat slip gaji tersedia.</p>
            </div>
            <Toggle checked={notifTagihan} onChange={setNotifTagihan} />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-zinc-100 px-3.5 py-3">
            <div>
              <p className="text-sm font-medium text-zinc-700">Pengumuman Admin</p>
              <p className="text-xs text-zinc-400">Broadcast pengumuman, promo, dan info lainnya.</p>
            </div>
            <Toggle checked={notifPengumuman} onChange={setNotifPengumuman} />
          </div>
        </div>
      </div>
    </div>
  );
}
