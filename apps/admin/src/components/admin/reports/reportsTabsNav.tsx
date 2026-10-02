"use client"

import * as React from "react"

import { ScrollArea } from "@clubkey/ui"
import { cn } from "@clubkey/utils"
import {
  Buildings,
  Globe,
  Receipt,
  type Icon as PhosphorIcon,
} from "@phosphor-icons/react"

export type ReportTabId = "plataforma" | "workspace" | "fiscal"

export interface ReportTabConfig {
  id: ReportTabId
  label: string
  icon: PhosphorIcon
  count?: number
}

export const REPORT_TABS: ReportTabConfig[] = [
  {
    id: "plataforma",
    label: "Relatórios Gerais da Plataforma",
    icon: Globe,
  },
  {
    id: "workspace",
    label: "Relatórios ClubKey por Workspace",
    icon: Buildings,
  },
  {
    id: "fiscal",
    label: "Fiscal / DeCripto",
    icon: Receipt,
  },
]

export interface ReportsTabsNavProps {
  activeTab: ReportTabId
  onTabChange: (tab: ReportTabId) => void
  plataformaCount?: number
  workspaceCount?: number
  fiscalCount?: number
  className?: string
}

export function ReportsTabsNav({
  activeTab,
  onTabChange,
  plataformaCount,
  workspaceCount,
  fiscalCount,
  className,
}: ReportsTabsNavProps): React.JSX.Element {
  const containerRef = React.useRef<HTMLDivElement>(null)

  const getCount = (id: ReportTabId) => {
    switch (id) {
      case "plataforma":
        return plataformaCount
      case "workspace":
        return workspaceCount
      case "fiscal":
        return fiscalCount
      default:
        return undefined
    }
  }

  return (
    <div className={cn("w-full", className)}>
      <ScrollArea orientation="horizontal" className="w-full pb-1">
        <div
          ref={containerRef}
          className="flex items-center gap-1 min-w-max border-b border-zinc-200 dark:border-zinc-800 select-none -mb-px"
        >
          {REPORT_TABS.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            const count = getCount(tab.id)

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "flex items-center gap-2.5 px-4 py-3.5 border-b-2 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap group shrink-0 bg-transparent select-none -mb-px cursor-pointer",
                  isActive
                    ? "border-brand-primary text-brand-primary font-black"
                    : "border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700"
                )}
              >
                <Icon
                  className={cn(
                    "size-4.5 transition-colors shrink-0",
                    isActive
                      ? "text-brand-primary"
                      : "text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-200"
                  )}
                  weight={isActive ? "fill" : "bold"}
                />
                <span>{tab.label}</span>
                {typeof count === "number" && (
                  <span
                    className={cn(
                      "text-[10px] px-2 py-0.5 rounded-full font-extrabold transition-colors",
                      isActive
                        ? "bg-brand-primary/15 text-brand-primary"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                    )}
                  >
                    {count}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}
