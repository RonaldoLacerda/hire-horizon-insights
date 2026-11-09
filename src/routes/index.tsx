import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Users, Briefcase, Building2, Workflow, CalendarRange, Inbox, Moon, UserCheck } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { SystemHeader } from "@/components/system/SystemHeader";
import { CandidatosTab, VagasTab, EmpresasTab, ProcessosTab, ContratacoesTab } from "@/components/dash/tabs";
import * as V1 from "@/components/dash/tabs-v1";
import { AlertBanner } from "@/components/dash/primitives";
import { approvalsForTab, pendingSummary } from "@/components/dash/approvals";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Painel de Recrutamento e Seleção" },
      { name: "description", content: "Dashboard de candidatos, vagas, empresas e processos seletivos com insights." },
      { property: "og:title", content: "Painel de Recrutamento e Seleção" },
      { property: "og:description", content: "Dashboard de candidatos, vagas, empresas e processos seletivos com insights." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type TabId = "candidatos" | "vagas" | "empresas" | "processos" | "contratacoes";
type Tab = { id: TabId; label: string; icon: typeof Users; C: () => React.JSX.Element };

// v1 = painel publicado antes da reorganização; v2 = versão atual. O seletor flutuante alterna entre as duas.
const versions: Record<"v1" | "v2", Tab[]> = {
  v1: [
    { id: "candidatos", label: "Candidatos", icon: Users, C: V1.CandidatosTab },
    { id: "vagas", label: "Vagas", icon: Briefcase, C: V1.VagasTab },
    { id: "empresas", label: "Empresas", icon: Building2, C: V1.EmpresasTab },
    { id: "processos", label: "Processos", icon: Workflow, C: V1.ProcessosTab },
  ],
  v2: [
    { id: "candidatos", label: "Candidatos", icon: Users, C: CandidatosTab },
    { id: "vagas", label: "Vagas", icon: Briefcase, C: VagasTab },
    { id: "empresas", label: "Empresas", icon: Building2, C: EmpresasTab },
    { id: "processos", label: "Processos", icon: Workflow, C: ProcessosTab },
    { id: "contratacoes", label: "Contratações", icon: UserCheck, C: ContratacoesTab },
  ],
};

function Index() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    return () => document.documentElement.classList.remove("dark");
  }, [dark]);
  const [version, setVersion] = useState<"v1" | "v2">("v2");
  const tabs = versions[version];
  const [active, setActive] = useState<TabId>("candidatos");
  // Aba que não existe na versão escolhida (Contratações na v1) volta para a primeira.
  const current = tabs.find((t) => t.id === active) ?? tabs[0]!;
  const Current = current.C;
  const summary = pendingSummary(approvalsForTab(current.id));
  return (
    <div className="min-h-screen pb-24">
      <SystemHeader />
      <main className="mx-auto mt-6 max-w-[1600px] px-4 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <p className="text-overline text-muted-foreground">Recrutamento e Seleção · Dados demonstrativos</p>
            <h1 className="text-dash-title mt-1">Painel de indicadores</h1>
          </div>
          <div className="flex flex-wrap items-center gap-5 text-xs text-muted-foreground">
            <span className="flex items-center gap-2"><CalendarRange className="h-4 w-4" /> Maio – Outubro de 2026</span>
            <label htmlFor="dark-mode" className="flex cursor-pointer items-center gap-2 sm:border-l sm:pl-5">
              <Moon className="h-4 w-4" /> Visão escura
              <Switch id="dark-mode" checked={dark} onCheckedChange={setDark} />
            </label>
          </div>
        </div>

        {summary !== "" && (
          <div className="mt-5">
            <AlertBanner
              icon={Inbox}
              action={<Button size="sm" variant="outline" onClick={() => document.getElementById("aprovacoes")?.scrollIntoView({ behavior: "smooth", block: "center" })}>Ver aprovações</Button>}
            >
              <span>Você tem <strong>{summary}</strong> aguardando aprovação.</span>
            </AlertBanner>
          </div>
        )}

        <div role="tablist" className="mt-5 flex flex-wrap gap-1 border-b">
          {tabs.map((t) => {
            const on = t.id === current.id;
            return (
              <Button
                variant="ghost"
                key={t.id}
                role="tab"
                aria-selected={on}
                id={`tab-${t.id}`}
                aria-controls="dashboard-content"
                onClick={() => setActive(t.id)}
                className={`-mb-px h-12 flex-1 rounded-none border-b-2 px-2 text-sm font-medium sm:flex-none sm:px-4 ${on ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
              >
                <t.icon className="h-4 w-4" /> {t.label}
              </Button>
            );
          })}
        </div>

        <div className="mt-6" key={`${version}-${current.id}`} id="dashboard-content" role="tabpanel" aria-labelledby={`tab-${current.id}`}>
          <div className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1 duration-300">
            <Current />
          </div>
        </div>
      </main>

      <div role="radiogroup" aria-label="Versão do painel" className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 gap-1 rounded-full border bg-card p-1 shadow-lg">
        {(["v1", "v2"] as const).map((v) => (
          <button
            key={v}
            type="button"
            role="radio"
            aria-checked={version === v}
            title={v === "v1" ? "Painel atual em produção" : "Nova versão proposta"}
            onClick={() => setVersion(v)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${version === v ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  );
}
