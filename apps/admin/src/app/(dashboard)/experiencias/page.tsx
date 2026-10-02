import type { Metadata } from "next"

import { ExperiencesClient } from "@/src/components/admin/experiences/experiencesClient"

export const metadata: Metadata = {
  title: "Gestão de Experiências | Painel Admin ClubKey",
  description:
    "Gestão e controle de experiências exclusivas, lotação de vagas e curadoria.",
}

export default function ExperiencesPage(): React.JSX.Element {
  return <ExperiencesClient />
}
