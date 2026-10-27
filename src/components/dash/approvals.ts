// Pendências demonstrativas; não representam solicitações reais.
export type PendingApproval = {
  id: string;
  kind: "vaga" | "empresa";
  name: string;
  org: string;
  sentAt: string;
};

export const pendingApprovals: PendingApproval[] = [
  { id: "vaga-1", kind: "vaga", name: "Auxiliar Administrativo", org: "Banco Horizonte", sentAt: "22/10/2026" },
  { id: "vaga-2", kind: "vaga", name: "Estoquista", org: "Varejo Bom Preço", sentAt: "21/10/2026" },
  { id: "empresa-1", kind: "empresa", name: "Clínica Vida Plena", org: "Saúde", sentAt: "22/10/2026" },
];

export const pendingCounts = {
  vagas: pendingApprovals.filter((p) => p.kind === "vaga").length,
  empresas: pendingApprovals.filter((p) => p.kind === "empresa").length,
  total: pendingApprovals.length,
};

export function pendingSummary(items: PendingApproval[] = pendingApprovals): string {
  const vagas = items.filter((p) => p.kind === "vaga").length;
  const empresas = items.filter((p) => p.kind === "empresa").length;
  const parts: string[] = [];
  if (vagas > 0) {
    parts.push(`${vagas} ${vagas === 1 ? "vaga" : "vagas"}`);
  }
  if (empresas > 0) {
    parts.push(
      `${empresas} ${empresas === 1 ? "empresa" : "empresas"}`,
    );
  }
  return parts.join(" e ");
}

export function approvalsForTab(tab: string, items: PendingApproval[] = pendingApprovals) {
  const kind = tab === "vagas" ? "vaga" : tab === "empresas" ? "empresa" : undefined;
  return kind ? items.filter((item) => item.kind === kind) : [];
}
