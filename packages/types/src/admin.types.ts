export type AdminUserLevel =
  | "BRONZE"
  | "PRATA"
  | "OURO"
  | "BLACK"
  | "DIAMANTE"
  | "PATRONO"

// Alias for backwards compatibility
export type AdminUserTier = AdminUserLevel

export type AdminAccountStatus =
  | "CONFIRMADO"
  | "PENDENTE"
  | "BLOQUEADO"
  | "EM_ANALISE"

export type FeatureStatus = "ON" | "OFF"

export interface WalletBalances {
  available: number
  blocked: number
  total: number
  token: string
}

export interface AdminUser {
  id: string
  idTag: string
  name: string
  email: string
  handle: string
  avatar?: string
  initials: string
  avatarColor?: string
  taxa: number
  createdAt: string
  documentType: "CPF" | "CNPJ" // Chamado de "Tipo"
  documentNumber: string
  level: AdminUserLevel // Chamado de "Level" (Bronze, Prata, Ouro, Black, Diamante, Patrono)
  tier?: AdminUserTier // Alias opcional
  p2pStatus: FeatureStatus
  saqueStatus: FeatureStatus
  accountStatus: AdminAccountStatus
  walletFireblocks: string
  balances: WalletBalances
  phone?: string
  city?: string
  state?: string
  birthDate?: string
}
