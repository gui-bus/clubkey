import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Recuperar Senha",
  description:
    "Instruções para recuperação e redefinição da sua senha de acesso ao ClubKey.",
}

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return <>{children}</>
}
