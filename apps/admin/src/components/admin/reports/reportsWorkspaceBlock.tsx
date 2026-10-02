"use client"

import * as React from "react"

import type { AdminReportItem } from "@clubkey/types"
import { TableTitle } from "@clubkey/ui"
import { Buildings } from "@phosphor-icons/react"

import { ReportCardItem } from "./reportCardItem"
import { ReportsWorkspaceScopeFilter } from "./reportsWorkspaceScopeFilter"

export interface ReportsWorkspaceBlockProps {
  reports: AdminReportItem[]
  onGenerateReport: (
    report: AdminReportItem,
    options?: {
      dateFrom?: string
      dateTo?: string
      selectedColumns?: string[]
    }
  ) => Promise<void> | void
  workspace: string
  onWorkspaceChange: (ws: string) => void
  property: string
  onPropertyChange: (prop: string) => void
  dateFrom?: Date
  onDateFromChange: (d?: Date) => void
  dateTo?: Date
  onDateToChange: (d?: Date) => void
  status: string
  onStatusChange: (status: string) => void
  reservationType: string
  onReservationTypeChange: (type: string) => void
  onResetScope: () => void
}

export function ReportsWorkspaceBlock({
  reports,
  onGenerateReport,
  workspace,
  onWorkspaceChange,
  property,
  onPropertyChange,
  dateFrom,
  onDateFromChange,
  dateTo,
  onDateToChange,
  status,
  onStatusChange,
  reservationType,
  onReservationTypeChange,
  onResetScope,
}: ReportsWorkspaceBlockProps): React.JSX.Element {
  const workspaceReports = reports.filter((r) => r.block === "WORKSPACE")

  return (
    <section className="space-y-4">
      <TableTitle
        title="Relatórios ClubKey por Workspace"
        description="Mesmos geradores disponíveis no painel do host, com escopo administrativo global: workspace e imóvel opcionais."
      />

      <ReportsWorkspaceScopeFilter
        workspace={workspace}
        onWorkspaceChange={onWorkspaceChange}
        property={property}
        onPropertyChange={onPropertyChange}
        dateFrom={dateFrom}
        onDateFromChange={onDateFromChange}
        dateTo={dateTo}
        onDateToChange={onDateToChange}
        status={status}
        onStatusChange={onStatusChange}
        reservationType={reservationType}
        onReservationTypeChange={onReservationTypeChange}
        onResetScope={onResetScope}
      />

      {workspaceReports.length === 0 ? (
        <div className="p-8 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 text-center space-y-2 bg-white/50 dark:bg-[#141416]/50">
          <Buildings size={32} className="mx-auto text-zinc-400" />
          <p className="text-sm font-semibold text-zinc-900 dark:text-white">
            Nenhum relatório encontrado
          </p>
          <p className="text-xs text-zinc-500">
            Tente ajustar o termo de busca na barra superior.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {workspaceReports.map((report) => (
            <ReportCardItem
              key={report.id}
              report={report}
              onGenerate={onGenerateReport}
              selectedWorkspace={workspace}
              selectedProperty={property}
            />
          ))}
        </div>
      )}
    </section>
  )
}
