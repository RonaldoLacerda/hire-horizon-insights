// Modelo 4 (RHBot: resources/views/vagas/home_v4 + api_vagas4/previews). Poppins, uma cor configurável
// (--cor-empresa), seções reordenáveis no editor. "Vagas em destaque" é uma seção como as outras:
// pode ser arrastada, ocultada e ter título, descrição, selo e estilo editados.
import type { CSSProperties, ReactNode } from "react";
import { ArrowRight, Briefcase, Building2, ChevronDown, DollarSign, Mail, Filter, Home, Layers, MapPin, Phone, Search, Star, Target, Eye } from "lucide-react";
import { COR, EMPRESA, local, salario, type Vaga } from "./data";
import { FontWrap, Logo, MarcaDestaque, Pcd, heroBg, type ModeloProps } from "./shared";
import { ESTADO_PADRAO, type EstadoDestaques, type SecaoV4 } from "./store";

const corEmpresa = { "--cor-empresa": COR.fundo } as CSSProperties;

function Info({ v }: { v: Vaga }) {
  const item = "flex items-center gap-2 text-sm text-[#6b7280] [&>svg]:h-4 [&>svg]:w-4 [&>svg]:shrink-0 [&>svg]:text-[var(--cor-empresa)]";
  return (
    <div className="mb-auto flex flex-col gap-3">
      <p className={item}><MapPin />{local(v).replace("-", " - ")}</p>
      {v.homeOffice && <p className={item}><Home />Home Office</p>}
      <p className={item}><Briefcase />{v.contrato}</p>
      <p className={item}><Layers />{v.area}</p>
      <p className={item}><Building2 />{EMPRESA.nome}</p>
      <p className={item}><DollarSign />{salario(v)}</p>
    </div>
  );
}

function Titulo({ v, extra, className = "" }: { v: Vaga; extra?: ReactNode; className?: string }) {
  return (
    <h4 className={`mb-4 line-clamp-2 text-[22px] font-semibold leading-normal transition-colors group-hover:text-[var(--cor-empresa)] ${className || "text-[#212529]"}`}>
      {v.titulo}{v.pcd && <Pcd />}{extra}
    </h4>
  );
}

type SecaoProps = { vagas: Vaga[]; destaques: Vaga[]; destaqueIds: number[]; cfg: EstadoDestaques["v4"]; fundo: string };

function SecaoDestaques({ destaques, cfg, fundo }: SecaoProps) {
  if (destaques.length === 0) return null;
  const fundoCor = cfg.estilo === "fundo";
  const card =
    cfg.estilo === "borda" ? "border-2 border-[var(--cor-empresa)] bg-white shadow-[0_8px_24px_-12px_rgba(0,0,0,.25)]"
    : fundoCor ? "border border-transparent bg-[var(--cor-empresa)] text-white shadow-[0_8px_24px_-12px_rgba(0,0,0,.35)]"
    : "border border-[#f3f4f6] bg-white";
  return (
    <section id="vagas-destaque" className={`${fundo} py-16`}>
      <div className="mx-auto max-w-[1280px] px-4">
        <div className="mb-8 text-center">
          <h2 className="text-[28px] font-semibold">{cfg.titulo}</h2>
          {cfg.descricao && <p className="mx-auto mt-2 max-w-2xl text-[#6b7280]">{cfg.descricao}</p>}
        </div>
        <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {destaques.map((v) => (
            <a key={v.id} className={`group relative flex min-h-[340px] cursor-pointer flex-col rounded-lg p-6 transition-all hover:-translate-y-1 hover:shadow-[0_14px_30px_-12px_rgba(0,0,0,.3)] ${card}`}>
              {cfg.selo && (
                <span className={`absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${fundoCor ? "bg-white text-[var(--cor-empresa)] shadow" : "bg-[var(--cor-empresa)] text-white"}`}>
                  <Star className="h-3 w-3 fill-current" /> {cfg.selo}
                </span>
              )}
              <Titulo v={v} className={fundoCor ? "text-white group-hover:!text-white" : ""} />
              <div className={fundoCor ? "[&_p]:!text-white/85 [&_svg]:!text-white" : ""}><Info v={v} /></div>
              <span className={`mt-4 w-full rounded-md py-3 text-center font-medium group-hover:opacity-90 ${fundoCor ? "bg-white text-[var(--cor-empresa)]" : "bg-[var(--cor-empresa)] text-white"}`}>Ver detalhes</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function SecaoSobre({ fundo }: SecaoProps) {
  return (
    <section id="preview-sobre" className={`${fundo} py-16`}>
      <div className="mx-auto max-w-[1280px] px-4">
        <h2 className="mb-10 text-center text-[28px] font-semibold">Sobre nós</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {[{ i: Target, t: "Nossa missão", d: "Gerar oportunidades e desenvolver pessoas em todas as regiões onde atuamos." }, { i: Eye, t: "Nossa visão", d: "Ser reconhecida como a melhor empresa para trabalhar no Sul do Brasil." }].map(({ i: I, t, d }) => (
            <div key={t} className="flex gap-4 rounded-lg border border-[#f0f0f0] bg-white p-6">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-[var(--cor-empresa)] text-white"><I className="h-6 w-6" /></span>
              <div><h3 className="text-[1.3rem] font-medium">{t}</h3><p className="mt-1 text-[#6c757d]">{d}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SecaoVagas({ vagas, destaqueIds, fundo }: SecaoProps) {
  return (
    <section id="preview-vagas" className={`${fundo} py-16`}>
      <div className="mx-auto max-w-[1280px] px-4">
        <h2 className="text-center text-[28px] font-semibold">Vagas disponíveis</h2>
        <div className="mx-auto mt-6 flex max-w-2xl gap-3">
          <div className="flex flex-1 overflow-hidden rounded-lg border border-[#e5e7eb] bg-white">
            <input className="min-w-0 flex-1 px-4 py-3 text-sm placeholder:text-[#9ca3af]" placeholder="Buscar por título, empresa ou palavra-chave" />
            <button className="bg-[#f3f4f6] px-4 text-[#6b7280]"><Search className="h-4 w-4" /></button>
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-4 text-sm"><Filter className="h-4 w-4" />Filtros</button>
        </div>
        <p className="my-6 text-center text-[#6b7280]"><strong>{vagas.length}</strong> vagas disponíveis</p>
        <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {vagas.slice(0, 6).map((v) => (
            <a key={v.id} className="group flex min-h-[280px] cursor-pointer flex-col rounded-lg border border-[#f3f4f6] bg-white p-5 transition-all duration-300 hover:shadow-[0_4px_6px_rgba(0,0,0,.1)] md:min-h-[320px] md:p-6">
              <Titulo v={v} extra={destaqueIds.includes(v.id) && <MarcaDestaque className="ml-2 align-middle" />} />
              <Info v={v} />
              <span className="mt-4 w-full rounded-md bg-[var(--cor-empresa)] py-3 text-center font-medium text-white group-hover:opacity-90">Ver detalhes</span>
            </a>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a className="group inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#f3f4f6] px-8 py-3 text-[#374151] hover:text-[var(--cor-empresa)]">Ver todas as vagas <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></a>
        </div>
      </div>
    </section>
  );
}

function SecaoChamada() {
  return (
    <section className="bg-[var(--cor-empresa)] py-24 text-center text-white">
      <h2 className="text-[28px] font-semibold">Não encontrou a vaga ideal?</h2>
      <button className="mt-6 rounded-lg bg-white px-8 py-3 text-[#212529]">Cadastrar currículo</button>
    </section>
  );
}

const SECOES: Record<SecaoV4, (p: SecaoProps) => ReactNode> = {
  destaques: SecaoDestaques,
  sobre: SecaoSobre,
  vagas: SecaoVagas,
  chamada: SecaoChamada,
};

export function Modelo4({ vagas, destaques, destaqueIds, v4 = ESTADO_PADRAO.v4 }: ModeloProps & { v4?: EstadoDestaques["v4"] }) {
  // Como no home_v4: fundos alternam branco / #f7f9fb entre as seções exibidas (a chamada tem cor própria).
  const exibidas = v4.ordem.filter((s) => v4.visivel[s] && (s !== "destaques" || destaques.length > 0));
  let alterna = 0;
  return (
    <FontWrap font="'Poppins', sans-serif" className="bg-white text-[#212529]">
      <div style={corEmpresa}>
        <section className="relative flex h-[100svh] min-h-[560px] max-h-[860px] items-center justify-center text-center" style={heroBg}>
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-x-0 top-4 z-10 px-4">
            <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between rounded-lg bg-white px-4 shadow-[0_2px_8px_rgba(0,0,0,.1)] md:h-[4.5rem]">
              <Logo dark />
              <div className="flex gap-2 text-sm font-medium">
                <button className="hidden rounded-md bg-[#f3f4f6] px-5 py-2 text-[#374151] sm:block">Empresa</button>
                <button className="rounded-md bg-[var(--cor-empresa)] px-5 py-2 text-white">Candidato</button>
              </div>
            </div>
          </div>
          <div className="relative z-10 px-4">
            <h1 className="mx-auto max-w-2xl text-[28px] font-bold text-white sm:text-[42px] md:text-5xl">{EMPRESA.titulo}</h1>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-white">{EMPRESA.descricao}</p>
            <a href={exibidas.includes("destaques") ? "#vagas-destaque" : "#preview-vagas"} className="mt-8 inline-block rounded-lg bg-white px-8 py-4 font-medium text-[#1f2937] shadow-[0_4px_6px_rgba(0,0,0,.1)]">Vagas disponíveis</a>
          </div>
          <ChevronDown className="absolute bottom-20 left-1/2 h-6 w-6 -translate-x-1/2 text-white/60" />
        </section>

        {exibidas.map((s) => {
          const Secao = SECOES[s];
          const fundo = s === "chamada" ? "" : alterna++ % 2 === 0 ? "bg-white" : "bg-[#f7f9fb]";
          return <Secao key={s} vagas={vagas} destaques={destaques} destaqueIds={destaqueIds} cfg={v4} fundo={fundo} />;
        })}

        <footer className="bg-[#212529] py-16 text-sm text-white/70">
          <div className="mx-auto grid max-w-[1280px] gap-8 px-4 md:grid-cols-3">
            <div><Logo /><p className="mt-3">{EMPRESA.descricao}</p></div>
            <div><h4 className="mb-3 font-semibold text-white">Endereço</h4><p className="flex gap-2"><MapPin className="h-4 w-4 shrink-0" />{EMPRESA.endereco}</p></div>
            <div><h4 className="mb-3 font-semibold text-white">Contato</h4><p className="flex gap-2"><Mail className="h-4 w-4" />{EMPRESA.email}</p><p className="mt-1 flex gap-2"><Phone className="h-4 w-4" />{EMPRESA.telefone}</p></div>
          </div>
          <p className="mx-auto mt-10 max-w-[1280px] border-t border-white/20 px-4 pt-6 text-center">RHbot by Menvie</p>
        </footer>
      </div>
    </FontWrap>
  );
}
