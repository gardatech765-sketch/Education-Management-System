"use client";

import { useMemo, useState } from "react";
import { Camera, Eye, MapPin, Pencil, Search, ShieldAlert, Trash2 } from "lucide-react";
import Drawer from "@/components/admin/ui/Drawer";
import ConfirmDialog from "@/components/admin/ui/ConfirmDialog";
import Badge from "@/components/admin/ui/Badge";
import EmptyState from "@/components/admin/ui/EmptyState";
import PresensiForm, {
  type PresensiFormValues,
} from "@/components/admin/operasional/PresensiForm";
import {
  STATUS_HADIR_OPTIONS,
  presensiSeed,
  sesiLabel,
  siswaOfSesi,
  tentorOfSesi,
  type Presensi,
  type StatusHadir,
} from "@/components/admin/operasional/dummy";

const FORM_ID = "form-presensi";

const STATUS_COLOR: Record<StatusHadir, "green" | "blue" | "amber" | "red"> = {
  Hadir: "green",
  Izin: "blue",
  Sakit: "amber",
  Alpa: "red",
};

export default function PresensiPage() {
  const [items, setItems] = useState<Presensi[]>(presensiSeed);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusHadir | "Semua">("Semua");

  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [editing, setEditing] = useState<Presensi | null>(null);
  const [viewTarget, setViewTarget] = useState<Presensi | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Presensi | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return items.filter((item) => {
      const matchSearch =
        siswaOfSesi(item.sesi_id).toLowerCase().includes(q) ||
        tentorOfSesi(item.sesi_id).toLowerCase().includes(q);
      const matchStatus = statusFilter === "Semua" || item.status_hadir === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [items, search, statusFilter]);

  function openEdit(item: Presensi) {
    setEditing(item);
    setEditDrawerOpen(true);
  }

  function handleSubmit(values: PresensiFormValues) {
    if (!editing) return;
    setItems((prev) =>
      prev.map((item) => (item.id === editing.id ? { ...item, ...values } : item))
    );
    setEditDrawerOpen(false);
  }

  function handleDelete() {
    if (!deleteTarget) return;
    setItems((prev) => prev.filter((i) => i.id !== deleteTarget.id));
    setDeleteTarget(null);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Presensi</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Rekap kehadiran tutor & siswa dari check-in/check-out lokasi lapangan. Data lokasi dan
          foto tercatat otomatis dari aplikasi mobile.
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
              placeholder="Cari siswa atau tutor..."
              className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-100"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusHadir | "Semua")}
            className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-100"
          >
            <option value="Semua">Semua Status</option>
            {STATUS_HADIR_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[880px] text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-100 text-xs text-zinc-400">
                <th className="pb-3 pr-3 font-medium">Sesi</th>
                <th className="pb-3 pr-3 font-medium">Check-in</th>
                <th className="pb-3 pr-3 font-medium">Check-out</th>
                <th className="pb-3 pr-3 font-medium">Validasi Lokasi</th>
                <th className="pb-3 pr-3 font-medium">Status</th>
                <th className="pb-3 text-right font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => {
                const bermasalah =
                  item.mock_loc_in || item.mock_loc_out || !item.is_valid_geo_in || (!!item.waktu_checkout && !item.is_valid_geo_out);
                return (
                  <tr key={item.id} className="border-b border-zinc-50 last:border-0">
                    <td className="py-3 pr-3">
                      <p className="font-medium text-zinc-800">{siswaOfSesi(item.sesi_id)}</p>
                      <p className="text-xs text-zinc-400">{tentorOfSesi(item.sesi_id)}</p>
                    </td>
                    <td className="whitespace-nowrap py-3 pr-3 text-zinc-600">
                      {item.waktu_checkin || "—"}
                    </td>
                    <td className="whitespace-nowrap py-3 pr-3 text-zinc-600">
                      {item.waktu_checkout || "—"}
                    </td>
                    <td className="py-3 pr-3">
                      {!item.waktu_checkin ? (
                        <Badge color="zinc">Belum check-in</Badge>
                      ) : bermasalah ? (
                        <Badge color="red">
                          <span className="flex items-center gap-1">
                            <ShieldAlert className="h-3 w-3" /> Perlu ditinjau
                          </span>
                        </Badge>
                      ) : (
                        <Badge color="green">Valid</Badge>
                      )}
                    </td>
                    <td className="py-3 pr-3">
                      <Badge color={STATUS_COLOR[item.status_hadir]}>{item.status_hadir}</Badge>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => setViewTarget(item)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-50 hover:text-amber-600"
                          aria-label="Lihat Detail"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
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
                );
              })}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <EmptyState
              title="Tidak ada data presensi"
              description="Coba ubah kata kunci pencarian atau filter status."
            />
          )}
        </div>

        <p className="mt-4 text-xs text-zinc-400">
          Menampilkan {filtered.length} dari {items.length} presensi
        </p>
      </div>

      {/* Drawer Detail (read-only) */}
      <Drawer
        open={!!viewTarget}
        onClose={() => setViewTarget(null)}
        title="Detail Presensi"
        description={viewTarget ? sesiLabel(viewTarget.sesi_id) : undefined}
        footer={
          <button
            type="button"
            onClick={() => setViewTarget(null)}
            className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
          >
            Tutup
          </button>
        }
      >
        {viewTarget && (
          <div className="space-y-5 text-sm">
            <div>
              <Badge color={STATUS_COLOR[viewTarget.status_hadir]}>
                {viewTarget.status_hadir}
              </Badge>
              {viewTarget.keterangan && (
                <p className="mt-2 text-zinc-600">{viewTarget.keterangan}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <DetailBlok
                label="Check-in"
                waktu={viewTarget.waktu_checkin}
                lat={viewTarget.lat_checkin}
                long={viewTarget.long_checkin}
                jarak={viewTarget.jarak_meter_in}
                valid={viewTarget.is_valid_geo_in}
                mock={viewTarget.mock_loc_in}
                foto={viewTarget.foto_checkin}
              />
              <DetailBlok
                label="Check-out"
                waktu={viewTarget.waktu_checkout}
                lat={viewTarget.lat_checkout}
                long={viewTarget.long_checkout}
                jarak={viewTarget.jarak_meter_out}
                valid={viewTarget.is_valid_geo_out}
                mock={viewTarget.mock_loc_out}
                foto={viewTarget.foto_checkout}
              />
            </div>

            <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-3">
              <p className="text-xs font-medium text-zinc-500">Info Perangkat</p>
              <p className="mt-1 text-zinc-700">Device ID: {viewTarget.device_id || "—"}</p>
              <p className="text-zinc-700">IP Address: {viewTarget.ip_address || "—"}</p>
            </div>
          </div>
        )}
      </Drawer>

      {/* Drawer Edit (koreksi status) */}
      <Drawer
        open={editDrawerOpen}
        onClose={() => setEditDrawerOpen(false)}
        title="Edit Presensi"
        description={editing ? sesiLabel(editing.sesi_id) : undefined}
        footer={
          <>
            <button
              type="button"
              onClick={() => setEditDrawerOpen(false)}
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
        <PresensiForm formId={FORM_ID} initial={editing} onSubmit={handleSubmit} />
      </Drawer>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Hapus data presensi ini?"
        description={deleteTarget ? sesiLabel(deleteTarget.sesi_id) : undefined}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

function DetailBlok({
  label,
  waktu,
  lat,
  long,
  jarak,
  valid,
  mock,
  foto,
}: {
  label: string;
  waktu: string;
  lat: number | null;
  long: number | null;
  jarak: number | null;
  valid: boolean;
  mock: boolean;
  foto: string;
}) {
  return (
    <div className="rounded-lg border border-zinc-100 p-3">
      <p className="text-xs font-medium text-zinc-500">{label}</p>
      {!waktu ? (
        <p className="mt-2 text-xs text-zinc-400">Belum tercatat</p>
      ) : (
        <div className="mt-2 space-y-1.5">
          <p className="font-medium text-zinc-800">{waktu}</p>
          <div className="flex items-start gap-1.5 text-xs text-zinc-500">
            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>
              {lat}, {long} ({jarak}m dari titik lokasi)
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <Badge color={valid ? "green" : "red"}>
              {valid ? "Lokasi valid" : "Di luar radius"}
            </Badge>
            {mock && <Badge color="red">Fake GPS terdeteksi</Badge>}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-zinc-500">
            <Camera className="h-3.5 w-3.5 shrink-0" />
            <span>{foto || "Tidak ada foto"}</span>
          </div>
        </div>
      )}
    </div>
  );
}
