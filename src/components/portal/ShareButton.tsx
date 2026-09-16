"use client"

import * as React from "react"
import { LinkSimple, Check } from "@phosphor-icons/react"
import { toast } from "@/src/components/ui/toast/toast"
import { cn } from "@/src/lib/utils"
import { CtaButton, CtaButtonSize } from "@/src/components/common/ctaButton"

export interface ShareButtonProps {
  url?: string
  title?: string
  label?: string
  copiedLabel?: string
  className?: string
  size?: CtaButtonSize
}

export function ShareButton({
  url,
  label = "Copiar Link",
  copiedLabel = "Link Copiado!",
  className,
  size = "sm",
}: ShareButtonProps): React.JSX.Element {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
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
    <CtaButton
      type="button"
      variant="secondary"
      size={size}
      onClick={handleCopy}
      className={cn(
        "h-9 px-3.5 text-xs shadow-none hover:shadow-none font-bold uppercase tracking-wider",
        copied && "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 dark:border-emerald-500/30",
        className
      )}
      aria-label={copied ? copiedLabel : label}
    >
      <span className="relative flex items-center justify-center size-3.5 shrink-0 mr-2">
        {copied ? (
          <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 animate-in zoom-in-75 duration-200" />
        ) : (
          <LinkSimple className="w-3.5 h-3.5 text-zinc-400 group-hover:text-brand-primary transition-colors duration-200" />
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
    </CtaButton>
  )
}
