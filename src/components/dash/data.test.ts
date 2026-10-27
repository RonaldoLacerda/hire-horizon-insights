import { describe, expect, it } from "vitest";
import { contratadosPorTipo, gruposCandidatos, vagasPorSla } from "./data";

const total = (items: { value: number }[]) => items.reduce((sum, item) => sum + item.value, 0);

describe("Indicadores demonstrativos", () => {
  it("distribui todos os 773 candidatos entre os grupos", () => {
    expect(gruposCandidatos.map(({ name }) => name)).toEqual([
      "Padrão",
      "Estagiário",
      "Jovem Aprendiz PCD",
    ]);
    expect(total(gruposCandidatos)).toBe(773);
  });

  it("separa as 214 vagas ativas dentro e fora do SLA", () => {
    expect(total(vagasPorSla)).toBe(214);
  });

  it("distribui as 105 contratações por tipo de vaga", () => {
    expect(total(contratadosPorTipo)).toBe(105);
  });
});
