import type { Metadata } from "next"

import { brandConfig } from "@/src/config/brand.config"

export const metadata: Metadata = {
  title: "Criar Conta • Membership",
  description: `Cadastre-se e ative seu passe de membro no ${brandConfig.name} para destravar descontos e acesso a networking exclusivo.`,
}

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return <>{children}</>
}
