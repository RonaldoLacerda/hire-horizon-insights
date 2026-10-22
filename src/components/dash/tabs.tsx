import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Funnel, FunnelChart, LabelList,
  Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import {
  Users, UserCheck, GraduationCap, MapPin, Briefcase, BriefcaseBusiness, Clock, XCircle,
  Building2, Handshake, Accessibility, Send, Hourglass, FileText, BarChart3, Star, Timer, Target, Award, CalendarCheck,
} from "lucide-react";
import { C, PALETTE, axisProps, tooltipProps, KpiCard, ChartCard, InsightList, Legend, RankTable, StatusBadge } from "./primitives";

const months = ["Mai", "Jun", "Jul", "Ago", "Set", "Out"];

const porDia = [
  { d: "Seg", v: 24 }, { d: "Ter", v: 31 }, { d: "Qua", v: 29 }, { d: "Qui", v: 38 },
  { d: "Sex", v: 42 }, { d: "Sáb", v: 18 }, { d: "Dom", v: 12 },
];
const picoDia = Math.max(...porDia.map((p) => p.v));

const vagasRecentes = [
  { vaga: "Agente Comunitário de Saúde", area: "Saúde", cand: 31, status: "Ativa", data: "20/10/2026" },
  { vaga: "Auxiliar de Serviços Gerais", area: "Serviços Gerais", cand: 19, status: "Ativa", data: "18/10/2026" },
  { vaga: "Recepcionista — UAI Jardim Canadá", area: "Administrativo", cand: 44, status: "Em seleção", data: "15/10/2026" },
  { vaga: "Vendedor(a) — Loja de Materiais", area: "Comercial", cand: 27, status: "Stand by", data: "11/10/2026" },
  { vaga: "Eletricista de Manutenção Predial", area: "Manutenção", cand: 12, status: "Ativa", data: "08/10/2026" },
];

function VagasRecentes() {
  return (
    <ChartCard title="Vagas recentes" subtitle="Últimas publicadas" action={<button className="text-xs font-semibold text-brand hover:underline">Ver todas</button>}>
      <div className="-mx-5 overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b text-left text-overline text-muted-foreground">
              <th className="px-5 py-2 font-semibold">Vaga</th><th className="py-2 font-semibold">Área</th>
              <th className="py-2 font-semibold">Candidaturas</th><th className="py-2 font-semibold">Status</th>
              <th className="py-2 font-semibold">Publicada em</th><th className="px-5 py-2" />
            </tr>
          </thead>
          <tbody>
            {vagasRecentes.map((v) => (
              <tr key={v.vaga} className="border-b last:border-0 hover:bg-muted/50">
                <td className="px-5 py-3 font-medium">{v.vaga}</td>
                <td className="py-3 text-muted-foreground">{v.area}</td>
                <td className="py-3 tabular-nums">{v.cand}</td>
                <td className="py-3"><StatusBadge status={v.status} /></td>
                <td className="py-3 tabular-nums text-muted-foreground">{v.data}</td>
                <td className="px-5 py-3 text-right"><button className="text-xs font-semibold text-brand hover:underline">Alterar status</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ChartCard>
  );
}

/* ---------------- CANDIDATOS ---------------- */
const cadastros = months.map((m, i) => ({ m, cadastros: [92, 110, 134, 121, 148, 168][i], contratados: [12, 15, 18, 14, 21, 25][i] }));
const escolaridade = [
  { name: "Superior", value: 312 }, { name: "Médio/Básico", value: 248 },
  { name: "Técnico", value: 158 }, { name: "Pós-graduação", value: 55 },
];
const origem = [
  { name: "Site de vagas", v: 284 }, { name: "LinkedIn", v: 196 }, { name: "Indicação", v: 121 },
  { name: "Instituição de ensino", v: 98 }, { name: "Redes sociais", v: 74 },
];
const faixa = [
  { f: "16-18", v: 88 }, { f: "19-21", v: 214 }, { f: "22-25", v: 236 },
  { f: "26-30", v: 132 }, { f: "31-40", v: 71 }, { f: "40+", v: 32 },
];
const cidades = [
  { name: "São Paulo", value: 248 }, { name: "Campinas", value: 132 }, { name: "Santo André", value: 96 },
  { name: "Guarulhos", value: 74 }, { name: "Osasco", value: 58 },
];

export function CandidatosTab() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Candidatos cadastrados" value="773" delta={13.5} icon={Users} />
        <KpiCard label="Contratados" value="105" delta={19} icon={UserCheck} tone="success" />
        <KpiCard label="Pessoas com Deficiência (PCD)" value="52" delta={6.2} icon={Accessibility} tone="info" hint="7% da base" />
        <KpiCard label="Perfil completo" value="68%" delta={-2.1} icon={Target} tone="warning" hint="currículos 100% preenchidos" />
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <ChartCard title="Evolução de cadastros e contratações" subtitle="Últimos 6 meses" className="xl:col-span-2">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={cadastros} margin={{ left: -20, right: 8 }}>
              <defs>
                <linearGradient id="gCad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={C.c1} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={C.c1} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={C.grid} vertical={false} />
              <XAxis dataKey="m" {...axisProps} />
              <YAxis {...axisProps} />
              <Tooltip {...tooltipProps} />
              <Area type="monotone" dataKey="cadastros" name="Cadastros" stroke={C.c1} strokeWidth={2} fill="url(#gCad)" />
              <Area type="monotone" dataKey="contratados" name="Contratados" stroke={C.c3} strokeWidth={2} fill="transparent" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Candidatos por escolaridade" subtitle="Base total">
          <div className="grid grid-cols-[140px_1fr] items-center gap-4">
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie data={escolaridade} dataKey="value" innerRadius={44} outerRadius={66} paddingAngle={2} stroke="none">
                  {escolaridade.map((_, i) => <Cell key={i} fill={PALETTE[i]} />)}
                </Pie>
                <Tooltip {...tooltipProps} />
              </PieChart>
            </ResponsiveContainer>
            <Legend items={escolaridade.map((e, i) => ({ name: e.name, value: e.value, color: PALETTE[i] }))} />
          </div>
        </ChartCard>
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <ChartCard title="Origem dos candidatos" subtitle="Canal de captação">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={origem} layout="vertical" margin={{ left: 10 }}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" width={120} {...axisProps} />
              <Tooltip {...tooltipProps} />
              <Bar dataKey="v" name="Candidatos" fill={C.c2} radius={[0, 4, 4, 0]} barSize={14} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Faixa etária" subtitle="Distribuição por idade">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={faixa} margin={{ left: -20 }}>
              <CartesianGrid stroke={C.grid} vertical={false} />
              <XAxis dataKey="f" {...axisProps} />
              <YAxis {...axisProps} />
              <Tooltip {...tooltipProps} />
              <Bar dataKey="v" name="Candidatos" fill={C.c1} radius={[4, 4, 0, 0]} barSize={22} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Principais cidades" subtitle="Onde estão os candidatos" action={<MapPin className="h-4 w-4 text-muted-foreground" />}>
          <RankTable rows={cidades} valueLabel="Candidatos" />
        </ChartCard>
      </div>

      <ChartCard title="Candidaturas por dia — últimos 7 dias" subtitle="Picos destacados indicam melhores dias para divulgar vagas">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={porDia} margin={{ left: -20, top: 18 }}>
            <XAxis dataKey="d" {...axisProps} />
            <YAxis hide />
            <Tooltip {...tooltipProps} />
            <Bar dataKey="v" name="Candidaturas" radius={[6, 6, 0, 0]} barSize={34}>
              {porDia.map((p, i) => <Cell key={i} fill={p.v >= picoDia * 0.85 ? C.c1 : "var(--muted)"} />)}
              <LabelList dataKey="v" position="top" fill="var(--foreground)" fontSize={12} fontWeight={600} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <InsightList items={[
        "Quinta e sexta concentram 41% das candidaturas da semana — publique vagas novas no início da semana.",
        "Cadastros cresceram 13,5% no mês, puxados por Site de vagas e LinkedIn.",
        "32% da base ainda tem currículo incompleto — considere campanha de atualização.",
        "Faixa 19–25 anos concentra 58% dos candidatos: alto potencial para programas de estágio.",
      ]} />
    </div>
  );
}

/* ---------------- VAGAS ---------------- */
const situacao = [
  { name: "Abertas", value: 214 }, { name: "Prospecção", value: 14 }, { name: "Stand by", value: 9 },
  { name: "Solicitando doc.", value: 4 }, { name: "Fechadas", value: 7 }, { name: "Canceladas", value: 7 },
];
const vagasMes = months.map((m, i) => ({ m, abertas: [32, 41, 38, 45, 52, 47][i], fechadas: [8, 11, 9, 14, 12, 16][i] }));
const areas = [
  { a: "Administrativo", v: 62 }, { a: "Comercial", v: 48 }, { a: "TI", v: 41 },
  { a: "Operações", v: 36 }, { a: "Financeiro", v: 28 }, { a: "Marketing", v: 21 },
];
const tipo = [{ name: "CLT", value: 128 }, { name: "Estágio", value: 84 }, { name: "Jovem aprendiz", value: 26 }, { name: "PJ / Temporário", value: 17 }];
const tempoArea = [
  { a: "TI", d: 34 }, { a: "Financeiro", d: 26 }, { a: "Comercial", d: 19 }, { a: "Administrativo", d: 15 }, { a: "Operações", d: 12 },
];

export function VagasTab() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Vagas abertas" value="214" delta={4.1} icon={BriefcaseBusiness} tone="info" />
        <KpiCard label="Taxa de preenchimento" value="78%" delta={4} icon={Target} tone="success" hint="vagas preenchidas no prazo" />
        <KpiCard label="Tempo médio p/ fechar" value="21 dias" delta={-12} icon={Clock} tone="success" hint="mais rápido que set." />
        <KpiCard label="Vagas paradas +30 dias" value="23" delta={9} icon={XCircle} tone="danger" hint="exigem atenção" />
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <ChartCard title="Situação das vagas" subtitle="Status atual">
          <div className="grid grid-cols-[140px_1fr] items-center gap-4">
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie data={situacao} dataKey="value" innerRadius={46} outerRadius={68} paddingAngle={2} stroke="none">
                  {situacao.map((_, i) => <Cell key={i} fill={PALETTE[i]} />)}
                </Pie>
                <Tooltip {...tooltipProps} />
              </PieChart>
            </ResponsiveContainer>
            <Legend items={situacao.map((e, i) => ({ name: e.name, value: e.value, color: PALETTE[i] }))} />
          </div>
        </ChartCard>
        <ChartCard title="Abertura x fechamento de vagas" subtitle="Últimos 6 meses" className="xl:col-span-2">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={vagasMes} margin={{ left: -20 }}>
              <CartesianGrid stroke={C.grid} vertical={false} />
              <XAxis dataKey="m" {...axisProps} />
              <YAxis {...axisProps} />
              <Tooltip {...tooltipProps} />
              <Bar dataKey="abertas" name="Abertas" fill={C.c2} radius={[4, 4, 0, 0]} barSize={18} />
              <Bar dataKey="fechadas" name="Fechadas" fill={C.c1} radius={[4, 4, 0, 0]} barSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <ChartCard title="Vagas por área">
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={areas} layout="vertical" margin={{ left: 10 }}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="a" width={100} {...axisProps} />
              <Tooltip {...tooltipProps} />
              <Bar dataKey="v" name="Vagas" fill={C.c1} radius={[0, 4, 4, 0]} barSize={14} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Tipo de contratação" subtitle="Inclui vagas de estágio">
          <div className="space-y-4 pt-2">
            {tipo.map((t, i) => {
              const pct = Math.round((t.value / 255) * 100);
              return (
                <div key={t.name}>
                  <div className="flex justify-between text-sm"><span>{t.name}</span><span className="font-medium tabular-nums">{t.value} <span className="text-muted-foreground">· {pct}%</span></span></div>
                  <div className="mt-1.5 h-2 rounded-full bg-muted"><div className="h-full rounded-full" style={{ width: `${pct}%`, background: PALETTE[i] }} /></div>
                </div>
              );
            })}
          </div>
        </ChartCard>
        <ChartCard title="Tempo médio de fechamento" subtitle="Dias por área">
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={tempoArea} margin={{ left: -20 }}>
              <CartesianGrid stroke={C.grid} vertical={false} />
              <XAxis dataKey="a" {...axisProps} interval={0} fontSize={10} />
              <YAxis {...axisProps} />
              <Tooltip {...tooltipProps} />
              <Bar dataKey="d" name="Dias" radius={[4, 4, 0, 0]} barSize={22}>
                {tempoArea.map((t, i) => <Cell key={i} fill={t.d > 25 ? C.c1 : C.c6} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <VagasRecentes />

      <InsightList items={[
        "Vagas de TI levam 34 dias para fechar — 62% acima da média geral.",
        "23 vagas estão sem movimentação há mais de 30 dias.",
        "Estágio representa 33% das vagas: maior participação dos últimos 6 meses.",
      ]} />
    </div>
  );
}

/* ---------------- EMPRESAS ---------------- */
const topEmpresas = [
  { name: "Grupo Alfa Logística", value: 38, sub: "Logística" }, { name: "Banco Horizonte", value: 31, sub: "Financeiro" },
  { name: "TechNova Sistemas", value: 27, sub: "TI" }, { name: "Varejo Bom Preço", value: 22, sub: "Varejo" },
  { name: "Construtora Pilar", value: 15, sub: "Construção" },
];
const segmentos = [{ name: "Serviços", value: 11 }, { name: "Varejo", value: 7 }, { name: "Indústria", value: 5 }, { name: "TI", value: 4 }, { name: "Financeiro", value: 3 }];
const empresasMes = months.map((m, i) => ({ m, ativas: [22, 23, 25, 26, 28, 30][i], novas: [1, 2, 3, 1, 2, 3][i] }));
const contratosEstagio = [
  { e: "Banco Horizonte", ativos: 18, vencendo: 3 }, { e: "TechNova", ativos: 14, vencendo: 5 },
  { e: "Grupo Alfa", ativos: 11, vencendo: 1 }, { e: "Bom Preço", ativos: 9, vencendo: 2 },
];

export function EmpresasTab() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Empresas ativas" value="30" delta={7.1} icon={Building2} />
        <KpiCard label="Novas no mês" value="3" delta={50} icon={Handshake} tone="success" />
        <KpiCard label="Vagas enviadas por empresas" value="18" delta={12} icon={Send} tone="warning" hint="no mês" />
        <KpiCard label="Aguardando aprovação" value="2" icon={Hourglass} tone="info" hint="vagas de empresas parceiras" />
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <ChartCard title="Empresas que mais abrem vagas" subtitle="Últimos 6 meses" className="xl:col-span-2">
          <RankTable rows={topEmpresas} valueLabel="Vagas" />
        </ChartCard>
        <ChartCard title="Empresas por segmento">
          <div className="grid grid-cols-[130px_1fr] items-center gap-4">
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie data={segmentos} dataKey="value" innerRadius={42} outerRadius={64} paddingAngle={2} stroke="none">
                  {segmentos.map((_, i) => <Cell key={i} fill={PALETTE[i]} />)}
                </Pie>
                <Tooltip {...tooltipProps} />
              </PieChart>
            </ResponsiveContainer>
            <Legend items={segmentos.map((e, i) => ({ name: e.name, value: e.value, color: PALETTE[i] }))} />
          </div>
        </ChartCard>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <ChartCard title="Crescimento da carteira" subtitle="Empresas ativas por mês">
          <ResponsiveContainer width="100%" height={230}>
            <LineChart data={empresasMes} margin={{ left: -20, right: 8 }}>
              <CartesianGrid stroke={C.grid} vertical={false} />
              <XAxis dataKey="m" {...axisProps} />
              <YAxis {...axisProps} />
              <Tooltip {...tooltipProps} />
              <Line type="monotone" dataKey="ativas" name="Ativas" stroke={C.c1} strokeWidth={2.5} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="novas" name="Novas" stroke={C.c3} strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Contratos de estágio por empresa" subtitle="Ativos e vencendo em 30 dias">
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={contratosEstagio} margin={{ left: -20 }}>
              <CartesianGrid stroke={C.grid} vertical={false} />
              <XAxis dataKey="e" {...axisProps} />
              <YAxis {...axisProps} />
              <Tooltip {...tooltipProps} />
              <Bar dataKey="ativos" name="Ativos" stackId="a" fill={C.c2} barSize={28} />
              <Bar dataKey="vencendo" name="Vencendo" stackId="a" fill={C.c4} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <InsightList items={[
        "As 3 maiores empresas concentram 47% das vagas — risco de dependência da carteira.",
        "11 contratos de estágio vencem nos próximos 30 dias; antecipe renovações.",
        "TechNova tem o maior índice de vencimentos: agende reunião de alinhamento.",
      ]} />
    </div>
  );
}

/* ---------------- PROCESSOS ---------------- */
const funil = [
  { name: "Inscritos", value: 1240, fill: C.c2 }, { name: "Triagem", value: 640, fill: C.c5 },
  { name: "Entrevista", value: 310, fill: C.c4 }, { name: "Teste/Dinâmica", value: 168, fill: C.c3 },
  { name: "Aprovados", value: 105, fill: C.c1 },
];
const etapaTempo = [{ e: "Triagem", d: 3 }, { e: "Entrevista", d: 6 }, { e: "Teste", d: 4 }, { e: "Proposta", d: 5 }, { e: "Admissão", d: 3 }];
const ranking = [
  { name: "Samii Teste", value: 34 }, { name: "Administrador", value: 27 }, { name: "Jaylon Leannon", value: 19 },
  { name: "Chaya Legros", value: 14 }, { name: "Jovan Walker", value: 11 },
];
const reprova = [{ name: "Perfil técnico", value: 38 }, { name: "Desistência", value: 24 }, { name: "Pretensão salarial", value: 18 }, { name: "Não compareceu", value: 20 }];

export function ProcessosTab() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Processos em andamento" value="86" delta={5.3} icon={Timer} />
        <KpiCard label="Taxa de conversão" value="8,5%" delta={1.2} icon={Target} tone="success" hint="inscrito → aprovado" />
        <KpiCard label="Candidaturas totais" value="1.240" delta={18} icon={FileText} tone="info" hint="últimos 90 dias" />
        <KpiCard label="Média de candidaturas por vaga" value="26,6" delta={3.4} icon={BarChart3} tone="warning" hint="vagas ativas" />
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <ChartCard title="Funil do processo seletivo" subtitle="Conversão por etapa · últimos 90 dias" className="xl:col-span-2">
          <ResponsiveContainer width="100%" height={280}>
            <FunnelChart>
              <Tooltip {...tooltipProps} />
              <Funnel dataKey="value" data={funil} isAnimationActive>
                <LabelList position="right" dataKey="name" fill="var(--foreground)" stroke="none" fontSize={12} />
                <LabelList position="center" dataKey="value" fill="var(--card)" stroke="none" fontSize={12} fontWeight={600} />
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Ranking — quem mais contratou" subtitle="Usuário responsável">
          <RankTable rows={ranking} valueLabel="Contratações" />
        </ChartCard>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <ChartCard title="Tempo médio por etapa" subtitle="Dias — identifique gargalos">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={etapaTempo} margin={{ left: -20 }}>
              <CartesianGrid stroke={C.grid} vertical={false} />
              <XAxis dataKey="e" {...axisProps} />
              <YAxis {...axisProps} />
              <Tooltip {...tooltipProps} />
              <Bar dataKey="d" name="Dias" radius={[4, 4, 0, 0]} barSize={28}>
                {etapaTempo.map((t, i) => <Cell key={i} fill={t.d >= 6 ? C.c1 : C.c6} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Motivos de reprovação" subtitle="% dos candidatos eliminados">
          <div className="grid grid-cols-[140px_1fr] items-center gap-4">
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={reprova} dataKey="value" innerRadius={46} outerRadius={70} paddingAngle={2} stroke="none">
                  {reprova.map((_, i) => <Cell key={i} fill={PALETTE[i]} />)}
                </Pie>
                <Tooltip {...tooltipProps} />
              </PieChart>
            </ResponsiveContainer>
            <Legend items={reprova.map((e, i) => ({ name: e.name, value: `${e.value}%`, color: PALETTE[i] }))} />
          </div>
        </ChartCard>
      </div>

      <InsightList items={[
        "A etapa de Entrevista é o maior gargalo: 6 dias em média.",
        "Triagem elimina 48% dos inscritos — revise requisitos dos anúncios.",
        "20% de não comparecimento: ative lembretes automáticos via Agenda.",
      ]} />
    </div>
  );
}
