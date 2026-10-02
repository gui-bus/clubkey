import type { Metadata } from "next"

import { assertModule } from "@/src/config/brand.config"

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
  assertModule("stays")

  return <>{children}</>
}
