import type { Metadata } from "next"

import { assertModule, brandConfig } from "@/src/config/brand.config"

export const metadata: Metadata = {
  title: "Agenda de Eventos & Encontros",
  description: `Encontros mensais, jantares de networking, visitas técnicas e rodas de conversa exclusivas para membros do ${brandConfig.name}.`,
}

export default function EventosLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  assertModule("events")

  return <>{children}</>
}
