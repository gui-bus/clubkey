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
  iconDark?: string
  iconLight?: string
  iconCream?: string
  iconWhite?: string
  productCard?: string
  favicon: string
  ogImage: string
}

export interface BrandLinks {
  subscription: string
  rooms: string
  login: string
  instagram: string
  instagramUser?: string
  whatsapp?: string
  whatsappUrl?: string
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
        primaryDark: "#E85535",
        primaryMuted: "rgba(255, 104, 71, 0.15)",
        primaryGlow: "rgba(255, 104, 71, 0.4)",
        secondary: "#141416",
        selectionBg: "rgba(255, 104, 71, 0.2)",
        selectionText: "#FF6847",
      },
      dark: {
        primary: "#FF6847",
        primaryHover: "#E85535",
        primaryLight: "#241410",
        primaryDark: "#E85535",
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
      iconDark: "/logos/icon_white.svg",
      iconLight: "/logos/icon_black.svg",
      iconWhite: "/logos/icon_white.svg",
      productCard: "/utils/subscription/clubkey/product_card.webp",
      favicon: "/favicon.ico",
      ogImage: "/og.png",
    },
    links: {
      subscription: "/subscription",
      rooms: "/hospedagens",
      login: "/sign-in",
      instagram: "https://instagram.com/clubkey.io",
      instagramUser: "clubkey.io",
      contactEmail: "contato@clubkey.io",
      website: "https://clubkey.io",
    },
  },
  viverde: {
    id: "viverde",
    name: "Viverde",
    shortName: "Viverde",
    tagline: "Um jeito mais leve de viver",
    description:
      "Acesso exclusivo a acomodações selecionadas, refúgios de alto padrão na serra e condições exclusivas de hospitalidade para membros Viverde.",
    colors: {
      light: {
        primary: "#B88A2D",
        primaryHover: "#9E7421",
        primaryLight: "#FDFBF7",
        primaryDark: "#9E7421",
        primaryMuted: "rgba(184, 138, 45, 0.15)",
        primaryGlow: "rgba(184, 138, 45, 0.4)",
        secondary: "#24271D",
        selectionBg: "rgba(184, 138, 45, 0.2)",
        selectionText: "#B88A2D",
      },
      dark: {
        primary: "#B88A2D",
        primaryHover: "#D8CCA8",
        primaryLight: "#261E10",
        primaryDark: "#9E7421",
        primaryMuted: "rgba(184, 138, 45, 0.15)",
        primaryGlow: "rgba(184, 138, 45, 0.4)",
        secondary: "#161616",
        selectionBg: "rgba(184, 138, 45, 0.2)",
        selectionText: "#B88A2D",
      },
    },
    assets: {
      logoText: "VIVERDE",
      logoMain: "/logos/viverde/logo_white.svg",
      logoDark: "/logos/viverde/logo_white.svg",
      logoLight: "/logos/viverde/logo_black.svg",
      iconDark: "/logos/viverde/icon_white.svg",
      iconLight: "/logos/viverde/icon_black.svg",
      iconCream: "/logos/viverde/icon_cream.svg",
      iconWhite: "/logos/viverde/icon_white.svg",
      productCard: "/utils/subscription/viverde/product_card.webp",
      favicon: "/logos/viverde/favicon.ico",
      ogImage: "/og.png",
    },
    links: {
      subscription: "/subscription",
      rooms: "/hospedagens",
      login: "/sign-in",
      instagram: "https://instagram.com/viverdeitaipava",
      instagramUser: "@viverdeitaipava",
      whatsapp: "(21) 99786-2692",
      whatsappUrl:
        "https://wa.me/5521997862692?text=Ol%C3%A1%2C%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20Viverde%20Itaipava.",
      contactEmail: "contato@viverdeitaipava.com.br",
      website: "https://viverdeitaipava.com.br",
    },
  },
}

const rawTenant = process.env.NEXT_PUBLIC_TENANT || ""
const activeTenantKey = rawTenant.toLowerCase().trim() || "clubkey"

export const brandConfig: BrandConfig =
  brandPresets[activeTenantKey] || brandPresets.clubkey

export function generateBrandCssVariables(
  config: BrandConfig = brandConfig
): string {
  const light = config.colors.light
  const dark = config.colors.dark
  const fontHeadingOverride =
    config.id === "viverde" ? "--font-heading: 'Gotham', sans-serif;" : ""

  return `
    :root {
      ${fontHeadingOverride}
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
      ${fontHeadingOverride}
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
