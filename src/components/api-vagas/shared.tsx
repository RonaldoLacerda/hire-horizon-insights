import { Accessibility, Star } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { COR, EMPRESA, type Vaga } from "./data";
import logoNovaLima from "./logo-nova-lima.png";

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
    "linear-gradient(135deg, rgba(5,48,98,.85), rgba(3,20,45,.92)), radial-gradient(circle at 20% 30%, rgba(255,255,255,.18), transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,.12), transparent 45%)",
  backgroundColor: "#031f40",
};

// Coluna "Entre em Contato" dos modelos 1 e 2, como em vagas/API_1 e API_2/rodape.blade.php:
// Endereço (endereço + cidade e estado), Telefone(s) e Email(s), cada um com seu rótulo.
export function ContatoRodape() {
  const rotulo = "block text-white";
  return (
    <ul className="space-y-3">
      <li><span className={rotulo}>Endereço</span>{EMPRESA.endereco}<br />{EMPRESA.cidade} {EMPRESA.estado}</li>
      <li><span className={rotulo}>Telefone{EMPRESA.telefones.length > 1 ? "s" : ""}</span>{EMPRESA.telefones.map((t) => <span key={t} className="block">{t}</span>)}</li>
      <li><span className={rotulo}>Email{EMPRESA.emails.length > 1 ? "s" : ""}</span>{EMPRESA.emails.map((e) => <span key={e} className="block">{e}</span>)}</li>
    </ul>
  );
}

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

// Logo da Prefeitura de Nova Lima. A imagem tem fundo branco e letras escuras, então em fundo escuro
// (dark = false) ela vai dentro de uma caixa branca para continuar legível.
export function Logo({ dark = false }: { dark?: boolean }) {
  const img = <img src={logoNovaLima} alt="Prefeitura de Nova Lima — O futuro mora aqui" className="h-12 w-auto sm:h-14" />;
  return dark ? img : <span className="inline-flex rounded-md bg-white px-2 py-1">{img}</span>;
}

export function FontWrap({ font, children, className = "" }: { font: string; children: ReactNode; className?: string }) {
  return <div className={className} style={{ fontFamily: font }}>{children}</div>;
}
