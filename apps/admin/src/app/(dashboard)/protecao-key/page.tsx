import * as React from "react"

import type { Metadata } from "next"

import { ProtecaoKeyClient } from "@/src/components/admin/protecaoKey/protecaoKeyClient"

export const metadata: Metadata = {
  title: "Proteção Key | ClubKey Admin",
  description: "Administração de seguros, apólices, grupos de proteção e faturas auditáveis.",
}

export default function ProtecaoKeyPage(): React.JSX.Element {
  return (
    <React.Suspense fallback={<div className="min-h-screen" />}>
      <ProtecaoKeyClient />
    </React.Suspense>
  )
}
