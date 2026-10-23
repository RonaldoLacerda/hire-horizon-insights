import { describe, expect, it } from "vitest";
import { approvalsForTab, pendingApprovals, pendingSummary } from "./approvals";

describe("Visibilidade de aprovações", () => {
  it("não exibe pendências em Candidatos", () => {
    expect(approvalsForTab("candidatos", pendingApprovals)).toEqual([]);
  });
  it("não exibe pendências em Processos", () => {
    expect(approvalsForTab("processos", pendingApprovals)).toEqual([]);
  });
  it("exibe somente as duas vagas pendentes em Vagas", () => {
    expect(approvalsForTab("vagas").map((item) => item.id)).toEqual(["vaga-1", "vaga-2"]);
  });
  it("exibe somente a empresa pendente em Empresas", () => {
    expect(approvalsForTab("empresas").map((item) => item.id)).toEqual(["empresa-1"]);
  });
  it("não produz aviso quando não existem pendências", () => {
    expect(pendingSummary(approvalsForTab("vagas", []))).toBe("");
    expect(pendingSummary(approvalsForTab("empresas", []))).toBe("");
  });
});