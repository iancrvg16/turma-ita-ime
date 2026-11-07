export type InstitutionId = 'ita' | 'ime'
export const sources = {
  ita: { title: 'ITA · Informações gerais', url: 'https://www.ita.br/info' },
  itaHistory: {
    title: 'ITA · 70 anos, a primeira década',
    url: 'https://pgfis.ita.br/pt/post/especial-70-anos-da-criacao-do-ita-1a-decada',
  },
  itaDecree: {
    title: 'Decreto nº 27.695, de 16 de janeiro de 1950',
    url: 'https://www.planalto.gov.br/ccivil_03/decreto/1950-1969/d27695.htm',
  },
  ime: {
    title: 'IME · Tradição, história e inovação',
    url: 'https://cartografia.ime.eb.br/ime-tradicao-historia-inovacao.html',
  },
  imeHistory: {
    title: 'IME · 200 anos de ciência e tecnologia',
    url: 'https://disseminar.ime.eb.br/en/ime.html',
  },
  shared: {
    title: 'IME · Evolução do ensino de engenharia',
    url: 'https://www.iep.ime.eb.br/evolucao-ensino-militar.html',
  },
  pirambu: {
    title: 'Pirambu Innovation · Quem somos',
    url: 'https://pirambuinnovation.com.br/quem-somos/',
  },
}
export const institutions = {
  ita: {
    name: 'Instituto Tecnológico de Aeronáutica',
    short: 'ITA',
    line: 'Onde o conhecimento ganha novas altitudes.',
    description:
      'Uma instituição universitária pública que conecta o ensino de engenharia à pesquisa em ciência e tecnologia aeroespacial.',
    location: 'São José dos Campos · SP',
    link: 'https://www.ita.br/',
    affiliation: 'Comando da Aeronáutica',
    field: 'Engenharia, ciência e tecnologia aeroespacial',
    date: '1950',
    dateLabel: 'Criação do instituto',
    history:
      'Criado em 16 de janeiro de 1950, por inspiração do Marechal Casimiro Montenegro Filho, o ITA integra a construção do sistema científico e tecnológico aeroespacial brasileiro.',
    curiosity:
      'A concepção do ITA reuniu a visão de Casimiro Montenegro e a colaboração do professor Richard H. Smith, do MIT. O projeto articulava uma escola de engenharia e um centro de pesquisa.',
    mission:
      'Formar profissionais e desenvolver conhecimentos em engenharia, com ensino e pesquisa voltados ao avanço da ciência e da tecnologia aeroespacial.',
    sources: [sources.ita, sources.itaHistory, sources.itaDecree],
  },
  ime: {
    name: 'Instituto Militar de Engenharia',
    short: 'IME',
    line: 'Construir soluções. Transformar possibilidades.',
    description:
      'Uma instituição de ensino superior ligada ao Exército Brasileiro, dedicada à formação em engenharia e ao desenvolvimento científico e tecnológico.',
    location: 'Rio de Janeiro · RJ',
    link: 'https://www.ime.eb.mil.br/',
    affiliation: 'Exército Brasileiro',
    field: 'Engenharia e desenvolvimento científico e tecnológico',
    date: '1959',
    dateLabel: 'Formação do IME atual',
    history:
      'As raízes históricas do IME remontam à Real Academia de Artilharia, Fortificação e Desenho, de 1792. O instituto com a denominação atual nasceu em 1959, da fusão da Escola Técnica do Exército com o Instituto Militar de Tecnologia.',
    curiosity:
      'A trajetória que antecede o IME também se conecta à do ITA: em 1939, a Escola Técnica do Exército passou a oferecer formação em Engenharia Aeronáutica.',
    mission:
      'Contribuir para a formação em engenharia e para a pesquisa científica e tecnológica, conectando o conhecimento a desafios de interesse do Exército e do país.',
    sources: [sources.imeHistory, sources.ime, sources.shared],
  },
} as const

export const milestones = [
  {
    year: '1792',
    institution: 'ime' as const,
    tag: 'As raízes',
    title: 'Uma história que começa antes do nome.',
    text: 'A Real Academia de Artilharia, Fortificação e Desenho é instalada no Rio de Janeiro. É uma das raízes históricas da trajetória do IME, que ainda não tinha sua denominação atual.',
    source: sources.imeHistory,
  },
  {
    year: '1939',
    institution: 'both' as const,
    tag: 'Um caminho compartilhado',
    title: 'A engenharia encontra a aviação.',
    text: 'O curso de Engenharia Aeronáutica é autorizado na Escola Técnica do Exército, no Rio de Janeiro. Essa formação antecede a criação do ITA e conecta as duas trajetórias.',
    source: sources.shared,
  },
  {
    year: '1950',
    institution: 'ita' as const,
    tag: 'Um novo horizonte',
    title: 'Nasce o Instituto Tecnológico de Aeronáutica.',
    text: 'Em 16 de janeiro, o Decreto nº 27.695 cria o ITA. Estabelecido em São José dos Campos, o instituto dá continuidade à formação de engenheiros de aeronáutica.',
    source: sources.itaDecree,
  },
  {
    year: '1959',
    institution: 'ime' as const,
    tag: 'A instituição atual',
    title: 'Duas instituições, um novo capítulo.',
    text: 'A fusão da Escola Técnica do Exército com o Instituto Militar de Tecnologia dá origem ao Instituto Militar de Engenharia com sua denominação atual.',
    source: sources.imeHistory,
  },
]
