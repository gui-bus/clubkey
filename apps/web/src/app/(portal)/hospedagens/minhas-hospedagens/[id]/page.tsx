import { redirect } from "next/navigation"

import { DEFAULT_MEMBER_STAYS, getStaySlug } from "@/src/data/portalData"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function MinhaHospedagemIdRedirectPage({
  params,
}: PageProps): Promise<never> {
  const { id } = await params
  const stay = DEFAULT_MEMBER_STAYS.find((s) => s.id === id)
  if (stay) {
    redirect(`/hospedagens/minhas-hospedagens/${id}/${getStaySlug(stay)}`)
  }
  redirect(`/hospedagens/minhas-hospedagens/${id}/reserva`)
}
