"use client"

import * as React from "react"

import { ChartLineUp } from "@phosphor-icons/react"

import { AdminUnderConstruction } from "@/src/components/admin/common/adminUnderConstruction"
import { Container } from "@/src/components/common/container"

export default function RelatoriosPage(): React.JSX.Element {
  return (
    <Container className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-black font-heading tracking-tight text-zinc-900 dark:text-white uppercase">
          Relatórios & BI
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
          Relatórios gerenciais, balanços contábeis e inteligência de negócios.
        </p>
      </div>

      <AdminUnderConstruction
        title="Relatórios & BI em Construção"
        description="Os relatórios consolidados, conciliação contábil e exportações programadas estão em desenvolvimento."
        icon={ChartLineUp}
      />
    </Container>
  )
}
