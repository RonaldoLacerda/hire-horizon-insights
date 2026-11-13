import { createFileRoute } from "@tanstack/react-router";
import { EditorV4 } from "@/components/rs/editor-v4";
import { RsPage } from "@/components/rs/RsPage";

export const Route = createFileRoute("/configuracoes/editor-v4")({
  head: () => ({
    meta: [{ title: "Personalizar modelo 4 · API de Vagas" }],
    links: [{ rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" }],
  }),
  component: () => (
    <RsPage ativo="config" titulo="Configurações › API de Vagas › Personalizar modelo 4">
      <EditorV4 />
    </RsPage>
  ),
});
