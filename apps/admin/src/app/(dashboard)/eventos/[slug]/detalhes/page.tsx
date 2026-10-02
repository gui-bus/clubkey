import type { Metadata } from "next"

import { EventDetailClient } from "@/src/components/admin/events/eventDetailClient"

export const metadata: Metadata = {
  title: "Detalhes do Evento | Painel Admin ClubKey",
  description: "Edição de dados, participantes e lotação do evento.",
}

interface EventDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function EventDetailPage({
  params,
}: EventDetailPageProps): Promise<React.JSX.Element> {
  const resolvedParams = await params
  return <EventDetailClient slug={resolvedParams.slug} />
}
