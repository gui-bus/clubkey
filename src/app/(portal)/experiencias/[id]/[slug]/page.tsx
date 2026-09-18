import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { EXPERIENCES, formatBRL } from "@/src/data/portalData"

import { ExperienceDetailClient } from "@/src/components/portal/experienceDetailClient"

interface PageProps {
  params: Promise<{ id: string; slug: string }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params
  const experience = EXPERIENCES.find((e) => e.id === Number(id))

  if (!experience) {
    return {
      title: "Experiência Não Encontrada",
      description:
        "A experiência solicitada não foi localizada no catálogo do ClubKey.",
    }
  }

  const priceLabel =
    experience.price === 0
      ? "Gratuita para Membros"
      : formatBRL(experience.price)
  const title = `${experience.title} — ${experience.place}`
  const description = `${experience.date} • ${priceLabel}. ${experience.desc}`
  const image = experience.image || "/utils/banners/experiencias.webp"

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ClubKey`,
      description,
      images: [{ url: image, alt: experience.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ClubKey`,
      description,
      images: [image],
    },
  }
}

export default async function ExperiencePage({
  params,
}: PageProps): Promise<React.JSX.Element> {
  const { id } = await params
  const expId = Number(id)
  const experience = EXPERIENCES.find((e) => e.id === expId)

  if (!experience) {
    notFound()
  }

  return <ExperienceDetailClient expId={expId} />
}
