import type { Metadata } from "next"

import { CreateExperienceClient } from "@/src/components/admin/experiences/createExperienceClient"

export const metadata: Metadata = {
  title: "Nova Experiência | Painel Admin ClubKey",
  description: "Cadastro e publicação de nova experiência no catálogo ClubKey.",
}

export default function CreateExperiencePage(): React.JSX.Element {
  return <CreateExperienceClient />
}
