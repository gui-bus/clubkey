"use client"

import * as React from "react"
import { ChartBar } from "@phosphor-icons/react"
import { AdminUnderConstruction } from "@/src/components/admin/common/adminUnderConstruction"

export default function RelatoriosPage(): React.JSX.Element {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-black font-heading tracking-tight text-zinc-900 dark:text-white uppercase">
          Relatórios & BI
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
          Extração de relatórios financeiros, operacionais, de sinistros e inadimplência.
        </p>
      </div>

      <AdminUnderConstruction
        title="Relatórios & Business Intelligence em Construção"
        description="A esteira de exportação contábil, gráficos dinâmicos de faturamento e relatórios executivos está em desenvolvimento."
        icon={ChartBar}
      />
    </div>
  )
}
