import * as React from "react"
import { cn } from "@/src/lib/utils"

export type DiscountRibbonColor = "emerald" | "primary" | "brand"

export interface DiscountRibbonProps {
  children?: React.ReactNode
  text?: string | number
  color?: DiscountRibbonColor
  className?: string
  containerClassName?: string
}

const colorClasses: Record<DiscountRibbonColor, string> = {
  emerald: "bg-emerald-500 text-white",
  primary: "bg-brand-primary text-white",
  brand: "bg-brand-primary text-white",
}

export function DiscountRibbon({
  children,
  text,
  color = "emerald",
  className,
  containerClassName,
}: DiscountRibbonProps): React.JSX.Element {
  const content = text ?? children
  if (!content) return <React.Fragment />

  const isLong = typeof content === "string" && content.length > 8

  return (
    <div
      className={cn(
        "absolute top-0 right-0 w-24 h-24 overflow-hidden pointer-events-none z-20",
        containerClassName
      )}
    >
      <div
        className={cn(
          "absolute -right-8 top-4 w-32 rotate-45 py-1 text-center font-black uppercase select-none shadow-xs",
          isLong ? "text-[10px] tracking-tight leading-tight" : "text-xs tracking-wider",
          colorClasses[color],
          className
        )}
      >
        {content}
      </div>
    </div>
  )
}
