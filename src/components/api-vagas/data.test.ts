import { describe, expect, it } from "vitest";
import { VAGAS, VAGAS_RS, alternarDestaque, moverDestaque, moverPara, podeDestacar, vagasEmDestaque } from "./data";

describe("vagas em destaque", () => {
  it("mantém a ordem escolhida e limita a 3", () => {
    expect(vagasEmDestaque([103, 101, 102, 104]).map((v) => v.id)).toEqual([103, 101, 102]);
  });

  it("ignora vagas que saíram da lista pública (encerradas ou não divulgadas)", () => {
    const abertas = VAGAS.filter((v) => v.id !== 101);
    expect(vagasEmDestaque([101, 102], abertas).map((v) => v.id)).toEqual([102]);
  });

  it("não deixa marcar uma quarta vaga e permite desmarcar", () => {
    expect(alternarDestaque([1, 2, 3], 4)).toEqual([1, 2, 3]);
    expect(alternarDestaque([1, 2, 3], 2)).toEqual([1, 3]);
    expect(alternarDestaque([1], 5)).toEqual([1, 5]);
  });

  it("reordena sem sair dos limites", () => {
    expect(moverDestaque([1, 2, 3], 3, -1)).toEqual([1, 3, 2]);
    expect(moverDestaque([1, 2, 3], 1, -1)).toEqual([1, 2, 3]);
  });
});

describe("arrastar e soltar", () => {
  it("move o item para a posição de destino", () => {
    expect(moverPara(["a", "b", "c"], 0, 2)).toEqual(["b", "c", "a"]);
    expect(moverPara(["a", "b", "c"], 2, 0)).toEqual(["c", "a", "b"]);
    expect(moverPara(["a", "b"], 0, 5)).toEqual(["a", "b"]);
  });

  it("só permite destacar vagas abertas e divulgadas", () => {
    expect(VAGAS_RS.filter((v) => !podeDestacar(v)).map((v) => v.id).sort()).toEqual([100, 110, 111]);
  });
});
