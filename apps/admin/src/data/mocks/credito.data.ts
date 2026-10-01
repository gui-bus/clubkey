import type { AdminCreditRequest } from "@clubkey/types"
import type { SelectOption } from "@clubkey/ui"

export const MOCK_CREDIT_STATUS_OPTIONS: SelectOption[] = [
  { value: "ALL", label: "Todos os Status" },
  { value: "PENDENTE", label: "Pendente" },
  { value: "EM_ANALISE", label: "Em Análise de Risco" },
  { value: "APROVADO", label: "Aprovado" },
  { value: "LIQUIDADO", label: "Liquidado" },
  { value: "RECUSADO", label: "Recusado" },
  { value: "CANCELADO", label: "Cancelado" },
]

export const MOCK_CREDIT_LINE_OPTIONS: SelectOption[] = [
  { value: "ALL", label: "Todas as Linhas" },
  { value: "ANTECIPACAO_RECEBIVEIS", label: "Antecipação de Recebíveis" },
  { value: "CAPITAL_GIRO", label: "Capital de Giro" },
  { value: "CREDITO_IMOBILIARIO", label: "Crédito Imobiliário" },
  { value: "FINANCIAMENTO_REFORMA", label: "Financiamento de Reformas" },
]

export const MOCK_CREDIT_SORT_OPTIONS: SelectOption[] = [
  { value: "recent", label: "Mais recentes" },
  { value: "oldest", label: "Mais antigos" },
  { value: "amount_desc", label: "Maior valor" },
  { value: "amount_asc", label: "Menor valor" },
]

export const MOCK_CREDIT_REQUESTS: AdminCreditRequest[] = []
