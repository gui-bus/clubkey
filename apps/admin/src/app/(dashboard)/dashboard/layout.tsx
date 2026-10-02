import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Visão consolidada de métricas operacionais, faturamento e performance.",
}

export default function DashboardPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
