import { redirect } from "next/navigation"

import { assertModule } from "@/src/config/brand.config"

export default function PessoasRedirectPage(): never {
  assertModule("networking")
  redirect("/conexoes")
}
