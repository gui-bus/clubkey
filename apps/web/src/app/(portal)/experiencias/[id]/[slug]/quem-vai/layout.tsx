import type { Metadata } from "next"

import { EXPERIENCES } from "@/src/data/portalData"

import { brandConfig } from "@/src/config/brand.config"

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ id: string; slug: string }>
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; slug: string }>
}): Promise<Metadata> {
  const { id } = await params
  const experience = EXPERIENCES.find((e) => e.id === Number(id))
  return {
    title: experience
      ? `Quem vai: ${experience.title}`
      : "Participantes da Experiência",
    description: experience
      ? `Veja os membros confirmados na experiência ${experience.title} no ${brandConfig.name}.`
      : "Lista de presença na experiência.",
  }
}

export default function QuemVaiExperienciaLayout({
  children,
}: LayoutProps): React.JSX.Element {
  return <>{children}</>
}
