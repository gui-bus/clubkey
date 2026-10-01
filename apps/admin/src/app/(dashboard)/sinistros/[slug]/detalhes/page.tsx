import type { Metadata } from "next"

import { SinistroDetailClient } from "@/src/components/admin/sinistros/sinistroDetailClient"

export const metadata: Metadata = {
  title: "Detalhes do Sinistro — ClubKey Admin",
  description: "Informações detalhadas, laudos periciais e regulação do sinistro.",
}

interface SinistroDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function SinistroDetailPage({ params }: SinistroDetailPageProps) {
  const { slug } = await params
  return <SinistroDetailClient slug={slug} />
}
