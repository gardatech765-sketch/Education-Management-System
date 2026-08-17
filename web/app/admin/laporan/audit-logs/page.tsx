"use client";

import { useMemo, useState } from "react";
import { Eye, Search } from "lucide-react";
import Drawer from "@/components/admin/ui/Drawer";
import Badge from "@/components/admin/ui/Badge";
import EmptyState from "@/components/admin/ui/EmptyState";
import AuditLogDetail from "@/components/admin/laporan/AuditLogDetail";
import {
  AKSI_OPTIONS,
  MODUL_OPTIONS,
  auditLogsSeed,
  formatDateTime,
  type AksiLog,
  type AuditLog,
} from "@/components/admin/laporan/dummy";

const AKSI_COLOR: Record<AksiLog, "green" | "amber" | "red" | "blue" | "zinc"> = {
  CREATE: "green",
  UPDATE: "amber",
  DELETE: "red",
  LOGIN: "blue",
  LOGOUT: "zinc",
};

export default function AuditLogsPage() {
  const [search, setSearch] = useState("");
  const [aksiFilter, setAksiFilter] = useState<AksiLog | "Semua">("Semua");
  const [modulFilter, setModulFilter] = useState<string>("Semua");
  const [selected, setSelected] = useState<AuditLog | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return auditLogsSeed
      .filter((log) => {
        const matchSearch =
          log.user_nama.toLowerCase().includes(q) || log.modul.toLowerCase().includes(q);
        const matchAksi = aksiFilter === "Semua" || log.aksi === aksiFilter;
        const matchModul = modulFilter === "Semua" || log.modul === modulFilter;
        return matchSearch && matchAksi && matchModul;
      })
      .sort((a, b) => b.created_at.localeCompare(a.created_at));
  }, [search, aksiFilter, modulFilter]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Laporan & Audit Logs</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Riwayat aktivitas pengguna di sistem — bersifat baca saja (tidak bisa diubah/dihapus).
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
              placeholder="Cari nama pengguna atau modul..."
              className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-100"
            />
          </div>
          <select
            value={modulFilter}
            onChange={(e) => setModulFilter(e.target.value)}
            className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-100"
          >
            <option value="Semua">Semua Modul</option>
            {MODUL_OPTIONS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <select
            value={aksiFilter}
            onChange={(e) => setAksiFilter(e.target.value as AksiLog | "Semua")}
            className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-100"
          >
            <option value="Semua">Semua Aksi</option>
            {AKSI_OPTIONS.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[780px] text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-100 text-xs text-zinc-400">
                <th className="pb-3 pr-3 font-medium">Waktu</th>
                <th className="pb-3 pr-3 font-medium">Pengguna</th>
                <th className="pb-3 pr-3 font-medium">Modul</th>
                <th className="pb-3 pr-3 font-medium">Aksi</th>
                <th className="pb-3 pr-3 font-medium">IP Address</th>
                <th className="pb-3 text-right font-medium">Detail</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((log) => (
                <tr key={log.id} className="border-b border-zinc-50 last:border-0">
                  <td className="whitespace-nowrap py-3 pr-3 text-zinc-500">
                    {formatDateTime(log.created_at)}
                  </td>
                  <td className="py-3 pr-3">
                    <p className="font-medium text-zinc-800">{log.user_nama}</p>
                    <p className="text-xs text-zinc-400">{log.user_role}</p>
                  </td>
                  <td className="py-3 pr-3 text-zinc-600">{log.modul}</td>
                  <td className="py-3 pr-3">
                    <Badge color={AKSI_COLOR[log.aksi]}>{log.aksi}</Badge>
                  </td>
                  <td className="whitespace-nowrap py-3 pr-3 text-zinc-400">{log.ip_address}</td>
                  <td className="py-3">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => setSelected(log)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-50 hover:text-amber-600"
                        aria-label="Lihat detail"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <EmptyState
              title="Tidak ada log aktivitas"
              description="Coba ubah kata kunci pencarian atau filter."
            />
          )}
        </div>

        <p className="mt-4 text-xs text-zinc-400">
          Menampilkan {filtered.length} dari {auditLogsSeed.length} log aktivitas
        </p>
      </div>

      <Drawer
        open={!!selected}
        onClose={() => setSelected(null)}
        title="Detail Aktivitas"
        description={selected ? `${selected.user_nama} — ${selected.modul}` : undefined}
      >
        {selected && <AuditLogDetail log={selected} />}
      </Drawer>
    </div>
  );
}