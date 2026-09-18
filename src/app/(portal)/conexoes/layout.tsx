import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Conexões & Rede de Membros",
  description:
    "Descubra e conecte-se com fundadores, executivos C-Level e investidores no círculo restrito do ClubKey.",
}

export default function ConexoesLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return <>{children}</>
}
