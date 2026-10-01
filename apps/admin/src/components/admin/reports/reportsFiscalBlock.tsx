"use client"

import * as React from "react"

import type { AdminReportItem } from "@clubkey/types"
import { TableTitle } from "@clubkey/ui"
import { Receipt } from "@phosphor-icons/react"

import { ReportCardItem } from "./reportCardItem"

export interface ReportsFiscalBlockProps {
  reports: AdminReportItem[]
  onGenerateReport: (
    report: AdminReportItem,
    options?: {
      dateFrom?: string
      dateTo?: string
      selectedColumns?: string[]
    }
  ) => Promise<void> | void
}

export function ReportsFiscalBlock({
  reports,
  onGenerateReport,
}: ReportsFiscalBlockProps): React.JSX.Element {
  const fiscalReports = reports.filter((r) => r.category === "FISCAL_DECRIPTO")

  return (
    <section className="space-y-4">
      <TableTitle
        title="Módulo Fiscal & DeCripto (IN 1888/RFB)"
        description="Planilhas e demonstrativos de conciliação fiscal, informes de rendimentos e arquivos de declaração regulatória de criptoativos e FIAT."
      />

      {fiscalReports.length === 0 ? (
        <div className="p-8 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 text-center space-y-2 bg-white/50 dark:bg-[#141416]/50">
          <Receipt size={32} className="mx-auto text-zinc-400" />
          <p className="text-sm font-semibold text-zinc-900 dark:text-white">
            Nenhum relatório fiscal encontrado
          </p>
          <p className="text-xs text-zinc-500">
            Tente ajustar o termo de busca na barra superior.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {fiscalReports.map((report) => (
            <ReportCardItem
              key={report.id}
              report={report}
              onGenerate={onGenerateReport}
            />
          ))}
        </div>
      )}
    </section>
  )
}
