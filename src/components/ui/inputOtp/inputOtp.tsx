"use client"

import * as React from "react"

import { cn } from "@/src/lib/utils"

export interface InputOtpProps {
  value: string
  onChange: (value: string) => void
  length?: number
  disabled?: boolean
  autoFocus?: boolean
  className?: string
  onComplete?: (value: string) => void
}

export function InputOtp({
  value,
  onChange,
  length = 6,
  disabled = false,
  autoFocus = false,
  className,
  onComplete,
}: InputOtpProps): React.JSX.Element {
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])

  const digits = React.useMemo(() => {
    const arr = value.split("").slice(0, length)
    while (arr.length < length) {
      arr.push("")
    }
    return arr
  }, [value, length])

  React.useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [autoFocus])

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault()
      if (digits[index]) {
        const nextDigits = [...digits]
        nextDigits[index] = ""
        const nextVal = nextDigits.join("")
        onChange(nextVal)
      } else if (index > 0) {
        const nextDigits = [...digits]
        nextDigits[index - 1] = ""
        const nextVal = nextDigits.join("")
        onChange(nextVal)
        inputRefs.current[index - 1]?.focus()
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault()
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === "ArrowRight" && index < length - 1) {
      e.preventDefault()
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value
    const char = rawVal.replace(/[^0-9]/g, "").slice(-1)

    if (!char) return

    const nextDigits = [...digits]
    nextDigits[index] = char
    const nextVal = nextDigits.join("")
    onChange(nextVal)

    if (nextVal.length === length) {
      onComplete?.(nextVal)
    }

    if (index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").replace(/[^0-9]/g, "").slice(0, length)
    if (pastedData) {
      onChange(pastedData)
      if (pastedData.length === length) {
        onComplete?.(pastedData)
      }
      const nextIndex = Math.min(pastedData.length, length - 1)
      inputRefs.current[nextIndex]?.focus()
    }
  }

  return (
    <div className={cn("flex items-center justify-center gap-2 sm:gap-3", className)}>
      {Array.from({ length }).map((_, index) => {
        const isFilled = Boolean(digits[index])
        return (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digits[index]}
            disabled={disabled}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className={cn(
              "w-11 h-14 sm:w-13 sm:h-16 text-center text-xl sm:text-2xl font-black rounded-xl border bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 transition-all outline-none",
              isFilled
                ? "border-brand-primary ring-1 ring-brand-primary/20 shadow-xs"
                : "border-zinc-200 dark:border-zinc-800",
              "focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 focus:scale-105",
              disabled && "opacity-50 cursor-not-allowed"
            )}
            aria-label={`Dígito ${index + 1}`}
          />
        )
      })}
    </div>
  )
}
