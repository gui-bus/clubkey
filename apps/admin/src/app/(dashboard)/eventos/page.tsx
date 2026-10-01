import type { Metadata } from "next"

import { EventsClient } from "@/src/components/admin/events/eventsClient"

export const metadata: Metadata = {
  title: "Gestão de Eventos | Painel Admin ClubKey",
  description:
    "Gestão e controle de lotação, confirmações e pauta de eventos do clube.",
}

export default function EventsPage(): React.JSX.Element {
  return <EventsClient />
}
