"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@clubkey/utils"
import {
  Bed,
  CalendarCheck,
  ChartPieSlice,
  GearSix,
  Gift,
  ShieldCheck,
  SignOut,
  Users,
} from "@phosphor-icons/react"

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: ChartPieSlice,
  },
  {
    label: "Membros",
    href: "/membros",
    icon: Users,
    badge: "1.2k",
  },
  {
    label: "Hospedagens",
    href: "/hospedagens",
    icon: Bed,
  },
  {
    label: "Eventos & KeyPass",
    href: "/eventos",
    icon: CalendarCheck,
  },
  {
    label: "Benefícios & Parceiros",
    href: "/beneficios",
    icon: Gift,
  },
  {
    label: "Configurações",
    href: "/configuracoes",
    icon: GearSix,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="sticky top-0 flex h-screen w-64 flex-col border-r border-border bg-card">
      {/* Brand Header */}
      <div className="flex h-16 items-center gap-3 border-b border-border px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold shadow-xs">
          CK
        </div>
        <div className="flex flex-col">
          <span className="font-semibold tracking-tight text-sm">
            ClubKey Admin
          </span>
          <span className="text-[11px] text-muted-foreground flex items-center gap-1">
            <ShieldCheck size={12} weight="fill" className="text-primary" />{" "}
            Painel de Gestão
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <div className="px-3 mb-2">
          <p className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
            Módulos Principais
          </p>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href))

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} weight={isActive ? "fill" : "regular"} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                      isActive
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Footer Profile & Logout */}
      <div className="border-t border-border p-3">
        <button
          onClick={() => {
            // handle logout
          }}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
        >
          <SignOut size={18} />
          <span>Sair da Conta</span>
        </button>
      </div>
    </aside>
  )
}
