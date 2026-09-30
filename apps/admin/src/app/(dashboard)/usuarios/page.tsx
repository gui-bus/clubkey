"use client"

import { Button, Card, CardContent } from "@clubkey/ui"
import { UserPlus, Users } from "@phosphor-icons/react"

export default function UsuariosPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Usuários</h1>
          <p className="text-sm text-muted-foreground">
            Gestão de associados, locatários, proprietários e clientes
            cadastrados na plataforma.
          </p>
        </div>
        <Button color="primary" size="sm">
          <UserPlus size={16} className="mr-1.5" /> Novo Usuário
        </Button>
      </div>

      <Card className="border-border bg-card">
        <CardContent className="p-8 text-center text-muted-foreground">
          <Users size={40} className="mx-auto mb-3 text-muted-foreground/60" />
          <p className="text-sm font-medium">
            Módulo de Usuários pronto para desenvolvimento das telas e fluxos.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
