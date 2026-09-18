import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Criar Conta • Membership",
  description:
    "Cadastre-se e ative seu passe de membro no ClubKey para destravar descontos e acesso a networking exclusivo.",
}

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return <>{children}</>
}
