import {
  LayoutDashboard, Users, UserPlus, Briefcase, ClipboardList, Building2,
  MessageSquare, CalendarDays, DollarSign, Settings, Search, Menu, ChevronDown, ArrowRight,
} from "lucide-react";

const items = [
  { label: "Painel", icon: LayoutDashboard, active: true, caret: true },
  { label: "Candidatos", icon: Users },
  { label: "Processos", icon: UserPlus },
  { label: "Vagas", icon: Briefcase },
  { label: "Estágios", icon: ClipboardList, caret: true },
  { label: "Empresas", icon: Building2 },
  { label: "Feedback", icon: MessageSquare, caret: true },
  { label: "Agenda", icon: CalendarDays },
  { label: "Faturamento", icon: DollarSign },
  { label: "Configurações", icon: Settings, caret: true },
];

export function SystemHeader() {
  return (
    <header className="px-3 pt-2">
      <div className="relative flex items-center justify-between pb-2">
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded border bg-card px-4 py-1.5 text-xs text-muted-foreground shadow-card">
            MENU <Menu className="h-3.5 w-3.5" />
          </button>
          <div className="grid h-8 w-8 place-items-center rounded-full bg-info-soft text-info">
            <Users className="h-4 w-4" />
          </div>
        </div>
        <button className="flex items-center gap-1 rounded-b bg-brand px-4 py-1 text-[10px] font-bold text-brand-foreground sm:absolute sm:left-1/2 sm:top-0 sm:-translate-x-1/2">
          MATRIZ <ChevronDown className="h-3 w-3" />
        </button>
        <a className="hidden items-center gap-1 text-sm text-muted-foreground sm:flex">
          Ir p/ tela da API de Vagas <ArrowRight className="h-4 w-4" />
        </a>
      </div>
      <nav className="scrollbar-none flex items-center gap-1 overflow-x-auto rounded bg-brand px-3 py-3 text-brand-foreground">
        {items.map((it) => (
          <button
            key={it.label}
            className={`flex shrink-0 items-center gap-1.5 rounded px-2.5 py-2 text-[11px] font-bold uppercase ${it.active ? "bg-brand-foreground/15" : "hover:bg-brand-foreground/10"}`}
          >
            <it.icon className="h-4 w-4" />
            {it.label}
            {it.caret && <ChevronDown className="h-3 w-3" />}
          </button>
        ))}
        <Search className="ml-2 h-4 w-4 shrink-0" />
      </nav>
    </header>
  );
}
