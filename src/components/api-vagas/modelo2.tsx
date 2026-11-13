// Modelo 2 (RHBot: resources/views/vagas/API_2). Work Sans, header branco fixo, topo alinhado à
// esquerda, lista em caixa com faixa azul de 3px à esquerda e contrato em contorno à direita.
import { Briefcase, DollarSign, Facebook, Hash, Instagram, Linkedin, MapPin, Plus } from "lucide-react";
import { COR, EMPRESA, local, salario } from "./data";
import { FontWrap, Logo, MarcaDestaque, Pcd, SeloDestaque, heroBg, styleApi, type ModeloProps } from "./shared";

const field = "h-[55px] w-full border-0 bg-white px-6 text-sm text-[#495057]";

export function Modelo2({ vagas, destaques, destaqueIds }: ModeloProps) {
  return (
    <FontWrap font="'Work Sans', sans-serif" className="bg-white text-black/50">
      <header className="sticky top-0 z-20 bg-white py-5 shadow-[0_0_30px_-5px_rgba(0,0,0,.1)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
          <Logo dark />
          <nav className="flex items-center gap-2 text-[15px] sm:gap-4 uppercase tracking-[.05em] text-black/60">
            <a className="hidden lg:inline">Lista de Vagas</a>
            <a className="hidden lg:inline">Sobre</a>
            {["Empresa", "Candidato"].map((t) => (
              <span key={t} className={`items-center gap-1 rounded px-3 py-2 text-sm normal-case sm:px-4 sm:py-3 ${t === "Empresa" ? "hidden sm:flex" : "flex"}`} style={styleApi}><Plus className="h-3.5 w-3.5" />{t}</span>
            ))}
          </nav>
        </div>
      </header>

      <section className="relative flex min-h-[600px] items-center" style={heroBg}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative mx-auto w-full max-w-6xl px-4">
          <h1 className="text-[2rem] font-bold text-white md:text-[4rem] md:font-light">{EMPRESA.titulo}</h1>
          <p className="mb-8 text-white/70">{EMPRESA.descricao}</p>
          <form className="grid gap-2 md:grid-cols-12" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-2 md:col-span-10 md:grid-cols-12">
              <input className={`${field} md:col-span-6`} placeholder="Título da Vaga, Empresa ou Palavra-Chave" />
              <select className={`${field} md:col-span-3`}><option>Áreas (Todas)</option></select>
              <select className={`${field} md:col-span-3`}><option>Localidade (Todas)</option></select>
            </div>
            <button className="h-[55px] rounded md:col-span-2" style={styleApi}>Filtrar</button>
          </form>
        </div>
      </section>

      <section id="lista_vagas" className="bg-[#f8f9fa] py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          {destaques.length > 0 && (
            <div id="vagas-destaque" className="mb-14">
              <div className="flex items-center gap-3">
                <h2 className="text-[1.75rem] text-black">Vagas em Destaque</h2>
                <SeloDestaque className="rounded px-2 py-1 text-[10px]" style={styleApi} />
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {destaques.map((v) => (
                  <a key={v.id} className="flex cursor-pointer flex-col rounded border border-[#dee2e6] border-l-[3px] bg-white p-5 transition-shadow hover:shadow-[4px_0_40px_0_rgba(0,0,0,.1)]" style={{ borderLeftColor: COR.fundo }}>
                    <span className="mb-3 self-start rounded border p-1.5 text-xs" style={{ color: COR.fundo, borderColor: COR.fundo }}>{v.contrato}</span>
                    <h3 className="text-[17px] text-black">{v.titulo}{v.pcd && <Pcd />}</h3>
                    <small className="mt-1">{v.area}</small>
                    <div className="mt-4 space-y-1.5 text-sm">
                      <p className="flex items-center gap-2"><MapPin className="h-4 w-4" />{local(v)}</p>
                      <p className="flex items-center gap-2"><DollarSign className="h-4 w-4" />{salario(v)}</p>
                      <p className="flex items-center gap-2"><Hash className="h-4 w-4" />Código da Vaga {v.referencia}</p>
                    </div>
                    <span className="mt-5 rounded py-2.5 text-center text-sm" style={styleApi}>Ver vaga</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          <h2 className="text-[1.75rem] text-black">Lista de Vagas</h2>
          <div className="mt-5 overflow-hidden rounded border border-[#dee2e6]">
            {vagas.map((v) => (
              <a key={v.id} className="flex cursor-pointer flex-col items-center border-b border-l-[3px] border-b-[#ced4da] border-l-[#26baee] bg-white transition-shadow hover:shadow-[4px_0_40px_0_rgba(0,0,0,.1)] md:flex-row">
                <div className="w-full p-4 text-center xl:w-[calc(100%-250px)] xl:text-left">
                  <h3 className="text-[17px] text-black">{v.titulo}{v.pcd && <Pcd />}{destaqueIds.includes(v.id) && <MarcaDestaque className="ml-2 align-middle" />}</h3>
                  <div className="mt-1 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm xl:justify-start">
                    <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" />{EMPRESA.nome}</span>
                    <span className="flex items-center gap-1"><Hash className="h-3.5 w-3.5" />Código da Vaga {v.referencia}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{local(v)}</span>
                    <span className="flex items-center gap-1"><DollarSign className="h-3.5 w-3.5" />{salario(v)}</span>
                    <small className="ml-4">{v.area}</small>
                  </div>
                </div>
                <div className="flex shrink-0 basis-[150px] justify-center pb-4 md:pb-0">
                  <span className="rounded border border-[#26baee] p-2 text-sm text-[#26baee]">{v.contrato}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="relative flex min-h-[400px] items-center justify-center text-center" style={heroBg}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative">
          <h1 className="text-2xl font-bold text-white">Encontre uma oportunidade</h1>
          <p className="mb-6 text-2xl text-white">Cadastre seu currículo</p>
          <button className="rounded px-6 py-4" style={styleApi}>Cadastrar currículo</button>
        </div>
      </section>

      <footer className="py-12 text-[#7f848c]" style={{ backgroundColor: COR.rodape }}>
        <div className="mx-auto grid max-w-6xl gap-8 px-4 text-sm md:grid-cols-4">
          <div><h3 className="mb-4 text-xl text-white">Sobre</h3><p className="mb-4">Somos uma empresa que acredita em pessoas.</p><button className="rounded-[30px] px-5 py-2 text-white" style={{ backgroundColor: "#28a745" }}>Veja Mais</button></div>
          <div><h3 className="mb-4 text-xl text-white">Mapa do Site</h3><p>Vagas</p><p>Sobre</p><p>Candidato</p></div>
          <div><h3 className="mb-4 text-xl text-white">Entre em Contato</h3><p>{EMPRESA.endereco}</p><p>{EMPRESA.telefone}</p><p>{EMPRESA.email}</p></div>
          <div><h3 className="mb-4 text-xl text-white">Redes Sociais</h3>
            {[{ i: Facebook, n: "Facebook" }, { i: Instagram, n: "Instagram" }, { i: Linkedin, n: "LinkedIn" }].map(({ i: I, n }) => <p key={n} className="flex items-center gap-2"><I className="h-4 w-4" />{n}</p>)}
          </div>
        </div>
        <p className="mt-10 text-center text-xs">by RHbot</p>
      </footer>
    </FontWrap>
  );
}
