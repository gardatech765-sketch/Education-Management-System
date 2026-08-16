import Link from "next/link";
import {
  CalendarPlus,
  ClipboardCheck,
  FilePlus2,
  GraduationCap,
  ReceiptText,
  UserPlus,
} from "lucide-react";
import { quickActions } from "./data";

const ICONS = {
  addTutor: UserPlus,
  addStudent: GraduationCap,
  createClass: FilePlus2,
  schedule: CalendarPlus,
  attendanceCheck: ClipboardCheck,
  invoiceCreate: ReceiptText,
} as const;

export default function QuickActions() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <h2 className="text-sm font-semibold text-zinc-900">Aksi Cepat</h2>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {quickActions.map((action) => {
          const Icon = ICONS[action.icon];
          return (
            <Link
              key={action.label}
              href={action.href}
              className="flex flex-col items-start gap-3 rounded-lg border border-zinc-100 p-3 transition-colors hover:border-amber-200 hover:bg-amber-50/50"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
              </div>
              <span className="text-xs font-medium leading-tight text-zinc-700">
                {action.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}