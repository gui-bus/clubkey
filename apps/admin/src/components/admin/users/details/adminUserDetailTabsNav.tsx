"use client"

import * as React from "react"

import Link from "next/link"

import { ScrollArea } from "@clubkey/ui"
import { cn } from "@clubkey/utils"
import {
  ArrowsLeftRight,
  CalendarCheck,
  CreditCard,
  Key,
  LockKey,
  type Icon as PhosphorIcon,
  User,
  Wallet,
} from "@phosphor-icons/react"

export type AdminUserDetailTabId =
  | "perfil"
  | "wallets"
  | "transacoes"
  | "bloqueios"
  | "auth"
  | "assinaturas"
  | "reservas"

export interface TabConfig {
  id: AdminUserDetailTabId
  label: string
  icon: PhosphorIcon
  description: string
}

export const USER_DETAIL_TABS: TabConfig[] = [
  {
    id: "perfil",
    label: "Perfil",
    icon: User,
    description:
      "Informações cadastrais, parâmetros de conta e custódia Fireblocks",
  },
  {
    id: "wallets",
    label: "Wallets",
    icon: Wallet,
    description: "Gestão avançada de carteiras, chaves e saldos em custódia",
  },
  {
    id: "transacoes",
    label: "Transações",
    icon: ArrowsLeftRight,
    description:
      "Histórico de movimentações, depósitos, saques e transferências P2P",
  },
  {
    id: "bloqueios",
    label: "Bloqueios",
    icon: LockKey,
    description:
      "Restrições de saldo, travas de conformidade e limites operacionais",
  },
  {
    id: "auth",
    label: "Auth",
    icon: Key,
    description:
      "Segurança de acesso, 2FA, dispositivos conectados e sessões ativas",
  },
  {
    id: "assinaturas",
    label: "Assinaturas",
    icon: CreditCard,
    description:
      "Planos de associação, faturas, recorrência e histórico de cobrança",
  },
  {
    id: "reservas",
    label: "Reservas",
    icon: CalendarCheck,
    description: "Histórico de locações, estadias e experiências reservadas",
  },
]

export interface AdminUserDetailTabsNavProps {
  slug: string
  activeTab: AdminUserDetailTabId
  className?: string
}

export function AdminUserDetailTabsNav({
  slug,
  activeTab,
  className,
}: AdminUserDetailTabsNavProps): React.JSX.Element {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = React.useState(false)

  const dragRef = React.useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
    hasMoved: false,
  })

  const getViewport = React.useCallback((): HTMLDivElement | null => {
    return containerRef.current?.closest(
      "[data-radix-scroll-area-viewport]"
    ) as HTMLDivElement | null
  }, [])

  React.useEffect(() => {
    const activeEl = containerRef.current?.querySelector(
      `[data-tab-id="${activeTab}"]`
    ) as HTMLElement | null
    const viewport = getViewport()

    if (activeEl && viewport) {
      const activeRect = activeEl.getBoundingClientRect()
      const viewportRect = viewport.getBoundingClientRect()

      if (
        activeRect.left < viewportRect.left ||
        activeRect.right > viewportRect.right
      ) {
        activeEl.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        })
      }
    }
  }, [activeTab, getViewport])

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return

    const viewport = getViewport()
    if (!viewport) return

    dragRef.current.isDown = true
    dragRef.current.startX = e.pageX
    dragRef.current.scrollLeft = viewport.scrollLeft
    dragRef.current.hasMoved = false
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragRef.current.isDown) return
    const viewport = getViewport()
    if (!viewport) return

    const deltaX = e.pageX - dragRef.current.startX

    if (Math.abs(deltaX) > 4) {
      if (!dragRef.current.hasMoved) {
        dragRef.current.hasMoved = true
        setIsDragging(true)
      }
      viewport.scrollLeft = dragRef.current.scrollLeft - deltaX
    }
  }

  const handleMouseUp = () => {
    if (dragRef.current.isDown) {
      dragRef.current.isDown = false
      setTimeout(() => {
        dragRef.current.hasMoved = false
        setIsDragging(false)
      }, 50)
    }
  }

  const handleMouseLeave = () => {
    if (dragRef.current.isDown) {
      dragRef.current.isDown = false
      setTimeout(() => {
        dragRef.current.hasMoved = false
        setIsDragging(false)
      }, 50)
    }
  }

  const handleClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragRef.current.hasMoved) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  return (
    <div className={cn("w-full", className)}>
      <ScrollArea orientation="horizontal" className="w-full pb-2">
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onClickCapture={handleClickCapture}
          className={cn(
            "flex items-center gap-1 min-w-max border-b border-zinc-200 dark:border-zinc-800 select-none mb-1",
            isDragging ? "cursor-grabbing" : "cursor-grab"
          )}
        >
          {USER_DETAIL_TABS.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            const href = `/usuarios/${slug}/detalhes/${tab.id}`

            return (
              <Link
                key={tab.id}
                data-tab-id={tab.id}
                href={href}
                draggable={false}
                className={cn(
                  "flex items-center gap-2 px-3.5 py-3 border-b-2 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap group shrink-0 bg-transparent select-none -mb-px",
                  isActive
                    ? "border-brand-primary text-brand-primary font-black"
                    : "border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700"
                )}
              >
                <Icon
                  className={cn(
                    "w-4 h-4 transition-colors shrink-0",
                    isActive
                      ? "text-brand-primary"
                      : "text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-200"
                  )}
                  weight={isActive ? "fill" : "bold"}
                />
                <span>{tab.label}</span>
              </Link>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}
