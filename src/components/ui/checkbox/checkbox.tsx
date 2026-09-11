"use client"

import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "@/src/lib/utils/utils"

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      onChange,
      disabled,
      ...props
    },
    ref
  ) => {
    const isControlled = controlledChecked !== undefined
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked)
    const isChecked = isControlled ? controlledChecked : internalChecked

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return
      if (!isControlled) {
        setInternalChecked(e.target.checked)
      }
      onCheckedChange?.(e.target.checked)
      onChange?.(e)
    }

    return (
      <label
        className={cn(
          "relative inline-flex items-center justify-center shrink-0 cursor-pointer select-none",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <input
          type="checkbox"
          ref={ref}
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
          className="sr-only peer"
          {...props}
        />
        <div
          className={cn(
            "w-5 h-5 rounded-md border transition-all flex items-center justify-center bg-white dark:bg-zinc-900",
            isChecked
              ? "bg-brand-primary border-brand-primary text-white"
              : "border-zinc-300 dark:border-zinc-700 peer-focus-visible:ring-2 peer-focus-visible:ring-brand-primary/20",
            className
          )}
        >
          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </div>
      </label>
    )
  }
)

Checkbox.displayName = "Checkbox"

export { Checkbox }
