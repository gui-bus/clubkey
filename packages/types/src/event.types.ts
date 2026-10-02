export interface EventHighlight {
  title: string
  desc: string
  icon?: string
}

export interface EventItem {
  id: number
  title: string
  day: string
  month: string
  weekday: string
  time: string
  place: string
  organizerId: number
  capacity: number
  initialConfirmed: number
  desc: string
  participants: number[]
  category?: string
  spots?: number
  xp?: number
  host?: {
    firstName: string
    lastName: string
    role: string
    avatar?: string
  }
  image?: string
  dressCode?: string
  format?: string
  highlights?: EventHighlight[]
  inclusions?: string[]
}
