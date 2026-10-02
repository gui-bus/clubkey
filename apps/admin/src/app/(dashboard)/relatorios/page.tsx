import * as React from "react"

import type { Metadata } from "next"

import { ReportsClient } from "@/src/components/admin/reports/reportsClient"

export const metadata: Metadata = {
  title: "Relatórios",
  description:
    "Gestão e exportação de relatórios analíticos, auditoria técnica, transações e métricas por workspace.",
}

export default function RelatoriosPage(): React.JSX.Element {
  return (
    <React.Suspense fallback={null}>
      <ReportsClient />
    </React.Suspense>
  )
}
