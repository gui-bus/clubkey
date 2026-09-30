import { redirect } from "next/navigation"

import { MEMBERS, getMemberSlug } from "@/src/data/portalData"

import { assertModule } from "@/src/config/brand.config"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function PessoasDetailRedirectPage({
  params,
}: PageProps): Promise<never> {
  assertModule("networking")
  const { id } = await params
  const member = MEMBERS.find((m) => m.id === Number(id))
  if (member) {
    redirect(`/conexoes/${member.id}/${getMemberSlug(member)}`)
  }
  redirect(`/conexoes/${id}`)
}
