import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Redefinir Senha",
  description:
    "Defina uma nova senha de segurança para sua conta no ClubKey.",
}

export default function ResetPasswordLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return <>{children}</>
}
