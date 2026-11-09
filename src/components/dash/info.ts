import type { ChartInfo } from "./primitives";

// Textos do ícone de informação de cada gráfico: o que o indicador mostra e de onde o dado será puxado.
export const info = {
  // Candidatos
  escolaridade: { about: "Distribuição dos candidatos cadastrados pelo nível de escolaridade.", source: "Cadastro do candidato · campo escolaridade. Cada candidato é contado uma vez, pelo maior nível informado." },
  gruposCandidatos: { about: "Quantidade de candidatos em cada grupo de cadastro.", source: "Cadastro do candidato · grupo (padrão, estagiário, jovem aprendiz ou PcD). Cada candidato pertence a um único grupo." },
  faixaEtaria: { about: "Candidatos cadastrados por faixa de idade.", source: "Data de nascimento do cadastro; idade calculada na data de referência do painel." },
  bairros: { about: "Os 8 bairros com mais candidatos cadastrados.", source: "Endereço do cadastro · bairro, ordenado pela quantidade de candidatos." },
  interesseVsVagas: { about: "Compara, área por área, o interesse dos candidatos com a oferta de vagas abertas. Onde a barra de vagas é maior que a de candidatos, falta gente interessada; no contrário, sobra.", source: "Candidatos: área de interesse principal do cadastro (773). Vagas: área das vagas com status aberta (214). Cada barra é o percentual sobre o total do próprio grupo; a quantidade absoluta aparece ao passar o mouse." },
  perfilCadastro: { about: "Candidatos com cadastro completo e incompleto.", source: "O cadastro é completo quando os campos obrigatórios (dados pessoais, contato, escolaridade e experiência) estão preenchidos." },
  contratadosGenero: { about: "Candidatos contratados nos últimos 6 meses, por gênero.", source: "Candidatos com status contratado nos processos seletivos do período, cruzados com o campo gênero do cadastro." },
  contratadosRaca: { about: "Candidatos contratados nos últimos 6 meses, por raça/cor.", source: "Contratados do período cruzados com o campo raça/cor autodeclarado no cadastro (classificação do IBGE)." },
  contratadosFaixa: { about: "Candidatos contratados nos últimos 6 meses, por faixa etária.", source: "Idade calculada pela data de nascimento do cadastro na data da contratação." },
  contratadosPcd: { about: "Candidatos contratados nos últimos 6 meses com e sem deficiência.", source: "Contratados do período cruzados com a indicação de pessoa com deficiência do cadastro." },
  candidaturasDia: { about: "Candidaturas recebidas em cada dia dos últimos 7 dias.", source: "Data de inscrição do candidato em uma vaga." },
  origem: { about: "Candidatos cadastrados por canal de origem.", source: "Campo de origem do cadastro (como o candidato conheceu o serviço)." },
  cadastrosContratacoes: { about: "Evolução mensal de novos cadastros e de contratações.", source: "Data de criação do cadastro e data da contratação registrada no processo seletivo." },
  situacaoCadastral: { about: "Candidatos ativos e inativos na base.", source: "Status atual do cadastro do candidato." },
  movimentacaoCadastral: { about: "Cadastros criados, atualizados e excluídos em cada mês.", source: "Datas de criação, última atualização e exclusão do cadastro do candidato." },
  // Vagas
  vagasStatus: {
    about: "Vagas cadastradas pela situação atual, separando as que tiveram contratação (preenchidas) das que passaram do prazo sem nenhuma contratação (expiradas). Cada vaga aparece em uma única fatia.",
    source: "Regra aplicada nesta ordem: 1) Preenchidas: vaga com pelo menos um candidato na etapa de contratação, seja qual for a situação. 2) Expiradas sem preenchimento: data de previsão de encerramento já passou e nenhum candidato foi contratado, esteja a vaga aberta, fechada ou cancelada. 3) As demais seguem a situação cadastrada: aberta, prospecção, stand by, solicitando documentos, fechada (sem contratação) ou cancelada. Vaga sem previsão de encerramento nunca conta como expirada; por isso, \"Abertas\" aqui são só as que estão no prazo e sem contratação.",
  },
  vagasArea: { about: "Vagas cadastradas por área de atuação.", source: "Campo área da vaga." },
  vagasModalidade: { about: "Vagas por modalidade de trabalho.", source: "Campo modalidade da vaga: presencial, híbrido ou remoto." },
  vagasOrigem: { about: "Vagas criadas pela administração e vagas recebidas de empresas parceiras via API.", source: "Origem do registro da vaga." },
  faixaSalarial: { about: "Vagas agrupadas pela faixa salarial oferecida.", source: "Salário informado na vaga, agrupado em faixas; sem valor informado conta como “A combinar”." },
  escolaridadeExigida: { about: "Vagas pela escolaridade mínima exigida.", source: "Campo escolaridade mínima da vaga." },
  vagasRecentes: { about: "Últimas vagas publicadas, com quantidade de candidaturas e status.", source: "Vagas ordenadas pela data de publicação; candidaturas são as inscrições recebidas em cada vaga. No protótipo, o status pode ser alterado só para demonstração." },
  aprovacoesVaga: { about: "Vagas enviadas por empresas que aguardam aprovação.", source: "Solicitações de vaga recebidas via API com situação pendente." },
  aberturaFechamento: { about: "Quantidade de vagas abertas e fechadas em cada mês.", source: "Data de abertura e data de fechamento da vaga." },
  tipoContratacao: { about: "Vagas pelo regime de contratação.", source: "Campo tipo de contratação da vaga: CLT, estágio, jovem aprendiz ou PJ/temporário." },
  tempoFechamentoArea: { about: "Média de dias para fechar uma vaga, por área.", source: "Para as vagas fechadas no período: data de fechamento − data de abertura, com média por área." },
  // Empresas
  empresasRamo: { about: "Empresas parceiras cadastradas por ramo de atividade.", source: "Cadastro da empresa · campo Ramo de atividade (aba Gerais)." },
  topEmpresas: { about: "Empresas que mais enviaram vagas nos últimos 6 meses.", source: "Vagas com origem em empresa parceira, agrupadas por empresa." },
  vagasEnviadasMes: { about: "Vagas enviadas por empresa no mês de referência.", source: "Vagas recebidas das empresas parceiras com data de envio no mês." },
  vagasEnviadasTabela: { about: "Solicitações de vaga mais recentes das empresas parceiras e sua situação.", source: "Vagas recebidas via API, ordenadas pela data de envio." },
  aprovacoesEmpresa: { about: "Empresas cujo cadastro aguarda aprovação.", source: "Cadastros de empresas parceiras com situação pendente." },
  crescimentoCarteira: { about: "Evolução mensal das empresas aprovadas e dos novos cadastros.", source: "Data de aprovação e data de cadastro da empresa." },
  contratosEstagio: { about: "Contratos de estágio ativos por empresa e quantos vencem nos próximos 30 dias.", source: "Contratos de estágio vinculados à empresa e suas datas de término." },
  // Processos
  movimentacaoProcessos: { about: "Candidatos incluídos, removidos, contratados e desligados nos processos seletivos.", source: "Movimentações registradas nos processos seletivos durante o período." },
  sla: { about: "Vagas ativas dentro e fora do prazo combinado (SLA).", source: "Compara os dias desde a abertura da vaga com o prazo definido para ela." },
  motivosIncompatibilidade: { about: "Motivos das reprovações de candidatos nos processos.", source: "Motivo registrado ao reprovar ou remover o candidato do processo; percentual sobre o total de reprovações." },
  tempoEtapa: { about: "Média de dias que os candidatos permanecem em cada etapa do processo.", source: "Datas de entrada e saída do candidato em cada etapa, com média por etapa." },
  contratadosTipo: { about: "Contratações dos últimos 6 meses pelo tipo de vaga.", source: "Candidatos com status contratado, agrupados pelo tipo de contratação da vaga." },
  rankingContratacoes: { about: "Recrutadores e consultores com mais contratações.", source: "Contratações agrupadas pelo responsável do processo seletivo." },
  desempenhoRecrutador: { about: "Produção de cada recrutador ou consultor no período.", source: "Candidatos triados, em seleção, contratados e provas aplicadas por responsável; prazo comparado com o SLA da vaga." },
  tempoPreencherVaga: {
    about: "Quantos dias, em média, uma vaga leva desde a abertura até a primeira contratação.",
    source: "Para cada vaga com contratação no período: data da 1ª contratação − data de criação da vaga, em dias corridos. A 1ª contratação é a menor data de contratação entre os candidatos que chegaram à etapa de contratação. O indicador é a média entre essas vagas. Vagas sem contratação não entram na conta.",
  },
  tempoContratacaoCandidato: {
    about: "Quantos dias, em média, um candidato contratado levou desde a entrada no processo seletivo até a contratação.",
    source: "Para cada candidato contratado no período: data da contratação − data em que foi incluído no processo seletivo da vaga, em dias corridos. O indicador é a média entre os contratados. Se o candidato foi contratado em mais de uma vaga, cada contratação conta separadamente.",
  },
  tempoContratacaoMes: {
    about: "Evolução mensal dos dois tempos médios: preenchimento da vaga (abertura até a 1ª contratação) e contratação do candidato (entrada no processo até a contratação).",
    source: "Mesmo cálculo dos dois indicadores ao lado, agrupado pelo mês da data de contratação.",
  },
  // Turnover
  turnoverMes: { about: "Taxa de turnover dos candidatos contratados em cada mês.", source: "((admissões + desligamentos) ÷ 2) ÷ total de vínculos ativos no fim do mês." },
  desligamentosFaixa: { about: "Desligamentos do mês por faixa etária.", source: "Desligamentos registrados cruzados com a data de nascimento do cadastro." },
  desligamentosSexo: { about: "Desligamentos do mês por sexo.", source: "Desligamentos registrados cruzados com o campo sexo do cadastro." },
  motivosDesligamento: { about: "Motivos informados nos desligamentos do mês.", source: "Motivo registrado no desligamento do contratado." },
  contratadosDesligados: { about: "Admissões e desligamentos em cada mês.", source: "Datas de contratação e de desligamento dos candidatos contratados." },
} satisfies Record<string, ChartInfo>;
