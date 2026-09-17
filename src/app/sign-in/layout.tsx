import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Acesse sua Conta • Login",
  description:
    "Entre com suas credenciais para acessar o círculo restrito de membros do ClubKey.",
}

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return <>{children}</>
}
