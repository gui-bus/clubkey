"use client"

import * as React from "react"
import Image from "next/image"
import { ArrowRight, CheckCircle, Clock, Sparkle } from "@phosphor-icons/react"

import { Button } from "@/src/components/ui/button/button"
import { Progress } from "@/src/components/ui/progress/progress"
import { CtaButton } from "@/src/components/common/ctaButton"
import { WEEKLY_DROPS_CYCLE_SECONDS, type WeeklyDropItem } from "@/src/data/portalData"
import { cn } from "@/src/lib/utils"

export interface WeeklyDropCardProps {
  drop: WeeklyDropItem
  onClaim?: (dropId: string) => void
  className?: string
}

function useCountdown(initialSeconds: number) {
  const [seconds, setSeconds] = React.useState(initialSeconds)

  React.useEffect(() => {
    setSeconds(initialSeconds)
    if (initialSeconds <= 0) return

    const interval = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(interval)
  }, [initialSeconds])

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  const pad = (n: number) => String(n).padStart(2, "0")

  return `${hours}h ${pad(minutes)}m ${pad(secs)}s`
}

export function WeeklyDropCard({
  drop,
  onClaim,
  className,
}: WeeklyDropCardProps): React.JSX.Element {
  const isReadyToClaim = drop.isCompleted && !drop.isClaimed
  const isFullyDone = drop.isClaimed
  const progressPercent = Math.min(
    100,
    Math.round((drop.currentProgress / drop.totalRequired) * 100)
  )

  const defaultSeconds = Math.min(
    WEEKLY_DROPS_CYCLE_SECONDS,
    drop.initialSecondsRemaining ??
      (drop.daysRemaining > 0
        ? Math.min(WEEKLY_DROPS_CYCLE_SECONDS, drop.daysRemaining * 86400)
        : WEEKLY_DROPS_CYCLE_SECONDS)
  )

  const formattedCountdown = useCountdown(defaultSeconds)

  return (
    <div
      className={cn(
        "relative flex flex-col justify-between p-5 rounded-sm border bg-white dark:bg-zinc-900 transition-all duration-200 shadow-2xs overflow-hidden",
        isReadyToClaim
          ? "border-brand-primary ring-2 ring-brand-primary/20"
          : isFullyDone
            ? "border-zinc-200 dark:border-zinc-800 opacity-80"
            : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700",
        className
      )}
    >
      <div className="space-y-3.5">
        <div className="flex items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-700 dark:text-zinc-300 whitespace-nowrap shrink-0">
            <Clock className="w-3.5 h-3.5 text-brand-primary shrink-0" weight="bold" />
            <span className="tabular-nums font-mono text-[11px] font-bold tracking-tight">
              {formattedCountdown}
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-base font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white truncate">
            {drop.title}
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mt-1 font-normal line-clamp-2">
            {drop.description}
          </p>
        </div>

        <div className="flex items-center gap-3 pt-0.5 whitespace-nowrap shrink-0">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-900 dark:text-white whitespace-nowrap shrink-0">
            <div className="relative w-4 h-4 shrink-0">
              <Image
                src="/utils/gamification/utils/xp.webp"
                alt="XP"
                fill
                className="object-contain"
              />
            </div>
            <span className="whitespace-nowrap">+{drop.xpReward} XP</span>
          </div>

          {drop.tokensReward > 0 && (
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-900 dark:text-white whitespace-nowrap shrink-0">
              <div className="relative w-4 h-4 shrink-0">
                <Image
                  src="/utils/gamification/utils/RIB.svg"
                  alt="RIB"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="whitespace-nowrap">+{drop.tokensReward} RIB</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-3">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs whitespace-nowrap">
            <span className="text-zinc-500 dark:text-zinc-400 text-[11px] font-medium">
              Progresso do Desafio
            </span>
            <span className="text-zinc-800 dark:text-zinc-200 font-bold text-[11px] tabular-nums">
              {drop.currentProgress} de {drop.totalRequired} ({progressPercent}%)
            </span>
          </div>
          <Progress
            value={progressPercent}
            color="primary"
            size="sm"
            className="h-1.5 bg-zinc-100 dark:bg-zinc-800"
          />
        </div>

        <div className="flex items-center justify-between gap-3 pt-1">
          {isFullyDone ? (
            <div className="w-full flex items-center justify-center gap-1.5 py-2 rounded-sm bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 text-xs font-bold uppercase tracking-wider whitespace-nowrap">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" weight="fill" />
              <span>Drop Concluído & Resgatado</span>
            </div>
          ) : isReadyToClaim ? (
            <Button
              color="primary"
              size="sm"
              onClick={() => onClaim?.(drop.id)}
              className="w-full font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-1.5 shadow-sm cursor-pointer whitespace-nowrap"
            >
              <Sparkle className="w-4 h-4 shrink-0" weight="fill" />
              <span>Resgatar Recompensa</span>
            </Button>
          ) : (
            <CtaButton
              href={drop.actionUrl}
              variant="secondary"
              size="sm"
              className="w-full text-xs font-bold justify-center whitespace-nowrap"
            >
              <span className="whitespace-nowrap">{drop.actionLabel}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 shrink-0" />
            </CtaButton>
          )}
        </div>
      </div>
    </div>
  )
}
