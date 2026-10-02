import * as React from "react"
import type { Metadata } from "next"

import { CreateAdministratorClient } from "@/src/components/admin/administrators/createAdministratorClient"

export const metadata: Metadata = {
  title: "Novo Administrador — ClubKey Admin",
  description:
    "Cadastre um novo administrador com credenciais de acesso e nível de permissão.",
}

export default function NovoAdministradorPage() {
  return (
    <React.Suspense fallback={null}>
      <CreateAdministratorClient />
    </React.Suspense>
  )
}
