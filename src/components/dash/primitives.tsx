import type { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown, Lightbulb } from "lucide-react";
import type { ReactNode } from "react";

export const C = {
  c1: "var(--chart-1)", c2: "var(--chart-2)", c3: "var(--chart-3)",
  c4: "var(--chart-4)", c5: "var(--chart-5)", c6: "var(--chart-6)",
  grid: "var(--border)", axis: "var(--muted-foreground)",
};
export const PALETTE: string[] = [C.c1, C.c2, C.c3, C.c4, C.c5, C.c6];

export const axisProps = {
  stroke: C.axis, fontSize: 11, tickLine: false, axisLine: false,
} as const;

export const tooltipProps = {
  contentStyle: {
    background: "var(--card)", border: "1px solid var(--border)",
    borderRadius: 8, fontSize: 12, boxShadow: "var(--shadow-card)",
  },
  cursor: { fill: "var(--muted)" },
};

type Tone = "brand" | "success" | "info" | "warning" | "danger";
const toneCls: Record<Tone, string> = {
  brand: "bg-accent text-accent-foreground",
  success: "bg-success-soft text-success",
  info: "bg-info-soft text-info",
  warning: "bg-warning-soft text-warning",
  danger: "bg-danger-soft text-danger",
};

export function KpiCard({
  label, value, delta, icon: Icon, tone = "brand", hint,
}: { label: string; value: string; delta?: number; icon: LucideIcon; tone?: Tone; hint?: string }) {
  const up = (delta ?? 0) >= 0;
  return (
    <div className="rounded-lg border bg-card p-4 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-overline truncate text-muted-foreground">{label}</p>
          <p className="text-kpi mt-2">{value}</p>
        </div>
        <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-md ${toneCls[tone]}`}>
          <Icon className="h-4.5 w-4.5" />
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1.5 text-xs">
        {delta !== undefined && (
          <span className={`inline-flex items-center gap-0.5 font-medium ${up ? "text-success" : "text-danger"}`}>
            {up ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
            {up ? "+" : ""}{delta}%
          </span>
        )}
        <span className="truncate text-muted-foreground">{hint ?? "vs. mês anterior"}</span>
      </div>
    </div>
  );
}

export function ChartCard({
  title, subtitle, children, className = "", action,
}: { title: string; subtitle?: string; children: ReactNode; className?: string; action?: ReactNode }) {
  return (
    <section className={`flex flex-col rounded-lg border bg-card p-4 shadow-card sm:p-5 ${className}`}>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-card-title">{title}</h3>
          {subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        {action}
      </div>
      <div className="flex-1">{children}</div>
    </section>
  );
}

export function AlertBanner({ icon: Icon, children, action }: { icon: LucideIcon; children: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-warning/30 bg-warning-soft px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="flex items-center gap-2.5 text-sm text-foreground"><Icon className="h-4 w-4 shrink-0 text-warning" />{children}</p>
      {action}
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Ativa: "bg-success-soft text-success", "Em seleção": "bg-info-soft text-info",
    "Stand by": "bg-warning-soft text-warning", Fechada: "bg-muted text-muted-foreground",
  };
  return <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${map[status] ?? "bg-muted text-muted-foreground"}`}>{status}</span>;
}

export function InsightList({ items }: { items: string[] }) {
  return (
    <section className="rounded-lg border border-info/20 bg-info-soft p-4 sm:p-5">
      <div className="mb-3 flex items-center gap-2 text-info">
        <Lightbulb className="h-4 w-4" />
        <h3 className="text-card-title">Insights automáticos</h3>
      </div>
      <ul className="space-y-2 text-sm text-foreground/85">
        {items.map((t) => (
          <li key={t} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-info" />{t}</li>
        ))}
      </ul>
    </section>
  );
}

export function Legend({ items }: { items: { name: string; value: number | string; color?: string | undefined }[] }) {
  return (
    <ul className="space-y-2 text-sm">
      {items.map((i) => (
        <li key={i.name} className="flex items-center justify-between gap-3">
          <span className="flex min-w-0 items-center gap-2">
            <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: i.color }} />
            <span className="truncate text-muted-foreground">{i.name}</span>
          </span>
          <span className="font-medium tabular-nums">{i.value}</span>
        </li>
      ))}
    </ul>
  );
}

export function RankTable({ rows, valueLabel }: { rows: { name: string; value: number; sub?: string }[]; valueLabel: string }) {
  const max = Math.max(...rows.map((r) => r.value));
  return (
    <div>
      <div className="mb-2 flex justify-between text-overline text-muted-foreground">
        <span>Nome</span><span>{valueLabel}</span>
      </div>
      <ul className="space-y-3">
        {rows.map((r, i) => (
          <li key={r.name}>
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="flex min-w-0 items-center gap-2">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded bg-muted text-[10px] font-bold text-muted-foreground">{i + 1}</span>
                <span className="truncate">{r.name}</span>
                {r.sub && <span className="hidden truncate text-xs text-muted-foreground sm:inline">· {r.sub}</span>}
              </span>
              <span className="font-medium tabular-nums">{r.value}</span>
            </div>
            <div className="mt-1.5 h-1.5 rounded-full bg-muted">
              <div className="h-full rounded-full bg-chart-1" style={{ width: `${(r.value / max) * 100}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
