export type AdminUserLevel =
  "BRONZE" | "PRATA" | "OURO" | "BLACK" | "DIAMANTE" | "PATRONO"

export type AdminUserTier = AdminUserLevel

export type AdminAccountStatus =
  "CONFIRMADO" | "PENDENTE" | "BLOQUEADO" | "EM_ANALISE"

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

export type AdministratorRole =
  "SUPER_ADMIN" | "ADMIN" | "GERENTE" | "OPERADOR" | "SUPPORT" | "FINANCIAL"

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

export type PropertyAdminStatus = "ATIVO" | "INATIVO"

export type PropertyStayStatus =
  "DISPONIVEL" | "OCULTO" | "BLOQUEADO" | "RASCUNHO"

export type PropertyType =
  | "APARTAMENTO"
  | "CASA"
  | "VILLA"
  | "CHALE"
  | "STUDIO"
  | "PENTHOUSE"
  | "NAO_INFORMADO"

export interface PropertyHost {
  id: string
  idTag: string
  name: string
  workspaceSlug?: string
  workspaceName?: string
  avatar?: string
}

export interface AdminProperty {
  id: string
  internalCode: string
  codeTag: string
  title: string
  thumbnail: string
  propertyType: PropertyType
  propertyTypeLabel: string
  city: string
  state: string
  host: PropertyHost
  platform: string
  adminStatus: PropertyAdminStatus
  stayStatus: PropertyStayStatus
  revenueLastMonth: number
  revenueMonthReference: string
  occupiedNights: number
  availableNights: number
  revPar: number
  occupancyRate: number
  createdAt: string
  updatedAt: string
}

export type ReportCategory = "OPERACIONAIS" | "FISCAL_DECRIPTO"

export type ReportBlock = "PLATAFORMA" | "WORKSPACE" | "FISCAL"

export interface ReportColumnOption {
  id: string
  label: string
  defaultSelected?: boolean
}

export interface AdminReportItem {
  id: string
  block: ReportBlock
  category: ReportCategory
  badge: string
  title: string
  description: string
  source: string
  iconName: string
  supportsDateRange?: boolean
  supportsColumns?: boolean
  columns?: ReportColumnOption[]
  requiresWorkspace?: boolean
  requiresProperty?: boolean
}

export interface ReportExecutionLog {
  id: string
  reportId: string
  reportTitle: string
  format?: string
  status: "COMPLETED" | "PROCESSING" | "FAILED"
  generatedAt: string
  fileSize: string
  downloadUrl: string
  filterSummary?: string
}

export type InsuranceGroupStatus = "ATIVO" | "CANCELADO" | "SUSPENSO" | "EM_ATRASO"

export type InsuranceInvoiceStatus =
  | "RASCUNHO"
  | "PENDENTE"
  | "EM_CARENCIA"
  | "PAGA"
  | "ATRASADA"
  | "SUSPENSA"
  | "CANCELADA"
  | "FALHA"
  | "EM_ANALISE"

export interface InsuranceGroup {
  id: string
  name: string
  workspaceId: string
  workspaceName: string
  hostId: string
  status: InsuranceGroupStatus
  monthlyAmount: number
  propertiesCount: number
  invoicesCount: number
  updatedAt: string
  createdAt: string
  propertiesList?: string[]
  coverageDetails?: string
}

export interface InsuranceInvoice {
  id: string
  groupId: string
  groupName: string
  workspaceId: string
  workspaceName: string
  amount: number
  dueDate: string
  paidAt?: string
  status: InsuranceInvoiceStatus
  ageHoursText?: string
  opportunityRecoverable?: boolean
  invoiceUrl?: string
}

export type InsuranceQueueType =
  | "PENDING_SLA"
  | "COMMERCIAL_CONTACT"
  | "CANCELLED_24H"
  | "DIVERGENT_PAYMENT"
  | "OVERDUE_SUSPENDED"
  | "WEBHOOK_DELAYED"

export interface InsuranceQueueItem {
  id: string
  queueType: InsuranceQueueType
  title: string
  subtitle?: string
  workspace: string
  invoiceId?: string
  groupId?: string
  amount?: number
  ageText?: string
  status: string
}

export interface InsuranceCycleVariables {
  reminderDaysBefore: number
  graceDaysBeforeCancel: number
  autoRecurringGeneration: boolean
  webhookTimeoutMinutes: number
  maxRetryAttempts: number
  superAdminOnly: boolean
}

export type ClaimStatus = "ABERTO" | "EM_ANALISE" | "PAGO" | "RECUSADO"

export type ClaimType =
  | "DANOS_GERAIS"
  | "INCENDIO_EXPLOSAO"
  | "ROUBO_FURTO"
  | "DANOS_ELETRICOS"
  | "VENDAVAL_GRANIZO"
  | "QUEDA_RAIO"
  | "IMPACTO_VEICULOS"

export interface ClaimDocument {
  id: string
  title: string
  fileName: string
  fileUrl: string
  fileType: "image" | "pdf" | "document"
  fileSize: string
  uploadedAt: string
}

export interface ClaimMessage {
  id: string
  authorName: string
  authorRole: string
  authorAvatar?: string
  content: string
  createdAt: string
  isInternal?: boolean
}

export interface AdminClaim {
  id: string
  code: string
  slug: string
  occurredDate: string
  type: ClaimType
  typeLabel: string
  status: ClaimStatus
  insuredName: string
  insuredDocument?: string
  insuredContact?: string
  propertyTitle: string
  propertyLocation: string
  propertyInternalCode?: string
  reservationCode?: string
  guestName?: string
  description: string
  estimatedAmount?: number
  approvedAmount?: number
  documents: ClaimDocument[]
  timeline: ClaimMessage[]
  updatedAt: string
  createdAt: string
}

export interface CoverageLimit {
  id: string
  title: string
  iconName: string
  maxLimit: number
  compensationPercentage: number
  description?: string
}

export interface PolicyDocument {
  id: string
  title: string
  description: string
  fileUrl: string
  fileSize?: string
}
