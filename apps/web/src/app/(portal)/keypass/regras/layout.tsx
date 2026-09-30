import type { Metadata } from "next"

import { brandConfig } from "@/src/config/brand.config"

export const metadata: Metadata = {
  title: "Tiers & Regulamento | KeyPass",
  description: `Entenda os critérios de pontuação, progressão de tiers, congelamento e benefícios exclusivos do KeyPass no ${brandConfig.name}.`,
}

export default function RegrasLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return <>{children}</>
}
