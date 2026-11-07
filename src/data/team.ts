export type SubjectId =
  'fisica' | 'matematica' | 'quimica' | 'portugues' | 'literatura' | 'redacao' | 'ingles'
export interface TeachingArea {
  subject: SubjectId
  topics: string[]
}
export interface Teacher {
  id: string
  name: string
  initials: string
  role: string
  areas: TeachingArea[]
  color: string
}

export const teachers: Teacher[] = [
  {
    id: 'juan',
    name: 'Juan Pla Gonçalves',
    initials: 'JG',
    role: 'Professor / Coordenador',
    color: 'cyan',
    areas: [
      {
        subject: 'fisica',
        topics: [
          'Óptica Geométrica',
          'Hidroestática e Hidrodinâmica',
          'Cinemática',
          'Eletromagnetismo',
        ],
      },
      {
        subject: 'matematica',
        topics: [
          'Funções',
          'Geometria Analítica',
          'Geometria Espacial',
          'Polinômios',
          'Logaritmos',
        ],
      },
      {
        subject: 'quimica',
        topics: [
          'Cinética Química e Radioativa',
          'Ácidos e Bases',
          'Gases',
          'Equilíbrio Químico',
          'Equilíbrio Iônico',
        ],
      },
    ],
  },
  {
    id: 'julio',
    name: 'Júlio Saraiva Paschoal',
    initials: 'JP',
    role: 'Professor',
    color: 'blue',
    areas: [
      {
        subject: 'fisica',
        topics: [
          'Dinâmica',
          'Física Moderna',
          'Física Térmica',
          'Gases e Termodinâmica',
          'Impulso e Quantidade de Movimento',
          'Trabalho e Energia',
          'Óptica Física',
          'Relatividade',
        ],
      },
      { subject: 'matematica', topics: ['Análise Combinatória', 'Matrizes', 'Sistemas Lineares'] },
      {
        subject: 'quimica',
        topics: ['Ligações Químicas', 'Reações Químicas', 'Termoquímica e Termodinâmica'],
      },
    ],
  },
  {
    id: 'arthur',
    name: 'Arthur Novais Guidolin',
    initials: 'AG',
    role: 'Professor',
    color: 'amber',
    areas: [
      {
        subject: 'literatura',
        topics: [
          'Literatura Brasileira: períodos colonial e nacional',
          'Barroco',
          'Arcadismo',
          'Romantismo',
          'Realismo e Naturalismo',
          'Parnasianismo',
          'Simbolismo',
          'Pré-modernismo',
          'Vanguardas europeias',
          'Modernismo',
          'Tendências contemporâneas',
          'Literatura Portuguesa: Trovadorismo',
          'Humanismo',
          'Classicismo',
          'Barroco português',
          'Neoclassicismo',
          'Romantismo português',
          'Realismo português',
          'Simbolismo português',
          'Modernismo português',
          'Literatura portuguesa contemporânea',
        ],
      },
    ],
  },
  {
    id: 'israel',
    name: 'Israel Oliveira Barbosa Lima',
    initials: 'IL',
    role: 'Professor',
    color: 'green',
    areas: [
      { subject: 'fisica', topics: ['Eletrodinâmica', 'Eletrostática'] },
      { subject: 'matematica', topics: ['Geometria Plana', 'Conjuntos'] },
      {
        subject: 'quimica',
        topics: [
          'Eletroquímica',
          'Estequiometria',
          'Polímeros',
          'Soluções',
          'Química Orgânica',
          'Tabela Periódica',
          'Química Ambiental e Descritiva',
          'Bioquímica',
        ],
      },
    ],
  },
  {
    id: 'raul',
    name: 'Raul Mozsek Duarte Sztutman',
    initials: 'RS',
    role: 'Professor',
    color: 'purple',
    areas: [
      {
        subject: 'fisica',
        topics: [
          'Análise Dimensional',
          'Gravitação',
          'Estática',
          'Movimento Harmônico Simples',
          'Ondas',
        ],
      },
      {
        subject: 'matematica',
        topics: ['Equações Algébricas', 'Números Complexos', 'Progressões', 'Trigonometria'],
      },
      {
        subject: 'quimica',
        topics: ['Átomos e Moléculas', 'Coloides', 'Matéria', 'Misturas', 'História da Química'],
      },
      { subject: 'ingles', topics: ['Inglês'] },
    ],
  },
  {
    id: 'daniel',
    name: 'Daniel da Silva Oliveira',
    initials: 'DO',
    role: 'Professor',
    color: 'coral',
    areas: [
      {
        subject: 'redacao',
        topics: [
          'Texto Dissertativo-Argumentativo',
          'Dissertação',
          'Estrutura textual',
          'Conclusão',
        ],
      },
    ],
  },
  {
    id: 'izabele',
    name: 'Izabele Gonzalez Costa',
    initials: 'IC',
    role: 'Professora',
    color: 'pink',
    areas: [
      {
        subject: 'portugues',
        topics: [
          'Morfologia',
          'Sintaxe',
          'Semântica',
          'Estilística',
          'Leitura e Interpretação',
          'Gêneros textuais',
          'Funções da linguagem',
          'Análise e interpretação textual',
        ],
      },
    ],
  },
]
