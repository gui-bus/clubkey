"use client"

import * as React from "react"

import { Buildings } from "@phosphor-icons/react"

import { AdminUnderConstruction } from "@/src/components/admin/common/adminUnderConstruction"
import { Container } from "@/src/components/common/container"

export default function ImoveisPage(): React.JSX.Element {
  return (
    <Container className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-black font-heading tracking-tight text-zinc-900 dark:text-white uppercase">
          Imóveis
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
          Gestão de ativos imobiliários, tokenização e fracionamento de
          propriedades.
        </p>
      </div>

      <AdminUnderConstruction
        title="Gestão de Imóveis em Construção"
        description="O catálogo de propriedades tokenizadas, cotas fracionadas e documentação cartorial está em desenvolvimento."
        icon={Buildings}
      />
    </Container>
  )
}
