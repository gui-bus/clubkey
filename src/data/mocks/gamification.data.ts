import type {
  BadgeDefinition,
  LeaderboardMember,
  MissionItem,
  TierDefinition,
  TierId,
  WeeklyDropItem,
  XpActivity,
} from "@/src/types"

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
    isProtectedBase: true,
    description:
      "Tier de entrada vitalício e protegido. Complete seu cadastro e ative o 2FA para subir para Associado.",
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
      "Base segura de membro ativo. Tier vitalício e protegido: não há rebaixamento a partir deste patamar.",
    perks: [
      "Tarifas exclusivas com até 20% OFF em estadias",
      "Confirmação de presença em eventos regulares",
      "Conexões diretas com outros membros",
      "2 Tokens RIB ao subir de tier",
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
      "Tier intermediário para membros ativos em eventos, viagens e conexões estratégicas.",
    perks: [
      "Tarifas exclusivas com até 25% OFF em estadias",
      "Prioridade na lista de espera de experiências",
      "Acesso a jantares fechados e rodadas setoriais",
      "Concierge standard para reservas prioritárias",
      "2 Tokens RIB ao subir de tier",
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
      "2 Tokens RIB ao subir de tier",
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
      "2 Tokens RIB ao subir de tier",
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

export const DEFAULT_TIERS: TierDefinition[] = TIERS_LIST

export const DEFAULT_CLAIMED_MILESTONES: Record<string, boolean> = {
  membro_1: true,
  membro_2: true,
  membro_3: true,
  membro_4: true,
  associado_1: true,
  associado_2: true,
  associado_3: true,
  associado_4: true,
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
    return [1, 2, 3, 4].every((idx) =>
      Boolean(claimedMilestones[`${tierId}_${idx}`])
    )
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
    description:
      "Complete todos os dados cadastrais do seu perfil profissional.",
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
    description:
      "Ative a autenticação de dois fatores (2FA) para proteger sua conta.",
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
    description:
      "Adquira ou participe de 2 experiências e roteiros exclusivos.",
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
    id: 3,
    firstName: "Eduardo",
    lastName: "Prado",
    role: "Fundador",
    company: "Prado Agro",
    city: "Ribeirão Preto",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
    tierId: "patrono",
    xp: 16850,
    ribTokens: 18,
    change: 0,
  },
  {
    rank: 2,
    id: 0,
    firstName: "Ana Beatriz",
    lastName: "Ramos",
    role: "Sócia-fundadora",
    company: "Vero Capital",
    city: "São Paulo",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    tierId: "incorporador",
    xp: 13400,
    ribTokens: 14,
    change: 1,
  },
  {
    rank: 3,
    id: 7,
    firstName: "Marcelo",
    lastName: "Bittencourt",
    role: "Presidente do Conselho",
    company: "Grupo Bittencourt",
    city: "Porto Alegre",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    tierId: "incorporador",
    xp: 11200,
    ribTokens: 12,
    change: -1,
  },
  {
    rank: 4,
    id: 2,
    firstName: "Camila",
    lastName: "Yoshida",
    role: "Diretora de Produto",
    company: "Banco Livre",
    city: "São Paulo",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
    tierId: "investidor",
    xp: 8900,
    ribTokens: 10,
    change: 0,
  },
  {
    rank: 5,
    id: 1,
    firstName: "Rodrigo",
    lastName: "Salles",
    role: "CEO",
    company: "Norte Logística",
    city: "Curitiba",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80",
    tierId: "investidor",
    xp: 7650,
    ribTokens: 8,
    change: 2,
  },
  {
    rank: 6,
    id: 4,
    firstName: "Juliana",
    lastName: "Meireles",
    role: "Sócia",
    company: "Meireles Advogados",
    city: "Belo Horizonte",
    avatar:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format&fit=crop&q=80",
    tierId: "investidor",
    xp: 6200,
    ribTokens: 8,
    change: -1,
  },
  {
    rank: 7,
    id: 5,
    firstName: "Fernando",
    lastName: "Tanaka",
    role: "CTO",
    company: "Órbita Health",
    city: "Florianópolis",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    tierId: "investidor",
    xp: 5400,
    ribTokens: 6,
    change: 0,
  },
  {
    rank: 8,
    id: 999,
    firstName: "William",
    lastName: "Tabata",
    role: "Sócio-diretor",
    company: "Tabata Capital",
    city: "São Paulo",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    tierId: "titular",
    xp: 4000,
    ribTokens: 6,
    isCurrentUser: true,
    change: 1,
  },
  {
    rank: 9,
    id: 9,
    firstName: "Otávio",
    lastName: "Nogueira",
    role: "Diretor Financeiro",
    company: "Vetor Energia",
    city: "Rio de Janeiro",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
    tierId: "titular",
    xp: 2600,
    ribTokens: 4,
    change: -1,
  },
  {
    rank: 10,
    id: 8,
    firstName: "Larissa",
    lastName: "Fontes",
    role: "Fundadora",
    company: "Casa Fontes",
    city: "São Paulo",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    tierId: "titular",
    xp: 2350,
    ribTokens: 4,
    change: 0,
  },
]

export const MOCK_MONTHLY_LEADERBOARD: LeaderboardMember[] = [
  {
    rank: 1,
    id: 0,
    firstName: "Ana Beatriz",
    lastName: "Ramos",
    role: "Sócia-fundadora",
    company: "Vero Capital",
    city: "São Paulo",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    tierId: "incorporador",
    xp: 2450,
    ribTokens: 4,
    change: 2,
  },
  {
    rank: 2,
    id: 999,
    firstName: "William",
    lastName: "Tabata",
    role: "Sócio-diretor",
    company: "Tabata Capital",
    city: "São Paulo",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    tierId: "titular",
    xp: 1850,
    ribTokens: 2,
    isCurrentUser: true,
    change: 3,
  },
  {
    rank: 3,
    id: 3,
    firstName: "Eduardo",
    lastName: "Prado",
    role: "Fundador",
    company: "Prado Agro",
    city: "Ribeirão Preto",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
    tierId: "patrono",
    xp: 1600,
    ribTokens: 3,
    change: -1,
  },
  {
    rank: 4,
    id: 1,
    firstName: "Rodrigo",
    lastName: "Salles",
    role: "CEO",
    company: "Norte Logística",
    city: "Curitiba",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80",
    tierId: "investidor",
    xp: 1450,
    ribTokens: 2,
    change: 1,
  },
  {
    rank: 5,
    id: 2,
    firstName: "Camila",
    lastName: "Yoshida",
    role: "Diretora de Produto",
    company: "Banco Livre",
    city: "São Paulo",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
    tierId: "investidor",
    xp: 1200,
    ribTokens: 2,
    change: -1,
  },
  {
    rank: 6,
    id: 7,
    firstName: "Marcelo",
    lastName: "Bittencourt",
    role: "Presidente do Conselho",
    company: "Grupo Bittencourt",
    city: "Porto Alegre",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    tierId: "incorporador",
    xp: 950,
    ribTokens: 2,
    change: -2,
  },
  {
    rank: 7,
    id: 5,
    firstName: "Fernando",
    lastName: "Tanaka",
    role: "CTO",
    company: "Órbita Health",
    city: "Florianópolis",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    tierId: "investidor",
    xp: 900,
    ribTokens: 1,
    change: 0,
  },
  {
    rank: 8,
    id: 4,
    firstName: "Juliana",
    lastName: "Meireles",
    role: "Sócia",
    company: "Meireles Advogados",
    city: "Belo Horizonte",
    avatar:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format&fit=crop&q=80",
    tierId: "investidor",
    xp: 850,
    ribTokens: 1,
    change: 0,
  },
  {
    rank: 9,
    id: 8,
    firstName: "Larissa",
    lastName: "Fontes",
    role: "Fundadora",
    company: "Casa Fontes",
    city: "São Paulo",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    tierId: "titular",
    xp: 650,
    ribTokens: 1,
    change: 1,
  },
  {
    rank: 10,
    id: 9,
    firstName: "Otávio",
    lastName: "Nogueira",
    role: "Diretor Financeiro",
    company: "Vetor Energia",
    city: "Rio de Janeiro",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
    tierId: "titular",
    xp: 500,
    ribTokens: 0,
    change: -1,
  },
]

export const MOCK_QUARTERLY_LEADERBOARD: LeaderboardMember[] = [
  {
    rank: 1,
    id: 3,
    firstName: "Eduardo",
    lastName: "Prado",
    role: "Fundador",
    company: "Prado Agro",
    city: "Ribeirão Preto",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
    tierId: "patrono",
    xp: 5800,
    ribTokens: 6,
    change: 0,
  },
  {
    rank: 2,
    id: 0,
    firstName: "Ana Beatriz",
    lastName: "Ramos",
    role: "Sócia-fundadora",
    company: "Vero Capital",
    city: "São Paulo",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    tierId: "incorporador",
    xp: 4900,
    ribTokens: 5,
    change: 1,
  },
  {
    rank: 3,
    id: 7,
    firstName: "Marcelo",
    lastName: "Bittencourt",
    role: "Presidente do Conselho",
    company: "Grupo Bittencourt",
    city: "Porto Alegre",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    tierId: "incorporador",
    xp: 4200,
    ribTokens: 4,
    change: -1,
  },
  {
    rank: 4,
    id: 999,
    firstName: "William",
    lastName: "Tabata",
    role: "Sócio-diretor",
    company: "Tabata Capital",
    city: "São Paulo",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    tierId: "titular",
    xp: 3400,
    ribTokens: 4,
    isCurrentUser: true,
    change: 2,
  },
  {
    rank: 5,
    id: 2,
    firstName: "Camila",
    lastName: "Yoshida",
    role: "Diretora de Produto",
    company: "Banco Livre",
    city: "São Paulo",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
    tierId: "investidor",
    xp: 3100,
    ribTokens: 3,
    change: -1,
  },
  {
    rank: 6,
    id: 1,
    firstName: "Rodrigo",
    lastName: "Salles",
    role: "CEO",
    company: "Norte Logística",
    city: "Curitiba",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80",
    tierId: "investidor",
    xp: 2800,
    ribTokens: 3,
    change: 0,
  },
  {
    rank: 7,
    id: 4,
    firstName: "Juliana",
    lastName: "Meireles",
    role: "Sócia",
    company: "Meireles Advogados",
    city: "Belo Horizonte",
    avatar:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format&fit=crop&q=80",
    tierId: "investidor",
    xp: 2200,
    ribTokens: 2,
    change: 0,
  },
  {
    rank: 8,
    id: 5,
    firstName: "Fernando",
    lastName: "Tanaka",
    role: "CTO",
    company: "Órbita Health",
    city: "Florianópolis",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    tierId: "investidor",
    xp: 1900,
    ribTokens: 2,
    change: 0,
  },
  {
    rank: 9,
    id: 9,
    firstName: "Otávio",
    lastName: "Nogueira",
    role: "Diretor Financeiro",
    company: "Vetor Energia",
    city: "Rio de Janeiro",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
    tierId: "titular",
    xp: 1300,
    ribTokens: 1,
    change: 0,
  },
  {
    rank: 10,
    id: 8,
    firstName: "Larissa",
    lastName: "Fontes",
    role: "Fundadora",
    company: "Casa Fontes",
    city: "São Paulo",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    tierId: "titular",
    xp: 1150,
    ribTokens: 1,
    change: 0,
  },
]

export const WEEKLY_DROPS_CYCLE_SECONDS = 310460

export const DEFAULT_WEEKLY_DROPS: WeeklyDropItem[] = [
  {
    id: "drop_founders_coffee",
    title: "Café com Fundadores",
    description:
      "Inicie uma conversa no Messenger com 2 membros que são Founders, Sócios ou C-Level.",
    category: "networking",
    xpReward: 250,
    tokensReward: 0,
    expiresAt: "86h 14m 20s",
    daysRemaining: 3,
    initialSecondsRemaining: WEEKLY_DROPS_CYCLE_SECONDS,
    currentProgress: 1,
    totalRequired: 2,
    isCompleted: false,
    isClaimed: false,
    actionUrl: "/conexoes",
    actionLabel: "Conectar Membros",
    tag: "Drop da Semana",
  },
  {
    id: "drop_weekend_stay",
    title: "Escapada de Primavera",
    description:
      "Faça uma reserva de hospedagem no catálogo para estadias com tarifa exclusiva de membro.",
    category: "estadias",
    xpReward: 500,
    tokensReward: 1,
    expiresAt: "86h 14m 20s",
    daysRemaining: 3,
    initialSecondsRemaining: WEEKLY_DROPS_CYCLE_SECONDS,
    currentProgress: 0,
    totalRequired: 1,
    isCompleted: false,
    isClaimed: false,
    actionUrl: "/hospedagens",
    actionLabel: "Ver Acomodações",
    tag: "Bônus +1 Token RIB",
  },
  {
    id: "drop_rsvp_summit",
    title: "Vaga VIP no Painel Global",
    description:
      "Garanta seu assento presencial no Painel Estratégico de Atração de Capital Global.",
    category: "eventos",
    xpReward: 350,
    tokensReward: 0,
    expiresAt: "38h 28m 50s",
    daysRemaining: 1,
    initialSecondsRemaining: 138530,
    currentProgress: 0,
    totalRequired: 1,
    isCompleted: false,
    isClaimed: false,
    actionUrl: "/eventos",
    actionLabel: "Confirmar Presença",
    tag: "Últimas Vagas",
  },
]

export const DEFAULT_BADGES: BadgeDefinition[] = [
  {
    id: "badge_early_adopter",
    name: "Membro Fundador",
    description:
      "Ingressou no Clube na temporada inaugural de 2026 com passe VIP vitalício.",
    iconName: "ShieldStar",
    category: "especial",
    unlockedAt: "10 de Outubro, 2026",
    isUnlocked: true,
    progress: 1,
    maxProgress: 1,
    xpBonus: 500,
    tokensBonus: 1,
  },
  {
    id: "badge_blindagem_digital",
    name: "Blindagem Digital",
    description:
      "Ativou autenticação em dois fatores (2FA) protegendo sua credencial de membro.",
    iconName: "ShieldCheck",
    category: "onboarding",
    unlockedAt: "10 de Outubro, 2026",
    isUnlocked: true,
    progress: 1,
    maxProgress: 1,
    xpBonus: 250,
  },
  {
    id: "badge_pioneiro_estadias",
    name: "Pioneiro das Estadias",
    description:
      "Realizou e concluiu as primeiras reservas de acomodações no catálogo ClubKey.",
    iconName: "Buildings",
    category: "estadias",
    unlockedAt: "14 de Outubro, 2026",
    isUnlocked: true,
    progress: 2,
    maxProgress: 2,
    xpBonus: 300,
  },
  {
    id: "badge_globe_trotter",
    name: "Globe Trotter",
    description:
      "Hospede-se em 3 destinos diferentes para desbloquear a insígnia de viajante global.",
    iconName: "Compass",
    category: "estadias",
    isUnlocked: false,
    progress: 2,
    maxProgress: 3,
    xpBonus: 600,
    tokensBonus: 1,
  },
  {
    id: "badge_sommelier_clube",
    name: "Sommelier do Clube",
    description:
      "Participe de 2 degustações guiadas ou experiências exclusivas de enologia.",
    iconName: "Wine",
    category: "experiencias",
    isUnlocked: false,
    progress: 1,
    maxProgress: 2,
    xpBonus: 400,
  },
  {
    id: "badge_super_conector",
    name: "Super Conector",
    description: "Estabeleça 10 conexões diretas na rede executiva de membros.",
    iconName: "UsersThree",
    category: "networking",
    isUnlocked: false,
    progress: 4,
    maxProgress: 10,
    xpBonus: 750,
    tokensBonus: 1,
  },
  {
    id: "badge_presenca_vip",
    name: "Presença VIP",
    description:
      "Confirme presença em 5 encontros presenciais, jantares ou fóruns do clube.",
    iconName: "Sparkle",
    category: "eventos",
    isUnlocked: false,
    progress: 2,
    maxProgress: 5,
    xpBonus: 500,
  },
  {
    id: "badge_top_ranking",
    name: "Aspirante ao Top 5",
    description:
      "Alcance o seleto Top 5 do ranking geral global de associados.",
    iconName: "Crown",
    category: "ranking",
    isUnlocked: false,
    progress: 0,
    maxProgress: 1,
    xpBonus: 1200,
    tokensBonus: 2,
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
    title: "Promoção para o Tier Titular (+2 RIB)",
    xp: 600,
    date: "01 de Novembro, 2026",
    category: "bonus",
  },
]
