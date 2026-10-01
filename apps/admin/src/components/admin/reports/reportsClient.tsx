"use client"

import * as React from "react"

import {
  MOCK_RECENT_REPORTS,
  MOCK_REPORTS,
} from "@/src/data/mocks/reports.data"
import type {
  AdminReportItem,
  ReportExecutionLog,
} from "@clubkey/types"
import { toast } from "@clubkey/ui"
import { CheckCircle, X } from "@phosphor-icons/react"
import { parseAsString, parseAsStringLiteral, useQueryState } from "nuqs"

import { Container } from "@/src/components/common/container"

import { AdminHero } from "../common/adminHero"
import { ReportsFiscalBlock } from "./reportsFiscalBlock"
import {
  ReportsFilterBar,
  type ReportSearchField,
} from "./reportsFilterBar"
import { ReportsPlatformBlock } from "./reportsPlatformBlock"
import { ReportsRecentCard } from "./reportsRecentCard"
import { ReportsStats } from "./reportsStats"
import {
  REPORT_TABS,
  ReportsTabsNav,
  type ReportTabId,
} from "./reportsTabsNav"
import { ReportsWorkspaceBlock } from "./reportsWorkspaceBlock"

const SEARCH_FIELDS = ["ALL", "title", "tag", "source"] as const
const TAB_IDS: ReportTabId[] = ["plataforma", "workspace", "fiscal"]

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
  const [categoryFilter, setCategoryFilter] = useQueryState(
    "categoria",
    parseAsString.withDefault("ALL").withOptions({ shallow: true })
  )
  const [blockFilter, setBlockFilter] = useQueryState(
    "bloco",
    parseAsString.withDefault("ALL").withOptions({ shallow: true })
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

      if (categoryFilter !== "ALL" && report.category !== categoryFilter) {
        return false
      }

      if (blockFilter !== "ALL" && report.block !== blockFilter) {
        return false
      }

      return true
    })
  }, [reports, searchQuery, searchField, categoryFilter, blockFilter])

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
    setSearchQuery("")
    setSearchField("ALL")
    setCategoryFilter("ALL")
    setBlockFilter("ALL")
  }

  const handleResetScope = () => {
    setWorkspace("ALL")
    setProperty("ALL")
    setDateFrom(undefined)
    setDateTo(undefined)
    setStatusScope("ALL")
    setReservationType("ALL")
  }

  return (
    <div className="w-full flex flex-col pb-12">
      <AdminHero
        imageSrc="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1920&auto=format&fit=crop&q=80"
        imageAlt="Central de Relatórios"
        badge="PORTAL INTERNO • ACESSO AUDITADO"
        title="CENTRAL DE RELATÓRIOS"
        description="Gestão e exportação de dados consolidados, auditoria técnica de integrações, conciliação de transações e relatórios por workspace."
      >
        <ReportsFilterBar
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          searchField={searchField}
          onSearchFieldChange={setSearchField}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
          blockFilter={blockFilter}
          onBlockChange={setBlockFilter}
          onReset={handleResetFilters}
        />
      </AdminHero>

      <Container className="space-y-6 -mt-3 sm:-mt-8">
        <ReportsStats reports={reports} recentLogs={recentLogs} />

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
                sucesso às {lastGeneratedInfo.timestamp}. O download foi concluído.
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
