import { createFileRoute } from "@tanstack/react-router";
import { RsPage } from "@/components/rs/RsPage";
import { VagasRS } from "@/components/rs/vagas";

export const Route = createFileRoute("/vagas")({
  head: () => ({ meta: [{ title: "Vagas · Recrutamento e Seleção" }] }),
  component: () => (
    <RsPage ativo="vagas" titulo="Vagas">
      <VagasRS />
    </RsPage>
  ),
});
