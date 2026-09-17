import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Meus Eventos Confirmados",
  description:
    "Acompanhe os encontros, almoços e painéis estratégicos com a sua participação confirmada no ClubKey.",
}

export default function MeusEventosLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return <>{children}</>
}
