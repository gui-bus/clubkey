export function isValidCpf(cpf: string): boolean {
  const clean = cpf.replace(/\D/g, "")
  if (clean.length !== 11) return false
  if (/^(\d)\1{10}$/.test(clean)) return false

  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(clean.charAt(i), 10) * (10 - i)
  }
  let firstDigit = (sum * 10) % 11
  if (firstDigit === 10 || firstDigit === 11) firstDigit = 0
  if (firstDigit !== parseInt(clean.charAt(9), 10)) return false

  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += parseInt(clean.charAt(i), 10) * (11 - i)
  }
  let secondDigit = (sum * 10) % 11
  if (secondDigit === 10 || secondDigit === 11) secondDigit = 0
  if (secondDigit !== parseInt(clean.charAt(10), 10)) return false

  return true
}

export function isValidCnpj(cnpj: string): boolean {
  const clean = cnpj.replace(/\D/g, "")
  if (clean.length !== 14) return false
  if (/^(\d)\1{13}$/.test(clean)) return false

  const weightsFirst = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  let sum = 0
  for (let i = 0; i < 12; i++) {
    sum += parseInt(clean.charAt(i), 10) * weightsFirst[i]
  }
  const remFirst = sum % 11
  const firstDigit = remFirst < 2 ? 0 : 11 - remFirst
  if (firstDigit !== parseInt(clean.charAt(12), 10)) return false

  const weightsSecond = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  sum = 0
  for (let i = 0; i < 13; i++) {
    sum += parseInt(clean.charAt(i), 10) * weightsSecond[i]
  }
  const remSecond = sum % 11
  const secondDigit = remSecond < 2 ? 0 : 11 - remSecond
  if (secondDigit !== parseInt(clean.charAt(13), 10)) return false

  return true
}
