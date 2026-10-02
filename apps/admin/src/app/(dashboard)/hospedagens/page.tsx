import * as React from "react"

import type { Metadata } from "next"

import { PropertiesClient } from "@/src/components/admin/properties/propertiesClient"

export const metadata: Metadata = {
  title: "Imóveis & Hospedagens — ClubKey Admin",
  description:
    "Gestão consolidada de inventário, ocupação, faturamento mensal e integração com plataformas.",
}

export default function AdminHospedagensPage(): React.JSX.Element {
  return (
    <React.Suspense fallback={null}>
      <PropertiesClient />
    </React.Suspense>
  )
}
