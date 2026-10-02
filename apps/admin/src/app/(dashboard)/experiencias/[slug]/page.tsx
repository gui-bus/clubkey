import { redirect } from "next/navigation"

interface ExperiencePageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ExperiencePage({
  params,
}: ExperiencePageProps): Promise<never> {
  const resolvedParams = await params
  redirect(`/experiencias/${resolvedParams.slug}/detalhes`)
}
