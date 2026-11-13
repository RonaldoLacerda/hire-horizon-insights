// Modelo 3 (RHBot: resources/views/vagas/API_3). Nunito Sans, header branco estático, topo sem
// escurecimento com título preto grande, busca em aba e itens brancos que sobem no hover.
import { Briefcase, Code2, DollarSign, MapPin } from "lucide-react";
import { EMPRESA, local, salario } from "./data";
import { Rodape13 } from "./modelo1";
import { FontWrap, Logo, MarcaDestaque, Pcd, SeloDestaque, styleApi, type ModeloProps } from "./shared";

const field = "h-[47px] w-full rounded border border-[#ced4da] bg-white px-3 text-sm text-[#495057]";
const heroClaro = { backgroundImage: "linear-gradient(120deg, #e0f2f1 0%, #f8fafc 55%, #cbd5e1 100%)" };

function Meta({ v }: { v: Parameters<typeof local>[0] }) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
      <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" />{EMPRESA.nome}</span>
      <span className="flex items-center gap-1"><Code2 className="h-3.5 w-3.5" />Código da Vaga: {v.referencia}</span>
      <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{local(v)}</span>
      <span className="flex items-center gap-1"><DollarSign className="h-3.5 w-3.5" />{salario(v, true)}</span>
    </div>
  );
}

export function Modelo3({ vagas, destaques, destaqueIds }: ModeloProps) {
  return (
    <FontWrap font="'Nunito Sans', sans-serif" className="bg-white text-[#4d4d4d]">
      <header className="bg-white py-3">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
          <Logo dark />
          <nav className="flex items-center gap-5 text-black/60">
            <a className="hidden xl:inline">Lista de Vagas</a>
            <a className="hidden xl:inline">Sobre</a>
            <span className="rounded px-3 py-2 text-sm" style={styleApi}>Empresa</span>
            <span className="rounded px-3 py-2 text-sm" style={styleApi}>Candidato</span>
          </nav>
        </div>
      </header>

      <section className="flex min-h-[600px] items-center" style={heroClaro}>
        <div className="mx-auto w-full max-w-6xl px-4">
          <h1 className="text-[3rem] font-light leading-tight text-black md:text-[5rem]"><span className="font-bold">{EMPRESA.titulo}</span></h1>
          <small className="mb-10 block text-base text-[#4d4d4d]">{EMPRESA.descricao}</small>
          <span className="relative top-5 inline-block rounded-t px-6 py-3 text-[13px] font-bold uppercase tracking-[.1em]" style={styleApi}>Busca de Vagas</span>
          <form className="grid gap-3 rounded bg-white p-6 shadow-sm lg:grid-cols-12" onSubmit={(e) => e.preventDefault()}>
            <input className={`${field} lg:col-span-12`} placeholder="Título da Vaga, Empresa ou Palavra-Chave" />
            <select className={`${field} lg:col-span-3`}><option>Áreas (Todas)</option></select>
            <select className={`${field} lg:col-span-3`}><option>Localidade (Todas)</option></select>
            <select className={`${field} lg:col-span-3`}><option>Contratos (Todos)</option></select>
            <button className="h-[47px] rounded lg:col-span-3" style={styleApi}>Filtrar</button>
          </form>
        </div>
      </section>

      <section id="lista_vagas" className="bg-[#f8f9fa] py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4">
          {destaques.length > 0 && (
            <div id="vagas-destaque" className="mb-14">
              <h2 className="flex items-center gap-3 text-[2rem] font-bold text-black">Vagas em Destaque</h2>
              <div className="mt-6 grid gap-5 md:grid-cols-3">
                {destaques.map((v) => (
                  <div key={v.id} className="relative top-0 flex flex-col overflow-hidden bg-white p-6 transition-all duration-100 hover:-top-1.5 hover:shadow-[0_0_40px_-5px_rgba(0,0,0,.2)]">
                    <SeloDestaque className="absolute right-0 top-0 rounded-bl px-3 py-1 text-[10px]" style={styleApi} />
                    <span className="mb-3 self-start rounded-[30px] px-4 py-1.5 text-xs font-bold" style={styleApi}>{v.contrato}</span>
                    <h3 className="text-xl font-bold text-black">{v.titulo}{v.pcd && <Pcd />}</h3>
                    <div className="mb-5 mt-3 space-y-1 text-sm">
                      <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{local(v)}</p>
                      <p className="flex items-center gap-1.5"><DollarSign className="h-3.5 w-3.5" />{salario(v, true)}</p>
                      <p className="flex items-center gap-1.5"><Code2 className="h-3.5 w-3.5" />Código da Vaga: {v.referencia}</p>
                    </div>
                    <a className="mt-auto cursor-pointer rounded py-2 text-center" style={styleApi}>Detalhes</a>
                  </div>
                ))}
              </div>
            </div>
          )}

          <h2 className="mb-6 text-[2rem] font-bold text-black">Lista de Vagas</h2>
          {vagas.map((v) => (
            <div key={v.id} className="relative top-0 flex flex-col gap-4 border-b border-black/10 bg-white p-6 transition-all duration-100 hover:-top-1.5 hover:shadow-[0_0_40px_-5px_rgba(0,0,0,.2)] md:flex-row md:items-center">
              <div className="md:mr-12">
                <div className="mb-2 flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl font-bold text-black">{v.titulo}{v.pcd && <Pcd />}</h2>
                  <span className="rounded-[30px] px-6 py-1.5 text-xs font-bold" style={styleApi}>{v.contrato}</span>
                  {destaqueIds.includes(v.id) && <MarcaDestaque />}
                </div>
                <Meta v={v} />
              </div>
              <a className="cursor-pointer rounded px-4 py-2 md:ml-auto" style={styleApi}>Detalhes</a>
            </div>
          ))}
        </div>
      </section>
      <Rodape13 circulos={false} />
    </FontWrap>
  );
}
