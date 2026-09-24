import { redirect } from "next/navigation"

import { assertModule } from "@/src/config/brand.config"

export default function MinhasHospedagensRedirectPage(): never {
  assertModule("stays")
  redirect("/hospedagens/minhas-hospedagens")
}
