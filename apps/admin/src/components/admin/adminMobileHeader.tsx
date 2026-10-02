"use client"

import * as React from "react"

import { usePathname } from "next/navigation"

import { ScrollArea, ThemeToggle } from "@clubkey/ui"
import { cn } from "@clubkey/utils"
import { List, X } from "@phosphor-icons/react"
import { AnimatePresence, motion } from "framer-motion"
import { createPortal } from "react-dom"

import { ADMIN_NAV_SECTIONS } from "./adminSidebar"
import { AdminSidebarItem } from "./adminSidebarItem"
import { AdminSidebarLogo } from "./adminSidebarLogo"
import { AdminUserDropdown } from "./adminUserDropdown"

export function AdminMobileHeader(): React.JSX.Element {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    setOpen(false)
  }, [pathname])

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1280px)")
    const handleMediaChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setOpen(false)
      }
    }

    mediaQuery.addEventListener("change", handleMediaChange)
    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange)
    }
  }, [])

  React.useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }

    document.addEventListener("keydown", handleKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [open])

  return (
    <>
      <header className="xl:hidden sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-[#141416]/95 backdrop-blur-md px-4 select-none shrink-0">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-sm text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Abrir menu lateral"
          >
            <List size={22} weight="bold" />
          </button>

          <AdminSidebarLogo isCollapsed={false} />
        </div>

        <div className="flex items-center gap-1.5">
          <ThemeToggle className="text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white" />
          <AdminUserDropdown isCollapsed />
        </div>
      </header>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <div className="fixed inset-0 z-[100] flex">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setOpen(false)}
                  className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
                  aria-hidden="true"
                />

                <motion.aside
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 32,
                    mass: 0.8,
                  }}
                  className="relative z-[101] flex h-full w-72 max-w-[85vw] flex-col border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] text-zinc-900 dark:text-white shadow-2xl select-none"
                >
                  <div className="flex h-16 items-center justify-between pl-5 pr-3 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
                    <AdminSidebarLogo isCollapsed={false} />
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="flex h-8 w-8 items-center justify-center rounded-sm text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                      aria-label="Fechar menu lateral"
                    >
                      <X size={18} weight="bold" />
                    </button>
                  </div>

                  <ScrollArea className="flex-1 w-full px-3 py-3 overflow-hidden">
                    <nav className="space-y-3">
                      {ADMIN_NAV_SECTIONS.map((section, sectionIdx) => (
                        <div key={section.title} className="space-y-1">
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

                          <div
                            className="space-y-1"
                            onClick={() => setOpen(false)}
                          >
                            {section.items.map((item) => {
                              const isActive =
                                pathname === item.href ||
                                (item.href !== "/painel" &&
                                  pathname.startsWith(item.href)) ||
                                (item.href === "/painel" &&
                                  (pathname === "/" ||
                                    pathname === "/dashboard"))

                              return (
                                <AdminSidebarItem
                                  key={item.href}
                                  label={item.label}
                                  href={item.href}
                                  icon={item.icon}
                                  isActive={isActive}
                                  isCollapsed={false}
                                  badge={item.badge}
                                />
                              )
                            })}
                          </div>
                        </div>
                      ))}
                    </nav>
                  </ScrollArea>

                  <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 shrink-0">
                    <div className="flex items-center justify-between gap-2 px-1">
                      <div className="flex-1 min-w-0">
                        <AdminUserDropdown isCollapsed={false} />
                      </div>
                      <ThemeToggle className="shrink-0 text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white" />
                    </div>
                  </div>
                </motion.aside>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  )
}
