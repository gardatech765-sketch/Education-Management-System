import { CircleDollarSign, Star, Users, Wallet } from "lucide-react";
import { statCards } from "./data";

const ICONS = {
  sesi: Users,
  pendapatan: Wallet,
  transport: CircleDollarSign,
  rating: Star,
} as const;

export default function StatCardGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {statCards.map((card) => {
        const Icon = ICONS[card.icon];
        return (
          <div key={card.label} className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
              <Icon className="h-5 w-5" strokeWidth={2} />
            </div>
            <p className="mt-4 text-sm text-zinc-500">{card.label}</p>
            <p className="mt-1 text-2xl font-bold text-zinc-900">{card.value}</p>
            <p className="mt-1 text-xs font-medium text-emerald-600">{card.trend}</p>
          </div>
        );
      })}
    </div>
  );
}