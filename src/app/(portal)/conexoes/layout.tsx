import type { Metadata } from "next"

import { brandConfig } from "@/src/config/brand.config"

export const metadata: Metadata = {
  title: "Conexões & Rede de Membros",
  description: `Descubra e conecte-se com fundadores, executivos C-Level e investidores no círculo restrito do ${brandConfig.name}.`,
}

export default function ConexoesLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return <>{children}</>
}
