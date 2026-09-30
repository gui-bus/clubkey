"use client"

import { useState } from "react"

import { usePathname } from "next/navigation"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@clubkey/ui"
import { cn } from "@clubkey/utils"
import {
  Buildings,
  CaretLeft,
  CaretRight,
  ChartBar,
  ChartPieSlice,
  CreditCard,
  Key,
  ShieldWarning,
  SignOut,
  UserGear,
  Users,
} from "@phosphor-icons/react"

import { AdminSidebarItem } from "./adminSidebarItem"
import { AdminSidebarLogo } from "./adminSidebarLogo"

export interface AdminNavItem {
  label: string
  href: string
  icon: typeof ChartPieSlice
  badge?: string
}

const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  {
    label: "Painel",
    href: "/painel",
    icon: ChartPieSlice,
  },
  {
    label: "Sinistros",
    href: "/sinistros",
    icon: ShieldWarning,
  },
  {
    label: "Crédito",
    href: "/credito",
    icon: CreditCard,
  },
  {
    label: "Imóveis",
    href: "/imoveis",
    icon: Buildings,
  },
  {
    label: "Proteção Key",
    href: "/protecao-key",
    icon: Key,
  },
  {
    label: "Relatórios",
    href: "/relatorios",
    icon: ChartBar,
  },
  {
    label: "Usuários",
    href: "/usuarios",
    icon: Users,
  },
  {
    label: "Administradores",
    href: "/administradores",
    icon: UserGear,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev)
  }

  return (
    <TooltipProvider delayDuration={80}>
      <aside
        className={cn(
          "sticky top-0 z-40 flex h-screen flex-col border-r border-border bg-card transition-all duration-300 ease-in-out select-none",
          isCollapsed ? "w-[72px]" : "w-64"
        )}
      >
        {/* White-Label Brand Logo */}
        <AdminSidebarLogo isCollapsed={isCollapsed} />

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {!isCollapsed && (
            <div className="px-3 pb-2 pt-1">
              <p className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                Menu Principal
              </p>
            </div>
          )}

          <nav className="space-y-1">
            {ADMIN_NAV_ITEMS.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/painel" && pathname.startsWith(item.href)) ||
                (item.href === "/painel" &&
                  (pathname === "/" || pathname === "/dashboard"))

              return (
                <AdminSidebarItem
                  key={item.href}
                  label={item.label}
                  href={item.href}
                  icon={item.icon}
                  isActive={isActive}
                  isCollapsed={isCollapsed}
                  badge={item.badge}
                />
              )
            })}
          </nav>
        </div>

        {/* Footer Actions: Collapse Toggle & Logout */}
        <div className="border-t border-border p-2.5 space-y-1">
          {/* Collapse Toggle Button */}
          {isCollapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={toggleCollapse}
                  className="flex h-10 w-11 mx-auto items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                  aria-label="Expandir menu lateral"
                >
                  <CaretRight size={18} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={10}>
                Expandir Menu
              </TooltipContent>
            </Tooltip>
          ) : (
            <button
              onClick={toggleCollapse}
              className="flex h-9 w-full items-center justify-between rounded-lg px-3 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
            >
              <span>Recolher Menu</span>
              <CaretLeft size={16} />
            </button>
          )}

          {/* Logout Button */}
          {isCollapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => {
                    // handle logout
                  }}
                  className="flex h-10 w-11 mx-auto items-center justify-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                  aria-label="Sair da conta"
                >
                  <SignOut size={18} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={10}>
                Sair da Conta
              </TooltipContent>
            </Tooltip>
          ) : (
            <button
              onClick={() => {
                // handle logout
              }}
              className="flex h-9 w-full items-center gap-3 rounded-lg px-3 text-xs font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <SignOut size={16} />
              <span>Sair da Conta</span>
            </button>
          )}
        </div>
      </aside>
    </TooltipProvider>
  )
}
