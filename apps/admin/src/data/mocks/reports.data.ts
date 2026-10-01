import type {
  AdminReportItem,
  ReportExecutionLog,
} from "@clubkey/types"

export const MOCK_REPORTS: AdminReportItem[] = [
  
  {
    id: "hosts_accommodations",
    block: "PLATAFORMA",
    category: "OPERACIONAIS",
    badge: "AUDITORIA TÉCNICA",
    title: "Relatório dos hosts e acomodações",
    description:
      "Relatório de imóveis por host, com ativos/inativos, Grupo ClubKey, Status Stay, preço base, desconto, min_stays e regras operacionais da integração.",
    source: "Imóveis e integrações",
    iconName: "Buildings",
  },
  {
    id: "nft_owners",
    block: "PLATAFORMA",
    category: "OPERACIONAIS",
    badge: "KEYS E COLEÇÕES",
    title: "Relatório de donos de NFTs",
    description:
      "Relatório de donos de Keys/NFTs, usuários, coleções, parceiros, pedidos e cupons associados.",
    source: "Proprietários e NFTs",
    iconName: "Key",
  },
  {
    id: "platform_reservations",
    block: "PLATAFORMA",
    category: "OPERACIONAIS",
    badge: "RESERVAS DA PLATAFORMA",
    title: "Reservas da plataforma ClubKey",
    description:
      "Reservas feitas pelos produtos públicos da ClubKey. Não confundir com reservas sincronizadas do workspace.",
    source: "Reservas da plataforma Key ClubKey",
    iconName: "CalendarCheck",
  },
  {
    id: "token_transactions",
    block: "PLATAFORMA",
    category: "OPERACIONAIS",
    badge: "TOKENS / CARTEIRA",
    title: "Relatório de tokens (transactions)",
    description:
      "Ficha de transações da tabela de transações com filtros de período e seleção personalizada de colunas.",
    source: "Tabela Transactions & Blockchain Fireblocks",
    iconName: "Coins",
    supportsDateRange: true,
    supportsColumns: true,
    columns: [
      { id: "id", label: "ID", defaultSelected: true },
      { id: "date", label: "Date", defaultSelected: true },
      { id: "description", label: "Descrição", defaultSelected: true },
      { id: "status", label: "Status", defaultSelected: true },
      { id: "currency", label: "Moeda", defaultSelected: true },
      { id: "value", label: "Valor", defaultSelected: true },
      { id: "rib_rate", label: "Cotação RIB", defaultSelected: true },
      { id: "total_brl", label: "Valor Total (BRL)", defaultSelected: true },
      { id: "fee", label: "Taxa", defaultSelected: true },
      { id: "from", label: "De", defaultSelected: true },
      { id: "to", label: "Para", defaultSelected: true },
      { id: "reference_id", label: "Reference ID", defaultSelected: true },
      { id: "tx_hash", label: "Hash Tx", defaultSelected: false },
      { id: "network", label: "Rede / Chain", defaultSelected: false },
    ],
  },
  {
    id: "platform_users",
    block: "PLATAFORMA",
    category: "OPERACIONAIS",
    badge: "USUÁRIOS / CARTEIRAS / AUTH",
    title: "Relatório de users (plataforma)",
    description:
      "XLSX consolidado: Users (indicado por, parceiro, total indicados), CRM, Carteiras, Auth, NFT, Assinatura, Reservas, Ind. Ranking, Indicações e Incorporadoras.",
    source: "Users, CRM, Wallets, Indicações e Developers",
    iconName: "UsersThree",
  },

  
  {
    id: "synced_reservations",
    block: "WORKSPACE",
    category: "OPERACIONAIS",
    badge: "OPERAÇÃO / INTEGRAÇÃO",
    title: "Reservas sincronizadas",
    description:
      "Reservas sincronizadas do workspace para análise operacional, taxa de ocupação e conciliação financeira.",
    source: "Integração PMS & Workspaces",
    iconName: "ArrowsClockwise",
    requiresWorkspace: true,
  },
  {
    id: "monthly_performance",
    block: "WORKSPACE",
    category: "OPERACIONAIS",
    badge: "MÉTRICAS MENSAIS",
    title: "Performance mensal",
    description:
      "Receita bruta consolidada, ocupação, diária média (ADR), RevPAR e volume por imóvel em base mensal.",
    source: "Analytics & Faturamento",
    iconName: "ChartLineUp",
    requiresWorkspace: true,
  },
  {
    id: "credit_eligibility",
    block: "WORKSPACE",
    category: "OPERACIONAIS",
    badge: "ELEGIBILIDADE",
    title: "Crédito & Elegibilidade",
    description:
      "Scores de crédito, categorias de rating e limites estimados por imóvel com sinais operacionais de liquidez.",
    source: "Motor de Risco ClubKey",
    iconName: "CreditCard",
    requiresWorkspace: true,
  },
  {
    id: "workspace_portfolio",
    block: "WORKSPACE",
    category: "OPERACIONAIS",
    badge: "VISÃO CONSOLIDADA",
    title: "Portfólio consolidado",
    description:
      "Resumo estrutural do portfólio do workspace com indicadores agregados de inventário e distribuição geográfica.",
    source: "Workspaces & Imóveis",
    iconName: "Briefcase",
    requiresWorkspace: true,
  },
  {
    id: "property_deep_dive",
    block: "WORKSPACE",
    category: "OPERACIONAIS",
    badge: "DEEP DIVE",
    title: "Inteligência por imóvel",
    description:
      "Relatório completo individual de um imóvel específico com histórico de reservas, precificação e avaliações.",
    source: "Motor de Inteligência Stay",
    iconName: "HouseLine",
    requiresProperty: true,
  },
  {
    id: "claims_operational",
    block: "WORKSPACE",
    category: "OPERACIONAIS",
    badge: "OPERACIONAL ADMIN",
    title: "Sinistros & Ocorrências",
    description:
      "Solicitações de sinistro abertas com histórico de workspace, status de apuração pericial e valores pleiteados.",
    source: "Módulo de Proteção & Sinistros",
    iconName: "ShieldWarning",
    requiresWorkspace: true,
  },
  {
    id: "workspace_credit_ops",
    block: "WORKSPACE",
    category: "OPERACIONAIS",
    badge: "OPERACIONAL ADMIN",
    title: "Operações de Crédito",
    description:
      "Extrato detalhado de adiantamentos de recebíveis, amortizações, taxas aplicadas e saldo consolidado por parceiro.",
    source: "Módulo de Crédito",
    iconName: "CurrencyCircleDollar",
    requiresWorkspace: true,
  },

  
  {
    id: "decripto_tax_export",
    block: "FISCAL",
    category: "FISCAL_DECRIPTO",
    badge: "RECEITA FEDERAL",
    title: "Declaração DeCripto (IN 1888/RFB)",
    description:
      "Arquivo consolidado em layout padrão da Instrução Normativa 1888 contendo todas as operações de criptoativos do período fiscal.",
    source: "Custódia Fireblocks & Blockchain",
    iconName: "FileText",
  },
  {
    id: "financial_ledger",
    block: "FISCAL",
    category: "FISCAL_DECRIPTO",
    badge: "CONTABILIDADE",
    title: "Balancete Contábil & Conciliação",
    description:
      "Demonstrativo contábil de conciliação bancária entre entradas FIAT (PIX/TED), conversões em RIB e queima/mint de tokens.",
    source: "Gateways Bancários & Tesouraria",
    iconName: "Bank",
  },
  {
    id: "ir_earnings_summary",
    block: "FISCAL",
    category: "FISCAL_DECRIPTO",
    badge: "TRIBUTAÇÃO",
    title: "Informe de Rendimentos dos Membros",
    description:
      "Consolidado anual de ganhos de capital, recompensas e staking de cotas de imóveis para apoio à declaração de IRPF dos membros.",
    source: "Módulo Tributário & Wallets",
    iconName: "Receipt",
  },
]

export const MOCK_RECENT_REPORTS: ReportExecutionLog[] = [
  {
    id: "rep-001",
    reportId: "token_transactions",
    reportTitle: "Relatório de tokens (transactions)",
    format: "XLSX",
    status: "COMPLETED",
    generatedAt: "2026-10-01 12:45",
    fileSize: "4.2 MB",
    downloadUrl: "#",
    filterSummary: "Últimos 30 dias • 12 colunas selecionadas",
  },
  {
    id: "rep-002",
    reportId: "hosts_accommodations",
    reportTitle: "Relatório dos hosts e acomodações",
    format: "XLSX",
    status: "COMPLETED",
    generatedAt: "2026-10-01 11:18",
    fileSize: "1.8 MB",
    downloadUrl: "#",
    filterSummary: "Todos os 48 imóveis cadastrados",
  },
  {
    id: "rep-003",
    reportId: "synced_reservations",
    reportTitle: "Reservas sincronizadas",
    format: "XLSX",
    status: "COMPLETED",
    generatedAt: "2026-09-30 18:22",
    fileSize: "3.5 MB",
    downloadUrl: "#",
    filterSummary: "Workspace: Host Gestão Imobiliária",
  },
  {
    id: "rep-004",
    reportId: "monthly_performance",
    reportTitle: "Performance mensal",
    format: "XLSX",
    status: "COMPLETED",
    generatedAt: "2026-09-30 14:05",
    fileSize: "840 KB",
    downloadUrl: "#",
    filterSummary: "Referência: Setembro/2026",
  },
]

export const MOCK_REPORT_WORKSPACES = [
  { value: "ALL", label: "Todos os workspaces (Cross-workspace)" },
  { value: "ws-01", label: "Host Gestão Imobiliária (#WS-4019)" },
  { value: "ws-02", label: "Alpha Properties Brasil (#WS-8812)" },
  { value: "ws-03", label: "Morada Stay Administradora (#WS-3301)" },
  { value: "ws-04", label: "Prime Luxury Rentals (#WS-1194)" },
  { value: "ws-05", label: "Vista Bela Hotéis & Chalés (#WS-6620)" },
]

export const MOCK_REPORT_PROPERTIES = [
  { value: "ALL", label: "Todos os imóveis do workspace" },
  { value: "prop-01", label: "CA/217/04 - Casa Contemporânea com Piscina (Campos do Jordão)" },
  { value: "prop-02", label: "AP/702/A - Noa Loft Design Vista Mar (Florianópolis)" },
  { value: "prop-03", label: "VL/104/C - Villa Trancoso Alto Padrão (Porto Seguro)" },
  { value: "prop-04", label: "CH/55/B - Chalé Suíço Araucárias (Monte Verde)" },
  { value: "prop-05", label: "ST/88/F - Studio Jardins Boutique (São Paulo)" },
]
