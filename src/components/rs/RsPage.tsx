// Moldura das telas internas do R&S no protótipo: header do sistema + conteúdo + aviso de protótipo.
import type { ReactNode } from "react";
import { SystemHeader } from "@/components/system/SystemHeader";

export function RsPage({ ativo, titulo, children }: { ativo: "vagas" | "config"; titulo: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#fafafa] pb-16">
      <SystemHeader ativo={ativo} />
      <main className="mx-auto mt-4 max-w-[1600px] px-3 sm:px-4">
        <p className="mb-3 text-overline text-muted-foreground">Recrutamento e Seleção · {titulo} · Protótipo com dados demonstrativos</p>
        {children}
      </main>
    </div>
  );
}
