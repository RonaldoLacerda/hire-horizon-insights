import { createFileRoute } from "@tanstack/react-router";
import { ConfigApiVagas } from "@/components/rs/config-api";
import { RsPage } from "@/components/rs/RsPage";

export const Route = createFileRoute("/configuracoes/api-vagas")({
  head: () => ({ meta: [{ title: "API de Vagas · Configurações" }] }),
  component: () => (
    <RsPage ativo="config" titulo="Configurações › API de Vagas">
      <ConfigApiVagas />
    </RsPage>
  ),
});
