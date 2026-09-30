"use client"

import * as React from "react"

import { CreditCard } from "@phosphor-icons/react"

import { AdminUnderConstruction } from "@/src/components/admin/common/adminUnderConstruction"
import { Container } from "@/src/components/common/container"

export default function CreditoPage(): React.JSX.Element {
  return (
    <Container className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-black font-heading tracking-tight text-zinc-900 dark:text-white uppercase">
          Crédito
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
          Gestão de linhas de crédito, solicitações de antecipação e limites
          para associados.
        </p>
      </div>

      <AdminUnderConstruction
        title="Operações de Crédito em Construção"
        description="A esteira de concessão de crédito, análise de garantias e esteira de aprovações está em desenvolvimento."
        icon={CreditCard}
      />
    </Container>
  )
}
