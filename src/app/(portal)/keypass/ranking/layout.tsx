import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ranking Geral de Membros | KeyPass",
  description:
    "Veja o leaderboard da temporada atual e compare sua pontuação de XP e status com outros membros do ClubKey.",
}

export default function RankingLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return <>{children}</>
}
