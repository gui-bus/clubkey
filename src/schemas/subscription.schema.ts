import { z } from "zod"

import { isValidCpf } from "@/src/lib/utils/validators"

export const creditCardPaymentSchema = z
  .object({
    cardNumber: z
      .string()
      .min(1, "Informe o número do cartão.")
      .refine(
        (val) => val.replace(/\D/g, "").length >= 15 && val.replace(/\D/g, "").length <= 16,
        "Número de cartão inválido."
      ),
    holderName: z
      .string()
      .min(3, "Informe o nome impresso no cartão.")
      .regex(/^[a-zA-Z\s]+$/, "Nome deve conter apenas letras."),
    expirationDate: z
      .string()
      .min(1, "Informe a validade.")
      .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Validade inválida (MM/AA).")
      .refine((val) => {
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(val)) return false
        const [monthStr, yearStr] = val.split("/")
        const month = parseInt(monthStr, 10)
        const year = 2000 + parseInt(yearStr, 10)
        const now = new Date()
        const currentYear = now.getFullYear()
        const currentMonth = now.getMonth() + 1
        if (year < currentYear) return false
        if (year === currentYear && month < currentMonth) return false
        return true
      }, "Cartão expirado."),
    cvv: z
      .string()
      .min(1, "Informe o CVV.")
      .refine((val) => /^\d{3,4}$/.test(val), "CVV deve ter 3 ou 4 dígitos."),
    holderCpf: z.string().min(1, "Informe o CPF do titular."),
  })
  .superRefine((data, ctx) => {
    if (data.holderCpf && data.holderCpf.trim().length > 0) {
      if (!isValidCpf(data.holderCpf)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "CPF do titular inválido.",
          path: ["holderCpf"],
        })
      }
    }
  })

export type CreditCardPaymentFormData = z.infer<typeof creditCardPaymentSchema>

export const subscriptionAuthLoginSchema = z.object({
  email: z
    .string()
    .min(1, "Informe seu e-mail.")
    .email("Informe um e-mail válido."),
  password: z.string().min(1, "Informe sua senha."),
})

export type SubscriptionAuthLoginFormData = z.infer<
  typeof subscriptionAuthLoginSchema
>
