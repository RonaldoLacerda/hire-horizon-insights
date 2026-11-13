// Peças visuais do sistema interno do RHBot (Bootstrap 4 + Material Dashboard): botões em caixa
// alta com sombra Material, cards brancos, switch roxo do tema e bloco de configuração.
import type { ButtonHTMLAttributes, ReactNode } from "react";

export const MD = {
  success: "#4caf50",
  info: "#00bcd4",
  default: "#999999",
  danger: "#f44336",
  warning: "#ff9800",
  primary: "var(--chart-2)", // corFundo da empresa
};

type Cor = keyof typeof MD;

export function MdButton({ cor = "default", sm = false, className = "", children, ...p }: ButtonHTMLAttributes<HTMLButtonElement> & { cor?: Cor; sm?: boolean }) {
  return (
    <button
      type="button"
      {...p}
      style={{ backgroundColor: MD[cor], ...p.style }}
      className={`inline-flex items-center justify-center gap-1.5 rounded-[.2rem] font-normal uppercase text-white shadow-[0_2px_2px_0_rgba(0,0,0,.14),0_3px_1px_-2px_rgba(0,0,0,.2),0_1px_5px_0_rgba(0,0,0,.12)] transition-shadow hover:shadow-[0_14px_26px_-12px_rgba(0,0,0,.42),0_4px_23px_0_rgba(0,0,0,.12)] disabled:cursor-not-allowed disabled:opacity-50 ${sm ? "px-5 py-[.40625rem] text-[.6875rem]" : "px-[30px] py-3 text-[.75rem]"} ${className}`}
    >
      {children}
    </button>
  );
}

// Botão-ícone cinza da coluna Ações (td-actions), com tooltip no title.
export function IconAction({ title, children, cor = "default", disabled, onClick, ativo }: { title: string; children: ReactNode; cor?: Cor; disabled?: boolean; onClick?: () => void; ativo?: boolean }) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      aria-pressed={ativo}
      disabled={disabled}
      onClick={onClick}
      style={{ backgroundColor: MD[cor] }}
      className="ml-1 mb-1 grid h-[30px] w-[30px] place-items-center rounded-[.2rem] text-white shadow-[0_2px_2px_0_rgba(0,0,0,.14)] disabled:cursor-not-allowed disabled:opacity-40 [&>svg]:h-4 [&>svg]:w-4"
    >
      {children}
    </button>
  );
}

export function MdSwitch({ checked, onChange, label, disabled }: { checked: boolean; onChange: (v: boolean) => void; label: ReactNode; disabled?: boolean }) {
  return (
    <label className={`inline-flex cursor-pointer items-center gap-3 text-sm text-[#555] ${disabled ? "cursor-not-allowed opacity-50" : ""}`}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`relative h-[15px] w-[30px] shrink-0 rounded-full transition-colors ${checked ? "bg-[rgba(156,39,176,.7)]" : "bg-[rgba(80,80,80,.7)]"}`}
      >
        <span className={`absolute -top-[3px] h-[21px] w-[21px] rounded-full bg-white shadow-[0_1px_3px_1px_rgba(0,0,0,.4)] transition-all ${checked ? "left-[12px]" : "-left-[3px]"}`} />
      </button>
      {label}
    </label>
  );
}

// Bloco .coteudo-titulo das telas de configuração (borda na cor da empresa e <h5> como título).
export function Bloco({ titulo, novo, children }: { titulo: string; novo?: boolean; children: ReactNode }) {
  return (
    <div className={`relative mb-6 rounded-[5px] border p-[5%] pt-[25px] ${novo ? "border-amber-400 ring-4 ring-amber-100" : "border-[var(--chart-2)]"}`}>
      <h5 className="mb-4 flex items-center gap-2 text-[1.0625rem] font-light text-[#3c4858]">
        {titulo}
        {novo && <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold uppercase text-amber-800">Novo</span>}
      </h5>
      {children}
    </div>
  );
}

export function MdSelect({ label, value, onChange, options, className = "" }: { label: string; value: string; onChange?: (v: string) => void; options: [string, string][]; className?: string }) {
  return (
    <label className={`block text-[11px] text-[#aaa] ${className}`}>
      {label}
      <select value={value} onChange={(e) => onChange?.(e.target.value)} className="mt-1 block w-full border-0 border-b border-[#d2d2d2] bg-transparent py-1.5 text-sm text-[#495057] focus:border-[var(--chart-2)] focus:outline-none">
        {options.map(([v, t]) => <option key={v} value={v}>{t}</option>)}
      </select>
    </label>
  );
}

export function NovoTag() {
  return <span className="ml-1 rounded bg-amber-100 px-1 py-px align-middle text-[9px] font-bold uppercase text-amber-800">Novo</span>;
}
