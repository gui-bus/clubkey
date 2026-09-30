"use client"

import * as React from "react"
import { Key } from "@phosphor-icons/react"
import { AdminUnderConstruction } from "@/src/components/admin/common/adminUnderConstruction"

export default function ProtecaoKeyPage(): React.JSX.Element {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-black font-heading tracking-tight text-zinc-900 dark:text-white uppercase">
          Proteção Key
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
          Planos de proteção de garantia locatícia, coberturas e apólices ativas.
        </p>
      </div>

      <AdminUnderConstruction
        title="Proteção Key em Construção"
        description="A esteira de apólices de garantia locatícia, coberturas contratuais e sinistralidade está em desenvolvimento."
        icon={Key}
      />
    </div>
  )
}
