import { redirect } from "next/navigation"

interface PageProps {
  params: Promise<{ id: string; slug: string }>
}

export default async function RoomsDetailRedirectPage({
  params,
}: PageProps): Promise<never> {
  const { id, slug } = await params
  redirect(`/hospedagens/${id}/${slug}`)
}
