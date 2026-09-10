import { Metadata, Viewport } from "next"

import { GoogleAnalytics } from "@next/third-parties/google"

import { ThemeProvider } from "@/src/components/common/themeProvider"

import { cn } from "@/src/lib/utils/utils"

import { fontVariables } from "@/src/config/fonts"
import { siteConfig } from "@/src/config/site"

import { NuqsAdapter } from "nuqs/adapters/next/app"
import "@/src/app/globals.css"

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  const ogUrl = new URL(`${siteConfig.url}/api/og`)
  ogUrl.searchParams.set("title", siteConfig.name)
  ogUrl.searchParams.set("description", siteConfig.description)

  return {
    title: {
      default: `${siteConfig.name} | Ative sua Key e pague menos para viajar`,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: [
      "ClubKey",
      "Viagens de Luxo",
      "Hospedagem Premium",
      "Clube de Viagens",
      "Descontos Last Minute",
      "Hoteis Boutique",
      "NFT Access",
    ],
    authors: siteConfig.authors,
    creator: siteConfig.creator,
    openGraph: {
      type: "website",
      url: siteConfig.url,
      title: `${siteConfig.name} - Ative sua Key e pague menos para viajar`,
      description: siteConfig.description,
      siteName: siteConfig.name,
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteConfig.name} - Ative sua Key e pague menos para viajar`,
      description: siteConfig.description,
      images: [ogUrl.toString()],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): Promise<React.JSX.Element> {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={cn("antialiased scroll-smooth", fontVariables)}
    >
      <body className="mx-auto w-full max-w-440 bg-background text-foreground selection:bg-[#FF6847]/20 selection:text-[#FF6847]">
        <ThemeProvider>
          <NuqsAdapter>{children}</NuqsAdapter>
        </ThemeProvider>
        {siteConfig.analytics.google && (
          <GoogleAnalytics gaId={siteConfig.analytics.google} />
        )}
      </body>
    </html>
  )
}
