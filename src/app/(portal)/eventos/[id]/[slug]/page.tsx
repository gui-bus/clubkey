import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { EventDetailClient } from "@/src/components/portal/EventDetailClient"
import { EVENTS } from "@/src/data/portalData"

interface PageProps {
  params: Promise<{ id: string; slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const event = EVENTS.find((e) => e.id === Number(id))

  if (!event) {
    return {
      title: "Evento Não Encontrado",
      description: "O evento solicitado não foi localizado na agenda do ClubKey.",
    }
  }

  const title = `${event.title} — ${event.place}`
  const description = `${event.weekday}, ${event.day} de ${event.month} às ${event.time}. ${event.desc}`
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

export default async function EventPage({
  params,
}: PageProps): Promise<React.JSX.Element> {
  const { id } = await params
  const eventId = Number(id)
  const event = EVENTS.find((e) => e.id === eventId)

  if (!event) {
    notFound()
  }

  return <EventDetailClient eventId={eventId} />
}
