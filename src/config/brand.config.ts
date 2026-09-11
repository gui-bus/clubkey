export interface BrandColors {
  primary: string
  primaryHover: string
  primaryLight: string
  primaryDark: string
  primaryMuted: string
  primaryGlow: string
  secondary: string
  selectionBg: string
  selectionText: string
}

export interface BrandAssets {
  logoText: string
  logoMain: string
  logoDark?: string
  logoLight?: string
  favicon: string
  ogImage: string
}

export interface BrandLinks {
  subscription: string
  rooms: string
  login: string
  instagram: string
  contactEmail: string
  website: string
}

export interface BrandConfig {
  id: string
  name: string
  shortName: string
  tagline: string
  description: string
  colors: {
    light: BrandColors
    dark: BrandColors
  }
  assets: BrandAssets
  links: BrandLinks
}

export const brandPresets: Record<string, BrandConfig> = {
  clubkey: {
    id: "clubkey",
    name: "ClubKey",
    shortName: "ClubKey",
    tagline: "Ative sua Key e pague menos para viajar",
    description:
      "Acesso exclusivo a milhares de hospedagens premium com descontos de até 60% e curadoria de especialistas.",
    colors: {
      light: {
        primary: "#FF6847",
        primaryHover: "#E85535",
        primaryLight: "#FFF0ED",
        primaryDark: "#D94524",
        primaryMuted: "rgba(255, 104, 71, 0.15)",
        primaryGlow: "rgba(255, 104, 71, 0.4)",
        secondary: "#141416",
        selectionBg: "rgba(255, 104, 71, 0.2)",
        selectionText: "#FF6847",
      },
      dark: {
        primary: "#FF6847",
        primaryHover: "#FF7D5F",
        primaryLight: "#241410",
        primaryDark: "#D94524",
        primaryMuted: "rgba(255, 104, 71, 0.15)",
        primaryGlow: "rgba(255, 104, 71, 0.4)",
        secondary: "#161616",
        selectionBg: "rgba(255, 104, 71, 0.2)",
        selectionText: "#FF6847",
      },
    },
    assets: {
      logoText: "CLUBKEY",
      logoMain: "/logos/logo_white.svg",
      logoDark: "/logos/logo_white.svg",
      logoLight: "/logos/logo_black.svg",
      favicon: "/favicon.ico",
      ogImage: "/og.png",
    },
    links: {
      subscription: "https://clubkey.io/subscription",
      rooms: "https://clubkey.io/rooms",
      login: "/sign-in",
      instagram: "https://instagram.com/clubkey.io",
      contactEmail: "contato@clubkey.io",
      website: "https://clubkey.io",
    },
  },
  ocean: {
    id: "ocean",
    name: "OceanClub",
    shortName: "OceanClub",
    tagline: "Sua chave para viagens marítimas e resorts exclusivos",
    description:
      "Descubra as melhores estadias litorâneas e resorts com tarifas exclusivas para membros.",
    colors: {
      light: {
        primary: "#0284C7",
        primaryHover: "#0369A1",
        primaryLight: "#F0F9FF",
        primaryDark: "#075985",
        primaryMuted: "rgba(2, 132, 199, 0.15)",
        primaryGlow: "rgba(2, 132, 199, 0.4)",
        secondary: "#0F172A",
        selectionBg: "rgba(2, 132, 199, 0.2)",
        selectionText: "#0284C7",
      },
      dark: {
        primary: "#38BDF8",
        primaryHover: "#0EA5E9",
        primaryLight: "#082F49",
        primaryDark: "#0284C7",
        primaryMuted: "rgba(56, 189, 248, 0.15)",
        primaryGlow: "rgba(56, 189, 248, 0.4)",
        secondary: "#0B1120",
        selectionBg: "rgba(56, 189, 248, 0.2)",
        selectionText: "#38BDF8",
      },
    },
    assets: {
      logoText: "OCEANCLUB",
      logoMain: "",
      favicon: "/favicon.ico",
      ogImage: "/og.png",
    },
    links: {
      subscription: "https://oceanclub.io/subscription",
      rooms: "https://oceanclub.io/rooms",
      login: "/sign-in",
      instagram: "https://oceanclub.io",
      contactEmail: "contato@oceanclub.io",
      website: "https://oceanclub.io",
    },
  },
}

const rawTenant = process.env.NEXT_PUBLIC_TENANT || ""
const activeTenantKey = rawTenant.toLowerCase().trim() || "clubkey"

export const brandConfig: BrandConfig =
  brandPresets[activeTenantKey] || brandPresets.clubkey

export function generateBrandCssVariables(config: BrandConfig = brandConfig): string {
  const light = config.colors.light
  const dark = config.colors.dark

  return `
    :root {
      --primary: ${light.primary};
      --ring: ${light.primary};
      --chart-1: ${light.primary};
      --sidebar-primary: ${light.primary};
      --sidebar-ring: ${light.primary};
      --brand-primary: ${light.primary};
      --brand-primary-hover: ${light.primaryHover};
      --brand-primary-light: ${light.primaryLight};
      --brand-primary-dark: ${light.primaryDark};
      --brand-primary-muted: ${light.primaryMuted};
      --brand-primary-glow: ${light.primaryGlow};
      --brand-secondary: ${light.secondary};
      --selection-bg: ${light.selectionBg};
      --selection-text: ${light.selectionText};
    }
    .dark {
      --primary: ${dark.primary};
      --ring: ${dark.primary};
      --chart-1: ${dark.primary};
      --sidebar-primary: ${dark.primary};
      --sidebar-ring: ${dark.primary};
      --brand-primary: ${dark.primary};
      --brand-primary-hover: ${dark.primaryHover};
      --brand-primary-light: ${dark.primaryLight};
      --brand-primary-dark: ${dark.primaryDark};
      --brand-primary-muted: ${dark.primaryMuted};
      --brand-primary-glow: ${dark.primaryGlow};
      --brand-secondary: ${dark.secondary};
      --selection-bg: ${dark.selectionBg};
      --selection-text: ${dark.selectionText};
    }
  `
}
