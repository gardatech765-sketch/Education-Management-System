"use client";

import { Bell, ChevronDown, Menu, Search } from "lucide-react";

export default function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="sticky top-0 z-30 flex h-[73px] shrink-0 items-center gap-4 border-b border-zinc-200 bg-white px-4 sm:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
        aria-label="Toggle sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="relative hidden max-w-md flex-1 sm:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
        <input
          type="text"
          placeholder="Cari data, tutor, siswa, cabang..."
          className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2 pl-9 pr-14 text-sm text-zinc-700 placeholder:text-zinc-400 outline-none focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-100"
        />
        <kbd className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-zinc-200 bg-white px-1.5 py-0.5 text-[11px] font-medium text-zinc-400">
          ⌘K
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
          aria-label="Notifikasi"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
            8
          </span>
        </button>

        <button
          type="button"
          className="flex items-center gap-2 rounded-lg py-1.5 pl-1.5 pr-2 hover:bg-zinc-50"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-500 text-xs font-semibold text-white">
            A
          </div>
          <div className="hidden text-left sm:block">
            <p className="text-sm font-medium leading-tight text-zinc-900">Admin</p>
            <p className="text-xs leading-tight text-zinc-500">Super Admin</p>
          </div>
          <ChevronDown className="hidden h-4 w-4 text-zinc-400 sm:block" />
        </button>
      </div>
    </header>
  );
}