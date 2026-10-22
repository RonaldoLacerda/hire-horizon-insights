// Fonte única de "aguardando aprovação" para o painel.
// Em produção, viria das APIs de vagas e de empresas.
export type PendingApproval = {
  id: string;
  kind: "vaga" | "empresa";
  name: string;
  org: string;
  sentAt: string;
};

export const pendingApprovals: PendingApproval[] = [
  { id: "v-1", kind: "vaga", name: "Auxiliar Administrativo", org: "Banco Horizonte", sentAt: "21/10/2026" },
  { id: "v-2", kind: "vaga", name: "Estoquista", org: "Varejo Bom Preço", sentAt: "20/10/2026" },
  { id: "e-1", kind: "empresa", name: "Clínica Vida Plena", org: "Saúde", sentAt: "19/10/2026" },
];

export const pendingCounts = {
  vagas: pendingApprovals.filter((p) => p.kind === "vaga").length,
  empresas: pendingApprovals.filter((p) => p.kind === "empresa").length,
  total: pendingApprovals.length,
};

// Frase do aviso: vazio quando não há nada pendente (aí o aviso some).
export function pendingSummary(): string {
  const parts: string[] = [];
  if (pendingCounts.vagas > 0) {
    parts.push(`${pendingCounts.vagas} ${pendingCounts.vagas === 1 ? "vaga" : "vagas"} de empresa parceira`);
  }
  if (pendingCounts.empresas > 0) {
    parts.push(
      `${pendingCounts.empresas} ${pendingCounts.empresas === 1 ? "empresa parceira" : "empresas parceiras"}`,
    );
  }
  return parts.join(" e ");
}
