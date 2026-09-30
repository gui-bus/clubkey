"use client"

import { Button, Card, CardContent } from "@clubkey/ui"
import { Key, Plus } from "@phosphor-icons/react"

export default function ProtecaoKeyPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Proteção Key</h1>
          <p className="text-sm text-muted-foreground">
            Planos de proteção de garantia locatícia, coberturas e apólices
            ativas.
          </p>
        </div>
        <Button color="primary" size="sm">
          <Plus size={16} className="mr-1.5" /> Nova Proteção
        </Button>
      </div>

      <Card className="border-border bg-card">
        <CardContent className="p-8 text-center text-muted-foreground">
          <Key size={40} className="mx-auto mb-3 text-muted-foreground/60" />
          <p className="text-sm font-medium">
            Módulo de Proteção Key pronto para desenvolvimento das telas e
            fluxos.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
