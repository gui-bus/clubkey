import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Acomodações & Estadias Exclusivas",
  description:
    "Viaje o ano todo pagando tarifas exclusivas de membro e até 60% OFF em reservas last minute no ClubKey.",
}

export default function HospedagensLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return <>{children}</>
}
