export function maskCpf(value: string): string {
  const raw = value.replace(/\D/g, "").slice(0, 11)
  if (raw.length <= 3) return raw
  if (raw.length <= 6) return `${raw.slice(0, 3)}.${raw.slice(3)}`
  if (raw.length <= 9)
    return `${raw.slice(0, 3)}.${raw.slice(3, 6)}.${raw.slice(6)}`
  return `${raw.slice(0, 3)}.${raw.slice(3, 6)}.${raw.slice(6, 9)}-${raw.slice(9)}`
}

export function maskCnpj(value: string): string {
  const raw = value.replace(/\D/g, "").slice(0, 14)
  if (raw.length <= 2) return raw
  if (raw.length <= 5) return `${raw.slice(0, 2)}.${raw.slice(2)}`
  if (raw.length <= 8)
    return `${raw.slice(0, 2)}.${raw.slice(2, 5)}.${raw.slice(5)}`
  if (raw.length <= 12)
    return `${raw.slice(0, 2)}.${raw.slice(2, 5)}.${raw.slice(5, 8)}/${raw.slice(8)}`
  return `${raw.slice(0, 2)}.${raw.slice(2, 5)}.${raw.slice(5, 8)}/${raw.slice(8, 12)}-${raw.slice(12)}`
}

export function maskDate(value: string): string {
  const raw = value.replace(/\D/g, "").slice(0, 8)
  if (raw.length <= 2) return raw
  if (raw.length <= 4) return `${raw.slice(0, 2)}/${raw.slice(2)}`
  return `${raw.slice(0, 2)}/${raw.slice(2, 4)}/${raw.slice(4)}`
}

export function maskCardNumber(value: string): string {
  const raw = value.replace(/\D/g, "").slice(0, 16)
  return raw.replace(/(\d{4})(?=\d)/g, "$1 ").trim()
}

export function maskCardExpiry(value: string): string {
  const raw = value.replace(/\D/g, "").slice(0, 4)
  if (raw.length <= 2) return raw
  return `${raw.slice(0, 2)}/${raw.slice(2)}`
}

export function maskCvv(value: string): string {
  return value.replace(/\D/g, "").slice(0, 4)
}

export function maskPhone(value: string): string {
  const raw = value.replace(/\D/g, "").slice(0, 11)
  if (raw.length <= 2) return raw
  if (raw.length <= 6) return `(${raw.slice(0, 2)}) ${raw.slice(2)}`
  if (raw.length <= 10)
    return `(${raw.slice(0, 2)}) ${raw.slice(2, 6)}-${raw.slice(6)}`
  return `(${raw.slice(0, 2)}) ${raw.slice(2, 7)}-${raw.slice(7)}`
}
