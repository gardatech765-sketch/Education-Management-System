const STYLES: Record<string, string> = {
  Selesai: "bg-emerald-50 text-emerald-700",
  Lunas: "bg-emerald-50 text-emerald-700",
  Berlangsung: "bg-amber-50 text-amber-700",
  Dijadwalkan: "bg-zinc-100 text-zinc-600",
  Dibatalkan: "bg-red-50 text-red-700",
  Pending: "bg-amber-50 text-amber-700",
  Terlambat: "bg-red-50 text-red-700",
};

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
        STYLES[status] ?? "bg-zinc-100 text-zinc-600"
      }`}
    >
      {status}
    </span>
  );
}