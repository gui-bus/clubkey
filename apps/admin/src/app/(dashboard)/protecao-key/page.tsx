"use client"

import * as React from "react"

import { ShieldCheck } from "@phosphor-icons/react"

import { AdminUnderConstruction } from "@/src/components/admin/common/adminUnderConstruction"
import { Container } from "@/src/components/common/container"

export default function ProtecaoKeyPage(): React.JSX.Element {
  return (
    <Container className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-black font-heading tracking-tight text-zinc-900 dark:text-white uppercase">
          Proteção Key
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
          Coberturas, apólices de proteção e garantias patrimoniais de membros.
        </p>
      </div>

      <AdminUnderConstruction
        title="Proteção Key em Construção"
        description="A gestão de apólices, cálculo de coberturas e parâmetros de proteção está em desenvolvimento."
        icon={ShieldCheck}
      />
    </Container>
  )
}
