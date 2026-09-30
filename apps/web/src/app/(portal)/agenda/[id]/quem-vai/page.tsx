import { redirect } from "next/navigation"

import { EVENTS, getEventSlug } from "@/src/data/portalData"

import { assertModule } from "@/src/config/brand.config"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function AgendaQuemVaiRedirectPage({
  params,
}: PageProps): Promise<never> {
  assertModule("events")
  const { id } = await params
  const event = EVENTS.find((e) => e.id === Number(id))
  if (event) {
    redirect(`/eventos/${event.id}/${getEventSlug(event)}/quem-vai`)
  }
  redirect(`/eventos/${id}/quem-vai`)
}
