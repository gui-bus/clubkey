import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Meu Perfil",
  description:
    "Gerenciamento de credenciais, informações pessoais e segurança administrativa.",
}

export default function AdminProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
