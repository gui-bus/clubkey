import type { Metadata } from "next"

import { brandConfig } from "@/src/config/brand.config"

export const metadata: Metadata = {
  title: "Acesse sua Conta • Login",
  description: `Entre com suas credenciais para acessar o círculo restrito de membros do ${brandConfig.name}.`,
}

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return <>{children}</>
}
