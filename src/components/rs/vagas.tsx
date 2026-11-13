// Réplica da aba Vagas do R&S (RHBot: recrutamento_vagas / RsVagasController@lista) com o recurso
// novo: estrela "Destacar na página de vagas" por vaga, marca na coluna Divulgar, filtro
// "Vagas em Destaque" e o botão "Vagas em Destaque" que abre o modal de ordenação.
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight, ChevronDown, Check, Copy, ExternalLink, FileText, List, Pencil, Power, Search, Star, X, Info, Send,
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { MAX_DESTAQUES, VAGAS_RS, alternarDestaque, local, podeDestacar, type Vaga } from "@/components/api-vagas/data";
import { setEstado, useDestaques } from "@/components/api-vagas/store";
import { Sortable } from "@/components/api-vagas/sortable";
import { IconAction, MD, MdButton, MdSwitch, NovoTag } from "./md";

const situacaoTxt: Record<Vaga["situacao"], [string, string]> = {
  A: ["Aberta", MD.success], F: ["Fechada", MD.danger], S: ["Stand By", MD.warning], P: ["Em Prospecção", MD.info],
};

type Filtro = "todas" | "A" | "A_D" | "A_N" | "F" | "DEST";

export function VagasRS() {
  const { habilitado, ids } = useDestaques();
  const [filtro, setFiltro] = useState<Filtro>("todas");
  const [modal, setModal] = useState<{ aberto: boolean; pendente?: Vaga }>({ aberto: false });
  const [editar, setEditar] = useState<Vaga | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);

  const avisar = (t: string) => { setAviso(t); window.setTimeout(() => setAviso(null), 3500); };

  const destacar = (v: Vaga) => {
    if (ids.includes(v.id)) {
      setEstado((e) => ({ ...e, ids: alternarDestaque(e.ids, v.id) }));
      avisar(`"${v.titulo}" saiu dos destaques.`);
    } else if (ids.length >= MAX_DESTAQUES) {
      setEditar(null);
      setModal({ aberto: true, pendente: v }); // limite: escolher qual substituir
    } else {
      setEstado((e) => ({ ...e, ids: alternarDestaque(e.ids, v.id) }));
      avisar(`"${v.titulo}" está em destaque na posição ${ids.length + 1}.`);
    }
  };

  const lista = VAGAS_RS.filter((v) => {
    if (filtro === "A") return v.situacao === "A";
    if (filtro === "A_D") return v.situacao === "A" && v.divulga;
    if (filtro === "A_N") return v.situacao === "A" && !v.divulga;
    if (filtro === "F") return v.situacao === "F";
    if (filtro === "DEST") return ids.includes(v.id);
    return true;
  }).sort((a, b) => (filtro === "DEST" ? ids.indexOf(a.id) - ids.indexOf(b.id) : 0));

  const validos = ids.filter((id) => VAGAS_RS.some((v) => v.id === id && podeDestacar(v)));

  return (
    <div className="font-[Roboto,Helvetica,Arial,sans-serif] text-[#212529]">
      <div className="rounded-[.25rem] border border-[#eee] bg-white p-4 text-[.875rem] shadow-[0_1px_4px_0_rgba(0,0,0,.14)]">
        <MdButton cor="primary" sm><Search className="h-3.5 w-3.5" /> Busca Avançada <ChevronDown className="h-3.5 w-3.5" /></MdButton>

        <div className="flex flex-wrap items-center justify-between gap-3 px-2 py-6">
          <div className="flex flex-wrap items-center gap-2">
            <MdButton cor="success" sm>Nova Vaga</MdButton>
            <MdButton sm>Solicitações <span className="rounded-full bg-[#f44336] px-1.5 text-[10px]">2</span></MdButton>
            {habilitado && (
              <MdButton cor="warning" sm onClick={() => setModal({ aberto: true })} title="Escolher e ordenar as vagas em destaque da página de vagas">
                <Star className="h-3.5 w-3.5 fill-current" /> Vagas em Destaque ({validos.length}/{MAX_DESTAQUES})
              </MdButton>
            )}
          </div>
          <div className="flex gap-2">
            <MdButton cor="success" sm><FileText className="h-3.5 w-3.5" /> Relatório</MdButton>
            <MdButton cor="info" sm><Send className="h-3.5 w-3.5" /> Ações</MdButton>
          </div>
        </div>

        {!habilitado && (
          <p className="mx-2 mb-4 flex items-center gap-2 rounded border border-dashed border-[#ccc] p-2.5 text-xs text-[#777]">
            <Info className="h-4 w-4 shrink-0" /> Vagas em destaque está desabilitado.
            <Link to="/configuracoes/api-vagas" className="font-medium text-[var(--chart-2)] underline">Habilitar em Configurações › API de Vagas</Link>
          </p>
        )}

        <div className="mb-4 grid gap-4 px-2 md:grid-cols-4">
          <span className="hidden md:block" />
          <select className="border-0 border-b border-[#d2d2d2] bg-transparent py-1.5 text-sm"><option>Todos os Tipos</option></select>
          <select className="border-0 border-b border-[#d2d2d2] bg-transparent py-1.5 text-sm"><option>Todas as Origens</option></select>
          <select aria-label="Situação" value={filtro} onChange={(e) => setFiltro(e.target.value as Filtro)} className="border-0 border-b border-[#d2d2d2] bg-transparent py-1.5 text-sm">
            <option value="todas">Todas as Situações</option>
            <option value="A">Vagas Abertas</option>
            <option value="A_D">Abertas e Divulgadas</option>
            <option value="A_N">Abertas e Não Divulgadas</option>
            <option value="F">Vagas Fechadas</option>
            {habilitado && <option value="DEST">★ Vagas em Destaque (novo)</option>}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] text-left">
            <thead>
              <tr className="border-b border-[#ddd] text-[1.0625rem] font-light [&>th]:px-2 [&>th]:py-3 [&>th]:font-light">
                <th><input type="checkbox" aria-label="Selecionar todas" /></th><th>#</th><th /><th>Vaga</th><th>Cargo</th><th>Empresa</th><th>Cidade</th><th>Estado</th><th>Salário</th><th>Situação</th><th>Datas</th><th>Candidatos</th><th>Contratados</th><th>Divulgar</th><th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {lista.map((v, i) => {
                const pos = ids.indexOf(v.id);
                const dest = habilitado && pos >= 0;
                const [sit, cor] = situacaoTxt[v.situacao];
                return (
                  <tr key={v.id} className={`border-b border-[#ddd] align-top text-[.8125rem] [&>td]:px-2 [&>td]:py-3 ${i % 2 === 0 ? "bg-black/[.05]" : ""}`}>
                    <td><input type="checkbox" aria-label={`Selecionar ${v.titulo}`} /></td>
                    <td>{v.referencia}</td>
                    <td><span className="mt-1 block h-[11px] w-[11px] rounded-[3px]" style={{ backgroundColor: v.situacao === "A" ? (v.candidatos > 60 ? MD.danger : MD.success) : MD.default }} /></td>
                    <td className="font-medium">{v.titulo}</td>
                    <td>{v.cargo}</td>
                    <td>Grupo Horizonte</td>
                    <td>{v.cidade}</td>
                    <td>{v.uf}</td>
                    <td>{v.salario ?? "A combinar"}{v.periodo && <><br />{v.periodo}</>}</td>
                    <td style={{ color: cor }}>{sit}</td>
                    <td><small>Cadastro: {v.cadastro}</small></td>
                    <td><small>Candidatos: {v.candidatos}</small></td>
                    <td style={{ color: v.contratados[0] >= v.contratados[1] ? MD.success : undefined }}>{v.contratados[0]}/{v.contratados[1]}</td>
                    <td>
                      <div className="flex items-center gap-1">
                        {v.divulga && (v.situacao === "A" || v.situacao === "F") && <Check className="h-5 w-5" style={{ color: MD.success }} />}
                        {dest && <span title={`Em destaque · posição ${pos + 1}`} className="inline-flex items-center gap-0.5 rounded-full bg-amber-100 px-1.5 py-0.5 text-[11px] font-bold text-amber-800"><Star className="h-3 w-3 fill-amber-400 text-amber-500" />{pos + 1}º</span>}
                      </div>
                    </td>
                    <td>
                      <div className="flex min-w-[80px] flex-wrap">
                        {habilitado && (
                          <IconAction
                            title={dest ? "Remover dos destaques" : podeDestacar(v) ? "Destacar na página de vagas" : "Só vagas abertas e divulgadas podem ser destacadas"}
                            cor={dest ? "warning" : "default"}
                            ativo={dest}
                            disabled={!dest && !podeDestacar(v)}
                            onClick={() => destacar(v)}
                          >
                            <Star className={dest ? "fill-current" : ""} />
                          </IconAction>
                        )}
                        <IconAction title="Resumo da Vaga"><List /></IconAction>
                        <IconAction title="Duplicar Vaga"><Copy /></IconAction>
                        <IconAction title="Editar Vaga" onClick={() => setEditar(v)}><Pencil /></IconAction>
                        <IconAction title="Excluir Vaga"><X /></IconAction>
                        <IconAction title="Encerrar Processo" disabled={v.situacao !== "A"}><Power /></IconAction>
                        <IconAction title="Ir para Processo Seletivo"><ArrowRight /></IconAction>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-4 flex flex-wrap justify-center gap-4 text-[13px]">
          <span className="flex items-center gap-1"><span className="h-[11px] w-[11px] rounded-[3px]" style={{ backgroundColor: MD.success }} /> Até 7 dias aberta</span>
          <span className="flex items-center gap-1"><span className="h-[11px] w-[11px] rounded-[3px]" style={{ backgroundColor: MD.danger }} /> Mais de 15 dias aberta</span>
          {habilitado && <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" /> Vaga em destaque (posição)</span>}
        </p>
      </div>

      {aviso && <div role="status" className="fixed right-4 top-4 z-[60] rounded bg-[#323232] px-4 py-3 text-sm text-white shadow-lg">{aviso}</div>}

      <ModalDestaques
        aberto={modal.aberto}
        pendente={modal.pendente}
        onClose={() => setModal({ aberto: false })}
        onSalvo={(t) => avisar(t)}
      />
      <ModalDivulgacao vaga={editar} onClose={() => setEditar(null)} onDestacar={destacar} />
    </div>
  );
}

// Modal "Vagas em Destaque": único lugar onde a ordem é definida (arrastar ou setas).
function ModalDestaques({ aberto, pendente, onClose, onSalvo }: { aberto: boolean; pendente?: Vaga | undefined; onClose: () => void; onSalvo: (t: string) => void }) {
  const { ids } = useDestaques();
  const [rascunho, setRascunho] = useState<number[]>(ids);
  const [novo, setNovo] = useState("");
  const [sync, setSync] = useState(false);
  if (aberto && !sync) { setRascunho(ids.filter((id) => VAGAS_RS.some((v) => v.id === id && podeDestacar(v)))); setSync(true); }
  if (!aberto && sync) setSync(false);

  const elegiveis = VAGAS_RS.filter((v) => podeDestacar(v) && !rascunho.includes(v.id));
  const cheio = rascunho.length >= MAX_DESTAQUES;
  const pend = pendente && !rascunho.includes(pendente.id) ? pendente : undefined;
  const vaga = (id: number) => VAGAS_RS.find((v) => v.id === id)!;

  const salvar = () => {
    setEstado((e) => ({ ...e, ids: rascunho }));
    onSalvo("Ordem das vagas em destaque salva.");
    onClose();
  };

  return (
    <Dialog open={aberto} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg gap-0 p-0 font-[Roboto,Helvetica,Arial,sans-serif]">
        <div className="border-b px-6 py-4">
          <DialogTitle className="flex items-center gap-2 text-[1.0625rem] font-normal"><Star className="h-4 w-4 fill-amber-400 text-amber-500" /> Vagas em Destaque <NovoTag /></DialogTitle>
          <DialogDescription className="mt-1 text-xs">
            Até {MAX_DESTAQUES} vagas abertas e divulgadas. Arraste para definir a ordem em que aparecem na página de vagas.
          </DialogDescription>
        </div>
        <div className="space-y-4 px-6 py-5 text-sm">
          {pend && (
            <p className="rounded border border-amber-300 bg-amber-50 p-3 text-xs text-amber-900">
              Limite de {MAX_DESTAQUES} destaques atingido. Clique em <strong>Substituir</strong> na vaga que deve dar lugar a <strong>{pend.titulo}</strong>, ou remova uma delas.
            </p>
          )}
          {rascunho.length > 0 ? (
            <Sortable
              itens={rascunho}
              chave={(id) => id}
              onChange={setRascunho}
              className="space-y-2"
              itemClassName="rounded border border-[#ddd] bg-white p-2.5 hover:bg-[#f3f3f3]"
              render={(id, i) => {
                const v = vaga(id);
                return (
                  <div className="flex items-center gap-2">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-amber-100 text-xs font-bold text-amber-800">{i + 1}</span>
                    <div className="min-w-0 flex-1"><p className="truncate font-medium">{v.titulo}</p><p className="text-xs text-[#999]">{v.referencia} · {local(v)}</p></div>
                    {pend && <button type="button" onClick={() => setRascunho(rascunho.map((x) => (x === id ? pend.id : x)))} className="rounded border border-amber-400 px-2 py-0.5 text-[11px] font-medium text-amber-800 hover:bg-amber-50">Substituir</button>}
                    <button type="button" aria-label={`Remover ${v.titulo}`} onClick={() => setRascunho(rascunho.filter((x) => x !== id))} className="rounded p-1 text-[#999] hover:bg-black/5 hover:text-[#f44336]"><X className="h-4 w-4" /></button>
                  </div>
                );
              }}
            />
          ) : (
            <p className="rounded border border-dashed p-4 text-center text-xs text-[#999]">Nenhuma vaga em destaque. A página de vagas fica como hoje.</p>
          )}
          <div className="flex items-end gap-2">
            <label className="flex-1 text-[11px] text-[#aaa]">
              Adicionar vaga
              <select value={novo} disabled={cheio} onChange={(e) => setNovo(e.target.value)} className="mt-1 block w-full border-0 border-b border-[#d2d2d2] bg-transparent py-1.5 text-sm text-[#495057] disabled:opacity-50">
                <option value="">{cheio ? `Limite de ${MAX_DESTAQUES} atingido` : "Selecione uma vaga aberta e divulgada"}</option>
                {elegiveis.map((v) => <option key={v.id} value={v.id}>{v.referencia} – {v.titulo}</option>)}
              </select>
            </label>
            <MdButton cor="info" sm disabled={cheio || !novo} onClick={() => { setRascunho([...rascunho, Number(novo)]); setNovo(""); }}>Adicionar</MdButton>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2 border-t px-6 py-4">
          <Link to="/api-vagas" className="flex items-center gap-1 text-xs text-[var(--chart-2)] hover:underline"><ExternalLink className="h-3.5 w-3.5" /> Ver página de vagas</Link>
          <div className="flex gap-2">
            <MdButton cor="default" sm onClick={onClose}>Fechar</MdButton>
            <MdButton cor="success" sm onClick={salvar}>Salvar</MdButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Trecho da aba "Divulgação" da edição da vaga (rsvagas_info), com a opção espelho do destaque.
function ModalDivulgacao({ vaga, onClose, onDestacar }: { vaga: Vaga | null; onClose: () => void; onDestacar: (v: Vaga) => void }) {
  const { habilitado, ids } = useDestaques();
  if (!vaga) return null;
  const pos = ids.indexOf(vaga.id);
  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-xl font-[Roboto,Helvetica,Arial,sans-serif]">
        <DialogTitle className="text-[1.0625rem] font-normal">Editar Vaga · {vaga.titulo}</DialogTitle>
        <DialogDescription className="text-xs">Simulação da aba Divulgação da edição da vaga.</DialogDescription>
        <div className="flex gap-1 text-xs">
          {["Gerais", "Divulgação", "Questões", "A. comportamental"].map((t) => (
            <span key={t} className={`rounded-[30px] px-4 py-2 uppercase ${t === "Divulgação" ? "bg-[var(--chart-2)] text-white shadow" : "text-[#555]"}`}>{t}</span>
          ))}
        </div>
        <h5 className="mt-2 text-[1.0625rem] font-light">Divulgar na API do Candidato</h5>
        <div className="space-y-4 rounded-[.25rem] border border-[#eee] p-4 shadow-[0_1px_4px_0_rgba(0,0,0,.14)]">
          <MdSwitch checked={vaga.divulga} onChange={() => undefined} label="Divulgada" />
          <p className="text-xs text-[#999]">Atualizado em: {vaga.cadastro}</p>
          {habilitado && (
            <div className="border-t pt-4">
              <MdSwitch
                checked={pos >= 0}
                disabled={pos < 0 && !podeDestacar(vaga)}
                onChange={() => onDestacar(vaga)}
                label={<span>Destacar na página de vagas <NovoTag />{pos >= 0 && <span className="ml-2 text-xs text-amber-700">posição {pos + 1}º</span>}</span>}
              />
              <p className="mt-2 text-xs text-[#999]">
                {podeDestacar(vaga) ? "A ordem é definida no botão “Vagas em Destaque” da lista de vagas." : "Disponível apenas para vagas abertas e divulgadas."}
              </p>
            </div>
          )}
        </div>
        <div className="flex justify-end"><MdButton cor="default" sm onClick={onClose}>Fechar</MdButton></div>
      </DialogContent>
    </Dialog>
  );
}
