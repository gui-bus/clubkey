export interface ExperienceItem {
  id: number
  title: string
  date: string
  day?: string
  month?: string
  weekday?: string
  time?: string
  place: string
  price: number
  sub: string
  desc: string
  includes: string[]
  participants: number[]
  image?: string
  xp?: number
}
