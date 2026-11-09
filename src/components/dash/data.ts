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
export const situacao = [{ name: "Abertas", value: 186 }, { name: "Prospecção", value: 14 }, { name: "Stand by", value: 9 }, { name: "Solicitando doc.", value: 4 }, { name: "Preenchidas", value: 24 }, { name: "Expiradas sem preenchimento", value: 9 }, { name: "Fechadas sem contratação", value: 4, color: "var(--muted-foreground)" }, { name: "Canceladas", value: 5, color: "color-mix(in oklch, var(--muted-foreground) 45%, transparent)" }];
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
];// Contratados nos últimos 6 meses (105) pelo perfil do cadastro.
export const contratadosGenero = [{ name: "Feminino", value: 58 }, { name: "Masculino", value: 45 }, { name: "Não informado", value: 2 }];
export const contratadosRaca = [{ name: "Parda", value: 44 }, { name: "Branca", value: 38 }, { name: "Preta", value: 16 }, { name: "Amarela", value: 3 }, { name: "Indígena", value: 1 }, { name: "Não declarada", value: 3 }];
export const contratadosFaixa = [{ name: "16–18 anos", value: 9 }, { name: "19–21 anos", value: 27 }, { name: "22–25 anos", value: 33 }, { name: "26–30 anos", value: 20 }, { name: "31–40 anos", value: 11 }, { name: "41+ anos", value: 5 }];
export const contratadosPcd = [{ name: "Sem deficiência", value: 97 }, { name: "Pessoas com deficiência", value: 8 }];
// Área de interesse dos 773 candidatos e área das 214 vagas abertas.
export const interesseVsVagas = [
  { name: "Administrativo", candidatos: 220, vagas: 40 },
  { name: "Comercial", candidatos: 175, vagas: 52 },
  { name: "TI", candidatos: 138, vagas: 45 },
  { name: "Operações", candidatos: 110, vagas: 38 },
  { name: "Financeiro", candidatos: 80, vagas: 21 },
  { name: "Marketing", candidatos: 30, vagas: 18 },
  { name: "Outras", candidatos: 20, vagas: 0 },
];
// Dias médios por mês: abertura da vaga até a 1ª contratação e entrada do candidato no processo até a contratação.
export const tempoContratacao = months.map((m, i) => ({ m, vaga: [21, 20, 19, 19, 18, 17][i] ?? 0, candidato: [17, 16, 16, 15, 14, 12][i] ?? 0 }));
