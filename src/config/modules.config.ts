export type SystemModule =
  | "home"
  | "stays"
  | "networking"
  | "events"
  | "experiences"
  | "benefits"
  | "keypass"

export interface BrandModulesConfig {
  home: boolean
  stays: boolean
  networking: boolean
  events: boolean
  experiences: boolean
  benefits: boolean
  keypass: boolean
}

export interface ModuleDefinition {
  id: SystemModule
  label: string
  description: string
  routePrefixes: string[]
  defaultHref: string
  requiresAuth: boolean
  portalNav: boolean
  publicNav: boolean
}

export const SYSTEM_MODULE_REGISTRY: Record<SystemModule, ModuleDefinition> = {
  home: {
    id: "home",
    label: "Início",
    description: "Visão geral e painel dinâmico do associado.",
    routePrefixes: ["/"],
    defaultHref: "/",
    requiresAuth: false,
    portalNav: true,
    publicNav: true,
  },
  stays: {
    id: "stays",
    label: "Hospedagens",
    description: "Vilas e acomodações selecionadas com tarifas exclusivas.",
    routePrefixes: [
      "/hospedagens",
      "/minhas-hospedagens",
      "/hospedagens/minhas-hospedagens",
    ],
    defaultHref: "/hospedagens",
    requiresAuth: false,
    portalNav: true,
    publicNav: true,
  },
  networking: {
    id: "networking",
    label: "Conexões",
    description: "Diretório de membros e rede de networking qualificada.",
    routePrefixes: ["/conexoes", "/pessoas", "/conexoes/minhas-conexoes"],
    defaultHref: "/conexoes",
    requiresAuth: true,
    portalNav: true,
    publicNav: false,
  },
  events: {
    id: "events",
    label: "Eventos",
    description: "Jantares, encontros estratégicos e fóruns privados.",
    routePrefixes: [
      "/eventos",
      "/agenda",
      "/meus-eventos",
      "/eventos/meus-eventos",
    ],
    defaultHref: "/eventos",
    requiresAuth: true,
    portalNav: true,
    publicNav: false,
  },
  experiences: {
    id: "experiences",
    label: "Experiências",
    description: "Vivências sob medida e lifestyle pelo mundo.",
    routePrefixes: ["/experiencias"],
    defaultHref: "/experiencias",
    requiresAuth: true,
    portalNav: true,
    publicNav: false,
  },
  benefits: {
    id: "benefits",
    label: "Benefícios",
    description: "Vantagens e condições exclusivas de parceiros do clube.",
    routePrefixes: ["/beneficios"],
    defaultHref: "/beneficios",
    requiresAuth: true,
    portalNav: true,
    publicNav: false,
  },
  keypass: {
    id: "keypass",
    label: "KeyPass",
    description: "Metas, missões, pontuação de XP e tiers de associado.",
    routePrefixes: ["/keypass"],
    defaultHref: "/keypass",
    requiresAuth: true,
    portalNav: true,
    publicNav: false,
  },
}

export function getModuleByPath(pathname: string): SystemModule | null {
  if (typeof pathname !== "string") return null
  const normalized = pathname.toLowerCase().trim()

  if (normalized === "" || normalized === "/") {
    return "home"
  }

  if (
    normalized.startsWith("/perfil") ||
    normalized.startsWith("/entrar") ||
    normalized.startsWith("/login") ||
    normalized.startsWith("/cadastro") ||
    normalized.startsWith("/assinatura") ||
    normalized.startsWith("/esqueci-minha-senha") ||
    normalized.startsWith("/redefinir-senha")
  ) {
    return null
  }

  const moduleEntries = Object.values(SYSTEM_MODULE_REGISTRY)

  for (const mod of moduleEntries) {
    if (mod.id === "home") continue
    for (const prefix of mod.routePrefixes) {
      if (
        normalized === prefix ||
        normalized.startsWith(`${prefix}/`) ||
        normalized.startsWith(`${prefix}?`)
      ) {
        return mod.id
      }
    }
  }

  if (normalized === "/" || normalized === "") {
    return "home"
  }

  return null
}

export function isPathAllowed(
  pathname: string,
  modules: BrandModulesConfig
): boolean {
  const mod = getModuleByPath(pathname)
  if (!mod) return true
  return Boolean(modules[mod])
}

export function getEnabledModulesList(
  modules: BrandModulesConfig
): SystemModule[] {
  return (Object.keys(modules) as SystemModule[]).filter((key) =>
    Boolean(modules[key])
  )
}

export function assertModuleEnabled(
  module: SystemModule,
  modules: BrandModulesConfig
): void {
  if (!modules[module]) {
    const error = new Error("NEXT_HTTP_ERROR_FALLBACK;404") as Error & {
      digest?: string
    }
    error.digest = "NEXT_HTTP_ERROR_FALLBACK;404"
    throw error
  }
}
