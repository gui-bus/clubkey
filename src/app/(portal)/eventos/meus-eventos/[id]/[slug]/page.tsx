import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { EVENTS } from "@/src/data/portalData"

import { MemberEventDetailClient } from "@/src/components/portal/memberEventDetailClient"

interface PageProps {
  params: Promise<{ id: string; slug: string }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params
  const event = EVENTS.find((e) => e.id === Number(id))

  if (!event) {
    return {
      title: "Evento Confirmado",
      description: "Detalhes do evento confirmado pelo membro.",
    }
  }

  const title = `Ingresso Confirmado: ${event.title} — ${event.place}`
  const description = `Credencial VIP confirmada para ${event.title} em ${event.place} (${event.weekday}, ${event.day} de ${event.month} às ${event.time}).`
  const image = event.image || "/utils/banners/agenda.webp"

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ClubKey`,
      description,
      images: [{ url: image, alt: event.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ClubKey`,
      description,
      images: [image],
    },
  }
}

export default async function MeuEventoDetailPage({
  params,
}: PageProps): Promise<React.JSX.Element> {
  const { id } = await params
  const eventId = Number(id)
  const event = EVENTS.find((e) => e.id === eventId)

  if (!event) {
    notFound()
  }

  return <MemberEventDetailClient eventId={eventId} />
}
