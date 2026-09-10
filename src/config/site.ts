import { env } from "./env"

export const siteConfig = {
  name: "ClubKey",
  shortName: "ClubKey",
  description: "Ative sua Key e pague menos para viajar. Acesso exclusivo a milhares de hospedagens premium com descontos de até 60% e curadoria de especialistas.",
  url: env.NEXT_PUBLIC_SITE_URL || "https://clubkey.io",
  ogImage: `${env.NEXT_PUBLIC_SITE_URL}/og.png`,
  authors: [
    {
      name: "ClubKey Team",
      url: "https://clubkey.io",
    },
  ],
  creator: "ClubKey",
  links: {
    subscription: "https://clubkey.io/subscription",
    rooms: "https://clubkey.io/rooms",
    login: "https://clubkey.io/login",
    instagram: "https://instagram.com/clubkey.io",
  },
  contact: {
    email: "contato@clubkey.io",
  },
  locales: ["pt", "en"],
  defaultLocale: "pt",
  analytics: {
    google: env.NEXT_PUBLIC_GA_ID || "",
  },
}

export type SiteConfig = typeof siteConfig
