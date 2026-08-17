import Badge from "@/components/admin/ui/Badge";
import { formatDateTime, type AksiLog, type AuditLog } from "./dummy";

const AKSI_COLOR: Record<AksiLog, "green" | "amber" | "red" | "blue" | "zinc"> = {
  CREATE: "green",
  UPDATE: "amber",
  DELETE: "red",
  LOGIN: "blue",
  LOGOUT: "zinc",
};

function PayloadBlock({ title, data }: { title: string; data: Record<string, unknown> | null }) {
  return (
    <div>
      <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-zinc-400">
        {title}
      </p>
      {data ? (
        <pre className="overflow-x-auto rounded-lg bg-zinc-50 p-3 text-xs text-zinc-700">
          {JSON.stringify(data, null, 2)}
        </pre>
      ) : (
        <p className="rounded-lg bg-zinc-50 p-3 text-xs text-zinc-400">— tidak ada data —</p>
      )}
    </div>
  );
}

export default function AuditLogDetail({ log }: { log: AuditLog }) {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        <Badge color={AKSI_COLOR[log.aksi]}>{log.aksi}</Badge>
        <Badge color="zinc">{log.modul}</Badge>
      </div>

      <dl className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-xs text-zinc-400">Pengguna</dt>
          <dd className="font-medium text-zinc-800">{log.user_nama}</dd>
          <dd className="text-xs text-zinc-400">{log.user_role}</dd>
        </div>
        <div>
          <dt className="text-xs text-zinc-400">Waktu</dt>
          <dd className="font-medium text-zinc-800">{formatDateTime(log.created_at)}</dd>
        </div>
        <div>
          <dt className="text-xs text-zinc-400">Alamat IP</dt>
          <dd className="font-medium text-zinc-800">{log.ip_address}</dd>
        </div>
      </dl>

      <div className="space-y-4 border-t border-zinc-100 pt-4">
        <PayloadBlock title="Data Sebelum (payload_lama)" data={log.payload_lama} />
        <PayloadBlock title="Data Sesudah (payload_baru)" data={log.payload_baru} />
      </div>
    </div>
  );
}