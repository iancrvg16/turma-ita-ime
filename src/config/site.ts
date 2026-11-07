export const site = {
  name: 'Turma ITA/IME',
  institution: 'Pirambu Innovation',
  tagline: 'O futuro começa em movimento.',
  origin: import.meta.env.VITE_SITE_URL?.replace(/\/$/, '') || '',
  contacts: {
    email: null as string | null,
    phone: null as string | null,
    whatsapp: null as string | null,
    registrationUrl: null as string | null,
  },
  contactMessage:
    'Os canais de contato e as informações de participação serão divulgados após confirmação pela coordenação. Por enquanto, explore a proposta e conheça nossa equipe.',
  assets: {
    social: '/assets/social.svg',
    teacherPortraits: {} as Record<string, string>,
  },
  links: {
    ita: 'https://www.ita.br/',
    ime: 'https://www.ime.eb.mil.br/',
    pirambu: 'https://pirambuinnovation.com.br/',
  },
} as const

export const navigation = [
  { path: '/', label: 'Início' },
  { path: '/nossa-turma', label: 'Nossa turma' },
  { path: '/ita', label: 'ITA & IME' },
  { path: '/disciplinas', label: 'Disciplinas' },
  { path: '/equipe', label: 'Equipe' },
  { path: '/pirambu-innovation', label: 'O Pirambu' },
] as const
