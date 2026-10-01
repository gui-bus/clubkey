"use client"

import * as React from "react"

import { MOCK_ADMIN_USERS } from "@/src/data/mocks/adminUsers.data"
import { MOCK_PROPERTIES } from "@/src/data/mocks/properties.data"
import {
  MOCK_RECENT_REPORTS,
  MOCK_REPORTS,
} from "@/src/data/mocks/reports.data"
import type { AdminReportItem, ReportExecutionLog } from "@clubkey/types"
import {
  TableFilterBar,
  type TableSearchFieldOption,
  type TableStatItem,
  TableStats,
  toast,
} from "@clubkey/ui"
import { formatCurrency } from "@clubkey/utils"
import {
  Buildings,
  CalendarCheck,
  CheckCircle,
  CurrencyDollar,
  Database,
  FileText,
  MagnifyingGlass,
  Tag,
  UsersThree,
  X,
} from "@phosphor-icons/react"
import { parseAsString, parseAsStringLiteral, useQueryState } from "nuqs"

import { Container } from "@/src/components/common/container"

import { AdminHero } from "../common/adminHero"
import { ReportsFiscalBlock } from "./reportsFiscalBlock"
import { ReportsPlatformBlock } from "./reportsPlatformBlock"
import { ReportsRecentCard } from "./reportsRecentCard"
import { REPORT_TABS, type ReportTabId, ReportsTabsNav } from "./reportsTabsNav"
import { ReportsWorkspaceBlock } from "./reportsWorkspaceBlock"

const SEARCH_FIELDS = ["ALL", "title", "tag", "source"] as const
const TAB_IDS: ReportTabId[] = ["plataforma", "workspace", "fiscal"]

const SEARCH_FIELD_OPTIONS: TableSearchFieldOption[] = [
  {
    value: "ALL",
    label: "Todos os campos",
    short: "Geral",
    placeholder: "Buscar por título, módulo, tag ou fonte...",
    icon: MagnifyingGlass,
  },
  {
    value: "title",
    label: "Título do Relatório",
    short: "Título",
    placeholder: "Digitar título do relatório...",
    icon: FileText,
  },
  {
    value: "tag",
    label: "Módulo / Tag",
    short: "Módulo",
    placeholder: "Digitar tag (ex: Auditoria, Tokens, Keys)...",
    icon: Tag,
  },
  {
    value: "source",
    label: "Fonte de Dados",
    short: "Fonte",
    placeholder: "Digitar fonte de dados...",
    icon: Database,
  },
]

export function ReportsClient(): React.JSX.Element {
  const [reports] = React.useState<AdminReportItem[]>(MOCK_REPORTS)
  const [recentLogs, setRecentLogs] =
    React.useState<ReportExecutionLog[]>(MOCK_RECENT_REPORTS)

  const [activeNavTab, setActiveNavTab] = useQueryState(
    "tab",
    parseAsStringLiteral(TAB_IDS)
      .withDefault("plataforma")
      .withOptions({ shallow: true })
  )

  const [searchQuery, setSearchQuery] = useQueryState(
    "q",
    parseAsString
      .withDefault("")
      .withOptions({ shallow: true, throttleMs: 250 })
  )
  const [searchField, setSearchField] = useQueryState(
    "campo",
    parseAsStringLiteral(SEARCH_FIELDS)
      .withDefault("ALL")
      .withOptions({ shallow: true })
  )

  const [workspace, setWorkspace] = useQueryState(
    "ws",
    parseAsString.withDefault("ALL").withOptions({ shallow: true })
  )
  const [property, setProperty] = useQueryState(
    "imovel",
    parseAsString.withDefault("ALL").withOptions({ shallow: true })
  )
  const [statusScope, setStatusScope] = useQueryState(
    "status",
    parseAsString.withDefault("ALL").withOptions({ shallow: true })
  )
  const [reservationType, setReservationType] = useQueryState(
    "tipoReserva",
    parseAsString.withDefault("ALL").withOptions({ shallow: true })
  )

  const [dateFrom, setDateFrom] = React.useState<Date | undefined>(undefined)
  const [dateTo, setDateTo] = React.useState<Date | undefined>(undefined)

  const [lastGeneratedInfo, setLastGeneratedInfo] = React.useState<{
    title: string
    timestamp: string
  } | null>(null)

  const filteredReports = React.useMemo(() => {
    return reports.filter((report) => {
      const query = searchQuery.toLowerCase().trim()

      let matchesSearch = true
      if (query) {
        if (searchField === "title") {
          matchesSearch = report.title.toLowerCase().includes(query)
        } else if (searchField === "tag") {
          matchesSearch = report.badge.toLowerCase().includes(query)
        } else if (searchField === "source") {
          matchesSearch = report.source.toLowerCase().includes(query)
        } else {
          matchesSearch =
            report.title.toLowerCase().includes(query) ||
            report.description.toLowerCase().includes(query) ||
            report.badge.toLowerCase().includes(query) ||
            report.source.toLowerCase().includes(query)
        }
      }

      if (!matchesSearch) return false

      return true
    })
  }, [reports, searchQuery, searchField])

  const plataformaCount = React.useMemo(
    () => filteredReports.filter((r) => r.block === "PLATAFORMA").length,
    [filteredReports]
  )
  const workspaceCount = React.useMemo(
    () => filteredReports.filter((r) => r.block === "WORKSPACE").length,
    [filteredReports]
  )
  const fiscalCount = React.useMemo(
    () => filteredReports.filter((r) => r.block === "FISCAL").length,
    [filteredReports]
  )

  const handleGenerateReport = async (
    report: AdminReportItem,
    options?: {
      dateFrom?: string
      dateTo?: string
      selectedColumns?: string[]
    }
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 800))

    const now = new Date()
    const formattedDate = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(
      now.getHours()
    ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`

    const fileContent = `RELATÓRIO: ${report.title.toUpperCase()}
Módulo: ${report.badge}
Gerado em: ${formattedDate}
Fonte: ${report.source}
Escopo Workspace: ${workspace}
Escopo Imóvel: ${property}
Formato: Planilha Excel (XLSX)
==================================================
Dados exportados com sucesso da plataforma ClubKey.`

    const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${report.id}_export_${now.getTime()}.xlsx`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    const newLog: ReportExecutionLog = {
      id: `rep-${now.getTime()}`,
      reportId: report.id,
      reportTitle: report.title,
      format: "XLSX",
      status: "COMPLETED",
      generatedAt: formattedDate,
      fileSize: "2.4 MB",
      downloadUrl: "#",
      filterSummary:
        options?.selectedColumns && options.selectedColumns.length > 0
          ? `${options.selectedColumns.length} colunas selecionadas`
          : `Planilha consolidada`,
    }

    setRecentLogs((prev) => [newLog, ...prev.slice(0, 5)])
    setLastGeneratedInfo({
      title: report.title,
      timestamp: formattedDate,
    })

    toast.success("Relatório gerado com sucesso!", {
      description: `A planilha "${report.title}" foi processada e baixada automaticamente.`,
      duration: 4000,
    })
  }

  const handleDownloadLog = (log: ReportExecutionLog) => {
    toast.info(`Baixando ${log.reportTitle}...`, {
      description: `Planilha XLSX de ${log.fileSize}.`,
    })
  }

  const handleResetFilters = () => {
    void setSearchQuery(null)
    void setSearchField(null)
  }

  const handleResetScope = () => {
    setWorkspace("ALL")
    setProperty("ALL")
    setDateFrom(undefined)
    setDateTo(undefined)
    setStatusScope("ALL")
    setReservationType("ALL")
  }

  const statsItems: TableStatItem[] = React.useMemo(() => {
    const totalRevenue = MOCK_PROPERTIES.reduce(
      (acc, p) => acc + (p.revenueLastMonth || 0),
      0
    )
    const totalProperties = MOCK_PROPERTIES.length
    const avgOccupancy =
      totalProperties > 0
        ? Math.round(
            MOCK_PROPERTIES.reduce(
              (acc, p) => acc + (p.occupancyRate || 0),
              0
            ) / totalProperties
          )
        : 0
    const totalUsers = MOCK_ADMIN_USERS.length
    const confirmedUsers = MOCK_ADMIN_USERS.filter(
      (u) => u.accountStatus === "CONFIRMADO"
    ).length
    const kycPct = Math.round((confirmedUsers / (totalUsers || 1)) * 100)

    return [
      {
        label: "Faturamento Consolidado",
        value: formatCurrency(totalRevenue),
        subtext: `Receita bruta mensal • ${totalProperties} imóveis`,
        icon: CurrencyDollar,
      },
      {
        label: "Reservas & Estadias",
        value: "324 Reservas",
        subtext: `${avgOccupancy}% taxa média de ocupação`,
        icon: CalendarCheck,
      },
      {
        label: "Imóveis sob Gestão",
        value: `${totalProperties} Imóveis`,
        subtext: "12 workspaces ativos na rede",
        icon: Buildings,
      },
      {
        label: "Membros & Usuários",
        value: `${totalUsers} Usuários`,
        subtext: `${kycPct}% com documentação KYC aprovada`,
        icon: UsersThree,
      },
    ]
  }, [])

  return (
    <div className="w-full flex flex-col">
      <AdminHero
        imageSrc="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1920&auto=format&fit=crop&q=80"
        imageAlt="Central de Relatórios"
        badge="PORTAL INTERNO • ACESSO AUDITADO"
        title="CENTRAL DE RELATÓRIOS"
        description="Gestão e exportação de dados consolidados, auditoria técnica de integrações, conciliação de transações e relatórios por workspace."
      >
        <TableFilterBar
          searchQuery={searchQuery}
          onSearchQueryChange={(v) => void setSearchQuery(v || null)}
          searchFields={SEARCH_FIELD_OPTIONS}
          selectedSearchField={searchField}
          onSearchFieldChange={(f) =>
            void setSearchField(f as typeof searchField)
          }
          onReset={handleResetFilters}
          actionTitle="Pesquisar relatórios"
        />
      </AdminHero>

      <Container className="space-y-6 pt-6 pb-12">
        <TableStats items={statsItems} />

        <ReportsTabsNav
          activeTab={activeNavTab}
          onTabChange={setActiveNavTab}
          plataformaCount={plataformaCount}
          workspaceCount={workspaceCount}
          fiscalCount={fiscalCount}
        />

        {lastGeneratedInfo && (
          <div className="flex items-center justify-between gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/40 text-emerald-900 dark:text-emerald-200 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5">
              <CheckCircle
                size={20}
                weight="bold"
                className="text-emerald-600 dark:text-emerald-400 shrink-0"
              />
              <span>
                Planilha <strong>{lastGeneratedInfo.title}</strong> gerada com
                sucesso às {lastGeneratedInfo.timestamp}. O download foi
                concluído.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setLastGeneratedInfo(null)}
              className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-200 cursor-pointer p-1"
              title="Fechar aviso"
            >
              <X size={14} weight="bold" />
            </button>
          </div>
        )}

        <div className="pt-2">
          {activeNavTab === "plataforma" && (
            <ReportsPlatformBlock
              reports={filteredReports}
              onGenerateReport={handleGenerateReport}
            />
          )}

          {activeNavTab === "workspace" && (
            <ReportsWorkspaceBlock
              reports={filteredReports}
              onGenerateReport={handleGenerateReport}
              workspace={workspace}
              onWorkspaceChange={setWorkspace}
              property={property}
              onPropertyChange={setProperty}
              dateFrom={dateFrom}
              onDateFromChange={setDateFrom}
              dateTo={dateTo}
              onDateToChange={setDateTo}
              status={statusScope}
              onStatusChange={setStatusScope}
              reservationType={reservationType}
              onReservationTypeChange={setReservationType}
              onResetScope={handleResetScope}
            />
          )}

          {activeNavTab === "fiscal" && (
            <ReportsFiscalBlock
              reports={filteredReports}
              onGenerateReport={handleGenerateReport}
            />
          )}
        </div>

        <ReportsRecentCard logs={recentLogs} onDownload={handleDownloadLog} />
      </Container>
    </div>
  )
}
