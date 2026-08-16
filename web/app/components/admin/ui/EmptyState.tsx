import { Inbox } from "lucide-react";

export default function EmptyState({
  title = "Belum ada data",
  description,
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-14 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 text-zinc-400">
        <Inbox className="h-6 w-6" />
      </div>
      <p className="mt-3 text-sm font-medium text-zinc-700">{title}</p>
      {description && <p className="mt-1 text-sm text-zinc-400">{description}</p>}
    </div>
  );
}