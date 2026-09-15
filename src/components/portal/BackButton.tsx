"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CaretLeft } from "@phosphor-icons/react"
import { cn } from "@/src/lib/utils"

interface BackButtonProps {
  label?: string
  fallbackHref?: string
  className?: string
}

export function BackButton({
  label = "Voltar",
  fallbackHref,
  className = "",
}: BackButtonProps) {
  const router = useRouter()

  if (fallbackHref) {
    return (
      <Link
        href={fallbackHref}
        className={cn(
          "inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer",
          className
        )}
      >
        <CaretLeft className="w-4 h-4" />
        <span>{label}</span>
      </Link>
    )
  }

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className={cn(
        "inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer",
        className
      )}
    >
      <CaretLeft className="w-4 h-4" />
      <span>{label}</span>
    </button>
  )
}
