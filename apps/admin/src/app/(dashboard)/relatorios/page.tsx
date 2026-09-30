"use client"

import { Button, Card, CardContent } from "@clubkey/ui"
import { ChartBar, DownloadSimple } from "@phosphor-icons/react"

export default function RelatoriosPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Relatórios & Análises
          </h1>
          <p className="text-sm text-muted-foreground">
            Extração de relatórios financeiros, operacionais, de sinistros e
            inadimplência.
          </p>
        </div>
        <Button variant="bordered" size="sm">
          <DownloadSimple size={16} className="mr-1.5" /> Exportar Relatórios
        </Button>
      </div>

      <Card className="border-border bg-card">
        <CardContent className="p-8 text-center text-muted-foreground">
          <ChartBar
            size={40}
            className="mx-auto mb-3 text-muted-foreground/60"
          />
          <p className="text-sm font-medium">
            Módulo de Relatórios pronto para desenvolvimento das telas e fluxos.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
