import { redirect } from "next/navigation"

interface SinistroPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function SinistroPage({ params }: SinistroPageProps) {
  const { slug } = await params
  redirect(`/sinistros/${slug}/detalhes`)
}
