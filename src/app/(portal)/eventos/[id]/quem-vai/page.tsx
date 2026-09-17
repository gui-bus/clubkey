import { redirect } from "next/navigation"

import { EVENTS, getEventSlug } from "@/src/data/portalData"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EventQuemVaiRedirectPage({
  params,
}: PageProps): Promise<never> {
  const { id } = await params
  const event = EVENTS.find((e) => e.id === Number(id))
  if (event) {
    redirect(`/eventos/${event.id}/${getEventSlug(event)}/quem-vai`)
  }
  redirect(`/eventos`)
}
