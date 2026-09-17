import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Missões & Conquistas | KeyPass",
  description:
    "Complete missões semanais e de temporada, resgate drops e desbloqueie insígnias de honra no ClubKey.",
}

export default function MissoesLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return <>{children}</>
}
