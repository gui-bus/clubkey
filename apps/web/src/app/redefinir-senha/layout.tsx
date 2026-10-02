import type { Metadata } from "next"

import { brandConfig } from "@/src/config/brand.config"

export const metadata: Metadata = {
  title: "Redefinir Senha",
  description: `Defina uma nova senha de segurança para sua conta no ${brandConfig.name}.`,
}

export default function ResetPasswordLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return <>{children}</>
}
