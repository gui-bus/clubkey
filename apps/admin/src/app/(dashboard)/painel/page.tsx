"use client"

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@clubkey/ui"
import { formatCurrency } from "@clubkey/utils"
import {
  Buildings,
  ChartPieSlice,
  CreditCard,
  CurrencyCircleDollar,
  Key,
  ShieldWarning,
  TrendUp,
  Users,
} from "@phosphor-icons/react"

const stats = [
  {
    title: "Sinistros em Aberto",
    value: "14",
    change: "-3 vs semana passada",
    icon: ShieldWarning,
    color: "text-amber-500",
  },
  {
    title: "Volume de Crédito Ativo",
    value: formatCurrency(845000),
    change: "+18.2% este mês",
    icon: CreditCard,
    color: "text-emerald-500",
  },
  {
    title: "Total de Imóveis Protegidos",
    value: "620",
    change: "+28 novos imóveis",
    icon: Buildings,
    color: "text-blue-500",
  },
  {
    title: "Proteções Key Ativas",
    value: "1.480",
    change: "+12.4% vs mês anterior",
    icon: Key,
    color: "text-primary",
  },
]

export default function PainelPage() {
  return (
    <div className="space-y-8">
      
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Painel de Controle
          </h1>
          <p className="text-sm text-muted-foreground">
            Visão executiva e indicadores gerais de sinistros, crédito, imóveis
            e proteções.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="bordered" size="sm">
            Atualizar Dados
          </Button>
          <Button color="primary" size="sm">
            Gerar Relatório
          </Button>
        </div>
      </div>

      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <Card key={idx} className="border-border bg-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">
                    {stat.title}
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-foreground">
                    <Icon size={18} weight="duotone" className={stat.color} />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-2xl font-bold tracking-tight">
                    {stat.value}
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground font-medium">
                    <span>{stat.change}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
