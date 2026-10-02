import type { Metadata } from "next"
import { ThemeProvider } from "next-themes"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { Toast } from "@clubkey/ui"

import "./globals.css"

export const metadata: Metadata = {
  title: "ClubKey Admin — Painel Administrativo",
  description: "Painel de gestão, controle e métricas da plataforma ClubKey.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
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
