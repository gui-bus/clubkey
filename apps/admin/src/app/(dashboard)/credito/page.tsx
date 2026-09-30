"use client"

import { Button, Card, CardContent } from "@clubkey/ui"
import { CreditCard, Plus } from "@phosphor-icons/react"

export default function CreditoPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Crédito</h1>
          <p className="text-sm text-muted-foreground">
            Gestão de linhas de crédito, solicitações de antecipação e limites
            para membros.
          </p>
        </div>
        <Button color="primary" size="sm">
          <Plus size={16} className="mr-1.5" /> Nova Solicitação
        </Button>
      </div>

      <Card className="border-border bg-card">
        <CardContent className="p-8 text-center text-muted-foreground">
          <CreditCard
            size={40}
            className="mx-auto mb-3 text-muted-foreground/60"
          />
          <p className="text-sm font-medium">
            Módulo de Crédito pronto para desenvolvimento das telas e fluxos.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
