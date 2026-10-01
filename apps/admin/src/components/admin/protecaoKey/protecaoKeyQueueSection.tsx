"use client"

import * as React from "react"

import type { InsuranceQueueItem } from "@clubkey/types"
import { CtaButton, TableTitle } from "@clubkey/ui"
import { formatCurrency } from "@clubkey/utils"
import {
  ArrowRight,
  ArrowSquareOut,
  ArrowsClockwise,
  ClockAfternoon,
  Lightning,
  PhoneCall,
  ShieldWarning,
  WarningOctagon,
  XCircle,
} from "@phosphor-icons/react"

export interface ProtecaoKeyQueueSectionProps {
  queueItems?: InsuranceQueueItem[]
  onRecoverOpportunity: (item: InsuranceQueueItem) => void
  onOpenInvoice?: (invoiceId: string) => void
  onOpenWorkspace?: (workspace: string) => void
  onRefreshQueue: () => void
  isRefreshing?: boolean
}

interface QueueDef {
  type: string
  title: string
  description: string
  icon: React.ElementType
}

const QUEUE_DEFS: QueueDef[] = [
  {
    type: "PENDING_SLA",
    title: "Pendentes > 2h30",
    description: "Cobranças aguardando pagamento por tempo acima do SLA comercial.",
    icon: ClockAfternoon,
  },
  {
    type: "COMMERCIAL_CONTACT",
    title: "Contato comercial",
    description: "Casos que pedem abordagem humana antes de cancelar ou suspender.",
    icon: PhoneCall,
  },
  {
    type: "CANCELLED_24H",
    title: "Canceladas 24h",
    description: "Cobranças canceladas automaticamente por expiração da janela de pagamento.",
    icon: XCircle,
  },
  {
    type: "DIVERGENT_PAYMENT",
    title: "Pagamento divergente",
    description: "Limitação/triagem preparada para divergência financeira quando o servidor retornar dados.",
    icon: WarningOctagon,
  },
  {
    type: "OVERDUE_SUSPENDED",
    title: "Vencidas/suspensas",
    description: "Cobertura ou fatura em estado que exige triagem operacional.",
    icon: ShieldWarning,
  },
  {
    type: "WEBHOOK_DELAYED",
    title: "Webhook divergente/atrasado",
    description: "O servidor sinalizou divergência ou atraso na confirmação do provedor.",
    icon: Lightning,
  },
]

export function ProtecaoKeyQueueSection({
  queueItems = [],
  onRecoverOpportunity,
  onOpenInvoice,
  onOpenWorkspace,
  onRefreshQueue,
  isRefreshing = false,
}: ProtecaoKeyQueueSectionProps): React.JSX.Element {
  return (
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <TableTitle
          title="Fila Operacional e Comercial"
          description="Resumo operacional leve, sem carregar a lista completa."
        />

        <button
          type="button"
          onClick={onRefreshQueue}
          disabled={isRefreshing}
          className="text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer shrink-0"
        >
          <ArrowsClockwise
            size={14}
            weight="bold"
            className={isRefreshing ? "animate-spin text-brand-primary" : ""}
          />
          <span>Atualizar fila</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 items-stretch">
        {QUEUE_DEFS.map((q) => {
          const items = queueItems.filter((it) => it.queueType === q.type)
          const count = items.length

          return (
            <div
              key={q.type}
              className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#141416] p-4.5 sm:p-5 flex flex-col justify-between gap-4 shadow-2xs h-full min-h-[290px]"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black font-heading text-zinc-900 dark:text-white">
                      {count}
                    </span>
                    <h5 className="text-xs sm:text-sm font-bold text-zinc-800 dark:text-zinc-200">
                      {q.title}
                    </h5>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-500 dark:text-zinc-400">
                    KPI
                  </span>
                </div>

                <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {q.description}
                </p>
              </div>

              {count === 0 ? (
                <div className="flex-1 w-full flex items-center justify-center rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 p-4 text-center bg-zinc-50/50 dark:bg-zinc-900/30">
                  <span className="text-xs text-zinc-400 dark:text-zinc-500 font-medium italic">
                    Sem itens nesta fila.
                  </span>
                </div>
              ) : (
                <div className="flex-1 w-full flex flex-col justify-between">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="h-full flex flex-col justify-between rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/50 p-3.5 space-y-3"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="text-xs font-bold text-zinc-900 dark:text-white truncate">
                            {item.title}
                          </span>
                          {item.subtitle && (
                            <span className="text-[11px] text-zinc-400 dark:text-zinc-500 truncate">
                              • {item.subtitle}
                            </span>
                          )}
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200/60 dark:border-rose-900/50 shrink-0">
                          {item.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-2 rounded-lg bg-white dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-700/60">
                          <span className="text-[10px] font-bold uppercase text-zinc-400 block">
                            Valor
                          </span>
                          <span className="font-bold text-zinc-900 dark:text-white">
                            {item.amount ? formatCurrency(item.amount) : "—"}
                          </span>
                        </div>
                        <div className="p-2 rounded-lg bg-white dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-700/60">
                          <span className="text-[10px] font-bold uppercase text-zinc-400 block">
                            Idade
                          </span>
                          <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                            {item.ageText || "—"}
                          </span>
                        </div>
                      </div>

                      <CtaButton
                        type="button"
                        variant="primary"
                        size="sm"
                        isFullWidth
                        onClick={() => onRecoverOpportunity(item)}
                        className="rounded-xl text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Recuperar oportunidade</span>
                      </CtaButton>

                      <div className="flex items-center justify-between text-[11px] pt-1 border-t border-zinc-200/60 dark:border-zinc-800">
                        <button
                          type="button"
                          onClick={() => item.invoiceId && onOpenInvoice?.(item.invoiceId)}
                          className="font-semibold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white inline-flex items-center gap-1 cursor-pointer"
                        >
                          <span>Abrir fatura</span>
                          <ArrowRight size={12} weight="bold" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onOpenWorkspace?.(item.workspace)}
                          className="font-semibold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white inline-flex items-center gap-1 cursor-pointer"
                        >
                          <span>Abrir workspace</span>
                          <ArrowSquareOut size={12} weight="bold" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
