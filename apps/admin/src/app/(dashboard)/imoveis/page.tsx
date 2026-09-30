"use client"

import * as React from "react"
import { Buildings } from "@phosphor-icons/react"
import { AdminUnderConstruction } from "@/src/components/admin/common/adminUnderConstruction"

export default function ImoveisPage(): React.JSX.Element {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-black font-heading tracking-tight text-zinc-900 dark:text-white uppercase">
          Imóveis
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
          Cadastro, vistoria, inventário e gestão de propriedades e ativos do clube.
        </p>
      </div>

      <AdminUnderConstruction
        title="Catálogo de Imóveis em Construção"
        description="A esteira de cadastro de imóveis, laudos de vistoria e acompanhamento patrimonial está em desenvolvimento."
        icon={Buildings}
      />
    </div>
  )
}
