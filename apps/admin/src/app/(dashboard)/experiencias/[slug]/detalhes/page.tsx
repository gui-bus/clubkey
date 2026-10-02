import type { Metadata } from "next"

import { ExperienceDetailClient } from "@/src/components/admin/experiences/experienceDetailClient"

export const metadata: Metadata = {
  title: "Detalhes da Experiência",
  description: "Edição de dados, participantes e vagas da experiência.",
}

interface ExperienceDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ExperienceDetailPage({
  params,
}: ExperienceDetailPageProps): Promise<React.JSX.Element> {
  const resolvedParams = await params
  return <ExperienceDetailClient slug={resolvedParams.slug} />
}
