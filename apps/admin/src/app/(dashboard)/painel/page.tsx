"use client"

import * as React from "react"

import { Gauge } from "@phosphor-icons/react"

import { AdminUnderConstruction } from "@/src/components/admin/common/adminUnderConstruction"
import { Container } from "@/src/components/common/container"

export default function PainelPage(): React.JSX.Element {
  return (
    <Container className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-black font-heading tracking-tight text-zinc-900 dark:text-white uppercase">
          Painel de Controle
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
          Métricas operacionais, throughput de transações e telemetria de
          serviços.
        </p>
      </div>

      <AdminUnderConstruction
        title="Painel de Controle em Construção"
        description="A visualização em tempo real de filas de processamento e métricas de infraestrutura está em desenvolvimento."
        icon={Gauge}
      />
    </Container>
  )
}
