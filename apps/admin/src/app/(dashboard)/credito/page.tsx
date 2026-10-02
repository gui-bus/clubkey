import * as React from "react"

import type { Metadata } from "next"

import { CreditoClient } from "@/src/components/admin/credito/creditoClient"

export const metadata: Metadata = {
  title: "Crédito • ClubKey Admin",
  description: "Gestão operacional de linhas de crédito e solicitações de antecipação.",
}

export default function CreditoPage(): React.JSX.Element {
  return <CreditoClient />
}
