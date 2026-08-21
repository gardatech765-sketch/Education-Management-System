"use client";

import { useState } from "react";
import Link from "next/link";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { ChevronRight } from "lucide-react";
import {
  grafikPendapatanBulanan,
  grafikPendapatanMingguan,
  ringkasanPendapatan,
} from "./data";

export default function RingkasanPendapatanCard() {
  const [periode, setPeriode] = useState<"mingguan" | "bulanan">("mingguan");
  const data = periode === "mingguan" ? grafikPendapatanMingguan : grafikPendapatanBulanan;

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-zinc-900">Ringkasan Pendapatan</h2>
        <select
          disabled
          defaultValue={ringkasanPendapatan.periode}
          className="cursor-not-allowed rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-600"
        >
          <option>{ringkasanPendapatan.periode}</option>
        </select>
      </div>

      <div className="mt-4 rounded-xl bg-amber-50 p-4">
        <p className="text-xs font-medium text-amber-700">Total Estimasi (Belum Dibayar)</p>
        <p className="mt-1 text-2xl font-bold text-amber-800">
          {ringkasanPendapatan.totalEstimasi}
        </p>
        <div className="mt-3 space-y-1 border-t border-amber-200 pt-3 text-sm">
          <div className="flex justify-between">
            <span className="text-zinc-600">Honor Mengajar</span>
            <span className="font-medium text-zinc-800">{ringkasanPendapatan.honorMengajar}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-600">Uang Transport</span>
            <span className="font-medium text-zinc-800">{ringkasanPendapatan.uangTransport}</span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-zinc-900">Grafik Pendapatan</p>
          <div className="flex rounded-lg bg-zinc-100 p-0.5 text-xs font-medium">
            <button
              type="button"
              onClick={() => setPeriode("mingguan")}
              className={`rounded-md px-2.5 py-1 transition-colors ${
                periode === "mingguan" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500"
              }`}
            >
              Mingguan
            </button>
            <button
              type="button"
              onClick={() => setPeriode("bulanan")}
              className={`rounded-md px-2.5 py-1 transition-colors ${
                periode === "bulanan" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500"
              }`}
            >
              Bulanan
            </button>
          </div>
        </div>

        <div className="mt-3 h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 16, right: 0, left: 0, bottom: 0 }}>
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11, fill: "#a1a1aa" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(value) => [`Rp ${Number(value).toFixed(1)}jt`, "Pendapatan"]}
                contentStyle={{ borderRadius: 8, borderColor: "#e4e4e7", fontSize: 12 }}
              />
              <Bar dataKey="value" fill="#f59e0b" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <Link
        href="/tentor/pendapatan"
        className="mt-4 flex items-center justify-between rounded-lg border border-zinc-200 p-3 text-sm hover:bg-zinc-50"
      >
        <span className="text-zinc-600">
          Sesi Selesai Belum Dibayar{" "}
          <span className="font-semibold text-zinc-900">
            {ringkasanPendapatan.sesiBelumDibayar} sesi
          </span>
        </span>
        <ChevronRight className="h-4 w-4 shrink-0 text-zinc-300" />
      </Link>
    </div>
  );
}