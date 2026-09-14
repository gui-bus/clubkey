"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

interface BackButtonProps {
  label?: string
  fallbackHref?: string
  className?: string
}

export function BackButton({
  label = "Voltar",
  fallbackHref,
  className = ""
}: BackButtonProps) {
  const router = useRouter()

  const handleBack = () => {
    if (fallbackHref) {
      router.push(fallbackHref)
    } else {
      router.back()
    }
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 hover:text-brand-primary hover:border-brand-primary/40 transition-colors cursor-pointer ${className}`}
    >
      <ArrowLeft className="w-3.5 h-3.5 text-brand-primary" />
      <span>{label}</span>
    </button>
  )
}
