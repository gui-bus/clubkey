import { redirect } from "next/navigation"
import { EXPERIENCES, getExperienceSlug } from "@/src/data/portalData"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ExperienciaIdRedirectPage({
  params,
}: PageProps): Promise<never> {
  const { id } = await params
  const experience = EXPERIENCES.find((e) => e.id === Number(id))
  if (experience) {
    redirect(`/experiencias/${experience.id}/${getExperienceSlug(experience)}`)
  }
  redirect(`/experiencias`)
}
