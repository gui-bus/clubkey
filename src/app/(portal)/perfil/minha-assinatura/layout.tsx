import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Minha Assinatura & Plano",
  description:
    "Acompanhe o status do seu plano de membership, forma de pagamento, renovação e histórico de faturas.",
}

export default function MinhaAssinaturaLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return <>{children}</>
}
