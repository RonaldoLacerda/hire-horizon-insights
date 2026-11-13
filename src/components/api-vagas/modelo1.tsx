// Modelo 1 (RHBot: resources/views/vagas/API_1). Nunito, header transparente sobre o topo,
// lista em linhas sem caixa, faixa de chamada colorida e rodapé escuro.
import { ArrowRight, Facebook, Instagram, Linkedin, MapPin } from "lucide-react";
import { COR, EMPRESA, local, salario } from "./data";
import { FontWrap, Logo, MarcaDestaque, Pcd, SeloDestaque, heroBg, styleApi, type ModeloProps } from "./shared";

const input = "h-[50px] w-full rounded-[.3rem] border-0 bg-white px-3 text-sm text-[#495057]";

export function Modelo1({ vagas, destaques, destaqueIds }: ModeloProps) {
  return (
    <FontWrap font="'Nunito', sans-serif" className="bg-white text-[#7f848c]">
      <section className="relative flex min-h-[590px] h-[100svh] max-h-[860px] items-center justify-center" style={heroBg}>
        <div className="absolute inset-0 bg-black/50" />
        <header className="absolute inset-x-0 top-4 z-10 flex items-center justify-between px-[5%] md:top-12">
          <Logo />
          <nav className="hidden gap-2 xl:flex">
            <a className="p-5 text-white">Lista de Vagas</a>
            <a className="p-5 text-white/50">Sobre</a>
          </nav>
          <div className="flex gap-2">
            <button className="rounded px-4 py-2 text-sm font-bold" style={styleApi}>Empresa</button>
            <button className="rounded px-4 py-2 text-sm font-bold" style={styleApi}>Candidato</button>
          </div>
        </header>
        <div className="relative z-10 mt-[110px] w-full max-w-5xl px-4 text-center">
          <h1 className="text-[2rem] font-bold text-white lg:text-[3rem]">{EMPRESA.titulo}</h1>
          <p className="mb-8 text-[1.2rem] text-white">{EMPRESA.descricao}</p>
          <form className="grid gap-3 lg:grid-cols-12" onSubmit={(e) => e.preventDefault()}>
            <input className={`${input} lg:col-span-12`} placeholder="Título da Vaga, Empresa ou Palavra-Chave" />
            <select className={`${input} lg:col-span-3`}><option>Áreas (Todas)</option></select>
            <select className={`${input} lg:col-span-3`}><option>Localidade (Todas)</option></select>
            <select className={`${input} lg:col-span-3`}><option>Contratos (Todos)</option></select>
            <button className="h-[50px] rounded-[.3rem] text-lg font-bold lg:col-span-3" style={styleApi}>Filtrar</button>
          </form>
        </div>
      </section>

      {destaques.length > 0 && (
        <section id="vagas-destaque" className="bg-[#f5f6f8] py-12 lg:py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-8 text-center">
              <SeloDestaque className="text-xs" style={{ color: COR.fundo }} />
              <h2 className="mt-1 text-[2rem] font-bold text-black">Vagas em Destaque</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {destaques.map((v) => (
                <a key={v.id} className="group flex flex-col rounded-[.3rem] border-t-4 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg" style={{ borderTopColor: COR.fundo }}>
                  <span className="mb-3 self-start rounded-[.25rem] px-2 py-1 text-[75%] font-bold" style={styleApi}>{v.contrato}</span>
                  <h3 className="text-[1.2rem] font-bold leading-snug" style={{ color: COR.tituloVagaModelo1 }}>{v.titulo}{v.pcd && <Pcd />}</h3>
                  <p className="mt-3 flex items-center gap-1.5 text-black"><MapPin className="h-4 w-4" />{local(v)}</p>
                  <p className="mt-1 font-bold text-black">{salario(v, true)}</p>
                  <p className="mt-1 text-sm">Código da Vaga: {v.referencia}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold group-hover:underline" style={{ color: COR.tituloVagaModelo1 }}>Ver vaga <ArrowRight className="h-4 w-4" /></span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="lista_vagas" className="py-12 lg:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-10 text-center text-[2rem] font-bold text-black">Lista de Vagas</h2>
          {vagas.map((v) => (
            <div key={v.id} className="grid gap-x-6 gap-y-1 border-b border-[#dee2e6] pb-3 pt-3 md:grid-cols-12">
              <div className="md:col-span-6">
                <span className="mb-3 inline-block rounded-[.25rem] px-2 py-1 text-[75%] font-bold" style={styleApi}>{v.contrato}</span>
                {destaqueIds.includes(v.id) && <MarcaDestaque className="ml-2" />}
                <h2 className="text-[1.2rem]" style={{ color: COR.tituloVagaModelo1 }}><a className="cursor-pointer hover:underline">{v.titulo}</a>{v.pcd && <Pcd />}</h2>
              </div>
              <h3 className="text-[1.2rem] text-black md:col-span-3 md:pt-8">{local(v)}</h3>
              <strong className="text-black md:col-span-3 md:pt-8 md:text-right">{salario(v, true)}</strong>
              <p className="md:col-span-3">Código da Vaga: {v.referencia}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 text-center" style={{ backgroundColor: COR.fundo }}>
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 md:flex-row md:text-left">
          <div>
            <h2 className="text-2xl font-bold text-white">Procurando uma vaga de emprego?</h2>
            <p className="text-lg text-white">Cadastre seu currículo</p>
          </div>
          <button className="rounded px-10 py-3 text-lg text-white" style={{ background: "#242424" }}>Cadastrar</button>
        </div>
      </section>
      <Rodape13 />
    </FontWrap>
  );
}

// Rodapé dos modelos 1 e 3 (mesma lógica no RHBot).
export function Rodape13({ circulos = true }: { circulos?: boolean }) {
  return (
    <footer className="py-12 text-[#7f848c]" style={{ backgroundColor: COR.rodape }}>
      <div className="mx-auto grid max-w-5xl gap-8 px-4 text-sm md:grid-cols-3">
        <div><h3 className="mb-4 text-lg text-white">Mapa do Site</h3><p>Vagas</p><p>Sobre</p><p>Candidato</p></div>
        <div><h3 className="mb-4 text-lg text-white">Entre em Contato</h3><p>{EMPRESA.endereco}</p><p>{EMPRESA.telefone}</p><p>{EMPRESA.email}</p></div>
        <div>
          <h3 className="mb-4 text-lg text-white">Redes Sociais</h3>
          <div className={circulos ? "flex gap-2" : "space-y-1"}>
            {[{ i: Facebook, n: "Facebook" }, { i: Instagram, n: "Instagram" }, { i: Linkedin, n: "LinkedIn" }].map(({ i: I, n }) =>
              circulos
                ? <span key={n} className="grid h-10 w-10 place-items-center rounded-full text-white" style={{ backgroundColor: COR.fundo }}><I className="h-4 w-4" /></span>
                : <p key={n} className="flex items-center gap-2"><I className="h-4 w-4" />{n}</p>,
            )}
          </div>
        </div>
      </div>
      <p className="mt-10 text-center text-xs">by RHbot</p>
    </footer>
  );
}
