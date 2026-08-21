import Link from "next/link";
import { AlertCircle, Clock, Info } from "lucide-react";
import { todoList } from "./data";

const STYLES = {
  urgent: { icon: AlertCircle, bg: "bg-red-50", iconColor: "text-red-500", btn: "border-red-200 text-red-600 hover:bg-red-50" },
  warning: { icon: Clock, bg: "bg-amber-50", iconColor: "text-amber-500", btn: "border-amber-200 text-amber-600 hover:bg-amber-50" },
  info: { icon: Info, bg: "bg-blue-50", iconColor: "text-blue-500", btn: "border-blue-200 text-blue-600 hover:bg-blue-50" },
} as const;

export default function TodoListCard() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-zinc-900">To-Do List</h2>
        <Link href="/tentor/notifikasi" className="text-sm font-medium text-amber-600 hover:text-amber-700">
          Lihat Semua
        </Link>
      </div>

      <ul className="mt-4 space-y-2.5">
        {todoList.map((item) => {
          const style = STYLES[item.tipe];
          const Icon = style.icon;
          return (
            <li
              key={item.judul}
              className={`flex flex-col gap-3 rounded-lg ${style.bg} p-3.5 sm:flex-row sm:items-center sm:justify-between`}
            >
              <div className="flex items-start gap-2.5">
                <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${style.iconColor}`} />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-zinc-800">{item.judul}</p>
                  <p className="text-xs text-zinc-500">{item.detail}</p>
                </div>
              </div>
              <Link
                href={item.href}
                className={`shrink-0 rounded-lg border bg-white px-3 py-1.5 text-center text-xs font-semibold ${style.btn}`}
              >
                {item.tombol}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}