// Estado compartilhado do protótipo entre as telas (Configurações, aba Vagas, editor do modelo 4 e
// página pública). Fica no localStorage do navegador para a demonstração sobreviver à navegação.
import { useSyncExternalStore } from "react";
import { DESTAQUES_PADRAO } from "./data";

export type SecaoV4 = "destaques" | "sobre" | "vagas" | "chamada";
export type EstiloDestaque = "borda" | "fundo" | "padrao";

export type EstadoDestaques = {
  modelo: 1 | 2 | 3 | 4; // Configurações › API de Vagas › Modelo de API
  habilitado: boolean; // Configurações › API de Vagas › "Vagas em destaque"
  ids: number[]; // ordem de exibição
  v4: {
    ordem: SecaoV4[]; // seções móveis entre a capa e o rodapé
    visivel: Record<SecaoV4, boolean>;
    titulo: string;
    descricao: string;
    selo: string;
    estilo: EstiloDestaque;
  };
};

export const ESTADO_PADRAO: EstadoDestaques = {
  modelo: 4,
  habilitado: true,
  ids: DESTAQUES_PADRAO,
  v4: {
    ordem: ["destaques", "sobre", "vagas", "chamada"],
    visivel: { destaques: true, sobre: true, vagas: true, chamada: true },
    titulo: "Vagas em destaque",
    descricao: "Oportunidades prioritárias que estamos buscando preencher agora.",
    selo: "Destaque",
    estilo: "borda",
  },
};

const KEY = "proto-vagas-destaque-v1";
let estado = ESTADO_PADRAO;
let carregado = false;
const ouvintes = new Set<() => void>();

function carregar() {
  if (carregado || typeof window === "undefined") return;
  carregado = true;
  try {
    const salvo = window.localStorage.getItem(KEY);
    if (salvo) {
      const p = JSON.parse(salvo) as Partial<EstadoDestaques>;
      estado = { ...ESTADO_PADRAO, ...p, v4: { ...ESTADO_PADRAO.v4, ...p.v4 } };
    }
  } catch {
    /* sem armazenamento: segue com o padrão */
  }
}

export function setEstado(fn: (e: EstadoDestaques) => EstadoDestaques) {
  carregar();
  estado = fn(estado);
  try {
    window.localStorage.setItem(KEY, JSON.stringify(estado));
  } catch {
    /* ignora */
  }
  ouvintes.forEach((o) => o());
}

export const restaurarPadrao = () => setEstado(() => ESTADO_PADRAO);

export function useDestaques(): EstadoDestaques {
  return useSyncExternalStore(
    (cb) => {
      ouvintes.add(cb);
      if (!carregado) {
        carregar();
        queueMicrotask(cb);
      }
      return () => ouvintes.delete(cb);
    },
    () => estado,
    () => ESTADO_PADRAO,
  );
}
