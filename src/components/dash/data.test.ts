import { describe, expect, it } from "vitest";
import { contratadosFaixa, contratadosGenero, contratadosPcd, contratadosPorTipo, contratadosRaca, gruposCandidatos, interesseVsVagas, tempoContratacao, vagasPorSla } from "./data";

const total = (items: { value: number }[]) => items.reduce((sum, item) => sum + item.value, 0);
const media = (values: number[]) => values.reduce((sum, value) => sum + value, 0) / values.length;

describe("Indicadores demonstrativos", () => {
  it("distribui todos os 773 candidatos entre os grupos", () => {
    expect(gruposCandidatos.map(({ name }) => name)).toEqual([
      "Padrão",
      "Estagiário",
      "Jovem Aprendiz",
      "PCD",
    ]);
    expect(gruposCandidatos.map(({ value }) => value)).toEqual([521, 180, 20, 52]);
    expect(total(gruposCandidatos)).toBe(773);
  });

  it("separa as 214 vagas ativas dentro e fora do SLA", () => {
    expect(total(vagasPorSla)).toBe(214);
  });

  it("distribui as 105 contratações por tipo de vaga", () => {
    expect(total(contratadosPorTipo)).toBe(105);
  });

  it("distribui as 105 contratações por gênero, raça/cor, faixa etária e PcD", () => {
    for (const perfil of [contratadosGenero, contratadosRaca, contratadosFaixa, contratadosPcd]) expect(total(perfil)).toBe(105);
  });

  it("compara o interesse dos 773 candidatos com as 214 vagas abertas", () => {
    expect(total(interesseVsVagas.map((a) => ({ value: a.candidatos })))).toBe(773);
    expect(total(interesseVsVagas.map((a) => ({ value: a.vagas })))).toBe(214);
  });

  it("mantém as médias de tempo até a contratação exibidas nos indicadores", () => {
    expect(media(tempoContratacao.map((m) => m.vaga))).toBe(19);
    expect(media(tempoContratacao.map((m) => m.candidato))).toBe(15);
  });
});
