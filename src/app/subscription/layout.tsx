import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Associação & Planos de Membro",
  description:
    "Garanta acesso imediato a descontos exclusivos de até 60% em hotéis boutique e resort no ClubKey.",
}

export default function SubscriptionLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return <>{children}</>
}
