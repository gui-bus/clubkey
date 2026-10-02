import type {
  InsuranceCycleVariables,
  InsuranceGroup,
  InsuranceInvoice,
  InsuranceQueueItem,
} from "@clubkey/types"
import type { SelectOption } from "@clubkey/ui"

export const MOCK_INSURANCE_GROUPS: InsuranceGroup[] = [
  {
    id: "1",
    name: "PIPA",
    workspaceId: "ws-ribus",
    workspaceName: "Ribus",
    hostId: "club_host_id 2",
    status: "CANCELADO",
    monthlyAmount: 49.9,
    propertiesCount: 1,
    invoicesCount: 2,
    updatedAt: "12/08/2026",
    createdAt: "10/01/2026",
    propertiesList: ["Casa Pé na Areia - Praia de Pipa"],
    coverageDetails:
      "Cobertura básica de danos materiais, sinistros até R$ 250.000 e responsabilidade civil do imóvel.",
  },
  {
    id: "2",
    name: "UBATUBA PREMIUM",
    workspaceId: "ws-host-gestao",
    workspaceName: "Host Gestão Imobiliária",
    hostId: "club_host_id 25",
    status: "ATIVO",
    monthlyAmount: 89.9,
    propertiesCount: 3,
    invoicesCount: 6,
    updatedAt: "28/09/2026",
    createdAt: "15/03/2026",
    propertiesList: [
      "Casa Pé na Areia Ubatuba - Praia do Tenório",
      "Roupas de Cama & Conforto | Praia da Lagoinha",
      "Studio Loft Enseada",
    ],
    coverageDetails:
      "Cobertura completa multirrisco, proteção contra avarias de hóspedes, franquia zero e reposição de enxoval.",
  },
  {
    id: "3",
    name: "LIKEHOME CABEDELO",
    workspaceId: "ws-likehome",
    workspaceName: "LikeHome Hospedagens",
    hostId: "club_host_id 24",
    status: "ATIVO",
    monthlyAmount: 59.9,
    propertiesCount: 2,
    invoicesCount: 4,
    updatedAt: "29/09/2026",
    createdAt: "05/04/2026",
    propertiesList: [
      "Noa - 702 A",
      "Flat Vista Mar Panorâmica",
    ],
    coverageDetails:
      "Proteção patrimonial contra avarias em mobiliário, eletrônicos e vidraçaria com acionamento digital.",
  },
  {
    id: "4",
    name: "TRANCOSO BOUTIQUE",
    workspaceId: "ws-trancoso",
    workspaceName: "Trancoso Hospitality",
    hostId: "club_host_id 19",
    status: "EM_ATRASO",
    monthlyAmount: 129.9,
    propertiesCount: 1,
    invoicesCount: 3,
    updatedAt: "01/10/2026",
    createdAt: "20/05/2026",
    propertiesList: ["Villa Santorini Boutique & Spa Privativo"],
    coverageDetails:
      "Cobertura de alto padrão até R$ 1.000.000 com assistência emergencial 24h e cobertura de lucros cessantes.",
  },
]

export const MOCK_INSURANCE_INVOICES: InsuranceInvoice[] = [
  {
    id: "1",
    groupId: "1",
    groupName: "PIPA",
    workspaceId: "ws-ribus",
    workspaceName: "Ribus",
    amount: 49.9,
    dueDate: "12/07/2026",
    paidAt: "11/07/2026",
    status: "PAGA",
    invoiceUrl: "#",
  },
  {
    id: "2",
    groupId: "1",
    groupName: "PIPA",
    workspaceId: "ws-ribus",
    workspaceName: "Ribus",
    amount: 49.9,
    dueDate: "12/08/2026",
    status: "CANCELADA",
    ageHoursText: "1520h 53min",
    opportunityRecoverable: true,
    invoiceUrl: "#",
  },
  {
    id: "3",
    groupId: "2",
    groupName: "UBATUBA PREMIUM",
    workspaceId: "ws-host-gestao",
    workspaceName: "Host Gestão Imobiliária",
    amount: 89.9,
    dueDate: "28/09/2026",
    paidAt: "27/09/2026",
    status: "PAGA",
    invoiceUrl: "#",
  },
  {
    id: "4",
    groupId: "2",
    groupName: "UBATUBA PREMIUM",
    workspaceId: "ws-host-gestao",
    workspaceName: "Host Gestão Imobiliária",
    amount: 89.9,
    dueDate: "28/10/2026",
    status: "PENDENTE",
    invoiceUrl: "#",
  },
  {
    id: "5",
    groupId: "3",
    groupName: "LIKEHOME CABEDELO",
    workspaceId: "ws-likehome",
    workspaceName: "LikeHome Hospedagens",
    amount: 59.9,
    dueDate: "05/10/2026",
    status: "PENDENTE",
    invoiceUrl: "#",
  },
  {
    id: "6",
    groupId: "4",
    groupName: "TRANCOSO BOUTIQUE",
    workspaceId: "ws-trancoso",
    workspaceName: "Trancoso Hospitality",
    amount: 129.9,
    dueDate: "20/09/2026",
    status: "ATRASADA",
    invoiceUrl: "#",
  },
]

export const MOCK_INSURANCE_QUEUE_ITEMS: InsuranceQueueItem[] = [
  {
    id: "q-cancel-1",
    queueType: "CANCELLED_24H",
    title: "Ribus",
    subtitle: "Fatura #2 - grupo #1",
    workspace: "Ribus",
    invoiceId: "2",
    groupId: "1",
    amount: 49.9,
    ageText: "1520h 53min",
    status: "Cancelado",
  },
]

export const MOCK_INSURANCE_VARIABLES: InsuranceCycleVariables = {
  reminderDaysBefore: 5,
  graceDaysBeforeCancel: 3,
  autoRecurringGeneration: true,
  webhookTimeoutMinutes: 15,
  maxRetryAttempts: 3,
  superAdminOnly: true,
}

export const MOCK_INSURANCE_GROUP_STATUS_OPTIONS: SelectOption[] = [
  { value: "ALL", label: "Todos os grupos" },
  { value: "ATIVO", label: "Ativos" },
  { value: "CANCELADO", label: "Cancelados" },
  { value: "SUSPENSO", label: "Suspensos" },
]

export const MOCK_INSURANCE_INVOICE_STATUS_OPTIONS: SelectOption[] = [
  { value: "ALL", label: "Todas as faturas" },
  { value: "RASCUNHO", label: "Rascunho" },
  { value: "PENDENTE", label: "Pendentes" },
  { value: "EM_CARENCIA", label: "Em carência" },
  { value: "PAGA", label: "Pagas" },
  { value: "ATRASADA", label: "Atrasadas" },
  { value: "SUSPENSA", label: "Suspensas" },
  { value: "CANCELADA", label: "Canceladas" },
  { value: "FALHA", label: "Falhas" },
]

export const MOCK_INSURANCE_WORKSPACE_OPTIONS: SelectOption[] = [
  { value: "ALL", label: "Workspace / empresa: Todos" },
  { value: "ws-ribus", label: "Ribus" },
  { value: "ws-host-gestao", label: "Host Gestão Imobiliária" },
  { value: "ws-likehome", label: "LikeHome Hospedagens" },
  { value: "ws-trancoso", label: "Trancoso Hospitality" },
]
