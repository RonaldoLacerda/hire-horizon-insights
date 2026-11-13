// Controles do protótipo (não fazem parte da página pública): atalhos para as telas do R&S onde o
// recurso é configurado, troca rápida de modelo, liga/desliga e explicação das regras.
import { Info, LayoutDashboard, ListOrdered, Palette, Settings, Star } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { restaurarPadrao, setEstado, useDestaques } from "./store";

const pill = "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function Controles() {
  const { modelo, habilitado } = useDestaques();
  return (
    <div className="fixed bottom-4 left-1/2 z-50 flex w-[calc(100%-1rem)] max-w-max -translate-x-1/2 flex-wrap items-center justify-center gap-1.5 rounded-2xl border bg-card p-1.5 font-sans text-foreground shadow-lg sm:rounded-full">
      <Link to="/" title="Voltar ao painel" className={`${pill} flex items-center gap-1 text-muted-foreground hover:text-foreground`}>
        <LayoutDashboard className="h-3.5 w-3.5" /> Painel
      </Link>
      <div role="radiogroup" aria-label="Modelo da API de vagas" className="flex gap-0.5 border-x px-1.5">
        {([1, 2, 3, 4] as const).map((m) => (
          <button key={m} type="button" role="radio" aria-checked={modelo === m} onClick={() => setEstado((e) => ({ ...e, modelo: m }))} className={`${pill} ${modelo === m ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
            Modelo {m}
          </button>
        ))}
      </div>
      <label className="flex cursor-pointer items-center gap-2 px-2 text-xs font-semibold">
        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" /> Destaques
        <Switch checked={habilitado} onCheckedChange={(v) => setEstado((e) => ({ ...e, habilitado: v }))} aria-label="Exibir vagas em destaque" />
      </label>
      <Link to="/vagas" className={`${pill} flex items-center gap-1 bg-accent text-accent-foreground`}>
        <ListOrdered className="h-3.5 w-3.5" /> Escolher e ordenar
      </Link>
      {modelo === 4 && (
        <Link to="/configuracoes/editor-v4" className={`${pill} flex items-center gap-1 text-muted-foreground hover:text-foreground`}>
          <Palette className="h-3.5 w-3.5" /> Editor v4
        </Link>
      )}
      <Link to="/configuracoes/api-vagas" title="Configurações › API de Vagas" className={`${pill} flex items-center gap-1 text-muted-foreground hover:text-foreground`}>
        <Settings className="h-3.5 w-3.5" /> Configurações
      </Link>
      <ComoFunciona />
    </div>
  );
}

const regras: { t: string; d: string }[] = [
  { t: "Liga/desliga por empresa", d: "Em Configurações › API de Vagas, bloco “Vagas em Destaque”: Habilitado/Desabilitado. Desabilitado, nada muda no sistema nem na página; as escolhas ficam guardadas." },
  { t: "Até 3 vagas, ordem definida", d: "O recrutador escolhe no máximo 3 vagas. A ordem de exibição é a da lista no modal “Vagas em Destaque”." },
  { t: "Só vagas visíveis", d: "Apenas vagas abertas e divulgadas na API. Ao encerrar, expirar ou retirar a divulgação, a vaga sai do destaque automaticamente." },
  { t: "Seção oculta quando vazia", d: "Sem vagas destacadas a página fica exatamente como hoje. Com 1 ou 2, mostra só essas." },
  { t: "Sem duplicar a lista", d: "A vaga destacada continua na lista normal (busca e filtros iguais), apenas com o selo “Destaque”." },
];

const ondeMarca: { t: string; d: string }[] = [
  { t: "Estrela na aba Vagas (principal)", d: "Novo botão-ícone ★ na coluna Ações: um clique destaca ou remove. Fica desabilitado para vagas fechadas ou não divulgadas. A coluna Divulgar mostra ★ com a posição." },
  { t: "Botão “Vagas em Destaque (2/3)”", d: "Ao lado de “Solicitações”. Abre o modal onde se arrasta para ordenar, remove e adiciona vagas. É o único lugar de ordenação." },
  { t: "Limite atingido", d: "Ao destacar uma 4ª vaga, o modal abre pedindo qual substituir — sem mensagem de erro sem saída." },
  { t: "Divulgação da vaga (atalho)", d: "Na aba Divulgação da edição, um switch “Destacar na página de vagas” logo abaixo de “Divulgar na API do Candidato”. Grava a mesma informação da estrela." },
  { t: "Filtro de situação", d: "Nova opção “Vagas em Destaque” no select de situação, já ordenada pela posição." },
];

const onde: { m: string; d: string }[] = [
  { m: "Modelos 1, 2 e 3", d: "Posição fixa, logo antes da lista de vagas, no estilo de cada modelo. Esses modelos não têm editor de seções, então não há o que mover." },
  { m: "Modelo 4", d: "Seção própria no editor (Personalizar): arrastável entre as seções, pode ser ocultada pelo olho e tem painel com título, descrição, texto do selo e estilo dos cards (borda, fundo na cor da página ou igual às vagas). Cabeçalho, capa e rodapé seguem bloqueados. Fonte e tamanhos seguem o padrão do editor, como nas demais seções." },
];

const etapas: string[] = [
  "Banco: rs_vagas.destaque (0/1) + destaque_ordem; rs_tema_api: habilita_vagas_destaque; nova linha “destaques” em rs_tema_sections (rascunho/publicado) e campos destaque_titulo, destaque_descricao, destaque_selo, destaque_estilo em rs_tema_api_v4.",
  "Configurações › API de Vagas: bloco “Vagas em Destaque” (Habilitado/Desabilitado), salvo junto do Publicar.",
  "Aba Vagas: estrela na coluna Ações, ★ posição na coluna Divulgar, botão e modal “Vagas em Destaque” (Sortable, já usado no editor v4), filtro de situação. Rotas: alternar destaque e salvar ordem, validando limite e elegibilidade.",
  "Edição da vaga › Divulgação: switch espelho “Destacar na página de vagas”.",
  "Editor v4: seção “destaques” criada em criarSecoesPadrao (e por migração para quem já tem tema), edit-destaques.blade.php e _preview-destaques.blade.php.",
  "API pública: buscar destaques válidos por destaque_ordem e renderizar nos modelos 1–3 (API_N/inicial) e no home_v4.",
  "Regra automática: ao encerrar, cancelar ou retirar a divulgação, zerar destaque e reordenar.",
  "Testes: limite, substituição, ordem, vaga encerrada, recurso desabilitado, seção oculta e responsivo nos 4 modelos.",
];

function Lista({ itens }: { itens: { t: string; d: string }[] }) {
  return <ul className="mt-2 space-y-2 text-sm">{itens.map((r) => <li key={r.t}><strong>{r.t}.</strong> <span className="text-muted-foreground">{r.d}</span></li>)}</ul>;
}

function ComoFunciona() {
  return (
    <Sheet>
      <SheetTrigger className={`${pill} flex items-center gap-1 text-muted-foreground hover:text-foreground`}>
        <Info className="h-3.5 w-3.5" /> Como funciona
      </SheetTrigger>
      <SheetContent className="w-full overflow-y-auto font-sans sm:max-w-lg">
        <SheetHeader>
          <p className="text-overline text-muted-foreground">Protótipo · Dados demonstrativos</p>
          <SheetTitle>Vagas em destaque na API de vagas</SheetTitle>
          <SheetDescription>Permite à empresa fixar até 3 vagas prioritárias na página pública de vagas, nos 4 modelos.</SheetDescription>
        </SheetHeader>
        <h3 className="mt-6 text-card-title">Regras</h3>
        <Lista itens={regras} />
        <h3 className="mt-6 text-card-title">Onde o recrutador destaca e ordena</h3>
        <Lista itens={ondeMarca} />
        <h3 className="mt-6 text-card-title">Onde aparece em cada modelo</h3>
        <Lista itens={onde.map((o) => ({ t: o.m, d: o.d }))} />
        <h3 className="mt-6 text-card-title">Plano de desenvolvimento</h3>
        <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-sm text-muted-foreground">
          {etapas.map((e) => <li key={e}>{e}</li>)}
        </ol>
        <button type="button" onClick={restaurarPadrao} className="mt-6 text-xs text-muted-foreground underline hover:text-foreground">Restaurar dados da demonstração</button>
      </SheetContent>
    </Sheet>
  );
}
