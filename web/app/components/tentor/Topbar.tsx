"use client";

import { Bell, ChevronDown, Menu, Sun } from "lucide-react";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 11) return "Selamat pagi";
  if (hour < 15) return "Selamat siang";
  if (hour < 18) return "Selamat sore";
  return "Selamat malam";
}

export default function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="sticky top-0 z-30 flex h-[73px] shrink-0 items-center gap-4 border-b border-zinc-200 bg-white px-4 sm:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 lg:hidden"
        aria-label="Toggle menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="min-w-0">
        <p className="truncate text-lg font-bold text-zinc-900">
          {getGreeting()}, Andi Saputra 👋
        </p>
        <p className="truncate text-sm text-zinc-500">Semangat mengajar hari ini!</p>
      </div>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          className="hidden items-center gap-1.5 rounded-lg border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-50 sm:flex"
        >
          <Sun className="h-4 w-4 text-amber-500" />
          Mode Terang
        </button>

        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
          aria-label="Notifikasi"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
            3
          </span>
        </button>

        <button type="button" className="flex items-center gap-2 rounded-lg py-1.5 pl-1.5 pr-2 hover:bg-zinc-50">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-500 text-xs font-semibold text-white">
            AS
          </div>
          <div className="hidden text-left sm:block">
            <p className="text-sm font-medium leading-tight text-zinc-900">Andi Saputra</p>
            <p className="text-xs leading-tight text-zinc-500">Tentor Matematika</p>
          </div>
          <ChevronDown className="hidden h-4 w-4 text-zinc-400 sm:block" />
        </button>
      </div>
    </header>
  );
}