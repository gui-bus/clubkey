import { redirect } from "next/navigation"

import { assertModule } from "@/src/config/brand.config"

export default function AgendaRedirectPage(): never {
  assertModule("events")
  redirect("/eventos")
}
