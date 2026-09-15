"use client"

import * as React from "react"
import { Link2, Check } from "lucide-react"
import { toast } from "@/src/components/ui/toast/toast"
import { cn } from "@/src/lib/utils"

export interface ShareButtonProps {
  url?: string
  title?: string
  label?: string
  copiedLabel?: string
  className?: string
}

export function ShareButton({
  url,
  label = "Copiar Link",
  copiedLabel = "Link Copiado!",
  className,
}: ShareButtonProps): React.JSX.Element {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (typeof window !== "undefined") {
      const targetUrl = url || window.location.href
      navigator.clipboard.writeText(targetUrl)
      setCopied(true)
      toast.success("Link copiado para a área de transferência!")

      setTimeout(() => {
        setCopied(false)
      }, 2200)
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 h-9 px-3.5 rounded-sm border text-xs font-bold uppercase tracking-wider select-none cursor-pointer transition-all duration-200 active:scale-[0.98] shadow-2xs hover:shadow-xs",
        copied
          ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 dark:border-emerald-500/30"
          : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:text-zinc-900 dark:hover:text-white",
        className
      )}
      aria-label={copied ? copiedLabel : label}
    >
      <span className="relative flex items-center justify-center size-3.5 shrink-0">
        {copied ? (
          <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 animate-in zoom-in-75 duration-200" />
        ) : (
          <Link2 className="w-3.5 h-3.5 text-zinc-400 group-hover:text-brand-primary transition-colors duration-200" />
        )}
      </span>
      <span
        key={copied ? "copied" : "default"}
        className={cn(
          "transition-all duration-200",
          copied ? "animate-in fade-in-50 text-emerald-600 dark:text-emerald-400" : ""
        )}
      >
        {copied ? copiedLabel : label}
      </span>
    </button>
  )
}
