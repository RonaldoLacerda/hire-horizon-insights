import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Users, Briefcase, Building2, Workflow, CalendarRange, Inbox, Moon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { SystemHeader } from "@/components/system/SystemHeader";
import { CandidatosTab, VagasTab, EmpresasTab, ProcessosTab } from "@/components/dash/tabs";
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

const tabs = [
  { id: "candidatos", label: "Candidatos", icon: Users, C: CandidatosTab },
  { id: "vagas", label: "Vagas", icon: Briefcase, C: VagasTab },
  { id: "empresas", label: "Empresas", icon: Building2, C: EmpresasTab },
  { id: "processos", label: "Processos", icon: Workflow, C: ProcessosTab },
] as const;

function Index() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    return () => document.documentElement.classList.remove("dark");
  }, [dark]);
  const [active, setActive] = useState<(typeof tabs)[number]["id"]>("candidatos");
  const Current = tabs.find((t) => t.id === active)?.C ?? CandidatosTab;
  const summary = pendingSummary(approvalsForTab(active));
  return (
    <div className="min-h-screen pb-10">
      <SystemHeader />
      <main className="mx-auto mt-6 max-w-[1600px] px-4 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <p className="text-overline text-muted-foreground">Recrutamento e Seleção · Dados demonstrativos</p>
            <h1 className="text-dash-title mt-1">Painel de indicadores</h1>
          </div>
          <div className="flex flex-wrap items-center gap-5 text-xs text-muted-foreground">
            <span className="flex items-center gap-2"><CalendarRange className="h-4 w-4" /> Maio – Outubro de 2026</span>
            <label htmlFor="dark-mode" className="flex cursor-pointer items-center gap-2 border-l pl-5">
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
            const on = t.id === active;
            return (
              <Button
                variant="ghost"
                key={t.id}
                role="tab"
                aria-selected={on}
                id={`tab-${t.id}`}
                aria-controls="dashboard-content"
                onClick={() => setActive(t.id)}
                className={`-mb-px h-12 shrink-0 rounded-none border-b-2 px-4 text-sm font-medium ${on ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
              >
                <t.icon className="h-4 w-4" /> {t.label}
              </Button>
            );
          })}
        </div>

        <div className="mt-6" key={active} id="dashboard-content" role="tabpanel" aria-labelledby={`tab-${active}`}>
          <div className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1 duration-300">
            <Current />
          </div>
        </div>
      </main>
    </div>
  );
}
