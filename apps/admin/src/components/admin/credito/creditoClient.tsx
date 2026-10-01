"use client"

import * as React from "react"

import {
  MOCK_CREDIT_LINE_OPTIONS,
  MOCK_CREDIT_REQUESTS,
  MOCK_CREDIT_STATUS_OPTIONS,
} from "@/src/data/mocks/credito.data"
import type { AdminCreditRequest } from "@clubkey/types"
import {
  TableFilterBar,
  type TableFilterSection,
  type TableStatItem,
  TableStats,
  TableTitle,
  toast,
} from "@clubkey/ui"
import { formatCurrency } from "@clubkey/utils"
import {
  CalendarBlank,
  CheckCircle,
  ClockCountdown,
  CreditCard,
  FileText,
  ShieldCheck,
  TrendUp,
} from "@phosphor-icons/react"
import { parseAsString, useQueryState } from "nuqs"

import { Container } from "@/src/components/common/container"

import { AdminHero } from "../common/adminHero"
import { CreditoTable } from "./creditoTable"

export function CreditoClient(): React.JSX.Element {
  const [requests] = React.useState<AdminCreditRequest[]>(MOCK_CREDIT_REQUESTS)

  const [searchQuery, setSearchQuery] = useQueryState(
    "q",
    parseAsString
      .withDefault("")
      .withOptions({ shallow: true, throttleMs: 250 })
  )
  const [statusFilter, setStatusFilter] = useQueryState(
    "status",
    parseAsString.withDefault("ALL").withOptions({ shallow: true })
  )
  const [lineFilter, setLineFilter] = useQueryState(
    "linha",
    parseAsString.withDefault("ALL").withOptions({ shallow: true })
  )
  const [dateFrom, setDateFrom] = useQueryState(
    "de",
    parseAsString.withDefault("").withOptions({ shallow: true })
  )
  const [dateTo, setDateTo] = useQueryState(
    "ate",
    parseAsString.withDefault("").withOptions({ shallow: true })
  )

  const filteredRequests = React.useMemo(() => {
    return requests.filter((req) => {
      const q = searchQuery.toLowerCase().trim()
      if (q) {
        const matchesName = req.applicantName.toLowerCase().includes(q)
        const matchesEmail = req.applicantEmail.toLowerCase().includes(q)
        const matchesCode = req.code.toLowerCase().includes(q)
        const matchesWorkspace = (req.workspaceName || "")
          .toLowerCase()
          .includes(q)
        const matchesProperty = (req.propertyTitle || "")
          .toLowerCase()
          .includes(q)

        if (
          !matchesName &&
          !matchesEmail &&
          !matchesCode &&
          !matchesWorkspace &&
          !matchesProperty
        ) {
          return false
        }
      }

      if (statusFilter !== "ALL" && req.status !== statusFilter) {
        return false
      }

      if (lineFilter !== "ALL" && req.lineType !== lineFilter) {
        return false
      }

      return true
    })
  }, [requests, searchQuery, statusFilter, lineFilter])

  const statsItems: TableStatItem[] = React.useMemo(() => {
    const totalRequests = requests.length
    const inAnalysisCount = requests.filter(
      (r) => r.status === "EM_ANALISE" || r.status === "PENDENTE"
    ).length
    const approvedRequests = requests.filter(
      (r) => r.status === "APROVADO" || r.status === "LIQUIDADO"
    )
    const approvedAmount = approvedRequests.reduce(
      (acc, curr) => acc + (curr.approvedAmount || curr.requestedAmount || 0),
      0
    )

    return [
      {
        label: "Total de Solicitações",
        value: `${totalRequests} ${totalRequests === 1 ? "Pedido" : "Pedidos"}`,
        subtext: "Solicitações de crédito registradas",
        icon: CreditCard,
      },
      {
        label: "Em Análise / Risco",
        value: `${inAnalysisCount} ${inAnalysisCount === 1 ? "Pendente" : "Pendentes"}`,
        subtext:
          inAnalysisCount > 0
            ? "Aguardando deliberação de comitê"
            : "Sem propostas pendentes",
        icon: ClockCountdown,
      },
      {
        label: "Crédito Concedido",
        value: formatCurrency(approvedAmount),
        subtext: "Volume financeiro total liberado",
        icon: CheckCircle,
      },
      {
        label: "Taxa Média da Carteira",
        value: "0,00%",
        subtext: "Rentabilidade ponderada da carteira",
        icon: TrendUp,
      },
    ]
  }, [requests])

  const sectionsConfig: TableFilterSection[] = React.useMemo(() => {
    const statusLabel =
      statusFilter !== "ALL"
        ? MOCK_CREDIT_STATUS_OPTIONS.find((o) => o.value === statusFilter)
            ?.label || "Status"
        : "Todos os Status"

    const lineLabel =
      lineFilter !== "ALL"
        ? MOCK_CREDIT_LINE_OPTIONS.find((o) => o.value === lineFilter)?.label ||
          "Linha"
        : "Todas as Linhas"

    const dateLabel =
      dateFrom || dateTo
        ? dateFrom && dateTo
          ? `${dateFrom} a ${dateTo}`
          : dateFrom
            ? `A partir de ${dateFrom}`
            : `Até ${dateTo}`
        : "Todo o Período"

    return [
      {
        id: "status",
        label: "Status",
        icon: ShieldCheck,
        displayValue: statusLabel,
        fields: [
          {
            id: "status",
            type: "select",
            label: "Status da Solicitação",
            value: statusFilter,
            onChange: (v) => void setStatusFilter(v === "ALL" ? null : v),
            options: MOCK_CREDIT_STATUS_OPTIONS,
            chipLabel: "Status",
          },
        ],
      },
      {
        id: "linha",
        label: "Linha",
        icon: FileText,
        displayValue: lineLabel,
        fields: [
          {
            id: "linha",
            type: "select",
            label: "Linha de Crédito",
            value: lineFilter,
            onChange: (v) => void setLineFilter(v === "ALL" ? null : v),
            options: MOCK_CREDIT_LINE_OPTIONS,
            chipLabel: "Linha",
          },
        ],
      },
      {
        id: "dates",
        label: "Período",
        icon: CalendarBlank,
        displayValue: dateLabel,
        fields: [
          {
            id: "dates",
            type: "date-range",
            label: "Data da Solicitação",
            dateFrom: dateFrom || undefined,
            dateTo: dateTo || undefined,
            onDateFromChange: (d) => void setDateFrom(d || null),
            onDateToChange: (d) => void setDateTo(d || null),
            chipLabel: "Período",
          },
        ],
      },
    ]
  }, [
    statusFilter,
    lineFilter,
    dateFrom,
    dateTo,
    setStatusFilter,
    setLineFilter,
    setDateFrom,
    setDateTo,
  ])

  const handleResetFilters = () => {
    void setSearchQuery(null)
    void setStatusFilter(null)
    void setLineFilter(null)
    void setDateFrom(null)
    void setDateTo(null)
  }

  const handleRefresh = () => {
    toast.success("Operações sincronizadas", {
      description: "A esteira e fila comercial de crédito foram atualizadas.",
    })
  }

  return (
    <div className="w-full flex flex-col">
      <AdminHero
        badge="PORTAL INTERNO • ACESSO AUDITADO"
        title="Crédito"
        description="Gestão operacional de linhas de crédito, solicitações de antecipação e limites para associados com rotas protegidas."
        imageSrc="/utils/banners/beneficios.webp"
        imageAlt="Gestão de Crédito ClubKey"
      >
        <TableFilterBar
          searchQuery={searchQuery}
          onSearchQueryChange={(v) => void setSearchQuery(v || null)}
          searchLabel="E-mail / Workspace / Solicitante"
          searchPlaceholder="Buscar por e-mail, workspace, solicitante ou ID..."
          sections={sectionsConfig}
          onReset={handleResetFilters}
          onRefresh={handleRefresh}
          actionTitle="Atualizar solicitações"
        />
      </AdminHero>

      <Container className="space-y-6 pt-6 pb-12">
        <TableStats items={statsItems} />

        <TableTitle
          title="Solicitações de Crédito"
          description="Consulte a fila de propostas, status de análise de risco e operações de crédito."
        />

        <CreditoTable
          requests={filteredRequests}
          onResetFilters={handleResetFilters}
        />
      </Container>
    </div>
  )
}
