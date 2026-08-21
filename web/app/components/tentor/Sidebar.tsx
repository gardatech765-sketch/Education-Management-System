"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, LifeBuoy } from "lucide-react";
import { NAV_AKUN, NAV_UTAMA } from "./nav-config";

export default function Sidebar({
  mobileOpen,
  onCloseMobile,
}: {
  mobileOpen: boolean;
  onCloseMobile: () => void;
}) {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/tentor") return pathname === "/tentor";
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-full w-72 flex-col border-r border-zinc-200 bg-white transition-transform duration-200
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="flex h-[73px] shrink-0 items-center gap-3 border-b border-zinc-200 px-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-900">
            <GraduationCap className="h-5 w-5 text-amber-400" strokeWidth={2.25} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-base font-bold leading-tight text-zinc-900">
              KelasOne
            </p>
            <p className="truncate text-xs leading-tight text-zinc-400">
              Untuk Masa Depan Gemilang
            </p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-0.5">
            {NAV_UTAMA.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onCloseMobile}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                      active
                        ? "bg-amber-50 font-medium text-amber-700"
                        : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                    }`}
                  >
                    <Icon
                      className={`h-[18px] w-[18px] shrink-0 ${active ? "text-amber-600" : "text-zinc-400"}`}
                    />
                    <span className="truncate">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="my-4 border-t border-zinc-100" />

          <ul className="space-y-0.5">
            {NAV_AKUN.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onCloseMobile}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                      active
                        ? "bg-amber-50 font-medium text-amber-700"
                        : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                    }`}
                  >
                    <Icon
                      className={`h-[18px] w-[18px] shrink-0 ${active ? "text-amber-600" : "text-zinc-400"}`}
                    />
                    <span className="truncate">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bantuan card */}
        <div className="shrink-0 p-3">
          <div className="rounded-xl bg-amber-50 p-4">
            <p className="text-sm font-semibold text-zinc-900">Butuh bantuan?</p>
            <p className="mt-1 text-xs leading-relaxed text-zinc-500">
              Hubungi admin jika ada kendala atau pertanyaan.
            </p>
            <Link
              href="/tentor/bantuan"
              onClick={onCloseMobile}
              className="mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-amber-500 px-3 py-2 text-sm font-medium text-white hover:bg-amber-600"
            >
              <LifeBuoy className="h-4 w-4" />
              Buat Tiket
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}