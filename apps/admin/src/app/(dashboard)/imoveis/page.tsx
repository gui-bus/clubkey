"use client"

import { Button, Card, CardContent } from "@clubkey/ui"
import { Buildings, Plus } from "@phosphor-icons/react"

export default function ImoveisPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Imóveis</h1>
          <p className="text-sm text-muted-foreground">
            Cadastro, vistoria, inventário e gestão de imóveis e propriedades do
            clube.
          </p>
        </div>
        <Button color="primary" size="sm">
          <Plus size={16} className="mr-1.5" /> Cadastrar Imóvel
        </Button>
      </div>

      <Card className="border-border bg-card">
        <CardContent className="p-8 text-center text-muted-foreground">
          <Buildings
            size={40}
            className="mx-auto mb-3 text-muted-foreground/60"
          />
          <p className="text-sm font-medium">
            Módulo de Imóveis pronto para desenvolvimento das telas e fluxos.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
