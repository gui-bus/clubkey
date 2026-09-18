import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Meu Perfil Executivo",
  description:
    "Gerencie suas informações cadastrais, interesses de networking, tags de negócio e credenciais de segurança.",
}

export default function PerfilLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return <>{children}</>
}
