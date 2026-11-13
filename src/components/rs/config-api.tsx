// Réplica de Configurações › API de Vagas (RHBot: /rsaparencia, layouts/rsaparencia.blade.php) com o
// bloco novo "Vagas em Destaque": é aqui que o recurso é habilitado/desabilitado para a empresa.
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ExternalLink, Palette, Star } from "lucide-react";
import { MAX_DESTAQUES, VAGAS, vagasEmDestaque } from "@/components/api-vagas/data";
import { setEstado, useDestaques, type EstadoDestaques } from "@/components/api-vagas/store";
import { Bloco, MdButton, MdSelect } from "./md";

const thumbs: Record<number, string> = {
  1: "linear-gradient(#334155 55%, #fff 55%)",
  2: "linear-gradient(#fff 12%, #475569 12%, #475569 60%, #f8f9fa 60%)",
  3: "linear-gradient(#fff 12%, #e2e8f0 12%, #e2e8f0 60%, #f8f9fa 60%)",
  4: "linear-gradient(#0e7490 45%, #fff 45%, #fff 70%, #f7f9fb 70%)",
};

export function ConfigApiVagas() {
  const atual = useDestaques();
  // Rascunho local: só vai para a página pública ao clicar em "Publicar", como na tela real.
  const [rasc, setRasc] = useState<Pick<EstadoDestaques, "modelo" | "habilitado"> | null>(null);
  const r = rasc ?? { modelo: atual.modelo, habilitado: atual.habilitado };
  const set = (p: Partial<typeof r>) => setRasc({ ...r, ...p });
  const [ok, setOk] = useState(false);
  const alterado = rasc !== null && (rasc.modelo !== atual.modelo || rasc.habilitado !== atual.habilitado);
  const qtd = vagasEmDestaque(atual.ids, VAGAS).length;

  const publicar = () => {
    setEstado((e) => ({ ...e, ...r }));
    setRasc(null);
    setOk(true);
    window.setTimeout(() => setOk(false), 3000);
  };

  return (
    <div className="font-[Roboto,Helvetica,Arial,sans-serif] text-[#212529]">
      <div className="rounded-[.25rem] border border-[#eee] bg-white p-4 text-[.875rem] shadow-[0_1px_4px_0_rgba(0,0,0,.14)] sm:p-6">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <MdButton cor="success" onClick={publicar}>Publicar</MdButton>
          {alterado && <span className="text-xs text-[#ff9800]">Alterações não publicadas</span>}
          {ok && <span role="status" className="text-xs text-[#4caf50]">Configurações publicadas na API de vagas.</span>}
        </div>

        <Bloco titulo="Modelo de API">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {([1, 2, 3, 4] as const).map((m) => (
              <label key={m} className="flex cursor-pointer flex-col items-center gap-2 text-sm">
                <span className="h-[80px] w-[120px] rounded border shadow-sm" style={{ backgroundImage: thumbs[m] }} />
                <span className="flex items-center gap-1.5">
                  <input type="radio" name="modelo" checked={r.modelo === m} onChange={() => set({ modelo: m })} className="accent-[var(--chart-2)]" />
                  {m === 4 ? "Modelo 4 - Personalizável" : `Modelo ${m}`}
                </span>
                {m === 4 && (
                  <Link to="/configuracoes/editor-v4" className="rounded-[.2rem] bg-[var(--chart-2)] px-3 py-1 text-[11px] uppercase text-white shadow"><Palette className="mr-1 inline h-3 w-3" />Personalizar</Link>
                )}
              </label>
            ))}
          </div>
        </Bloco>

        <Bloco titulo="Página de Vagas">
          <div className="grid gap-2 sm:grid-cols-3">
            {["Mostrar filtro por Áreas", "Mostrar filtro por Localidade", "Mostrar filtro por Filiais", "Mostrar filtro por Contratos"].map((t) => (
              <label key={t} className="flex items-center gap-2 text-sm text-[#555]"><input type="checkbox" defaultChecked className="accent-[var(--chart-2)]" />{t}</label>
            ))}
          </div>
        </Bloco>

        <Bloco titulo="Vagas em Destaque" novo>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <MdSelect
                label="Vagas em destaque"
                value={r.habilitado ? "1" : "0"}
                onChange={(v) => set({ habilitado: v === "1" })}
                options={[["1", "Habilitado"], ["0", "Desabilitado"]]}
              />
              <p className="text-xs leading-relaxed text-[#777]">
                Quando habilitado, a aba <strong>Vagas</strong> ganha a estrela “Destacar na página de vagas” e o botão “Vagas em Destaque”, onde o recrutador escolhe até {MAX_DESTAQUES} vagas e define a ordem.
                Ao desabilitar, a seção some da página de vagas e as escolhas ficam guardadas para quando o recurso voltar.
              </p>
            </div>
            <div className="rounded border border-dashed border-[#ccc] p-4 text-xs text-[#555]">
              <p className="flex items-center gap-1.5 font-medium"><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" /> {qtd} de {MAX_DESTAQUES} vagas em destaque hoje</p>
              <Link to="/vagas" className="mt-2 inline-flex items-center gap-1 text-[var(--chart-2)] hover:underline">Escolher e ordenar na aba Vagas <ExternalLink className="h-3 w-3" /></Link>
              <p className="mt-3 text-[#777]">
                {r.modelo === 4
                  ? <>No modelo 4, “Vagas em destaque” é uma seção do editor: dá para mover, ocultar e editar título, descrição, selo e estilo em <Link to="/configuracoes/editor-v4" className="text-[var(--chart-2)] underline">Personalizar</Link>.</>
                  : <>Nos modelos 1, 2 e 3 a seção aparece em posição fixa, logo antes da lista de vagas, no estilo do modelo.</>}
              </p>
            </div>
          </div>
        </Bloco>

        <Bloco titulo="Rodapé">
          <p className="text-xs text-[#999]">Demais blocos da tela (Imagens, Página Inicial, Cadastro, Sobre, Depoimentos, Rodapé) permanecem como hoje.</p>
        </Bloco>
      </div>
    </div>
  );
}
