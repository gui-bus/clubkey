"use client"

import * as React from "react"
import { ShieldWarning } from "@phosphor-icons/react"
import { AdminUnderConstruction } from "@/src/components/admin/common/adminUnderConstruction"

export default function SinistrosPage(): React.JSX.Element {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-black font-heading tracking-tight text-zinc-900 dark:text-white uppercase">
          Sinistros
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
          Acompanhamento, abertura e gestão de sinistros e acionamentos de garantias.
        </p>
      </div>

      <AdminUnderConstruction
        title="Gestão de Sinistros em Construção"
        description="A esteira de análise de apólices, abertura de chamados e liquidação de indenizações está em desenvolvimento."
        icon={ShieldWarning}
      />
    </div>
  )
}
