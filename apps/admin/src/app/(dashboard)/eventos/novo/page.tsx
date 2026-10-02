import type { Metadata } from "next"

import { CreateEventClient } from "@/src/components/admin/events/createEventClient"

export const metadata: Metadata = {
  title: "Novo Evento | Painel Admin ClubKey",
  description: "Cadastro e publicação de novo evento no catálogo ClubKey.",
}

export default function CreateEventPage(): React.JSX.Element {
  return <CreateEventClient />
}
