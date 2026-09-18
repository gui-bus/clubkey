export type TierId =
  "membro" | "associado" | "titular" | "investidor" | "incorporador" | "patrono"

export interface Member {
  id: number
  firstName: string
  lastName: string
  role: string
  company: string
  city: string
  avatar?: string
  image?: string
  seeking: string[]
  offering: string[]
  memberSince?: string | number
  socials?: {
    linkedin?: string
    website?: string
    instagram?: string
  }
  tierId?: TierId
  xp?: number
  ribTokens?: number
  rank?: number
  unlockedBadgeIds?: string[]
}

export interface UserProfile {
  firstName: string
  lastName: string
  email?: string
  nationality?: "brasileiro" | "estrangeiro"
  cpf?: string
  birthDate?: string
  phone?: { dialCode: string; number: string }
  companyName?: string
  cnpj?: string
  corporateEmail?: string
  openingDate?: string
  role: string
  company: string
  city: string
  avatar: string
  coverImage?: string
  bio: string
  seeking: string[]
  offering: string[]
}

export type MemberConnectionStatus = "none" | "pending" | "connected"
