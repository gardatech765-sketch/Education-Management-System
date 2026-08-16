import { CircleDollarSign, FileWarning, Star, UserCheck, TrendingDown, TrendingUp } from "lucide-react";
import { miniStats } from "./data";

const ICONS = {
  revenue: CircleDollarSign,
  invoice: FileWarning,
  attendance: UserCheck,
  rating: Star,
} as const;

export default function MiniStatGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {miniStats.map((stat) => {
        const Icon = ICONS[stat.icon];
        const TrendIcon = stat.trendUp ? TrendingUp : TrendingDown;
        return (
          <div
            key={stat.label}
            className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
              <Icon className="h-5 w-5" strokeWidth={2} />
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs text-zinc-500">{stat.label}</p>
              <p className="text-lg font-bold text-zinc-900">{stat.value}</p>
              <p
                className={`flex items-center gap-1 text-[11px] font-medium ${
                  stat.trendUp ? "text-emerald-600" : "text-red-500"
                }`}
              >
                <TrendIcon className="h-3 w-3" />
                {stat.trend}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}