import { Link } from "@tanstack/react-router";
import {
  LayoutDashboard, Users, UserPlus, Briefcase, ClipboardList, Building2,
  MessageSquare, CalendarDays, DollarSign, Settings, Search, Menu, ChevronDown, ArrowRight,
} from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Area = "painel" | "vagas" | "config";

// `to` = telas existentes no protótipo; as demais são só ilustrativas.
const items: { label: string; icon: typeof Users; area?: Area; to?: "/" | "/vagas"; caret?: boolean }[] = [
  { label: "Painel", icon: LayoutDashboard, area: "painel", to: "/", caret: true },
  { label: "Candidatos", icon: Users },
  { label: "Processos", icon: UserPlus },
  { label: "Vagas", icon: Briefcase, area: "vagas", to: "/vagas" },
  { label: "Estágios", icon: ClipboardList, caret: true },
  { label: "Empresas", icon: Building2 },
  { label: "Feedback", icon: MessageSquare, caret: true },
  { label: "Agenda", icon: CalendarDays },
  { label: "Faturamento", icon: DollarSign },
  { label: "Configurações", icon: Settings, area: "config", caret: true },
];

export function SystemHeader({ ativo = "painel" }: { ativo?: Area }) {
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
        <button className="flex items-center gap-1 rounded-b bg-chart-2 px-4 py-1 text-[10px] font-bold text-brand-foreground sm:absolute sm:left-1/2 sm:top-0 sm:-translate-x-1/2">
          MATRIZ <ChevronDown className="h-3 w-3" />
        </button>
        <Link to="/api-vagas" className="hidden items-center gap-1 text-sm text-muted-foreground hover:text-primary sm:flex">
          Ir p/ tela da API de Vagas <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <nav className="scrollbar-none flex items-center gap-1 overflow-x-auto rounded bg-chart-2 px-3 py-3 text-brand-foreground">
        {items.map((it) => {
          const cls = `flex shrink-0 items-center gap-1.5 rounded px-2.5 py-2 text-[11px] font-bold uppercase ${it.area === ativo ? "bg-brand-foreground/15" : "hover:bg-brand-foreground/10"}`;
          const conteudo = (<><it.icon className="h-4 w-4" />{it.label}{it.caret && <ChevronDown className="h-3 w-3" />}</>);
          if (it.area === "config") {
            return (
              <DropdownMenu key={it.label}>
                <DropdownMenuTrigger className={cls}>{conteudo}</DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-48">
                  <DropdownMenuItem disabled>Gerais</DropdownMenuItem>
                  <DropdownMenuItem asChild><Link to="/configuracoes/api-vagas">API de Vagas</Link></DropdownMenuItem>
                  <DropdownMenuItem disabled>Campos</DropdownMenuItem>
                  <DropdownMenuItem disabled>Cargos/Áreas</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            );
          }
          return it.to
            ? <Link key={it.label} to={it.to} className={cls}>{conteudo}</Link>
            : <button key={it.label} className={cls}>{conteudo}</button>;
        })}
        <Search className="ml-2 h-4 w-4 shrink-0" />
      </nav>
    </header>
  );
}
