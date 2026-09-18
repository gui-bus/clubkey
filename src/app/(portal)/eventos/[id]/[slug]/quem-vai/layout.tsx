import type { Metadata } from "next"

import { EVENTS } from "@/src/data/portalData"

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
  const event = EVENTS.find((e) => e.id === Number(id))
  return {
    title: event ? `Quem vai: ${event.title}` : "Participantes do Evento",
    description: event
      ? `Veja a lista de membros e convidados confirmados para o encontro ${event.title} no ClubKey.`
      : "Participantes confirmados no encontro.",
  }
}

export default function QuemVaiLayout({
  children,
}: LayoutProps): React.JSX.Element {
  return <>{children}</>
}
