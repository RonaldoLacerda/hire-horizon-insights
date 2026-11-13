import { createFileRoute } from "@tanstack/react-router";
import { Controles } from "@/components/api-vagas/controles";
import { VAGAS, vagasEmDestaque } from "@/components/api-vagas/data";
import { Modelo1 } from "@/components/api-vagas/modelo1";
import { Modelo2 } from "@/components/api-vagas/modelo2";
import { Modelo3 } from "@/components/api-vagas/modelo3";
import { Modelo4 } from "@/components/api-vagas/modelo4";
import { useDestaques } from "@/components/api-vagas/store";

export const Route = createFileRoute("/api-vagas")({
  head: () => ({
    meta: [
      { title: "API de Vagas · Vagas em destaque" },
      { name: "description", content: "Protótipo das páginas públicas de vagas do RHBot com o recurso de vagas em destaque." },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;700&family=Nunito+Sans:wght@300;400;700&family=Poppins:wght@400;500;600;700&family=Work+Sans:wght@300;400;700&display=swap",
      },
    ],
  }),
  component: ApiVagas,
});

const modelos = { 1: Modelo1, 2: Modelo2, 3: Modelo3 } as const;

// Página pública: lê o que foi publicado em Configurações, na aba Vagas e no editor do modelo 4.
function ApiVagas() {
  const { modelo, habilitado, ids, v4 } = useDestaques();
  const destaques = habilitado ? vagasEmDestaque(ids) : [];
  const destaqueIds = habilitado ? ids : [];
  return (
    <div className="min-h-screen pb-24">
      {modelo === 4 ? (
        <Modelo4 vagas={VAGAS} destaques={destaques} destaqueIds={destaqueIds} v4={v4} />
      ) : (
        (() => {
          const Pagina = modelos[modelo];
          return <Pagina key={modelo} vagas={VAGAS} destaques={destaques} destaqueIds={destaqueIds} />;
        })()
      )}
      <Controles />
    </div>
  );
}
