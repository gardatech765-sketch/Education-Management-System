"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { BookOpen, ChevronDown, ChevronLeft, ExternalLink } from "lucide-react";
import { NAV_SECTIONS, type NavItem } from "./nav-config";

function isChildActive(pathname: string, item: NavItem) {
  if (item.href) return pathname === item.href;
  return item.children?.some((c) => pathname === c.href || pathname.startsWith(c.href + "/")) ?? false;
}

export default function Sidebar({
  collapsed,
  mobileOpen,
  onCloseMobile,
}: {
  collapsed: boolean;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}) {
  const pathname = usePathname();

  // Auto-expand whichever group contains the active route.
  const defaultOpenLabel = useMemo(() => {
    for (const section of NAV_SECTIONS) {
      for (const item of section.items) {
        if (item.children && isChildActive(pathname, item)) return item.label;
      }
    }
    return null;
  }, [pathname]);

  const [openLabel, setOpenLabel] = useState<string | null>(defaultOpenLabel);

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-full flex-col border-r border-zinc-200 bg-white transition-all duration-200
          ${collapsed ? "lg:w-20" : "lg:w-64"}
          ${mobileOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="flex h-[73px] shrink-0 items-center gap-3 border-b border-zinc-200 px-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 shadow-sm shadow-amber-200">
            <BookOpen className="h-5 w-5 text-white" strokeWidth={2.25} />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-bold leading-tight text-zinc-900">
                KelasOne
              </p>
              <p className="truncate text-xs leading-tight text-zinc-500">
                Untuk Masa Depan Gemilang
              </p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {NAV_SECTIONS.map((section) => (
            <div key={section.title} className="mb-5">
              {!collapsed && (
                <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                  {section.title}
                </p>
              )}
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const active = isChildActive(pathname, item);
                  const hasChildren = !!item.children;
                  const open = openLabel === item.label;

                  if (!hasChildren) {
                    return (
                      <li key={item.label}>
                        <Link
                          href={item.href!}
                          onClick={onCloseMobile}
                          title={collapsed ? item.label : undefined}
                          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors
                            ${active
                              ? "bg-amber-50 font-medium text-amber-700"
                              : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"}
                          `}
                        >
                          <Icon
                            className={`h-[18px] w-[18px] shrink-0 ${active ? "text-amber-600" : "text-zinc-400"}`}
                            strokeWidth={2}
                          />
                          {!collapsed && <span className="truncate">{item.label}</span>}
                        </Link>
                      </li>
                    );
                  }

                  return (
                    <li key={item.label}>
                      <button
                        type="button"
                        title={collapsed ? item.label : undefined}
                        onClick={() => setOpenLabel(open ? null : item.label)}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors
                          ${active && !open
                            ? "bg-amber-50 font-medium text-amber-700"
                            : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"}
                        `}
                      >
                        <Icon
                          className={`h-[18px] w-[18px] shrink-0 ${active ? "text-amber-600" : "text-zinc-400"}`}
                          strokeWidth={2}
                        />
                        {!collapsed && (
                          <>
                            <span className="flex-1 truncate text-left">{item.label}</span>
                            <ChevronDown
                              className={`h-4 w-4 shrink-0 text-zinc-400 transition-transform ${open ? "rotate-180" : ""}`}
                            />
                          </>
                        )}
                      </button>

                      {!collapsed && open && (
                        <ul className="mt-0.5 space-y-0.5 border-l border-zinc-200 pl-6">
                          {item.children!.map((child) => {
                            const childActive =
                              pathname === child.href || pathname.startsWith(child.href + "/");
                            return (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={onCloseMobile}
                                  className={`block rounded-lg px-3 py-2 text-sm transition-colors
                                    ${childActive
                                      ? "font-medium text-amber-700"
                                      : "text-zinc-500 hover:text-zinc-900"}
                                  `}
                                >
                                  {child.label}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="shrink-0 border-t border-zinc-200 p-3">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
          >
            <ChevronLeft className="h-[18px] w-[18px] shrink-0 text-zinc-400" />
            {!collapsed && (
              <>
                <span className="flex-1 truncate">Kembali ke Website</span>
                <ExternalLink className="h-3.5 w-3.5 shrink-0 text-zinc-300" />
              </>
            )}
          </Link>
          {!collapsed && (
            <p className="mt-2 px-3 text-[11px] text-zinc-400">
              © 2025 Edukom Jaya Abadi &middot; v1.0.0
            </p>
          )}
        </div>
      </aside>
    </>
  );
}