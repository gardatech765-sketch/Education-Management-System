import { CalendarDays, Info } from "lucide-react";
import StatCardGrid from "@/components/admin/dashboard/StatCardGrid";
import MiniStatGrid from "@/components/admin/dashboard/MiniStatGrid";
import ActivityChart from "@/components/admin/dashboard/ActivityChart";
import ClassStatusDonut from "@/components/admin/dashboard/ClassStatusDonut";
import QuickActions from "@/components/admin/dashboard/QuickActions";
import RecentActivityList from "@/components/admin/dashboard/RecentActivityList";
import TodayClassesTable from "@/components/admin/dashboard/TodayClassesTable";
import RecentPaymentsTable from "@/components/admin/dashboard/RecentPaymentsTable";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Selamat datang kembali, Admin! Kelola sistem bimbel privat dengan mudah.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-600">
          <CalendarDays className="h-4 w-4 text-zinc-400" />
          Kamis, 15 Mei 2025
        </div>
      </div>

      <StatCardGrid />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <ActivityChart />
        </div>
        <div className="space-y-4">
          <ClassStatusDonut />
          <QuickActions />
        </div>
      </div>

      <MiniStatGrid />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <TodayClassesTable />
        </div>
        <RecentActivityList />
      </div>

      <RecentPaymentsTable />

      <div className="flex items-start gap-2 rounded-xl border border-amber-100 bg-amber-50 p-4 text-sm text-amber-800">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        <p>
          Tip: Gunakan menu di sidebar untuk mengakses semua fitur sistem. Pastikan data
          selalu diperbarui untuk laporan yang akurat.
        </p>
      </div>
    </div>
  );
}