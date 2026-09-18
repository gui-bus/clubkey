"use client"

import * as React from "react"

import { Check, Circle, Eye, EyeSlash, X } from "@phosphor-icons/react"
import { type VariantProps } from "class-variance-authority"

import { Input, type inputVariants } from "@/src/components/ui/input/input"

import { cn } from "@/src/lib/utils"

export interface PasswordRule {
  id: string
  label: string
  validate: (value: string) => boolean
}

export interface PasswordInputProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  minLength?: number
  requireUppercase?: boolean
  requireLowercase?: boolean
  requireNumber?: boolean
  requireSymbol?: boolean
  customRules?: PasswordRule[]
  showRequirements?: "always" | "on-focus" | "never"
  showStrengthMeter?: boolean
  onValidityChange?: (isValid: boolean) => void
  isPasswordToggle?: boolean
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      className,
      size = "md",
      variant = "default",
      minLength = 8,
      requireUppercase = true,
      requireLowercase = true,
      requireNumber = true,
      requireSymbol = true,
      customRules,
      showRequirements = "on-focus",
      showStrengthMeter = true,
      onValidityChange,
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const [internalValue, setInternalValue] = React.useState(
      (value !== undefined
        ? value
        : defaultValue !== undefined
          ? defaultValue
          : ""
      )?.toString() || ""
    )
    const [isFocused, setIsFocused] = React.useState(false)

    const isControlled = value !== undefined
    const currentValue = isControlled ? (value ?? "").toString() : internalValue

    const rules = React.useMemo(() => {
      const activeRules: PasswordRule[] = []

      if (minLength > 0) {
        activeRules.push({
          id: "min-length",
          label: `Mínimo de ${minLength} caracteres`,
          validate: (val) => val.length >= minLength,
        })
      }
      if (requireUppercase) {
        activeRules.push({
          id: "uppercase",
          label: "Pelo menos 1 letra maiúscula (A-Z)",
          validate: (val) => /[A-Z]/.test(val),
        })
      }
      if (requireLowercase) {
        activeRules.push({
          id: "lowercase",
          label: "Pelo menos 1 letra minúscula (a-z)",
          validate: (val) => /[a-z]/.test(val),
        })
      }
      if (requireNumber) {
        activeRules.push({
          id: "number",
          label: "Pelo menos 1 número (0-9)",
          validate: (val) => /[0-9]/.test(val),
        })
      }
      if (requireSymbol) {
        activeRules.push({
          id: "symbol",
          label: "Pelo menos 1 caractere especial ($*&@#!?^)",
          validate: (val) =>
            /[$\*&@#!?^]/.test(val) || /[^A-Za-z0-9]/.test(val),
        })
      }

      if (customRules) {
        activeRules.push(...customRules)
      }

      return activeRules
    }, [
      minLength,
      requireUppercase,
      requireLowercase,
      requireNumber,
      requireSymbol,
      customRules,
    ])

    const ruleStatuses = React.useMemo(() => {
      return rules.map((rule) => ({
        ...rule,
        isValid: rule.validate(currentValue),
      }))
    }, [rules, currentValue])

    const allValid = React.useMemo(() => {
      if (rules.length === 0) return true
      return ruleStatuses.every((r) => r.isValid)
    }, [ruleStatuses, rules.length])

    React.useEffect(() => {
      onValidityChange?.(allValid)
    }, [allValid, onValidityChange])

    const strengthPercentage = React.useMemo(() => {
      if (rules.length === 0 || currentValue.length === 0) return 0
      const validCount = ruleStatuses.filter((r) => r.isValid).length
      return Math.round((validCount / rules.length) * 100)
    }, [ruleStatuses, rules, currentValue.length])

    const strengthColor = React.useMemo(() => {
      if (strengthPercentage < 40) return "bg-rose-500"
      if (strengthPercentage < 80) return "bg-amber-500"
      return "bg-emerald-500"
    }, [strengthPercentage])

    const strengthText = React.useMemo(() => {
      if (strengthPercentage === 0) return "Vazia"
      if (strengthPercentage < 40) return "Fraca"
      if (strengthPercentage < 80) return "Média"
      return "Forte"
    }, [strengthPercentage])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value)
      }
      onChange?.(e)
    }

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      onBlur?.(e)
    }

    const shouldShowRequirements =
      showRequirements === "always" ||
      (showRequirements === "on-focus" &&
        (isFocused || currentValue.length > 0))

    return (
      <div className="w-full flex flex-col gap-2.5">
        <div className="relative flex items-center w-full">
          <Input
            ref={ref}
            type={showPassword ? "text" : "password"}
            size={size}
            variant={variant}
            value={currentValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            autoComplete="off"
            className={cn("pr-11", className)}
            {...props}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3.5 flex items-center justify-center p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors cursor-pointer rounded-md outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/20"
            aria-label={showPassword ? "Ocultar senha" : "Ver senha"}
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeSlash className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>

        {shouldShowRequirements && rules.length > 0 && (
          <div className="w-full p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-all duration-300 animate-in fade-in slide-in-from-top-2 shadow-xs">
            {showStrengthMeter && (
              <div className="mb-3.5">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-zinc-500 dark:text-zinc-400 font-medium">
                    Força da senha
                  </span>
                  <span
                    className={cn(
                      "font-semibold text-xs",
                      strengthPercentage === 0
                        ? "text-zinc-400"
                        : strengthPercentage < 40
                          ? "text-rose-500"
                          : strengthPercentage < 80
                            ? "text-amber-500"
                            : "text-emerald-500"
                    )}
                  >
                    {strengthText}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full transition-all duration-300",
                      strengthColor
                    )}
                    style={{ width: `${strengthPercentage}%` }}
                  />
                </div>
              </div>
            )}

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {ruleStatuses.map((rule) => (
                <li
                  key={rule.id}
                  className={cn(
                    "flex items-center gap-2 transition-colors duration-200",
                    rule.isValid
                      ? "text-emerald-600 dark:text-emerald-400"
                      : currentValue.length > 0
                        ? "text-rose-600 dark:text-rose-400"
                        : "text-zinc-500 dark:text-zinc-400"
                  )}
                >
                  {rule.isValid ? (
                    <Check className="w-3.5 h-3.5 shrink-0 text-emerald-600 dark:text-emerald-400 stroke-[2.5]" />
                  ) : currentValue.length > 0 ? (
                    <X className="w-3.5 h-3.5 shrink-0 text-rose-500 dark:text-rose-400 stroke-[2.5]" />
                  ) : (
                    <Circle className="w-3 h-3 shrink-0 text-zinc-400 dark:text-zinc-600 fill-zinc-200 dark:fill-zinc-800" />
                  )}
                  <span className="font-medium text-[11px] sm:text-xs">
                    {rule.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
)

PasswordInput.displayName = "PasswordInput"

export { PasswordInput }
