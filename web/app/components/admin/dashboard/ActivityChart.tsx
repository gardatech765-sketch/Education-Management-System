"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { activityChartData } from "./data";

const SERIES = [
  { key: "kelasTerlaksana", label: "Kelas Terlaksana", color: "#f59e0b" },
  { key: "kehadiranTutor", label: "Kehadiran Tutor", color: "#22c55e" },
  { key: "presensiSiswa", label: "Presensi Siswa", color: "#a1a1aa" },
] as const;

export default function ActivityChart() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-zinc-900">Ringkasan Aktivitas</h2>
        <select
          disabled
          className="cursor-not-allowed rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-600"
          defaultValue="7"
        >
          <option value="7">7 Hari Terakhir</option>
        </select>
      </div>

      <div className="mt-4 flex flex-wrap gap-4">
        {SERIES.map((s) => (
          <div key={s.key} className="flex items-center gap-1.5 text-xs text-zinc-500">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
            {s.label}
          </div>
        ))}
      </div>

      <div className="mt-4 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={activityChartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid stroke="#f4f4f5" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12, fill: "#a1a1aa" }}
              axisLine={{ stroke: "#e4e4e7" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#a1a1aa" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                borderColor: "#e4e4e7",
                fontSize: 12,
              }}
            />
            {SERIES.map((s) => (
              <Line
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.label}
                stroke={s.color}
                strokeWidth={2.5}
                dot={{ r: 3, strokeWidth: 0, fill: s.color }}
                activeDot={{ r: 5 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}