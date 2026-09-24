import type { Metadata } from "next"

import { EXPERIENCES } from "@/src/data/portalData"

import { brandConfig } from "@/src/config/brand.config"

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ id: string; slug: string }>
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; slug: string }>
}): Promise<Metadata> {
  const { id } = await params
  const experience = EXPERIENCES.find((e) => e.id === Number(id))
  return {
    title: experience
      ? `Checkout & Reserva: ${experience.title}`
      : "Checkout de Experiência",
    description: experience
      ? `Finalize sua reserva exclusiva para ${experience.title} no ${brandConfig.name}.`
      : "Finalização e pagamento da experiência.",
  }
}

export default function CheckoutLayout({
  children,
}: LayoutProps): React.JSX.Element {
  return <>{children}</>
}
