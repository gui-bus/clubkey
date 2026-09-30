"use client"

import * as React from "react"

import { WarningCircle } from "@phosphor-icons/react"

import { AdminUnderConstruction } from "@/src/components/admin/common/adminUnderConstruction"
import { Container } from "@/src/components/common/container"

export default function SinistrosPage(): React.JSX.Element {
  return (
    <Container className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-black font-heading tracking-tight text-zinc-900 dark:text-white uppercase">
          Sinistros
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
          Abertura, regulação e liquidação de sinistros e indenizações.
        </p>
      </div>

      <AdminUnderConstruction
        title="Regulação de Sinistros em Construção"
        description="O fluxo de abertura de chamados, envio de laudos periciais e liquidação financeira está em desenvolvimento."
        icon={WarningCircle}
      />
    </Container>
  )
}
