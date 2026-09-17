import { redirect } from "next/navigation"

import { getRoomDetail } from "@/src/data/mockRoomDetails"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function HospedagemIdRedirectPage({
  params,
}: PageProps): Promise<never> {
  const { id } = await params
  const room = getRoomDetail(id)
  if (room && room.slug) {
    redirect(`/hospedagens/${room.id}/${room.slug}`)
  }
  redirect(`/hospedagens/${id}/detalhes`)
}
