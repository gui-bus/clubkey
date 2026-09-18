import type { Metadata } from "next"

import { DEFAULT_MEMBER_STAYS } from "@/src/data/portalData"

import { MemberStayDetailClient } from "@/src/components/portal/memberStayDetailClient"

interface PageProps {
  params: Promise<{ id: string; slug: string }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params
  const stay = DEFAULT_MEMBER_STAYS.find((s) => s.id === id)

  if (!stay) {
    return {
      title: "Reserva de Hospedagem",
      description: "Detalhes e comprovante da estadia do membro.",
    }
  }

  const title = `Reserva: ${stay.stayName} — ${stay.location}`
  const description = `Comprovante de reserva confirmada (${stay.confirmationCode}) em ${stay.stayName} (${stay.checkIn} a ${stay.checkOut}).`
  const image = stay.image || "/utils/banners/img_01.png"

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ClubKey`,
      description,
      images: [{ url: image, alt: stay.stayName }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ClubKey`,
      description,
      images: [image],
    },
  }
}

export default async function MinhaHospedagemPage({
  params,
}: PageProps): Promise<React.JSX.Element> {
  const { id } = await params
  return <MemberStayDetailClient stayId={id} />
}
