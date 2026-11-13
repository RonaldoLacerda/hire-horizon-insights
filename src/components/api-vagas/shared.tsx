import { Accessibility, Star } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { COR, type Vaga } from "./data";

export type ModeloProps = {
  vagas: Vaga[];
  destaques: Vaga[]; // já filtradas e ordenadas; vazio = seção oculta
  destaqueIds: number[];
};

// Equivalente ao $style_api dos modelos 1 a 3 (cor de fundo e fonte configuradas na API).
export const styleApi: CSSProperties = { backgroundColor: COR.fundo, color: COR.fonte, border: "none" };

// Fundo de imagem do topo (img_topo). Gradiente no lugar da foto da empresa.
export const heroBg: CSSProperties = {
  backgroundImage:
    "linear-gradient(135deg, rgba(14,116,144,.85), rgba(15,23,42,.9)), radial-gradient(circle at 20% 30%, rgba(255,255,255,.18), transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,.12), transparent 45%)",
  backgroundColor: "#1e293b",
};

export function Pcd() {
  return <Accessibility aria-label="Elegível para PCD" className="ml-1.5 inline h-[0.9em] w-[0.9em] align-[-0.1em]" />;
}

// Selo do recurso novo. Cor de destaque = cor configurada da empresa, para manter a identidade de cada cliente.
export function SeloDestaque({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <span className={`inline-flex items-center gap-1 font-bold uppercase tracking-wide ${className}`} style={style}>
      <Star className="h-[1em] w-[1em] fill-current" /> Destaque
    </span>
  );
}

// Pequena marca usada na lista normal, para a vaga destacada não parecer duplicada.
export function MarcaDestaque({ className = "" }: { className?: string }) {
  return (
    <span title="Vaga em destaque" className={`inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${className}`} style={{ backgroundColor: "#fef3c7", color: "#92400e" }}>
      <Star className="h-2.5 w-2.5 fill-current" /> Destaque
    </span>
  );
}

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className={`flex items-center gap-2 font-bold ${dark ? "text-slate-900" : "text-white"}`}>
      <span className="grid h-9 w-9 place-items-center rounded-full text-sm text-white" style={{ backgroundColor: COR.fundo }}>GH</span>
      <span className="text-lg leading-none">Grupo<br /><span className="text-xs font-medium tracking-[0.2em]">HORIZONTE</span></span>
    </span>
  );
}

export function FontWrap({ font, children, className = "" }: { font: string; children: ReactNode; className?: string }) {
  return <div className={className} style={{ fontFamily: font }}>{children}</div>;
}
