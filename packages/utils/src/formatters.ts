export function formatCurrency(
  value: number | string,
  options?: { hidePrefix?: boolean; decimals?: number }
): string {
  const numericValue = typeof value === "string" ? parseFloat(value) : value
  if (isNaN(numericValue)) return "R$ 0,00"

  const formatted = numericValue.toLocaleString("pt-BR", {
    minimumFractionDigits: options?.decimals ?? 2,
    maximumFractionDigits: options?.decimals ?? 2,
  })

  return options?.hidePrefix ? formatted : `R$ ${formatted}`
}

export function formatBRL(amount: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatShortDate(
  date: Date | string | number,
  options?: { month?: "short" | "long" | "numeric"; includeYear?: boolean }
): string {
  const d =
    typeof date === "string" || typeof date === "number" ? new Date(date) : date
  if (!d || isNaN(d.getTime())) return ""

  const monthFormat = options?.month || "short"
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: monthFormat,
    year: options?.includeYear ? "numeric" : undefined,
  })
}

export function formatDateRange(
  start: Date | string | null,
  end: Date | string | null,
  fallback = "Qualquer data"
): string {
  if (!start && !end) return fallback

  const startDate = start
    ? typeof start === "string"
      ? new Date(start)
      : start
    : null
  const endDate = end ? (typeof end === "string" ? new Date(end) : end) : null

  if (startDate && !endDate) {
    return `${formatShortDate(startDate)} • Escolha a saída`
  }

  if (startDate && endDate) {
    return `${formatShortDate(startDate)} — ${formatShortDate(endDate)}`
  }

  return fallback
}

export function formatNumber(value: number): string {
  if (isNaN(value)) return "0"
  return value.toLocaleString("pt-BR")
}
