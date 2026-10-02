import type { EventItem, ExperienceItem, Member, StayItem } from "@/src/types"

export function slugify(text: string): string {
  if (!text) return ""
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function getEventSlug(event: EventItem | { title: string }): string {
  return slugify(event.title)
}

export function getExperienceSlug(
  exp: ExperienceItem | { title: string }
): string {
  return slugify(exp.title)
}

export function getMemberSlug(
  member: Member | { firstName?: string; lastName?: string; name?: string }
): string {
  const fullName =
    member.firstName || member.lastName
      ? `${member.firstName || ""} ${member.lastName || ""}`.trim()
      : (member as { name?: string }).name || ""
  return slugify(fullName)
}

export function getStaySlug(
  stay: StayItem | { name?: string; stayName?: string }
): string {
  if ("name" in stay && stay.name) return slugify(stay.name)
  if ("stayName" in stay && stay.stayName) return slugify(stay.stayName)
  return "reserva"
}
