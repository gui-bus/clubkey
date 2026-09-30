"use client"

import { useState } from "react"

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@clubkey/ui"
import {
  CheckCircle,
  DotsThreeVertical,
  DownloadSimple,
  Funnel,
  MagnifyingGlass,
  UserPlus,
  XCircle,
} from "@phosphor-icons/react"

const mockMembersList = [
  {
    id: "mem_1",
    name: "Carolina Mendonça",
    email: "carolina.m@example.com",
    cpf: "123.456.789-00",
    phone: "+55 (11) 98765-4321",
    tier: "Black Member",
    status: "Ativo",
    city: "São Paulo, SP",
    joinedAt: "12/03/2026",
  },
  {
    id: "mem_2",
    name: "Rodrigo Silveira",
    email: "rodrigo.s@example.com",
    cpf: "234.567.890-11",
    phone: "+55 (21) 99876-5432",
    tier: "Gold Member",
    status: "Pendente",
    city: "Rio de Janeiro, RJ",
    joinedAt: "28/09/2026",
  },
  {
    id: "mem_3",
    name: "Mariana Alencar",
    email: "mariana.alencar@example.com",
    cpf: "345.678.901-22",
    phone: "+55 (31) 97654-3210",
    tier: "Diamond Member",
    status: "Ativo",
    city: "Belo Horizonte, MG",
    joinedAt: "05/01/2026",
  },
  {
    id: "mem_4",
    name: "Lucas Vasconcelos",
    email: "lucas.v@example.com",
    cpf: "456.789.012-33",
    phone: "+55 (41) 96543-2109",
    tier: "Silver Member",
    status: "Ativo",
    city: "Curitiba, PR",
    joinedAt: "15/06/2026",
  },
  {
    id: "mem_5",
    name: "Beatriz Nogueira",
    email: "beatriz.n@example.com",
    cpf: "567.890.123-44",
    phone: "+55 (51) 95432-1098",
    tier: "Gold Member",
    status: "Inativo",
    city: "Porto Alegre, RS",
    joinedAt: "20/02/2026",
  },
]

export default function AdminMembersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredMembers = mockMembersList.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.cpf.includes(searchTerm)
    const matchesStatus =
      filterStatus === "all" ||
      m.status.toLowerCase() === filterStatus.toLowerCase()
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Gestão de Membros
          </h1>
          <p className="text-sm text-muted-foreground">
            Visualize, aprove novos cadastros e gerencie os membros ativos do
            clube.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="bordered" size="sm">
            <DownloadSimple size={16} className="mr-1.5" /> Exportar CSV
          </Button>
          <Button color="primary" size="sm">
            <UserPlus size={16} className="mr-1.5" /> Novo Membro
          </Button>
        </div>
      </div>

      
      <Card className="border-border bg-card">
        <CardContent className="p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlass
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                placeholder="Buscar por nome, e-mail ou CPF..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-9 w-full rounded-md border border-input bg-background/50 pl-9 pr-4 text-xs outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-medium">
                Status:
              </span>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="h-9 rounded-md border border-input bg-background px-3 text-xs outline-none focus:border-primary"
              >
                <option value="all">Todos</option>
                <option value="ativo">Ativos</option>
                <option value="pendente">Pendentes</option>
                <option value="inativo">Inativos</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      
      <Card className="border-border bg-card">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border bg-muted/40 font-semibold text-muted-foreground">
                <tr>
                  <th className="px-6 py-3.5">Nome / Contato</th>
                  <th className="px-6 py-3.5">Documento</th>
                  <th className="px-6 py-3.5">Localidade</th>
                  <th className="px-6 py-3.5">Categoria</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Membro Desde</th>
                  <th className="px-6 py-3.5 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredMembers.map((member) => (
                  <tr
                    key={member.id}
                    className="transition-colors hover:bg-muted/20"
                  >
                    <td className="px-6 py-4">
                      <div className="font-semibold text-foreground">
                        {member.name}
                      </div>
                      <div className="text-[11px] text-muted-foreground">
                        {member.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {member.cpf}
                    </td>
                    <td className="px-6 py-4">{member.city}</td>
                    <td className="px-6 py-4 font-medium">{member.tier}</td>
                    <td className="px-6 py-4">
                      <Badge
                        color={
                          member.status === "Ativo"
                            ? "default"
                            : member.status === "Pendente"
                              ? "warning"
                              : "secondary"
                        }
                        size="sm"
                      >
                        {member.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {member.joinedAt}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="rounded p-1 text-muted-foreground hover:bg-accent hover:text-foreground">
                        <DotsThreeVertical size={18} weight="bold" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
