"use client";

import { useState } from "react";
import { FileText, Upload } from "lucide-react";
import Badge from "@/components/admin/ui/Badge";
import { dokumenWajibSeed, type DokumenWajib } from "./dummy";

export default function DokumenWajibSection() {
  const [items, setItems] = useState<DokumenWajib[]>(dokumenWajibSeed);

  function handleUpload(key: DokumenWajib["key"], file: File) {
    setItems((prev) =>
      prev.map((d) => (d.key === key ? { ...d, status: "Terunggah", namaFile: file.name } : d))
    );
  }

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <h2 className="text-sm font-semibold text-zinc-900">Dokumen Wajib</h2>
      <p className="mt-0.5 text-xs text-zinc-400">
        Unggah ulang dokumen jika ada pembaruan (KTP, CV, Ijazah).
      </p>

      <div className="mt-4 space-y-3">
        {items.map((d) => (
          <div
            key={d.key}
            className="flex flex-col gap-3 rounded-lg border border-zinc-100 p-3.5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                <FileText className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-medium text-zinc-800">{d.label}</p>
                <p className="text-xs text-zinc-400">{d.namaFile || "Belum ada file"}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge color={d.status === "Terunggah" ? "green" : "amber"}>{d.status}</Badge>
              <label className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50">
                <Upload className="h-3.5 w-3.5" />
                {d.status === "Terunggah" ? "Ganti" : "Unggah"}
                <input
                  type="file"
                  accept=".pdf,image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleUpload(d.key, file);
                  }}
                />
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
