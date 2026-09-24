import { redirect } from "next/navigation"

import { assertModule } from "@/src/config/brand.config"

export default function MeusEventosRedirectPage(): never {
  assertModule("events")
  redirect("/eventos/meus-eventos")
}
