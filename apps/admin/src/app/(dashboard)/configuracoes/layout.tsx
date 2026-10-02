import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Configurações",
  description:
    "Parâmetros gerais, módulos ativos e configurações de segurança da plataforma.",
}

export default function ConfiguracoesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
