"use client";

import { useState } from "react";
import Tabs from "@/components/admin/ui/Tabs";
import UsersSection from "@/components/admin/pengguna/UsersSection";
import RolesSection from "@/components/admin/pengguna/RolesSection";

export default function ManajemenPenggunaPage() {
  const [tab, setTab] = useState<"users" | "roles">("users");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Manajemen Pengguna</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Kelola akun pengguna sistem dan role/hak aksesnya.
        </p>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
        <Tabs
          tabs={[
            { key: "users", label: "Pengguna" },
            { key: "roles", label: "Role & Hak Akses" },
          ]}
          active={tab}
          onChange={(k) => setTab(k as "users" | "roles")}
        />

        <div className="mt-5">
          {tab === "users" ? <UsersSection /> : <RolesSection />}
        </div>
      </div>
    </div>
  );
}