import type { Metadata } from "next"

import { assertModule, brandConfig } from "@/src/config/brand.config"

export const metadata: Metadata = {
  title: "Experiências Exclusivas & Enogastronomia",
  description: `Momentos gastronômicos, esportivos, náuticos e culturais com acesso restrito e vagas limitadas para membros do ${brandConfig.name}.`,
}

export default function ExperienciasLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  assertModule("experiences")

  return <>{children}</>
}
