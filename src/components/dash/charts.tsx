import { Bar, BarChart, CartesianGrid, Cell, Legend as ChartLegend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import { C, PALETTE, axisProps, tooltipProps, ChartCard, Legend, AnalysisTag, type ChartInfo } from "./primitives";

export type Distribution = { name: string; value: number; color?: string };
type CardProps = { title: string; subtitle?: string; info?: ChartInfo; analysis?: boolean; className?: string };

export function DistributionChart({ data, donut = false, ...card }: CardProps & { data: Distribution[]; donut?: boolean }) {
  const mobile = useIsMobile();
  return <ChartCard {...card}>
    {donut ? <div className="flex flex-wrap items-center justify-center gap-5">
      <div className="w-36 shrink-0"><ResponsiveContainer width="100%" height={160}><PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={48} outerRadius={70} paddingAngle={2} stroke="none" isAnimationActive={false}>
          {data.map((item, index) => <Cell key={item.name} fill={item.color ?? PALETTE[index % PALETTE.length]} />)}
        </Pie><Tooltip {...tooltipProps} />
      </PieChart></ResponsiveContainer></div>
      <div className="min-w-36 flex-1"><Legend items={data.map((item, index) => ({ ...item, color: item.color ?? PALETTE[index % PALETTE.length] }))} /></div>
    </div> : <ResponsiveContainer width="100%" height={Math.max(220, data.length * 33)}><BarChart data={data} layout="vertical" margin={{ left: 0, right: 24 }}>
      <CartesianGrid stroke={C.grid} horizontal={false} /><XAxis type="number" {...axisProps} allowDecimals={false} />
      <YAxis type="category" dataKey="name" width={mobile ? 92 : 130} {...axisProps} /><Tooltip {...tooltipProps} />
      <Bar dataKey="value" name="Total" fill={C.c2} radius={[0, 4, 4, 0]} barSize={15} isAnimationActive={false} label={{ position: "right", fill: C.axis, fontSize: 11 }} />
    </BarChart></ResponsiveContainer>}
  </ChartCard>;
}

export function TimelineChart({ data, series, bars = false, ...card }: CardProps & { data: Record<string, string | number>[]; series: { key: string; name: string }[]; bars?: boolean }) {
  const mobile = useIsMobile();
  const contents = [
    <CartesianGrid key="grid" stroke={C.grid} vertical={false} />,
    <XAxis key="x" dataKey="m" {...axisProps} />,
    <YAxis key="y" {...axisProps} width={mobile ? 28 : 35} />,
    <Tooltip key="tooltip" {...tooltipProps} />,
    <ChartLegend key="legend" iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, paddingTop: 16 }} />,
    ...series.map((s, i) => bars ? <Bar key={s.key} dataKey={s.key} name={s.name} fill={PALETTE[i]} radius={[4, 4, 0, 0]} maxBarSize={30} isAnimationActive={false} /> : <Line key={s.key} type="monotone" dataKey={s.key} name={s.name} stroke={PALETTE[i]} strokeWidth={2.5} dot={{ r: 3 }} isAnimationActive={false} />),
  ];
  return <ChartCard {...card}><ResponsiveContainer width="100%" height={mobile ? 220 : 260}>
    {bars ? <BarChart data={data}>{contents}</BarChart> : <LineChart data={data}>{contents}</LineChart>}
  </ResponsiveContainer></ChartCard>;
}

// Compara grupos de tamanhos diferentes pela participação percentual de cada categoria no total do grupo.
export function ComparisonChart({ data, series, ...card }: CardProps & { data: ({ name: string } & Record<string, string | number>)[]; series: { key: string; name: string }[] }) {
  const mobile = useIsMobile();
  const totals = Object.fromEntries(series.map((s) => [s.key, data.reduce((sum, row) => sum + Number(row[s.key] ?? 0), 0)]));
  const rows = data.map((row) => ({ ...row, ...Object.fromEntries(series.map((s) => [`${s.key}Pct`, Math.round((Number(row[s.key] ?? 0) / (totals[s.key] || 1)) * 1000) / 10])) }));
  const pct = (value: unknown) => `${String(value).replace(".", ",")}%`;
  return <ChartCard {...card}><ResponsiveContainer width="100%" height={Math.max(260, data.length * 48)}>
    <BarChart data={rows} layout="vertical" margin={{ left: 0, right: 36 }} barGap={2}>
      <CartesianGrid stroke={C.grid} horizontal={false} /><XAxis type="number" {...axisProps} tickFormatter={pct} />
      <YAxis type="category" dataKey="name" width={mobile ? 92 : 110} {...axisProps} />
      <Tooltip {...tooltipProps} formatter={(value, name, item) => [`${pct(value)} · ${item.payload[String(item.dataKey).replace(/Pct$/, "")]}`, name]} />
      <ChartLegend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
      {series.map((s, i) => <Bar key={s.key} dataKey={`${s.key}Pct`} name={s.name} fill={PALETTE[i + 1]} radius={[0, 4, 4, 0]} barSize={11} isAnimationActive={false} label={{ position: "right", fill: C.axis, fontSize: 10, formatter: pct }} />)}
    </BarChart>
  </ResponsiveContainer></ChartCard>;
}

export function SectionHeading({ title, note, analysis = false }: { title: string; note?: string; analysis?: boolean }) {
  return <div className="flex flex-wrap items-baseline justify-between gap-2 border-b pb-3 pt-3"><h2 className="flex items-center gap-2 text-base font-semibold">{title}{analysis && <AnalysisTag />}</h2>{note && <span className="text-xs text-muted-foreground">{note}</span>}</div>;
}
