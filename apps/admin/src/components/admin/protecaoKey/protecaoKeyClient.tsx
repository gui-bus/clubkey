"use client"

import * as React from "react"

import {
  MOCK_INSURANCE_GROUPS,
  MOCK_INSURANCE_INVOICES,
  MOCK_INSURANCE_QUEUE_ITEMS,
} from "@/src/data/mocks/protecaoKey.data"
import type {
  InsuranceGroup,
  InsuranceInvoice,
  InsuranceQueueItem,
} from "@clubkey/types"
import { TableStats, type TableStatItem, toast } from "@clubkey/ui"
import { formatCurrency } from "@clubkey/utils"
import {
  ClockCountdown,
  FileText,
  Receipt,
  ShieldCheck,
} from "@phosphor-icons/react"
import {
  parseAsString,
  useQueryState,
} from "nuqs"

import { Container } from "@/src/components/common/container"

import { AdminHero } from "../common/adminHero"
import { ProtecaoKeyFilterBar } from "./protecaoKeyFilterBar"
import { ProtecaoKeyOperationalList } from "./protecaoKeyOperationalList"
import { ProtecaoKeyQueueSection } from "./protecaoKeyQueueSection"

export function ProtecaoKeyClient(): React.JSX.Element {
  const [groups] = React.useState<InsuranceGroup[]>(MOCK_INSURANCE_GROUPS)
  const [invoices, setInvoices] = React.useState<InsuranceInvoice[]>(MOCK_INSURANCE_INVOICES)
  const [queueItems, setQueueItems] = React.useState<InsuranceQueueItem[]>(MOCK_INSURANCE_QUEUE_ITEMS)

  const [searchQuery, setSearchQuery] = useQueryState(
    "q",
    parseAsString.withDefault("").withOptions({ shallow: true, throttleMs: 250 })
  )
  const [groupStatus, setGroupStatus] = useQueryState(
    "grupo",
    parseAsString.withDefault("ALL").withOptions({ shallow: true })
  )
  const [invoiceStatus, setInvoiceStatus] = useQueryState(
    "fatura",
    parseAsString.withDefault("ALL").withOptions({ shallow: true })
  )
  const [workspace, setWorkspace] = useQueryState(
    "ws",
    parseAsString.withDefault("ALL").withOptions({ shallow: true })
  )
  const [dueDateFrom, setDueDateFrom] = useQueryState(
    "venceDe",
    parseAsString.withDefault("").withOptions({ shallow: true })
  )
  const [dueDateTo, setDueDateTo] = useQueryState(
    "venceAte",
    parseAsString.withDefault("").withOptions({ shallow: true })
  )

  const [isRefreshing, setIsRefreshing] = React.useState(false)

  const filteredGroups = React.useMemo(() => {
    return groups.filter((g) => {
      const q = searchQuery.toLowerCase().trim()
      if (q) {
        const matchesName = g.name.toLowerCase().includes(q)
        const matchesWs = g.workspaceName.toLowerCase().includes(q)
        const matchesHost = g.hostId.toLowerCase().includes(q)
        const matchesId = g.id.includes(q)
        const matchesProps = (g.propertiesList || []).some((p) =>
          p.toLowerCase().includes(q)
        )
        if (!matchesName && !matchesWs && !matchesHost && !matchesId && !matchesProps) {
          return false
        }
      }

      if (groupStatus !== "ALL" && g.status !== groupStatus) {
        return false
      }

      if (workspace !== "ALL" && g.workspaceId !== workspace) {
        return false
      }

      return true
    })
  }, [groups, searchQuery, groupStatus, workspace])

  const filteredInvoices = React.useMemo(() => {
    return invoices.filter((inv) => {
      const q = searchQuery.toLowerCase().trim()
      if (q) {
        const matchesGroup = inv.groupName.toLowerCase().includes(q)
        const matchesWs = inv.workspaceName.toLowerCase().includes(q)
        const matchesId = inv.id.includes(q)
        const matchesGroupId = inv.groupId.includes(q)
        if (!matchesGroup && !matchesWs && !matchesId && !matchesGroupId) {
          return false
        }
      }

      if (invoiceStatus !== "ALL" && inv.status !== invoiceStatus) {
        return false
      }

      if (workspace !== "ALL" && inv.workspaceId !== workspace) {
        return false
      }

      return true
    })
  }, [invoices, searchQuery, invoiceStatus, workspace])

  const handleResetFilters = () => {
    void setSearchQuery(null)
    void setGroupStatus("ALL")
    void setInvoiceStatus("ALL")
    void setWorkspace("ALL")
    void setDueDateFrom(null)
    void setDueDateTo(null)
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
      toast.success("Fila operacional atualizada", {
        description: "Status de apólices e faturas sincronizados com o servidor.",
      })
    }, 600)
  }

  const handleRecoverOpportunity = (item: InsuranceQueueItem | InsuranceInvoice) => {
    const invoiceId = "invoiceId" in item ? item.invoiceId : item.id
    if (!invoiceId) return

    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === invoiceId
          ? {
              ...inv,
              status: "PENDENTE",
              opportunityRecoverable: false,
              ageHoursText: "0h 10min (Reaberta)",
            }
          : inv
      )
    )

    setQueueItems((prev) =>
      prev.filter((q) => q.invoiceId !== invoiceId && q.id !== invoiceId)
    )

    toast.success("Oportunidade recuperada!", {
      description: `Fatura #${invoiceId} reaberta para pagamento do host.`,
    })
  }

  const handleOpenWorkspace = (wsName: string) => {
    toast.info(`Abrindo workspace ${wsName}...`, {
      description: "Redirecionando para a visão do host.",
    })
  }

  const statsItems: TableStatItem[] = React.useMemo(() => {
    const totalGroups = groups.length
    const activeGroups = groups.filter((g) => g.status === "ATIVO").length
    const totalInvoices = invoices.length
    const pendingInvoices = invoices.filter(
      (i) => i.status === "PENDENTE" || i.status === "ATRASADA"
    ).length
    const totalMonthlyAmount = groups.reduce(
      (acc, g) => acc + (g.status === "ATIVO" ? g.monthlyAmount : 0),
      0
    )

    return [
      {
        label: "Grupos de Proteção",
        value: `${totalGroups} ${totalGroups === 1 ? "Grupo" : "Grupos"}`,
        subtext: `${activeGroups} ativos • Cobertura multirrisco`,
        icon: ShieldCheck,
      },
      {
        label: "Faturas Emitidas",
        value: `${totalInvoices} ${totalInvoices === 1 ? "Fatura" : "Faturas"}`,
        subtext: "Cobrança recorrente mensal",
        icon: Receipt,
      },
      {
        label: "Pendentes / Atrasadas",
        value: `${pendingInvoices} ${pendingInvoices === 1 ? "Fatura" : "Faturas"}`,
        subtext:
          pendingInvoices > 0
            ? "Exige atenção operacional no SLA"
            : "Sem faturas em atraso no momento",
        icon: ClockCountdown,
      },
      {
        label: "Mensalidade sob Proteção",
        value: formatCurrency(totalMonthlyAmount),
        subtext: "Recorrência mensal de apólices ativas",
        icon: FileText,
      },
    ]
  }, [groups, invoices])

  return (
    <div className="w-full flex flex-col pb-12">
      <AdminHero
        badge="PORTAL INTERNO • ACESSO AUDITADO"
        title="PROTEÇÃO KEY"
        description="Painel interno para ajustes operacionais de seguro. Toda ação mutável exige motivo e passa pelo servidor ClubKey com autenticação interna."
        imageSrc="/utils/banners/experiencias.webp"
        imageAlt="Proteção Key ClubKey"
      >
        <ProtecaoKeyFilterBar
          searchQuery={searchQuery}
          onSearchQueryChange={(v) => void setSearchQuery(v || null)}
          groupStatus={groupStatus}
          onGroupStatusChange={(v) => void setGroupStatus(v === "ALL" ? null : v)}
          invoiceStatus={invoiceStatus}
          onInvoiceStatusChange={(v) => void setInvoiceStatus(v === "ALL" ? null : v)}
          workspace={workspace}
          onWorkspaceChange={(v) => void setWorkspace(v === "ALL" ? null : v)}
          dueDateFrom={dueDateFrom}
          onDueDateFromChange={(v) => void setDueDateFrom(v || null)}
          dueDateTo={dueDateTo}
          onDueDateToChange={(v) => void setDueDateTo(v || null)}
          onReset={handleResetFilters}
          onRefresh={handleRefresh}
        />
      </AdminHero>

      <Container className="space-y-6 -mt-3 sm:-mt-8">
        <TableStats items={statsItems} />

        <ProtecaoKeyQueueSection
          queueItems={queueItems}
          onRecoverOpportunity={handleRecoverOpportunity}
          onOpenWorkspace={handleOpenWorkspace}
          onRefreshQueue={handleRefresh}
          isRefreshing={isRefreshing}
        />

        <ProtecaoKeyOperationalList
          groups={filteredGroups}
          invoices={filteredInvoices}
        />
      </Container>
    </div>
  )
}
