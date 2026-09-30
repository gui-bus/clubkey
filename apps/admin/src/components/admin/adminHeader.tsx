"use client"

import { useTheme } from "next-themes"

import { Button } from "@clubkey/ui"
import { Avatar, AvatarFallback } from "@clubkey/ui"
import {
  Bell,
  MagnifyingGlass,
  SlidersHorizontal,
  User,
} from "@phosphor-icons/react"

export function AdminHeader() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-card/80 px-6 backdrop-blur-md">
      {/* Search Bar */}
      <div className="relative flex w-full max-w-md items-center">
        <MagnifyingGlass
          size={16}
          className="absolute left-3 text-muted-foreground pointer-events-none"
        />
        <input
          type="search"
          placeholder="Buscar membros, reservas, eventos..."
          className="h-9 w-full rounded-md border border-input bg-background/50 pl-9 pr-4 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle Button */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          title="Alternar Tema"
        >
          <SlidersHorizontal size={16} />
        </button>

        {/* Notifications */}
        <button className="relative flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
        </button>

        {/* Admin User Info */}
        <div className="flex items-center gap-3 border-l border-border pl-3">
          <Avatar className="h-8 w-8 border border-border">
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
              AD
            </AvatarFallback>
          </Avatar>
          <div className="hidden flex-col md:flex">
            <span className="text-xs font-semibold leading-none">
              Administrador
            </span>
            <span className="text-[10px] text-muted-foreground">
              admin@clubkey.com.br
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
