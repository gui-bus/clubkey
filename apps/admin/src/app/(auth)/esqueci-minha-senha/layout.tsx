import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Recuperar Senha",
  description:
    "Recuperação de acesso e redefinição de credenciais administrativas.",
}

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
