import type { Metadata } from "next"

import { getRoomDetail } from "@/src/data/mockRoomDetails"

import { RoomDetailClient } from "@/src/components/rooms/roomDetailClient"

import { brandConfig } from "@/src/config/brand.config"

interface PageProps {
  params: Promise<{ id: string; slug: string }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id, slug } = await params
  const room = getRoomDetail(id, slug)

  if (!room) {
    return {
      title: "Hospedagem Não Encontrada",
      description: `A hospedagem solicitada não foi localizada no catálogo do ${brandConfig.name}.`,
    }
  }

  const title = `${room.title} — ${room.city?.name || "Hospedagem"}, ${room.city?.keys_coverage_states?.name || "Brasil"}`
  const description = `${room.property_type} para até ${room.max_guest} hóspedes em ${room.city?.name}. Tarifa exclusiva de membro ${brandConfig.name}.`
  const image = room.main_img?.url || "/utils/banners/img_01.png"

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${brandConfig.name}`,
      description,
      images: [{ url: image, alt: room.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${brandConfig.name}`,
      description,
      images: [image],
    },
  }
}

export default async function HospedagemPage({
  params,
}: PageProps): Promise<React.JSX.Element> {
  const { id, slug } = await params
  return <RoomDetailClient roomId={id} roomSlug={slug} />
}
