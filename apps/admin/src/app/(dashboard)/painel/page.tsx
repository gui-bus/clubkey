"use client"

import * as React from "react"
import { ChartPieSlice } from "@phosphor-icons/react"
import { AdminUnderConstruction } from "@/src/components/admin/common/adminUnderConstruction"

export default function PainelPage(): React.JSX.Element {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-black font-heading tracking-tight text-zinc-900 dark:text-white uppercase">
          Painel de Controle
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
          Visão executiva e indicadores gerais de sinistros, crédito, imóveis e proteções.
        </p>
      </div>

      <AdminUnderConstruction
        title="Painel Executivo em Construção"
        description="O dashboard com métricas consolidadas, KPIs operacionais e gráficos em tempo real está em desenvolvimento."
        icon={ChartPieSlice}
      />
    </div>
  )
}
