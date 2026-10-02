"use client"

import { useState } from "react"

import { usePathname } from "next/navigation"

import { ScrollArea, ThemeToggle, TooltipProvider } from "@clubkey/ui"
import { cn } from "@clubkey/utils"
import {
  Buildings,
  CalendarCheck,
  CaretLeft,
  CaretRight,
  ChartBar,
  ChartPieSlice,
  CreditCard,
  Key,
  ShieldWarning,
  Sparkle,
  UserGear,
  Users,
} from "@phosphor-icons/react"
import { motion } from "framer-motion"

import { AdminMobileHeader } from "./adminMobileHeader"
import { AdminSidebarItem } from "./adminSidebarItem"
import { AdminSidebarLogo } from "./adminSidebarLogo"
import { AdminUserDropdown } from "./adminUserDropdown"

export interface AdminNavItem {
  label: string
  href: string
  icon: typeof ChartPieSlice
  badge?: string
}

export interface AdminNavSection {
  title: string
  items: AdminNavItem[]
}

export const ADMIN_NAV_SECTIONS: AdminNavSection[] = [
  {
    title: "Geral",
    items: [
      {
        label: "Painel",
        href: "/painel",
        icon: ChartPieSlice,
      },
    ],
  },
  {
    title: "Operações",
    items: [
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
        label: "Eventos",
        href: "/eventos",
        icon: CalendarCheck,
      },
      {
        label: "Experiências",
        href: "/experiencias",
        icon: Sparkle,
      },
    ],
  },
  {
    title: "Gestão",
    items: [
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
    ],
  },
]

const SIDEBAR_COOKIE_NAME = "clubkey_admin_sidebar_collapsed"

export interface AdminSidebarProps {
  defaultCollapsed?: boolean
}

export function AdminSidebar({ defaultCollapsed = false }: AdminSidebarProps) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState<boolean>(defaultCollapsed)

  const toggleCollapse = () => {
    setIsCollapsed((prev) => {
      const next = !prev
      try {
        localStorage.setItem(SIDEBAR_COOKIE_NAME, String(next))
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${next}; path=/; max-age=31536000; SameSite=Lax`
      } catch {}
      return next
    })
  }

  return (
    <>
      <AdminMobileHeader />

      <TooltipProvider delayDuration={80}>
        <motion.aside
          initial={false}
          animate={{ width: isCollapsed ? 72 : 256 }}
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 32,
            mass: 0.8,
          }}
          className="hidden xl:flex sticky top-0 z-40 h-screen flex-col border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] select-none shrink-0 relative"
        >
          <div className="absolute -right-3 top-5.5 z-50">
            <button
              onClick={toggleCollapse}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-all cursor-pointer hover:scale-110"
              aria-label={
                isCollapsed ? "Expandir menu lateral" : "Recolher menu lateral"
              }
            >
              {isCollapsed ? (
                <CaretRight size={12} weight="bold" />
              ) : (
                <CaretLeft size={12} weight="bold" />
              )}
              <span className="sr-only">
                {isCollapsed
                  ? "Expandir menu lateral"
                  : "Recolher menu lateral"}
              </span>
            </button>
          </div>

          <div
            className={cn(
              "flex h-16 items-center shrink-0 select-none overflow-hidden",
              isCollapsed ? "justify-center px-2" : "pl-5 pr-4"
            )}
          >
            <AdminSidebarLogo isCollapsed={isCollapsed} />
          </div>

          <ScrollArea className="flex-1 w-full px-3 py-2 overflow-hidden">
            <nav className="space-y-3">
              {ADMIN_NAV_SECTIONS.map((section, sectionIdx) => (
                <div key={section.title} className="space-y-1">
                  {isCollapsed ? (
                    sectionIdx > 0 && (
                      <div className="py-2 px-2">
                        <div className="h-0 w-5 mx-auto border-t border-zinc-200 dark:border-zinc-800" />
                      </div>
                    )
                  ) : (
                    <div
                      className={cn(
                        "flex items-center gap-2 px-3 pb-1 select-none",
                        sectionIdx === 0 ? "pt-1" : "pt-2.5"
                      )}
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 whitespace-nowrap">
                        {section.title}
                      </span>
                      <div className="h-0 flex-1 border-t border-zinc-200 dark:border-zinc-800" />
                    </div>
                  )}

                  <div className="space-y-1">
                    {section.items.map((item) => {
                      const isActive =
                        pathname === item.href ||
                        (item.href !== "/painel" &&
                          pathname.startsWith(item.href)) ||
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
                  </div>
                </div>
              ))}
            </nav>
          </ScrollArea>

          <div className="p-2 shrink-0 overflow-hidden">
            {isCollapsed ? (
              <div className="flex flex-col items-center gap-1.5">
                <ThemeToggle className="text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white" />
                <AdminUserDropdown isCollapsed />
              </div>
            ) : (
              <div className="flex items-center justify-between gap-1 px-1">
                <div className="flex-1 min-w-0">
                  <AdminUserDropdown isCollapsed={false} />
                </div>
                <ThemeToggle className="shrink-0 text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white" />
              </div>
            )}
          </div>
        </motion.aside>
      </TooltipProvider>
    </>
  )
}
