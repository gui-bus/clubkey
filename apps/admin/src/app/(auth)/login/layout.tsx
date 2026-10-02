import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login",
  description: "Acesso restrito para administradores e gestores da plataforma ClubKey.",
}

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
