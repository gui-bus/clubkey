import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Benefícios & Parcerias Exclusivas",
  description:
    "Condições e cortesias exclusivas com parceiros de saúde, educação, aviação executiva e gastronomia premium.",
}

export default function BeneficiosLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return <>{children}</>
}
