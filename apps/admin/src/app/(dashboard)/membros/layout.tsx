import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Membros",
  description:
    "Gestão de membros associados, aprovações de cadastro e status de membership.",
}

export default function MembrosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
