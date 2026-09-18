import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { MEMBERS } from "@/src/data/portalData"

import { MemberProfileDetailClient } from "@/src/components/portal/memberProfileDetailClient"

interface PageProps {
  params: Promise<{ id: string; slug: string }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params
  const member = MEMBERS.find((m) => m.id === Number(id))

  if (!member) {
    return {
      title: "Membro Não Encontrado",
      description:
        "O perfil de membro solicitado não foi localizado na rede ClubKey.",
    }
  }

  const roleText =
    member.role && member.company
      ? `${member.role} na ${member.company}`
      : member.role || "Membro Executivo"
  const fullName = `${member.firstName} ${member.lastName}`
  const title = `${fullName} — ${roleText}`
  const description = `Conecte-se com ${fullName} (${roleText}) em ${member.city} através do círculo restrito de membros do ClubKey.`
  const image = member.avatar || member.image || "/utils/banners/pessoas.webp"

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ClubKey`,
      description,
      images: [{ url: image, alt: fullName }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ClubKey`,
      description,
      images: [image],
    },
  }
}

export default async function MemberProfilePage({
  params,
}: PageProps): Promise<React.JSX.Element> {
  const { id } = await params
  const memberId = Number(id)
  const member = MEMBERS.find((m) => m.id === memberId)

  if (!member) {
    notFound()
  }

  return <MemberProfileDetailClient memberId={memberId} />
}
