import type { Metadata } from "next"

import { brandConfig } from "@/src/config/brand.config"

export const metadata: Metadata = {
  title: "Recuperar Senha",
  description: `Instruções para recuperação e redefinição da sua senha de acesso ao ${brandConfig.name}.`,
}

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return <>{children}</>
}
