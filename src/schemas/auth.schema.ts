import { z } from "zod"

import { isValidCpf, isValidCnpj } from "@/src/lib/validators"

export const passwordSchema = z
  .string()
  .min(8, "Mínimo de 8 caracteres.")
  .regex(/[A-Z]/, "Pelo menos 1 letra maiúscula (A-Z).")
  .regex(/[a-z]/, "Pelo menos 1 letra minúscula (a-z).")
  .regex(/[0-9]/, "Pelo menos 1 número (0-9).")
  .regex(
    /[$\*&@#!?^]|[^A-Za-z0-9]/,
    "Pelo menos 1 caractere especial ($*&@#!?^)."
  )

export const phoneSchema = z.object({
  dialCode: z.string().min(1, "Selecione o código do país."),
  number: z.string().min(8, "Informe seu telefone com DDD."),
})

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Informe seu e-mail.")
    .email("Informe um e-mail válido."),
  password: z.string().min(1, "Informe sua senha."),
})

export type SignInFormData = z.infer<typeof signInSchema>

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Informe seu e-mail.")
    .email("Informe um e-mail válido."),
})

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Confirme sua nova senha."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  })

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

export const signUpPfSchema = z
  .object({
    accountType: z.literal("pf"),
    nationality: z.enum(["brasileiro", "estrangeiro"]),
    fullName: z.string().min(3, "Informe seu nome completo."),
    email: z
      .string()
      .min(1, "Informe seu e-mail.")
      .email("Informe um e-mail válido."),
    cpf: z.string().min(1, "Informe seu CPF ou documento."),
    birthDate: z.string().min(10, "Informe a data de nascimento (DD/MM/AAAA)."),
    phone: phoneSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Confirme sua senha."),
    hasReferral: z.boolean(),
    referralCode: z.string().optional(),
    acceptedTerms: z.boolean().refine((val) => val === true, {
      message: "Você precisa aceitar os termos e políticas para prosseguir.",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.cpf && data.cpf.trim().length > 0) {
      if (data.nationality === "brasileiro") {
        if (!isValidCpf(data.cpf)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "CPF inválido.",
            path: ["cpf"],
          })
        }
      } else {
        if (data.cpf.trim().length < 4) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Documento inválido.",
            path: ["cpf"],
          })
        }
      }
    }

    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "As senhas não coincidem.",
        path: ["confirmPassword"],
      })
    }

    if (data.hasReferral) {
      if (!data.referralCode || data.referralCode.trim().length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Informe o e-mail de quem indicou.",
          path: ["referralCode"],
        })
      } else if (
        !z.string().email().safeParse(data.referralCode.trim()).success
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Informe um e-mail válido para a indicação.",
          path: ["referralCode"],
        })
      }
    }
  })

export type SignUpPfFormData = z.infer<typeof signUpPfSchema>

export const signUpPjSchema = z
  .object({
    accountType: z.literal("pj"),
    companyName: z.string().min(2, "Informe a razão social."),
    corporateEmail: z
      .string()
      .min(1, "Informe o e-mail corporativo.")
      .email("Informe um e-mail corporativo válido."),
    responsibleName: z.string().min(3, "Informe o nome do responsável."),
    cnpj: z.string().min(1, "Informe o CNPJ da empresa."),
    responsibleCpf: z.string().min(1, "Informe o CPF do responsável."),
    openingDate: z.string().min(10, "Informe a data de abertura (DD/MM/AAAA)."),
    phone: phoneSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Confirme sua senha."),
    hasReferral: z.boolean(),
    referralCode: z.string().optional(),
    acceptedTerms: z.boolean().refine((val) => val === true, {
      message: "Você precisa aceitar os termos e políticas para prosseguir.",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.cnpj && data.cnpj.trim().length > 0) {
      if (!isValidCnpj(data.cnpj)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "CNPJ inválido.",
          path: ["cnpj"],
        })
      }
    }

    if (data.responsibleCpf && data.responsibleCpf.trim().length > 0) {
      if (!isValidCpf(data.responsibleCpf)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "CPF do responsável inválido.",
          path: ["responsibleCpf"],
        })
      }
    }

    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "As senhas não coincidem.",
        path: ["confirmPassword"],
      })
    }

    if (data.hasReferral) {
      if (!data.referralCode || data.referralCode.trim().length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Informe o e-mail de quem indicou.",
          path: ["referralCode"],
        })
      } else if (
        !z.string().email().safeParse(data.referralCode.trim()).success
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Informe um e-mail válido para a indicação.",
          path: ["referralCode"],
        })
      }
    }
  })

export type SignUpPjFormData = z.infer<typeof signUpPjSchema>
