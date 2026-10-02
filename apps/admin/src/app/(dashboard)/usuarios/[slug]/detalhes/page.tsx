import { redirect } from "next/navigation"

interface UserDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function UserDetailPage({ params }: UserDetailPageProps) {
  const { slug } = await params
  redirect(`/usuarios/${slug}/detalhes/perfil`)
}
