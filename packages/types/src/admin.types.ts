export type AdminUserLevel =
  | "BRONZE"
  | "PRATA"
  | "OURO"
  | "BLACK"
  | "DIAMANTE"
  | "PATRONO"

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
  documentType: "CPF" | "CNPJ"
  documentNumber: string
  level: AdminUserLevel
  tier?: AdminUserTier
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

export type AdministratorStatus = "ATIVO" | "INATIVO"

export type AdministratorRole = "SUPER_ADMIN" | "ADMIN" | "GERENTE" | "OPERADOR"

export interface Administrator {
  id: string
  idTag: string
  name: string
  email: string
  avatar?: string
  initials: string
  avatarColor?: string
  role: AdministratorRole
  roleLabel?: string
  status: AdministratorStatus
  twoFactorEnabled: boolean
  createdAt: string
  updatedAt: string
  lastLogin: string
  phone?: string
}

