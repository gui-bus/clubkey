"use client"

import * as React from "react"
import { UserGear } from "@phosphor-icons/react"
import { AdminUnderConstruction } from "@/src/components/admin/common/adminUnderConstruction"

export default function AdministradoresPage(): React.JSX.Element {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-black font-heading tracking-tight text-zinc-900 dark:text-white uppercase">
          Administradores & Permissões
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
          Gestão de contas com acesso administrativo, níveis de permissão (RBAC) e logs.
        </p>
      </div>

      <AdminUnderConstruction
        title="Gestão de Administradores em Construção"
        description="O controle de perfis de acesso, permissões granulares e auditoria de segurança está em desenvolvimento."
        icon={UserGear}
      />
    </div>
  )
}
