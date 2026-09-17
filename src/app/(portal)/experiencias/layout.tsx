import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Experiências Exclusivas & Enogastronomia",
  description:
    "Momentos gastronômicos, esportivos, náuticos e culturais com acesso restrito e vagas limitadas para membros do ClubKey.",
}

export default function ExperienciasLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return <>{children}</>
}
