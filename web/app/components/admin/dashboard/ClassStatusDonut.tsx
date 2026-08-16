"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { classStatusData, totalClassesToday } from "./data";

export default function ClassStatusDonut() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <h2 className="text-sm font-semibold text-zinc-900">Distribusi Status Kelas</h2>

      <div className="relative mt-4 h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={classStatusData}
              dataKey="value"
              nameKey="name"
              innerRadius="65%"
              outerRadius="100%"
              paddingAngle={2}
              strokeWidth={0}
            >
              {classStatusData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-xs text-zinc-400">Total</p>
          <p className="text-2xl font-bold text-zinc-900">{totalClassesToday}</p>
          <p className="text-xs text-zinc-400">Kelas</p>
        </div>
      </div>

      <ul className="mt-4 space-y-2.5">
        {classStatusData.map((entry) => (
          <li key={entry.name} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-zinc-600">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              {entry.name}
            </span>
            <span className="font-medium text-zinc-900">
              {entry.value} <span className="text-zinc-400">({entry.percent})</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}