import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Agenda de Eventos & Encontros",
  description:
    "Encontros mensais, jantares de networking, visitas técnicas e rodas de conversa exclusivas para membros do ClubKey.",
}

export default function EventosLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return <>{children}</>
}
