import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Users, Briefcase, Building2, Workflow, FileText, Filter, CalendarRange } from "lucide-react";
import { SystemHeader } from "@/components/system/SystemHeader";
import { CandidatosTab, VagasTab, EmpresasTab, ProcessosTab } from "@/components/dash/tabs";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Painel de Recrutamento e Seleção" },
      { name: "description", content: "Dashboard de candidatos, vagas, empresas e processos seletivos com insights." },
      { property: "og:title", content: "Painel de Recrutamento e Seleção" },
      { property: "og:description", content: "Dashboard de candidatos, vagas, empresas e processos seletivos com insights." },
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
  const [active, setActive] = useState<(typeof tabs)[number]["id"]>("candidatos");
  const Current = tabs.find((t) => t.id === active)!.C;
  return (
    <div className="min-h-screen pb-10">
      <SystemHeader />
      <main className="mx-3 mt-6 rounded-lg border bg-card/60 p-5 shadow-card sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <p className="text-overline text-muted-foreground">Recrutamento e Seleção</p>
            <h1 className="text-dash-title mt-1">Painel de indicadores</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button className="flex items-center gap-2 rounded-md border bg-card px-3 py-2 text-xs text-muted-foreground">
              <CalendarRange className="h-4 w-4" /> Últimos 6 meses
            </button>
            <button className="flex items-center gap-2 rounded-md bg-success px-3 py-2 text-xs font-bold uppercase text-brand-foreground">
              <FileText className="h-4 w-4" /> Relatórios
            </button>
            <button className="flex items-center gap-2 rounded-md bg-muted-foreground px-3 py-2 text-xs font-bold uppercase text-brand-foreground">
              <Filter className="h-4 w-4" /> Filtrar
            </button>
          </div>
        </div>

        <div role="tablist" className="mt-5 flex gap-1 overflow-x-auto border-b">
          {tabs.map((t) => {
            const on = t.id === active;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={on}
                onClick={() => setActive(t.id)}
                className={`-mb-px flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${on ? "border-brand text-brand" : "border-transparent text-muted-foreground hover:text-foreground"}`}
              >
                <t.icon className="h-4 w-4" /> {t.label}
              </button>
            );
          })}
        </div>

        <div className="mt-6" key={active}>
          <div className="animate-in fade-in slide-in-from-bottom-1 duration-300">
            <Current />
          </div>
        </div>
      </main>
    </div>
  );
}
