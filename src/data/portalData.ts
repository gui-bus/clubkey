export interface Club {
  id: string
  name: string
  mono: string
  accent: string
  accent2: string
  line: string
}

export interface Member {
  id: number
  name: string
  role: string
  company: string
  city: string
  avatar?: string
  image?: string
  seeking: string[]
  offering: string[]
  since?: string | number
  socials?: {
    linkedin?: string
    website?: string
    instagram?: string
  }
}

export interface EventHighlight {
  title: string
  desc: string
  icon?: string
}

export interface EventItem {
  id: number
  title: string
  day: string
  month: string
  weekday: string
  time: string
  place: string
  organizerId: number
  capacity: number
  initialConfirmed: number
  desc: string
  participants: number[]
  category?: string
  spots?: number
  xp?: number
  host?: {
    name: string
    role: string
  }
  image?: string
  dressCode?: string
  format?: string
  highlights?: EventHighlight[]
  inclusions?: string[]
}

export interface ExperienceItem {
  id: number
  title: string
  date: string
  day?: string
  month?: string
  weekday?: string
  time?: string
  place: string
  price: number
  sub: string
  desc: string
  includes: string[]
  participants: number[]
  image?: string
  xp?: number
}

export interface BenefitItem {
  id: number
  partner: string
  category: string
  discount: string
  desc: string
  image?: string
}

export interface StayItem {
  id: number
  name: string
  city: string
  origPrice: number
  memberPrice: number
  badge: string
  image: string
}

export interface UserProfile {
  name: string
  email?: string
  nationality?: "brasileiro" | "estrangeiro"
  cpf?: string
  birthDate?: string
  phone?: { dialCode: string; number: string }
  companyName?: string
  cnpj?: string
  corporateEmail?: string
  openingDate?: string
  role: string
  company: string
  city: string
  avatar: string
  coverImage?: string
  bio: string
  seeking: string[]
  offering: string[]
}

export const CLUBS: Club[] = [
  {
    id: "alpha",
    name: "Clube Alpha",
    mono: "CA",
    accent: "#FF6847",
    accent2: "#E85535",
    line: "Encontros mensais, curadoria de experiências e uma rede de 16 membros que abrem portas de verdade."
  },
  {
    id: "founders",
    name: "Founders Circle",
    mono: "FC",
    accent: "#FF6847",
    accent2: "#E85535",
    line: "Fundadores em estágio de tração. Sala fechada, conversa direta, sem palco."
  },
  {
    id: "inv",
    name: "Clube Investidores",
    mono: "CI",
    accent: "#FF6847",
    accent2: "#E85535",
    line: "Capital privado, co-investimento e deal flow qualificado entre pares."
  }
]

export const MEMBERS: Member[] = [
  {
    id: 0,
    name: "Ana Beatriz Ramos",
    role: "Sócia-fundadora",
    company: "Vero Capital",
    city: "São Paulo",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    seeking: ["Co-investidores série A", "Advisor de fintech"],
    offering: ["Deal flow em fintech", "Acesso a family offices"],
    since: 2021,
    socials: { linkedin: "https://linkedin.com", website: "https://verocapital.com.br" }
  },
  {
    id: 1,
    name: "Rodrigo Salles",
    role: "CEO",
    company: "Norte Logística",
    city: "Curitiba",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80",
    seeking: ["Sócio operacional no Nordeste", "Software de roteirização"],
    offering: ["Malha logística no Sul", "Contatos no varejo alimentar"],
    since: 2020,
    socials: { linkedin: "https://linkedin.com" }
  },
  {
    id: 2,
    name: "Camila Yoshida",
    role: "Diretora de Produto",
    company: "Banco Livre",
    city: "São Paulo",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
    seeking: ["Head de design sênior", "Benchmark de onboarding"],
    offering: ["Mentoria de produto", "Base de teste com 4M de clientes"],
    since: 2022,
    socials: { linkedin: "https://linkedin.com", instagram: "https://instagram.com" }
  },
  {
    id: 3,
    name: "Eduardo Prado",
    role: "Fundador",
    company: "Prado Agro",
    city: "Ribeirão Preto",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
    seeking: ["Crédito rural estruturado", "Parceiro de exportação"],
    offering: ["Área arrendada em MT", "Rede de cooperativas"],
    since: 2019,
    socials: { linkedin: "https://linkedin.com" }
  },
  {
    id: 4,
    name: "Juliana Meireles",
    role: "Sócia",
    company: "Meireles Advogados",
    city: "Belo Horizonte",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format&fit=crop&q=80",
    seeking: ["Casos de M&A no exterior"],
    offering: ["Estruturação societária", "Compliance para captação"],
    since: 2021,
    socials: { linkedin: "https://linkedin.com", website: "https://meireles.adv.br" }
  },
  {
    id: 5,
    name: "Fernando Tanaka",
    role: "CTO",
    company: "Órbita Health",
    city: "Florianópolis",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    seeking: ["Investidor anjo em saúde", "Parceria com hospitais"],
    offering: ["Time de engenharia sob demanda", "Integração com convênios"],
    since: 2023,
    socials: { linkedin: "https://linkedin.com" }
  },
  {
    id: 6,
    name: "Patrícia Loureiro",
    role: "Head de Expansão",
    company: "Rede Solar BR",
    city: "Recife",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    seeking: ["Terrenos para usinas", "Financiamento de longo prazo"],
    offering: ["Contratos de energia", "Rede de instaladores no NE"],
    since: 2022,
    socials: { linkedin: "https://linkedin.com" }
  },
  {
    id: 7,
    name: "Marcelo Bittencourt",
    role: "Presidente do Conselho",
    company: "Grupo Bittencourt",
    city: "Porto Alegre",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    seeking: ["Modelo de sucessão familiar"],
    offering: ["Conselheiro independente", "Rede de indústrias no Sul"],
    since: 2018,
    socials: { linkedin: "https://linkedin.com" }
  },
  {
    id: 8,
    name: "Larissa Fontes",
    role: "Fundadora",
    company: "Casa Fontes",
    city: "São Paulo",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    seeking: ["Franqueados no Centro-Oeste", "Gestor de e-commerce"],
    offering: ["Curadoria de varejo de luxo", "Showroom em Cerqueira César"],
    since: 2020,
    socials: { instagram: "https://instagram.com", website: "https://casafontes.com" }
  },
  {
    id: 9,
    name: "Otávio Nogueira",
    role: "Diretor Financeiro",
    company: "Vetor Energia",
    city: "Rio de Janeiro",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
    seeking: ["Hedge de câmbio", "Fundos de infraestrutura"],
    offering: ["Modelagem financeira", "Contatos na B3"],
    since: 2021,
    socials: { linkedin: "https://linkedin.com" }
  },
  {
    id: 10,
    name: "Renata Cordeiro",
    role: "Sócia",
    company: "Cordeiro Ventures",
    city: "São Paulo",
    avatar: "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=400&auto=format&fit=crop&q=80",
    seeking: ["Co-investimento em SaaS B2B"],
    offering: ["Cheque de R$ 2M a R$ 8M", "Rede de fundos na LatAm"],
    since: 2019,
    socials: { linkedin: "https://linkedin.com", website: "https://cordeiro.vc" }
  },
  {
    id: 11,
    name: "Gustavo Arruda",
    role: "CEO",
    company: "Arruda Construtora",
    city: "Brasília",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    seeking: ["Terrenos no Plano Piloto", "Parceiro em incorporação"],
    offering: ["Obra e engenharia", "Licenciamento no DF"],
    since: 2022,
    socials: { linkedin: "https://linkedin.com" }
  },
  {
    id: 12,
    name: "Bianca Sampaio",
    role: "Diretora de Marketing",
    company: "Ala Cosméticos",
    city: "São Paulo",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&auto=format&fit=crop&q=80",
    seeking: ["Agência de performance", "Influenciadores de nicho"],
    offering: ["Distribuição em 3 mil pontos", "Estratégia de marca"],
    since: 2023,
    socials: { instagram: "https://instagram.com", linkedin: "https://linkedin.com" }
  },
  {
    id: 13,
    name: "Henrique Vasques",
    role: "Fundador",
    company: "Vasques Náutica",
    city: "Balneário Camboriú",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80",
    seeking: ["Investidor para nova marina"],
    offering: ["Barcos para eventos do clube", "Rede no litoral catarinense"],
    since: 2020,
    socials: { instagram: "https://instagram.com" }
  },
  {
    id: 14,
    name: "Sofia Andrade",
    role: "Head de Pessoas",
    company: "Trilha Educação",
    city: "São Paulo",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    seeking: ["Executivos para C-level", "Programa de liderança"],
    offering: ["Headhunting", "Diagnóstico de cultura"],
    since: 2021,
    socials: { linkedin: "https://linkedin.com" }
  },
  {
    id: 15,
    name: "Thiago Belmonte",
    role: "Sócio",
    company: "Belmonte Imóveis",
    city: "São Paulo",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    seeking: ["Compradores para lajes corporativas"],
    offering: ["Portfólio de lajes AAA", "Leitura do mercado imobiliário"],
    since: 2018,
    socials: { linkedin: "https://linkedin.com", website: "https://belmonte.com.br" }
  }
]

export const EVENTS: EventItem[] = [
  {
    id: 0,
    title: "Jantar de Networking & Negócios",
    day: "12",
    month: "SET",
    weekday: "Quinta",
    time: "20h00",
    place: "Casa Alpha, Jardins (São Paulo)",
    organizerId: 0,
    capacity: 15,
    initialConfirmed: 8,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
    desc: "Mesa longa, conversas de alto nível e uma regra: cada convidado apresenta os desafios estratégicos do trimestre. Sem pitch, sem palco.",
    participants: [0, 1, 2, 4, 9, 10, 14, 15],
    dressCode: "Smart Casual / Business",
    format: "Jantar Exclusivo • Mesa Redonda",
    xp: 350,
    highlights: [
      {
        title: "Mesa Redonda Sem Palco",
        desc: "Diálogo aberto e sem apresentações formais, onde cada membro compartilha um desafio estratégico real do trimestre."
      },
      {
        title: "Regra Chatham House",
        desc: "Segurança e sigilo absoluto para debater números, transações e planos de expansão com franqueza."
      },
      {
        title: "Harmonização Gastronômica",
        desc: "Jantar autoral em múltiplos tempos no Casa Alpha com carta de vinhos curada exclusivamente para membros."
      },
      {
        title: "Deal Flow & Mapeamento",
        desc: "Síntese executiva das oportunidades e sinergias identificadas distribuída aos participantes pós-encontro."
      }
    ],
    inclusions: [
      "Acesso ao salão privativo Casa Alpha",
      "Menu autoral em 4 tempos & carta de vinhos",
      "Resumo executivo de oportunidades pós-evento",
      "Suporte e atendimento do concierge ClubKey"
    ]
  },
  {
    id: 1,
    title: "Almoço com Gestores de Venture Capital",
    day: "19",
    month: "SET",
    weekday: "Quinta",
    time: "12h30",
    place: "Fasano, Rua Vittorio Fasano (São Paulo)",
    organizerId: 10,
    capacity: 10,
    initialConfirmed: 5,
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&auto=format&fit=crop&q=80",
    desc: "Almoço fechado com gestores ativos em SaaS, infraestrutura e real estate. Cada membro traz uma pauta objetiva de crescimento e captação.",
    participants: [10, 0, 9, 5, 2],
    dressCode: "Business Elegante",
    format: "Almoço Fechado • Sala Privativa",
    xp: 250,
    highlights: [
      {
        title: "Acesso Direto a GPs & LPs",
        desc: "Convivência próxima e direta com tomadores de decisão de fundos tier-1 de Venture Capital e Private Equity."
      },
      {
        title: "Teses de Investimento 2027",
        desc: "Gestores apresentam em primeira mão os setores prioritários e critérios de alocação de cheques para o próximo ciclo."
      },
      {
        title: "Feedback Estratégico",
        desc: "Espaço reservado para debate sincero sobre governança, unit economics e estratégias de captação institucional."
      },
      {
        title: "Experiência Gastronômica Fasano",
        desc: "Menu clássico italiano em sala privativa no Fasano com serviço impecável e privacidade total."
      }
    ],
    inclusions: [
      "Salão privativo Fasano Jardins",
      "Almoço executivo completo com harmonização",
      "Material com teses dos fundos participantes",
      "Acesso direto aos contatos dos gestores"
    ]
  },
  {
    id: 2,
    title: "Roda de Conversa: Governança & Sucessão",
    day: "26",
    month: "SET",
    weekday: "Quinta",
    time: "19h00",
    place: "Sede ClubKey, Faria Lima (São Paulo)",
    organizerId: 7,
    capacity: 12,
    initialConfirmed: 4,
    image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=800&auto=format&fit=crop&q=80",
    desc: "Três gerações de empresários debatem governança estruturada, acordos societários modernos e mitigação de riscos familiares.",
    participants: [7, 4, 3, 11],
    dressCode: "Business Formal / Smart",
    format: "Roda de Conversa & Coquetel",
    xp: 200,
    highlights: [
      {
        title: "Casos Reais & Sucessão",
        desc: "Depoimentos francos de fundadores e herdeiros sobre transição de comando, mediação e governança de holdings."
      },
      {
        title: "Acordos de Sócios Modernos",
        desc: "Estratégias jurídicas e cláusulas essenciais para blindagem patrimonial e alinhamento de visão societária."
      },
      {
        title: "Conselhos Consultivos",
        desc: "Como estruturar conselhos independentes de alto impacto sem burocratizar a tomada de decisões da empresa."
      },
      {
        title: "Coquetel no Lounge VIP",
        desc: "Encerramento com coquetel volante, drinks autorais e aprofundamento das conexões entre as famílias empresárias."
      }
    ],
    inclusions: [
      "Acesso ao lounge executivo ClubKey Faria Lima",
      "Coquetel volante e coquetelaria autoral",
      "Guia prático de governança para empresas familiares",
      "Lista de contatos dos participantes"
    ]
  },
  {
    id: 3,
    title: "Visita Técnica & Field Day Prado Agro",
    day: "03",
    month: "OUT",
    weekday: "Sexta",
    time: "09h00",
    place: "Ribeirão Preto, SP",
    organizerId: 3,
    capacity: 10,
    initialConfirmed: 4,
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80",
    desc: "Dia de campo imersivo: inovação agtech, armazenagem inteligente e a estrutura financeira por trás da safra recorde.",
    participants: [3, 6, 9, 1],
    dressCode: "Campo / Botas & Camisa",
    format: "Field Day • Visita Técnica",
    xp: 450,
    highlights: [
      {
        title: "Tecnologia de Campo ao Vivo",
        desc: "Demonstração prática de telemetria autônoma, drones de monitoramento e bioinsumos aplicados em larga escala."
      },
      {
        title: "Engenharia Financeira do Agro",
        desc: "Apresentação dos modelos de estruturação de Fiagro, CPRs financeiras e operações de barter da safra."
      },
      {
        title: "Armazenagem & Logística",
        desc: "Visita técnica aos silos inteligentes e processos de redução de quebra de grãos na cadeia de suprimentos."
      },
      {
        title: "Almoço Rústico de Confraternização",
        desc: "Churrasco de cortes nobres na sede da fazenda com líderes e investidores do agronegócio nacional."
      }
    ],
    inclusions: [
      "Traslado executivo interno na fazenda modelo",
      "Almoço típico com churrasco premium de cortes nobres",
      "Dossiê técnico com os dados de produtividade e finanças",
      "Seguro viagem e cobertura de campo inclusos"
    ]
  },
  {
    id: 4,
    title: "Clube do Vinho: Safras Especiais",
    day: "10",
    month: "OUT",
    weekday: "Sexta",
    time: "20h30",
    place: "Adega Bonvivant (São Paulo)",
    organizerId: 8,
    capacity: 8,
    initialConfirmed: 4,
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&auto=format&fit=crop&q=80",
    desc: "Seis rótulos raros servidos às cegas com harmonização completa e curadoria sommelier exclusiva para membros.",
    participants: [8, 12, 14, 4],
    dressCode: "Smart Casual",
    format: "Degustação Guiada • Sala Climatizada",
    xp: 300,
    highlights: [
      {
        title: "Degustação Às Cegas",
        desc: "Avaliação de seis safras históricas premiadas guiadas por Master Sommelier em sala climatizada privativa."
      },
      {
        title: "Harmonização em 5 Tempos",
        desc: "Menu desenvolvido sob medida para realçar as notas de cada terroir e casta de uva apresentada."
      },
      {
        title: "Acesso a Lotes Exclusivos",
        desc: "Oportunidade de adquirir garrafas do acervo privado da adega com condições reservadas para membros."
      },
      {
        title: "Networking Intimista",
        desc: "Ambiente reservado para apenas 16 participantes, propiciando conexões profundas e duradouras."
      }
    ],
    inclusions: [
      "6 taças de safras especiais raras e históricas",
      "Menu harmonizado em 5 etapas",
      "Ficha técnica e guia de notas de degustação",
      "Taça comemorativa de cristal personalizada"
    ]
  },
  {
    id: 5,
    title: "Painel Estratégico: Atração de Capital Global",
    day: "17",
    month: "OUT",
    weekday: "Sexta",
    time: "18h30",
    place: "Auditório Faria Lima (São Paulo)",
    organizerId: 9,
    capacity: 16,
    initialConfirmed: 6,
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80",
    desc: "Como empresas brasileiras aceleram parcerias e aportes institucionais no exterior, direto com fundos que operam nos dois mercados.",
    participants: [9, 0, 10, 5, 11, 15],
    dressCode: "Business / Passeio Completo",
    format: "Painel Estratégico & Foyer VIP",
    xp: 400,
    highlights: [
      {
        title: "Panorama Macroeconômico Global",
        desc: "Análise aprofundada de fluxos de capital internacional, taxas de juros americanas e oportunidades de arbitragem."
      },
      {
        title: "Estruturas Offshore & Cayman",
        desc: "Modelos societários e tributários recomendados para fundos soberanos e investidores institucionais estrangeiros."
      },
      {
        title: "Painelistas Internacionais",
        desc: "Presença de Managing Partners de fundos sediados em Nova York, Londres e São Paulo no mesmo palco."
      },
      {
        title: "Coquetel Executivo no Foyer",
        desc: "Sessão estendida de networking com os painelistas e convidados selecionados no foyer privativo."
      }
    ],
    inclusions: [
      "Acesso ao auditório principal e assento reservado",
      "Coquetel executivo completo no foyer",
      "Relatório econômico digital pós-evento",
      "Credencial nominal VIP de membro"
    ]
  },
  {
    id: 6,
    title: "Café da Manhã Executivo: Tendências 2027",
    day: "24",
    month: "OUT",
    weekday: "Sexta",
    time: "08h00",
    place: "Rooftop Itaim (São Paulo)",
    organizerId: 14,
    capacity: 10,
    initialConfirmed: 4,
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&auto=format&fit=crop&q=80",
    desc: "Pauta dinâmica e objetiva com foco em inteligência artificial corporativa, contratações chave e eficiência de capital.",
    participants: [14, 2, 12, 6],
    dressCode: "Casual Executivo",
    format: "Breakfast Briefing • Rooftop",
    xp: 150,
    highlights: [
      {
        title: "IA Aplicada à Eficiência",
        desc: "Casos reais de redução de custos operacionais e aceleração de receita com ferramentas de inteligência artificial."
      },
      {
        title: "Atração de Talentos C-Level",
        desc: "Estratégias de atração, pacotes de equity e modelos de incentivo de longo prazo para lideranças estratégicas."
      },
      {
        title: "Formato Ágil & Dinâmico",
        desc: "Sessão concisa das 08h00 às 09h30, ideal para a rotina de fundadores e executivos de alta performance."
      },
      {
        title: "Rooftop com Vista Panorâmica",
        desc: "Café da manhã continental servido em ambiente inspirador com vista panorâmica do skyline paulistano."
      }
    ],
    inclusions: [
      "Buffet de café da manhã continental gourmet",
      "Resumo executivo em PDF com os insights do painel",
      "Networking ágil com líderes do ecossistema",
      "Estacionamento com manobrista cortesia"
    ]
  },
  {
    id: 7,
    title: "Noite de Charutos, Destilados & Negócios",
    day: "31",
    month: "OUT",
    weekday: "Sexta",
    time: "21h00",
    place: "Charutaria Lisboa (São Paulo)",
    organizerId: 13,
    capacity: 12,
    initialConfirmed: 6,
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&auto=format&fit=crop&q=80",
    desc: "Encontro descontraído de encerramento de mês com foco em conexões espontâneas e alianças de longo prazo.",
    participants: [13, 7, 1, 3, 11, 15],
    dressCode: "Smart Casual / Noite",
    format: "Lounge Noturno • Fumoir Privado",
    xp: 300,
    highlights: [
      {
        title: "Charutaria & Curadoria",
        desc: "Seleção exclusiva de charutos cubanos e nicaraguenses acompanhados por especialista certificado."
      },
      {
        title: "Destilados Raros & Single Malts",
        desc: "Carta com whiskies escoceses de edições limitadas e coquetéis clássicos preparados por mixologista da casa."
      },
      {
        title: "Conexões Descontraídas",
        desc: "Ambiente descontraído e sem formalidades, focado em fortalecer amizades e parcerias genuínas."
      },
      {
        title: "Fumoir Reservado com Exaustão",
        desc: "Sala privativa com acústica tratada e sistema de ventilação e climatização de alto desempenho."
      }
    ],
    inclusions: [
      "2 charutos premium selecionados pelo sommelier",
      "Open bar de destilados selecionados e coquetelaria",
      "Menu de petiscos gourmet para harmonização",
      "Reserva integral do espaço para membros"
    ]
  }
]

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 0,
    title: "Degustação privada de Bordeaux",
    sub: "12 vagas",
    price: 780,
    place: "Adega Bonvivant, SP",
    date: "12 SET",
    day: "12",
    month: "SET",
    weekday: "Sexta",
    time: "20h00",
    xp: 450,
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&auto=format&fit=crop&q=80",
    includes: [
      "Seis rótulos safras 2010–2016",
      "Harmonização em cinco tempos",
      "Sommelier dedicado",
      "Traslado executivo"
    ],
    desc: "Uma vertical de Saint-Émilion conduzida pelo sommelier da casa, em sala privada e climatizada para doze pessoas.",
    participants: [8, 4, 12, 0]
  },
  {
    id: 1,
    title: "Voo panorâmico sobre a Serra da Mantiqueira",
    sub: "10 vagas",
    price: 1450,
    place: "Aeroporto de Jundiaí, SP",
    date: "20 SET",
    day: "20",
    month: "SET",
    weekday: "Sábado",
    time: "09h30",
    xp: 650,
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&auto=format&fit=crop&q=80",
    includes: [
      "Helicóptero biturbina",
      "Quarenta minutos de voo",
      "Brunch exclusivo na chegada",
      "Seguro premium incluso"
    ],
    desc: "Rota panorâmica com pouso privativo para brunch gourmet em fazenda histórica restaurada.",
    participants: [1, 13, 11, 0, 4, 7, 8, 14]
  },
  {
    id: 2,
    title: "Regata exclusiva do clube em Ilhabela",
    sub: "Dois dias",
    price: 2200,
    place: "Ilhabela, SP",
    date: "27 SET",
    day: "27",
    month: "SET",
    weekday: "Sábado",
    time: "10h00",
    xp: 900,
    image: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=800&auto=format&fit=crop&q=80",
    includes: [
      "Veleiro oceânico com capitão",
      "Hospedagem duas noites boutique",
      "Gastronomia completa a bordo",
      "Jantar de premiação privativo"
    ],
    desc: "Duas tripulações formadas por membros disputam a travessia litorânea com confraternização e jantares exclusivos.",
    participants: [13, 7, 3, 9, 1]
  },
  {
    id: 3,
    title: "Manhã de Golfe & Networking no São Fernando",
    sub: "8 vagas",
    price: 0,
    place: "Cotia, SP",
    date: "04 OUT",
    day: "04",
    month: "OUT",
    weekday: "Sábado",
    time: "08h00",
    xp: 250,
    image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&auto=format&fit=crop&q=80",
    includes: [
      "Green fee cortesia de membro",
      "Caddie dedicado e carrinho",
      "Café da manhã buffet no lounge",
      "Clínica com profissional do clube"
    ],
    desc: "Nove buracos em ritmo descontraído de conversa, com instrutor disponível tanto para veteranos quanto iniciantes.",
    participants: [7, 11, 15, 9]
  },
  {
    id: 4,
    title: "Masterclass de Whisky Japonês Raro",
    sub: "14 vagas",
    price: 620,
    place: "Bar Kioi, SP",
    date: "11 OUT",
    day: "11",
    month: "OUT",
    weekday: "Sábado",
    time: "19h30",
    xp: 400,
    image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=800&auto=format&fit=crop&q=80",
    includes: [
      "Cinco destilarias japonesas premiadas",
      "Tapas autorais do chef residente",
      "Copo Glencairn gravado de brinde",
      "Apostila de notas sensoriais"
    ],
    desc: "Uma imersão guiada por Yamazaki, Hakushu e destilarias artesanais independentes do Japão.",
    participants: [12, 5, 14, 1]
  },
  {
    id: 5,
    title: "Trilha Executiva na Reserva da Serra do Mar",
    sub: "20 vagas",
    price: 0,
    place: "Paranapiacaba, SP",
    date: "18 OUT",
    day: "18",
    month: "OUT",
    weekday: "Sábado",
    time: "07h30",
    xp: 300,
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&auto=format&fit=crop&q=80",
    includes: [
      "Guias credenciados e socorristas",
      "Transporte executivo ida e volta",
      "Kit trilha gourmet orgânico",
      "Parada com banho de cachoeira"
    ],
    desc: "Quatorze quilômetros em ritmo moderado de imersão natural. A troca de ideias flui muito além da sala de reunião.",
    participants: [5, 6, 2, 14, 12]
  },
  {
    id: 6,
    title: "Camarote Privado: Ópera no Theatro Municipal",
    sub: "6 vagas",
    price: 950,
    place: "Theatro Municipal, SP",
    date: "25 OUT",
    day: "25",
    month: "OUT",
    weekday: "Sábado",
    time: "20h00",
    xp: 500,
    image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800&auto=format&fit=crop&q=80",
    includes: [
      "Camarote central nobre",
      "Champagne e canapés no intervalo",
      "Acesso aos bastidores pós-apresentação",
      "Estacionamento VIP valet"
    ],
    desc: "Espetáculo de gala em camarote reservado, com visita guiada exclusiva aos bastidores após a apresentação.",
    participants: [4, 8, 7]
  },
  {
    id: 7,
    title: "Chef Privado: Experiência Gastronômica em Casa",
    sub: "Jantar para 8",
    price: 3400,
    place: "Sua residência, SP",
    date: "Sob agendamento",
    weekday: "Personalizado",
    time: "Sob agendamento",
    xp: 1200,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
    includes: [
      "Menu degustação de seis tempos",
      "Chef executivo e sous-chef",
      "Louças, taças e harmonização",
      "Limpeza e higienização completa"
    ],
    desc: "Um dos chefs mais premiados da alta gastronomia paulistana cozinhando diretamente na sua casa para seus convidados.",
    participants: [8, 0, 10]
  },
  {
    id: 8,
    title: "Track Day Exclusivo no Autódromo de Interlagos",
    sub: "6 vagas",
    price: 1890,
    place: "Autódromo de Interlagos, SP",
    date: "08 NOV",
    day: "08",
    month: "NOV",
    weekday: "Sábado",
    time: "08h30",
    xp: 800,
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&auto=format&fit=crop&q=80",
    includes: [
      "Vinte voltas de pilotagem pura",
      "Instrutor profissional de corrida",
      "Equipamento e macacão homologado",
      "Telemetria e vídeo on-board"
    ],
    desc: "Sessão privada de pista em carros de alta performance com telemetria profissional e coaching dinâmico de pilotagem.",
    participants: [11, 1, 13, 10]
  },
  {
    id: 9,
    title: "Retiro de Planejamento Estratégico em Trancoso",
    sub: "Três dias",
    price: 5600,
    place: "Trancoso, BA",
    date: "20 NOV",
    day: "20",
    month: "NOV",
    weekday: "Quinta",
    time: "Três dias",
    xp: 1500,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80",
    includes: [
      "Villa privativa à beira-mar",
      "Facilitação executiva sênior",
      "Pensão completa gourmet",
      "Sessão individual de alinhamento"
    ],
    desc: "Três dias dedicados a revisar roadmap, alianças e investimentos estratégicos em um cenário inspirador.",
    participants: [0, 7, 10, 15, 3]
  }
]

export const BENEFITS: BenefitItem[] = [
  {
    id: 0,
    partner: "Hospital Sírio Nobre",
    category: "Saúde",
    discount: "30% OFF",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80",
    desc: "Check-up executivo completo com resultado em 48h e médico de referência para a família."
  },
  {
    id: 1,
    partner: "Insper Executivo",
    category: "Educação",
    discount: "25% OFF",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80",
    desc: "Programas de curta duração em finanças, governança e sucessão, com vaga reservada por turma."
  },
  {
    id: 2,
    partner: "Azul Interline",
    category: "Viagem",
    discount: "20% OFF",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&fit=crop&q=80",
    desc: "Tarifa corporativa em voos domésticos e internacionais com acesso a salas VIP lounge."
  },
  {
    id: 3,
    partner: "Grupo Fasano",
    category: "Gastronomia",
    discount: "15% OFF",
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&auto=format&fit=crop&q=80",
    desc: "Reserva prioritária em todas as casas e cortesia de couvert especial para mesas de membros."
  },
  {
    id: 4,
    partner: "Localiza Prime",
    category: "Mobilidade",
    discount: "22% OFF",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop&q=80",
    desc: "Upgrade automático de categoria de veículos executivos e retirada sem fila em aeroportos."
  },
  {
    id: 5,
    partner: "Clínica Vitta Performance",
    category: "Saúde",
    discount: "35% OFF",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop&q=80",
    desc: "Medicina esportiva, bioimpedância e fisioterapia avançada com avaliação inicial cortesia."
  },
  {
    id: 6,
    partner: "BTG Pactual Digital",
    category: "Serviços",
    discount: "Taxa Zero",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80",
    desc: "Assessoria patrimonial dedicada, isenção de tarifas e acesso a fundos restritos a qualificados."
  },
  {
    id: 7,
    partner: "Casa Fontes Vinhos",
    category: "Gastronomia",
    discount: "18% OFF",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&auto=format&fit=crop&q=80",
    desc: "Curadoria de safras premiadas com entrega expressa climatizada e sommelier consultor."
  },
  {
    id: 8,
    partner: "Trilha Educação Corporativa",
    category: "Educação",
    discount: "40% OFF",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80",
    desc: "Programas customizados de aceleração de lideranças para equipes a partir de 8 participantes."
  },
  {
    id: 9,
    partner: "Sky Jet Aviation",
    category: "Viagem",
    discount: "12% OFF",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop&q=80",
    desc: "Horas de voo compartilhadas em jatos leves com atendimento conciergerie 24/7."
  },
  {
    id: 10,
    partner: "Belmonte Real Estate",
    category: "Serviços",
    discount: "20% OFF",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80",
    desc: "Avaliação mercadológica e curadoria de lajes corporativas AAA sem honorários iniciais."
  },
  {
    id: 11,
    partner: "Kaya Spa & Wellness",
    category: "Saúde",
    discount: "28% OFF",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&auto=format&fit=crop&q=80",
    desc: "Day spa executivo, massagens terapêuticas e circuito hidroterápico em unidades nobres."
  }
]

export const STAYS: StayItem[] = [
  {
    id: 0,
    name: "Fazenda Boa Vista",
    city: "Porto Feliz, SP",
    origPrice: 2400,
    memberPrice: 1920,
    badge: "20% OFF DE MEMBRO",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 1,
    name: "Hotel Emiliano Jardins",
    city: "São Paulo, SP",
    origPrice: 3200,
    memberPrice: 2560,
    badge: "20% OFF DE MEMBRO",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    name: "Pousada Casa Turquesa",
    city: "Paraty, RJ",
    origPrice: 1850,
    memberPrice: 1480,
    badge: "20% OFF DE MEMBRO",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    name: "Uxua Casa Hotel & Spa",
    city: "Trancoso, BA",
    origPrice: 2900,
    memberPrice: 2320,
    badge: "20% OFF DE MEMBRO",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    name: "Botanique Hotel & Spa",
    city: "Camanducaia, MG",
    origPrice: 3600,
    memberPrice: 2880,
    badge: "20% OFF DE MEMBRO",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 5,
    name: "Ponta dos Ganchos Exclusive Resort",
    city: "Gov. Celso Ramos, SC",
    origPrice: 4100,
    memberPrice: 3280,
    badge: "20% OFF DE MEMBRO",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 6,
    name: "Palácio Tangará Oetker",
    city: "São Paulo, SP",
    origPrice: 2750,
    memberPrice: 2200,
    badge: "20% OFF DE MEMBRO",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 7,
    name: "Vila Naiá Eco Resort",
    city: "Corumbau, BA",
    origPrice: 3300,
    memberPrice: 2640,
    badge: "20% OFF DE MEMBRO",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80"
  }
]

export const DEFAULT_USER: UserProfile = {
  name: "William Tabata",
  email: "william@tabatacapital.com",
  nationality: "brasileiro",
  cpf: "123.456.789-00",
  birthDate: "15/04/1988",
  phone: { dialCode: "55", number: "11999998888" },
  companyName: "Tabata Capital Gestão e Participações Ltda",
  cnpj: "12.345.678/0001-90",
  corporateEmail: "contato@tabatacapital.com",
  openingDate: "10/05/2018",
  role: "Sócio-diretor",
  company: "Tabata Capital",
  city: "São Paulo",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
  coverImage: "/utils/banners/pessoas.webp",
  bio: "Investidor em negócios inovadores e tecnologia. Conectando founders e gerando oportunidades estratégicas de alto impacto.",
  seeking: [
    "Novos modelos de investimento",
    "Startups em expansão",
    "Parcerias estratégicas",
    "Co-investidores série A"
  ],
  offering: [
    "Smart money & aceleração",
    "Acesso a family offices",
    "Governança & M&A",
    "Rede institucional"
  ]
}

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 0 || !parts[0]) return ""
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export function formatBRL(amount: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0
  }).format(amount)
}

export interface MemberStayReservation {
  id: string
  stayId: number
  stayName: string
  location: string
  image: string
  checkIn: string
  checkOut: string
  nights: number
  guests: number
  roomType: string
  totalPrice: number
  status: "confirmada" | "em_analise" | "concluida"
  confirmationCode: string
}

export const DEFAULT_MEMBER_STAYS: MemberStayReservation[] = [
  {
    id: "res-01",
    stayId: 0,
    stayName: "Fazenda Boa Vista",
    location: "Porto Feliz, SP",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80",
    checkIn: "24 de Outubro, 2026",
    checkOut: "27 de Outubro, 2026",
    nights: 3,
    guests: 2,
    roomType: "Villa Master com Piscina Privativa",
    totalPrice: 5760,
    status: "confirmada",
    confirmationCode: "CK-BV-8821"
  },
  {
    id: "res-02",
    stayId: 3,
    stayName: "Uxua Casa Hotel & Spa",
    location: "Trancoso, BA",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop&q=80",
    checkIn: "18 de Novembro, 2026",
    checkOut: "22 de Novembro, 2026",
    nights: 4,
    guests: 2,
    roomType: "Casa da Praça (Suíte Presidencial)",
    totalPrice: 9280,
    status: "confirmada",
    confirmationCode: "CK-UX-4490"
  }
]

export interface MemberSubscription {
  planName: string
  tierBadge: string
  status: "active" | "trialing" | "canceled"
  renewalDate: string
  priceMonthly: number
  priceAnnual: number
  period: "annual" | "monthly"
  paymentMethod: {
    brand: string
    last4: string
    expiry: string
  }
  invoices: {
    id: string
    date: string
    amount: number
    status: "paid" | "pending"
    pdfUrl?: string
  }[]
  features: string[]
}

export const DEFAULT_MEMBER_SUBSCRIPTION: MemberSubscription = {
  planName: "ClubKey Founder Black",
  tierBadge: "Membro Fundador VIP",
  status: "active",
  renewalDate: "15 de Outubro de 2026",
  priceMonthly: 1200,
  priceAnnual: 12900,
  period: "annual",
  paymentMethod: {
    brand: "Mastercard Black",
    last4: "8842",
    expiry: "11/29"
  },
  invoices: [
    {
      id: "INV-2026-009",
      date: "15/10/2025",
      amount: 12900,
      status: "paid"
    },
    {
      id: "INV-2025-009",
      date: "15/10/2024",
      amount: 10800,
      status: "paid"
    }
  ],
  features: [
    "Acesso total a todos os encontros mensais e eventos fechados",
    "Tarifas com até 35% de desconto no catálogo de hospedagens parceiras",
    "Canal direto com concierge VIP 24/7 para reservas e experiências",
    "Diretório completo de membros com introduções e conexões bilaterais",
    "Prioridade máxima na lista de espera para viagens e regatas exclusivas",
    "Clube de benefícios e parcerias com hospitais, aviação executiva e gastronomia"
  ]
}

export function slugify(text: string): string {
  if (!text) return ""
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function getEventSlug(event: EventItem | { title: string }): string {
  return slugify(event.title)
}

export function getExperienceSlug(exp: ExperienceItem | { title: string }): string {
  return slugify(exp.title)
}

export function getMemberSlug(member: Member | { name: string }): string {
  return slugify(member.name)
}

export function getStaySlug(stay: StayItem | { name?: string; stayName?: string }): string {
  if ("name" in stay && stay.name) return slugify(stay.name)
  if ("stayName" in stay && stay.stayName) return slugify(stay.stayName)
  return "reserva"
}

export const MONTH_OPTIONS = [
  { value: "todos", label: "Todos os meses" },
  { value: "JAN", label: "Janeiro" },
  { value: "FEV", label: "Fevereiro" },
  { value: "MAR", label: "Março" },
  { value: "ABR", label: "Abril" },
  { value: "MAI", label: "Maio" },
  { value: "JUN", label: "Junho" },
  { value: "JUL", label: "Julho" },
  { value: "AGO", label: "Agosto" },
  { value: "SET", label: "Setembro" },
  { value: "OUT", label: "Outubro" },
  { value: "NOV", label: "Novembro" },
  { value: "DEZ", label: "Dezembro" },
]

export const MONTH_MAP: Record<string, string> = {
  JAN: "janeiro",
  FEV: "fevereiro",
  MAR: "março",
  ABR: "abril",
  MAI: "maio",
  JUN: "junho",
  JUL: "julho",
  AGO: "agosto",
  SET: "setembro",
  OUT: "outubro",
  NOV: "novembro",
  DEZ: "dezembro",
}

export const MONTH_LABELS: Record<string, string> = {
  JAN: "Janeiro 2026",
  FEV: "Fevereiro 2026",
  MAR: "Março 2026",
  ABR: "Abril 2026",
  MAI: "Maio 2026",
  JUN: "Junho 2026",
  JUL: "Julho 2026",
  AGO: "Agosto 2026",
  SET: "Setembro 2026",
  OUT: "Outubro 2026",
  NOV: "Novembro 2026",
  DEZ: "Dezembro 2026",
}

export const MONTH_ORDER = [
  "JAN",
  "FEV",
  "MAR",
  "ABR",
  "MAI",
  "JUN",
  "JUL",
  "AGO",
  "SET",
  "OUT",
  "NOV",
  "DEZ",
]

export type TierId =
  | "membro"
  | "associado"
  | "titular"
  | "investidor"
  | "incorporador"
  | "patrono"

export interface TierDefinition {
  id: TierId
  order: number
  name: string
  subtitle: string
  minXp: number
  maxXp: number | null
  image: string
  color: string
  badgeColor:
    | "default"
    | "primary"
    | "secondary"
    | "accent"
    | "success"
    | "warning"
    | "danger"
  isProtectedBase?: boolean
  isSpecialPinnacle?: boolean
  description: string
  perks: string[]
}

export interface XpActivity {
  id: string
  title: string
  xp: number
  date: string
  category:
    | "onboarding"
    | "hospedagem"
    | "evento"
    | "experiencia"
    | "conexao"
    | "missao"
    | "bonus"
}

export interface MissionItem {
  id: string
  title: string
  description: string
  category:
    | "onboarding"
    | "estadias"
    | "eventos"
    | "experiencias"
    | "networking"
    | "ranking"
  xpReward: number
  tokensReward?: number
  currentProgress: number
  totalRequired: number
  isCompleted: boolean
  isClaimed: boolean
  actionUrl?: string
  actionLabel?: string
}

export interface LeaderboardMember {
  rank: number
  id: number
  name: string
  role: string
  company: string
  city: string
  avatar: string
  clubId: string
  clubName: string
  tierId: TierId
  xp: number
  ribTokens: number
  isCurrentUser?: boolean
}

export const TIERS_CONFIG: Record<TierId, TierDefinition> = {
  membro: {
    id: "membro",
    order: 1,
    name: "Membro",
    subtitle: "Boas-vindas ao ecossistema",
    minXp: 0,
    maxXp: 499,
    image: "/utils/gamification/tiers/01_membro.webp",
    color: "#8E8E93",
    badgeColor: "default",
    description:
      "Nível de entrada para novos membros. Complete seu cadastro e ative o 2FA para subir para Associado.",
    perks: [
      "Acesso ao catálogo de hospedagens parceiras",
      "Visualização de eventos abertos",
      "Diretório básico de membros",
    ],
  },
  associado: {
    id: "associado",
    order: 2,
    name: "Associado",
    subtitle: "Membro verificado e protegido",
    minXp: 500,
    maxXp: 1999,
    image: "/utils/gamification/tiers/02_associado.webp",
    color: "#3B82F6",
    badgeColor: "primary",
    isProtectedBase: true,
    description:
      "Base segura de membro ativo. Uma vez alcançado, você nunca é rebaixado abaixo de Associado.",
    perks: [
      "Tarifas exclusivas com até 20% OFF em estadias",
      "Confirmação de presença em eventos regulares",
      "Conexões diretas com outros membros",
      "2 Tokens RIB ao subir de nível",
    ],
  },
  titular: {
    id: "titular",
    order: 3,
    name: "Titular",
    subtitle: "Engajamento recorrente e influência",
    minXp: 2000,
    maxXp: 4999,
    image: "/utils/gamification/tiers/03_titular.webp",
    color: "#10B981",
    badgeColor: "success",
    description:
      "Nível intermediário para membros ativos em eventos, viagens e conexões estratégicas.",
    perks: [
      "Tarifas exclusivas com até 25% OFF em estadias",
      "Prioridade na lista de espera de experiências",
      "Acesso a jantares fechados e rodadas setoriais",
      "Concierge standard para reservas prioritárias",
      "2 Tokens RIB ao subir de nível",
    ],
  },
  investidor: {
    id: "investidor",
    order: 4,
    name: "Investidor",
    subtitle: "Alta circulação e liderança",
    minXp: 5000,
    maxXp: 9999,
    image: "/utils/gamification/tiers/04_investidor.webp",
    color: "#F59E0B",
    badgeColor: "warning",
    description:
      "Destaque sênior na comunidade com acesso prioritário a deal flow e comitês de investimento.",
    perks: [
      "Tarifas exclusivas com até 30% OFF em estadias",
      "Acesso a reuniões de deal flow e co-investimento",
      "Concierge VIP dedicado 24/7",
      "Convites para experiências internacionais",
      "2 Tokens RIB ao subir de nível",
    ],
  },
  incorporador: {
    id: "incorporador",
    order: 5,
    name: "Incorporador",
    subtitle: "Patamar máximo por pontuação",
    minXp: 10000,
    maxXp: 15999,
    image: "/utils/gamification/tiers/05_incorporador.webp",
    color: "#EC4899",
    badgeColor: "accent",
    description:
      "O mais alto tier regular da plataforma por pontuação contínua e contribuição estratégica.",
    perks: [
      "Tarifas com desconto máximo de até 35% OFF",
      "Acesso total a todas as experiências e regatas",
      "Canal direto com fundadores do ClubKey",
      "Mesa cativa nos encontros institucionais anuais",
      "2 Tokens RIB ao subir de nível",
    ],
  },
  patrono: {
    id: "patrono",
    order: 6,
    name: "Patrono",
    subtitle: "Posição #1 no Ranking Geral Global (> 16.000 XP)",
    minXp: 16000,
    maxXp: null,
    image: "/utils/gamification/tiers/06_patrono.webp",
    color: "#E85535",
    badgeColor: "danger",
    isSpecialPinnacle: true,
    description:
      "Título supremo e singular concedido exclusivamente ao membro com a maior pontuação de XP global (acima de 16.000 XP).",
    perks: [
      "Insígnia dourada suprema em todo o ecossistema",
      "Destaque comemorativo fixo no hall do Patrono",
      "Cota especial de 5 Tokens RIB bônus por trimestre",
      "Acesso irrestrito a todas as cotas e propriedades VIP",
    ],
  },
}

export const TIERS_LIST: TierDefinition[] = [
  TIERS_CONFIG.membro,
  TIERS_CONFIG.associado,
  TIERS_CONFIG.titular,
  TIERS_CONFIG.investidor,
  TIERS_CONFIG.incorporador,
  TIERS_CONFIG.patrono,
]

export const DEFAULT_CLAIMED_MILESTONES: Record<string, boolean> = {
  "membro_1": true,
  "membro_2": true,
  "membro_3": true,
  "membro_4": true,
  "associado_1": true,
  "associado_2": true,
  "associado_3": true,
  "associado_4": true,
}

export function getTierByXp(
  xp: number,
  isLeader: boolean = false,
  isTierFrozen: boolean = false,
  claimedMilestones: Record<string, boolean> = DEFAULT_CLAIMED_MILESTONES
): TierDefinition {
  if (isLeader && xp >= 16000) {
    return TIERS_CONFIG.patrono
  }
  if (isTierFrozen && xp >= 2000) {
    return TIERS_CONFIG.associado
  }

  const checkAllClaimed = (tierId: TierId): boolean => {
    return [1, 2, 3, 4].every((idx) => Boolean(claimedMilestones[`${tierId}_${idx}`]))
  }

  if (xp >= 10000) {
    if (checkAllClaimed("investidor")) {
      return TIERS_CONFIG.incorporador
    }
    return TIERS_CONFIG.investidor
  }
  if (xp >= 5000) {
    if (checkAllClaimed("titular")) {
      return TIERS_CONFIG.investidor
    }
    return TIERS_CONFIG.titular
  }
  if (xp >= 2000) {
    if (checkAllClaimed("associado")) {
      return TIERS_CONFIG.titular
    }
    return TIERS_CONFIG.associado
  }
  if (xp >= 500) {
    if (checkAllClaimed("membro")) {
      return TIERS_CONFIG.associado
    }
    return TIERS_CONFIG.membro
  }
  return TIERS_CONFIG.membro
}

export function getNextTier(currentTierId: TierId): TierDefinition | null {
  switch (currentTierId) {
    case "membro":
      return TIERS_CONFIG.associado
    case "associado":
      return TIERS_CONFIG.titular
    case "titular":
      return TIERS_CONFIG.investidor
    case "investidor":
      return TIERS_CONFIG.incorporador
    case "incorporador":
      return TIERS_CONFIG.patrono
    case "patrono":
      return null
  }
}

export function calculateTierProgress(
  xp: number,
  currentTier: TierDefinition
): {
  currentTier: TierDefinition
  nextTier: TierDefinition | null
  currentTierXp: number
  nextTierXp: number
  progressPercentage: number
  xpNeeded: number
} {
  const next = getNextTier(currentTier.id)
  if (!next || currentTier.maxXp === null) {
    return {
      currentTier,
      nextTier: null,
      currentTierXp: currentTier.minXp,
      nextTierXp: currentTier.minXp,
      progressPercentage: 100,
      xpNeeded: 0,
    }
  }

  const base = currentTier.minXp
  const target = next.minXp
  const range = target - base
  const earned = Math.max(0, xp - base)
  const percentage = Math.min(100, Math.round((earned / range) * 100))
  const needed = Math.max(0, target - xp)

  return {
    currentTier,
    nextTier: next,
    currentTierXp: base,
    nextTierXp: target,
    progressPercentage: percentage,
    xpNeeded: needed,
  }
}

export const DEFAULT_MISSIONS: MissionItem[] = [
  {
    id: "profile_completion",
    title: "Primeiro Passo",
    description: "Complete todos os dados cadastrais do seu perfil profissional.",
    category: "onboarding",
    xpReward: 250,
    tokensReward: 0,
    currentProgress: 1,
    totalRequired: 1,
    isCompleted: true,
    isClaimed: true,
    actionUrl: "/perfil",
    actionLabel: "Ver Perfil",
  },
  {
    id: "two_factor_auth",
    title: "Blindagem Digital",
    description: "Ative a autenticação de dois fatores (2FA) para proteger sua conta.",
    category: "onboarding",
    xpReward: 250,
    tokensReward: 0,
    currentProgress: 1,
    totalRequired: 1,
    isCompleted: true,
    isClaimed: true,
    actionUrl: "/perfil",
    actionLabel: "Configurar 2FA",
  },
  {
    id: "first_stay",
    title: "Pioneiro das Estadias",
    description: "Faça sua primeira reserva de hospedagem exclusiva no portal.",
    category: "estadias",
    xpReward: 300,
    tokensReward: 0,
    currentProgress: 2,
    totalRequired: 1,
    isCompleted: true,
    isClaimed: true,
    actionUrl: "/hospedagens",
    actionLabel: "Explorar Hospedagens",
  },
  {
    id: "events_attendee",
    title: "Habitué dos Encontros",
    description: "Confirme presença em pelo menos 3 eventos fechados do clube.",
    category: "eventos",
    xpReward: 400,
    tokensReward: 0,
    currentProgress: 2,
    totalRequired: 3,
    isCompleted: false,
    isClaimed: false,
    actionUrl: "/eventos",
    actionLabel: "Ver Agenda",
  },
  {
    id: "experiences_collector",
    title: "Colecionador de Experiências",
    description: "Adquira ou participe de 2 experiências e roteiros exclusivos.",
    category: "experiencias",
    xpReward: 500,
    tokensReward: 0,
    currentProgress: 1,
    totalRequired: 2,
    isCompleted: false,
    isClaimed: false,
    actionUrl: "/experiencias",
    actionLabel: "Ver Experiências",
  },
  {
    id: "connections_5",
    title: "Networking Starter",
    description: "Estabeleça conexão bilateral com 5 membros do clube.",
    category: "networking",
    xpReward: 250,
    tokensReward: 0,
    currentProgress: 4,
    totalRequired: 5,
    isCompleted: false,
    isClaimed: false,
    actionUrl: "/conexoes",
    actionLabel: "Conectar Membros",
  },
  {
    id: "connections_10",
    title: "Conector de Elite",
    description: "Alcance a marca de 10 conexões diretas na comunidade.",
    category: "networking",
    xpReward: 500,
    tokensReward: 0,
    currentProgress: 4,
    totalRequired: 10,
    isCompleted: false,
    isClaimed: false,
    actionUrl: "/conexoes",
    actionLabel: "Conectar Membros",
  },
  {
    id: "connections_20",
    title: "Super Connector",
    description: "Expanda sua rede com 20 conexões estratégicas ativas.",
    category: "networking",
    xpReward: 1000,
    tokensReward: 1,
    currentProgress: 4,
    totalRequired: 20,
    isCompleted: false,
    isClaimed: false,
    actionUrl: "/conexoes",
    actionLabel: "Conectar Membros",
  },
  {
    id: "patrono_aspirant",
    title: "Patrono Aspirante",
    description: "Alcance o Top 10 do ranking geral global de associados.",
    category: "ranking",
    xpReward: 1000,
    tokensReward: 2,
    currentProgress: 8,
    totalRequired: 10,
    isCompleted: false,
    isClaimed: false,
    actionUrl: "/keypass/ranking",
    actionLabel: "Ver Ranking",
  },
]

export const MOCK_LEADERBOARD: LeaderboardMember[] = [
  {
    rank: 1,
    id: 101,
    name: "Bernardo Fontes",
    role: "Managing Partner",
    company: "Apex Ventures",
    city: "São Paulo",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    clubId: "alpha",
    clubName: "Clube Alpha",
    tierId: "patrono",
    xp: 14850,
    ribTokens: 18,
  },
  {
    rank: 2,
    id: 102,
    name: "Beatriz Helena",
    role: "Presidente",
    company: "Helena Holding",
    city: "Rio de Janeiro",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    clubId: "inv",
    clubName: "Clube Investidores",
    tierId: "incorporador",
    xp: 12400,
    ribTokens: 14,
  },
  {
    rank: 3,
    id: 103,
    name: "Henrique Alcantara",
    role: "Founder & CEO",
    company: "Pulse Tech",
    city: "Belo Horizonte",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    clubId: "founders",
    clubName: "Founders Circle",
    tierId: "incorporador",
    xp: 11200,
    ribTokens: 12,
  },
  {
    rank: 4,
    id: 104,
    name: "Camila Yoshida",
    role: "Diretora de Produto",
    company: "Banco Livre",
    city: "São Paulo",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
    clubId: "alpha",
    clubName: "Clube Alpha",
    tierId: "investidor",
    xp: 8900,
    ribTokens: 10,
  },
  {
    rank: 5,
    id: 105,
    name: "Rodrigo Salles",
    role: "CEO",
    company: "Norte Logística",
    city: "Curitiba",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80",
    clubId: "founders",
    clubName: "Founders Circle",
    tierId: "investidor",
    xp: 7650,
    ribTokens: 8,
  },
  {
    rank: 6,
    id: 106,
    name: "Marcelo Vianna",
    role: "Sócio",
    company: "Vianna Real Estate",
    city: "São Paulo",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
    clubId: "inv",
    clubName: "Clube Investidores",
    tierId: "investidor",
    xp: 6200,
    ribTokens: 8,
  },
  {
    rank: 7,
    id: 107,
    name: "Luciana Morais",
    role: "Angel Investor",
    company: "Morais Capital",
    city: "Florianópolis",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    clubId: "inv",
    clubName: "Clube Investidores",
    tierId: "investidor",
    xp: 5400,
    ribTokens: 6,
  },
  {
    rank: 8,
    id: 0,
    name: "William Tabata",
    role: "Sócio-diretor",
    company: "Tabata Capital",
    city: "São Paulo",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    clubId: "alpha",
    clubName: "Clube Alpha",
    tierId: "titular",
    xp: 4000,
    ribTokens: 6,
    isCurrentUser: true,
  },
  {
    rank: 9,
    id: 108,
    name: "Gabriel Medeiros",
    role: "CTO",
    company: "CloudScale",
    city: "Campinas",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
    clubId: "founders",
    clubName: "Founders Circle",
    tierId: "titular",
    xp: 2600,
    ribTokens: 4,
  },
  {
    rank: 10,
    id: 109,
    name: "Juliana Peixoto",
    role: "VP de Expansão",
    company: "Varejo Brasil",
    city: "Porto Alegre",
    avatar:
      "https://images.unsplash.com/photo-1534751516642-a171edd25218?w=400&auto=format&fit=crop&q=80",
    clubId: "alpha",
    clubName: "Clube Alpha",
    tierId: "titular",
    xp: 2350,
    ribTokens: 4,
  },
]

export const DEFAULT_XP_ACTIVITIES: XpActivity[] = [
  {
    id: "act-01",
    title: "Onboarding Completo de Membro",
    xp: 250,
    date: "10 de Outubro, 2026",
    category: "onboarding",
  },
  {
    id: "act-02",
    title: "Ativação de Autenticação 2FA",
    xp: 250,
    date: "10 de Outubro, 2026",
    category: "onboarding",
  },
  {
    id: "act-03",
    title: "Reserva confirmada: Fazenda Boa Vista",
    xp: 300,
    date: "12 de Outubro, 2026",
    category: "hospedagem",
  },
  {
    id: "act-04",
    title: "Reserva confirmada: Uxua Casa Hotel & Spa",
    xp: 300,
    date: "14 de Outubro, 2026",
    category: "hospedagem",
  },
  {
    id: "act-05",
    title: "Presença confirmada no Jantar de Abertura",
    xp: 200,
    date: "18 de Outubro, 2026",
    category: "evento",
  },
  {
    id: "act-06",
    title: "Presença confirmada no Encontro de Founders",
    xp: 200,
    date: "20 de Outubro, 2026",
    category: "evento",
  },
  {
    id: "act-07",
    title: "Experiência garantida: Degustação Rara de Vinhos",
    xp: 250,
    date: "22 de Outubro, 2026",
    category: "experiencia",
  },
  {
    id: "act-08",
    title: "Conexões estabelecidas no Clube Alpha",
    xp: 200,
    date: "25 de Outubro, 2026",
    category: "conexao",
  },
  {
    id: "act-09",
    title: "Conquista resgatada: Pioneiro das Estadias",
    xp: 300,
    date: "28 de Outubro, 2026",
    category: "missao",
  },
  {
    id: "act-10",
    title: "Promoção para o Nível Titular (+2 RIB)",
    xp: 600,
    date: "01 de Novembro, 2026",
    category: "bonus",
  },
]

export interface ChatMessage {
  id: string
  senderId: "user" | number
  text: string
  timestamp: string
  read: boolean
}

export const DEFAULT_CHAT_MESSAGES: Record<number, ChatMessage[]> = {
  2: [
    {
      id: "msg-2-1",
      senderId: 2,
      text: "Olá William! Vi seu perfil aqui no ClubKey e notei sua experiência com estruturação e venture capital. Achei excelente a tese da sua empresa!",
      timestamp: "10:42",
      read: false,
    },
    {
      id: "msg-2-2",
      senderId: 2,
      text: "Você vai participar do próximo encontro em São Paulo? Se for, adoraria marcar um café para trocarmos sinergias sobre captação institucional.",
      timestamp: "10:44",
      read: false,
    },
  ],
  3: [
    {
      id: "msg-3-1",
      senderId: "user",
      text: "Olá Eduardo, prazer em conectar! Acompanho os investimentos da Horizon Capital no setor de logística.",
      timestamp: "Ontem, 16:20",
      read: true,
    },
    {
      id: "msg-3-2",
      senderId: 3,
      text: "Fala William! Tudo ótimo por aqui. Vamos marcar um almoço sim, estou avaliando duas rodadas no setor que podem fazer muito sentido para co-investimento.",
      timestamp: "Ontem, 16:35",
      read: true,
    },
  ],
}
