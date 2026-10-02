import type { Metadata, Viewport } from "next"
import { ThemeProvider } from "next-themes"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { Toast } from "@clubkey/ui"
import { cn } from "@clubkey/utils"

import { siteConfig } from "@/src/config/site"
import { fontVariables } from "@/src/config/fonts"

import "./globals.css"

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      default: `${siteConfig.name} Admin | Painel Administrativo`,
      template: `%s | ${siteConfig.name} Admin`,
    },
    description: "Painel de gestão, controle e métricas da plataforma ClubKey.",
    keywords: [
      siteConfig.name,
      "Admin",
      "Painel Administrativo",
      "Gestão de Membros",
      "Eventos",
      "Hospedagens",
      "Sinistros",
      "Proteção Key",
    ],
    authors: siteConfig.authors,
    creator: siteConfig.creator,
    openGraph: {
      type: "website",
      url: siteConfig.url,
      title: `${siteConfig.name} Admin | Painel Administrativo`,
      description: "Painel de gestão, controle e métricas da plataforma ClubKey.",
      siteName: `${siteConfig.name} Admin`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteConfig.name} Admin | Painel Administrativo`,
      description: "Painel de gestão, controle e métricas da plataforma ClubKey.",
    },
    robots: {
      index: false,
      follow: false,
    },
    icons: {
      icon: siteConfig.favicon || "/favicon.ico",
      shortcut: siteConfig.favicon || "/favicon.ico",
      apple: siteConfig.favicon || "/favicon.ico",
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={cn("antialiased scroll-smooth", fontVariables)}
    >
      <head>
        <link rel="icon" href={siteConfig.favicon || "/favicon.ico"} />
      </head>
      <body className="mx-auto w-full max-w-440 bg-background text-foreground selection:bg-brand-primary/20 selection:text-brand-primary flex flex-col min-h-screen antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NuqsAdapter>{children}</NuqsAdapter>
          <Toast position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}
