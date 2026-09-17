import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Minhas Hospedagens & Reservas",
  description:
    "Acompanhe suas estadias confirmadas, comprovantes oficiais e datas de check-in e check-out.",
}

export default function MinhasHospedagensLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return <>{children}</>
}
