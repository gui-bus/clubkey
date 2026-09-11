import { brandConfig } from "./brand.config"
import { env } from "./env"

export const siteConfig = {
  name: brandConfig.name,
  shortName: brandConfig.shortName,
  description: brandConfig.description,
  url: env.NEXT_PUBLIC_SITE_URL || brandConfig.links.website,
  ogImage: `${env.NEXT_PUBLIC_SITE_URL || brandConfig.links.website}${brandConfig.assets.ogImage}`,
  favicon: brandConfig.assets.favicon,
  authors: [
    {
      name: `${brandConfig.name} Team`,
      url: brandConfig.links.website,
    },
  ],
  creator: brandConfig.name,
  links: {
    subscription: brandConfig.links.subscription,
    rooms: brandConfig.links.rooms,
    login: brandConfig.links.login,
    instagram: brandConfig.links.instagram,
  },
  contact: {
    email: brandConfig.links.contactEmail,
  },
  locales: ["pt", "en"],
  defaultLocale: "pt",
  analytics: {
    google: env.NEXT_PUBLIC_GA_ID || "",
  },
}

export type SiteConfig = typeof siteConfig
