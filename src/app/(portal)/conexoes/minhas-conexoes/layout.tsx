import type { Metadata } from "next"

import { brandConfig } from "@/src/config/brand.config"

export const metadata: Metadata = {
  title: "Minhas Conexões",
  description: `Gerencie seus contatos ativos, aprove convites recebidos com ganho de XP e acompanhe suas metas de networking no ${brandConfig.name}.`,
}

export default function MinhasConexoesLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return <>{children}</>
}
