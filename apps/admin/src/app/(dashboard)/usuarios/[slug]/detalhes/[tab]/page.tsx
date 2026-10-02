import type { Metadata } from "next"
import { AdminUserDetailClient } from "@/src/components/admin/users/adminUserDetailClient"

export const metadata: Metadata = {
  title: "Detalhes do Usuário",
  description: "Visualização e edição dos parâmetros, documentos e permissões do usuário.",
}

interface UserDetailTabPageProps {
  params: Promise<{
    slug: string
    tab: string
  }>
}

export default async function UserDetailTabPage({ params }: UserDetailTabPageProps) {
  const { slug, tab } = await params
  return <AdminUserDetailClient slug={slug} activeTab={tab} />
}
