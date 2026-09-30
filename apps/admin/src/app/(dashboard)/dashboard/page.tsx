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
  ArrowUpRight,
  Bed,
  CalendarCheck,
  CurrencyCircleDollar,
  TrendUp,
  UserPlus,
  Users,
} from "@phosphor-icons/react"

import { Container } from "@/src/components/common/container"

const stats = [
  {
    title: "Total de Membros Ativos",
    value: "1.248",
    change: "+12.4% este mês",
    icon: Users,
    trend: "up",
  },
  {
    title: "Reservas de Hospedagem",
    value: "342",
    change: "+8.1% vs mês anterior",
    icon: Bed,
    trend: "up",
  },
  {
    title: "Ingressos de Eventos",
    value: "890",
    change: "+24.5% vs mês anterior",
    icon: CalendarCheck,
    trend: "up",
  },
  {
    title: "MRR / Receita Mensal",
    value: formatCurrency(148500),
    change: "+15.2% este trimestre",
    icon: CurrencyCircleDollar,
    trend: "up",
  },
]

const recentMembers = [
  {
    id: "1",
    name: "Carolina Mendonça",
    email: "carolina.m@example.com",
    tier: "Black Member",
    date: "Hoje às 10:14",
    status: "Ativo",
  },
  {
    id: "2",
    name: "Rodrigo Silveira",
    email: "rodrigo.s@example.com",
    tier: "Gold Member",
    date: "Hoje às 09:30",
    status: "Pendente",
  },
  {
    id: "3",
    name: "Mariana Alencar",
    email: "mariana.alencar@example.com",
    tier: "Diamond Member",
    date: "Ontem às 18:45",
    status: "Ativo",
  },
  {
    id: "4",
    name: "Lucas Vasconcelos",
    email: "lucas.v@example.com",
    tier: "Silver Member",
    date: "Ontem às 15:20",
    status: "Ativo",
  },
]

export default function AdminDashboardPage() {
  return (
    <Container className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Visão Geral da Plataforma
          </h1>
          <p className="text-sm text-muted-foreground">
            Acompanhe as principais métricas de crescimento, engajamento e
            adesões da ClubKey.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="bordered" size="sm">
            Exportar Relatório
          </Button>
          <Button color="primary" size="sm">
            <UserPlus size={16} className="mr-1.5" /> Convidar Membro
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
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon size={18} weight="duotone" />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-2xl font-bold tracking-tight">
                    {stat.value}
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    <TrendUp size={14} />
                    <span>{stat.change}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between p-6">
            <div>
              <CardTitle className="text-base font-semibold">
                Últimos Membros Cadastrados
              </CardTitle>
              <CardDescription className="text-xs">
                Novas solicitações e adesões recentes ao clube
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-xs text-primary">
              Ver Todos <ArrowUpRight size={14} className="ml-1" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-y border-border bg-muted/40 font-semibold text-muted-foreground">
                  <tr>
                    <th className="px-6 py-3">Membro</th>
                    <th className="px-6 py-3">Plano / Categoria</th>
                    <th className="px-6 py-3">Data</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {recentMembers.map((member) => (
                    <tr
                      key={member.id}
                      className="transition-colors hover:bg-muted/20"
                    >
                      <td className="px-6 py-3.5">
                        <div className="font-semibold text-foreground">
                          {member.name}
                        </div>
                        <div className="text-muted-foreground text-[11px]">
                          {member.email}
                        </div>
                      </td>
                      <td className="px-6 py-3.5 font-medium">{member.tier}</td>
                      <td className="px-6 py-3.5 text-muted-foreground">
                        {member.date}
                      </td>
                      <td className="px-6 py-3.5">
                        <Badge
                          color={
                            member.status === "Ativo" ? "default" : "warning"
                          }
                          size="sm"
                        >
                          {member.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="p-6">
            <CardTitle className="text-base font-semibold">
              Status do Ecossistema
            </CardTitle>
            <CardDescription className="text-xs">
              Saúde dos módulos e integrações ativas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-6 pt-0">
            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <div className="flex flex-col">
                <span className="text-xs font-semibold">
                  Motor de Hospedagens (Stays)
                </span>
                <span className="text-[11px] text-muted-foreground">
                  API Sync Operacional
                </span>
              </div>
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <div className="flex flex-col">
                <span className="text-xs font-semibold">
                  Gateway de Pagamentos
                </span>
                <span className="text-[11px] text-muted-foreground">
                  Stripe / Pagar.me Conectado
                </span>
              </div>
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <div className="flex flex-col">
                <span className="text-xs font-semibold">
                  KeyPass & Gamificação
                </span>
                <span className="text-[11px] text-muted-foreground">
                  Distribuição Automática
                </span>
              </div>
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  )
}
