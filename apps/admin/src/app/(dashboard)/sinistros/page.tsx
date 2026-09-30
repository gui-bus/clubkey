"use client"

import { Button, Card, CardContent } from "@clubkey/ui"
import { MagnifyingGlass, Plus, ShieldWarning } from "@phosphor-icons/react"

export default function SinistrosPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Sinistros</h1>
          <p className="text-sm text-muted-foreground">
            Acompanhamento, abertura e gestão de sinistros e acionamentos de
            garantias.
          </p>
        </div>
        <Button color="primary" size="sm">
          <Plus size={16} className="mr-1.5" /> Novo Sinistro
        </Button>
      </div>

      <Card className="border-border bg-card">
        <CardContent className="p-8 text-center text-muted-foreground">
          <ShieldWarning
            size={40}
            className="mx-auto mb-3 text-muted-foreground/60"
          />
          <p className="text-sm font-medium">
            Módulo de Sinistros pronto para desenvolvimento das telas e fluxos.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
