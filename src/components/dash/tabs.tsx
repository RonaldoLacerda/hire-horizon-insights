import { useState } from "react";
import { Users, UserCheck, GraduationCap, MapPin, BriefcaseBusiness, Clock, XCircle, Building2, Accessibility, Send, Hourglass, FileText, Timer, Target, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { KpiCard, ChartCard, InsightList, RankTable, StatusBadge } from "./primitives";
import { DistributionChart, TimelineChart, SectionHeading } from "./charts";
import { pendingApprovals, pendingCounts } from "./approvals";
import { months, escolaridade, escolaridadeVagas, bairros, origem, faixa, situacao, areas, topEmpresas, vagasRecentes, recrutadores } from "./data";

const grid = "grid gap-5 lg:grid-cols-2 xl:grid-cols-3";
const kpis = "grid gap-4 sm:grid-cols-2 xl:grid-cols-4";
const series = (values: number[], key = "value") => months.map((m, i) => ({ m, [key]: values[i] ?? 0 }));

function VagasRecentes() {
  const [rows, setRows] = useState(vagasRecentes);
  return <ChartCard title="Vagas recentes" subtitle="Últimas publicadas">
    <div className="overflow-x-auto"><table className="w-full min-w-[740px] text-sm">
      <thead><tr className="border-b text-left text-overline text-muted-foreground">{["Vaga", "Área", "Candidaturas", "Status", "Publicada em", ""].map((h, i) => <th key={i} className="px-3 py-3 font-medium">{h}</th>)}</tr></thead>
      <tbody>{rows.map((v) => <tr key={v.vaga} className="border-b last:border-0 hover:bg-muted/50">
        <td className="px-3 py-3 font-medium">{v.vaga}</td><td className="px-3 py-3 text-muted-foreground">{v.area}</td><td className="px-3 py-3 tabular-nums">{v.cand}</td>
        <td className="px-3 py-3"><StatusBadge status={v.status} /></td><td className="px-3 py-3 text-muted-foreground">{v.data}</td>
        <td className="px-3 py-3"><label className="sr-only" htmlFor={`status-${v.vaga}`}>Status de {v.vaga}</label><select id={`status-${v.vaga}`} className="h-8 rounded-md border bg-card px-2 text-xs" value={v.status} onChange={(e) => setRows(rows.map((row) => row.vaga === v.vaga ? { ...row, status: e.target.value } : row))}>
          {["Ativa", "Em seleção", "Stand by", "Fechada"].map((s) => <option key={s}>{s}</option>)}
        </select></td>
      </tr>)}</tbody>
    </table></div>
  </ChartCard>;
}

function Aprovacoes({ kind }: { kind: "vaga" | "empresa" }) {
  const items = pendingApprovals.filter((p) => p.kind === kind);
  if (items.length === 0) return null;
  return <div id="aprovacoes"><ChartCard title={kind === "vaga" ? "Solicitações de vagas pendentes" : "Empresas aguardando aprovação"} subtitle="Solicitações recebidas">
    <div className="overflow-x-auto"><table className="w-full min-w-[480px] text-sm">
      <thead><tr className="border-b text-left text-overline text-muted-foreground"><th className="py-3 font-medium">{kind === "vaga" ? "Vaga" : "Empresa"}</th><th className="py-3 font-medium">{kind === "vaga" ? "Empresa" : "Setor"}</th><th className="py-3 font-medium">Recebida em</th><th className="py-3 font-medium">Situação</th></tr></thead>
      <tbody>{items.map((p) => <tr key={p.id} className="border-b last:border-0"><td className="py-3 font-medium">{p.name}</td><td className="py-3 text-muted-foreground">{p.org}</td><td className="py-3 text-muted-foreground">{p.sentAt}</td><td className="py-3 text-warning">Pendente</td></tr>)}</tbody>
    </table></div>
  </ChartCard></div>;
}

export function CandidatosTab() {
  return <div className="space-y-5">
    <div className={kpis}>
      <KpiCard label="Candidatos cadastrados" value="773" delta={13.5} icon={Users} />
      <KpiCard label="Bairro com mais candidatos" value="Centro" icon={MapPin} tone="success" hint="148 candidatos · 19,1% da base" />
      <KpiCard label="Pessoas com deficiência" value="52" icon={Accessibility} tone="info" hint="6,7% da base cadastrada" />
      <KpiCard label="Jovem Aprendiz" value="180" icon={GraduationCap} tone="warning" hint="candidatos interessados" />
    </div>
    <SectionHeading title="Perfil dos candidatos" note="Base cadastrada" />
    <div className={grid}>
      <DistributionChart title="Escolaridade dos candidatos" data={escolaridade} donut />
      <DistributionChart title="Escolaridade mínima exigida pelas vagas" data={escolaridadeVagas} />
      <DistributionChart title="Faixa etária" data={faixa} />
      <ChartCard title="Bairros dos candidatos" subtitle="8 maiores concentrações"><RankTable rows={bairros} valueLabel="Candidatos" /></ChartCard>
      <DistributionChart title="Área de interesse dos candidatos" subtitle="Interesse principal informado" data={[{ name: "Administrativo", value: 220 }, { name: "Comercial", value: 175 }, { name: "TI", value: 138 }, { name: "Operações", value: 110 }, { name: "Financeiro", value: 80 }, { name: "Outras", value: 50 }]} />
      <DistributionChart title="Perfil de cadastro" data={[{ name: "Completo", value: 526 }, { name: "Incompleto", value: 247 }]} donut />
    </div>
    <SectionHeading title="Captação e evolução da base" note="Histórico e canais de origem" />
    <div className={grid}>
      <TimelineChart title="Candidaturas por dia" subtitle="Últimos 7 dias" bars data={[{ m: "Seg", value: 24 }, { m: "Ter", value: 31 }, { m: "Qua", value: 29 }, { m: "Qui", value: 38 }, { m: "Sex", value: 42 }, { m: "Sáb", value: 18 }, { m: "Dom", value: 12 }]} series={[{ key: "value", name: "Candidaturas" }]} />
      <DistributionChart title="Candidatos por canal de origem" data={origem} />
      <TimelineChart title="Cadastros e contratações" subtitle="Últimos 6 meses" data={months.map((m, i) => ({ m, cadastros: [92, 110, 134, 121, 148, 168][i] ?? 0, contratados: [12, 15, 18, 14, 21, 25][i] ?? 0 }))} series={[{ key: "cadastros", name: "Cadastros" }, { key: "contratados", name: "Contratados" }]} />
    </div>
    <div className="grid gap-5 lg:grid-cols-2">
      <DistributionChart title="Situação cadastral" subtitle="Status atual · 773 candidatos" data={[{ name: "Ativos", value: 680 }, { name: "Inativos", value: 93 }]} donut />
      <TimelineChart title="Movimentação cadastral" subtitle="Cadastros, atualizações e exclusões por mês" bars data={months.map((m, i) => ({ m, novos: [92, 110, 134, 121, 148, 168][i] ?? 0, atualizados: [45, 58, 67, 63, 82, 94][i] ?? 0, excluidos: [3, 5, 4, 6, 4, 7][i] ?? 0 }))} series={[{ key: "novos", name: "Cadastrados" }, { key: "atualizados", name: "Atualizados" }, { key: "excluidos", name: "Excluídos" }]} />
    </div>
    <InsightList items={["Centro concentra 148 candidatos; os oito principais bairros somam 673 pessoas.", "247 candidatos têm cadastro incompleto — oportunidade para uma campanha de atualização.", "Quinta e sexta concentram 41% das candidaturas da semana."]} />
  </div>;
}

export function VagasTab() {
  return <div className="space-y-5">
    <div className={kpis}>
      <KpiCard label="Vagas ativas" value="214" delta={4.1} icon={BriefcaseBusiness} tone="info" />
      <KpiCard label="Candidaturas totais" value="1.240" delta={18} icon={FileText} />
      <KpiCard label="Vagas fechadas" value="7" icon={CheckCircle2} tone="success" hint="situação atual" />
      <KpiCard label="Vagas aguardando aprovação" value={String(pendingCounts.vagas)} icon={Hourglass} tone="warning" hint="enviadas por empresas parceiras" />
    </div>
    <SectionHeading title="Distribuição das vagas" note="255 vagas cadastradas" />
    <div className={grid}>
      <DistributionChart title="Vagas por status" data={situacao} donut />
      <DistributionChart title="Vagas por área" data={areas} />
      <DistributionChart title="Vagas por modalidade" data={[{ name: "Presencial", value: 168 }, { name: "Híbrido", value: 58 }, { name: "Remoto", value: 29 }]} donut />
      <DistributionChart title="Vagas por origem" data={[{ name: "Equipe interna", value: 181 }, { name: "Empresas parceiras", value: 74 }]} donut />
      <DistributionChart title="Vagas por faixa salarial" data={[{ name: "Até R$ 1.500", value: 35 }, { name: "R$ 1.501–2.500", value: 98 }, { name: "R$ 2.501–4.000", value: 72 }, { name: "Acima de R$ 4.000", value: 30 }, { name: "A combinar", value: 20 }]} />
      <DistributionChart title="Escolaridade mínima exigida" data={escolaridadeVagas} />
    </div>
    <VagasRecentes /><Aprovacoes kind="vaga" />
    <SectionHeading title="Acompanhamento das vagas" note="Eficiência e histórico" />
    <div className={kpis}>
      <KpiCard label="Taxa de preenchimento" value="78%" delta={4} icon={Target} tone="success" hint="vagas do período" />
      <KpiCard label="Tempo médio para fechar" value="21 dias" icon={Clock} tone="info" hint="vagas concluídas no período" />
      <KpiCard label="Sem movimentação há 30+ dias" value="23" icon={XCircle} tone="danger" hint="vagas que exigem atenção" />
      <KpiCard label="Contratados" value="105" delta={19} icon={UserCheck} tone="success" hint="últimos 6 meses" />
    </div>
    <div className={grid}>
      <TimelineChart title="Abertura e fechamento de vagas" bars data={months.map((m, i) => ({ m, abertas: [32, 41, 38, 45, 52, 47][i] ?? 0, fechadas: [8, 11, 9, 14, 12, 16][i] ?? 0 }))} series={[{ key: "abertas", name: "Abertas" }, { key: "fechadas", name: "Fechadas" }]} />
      <DistributionChart title="Tipo de contratação" data={[{ name: "CLT", value: 128 }, { name: "Estágio", value: 84 }, { name: "Jovem Aprendiz", value: 26 }, { name: "PJ / Temporário", value: 17 }]} donut />
      <DistributionChart title="Tempo médio de fechamento" subtitle="Dias por área" data={[{ name: "TI", value: 34 }, { name: "Financeiro", value: 26 }, { name: "Comercial", value: 19 }, { name: "Administrativo", value: 15 }, { name: "Operações", value: 12 }]} />
    </div>
    <InsightList items={["214 vagas estão abertas; 23 estão sem movimentação há mais de 30 dias.", "Administrativo e Comercial concentram 121 das 255 vagas cadastradas.", "TI tem o maior tempo de fechamento: 34 dias, contra 21 dias na média geral."]} />
  </div>;
}

export function EmpresasTab() {
  return <div className="space-y-5">
    <div className={kpis}>
      <KpiCard label="Empresas cadastradas" value="31" icon={Building2} hint="30 aprovadas e 1 pendente" />
      <KpiCard label="Vagas enviadas" value="18" delta={12} icon={Send} tone="info" hint="no mês · 2 pendentes" />
      <KpiCard label="Empresas aprovadas" value="30" icon={CheckCircle2} tone="success" hint="cadastros aprovados" />
      <KpiCard label="Empresas aguardando aprovação" value={String(pendingCounts.empresas)} icon={Hourglass} tone="warning" hint="cadastros de empresas parceiras" />
    </div>
    <SectionHeading title="Empresas parceiras" note="Setores e participação nas vagas" />
    <div className={grid}>
      <DistributionChart title="Empresas por setor" data={[{ name: "Serviços", value: 12 }, { name: "Varejo", value: 7 }, { name: "Indústria", value: 5 }, { name: "TI", value: 4 }, { name: "Financeiro", value: 3 }]} donut />
      <ChartCard title="Top empresas com vagas enviadas" subtitle="Últimos 6 meses"><RankTable rows={topEmpresas} valueLabel="Vagas" /></ChartCard>
      <DistributionChart title="Vagas enviadas por empresas" subtitle="Outubro de 2026" data={[{ name: "Grupo Alfa", value: 6 }, { name: "Banco Horizonte", value: 4 }, { name: "TechNova", value: 4 }, { name: "Bom Preço", value: 3 }, { name: "Construtora Pilar", value: 1 }]} />
    </div>
    <ChartCard title="Vagas enviadas por empresas parceiras" subtitle="Solicitações mais recentes"><div className="overflow-x-auto"><table className="w-full min-w-[650px] text-sm">
      <thead><tr className="border-b text-left text-overline text-muted-foreground">{["Empresa", "Vaga", "Enviada em", "Situação"].map((h) => <th key={h} className="py-3 font-medium">{h}</th>)}</tr></thead>
      <tbody>{[{ org: "Banco Horizonte", vaga: "Auxiliar Administrativo", date: "22/10/2026", status: "Pendente" }, { org: "Varejo Bom Preço", vaga: "Estoquista", date: "21/10/2026", status: "Pendente" }, { org: "Grupo Alfa Logística", vaga: "Assistente de Logística", date: "20/10/2026", status: "Aprovada" }, { org: "TechNova Sistemas", vaga: "Analista de Suporte", date: "19/10/2026", status: "Aprovada" }].map((r) => <tr key={r.vaga} className="border-b last:border-0"><td className="py-3 font-medium">{r.org}</td><td className="py-3">{r.vaga}</td><td className="py-3 text-muted-foreground">{r.date}</td><td className={`py-3 ${r.status === "Pendente" ? "text-warning" : "text-success"}`}>{r.status}</td></tr>)}</tbody>
    </table></div></ChartCard>
    <Aprovacoes kind="empresa" />
    <SectionHeading title="Evolução da carteira e contratos" />
    <div className="grid gap-5 lg:grid-cols-2">
      <TimelineChart title="Crescimento da carteira" subtitle="Empresas aprovadas e novos cadastros por mês" data={months.map((m, i) => ({ m, ativas: [22, 23, 25, 26, 28, 30][i] ?? 0, novas: [1, 2, 3, 1, 2, 3][i] ?? 0 }))} series={[{ key: "ativas", name: "Aprovadas" }, { key: "novas", name: "Novas" }]} />
      <TimelineChart title="Contratos de estágio por empresa" subtitle="Ativos e vencendo nos próximos 30 dias" bars data={[{ m: "Banco Horizonte", ativos: 18, vencendo: 3 }, { m: "TechNova", ativos: 14, vencendo: 5 }, { m: "Grupo Alfa", ativos: 11, vencendo: 1 }, { m: "Bom Preço", ativos: 9, vencendo: 2 }]} series={[{ key: "ativos", name: "Ativos" }, { key: "vencendo", name: "Vencendo" }]} />
    </div>
    <InsightList items={["As três maiores empresas somam 96 vagas enviadas nos últimos seis meses.", "2 vagas e 1 cadastro de empresa aguardam aprovação.", "11 contratos de estágio vencem nos próximos 30 dias; 5 são da TechNova."]} />
  </div>;
}

export function ProcessosTab() {
  const [view, setView] = useState<"operacao" | "turnover">("operacao");
  return <div className="space-y-5">
    <div className={kpis}>
      <KpiCard label="Processos em andamento" value="86" delta={5.3} icon={Timer} />
      <KpiCard label="Contratados" value="105" delta={19} icon={UserCheck} tone="success" hint="últimos 6 meses" />
      <KpiCard label="Candidaturas totais" value="1.240" delta={18} icon={FileText} tone="info" hint="últimos 6 meses" />
      <KpiCard label="Candidatos dentro do prazo" value="86,1%" icon={Clock} tone="warning" hint="267 de 310 candidatos em seleção" />
    </div>
    <div className="flex flex-wrap gap-2 border-b pb-3" role="tablist" aria-label="Análises de processos">
      <Button variant={view === "operacao" ? "default" : "outline"} size="sm" role="tab" aria-selected={view === "operacao"} onClick={() => setView("operacao")}>Operação seletiva</Button>
      <Button variant={view === "turnover" ? "default" : "outline"} size="sm" role="tab" aria-selected={view === "turnover"} onClick={() => setView("turnover")}>Turnover</Button>
    </div>
    {view === "operacao" ? <>
      <SectionHeading title="Situação dos candidatos nos processos" note="Movimentações no período" />
      <div className={grid}>
        <DistributionChart title="Movimentação nos processos seletivos" data={[{ name: "Incluídos", value: 1240 }, { name: "Removidos", value: 186 }, { name: "Contratados", value: 105 }, { name: "Desligados", value: 12 }]} />
        <DistributionChart title="Candidatos dentro e fora do prazo" subtitle="Candidatos em seleção" data={[{ name: "Dentro do prazo", value: 267 }, { name: "Fora do prazo", value: 43 }]} donut />
        <DistributionChart title="Motivos de incompatibilidade" subtitle="Distribuição das reprovações (%)" data={[{ name: "Perfil técnico", value: 38 }, { name: "Desistência", value: 24 }, { name: "Pretensão salarial", value: 18 }, { name: "Não compareceu", value: 20 }]} />
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <DistributionChart title="Tempo médio por etapa" subtitle="Dias" data={[{ name: "Triagem", value: 3 }, { name: "Entrevista", value: 6 }, { name: "Teste", value: 4 }, { name: "Proposta", value: 5 }, { name: "Admissão", value: 3 }]} />
        <ChartCard title="Ranking de contratações" subtitle="Recrutadores e consultores"><RankTable rows={recrutadores.map((r) => ({ name: r.name, value: r.contratados }))} valueLabel="Contratados" /></ChartCard>
      </div>
      <ChartCard title="Desempenho por recrutador / consultor" subtitle="Últimos 6 meses"><div className="overflow-x-auto"><table className="w-full min-w-[820px] text-sm">
        <thead><tr className="border-b text-left text-overline text-muted-foreground">{["Responsável", "Triados", "Em seleção", "Contratados", "Provas", "Dentro do prazo", "Fora do prazo"].map((h) => <th key={h} className="px-3 py-3 font-medium">{h}</th>)}</tr></thead>
        <tbody>{recrutadores.map((r) => <tr key={r.name} className="border-b last:border-0"><td className="px-3 py-3 font-medium">{r.name}</td>{[r.triados, r.selecao, r.contratados, r.provas, r.dentro, r.fora].map((v, i) => <td key={i} className={`px-3 py-3 tabular-nums ${i === 5 ? "text-danger" : "text-muted-foreground"}`}>{v}</td>)}</tr>)}</tbody>
      </table></div></ChartCard>
      <InsightList items={["43 candidatos em seleção estão fora do prazo: priorize a revisão destes processos.", "Entrevista é a etapa mais demorada, com média de 6 dias.", "Ana Martins lidera as contratações: 34 dos 105 contratados no período."]} />
    </> : <>
      <SectionHeading title="Turnover dos candidatos contratados" note="Outubro de 2026" />
      <div className={kpis}>
        <KpiCard label="Taxa de turnover" value="3,5%" icon={Target} tone="warning" hint="média de admissões e desligamentos / base" />
        <KpiCard label="Contratados no mês" value="25" icon={UserCheck} tone="success" hint="admissões em outubro" />
        <KpiCard label="Desligados no mês" value="12" icon={XCircle} tone="danger" hint="desligamentos em outubro" />
        <KpiCard label="Total de ativos" value="535" icon={Users} tone="info" hint="vínculos ativos ao fim do mês" />
      </div>
      <div className={grid}>
        <TimelineChart title="Taxa de turnover por mês" subtitle="Taxa percentual" data={series([2.1, 2.5, 2.8, 2.2, 3.1, 3.5])} series={[{ key: "value", name: "Turnover (%)" }]} />
        <DistributionChart title="Desligamentos por faixa etária" data={[{ name: "Até 21 anos", value: 4 }, { name: "22–30 anos", value: 5 }, { name: "31–40 anos", value: 2 }, { name: "41+ anos", value: 1 }]} />
        <DistributionChart title="Desligamentos por sexo" data={[{ name: "Feminino", value: 6 }, { name: "Masculino", value: 5 }, { name: "Não informado", value: 1 }]} donut />
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <DistributionChart title="Motivos de desligamento" data={[{ name: "Pedido de demissão", value: 5 }, { name: "Término de contrato", value: 3 }, { name: "Desempenho", value: 2 }, { name: "Outros", value: 2 }]} />
        <TimelineChart title="Contratados e desligados por mês" bars data={months.map((m, i) => ({ m, contratados: [12, 15, 18, 14, 21, 25][i] ?? 0, desligados: [9, 11, 12, 9, 12, 12][i] ?? 0 }))} series={[{ key: "contratados", name: "Contratados" }, { key: "desligados", name: "Desligados" }]} />
      </div>
      <InsightList items={["Outubro teve 25 admissões e 12 desligamentos, saldo positivo de 13 vínculos.", "Pedidos de demissão representam 5 dos 12 desligamentos do mês.", "9 desligamentos ocorreram entre pessoas de até 30 anos."]} />
    </>}
  </div>;
}
