import { redirect } from "next/navigation"
import { MEMBERS, getMemberSlug } from "@/src/data/portalData"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ConexaoIdRedirectPage({
  params,
}: PageProps): Promise<never> {
  const { id } = await params
  const member = MEMBERS.find((m) => m.id === Number(id))
  if (member) {
    redirect(`/conexoes/${member.id}/${getMemberSlug(member)}`)
  }
  redirect(`/conexoes`)
}
