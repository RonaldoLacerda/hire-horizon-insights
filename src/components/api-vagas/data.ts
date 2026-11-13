// Dados fictícios do protótipo da API de vagas e da aba Vagas do R&S.
// Nenhum dado aqui vem do RHBot: servem só para demonstrar o recurso "Vagas em destaque".

export type Situacao = "A" | "F" | "S" | "P";

export type Vaga = {
  id: number;
  referencia: string;
  titulo: string;
  cargo: string;
  area: string;
  cidade: string;
  uf: string;
  contrato: string;
  homeOffice?: boolean;
  salario?: string; // vazio = "A combinar"
  periodo?: "Mensal" | "Por Hora";
  pcd?: boolean;
  situacao: Situacao;
  divulga: boolean; // divulgada na API de vagas
  cadastro: string;
  candidatos: number;
  contratados: [number, number];
};

export const EMPRESA = {
  nome: "Grupo Horizonte",
  titulo: "Venha crescer com a gente",
  descricao: "Conheça as oportunidades abertas e faça parte de uma empresa que acredita em pessoas.",
  email: "talentos@grupohorizonte.com.br",
  telefone: "(41) 3000-0000",
  endereco: "Rua das Flores, 1000 – Centro, Curitiba/PR",
};

// Cores configuráveis no RHBot (rs_api_config.cor_fundo / cor_fonte e --cor-empresa do modelo 4).
export const COR = { fundo: "#0e7490", fonte: "#ffffff", tituloVagaModelo1: "#1644ba", rodape: "#242424" };

const base = { candidatos: 0, contratados: [0, 1] as [number, number] };

// Todas as vagas do R&S (aba Vagas). A página pública só mostra as abertas e divulgadas.
export const VAGAS_RS: Vaga[] = [
  { ...base, id: 111, referencia: "VG-0111", titulo: "Coordenador(a) de Logística", cargo: "Coordenador de Logística", area: "Logística", cidade: "Curitiba", uf: "PR", contrato: "CLT", salario: "R$ 7.500,00", periodo: "Mensal", situacao: "A", divulga: false, cadastro: "12/11/2026", candidatos: 0 },
  { ...base, id: 110, referencia: "VG-0110", titulo: "Assistente de Departamento Pessoal", cargo: "Assistente de DP", area: "Recursos Humanos", cidade: "Curitiba", uf: "PR", contrato: "CLT", salario: "R$ 2.900,00", periodo: "Mensal", situacao: "F", divulga: true, cadastro: "01/10/2026", candidatos: 58, contratados: [1, 1] },
  { ...base, id: 109, referencia: "VG-0109", titulo: "Jovem Aprendiz", cargo: "Aprendiz", area: "Administrativo", cidade: "Porto Alegre", uf: "RS", contrato: "Aprendiz", situacao: "A", divulga: true, cadastro: "11/11/2026", candidatos: 14, contratados: [0, 4] },
  { ...base, id: 108, referencia: "VG-0108", titulo: "Motorista Entregador", cargo: "Motorista", area: "Logística", cidade: "Blumenau", uf: "SC", contrato: "CLT", salario: "R$ 2.600,00", periodo: "Mensal", situacao: "A", divulga: true, cadastro: "10/11/2026", candidatos: 9, contratados: [0, 2] },
  { ...base, id: 107, referencia: "VG-0107", titulo: "Analista Financeiro", cargo: "Analista Financeiro", area: "Financeiro", cidade: "Curitiba", uf: "PR", contrato: "CLT", salario: "R$ 4.800,00", periodo: "Mensal", situacao: "A", divulga: true, cadastro: "06/11/2026", candidatos: 31 },
  { ...base, id: 106, referencia: "VG-0106", titulo: "Operador(a) de Caixa", cargo: "Operador de Caixa", area: "Comercial", cidade: "Londrina", uf: "PR", contrato: "CLT", salario: "R$ 1.800,00", periodo: "Mensal", pcd: true, situacao: "A", divulga: true, cadastro: "04/11/2026", candidatos: 47, contratados: [2, 5] },
  { ...base, id: 105, referencia: "VG-0105", titulo: "Estágio em Marketing", cargo: "Estagiário", area: "Marketing", cidade: "Porto Alegre", uf: "RS", contrato: "Estágio", salario: "R$ 1.500,00", periodo: "Mensal", situacao: "A", divulga: true, cadastro: "30/10/2026", candidatos: 88 },
  { ...base, id: 104, referencia: "VG-0104", titulo: "Auxiliar Administrativo", cargo: "Auxiliar Administrativo", area: "Administrativo", cidade: "Curitiba", uf: "PR", contrato: "CLT", salario: "R$ 2.100,00", periodo: "Mensal", situacao: "A", divulga: true, cadastro: "28/10/2026", candidatos: 64, contratados: [1, 3] },
  { ...base, id: 103, referencia: "VG-0103", titulo: "Gerente de Loja", cargo: "Gerente Comercial", area: "Comercial", cidade: "Joinville", uf: "SC", contrato: "CLT", salario: "R$ 8.000,00", periodo: "Mensal", situacao: "A", divulga: true, cadastro: "20/10/2026", candidatos: 22 },
  { ...base, id: 102, referencia: "VG-0102", titulo: "Desenvolvedor(a) Full Stack", cargo: "Desenvolvedor", area: "Tecnologia", cidade: "Florianópolis", uf: "SC", contrato: "PJ", homeOffice: true, situacao: "A", divulga: true, cadastro: "15/10/2026", candidatos: 73, contratados: [0, 2] },
  { ...base, id: 101, referencia: "VG-0101", titulo: "Analista de Recursos Humanos Pleno", cargo: "Analista de RH", area: "Recursos Humanos", cidade: "Curitiba", uf: "PR", contrato: "CLT", salario: "R$ 5.200,00", periodo: "Mensal", situacao: "A", divulga: true, cadastro: "08/10/2026", candidatos: 105 },
  { ...base, id: 100, referencia: "VG-0100", titulo: "Vendedor(a) Externo", cargo: "Vendedor", area: "Comercial", cidade: "Maringá", uf: "PR", contrato: "CLT", salario: "R$ 2.400,00", periodo: "Mensal", situacao: "S", divulga: false, cadastro: "01/09/2026", candidatos: 12 },
];

// Mesma regra da API de vagas: situação Aberta e divulgada.
export const podeDestacar = (v: Vaga) => v.situacao === "A" && v.divulga;
export const VAGAS: Vaga[] = VAGAS_RS.filter(podeDestacar);

// Regra do recurso: no máximo 3 vagas em destaque, escolhidas pelo recrutador e exibidas na ordem definida.
export const MAX_DESTAQUES = 3;
export const DESTAQUES_PADRAO: number[] = [102, 103, 101];

// Vagas em destaque válidas: só as que ainda estão na lista pública, na ordem escolhida, limitadas a 3.
export function vagasEmDestaque(ids: number[], vagas: Vaga[] = VAGAS): Vaga[] {
  return ids
    .map((id) => vagas.find((v) => v.id === id))
    .filter((v): v is Vaga => v !== undefined)
    .slice(0, MAX_DESTAQUES);
}

// Marca/desmarca uma vaga respeitando o limite: com 3 escolhidas, novas marcações são ignoradas.
export function alternarDestaque(ids: number[], id: number): number[] {
  if (ids.includes(id)) return ids.filter((x) => x !== id);
  return ids.length >= MAX_DESTAQUES ? ids : [...ids, id];
}

// Move uma vaga uma posição para cima (-1) ou para baixo (+1) na ordem dos destaques.
export function moverDestaque(ids: number[], id: number, dir: -1 | 1): number[] {
  const i = ids.indexOf(id);
  return i < 0 ? ids : moverPara(ids, i, i + dir);
}

// Move o item da posição `de` para a posição `para` (usado no arrastar e soltar).
export function moverPara<T>(lista: T[], de: number, para: number): T[] {
  if (de === para || de < 0 || para < 0 || de >= lista.length || para >= lista.length) return lista;
  const next = [...lista];
  const [item] = next.splice(de, 1);
  next.splice(para, 0, item!);
  return next;
}

export const local = (v: Vaga) => `${v.cidade}-${v.uf}`;
export const salario = (v: Vaga, comPeriodo = false) =>
  v.salario ? `${v.salario}${comPeriodo && v.periodo ? ` - ${v.periodo}` : ""}` : "A combinar";
