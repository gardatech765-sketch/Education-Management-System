"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { sesiKalenderSeed, type SesiKalender } from "./dummy";

const HARI_LABEL = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
const BULAN_LABEL = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

function toDateKey(year: number, month: number, day: number) {
  const mm = String(month + 1).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${year}-${mm}-${dd}`;
}

const STATUS_DOT: Record<SesiKalender["status"], string> = {
  Terjadwal: "bg-blue-500",
  Selesai: "bg-emerald-500",
  Dibatalkan: "bg-red-400",
};

export default function CalendarView({
  onSelectDate,
}: {
  onSelectDate: (dateKey: string) => void;
}) {
  const [cursor, setCursor] = useState(new Date(2026, 9, 1)); // Oktober 2026, sesuai konteks data dummy
  const [selected, setSelected] = useState<string | null>(null);

  const year = cursor.getFullYear();
  const month = cursor.getMonth();

  const weeks = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);
    const rows: (number | null)[][] = [];
    for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));
    return rows;
  }, [year, month]);

  function sesiCountForDay(day: number) {
    const key = toDateKey(year, month, day);
    return sesiKalenderSeed.filter((s) => s.tanggal === key);
  }

  function handleClick(day: number) {
    const key = toDateKey(year, month, day);
    setSelected(key);
    onSelectDate(key);
  }

  const todayKey = toDateKey(2026, 9, 15); // "hari ini" mengikuti konteks dashboard (15 Okt 2026)

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-zinc-900">
          {BULAN_LABEL[month]} {year}
        </h2>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setCursor(new Date(year, month - 1, 1))}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-50 hover:text-zinc-800"
            aria-label="Bulan sebelumnya"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setCursor(new Date(year, month + 1, 1))}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-50 hover:text-zinc-800"
            aria-label="Bulan berikutnya"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs font-medium text-zinc-400">
        {HARI_LABEL.map((h) => (
          <div key={h} className="py-1.5">
            {h}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weeks.flatMap((row, ri) =>
          row.map((day, ci) => {
            if (day === null) return <div key={`${ri}-${ci}`} className="aspect-square" />;
            const key = toDateKey(year, month, day);
            const sesi = sesiCountForDay(day);
            const isSelected = selected === key;
            const isToday = key === todayKey;
            return (
              <button
                key={key}
                type="button"
                onClick={() => handleClick(day)}
                className={`flex aspect-square flex-col items-center justify-center gap-1 rounded-lg text-sm transition-colors ${
                  isSelected
                    ? "bg-amber-500 text-white"
                    : isToday
                      ? "bg-amber-50 font-semibold text-amber-700"
                      : "text-zinc-700 hover:bg-zinc-50"
                }`}
              >
                <span>{day}</span>
                {sesi.length > 0 && (
                  <span className="flex gap-0.5">
                    {sesi.slice(0, 3).map((s) => (
                      <span
                        key={s.id}
                        className={`h-1.5 w-1.5 rounded-full ${
                          isSelected ? "bg-white" : STATUS_DOT[s.status]
                        }`}
                      />
                    ))}
                  </span>
                )}
              </button>
            );
          })
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-3 border-t border-zinc-100 pt-3 text-xs text-zinc-500">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500" /> Terjadwal
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Selesai
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-red-400" /> Dibatalkan
        </span>
      </div>
    </div>
  );
}
