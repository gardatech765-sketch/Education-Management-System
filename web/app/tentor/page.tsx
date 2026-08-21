import StatCardGrid from "@/components/tentor/dashboard/StatCardGrid";
import KelasTerdekatCard from "@/components/tentor/dashboard/KelasTerdekatCard";
import TodoListCard from "@/components/tentor/dashboard/TodoListCard";
import JadwalHariIniCard from "@/components/tentor/dashboard/JadwalHariIniCard";
import RingkasanPendapatanCard from "@/components/tentor/dashboard/RingkasanPendapatanCard";
import KelasTerakhirTable from "@/components/tentor/dashboard/KelasTerakhirTable";
import NotifikasiTerbaruCard from "@/components/tentor/dashboard/NotifikasiTerbaruCard";

export default function TentorDashboardPage() {
  return (
    <div className="space-y-6">
      <StatCardGrid />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="space-y-4">
          <KelasTerdekatCard />
          <TodoListCard />
        </div>
        <JadwalHariIniCard />
        <RingkasanPendapatanCard />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <KelasTerakhirTable />
        </div>
        <NotifikasiTerbaruCard />
      </div>
    </div>
  );
}