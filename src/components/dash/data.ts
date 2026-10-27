// Dados fictícios compartilhados entre os indicadores e suas distribuições.
export const months = ["Mai", "Jun", "Jul", "Ago", "Set", "Out"];
export const escolaridade = [{ name: "Superior", value: 312 }, { name: "Ensino médio", value: 248 }, { name: "Técnico", value: 158 }, { name: "Pós-graduação", value: 55 }];
export const escolaridadeVagas = [{ name: "Ensino médio", value: 102 }, { name: "Superior", value: 74 }, { name: "Técnico", value: 55 }, { name: "Fundamental", value: 24 }];
export const gruposCandidatos = [{ name: "Padrão", value: 521 }, { name: "Estagiário", value: 180 }, { name: "Jovem Aprendiz", value: 20 }, { name: "PCD", value: 52 }];
export const vagasPorSla = [{ name: "Dentro do prazo", value: 198 }, { name: "Fora do prazo", value: 16 }];
export const contratadosPorTipo = [{ name: "CLT", value: 61 }, { name: "PJ", value: 14 }, { name: "Estágio", value: 20 }, { name: "Jovem Aprendiz", value: 10 }];
export const bairros = [{ name: "Centro", value: 148 }, { name: "Jardim América", value: 112 }, { name: "Vila Nova", value: 96 }, { name: "Santa Maria", value: 84 }, { name: "São José", value: 73 }, { name: "Boa Vista", value: 64 }, { name: "Industrial", value: 51 }, { name: "Jardim Canadá", value: 45 }];
export const origem = [{ name: "Site de vagas", value: 284 }, { name: "LinkedIn", value: 196 }, { name: "Indicação", value: 121 }, { name: "Instituição de ensino", value: 98 }, { name: "Redes sociais", value: 74 }];
export const faixa = [{ name: "16–18 anos", value: 88 }, { name: "19–21 anos", value: 214 }, { name: "22–25 anos", value: 236 }, { name: "26–30 anos", value: 132 }, { name: "31–40 anos", value: 71 }, { name: "41+ anos", value: 32 }];
export const situacao = [{ name: "Abertas", value: 214 }, { name: "Prospecção", value: 14 }, { name: "Stand by", value: 9 }, { name: "Solicitando doc.", value: 4 }, { name: "Fechadas", value: 7 }, { name: "Canceladas", value: 7 }];
export const areas = [{ name: "Administrativo", value: 66 }, { name: "Comercial", value: 55 }, { name: "TI", value: 45 }, { name: "Operações", value: 40 }, { name: "Financeiro", value: 28 }, { name: "Marketing", value: 21 }];
export const topEmpresas = [{ name: "Grupo Alfa Logística", value: 38, sub: "Logística" }, { name: "Banco Horizonte", value: 31, sub: "Financeiro" }, { name: "TechNova Sistemas", value: 27, sub: "TI" }, { name: "Varejo Bom Preço", value: 22, sub: "Varejo" }, { name: "Construtora Pilar", value: 15, sub: "Construção" }];
export const vagasRecentes = [
  { vaga: "Agente Comunitário de Saúde", area: "Saúde", cand: 31, status: "Ativa", data: "20/10/2026" },
  { vaga: "Auxiliar de Serviços Gerais", area: "Serviços Gerais", cand: 19, status: "Ativa", data: "18/10/2026" },
  { vaga: "Recepcionista — UAI Jardim Canadá", area: "Administrativo", cand: 44, status: "Em seleção", data: "15/10/2026" },
  { vaga: "Vendedor(a) — Loja de Materiais", area: "Comercial", cand: 27, status: "Stand by", data: "11/10/2026" },
  { vaga: "Eletricista de Manutenção Predial", area: "Manutenção", cand: 12, status: "Ativa", data: "08/10/2026" },
];
export const recrutadores = [
  { name: "Ana Martins", triados: 180, selecao: 92, contratados: 34, provas: 46, dentro: 82, fora: 10 },
  { name: "Carlos Souza", triados: 156, selecao: 74, contratados: 27, provas: 38, dentro: 65, fora: 9 },
  { name: "Mariana Lima", triados: 128, selecao: 63, contratados: 19, provas: 31, dentro: 54, fora: 9 },
  { name: "Pedro Santos", triados: 96, selecao: 48, contratados: 14, provas: 24, dentro: 40, fora: 8 },
  { name: "Juliana Alves", triados: 80, selecao: 33, contratados: 11, provas: 17, dentro: 26, fora: 7 },
];