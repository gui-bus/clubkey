import type { Metadata } from "next"

import { assertModule, brandConfig } from "@/src/config/brand.config"

export const metadata: Metadata = {
  title: "Acomodações & Estadias Exclusivas",
  description: `Viaje o ano todo pagando tarifas exclusivas de membro e até 60% OFF em reservas last minute no ${brandConfig.name}.`,
}

export default function HospedagensLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  assertModule("stays")

  return <>{children}</>
}
