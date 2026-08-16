import { Building2, CalendarDays, GraduationCap, TrendingDown, TrendingUp, Users } from "lucide-react";
import Sparkline from "./Sparkline";
import { statCards } from "./data";

const ICONS = {
  amber: Users,
  blue: GraduationCap,
  purple: Building2,
  orange: CalendarDays,
} as const;

const ICON_BG: Record<string, string> = {
  amber: "bg-amber-100 text-amber-600",
  blue: "bg-blue-100 text-blue-600",
  purple: "bg-purple-100 text-purple-600",
  orange: "bg-orange-100 text-orange-600",
};

const LINE_COLOR: Record<string, string> = {
  amber: "#f59e0b",
  blue: "#3b82f6",
  purple: "#a855f7",
  orange: "#f97316",
};

export default function StatCardGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {statCards.map((card) => {
        const Icon = ICONS[card.color];
        const TrendIcon = card.trendUp ? TrendingUp : TrendingDown;
        return (
          <div
            key={card.label}
            className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${ICON_BG[card.color]}`}>
                <Icon className="h-5 w-5" strokeWidth={2} />
              </div>
              <Sparkline data={card.sparkline} color={LINE_COLOR[card.color]} />
            </div>
            <p className="mt-4 text-sm text-zinc-500">{card.label}</p>
            <p className="mt-1 text-2xl font-bold text-zinc-900">{card.value}</p>
            <p
              className={`mt-1 flex items-center gap-1 text-xs font-medium ${
                card.trendUp ? "text-emerald-600" : "text-red-500"
              }`}
            >
              <TrendIcon className="h-3.5 w-3.5" />
              {card.trend}
            </p>
          </div>
        );
      })}
    </div>
  );
}