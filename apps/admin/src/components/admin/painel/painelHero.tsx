"use client"

import * as React from "react"

import {
  MoonStars,
  Sun,
  SunHorizon,
} from "@phosphor-icons/react"

import { AdminHero } from "../common/adminHero"

export interface PainelHeroProps {
  userName?: string
}

export function PainelHero({
  userName = "William",
}: PainelHeroProps): React.JSX.Element {
  const [greetingInfo, setGreetingInfo] = React.useState<{
    greeting: string
    subtext: string
    IconComponent: React.ComponentType<{ size?: number; weight?: "bold" | "fill" | "regular" | "duotone"; className?: string }>
  }>({
    greeting: "Olá",
    subtext: "Visão geral da operação ClubKey",
    IconComponent: Sun,
  })

  const [formattedDate, setFormattedDate] = React.useState<string>("")

  React.useEffect(() => {
    const now = new Date()
    const hour = now.getHours()

    let greeting = "Bom dia"
    let subtext = "Tenha um excelente dia de trabalho."
    let IconComponent = Sun

    if (hour >= 12 && hour < 18) {
      greeting = "Boa tarde"
      subtext = "Acompanhe as principais métricas e operações da plataforma hoje."
      IconComponent = SunHorizon
    } else if (hour >= 18 || hour < 5) {
      greeting = "Boa noite"
      subtext = "Visão consolidada do ecossistema ClubKey e relatórios do dia."
      IconComponent = MoonStars
    }

    setGreetingInfo({
      greeting,
      subtext,
      IconComponent,
    })

    const dateStr = new Intl.DateTimeFormat("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(now)

    setFormattedDate(dateStr.charAt(0).toUpperCase() + dateStr.slice(1))
  }, [])

  const GreetingIcon = greetingInfo.IconComponent

  return (
    <AdminHero
      badge={
        <div className="inline-flex items-center gap-2">
          <span>PORTAL INTERNO</span>
          {formattedDate && (
            <span className="text-zinc-500 dark:text-zinc-400 text-xs font-medium">
              • {formattedDate}
            </span>
          )}
        </div>
      }
      title={
        <div className="flex items-center gap-3">
          <span>
            {greetingInfo.greeting}, {userName}!
          </span>
          <GreetingIcon size={36} weight="bold" className="text-zinc-600 dark:text-zinc-300 hidden sm:inline-block" />
        </div>
      }
      description={greetingInfo.subtext}
    />
  )
}
