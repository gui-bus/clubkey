"use client"

import * as React from "react"

import {
  TableStats,
  type TableStatItem,
} from "@clubkey/ui"
import { formatCurrency } from "@clubkey/utils"
import {
  CurrencyDollar,
  HouseLine,
  ShieldCheck,
  Users,
} from "@phosphor-icons/react"

import { Container } from "@/src/components/common/container"

import { PainelHero } from "./painelHero"
import { PainelOperationalAlerts } from "./painelOperationalAlerts"
import { PainelRecentActivity } from "./painelRecentActivity"
import { PainelRevenueOverview } from "./painelRevenueOverview"

export function PainelClient(): React.JSX.Element {
  const statsItems: TableStatItem[] = React.useMemo(() => {
    return [
      {
        label: "Membros Ativos",
        value: "1.248",
        subtext: "+12.4% novos associados este mês",
        icon: Users,
      },
      {
        label: "Volume Transacionado (GMV)",
        value: formatCurrency(2450000),
        subtext: "+18.3% de crescimento no trimestre",
        icon: CurrencyDollar,
      },
      {
        label: "Imóveis Conectados",
        value: "184 Imóveis",
        subtext: "82.4% de taxa de ocupação média",
        icon: HouseLine,
      },
      {
        label: "Proteção Key & Sinistros",
        value: "98.5%",
        subtext: "Taxa de liquidação e conformidade",
        icon: ShieldCheck,
      },
    ]
  }, [])

  return (
    <div className="w-full flex flex-col">
      <PainelHero userName="William" />

      <Container className="space-y-6 pt-6 pb-12">
        <TableStats items={statsItems} />

        <PainelOperationalAlerts />

        <PainelRevenueOverview />

        <PainelRecentActivity />
      </Container>
    </div>
  )
}
