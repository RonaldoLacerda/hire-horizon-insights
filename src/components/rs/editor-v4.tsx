// Réplica do editor do modelo 4 (RHBot: recrutamento_aparencia_editar + api_vagas4/edit-*), com a
// seção nova "Vagas em destaque": arrastável entre as seções, pode ser ocultada (olho) e tem painel
// de edição próprio. Cabeçalho, capa e rodapé continuam bloqueados, como hoje.
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Eye, EyeOff, Lock, Star } from "lucide-react";
import { MAX_DESTAQUES, VAGAS, vagasEmDestaque } from "@/components/api-vagas/data";
import { Modelo4 } from "@/components/api-vagas/modelo4";
import { Sortable } from "@/components/api-vagas/sortable";
import { setEstado, useDestaques, type EstadoDestaques, type EstiloDestaque, type SecaoV4 } from "@/components/api-vagas/store";
import { MdButton, NovoTag } from "./md";

type V4 = EstadoDestaques["v4"];

const INFO: Record<SecaoV4, { t: string; d: string }> = {
  destaques: { t: "Vagas em destaque", d: "Até 3 vagas prioritárias" },
  sobre: { t: "Sobre", d: "Missão e visão" },
  vagas: { t: "Vagas", d: "Lista de vagas disponíveis" },
  chamada: { t: "Chamada", d: "Chamada para cadastro" },
};

const ESTILOS: { v: EstiloDestaque; t: string }[] = [
  { v: "borda", t: "Borda na cor da página" },
  { v: "fundo", t: "Fundo na cor da página" },
  { v: "padrao", t: "Igual aos cards de vagas" },
];

function Fixo({ t, d }: { t: string; d: string }) {
  return (
    <div className="flex items-center gap-3 rounded-[.3rem] border border-[#ddd] bg-white px-5 py-3 shadow-[0_1px_3px_rgba(0,0,0,.05)]">
      <Lock className="h-3.5 w-3.5 text-[#999]" />
      <div><p className="text-sm font-semibold">{t}</p><p className="text-[0.85em] text-[#6c757d]">{d}</p></div>
    </div>
  );
}

export function EditorV4() {
  const atual = useDestaques();
  const [rasc, setRasc] = useState<V4 | null>(null);
  const v4 = rasc ?? atual.v4;
  const set = (p: Partial<V4>) => setRasc({ ...v4, ...p });
  const [editando, setEditando] = useState<SecaoV4 | null>("destaques");
  const [ok, setOk] = useState(false);

  // Com o recurso desabilitado em Configurações, a seção nem aparece no editor.
  const ordem = v4.ordem.filter((s) => s !== "destaques" || atual.habilitado);
  const destaques = atual.habilitado ? vagasEmDestaque(atual.ids, VAGAS) : [];

  const publicar = () => {
    setEstado((e) => ({ ...e, v4 }));
    setRasc(null);
    setOk(true);
    window.setTimeout(() => setOk(false), 3000);
  };

  const mover = (nova: SecaoV4[]) => set({ ordem: atual.habilitado ? nova : [...nova, ...v4.ordem.filter((s) => !nova.includes(s))] });

  return (
    <div className="flex flex-col gap-4 font-[Roboto,Helvetica,Arial,sans-serif] text-[#212529] lg:h-[calc(100vh-150px)] lg:flex-row">
      <aside className="flex shrink-0 flex-col gap-3 overflow-y-auto rounded-[.25rem] border border-[#eee] bg-[#fafafa] p-4 shadow-[0_1px_4px_0_rgba(0,0,0,.14)] lg:w-[340px]">
        <div className="flex items-center justify-between gap-2">
          <Link to="/configuracoes/api-vagas" className="flex items-center gap-1 text-xs text-[#777] hover:text-black"><ArrowLeft className="h-3.5 w-3.5" /> Voltar</Link>
          <MdButton cor="success" sm onClick={publicar}>Publicar</MdButton>
        </div>
        {rasc && <p className="text-xs text-[#ff9800]">Rascunho com alterações não publicadas</p>}
        {ok && <p role="status" className="text-xs text-[#4caf50]">Publicado na página de vagas.</p>}
        <p className="text-overline text-[#999]">Seções da página</p>

        <Fixo t="Cabeçalho" d="Logo e botões de acesso" />
        <Fixo t="Capa" d="Destaque da página" />
        <Sortable
          itens={ordem}
          chave={(s) => s}
          onChange={mover}
          className="space-y-3"
          itemClassName="rounded-[.3rem] border border-[#ddd] bg-white px-3 py-2.5 shadow-[0_1px_3px_rgba(0,0,0,.05)] transition-shadow hover:bg-[#f3f3f3] hover:shadow-[0_4px_8px_rgba(0,0,0,.15)]"
          render={(s) => {
            const vis = v4.visivel[s];
            return (
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setEditando(s)} className={`min-w-0 flex-1 text-left ${editando === s ? "text-[var(--chart-2)]" : ""}`}>
                  <p className="flex items-center gap-1 text-sm font-semibold">{s === "destaques" && <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />}{INFO[s].t}{s === "destaques" && <NovoTag />}</p>
                  <p className="text-[0.85em] text-[#6c757d]">{INFO[s].d}</p>
                </button>
                {s !== "vagas" && (
                  <button type="button" aria-label={vis ? `Ocultar ${INFO[s].t}` : `Exibir ${INFO[s].t}`} onClick={() => set({ visivel: { ...v4.visivel, [s]: !vis } })} className="rounded p-1 text-[#bbb] hover:text-[#555]">
                    {vis ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </button>
                )}
              </div>
            );
          }}
        />
        <Fixo t="Rodapé" d="Contato e redes sociais" />

        {!atual.habilitado && (
          <p className="rounded border border-dashed border-[#ccc] p-2.5 text-xs text-[#777]">
            “Vagas em destaque” está desabilitado. <Link to="/configuracoes/api-vagas" className="text-[var(--chart-2)] underline">Habilitar em Configurações › API de Vagas</Link>
          </p>
        )}

        {editando === "destaques" && atual.habilitado && (
          <div className="space-y-3 rounded-[.3rem] border border-amber-300 bg-white p-4">
            <p className="flex items-center gap-1 text-sm font-semibold"><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" /> Editar: Vagas em destaque</p>
            <Campo label="Título" value={v4.titulo} onChange={(titulo) => set({ titulo })} />
            <Campo label="Descrição" value={v4.descricao} onChange={(descricao) => set({ descricao })} area />
            <Campo label="Texto do selo (vazio = sem selo)" value={v4.selo} onChange={(selo) => set({ selo })} />
            <fieldset>
              <legend className="text-[11px] text-[#aaa]">Estilo dos cards</legend>
              {ESTILOS.map((e) => (
                <label key={e.v} className="mt-1.5 flex items-center gap-2 text-sm">
                  <input type="radio" name="estilo" checked={v4.estilo === e.v} onChange={() => set({ estilo: e.v })} className="accent-[var(--chart-2)]" />{e.t}
                </label>
              ))}
            </fieldset>
            <p className="border-t pt-3 text-xs text-[#777]">
              Fonte e tamanhos seguem o padrão da página, como nas demais seções. As vagas ({destaques.length}/{MAX_DESTAQUES}) e a ordem delas são escolhidas na <Link to="/vagas" className="text-[var(--chart-2)] underline">aba Vagas</Link>.
            </p>
          </div>
        )}
        {editando && editando !== "destaques" && (
          <p className="rounded border bg-white p-3 text-xs text-[#777]">Painel de edição de “{INFO[editando].t}” igual ao atual do RHBot.</p>
        )}
      </aside>

      <div className="min-h-[600px] flex-1 overflow-hidden rounded-[.25rem] border border-[#eee] bg-white shadow-[0_1px_4px_0_rgba(0,0,0,.14)]">
        <div className="flex items-center gap-2 border-b bg-[#f3f4f6] px-3 py-2 text-xs text-[#777]">
          <span className="h-2.5 w-2.5 rounded-full bg-[#f44336]" /><span className="h-2.5 w-2.5 rounded-full bg-[#ff9800]" /><span className="h-2.5 w-2.5 rounded-full bg-[#4caf50]" />
          <span className="ml-2 truncate">Pré-visualização · rascunho</span>
        </div>
        <div className="h-[calc(100%-33px)] max-h-[80vh] overflow-y-auto overflow-x-hidden lg:max-h-none">
          <Modelo4 vagas={VAGAS} destaques={destaques} destaqueIds={atual.habilitado ? atual.ids : []} v4={{ ...v4, ordem }} />
        </div>
      </div>
    </div>
  );
}

function Campo({ label, value, onChange, area }: { label: string; value: string; onChange: (v: string) => void; area?: boolean }) {
  const cls = "mt-1 block w-full border-0 border-b border-[#d2d2d2] bg-transparent py-1.5 text-sm text-[#495057] focus:border-[var(--chart-2)] focus:outline-none";
  return (
    <label className="block text-[11px] text-[#aaa]">
      {label}
      {area ? <textarea rows={2} value={value} onChange={(e) => onChange(e.target.value)} className={cls} /> : <input value={value} onChange={(e) => onChange(e.target.value)} className={cls} />}
    </label>
  );
}
