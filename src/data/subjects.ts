import type { SubjectId } from './team'

export interface Subject {
  id: SubjectId
  name: string
  symbol: string
  verb: string
  description: string
  color: string
}
export const subjects: Subject[] = [
  {
    id: 'fisica',
    name: 'Física',
    symbol: '→',
    verb: 'Entender o movimento.',
    description:
      'Da luz que chega aos nossos olhos às forças que colocam o mundo em movimento. Investigue fenômenos, conecte modelos e teste suas ideias.',
    color: 'cyan',
  },
  {
    id: 'matematica',
    name: 'Matemática',
    symbol: 'ƒ',
    verb: 'Encontrar novas relações.',
    description:
      'Reconheça padrões, explore formas e desenvolva argumentos. A matemática é uma linguagem para pensar com clareza e abrir caminhos.',
    color: 'blue',
  },
  {
    id: 'quimica',
    name: 'Química',
    symbol: '⌬',
    verb: 'Descobrir as transformações.',
    description:
      'Olhe de perto para a matéria. Átomos, ligações e reações ajudam a explicar os materiais e as transformações que nos cercam.',
    color: 'green',
  },
  {
    id: 'portugues',
    name: 'Língua Portuguesa',
    symbol: 'Aa',
    verb: 'Ler além das palavras.',
    description:
      'Entender como a língua se organiza também é entender o que fazemos com ela. Explore sentidos, estruturas e possibilidades de expressão.',
    color: 'pink',
  },
  {
    id: 'literatura',
    name: 'Literatura',
    symbol: '“ ”',
    verb: 'Ampliar os pontos de vista.',
    description:
      'Encontre outras épocas, vozes e formas de enxergar o mundo. A leitura conecta experiência, imaginação e pensamento crítico.',
    color: 'amber',
  },
  {
    id: 'redacao',
    name: 'Redação',
    symbol: '¶',
    verb: 'Dar forma às suas ideias.',
    description:
      'Organize raciocínios, construa argumentos e transforme perguntas em textos. Escrever é um processo de experimentar e revisar.',
    color: 'coral',
  },
  {
    id: 'ingles',
    name: 'Inglês',
    symbol: '↔',
    verb: 'Conectar outros mundos.',
    description:
      'Uma outra língua abre novas possibilidades de leitura e comunicação. Amplie seu contato com ideias e perspectivas.',
    color: 'purple',
  },
]
export const subjectById = (id: SubjectId) => subjects.find((s) => s.id === id)!
