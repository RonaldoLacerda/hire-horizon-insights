import { useState } from "react";
import { Users, UserCheck, UserPlus, UserX, FileWarning, GraduationCap, BriefcaseBusiness, Clock, XCircle, Building2, Send, FileText, Timer, Target, CheckCircle2, CalendarX } from "lucide-react";
import { KpiCard, ChartCard, InsightList, RankTable, StatusBadge } from "./primitives";
import { DistributionChart, TimelineChart, ComparisonChart, SectionHeading } from "./charts";
import { info } from "./info";
import { pendingApprovals } from "./approvals";
import { months, escolaridade, escolaridadeVagas, gruposCandidatos, vagasPorSla, contratadosPorTipo, bairros, origem, faixa, situacao, areas, topEmpresas, vagasRecentes, recrutadores, contratadosGenero, contratadosRaca, contratadosFaixa, contratadosPcd, interesseVsVagas, tempoContratacao } from "./data";

const grid = "grid gap-5 lg:grid-cols-2 xl:grid-cols-3";
const kpis = "grid gap-4 sm:grid-cols-2 xl:grid-cols-4";
const series = (values: number[], key = "value") => months.map((m, i) => ({ m, [key]: values[i] ?? 0 }));

function VagasRecentes() {
  const [rows, setRows] = useState(vagasRecentes);
  return <ChartCard title="Vagas recentes" subtitle="Últimas publicadas" info={info.vagasRecentes}>
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
  return <div id="aprovacoes"><ChartCard title={kind === "vaga" ? "Solicitações de vagas pendentes" : "Empresas aguardando aprovação"} subtitle="Solicitações recebidas" info={kind === "vaga" ? info.aprovacoesVaga : info.aprovacoesEmpresa}>
    <div className="overflow-x-auto"><table className="w-full min-w-[480px] text-sm">
      <thead><tr className="border-b text-left text-overline text-muted-foreground"><th className="py-3 font-medium">{kind === "vaga" ? "Vaga" : "Empresa"}</th><th className="py-3 font-medium">{kind === "vaga" ? "Empresa" : "Ramo de atividade"}</th><th className="py-3 font-medium">Recebida em</th><th className="py-3 font-medium">Situação</th></tr></thead>
      <tbody>{items.map((p) => <tr key={p.id} className="border-b last:border-0"><td className="py-3 font-medium">{p.name}</td><td className="py-3 text-muted-foreground">{p.org}</td><td className="py-3 text-muted-foreground">{p.sentAt}</td><td className="py-3 text-warning">Pendente</td></tr>)}</tbody>
    </table></div>
  </ChartCard></div>;
}

export function CandidatosTab() {
  return <div className="space-y-5">
    <div className={kpis}>
      <KpiCard label="Candidatos cadastrados" value="773" delta={13.5} icon={Users} />
      <KpiCard label="Novos cadastros no mês" value="168" icon={UserPlus} tone="info" hint="outubro de 2026" />
      <KpiCard label="Cadastros incompletos" value="247" icon={FileWarning} tone="warning" hint="32% da base" info={info.perfilCadastro} />
      <KpiCard label="Candidatos inativos" value="93" icon={UserX} tone="danger" hint="12% da base" info={info.situacaoCadastral} />
    </div>
    <SectionHeading title="Perfil dos candidatos" note="Base cadastrada" />
    <div className={grid}>
      <DistributionChart title="Escolaridade dos candidatos" info={info.escolaridade} data={escolaridade} donut />
      <DistributionChart title="Candidatos por grupo" info={info.gruposCandidatos} subtitle="773 candidatos cadastrados" data={gruposCandidatos} />
      <DistributionChart title="Faixa etária" info={info.faixaEtaria} data={faixa} />
      <ChartCard title="Bairros dos candidatos" info={info.bairros} subtitle="8 maiores concentrações"><RankTable rows={bairros} valueLabel="Candidatos" /></ChartCard>
      <ComparisonChart className="lg:col-span-2" title="Área de interesse x vagas abertas" subtitle="% dos 773 candidatos e das 214 vagas abertas" info={info.interesseVsVagas} data={interesseVsVagas} series={[{ key: "candidatos", name: "Interesse dos candidatos" }, { key: "vagas", name: "Vagas abertas" }]} />
    </div>
    <SectionHeading title="Captação e evolução da base" note="Histórico e canais de origem" />
    <div className={grid}>
      <TimelineChart title="Candidaturas por dia" info={info.candidaturasDia} subtitle="Últimos 7 dias" bars data={[{ m: "Seg", value: 24 }, { m: "Ter", value: 31 }, { m: "Qua", value: 29 }, { m: "Qui", value: 38 }, { m: "Sex", value: 42 }, { m: "Sáb", value: 18 }, { m: "Dom", value: 12 }]} series={[{ key: "value", name: "Candidaturas" }]} />
      <DistributionChart title="Candidatos por canal de origem" info={info.origem} data={origem} />
      <TimelineChart title="Movimentação cadastral" info={info.movimentacaoCadastral} subtitle="Cadastros, atualizações e exclusões por mês" bars data={months.map((m, i) => ({ m, novos: [92, 110, 134, 121, 148, 168][i] ?? 0, atualizados: [45, 58, 67, 63, 82, 94][i] ?? 0, excluidos: [3, 5, 4, 6, 4, 7][i] ?? 0 }))} series={[{ key: "novos", name: "Cadastrados" }, { key: "atualizados", name: "Atualizados" }, { key: "excluidos", name: "Excluídos" }]} />
    </div>
    <InsightList items={["Centro concentra 148 candidatos; os oito principais bairros somam 673 pessoas.", "Quinta e sexta concentram 41% das candidaturas da semana.", "TI e Marketing somam 29% das vagas abertas, mas só 22% do interesse dos candidatos; em Administrativo é o inverso (28% do interesse e 19% das vagas)."]} />
  </div>;
}

export function VagasTab() {
  return <div className="space-y-5">
    <div className={kpis}>
      <KpiCard label="Vagas ativas" value="214" delta={4.1} icon={BriefcaseBusiness} tone="info" />
      <KpiCard label="SLA médio geral das vagas" value="21 dias" icon={Clock} tone="info" hint="198 dentro do prazo · 16 fora" />
      <KpiCard label="Vagas preenchidas" value="24" icon={CheckCircle2} tone="success" hint="com ao menos 1 contratado" info={info.vagasPreenchidas} />
      <KpiCard label="Expiradas sem preenchimento" value="9" icon={CalendarX} tone="danger" hint="prazo vencido, nenhum contratado" info={info.vagasExpiradas} />
    </div>
    <SectionHeading title="Distribuição das vagas" note="255 vagas cadastradas · situação atual" />
    <div className={grid}>
      <DistributionChart title="Vagas por status" info={info.vagasStatus} data={situacao} donut />
      <DistributionChart title="Vagas por área" info={info.vagasArea} data={areas} />
      <DistributionChart title="Vagas por modalidade" info={info.vagasModalidade} data={[{ name: "Presencial", value: 168 }, { name: "Híbrido", value: 58 }, { name: "Remoto", value: 29 }]} donut />
      <DistributionChart title="Vagas por origem" info={info.vagasOrigem} data={[{ name: "Criada pelo adm", value: 181 }, { name: "Solicitação via api", value: 74 }]} donut />
      <DistributionChart title="Vagas por faixa salarial" info={info.faixaSalarial} data={[{ name: "Até R$ 1.500", value: 35 }, { name: "R$ 1.501–2.500", value: 98 }, { name: "R$ 2.501–4.000", value: 72 }, { name: "Acima de R$ 4.000", value: 30 }, { name: "A combinar", value: 20 }]} />
      <DistributionChart title="Escolaridade mínima exigida" info={info.escolaridadeExigida} data={escolaridadeVagas} />
    </div>
    <VagasRecentes /><Aprovacoes kind="vaga" />
    <SectionHeading title="Acompanhamento das vagas" note="Últimos 6 meses" />
    <div className="grid gap-4 sm:grid-cols-3">
      <KpiCard label="Taxa de preenchimento" value="78%" delta={4} icon={Target} tone="success" hint="vagas do período" />
      <KpiCard label="Vagas abertas no mês" value="47" delta={-9.6} icon={BriefcaseBusiness} tone="info" hint="outubro de 2026" />
      <KpiCard label="Sem movimentação há 30+ dias" value="23" icon={XCircle} tone="danger" hint="vagas que exigem atenção" />
    </div>
    <div className="grid gap-5 lg:grid-cols-2">
      <TimelineChart title="Abertura e fechamento de vagas" info={info.aberturaFechamento} bars data={months.map((m, i) => ({ m, abertas: [32, 41, 38, 45, 52, 47][i] ?? 0, fechadas: [8, 11, 9, 14, 12, 16][i] ?? 0 }))} series={[{ key: "abertas", name: "Abertas" }, { key: "fechadas", name: "Fechadas" }]} />
      <DistributionChart title="Vagas dentro e fora do SLA" info={info.sla} subtitle="214 vagas ativas" data={vagasPorSla} donut />
      <DistributionChart title="Tempo médio de fechamento" info={info.tempoFechamentoArea} subtitle="Dias por área" data={[{ name: "TI", value: 34 }, { name: "Financeiro", value: 26 }, { name: "Comercial", value: 19 }, { name: "Administrativo", value: 15 }, { name: "Operações", value: 12 }]} />
      <DistributionChart title="Tipo de contratação" info={info.tipoContratacao} data={[{ name: "CLT", value: 128 }, { name: "Estágio", value: 84 }, { name: "Jovem Aprendiz", value: 26 }, { name: "PJ / Temporário", value: 17 }]} donut />
    </div>
    <InsightList items={["Administrativo e Comercial concentram 121 das 255 vagas cadastradas.", "TI tem o maior tempo de fechamento: 34 dias, contra 21 dias na média geral."]} />
  </div>;
}

export function EmpresasTab() {
  return <div className="space-y-5">
    <div className={kpis}>
      <KpiCard label="Empresas cadastradas" value="31" icon={Building2} hint="30 aprovadas · 1 pendente" />
      <KpiCard label="Novas empresas no mês" value="3" icon={CheckCircle2} tone="success" hint="outubro de 2026" />
      <KpiCard label="Vagas enviadas no mês" value="18" delta={12} icon={Send} tone="info" hint="2 pendentes de aprovação" />
      <KpiCard label="Estágios ativos" value="52" icon={GraduationCap} tone="warning" hint="11 vencem nos próximos 30 dias" />
    </div>
    <SectionHeading title="Empresas parceiras" note="Ramos de atividade e participação nas vagas" />
    <div className="grid gap-5 lg:grid-cols-2">
      <DistributionChart title="Empresas por ramo de atividade" subtitle="31 empresas cadastradas" info={info.empresasRamo} data={[{ name: "Comércio", value: 8 }, { name: "Serviços", value: 7 }, { name: "Segurança", value: 5 }, { name: "Indústria", value: 4 }, { name: "Tecnologia", value: 4 }, { name: "Saúde", value: 3 }]} donut />
      <ChartCard title="Top empresas com vagas enviadas" info={info.topEmpresas} subtitle="Últimos 6 meses"><RankTable rows={topEmpresas} valueLabel="Vagas" /></ChartCard>
    </div>
    <ChartCard title="Vagas enviadas por empresas parceiras" info={info.vagasEnviadasTabela} subtitle="Solicitações mais recentes"><div className="overflow-x-auto"><table className="w-full min-w-[650px] text-sm">
      <thead><tr className="border-b text-left text-overline text-muted-foreground">{["Empresa", "Vaga", "Enviada em", "Situação"].map((h) => <th key={h} className="py-3 font-medium">{h}</th>)}</tr></thead>
      <tbody>{[{ org: "Banco Horizonte", vaga: "Auxiliar Administrativo", date: "22/10/2026", status: "Pendente" }, { org: "Varejo Bom Preço", vaga: "Estoquista", date: "21/10/2026", status: "Pendente" }, { org: "Grupo Alfa Logística", vaga: "Assistente de Logística", date: "20/10/2026", status: "Aprovada" }, { org: "TechNova Sistemas", vaga: "Analista de Suporte", date: "19/10/2026", status: "Aprovada" }].map((r) => <tr key={r.vaga} className="border-b last:border-0"><td className="py-3 font-medium">{r.org}</td><td className="py-3">{r.vaga}</td><td className="py-3 text-muted-foreground">{r.date}</td><td className={`py-3 ${r.status === "Pendente" ? "text-warning" : "text-success"}`}>{r.status}</td></tr>)}</tbody>
    </table></div></ChartCard>
    <Aprovacoes kind="empresa" />
    <SectionHeading title="Evolução da carteira e contratos" />
    <div className="grid gap-5 lg:grid-cols-2">
      <TimelineChart title="Crescimento da carteira" info={info.crescimentoCarteira} subtitle="Empresas aprovadas e novos cadastros por mês" data={months.map((m, i) => ({ m, ativas: [22, 23, 25, 26, 28, 30][i] ?? 0, novas: [1, 2, 3, 1, 2, 3][i] ?? 0 }))} series={[{ key: "ativas", name: "Aprovadas" }, { key: "novas", name: "Novas" }]} />
      <TimelineChart title="Contratos de estágio por empresa" info={info.contratosEstagio} subtitle="Ativos e vencendo nos próximos 30 dias" bars data={[{ m: "Banco Horizonte", ativos: 18, vencendo: 3 }, { m: "TechNova", ativos: 14, vencendo: 5 }, { m: "Grupo Alfa", ativos: 11, vencendo: 1 }, { m: "Bom Preço", ativos: 9, vencendo: 2 }]} series={[{ key: "ativos", name: "Ativos" }, { key: "vencendo", name: "Vencendo" }]} />
    </div>
    <InsightList items={["As três maiores empresas somam 96 vagas enviadas nos últimos seis meses.", "11 contratos de estágio vencem nos próximos 30 dias; 5 são da TechNova."]} />
  </div>;
}

export function ProcessosTab() {
  return <div className="space-y-5">
    <div className={kpis}>
      <KpiCard label="Processos em andamento" value="86" delta={5.3} icon={Timer} />
      <KpiCard label="Candidatos em seleção" value="310" icon={Users} tone="info" hint="em alguma etapa do processo" />
      <KpiCard label="Candidaturas totais" value="1.240" delta={18} icon={FileText} />
      <KpiCard label="Candidatos dentro do prazo" value="86,1%" icon={Clock} tone="warning" hint="267 de 310 · 43 fora do prazo" />
    </div>
    <SectionHeading title="Situação dos candidatos nos processos" note="Últimos 6 meses" />
    <div className={grid}>
      <DistributionChart title="Movimentação nos processos seletivos" info={info.movimentacaoProcessos} data={[{ name: "Incluídos", value: 1240 }, { name: "Removidos", value: 186 }, { name: "Contratados", value: 105 }, { name: "Desligados", value: 12 }]} />
      <DistributionChart title="Motivos de incompatibilidade" info={info.motivosIncompatibilidade} subtitle="Distribuição das reprovações (%)" data={[{ name: "Perfil técnico", value: 38 }, { name: "Desistência", value: 24 }, { name: "Pretensão salarial", value: 18 }, { name: "Não compareceu", value: 20 }]} />
      <DistributionChart title="Tempo médio por etapa" info={info.tempoEtapa} subtitle="Dias" data={[{ name: "Triagem", value: 3 }, { name: "Entrevista", value: 6 }, { name: "Teste", value: 4 }, { name: "Proposta", value: 5 }, { name: "Admissão", value: 3 }]} />
    </div>
    <ChartCard title="Desempenho por recrutador / consultor" info={info.desempenhoRecrutador} subtitle="Últimos 6 meses"><div className="overflow-x-auto"><table className="w-full min-w-[820px] text-sm">
      <thead><tr className="border-b text-left text-overline text-muted-foreground">{["Responsável", "Triados", "Em seleção", "Contratados", "Provas", "Dentro do prazo", "Fora do prazo"].map((h) => <th key={h} className="px-3 py-3 font-medium">{h}</th>)}</tr></thead>
      <tbody>{recrutadores.map((r) => <tr key={r.name} className="border-b last:border-0"><td className="px-3 py-3 font-medium">{r.name}</td>{[r.triados, r.selecao, r.contratados, r.provas, r.dentro, r.fora].map((v, i) => <td key={i} className={`px-3 py-3 tabular-nums ${i === 5 ? "text-danger" : "text-muted-foreground"}`}>{v}</td>)}</tr>)}</tbody>
    </table></div></ChartCard>
    <InsightList items={["43 candidatos em seleção estão fora do prazo: priorize a revisão destes processos.", "Entrevista é a etapa mais demorada, com média de 6 dias.", "Ana Martins lidera as contratações: 34 dos 105 contratados no período."]} />
  </div>;
}

export function ContratacoesTab() {
  return <div className="space-y-5">
    <div className="grid gap-4 sm:grid-cols-3">
      <KpiCard label="Candidatos contratados" value="105" delta={19} icon={UserCheck} tone="success" hint="últimos 6 meses" />
      <KpiCard label="Tempo médio para preencher uma vaga" value="19 dias" icon={Clock} tone="info" hint="abertura da vaga até a 1ª contratação" info={info.tempoPreencherVaga} />
      <KpiCard label="Tempo médio até a contratação" value="15 dias" icon={Timer} tone="info" hint="entrada no processo até a contratação" info={info.tempoContratacaoCandidato} />
    </div>
    <SectionHeading title="Contratações no período" note="Últimos 6 meses" />
    <div className="grid gap-5 lg:grid-cols-3">
      <TimelineChart className="lg:col-span-2" title="Tempo médio até a contratação por mês" subtitle="Dias · média de cada mês" info={info.tempoContratacaoMes} data={tempoContratacao} series={[{ key: "vaga", name: "Preenchimento da vaga" }, { key: "candidato", name: "Contratação do candidato" }]} />
      <DistributionChart title="Contratados por tipo de vaga" info={info.contratadosTipo} subtitle="105 contratações" data={contratadosPorTipo} donut />
    </div>
    <SectionHeading title="Perfil dos candidatos contratados" note="105 contratações · últimos 6 meses" />
    <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
      <DistributionChart title="Contratados por gênero" info={info.contratadosGenero} data={contratadosGenero} donut />
      <DistributionChart title="Contratados por raça/cor" info={info.contratadosRaca} data={contratadosRaca} />
      <DistributionChart title="Contratados por faixa etária" info={info.contratadosFaixa} data={contratadosFaixa} />
      <DistributionChart title="Contratados PcD" subtitle="7,6% das contratações" info={info.contratadosPcd} data={contratadosPcd} donut />
    </div>
    <SectionHeading title="Turnover dos candidatos contratados" note="Outubro de 2026" />
    <div className={kpis}>
      <KpiCard label="Taxa de turnover" value="3,5%" icon={Target} tone="warning" hint="média de admissões e desligamentos / base" />
      <KpiCard label="Contratados no mês" value="25" icon={UserCheck} tone="success" hint="admissões em outubro" />
      <KpiCard label="Desligados no mês" value="12" icon={XCircle} tone="danger" hint="desligamentos em outubro" />
      <KpiCard label="Total de ativos" value="535" icon={Users} tone="info" hint="vínculos ativos ao fim do mês" />
    </div>
    <div className={grid}>
      <TimelineChart title="Taxa de turnover por mês" info={info.turnoverMes} subtitle="Taxa percentual" data={series([2.1, 2.5, 2.8, 2.2, 3.1, 3.5])} series={[{ key: "value", name: "Turnover (%)" }]} />
      <DistributionChart title="Desligamentos por faixa etária" info={info.desligamentosFaixa} data={[{ name: "Até 21 anos", value: 4 }, { name: "22–30 anos", value: 5 }, { name: "31–40 anos", value: 2 }, { name: "41+ anos", value: 1 }]} />
      <DistributionChart title="Desligamentos por sexo" info={info.desligamentosSexo} data={[{ name: "Feminino", value: 6 }, { name: "Masculino", value: 5 }, { name: "Não informado", value: 1 }]} donut />
    </div>
    <div className="grid gap-5 lg:grid-cols-2">
      <DistributionChart title="Motivos de desligamento" info={info.motivosDesligamento} data={[{ name: "Pedido de demissão", value: 5 }, { name: "Término de contrato", value: 3 }, { name: "Desempenho", value: 2 }, { name: "Outros", value: 2 }]} />
      <TimelineChart title="Contratados e desligados por mês" info={info.contratadosDesligados} bars data={months.map((m, i) => ({ m, contratados: [12, 15, 18, 14, 21, 25][i] ?? 0, desligados: [9, 11, 12, 9, 12, 12][i] ?? 0 }))} series={[{ key: "contratados", name: "Contratados" }, { key: "desligados", name: "Desligados" }]} />
    </div>
    <InsightList items={["O tempo para preencher uma vaga caiu de 21 para 17 dias entre maio e outubro.", "Outubro teve 25 admissões e 12 desligamentos, saldo positivo de 13 vínculos.", "9 desligamentos ocorreram entre pessoas de até 30 anos."]} />
  </div>;
}
