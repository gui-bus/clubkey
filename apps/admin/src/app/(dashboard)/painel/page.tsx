import * as React from "react"

import type { Metadata } from "next"

import { PainelClient } from "@/src/components/admin/painel/painelClient"

export const metadata: Metadata = {
  title: "Painel de Controle • ClubKey Admin",
  description: "Visão consolidada do ecossistema ClubKey, métricas de crescimento e telemetria operacional.",
}

export default function PainelPage(): React.JSX.Element {
  return <PainelClient />
}
