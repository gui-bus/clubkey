import { redirect } from "next/navigation"

interface EventPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function EventPage({
  params,
}: EventPageProps): Promise<never> {
  const resolvedParams = await params
  redirect(`/eventos/${resolvedParams.slug}/detalhes`)
}
