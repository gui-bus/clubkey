import * as React from "react"

import type { Metadata } from "next"

import { AdminUsersClient } from "@/src/components/admin/users/adminUsersClient"

export const metadata: Metadata = {
  title: "Usuários — ClubKey Admin",
  description:
    "Gestão de associados, locatários, proprietários e clientes cadastrados.",
}

export default function UsuariosPage() {
  return (
    <React.Suspense fallback={null}>
      <AdminUsersClient />
    </React.Suspense>
  )
}
