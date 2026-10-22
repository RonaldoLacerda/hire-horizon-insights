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
