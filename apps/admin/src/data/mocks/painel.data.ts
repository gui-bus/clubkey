export interface PainelAlert {
  id: string
  title: string
  description: string
  count: number
  badgeText: string
  badgeVariant: "warning" | "danger" | "info" | "primary"
  href: string
  iconName: "ShieldCheck" | "CreditCard" | "Users" | "Receipt"
}

export interface PainelRecentActivity {
  id: string
  type: "RESERVATION" | "CLAIM" | "USER" | "PAYMENT" | "CREDIT"
  title: string
  description: string
  timeAgo: string
  user: {
    name: string
    avatar?: string
    initials: string
    role?: string
  }
  amount?: number
  statusBadge: {
    label: string
    variant: "success" | "warning" | "danger" | "info" | "neutral" | "primary"
  }
}

export interface PainelTierStat {
  level: "BRONZE" | "PRATA" | "OURO" | "BLACK" | "DIAMANTE" | "PATRONO"
  label: string
  count: number
  percentage: number
  colorClass: string
  bgClass: string
}

export interface PainelSystemIntegration {
  id: string
  name: string
  category: string
  status: "ONLINE" | "DEGRADED" | "OFFLINE"
  latency: string
  lastSync: string
}

export interface PainelMonthlyRevenue {
  month: string
  revenue: number
  reservations: number
  projected: boolean
}

export const MOCK_PAINEL_ALERTS: PainelAlert[] = [
  {
    id: "alert-1",
    title: "Sinistros em Regulação",
    description: "2 ocorrências aguardam despacho pericial e anexos de laudo",
    count: 2,
    badgeText: "Ação Imediata",
    badgeVariant: "warning",
    href: "/sinistros",
    iconName: "ShieldCheck",
  },
  {
    id: "alert-2",
    title: "Esteira de Crédito",
    description: "1 nova solicitação de antecipação aguarda deliberação de risco",
    count: 1,
    badgeText: "Novo Pedido",
    badgeVariant: "primary",
    href: "/credito",
    iconName: "CreditCard",
  },
  {
    id: "alert-3",
    title: "Validações KYC / Contas",
    description: "4 associados com documentação pendente de verificação cadastral",
    count: 4,
    badgeText: "Pendente",
    badgeVariant: "info",
    href: "/usuarios",
    iconName: "Users",
  },
  {
    id: "alert-4",
    title: "Faturas Proteção Key",
    description: "6 faturas de cobertura com vencimento nos próximos 5 dias",
    count: 6,
    badgeText: "Vencendo",
    badgeVariant: "danger",
    href: "/protecao-key",
    iconName: "Receipt",
  },
]

export const MOCK_PAINEL_TIER_DISTRIBUTION: PainelTierStat[] = [
  {
    level: "BRONZE",
    label: "Bronze Member",
    count: 480,
    percentage: 38.5,
    colorClass: "text-amber-700 dark:text-amber-500",
    bgClass: "bg-amber-700/80",
  },
  {
    level: "PRATA",
    label: "Prata Member",
    count: 320,
    percentage: 25.6,
    colorClass: "text-zinc-500 dark:text-zinc-400",
    bgClass: "bg-zinc-400",
  },
  {
    level: "OURO",
    label: "Ouro VIP",
    count: 240,
    percentage: 19.2,
    colorClass: "text-yellow-600 dark:text-yellow-400",
    bgClass: "bg-yellow-500",
  },
  {
    level: "BLACK",
    label: "Black Tier",
    count: 124,
    percentage: 9.9,
    colorClass: "text-zinc-900 dark:text-zinc-100",
    bgClass: "bg-zinc-800 dark:bg-zinc-200",
  },
  {
    level: "DIAMANTE",
    label: "Diamante Executive",
    count: 62,
    percentage: 5.0,
    colorClass: "text-cyan-600 dark:text-cyan-400",
    bgClass: "bg-cyan-500",
  },
  {
    level: "PATRONO",
    label: "Patrono Founder",
    count: 22,
    percentage: 1.8,
    colorClass: "text-purple-600 dark:text-purple-400",
    bgClass: "bg-purple-600",
  },
]

export const MOCK_PAINEL_SYSTEM_INTEGRATIONS: PainelSystemIntegration[] = [
  {
    id: "sys-1",
    name: "Motor de Hospedagens (Stays API)",
    category: "PMS & Channel Manager",
    status: "ONLINE",
    latency: "38ms",
    lastSync: "Há 2 min",
  },
  {
    id: "sys-2",
    name: "Fireblocks Wallet Vault",
    category: "Custódia Digital & Token RIB",
    status: "ONLINE",
    latency: "64ms",
    lastSync: "Há 1 min",
  },
  {
    id: "sys-3",
    name: "Gateway Pagar.me / Stripe",
    category: "Processamento de Pagamentos",
    status: "ONLINE",
    latency: "45ms",
    lastSync: "Há 30 seg",
  },
  {
    id: "sys-4",
    name: "Mecanismo de Sinistros & Apólices",
    category: "Proteção Ribus Seguradora",
    status: "ONLINE",
    latency: "28ms",
    lastSync: "Há 5 min",
  },
  {
    id: "sys-5",
    name: "Motor de Mensageria & Notificações",
    category: "WhatsApp & Push Gateway",
    status: "ONLINE",
    latency: "19ms",
    lastSync: "Tempo real",
  },
]

export const MOCK_PAINEL_RECENT_ACTIVITIES: PainelRecentActivity[] = [
  {
    id: "act-1",
    type: "RESERVATION",
    title: "Nova Reserva Confirmada",
    description: "Villa Trancoso Paradise • 4 noites (Check-in 14/10)",
    timeAgo: "Há 12 minutos",
    user: {
      name: "Rodrigo Sanches",
      initials: "RS",
      role: "Black Member",
    },
    amount: 14800,
    statusBadge: {
      label: "Confirmada",
      variant: "success",
    },
  },
  {
    id: "act-2",
    type: "CLAIM",
    title: "Abertura de Sinistro #SIN-2026-89",
    description: "Danos elétricos após tempestade • Mansão Joá",
    timeAgo: "Há 38 minutos",
    user: {
      name: "Camila Guimarães",
      initials: "CG",
      role: "Host Premium",
    },
    amount: 3200,
    statusBadge: {
      label: "Em Análise",
      variant: "warning",
    },
  },
  {
    id: "act-3",
    type: "PAYMENT",
    title: "Liquidação Fatura Proteção Key",
    description: "Grupo Alpha Hospedagens • Cobertura 12 unidades",
    timeAgo: "Há 1 hora",
    user: {
      name: "Grupo Alpha",
      initials: "GA",
      role: "Workspace Host",
    },
    amount: 8940,
    statusBadge: {
      label: "Liquidado",
      variant: "success",
    },
  },
  {
    id: "act-4",
    type: "USER",
    title: "Novo Associado Verificado",
    description: "Adesão aprovada via onboarding automatizado",
    timeAgo: "Há 2 horas",
    user: {
      name: "Eduardo Furtado",
      initials: "EF",
      role: "Ouro VIP",
    },
    statusBadge: {
      label: "Ativo",
      variant: "neutral",
    },
  },
  {
    id: "act-5",
    type: "CREDIT",
    title: "Solicitação de Antecipação de Recebíveis",
    description: "Workspace Gramado Boutique • Temporada Inverno",
    timeAgo: "Há 3 horas",
    user: {
      name: "Beatriz Nogueira",
      initials: "BN",
      role: "Patrono Founder",
    },
    amount: 45000,
    statusBadge: {
      label: "Pendente Risco",
      variant: "primary",
    },
  },
]

export const MOCK_PAINEL_REVENUE_CHART: PainelMonthlyRevenue[] = [
  { month: "Mai", revenue: 185000, reservations: 142, projected: false },
  { month: "Jun", revenue: 210000, reservations: 168, projected: false },
  { month: "Jul", revenue: 275000, reservations: 214, projected: false },
  { month: "Ago", revenue: 245000, reservations: 195, projected: false },
  { month: "Set", revenue: 290000, reservations: 232, projected: false },
  { month: "Out", revenue: 340000, reservations: 278, projected: true },
]
