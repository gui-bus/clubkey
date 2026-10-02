import * as React from "react"

import type { Metadata } from "next"

import { AdministratorsClient } from "@/src/components/admin/administrators/administratorsClient"

export const metadata: Metadata = {
  title: "Administradores — ClubKey Admin",
  description:
    "Gestão de administradores, permissões, autenticação em duas etapas (2FA) e credenciais de acesso.",
}

export default function AdministradoresPage() {
  return (
    <React.Suspense fallback={null}>
      <AdministratorsClient />
    </React.Suspense>
  )
}
