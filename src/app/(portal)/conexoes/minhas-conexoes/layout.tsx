import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Minhas Conexões",
  description:
    "Gerencie seus contatos ativos, aprove convites recebidos com ganho de XP e acompanhe suas metas de networking no ClubKey.",
}

export default function MinhasConexoesLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return <>{children}</>
}
