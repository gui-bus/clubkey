import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Benefícios",
  description:
    "Gestão de benefícios, parceiros corporativos e resgates de vantagens exclusivas.",
}

export default function BeneficiosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
