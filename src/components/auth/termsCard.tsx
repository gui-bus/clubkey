"use client"

import * as React from "react"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

import { Checkbox } from "@/src/components/ui/checkbox/checkbox"
import { cn } from "@/src/lib/utils/utils"

export interface TermsCardProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  error?: string
  className?: string
}

const policyDocuments = [
  {
    title: "Termos de uso",
    href: "https://ribusdb.s3.amazonaws.com/politicas/termos-de-uso.pdf",
  },
  {
    title: "Política de privacidade e proteção de dados",
    href: "https://ribusdb.s3.amazonaws.com/politicas/privacidade-protecao-dados.pdf",
  },
  {
    title: "Política de segurança da informação",
    href: "https://ribusdb.s3.amazonaws.com/politicas/seguranca-informacao.pdf",
  },
  {
    title: "Política de compliance",
    href: "https://ribusdb.s3.amazonaws.com/politicas/compliance.pdf",
  },
  {
    title: "Política de identificação de fatores de risco",
    href: "https://ribusdb.s3.amazonaws.com/politicas/politica-de-identificacao-fatores-risco.pdf",
  },
]

export function TermsCard({
  checked,
  onCheckedChange,
  error,
  className,
}: TermsCardProps): React.JSX.Element {
  return (
    <div className={cn("w-full space-y-4 pt-2", className)}>
      <div className="flex items-start gap-3">
        <Checkbox
          checked={checked}
          onCheckedChange={onCheckedChange}
          id="terms-checkbox"
          className="mt-0.5"
        />
        <label
          htmlFor="terms-checkbox"
          className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 cursor-pointer select-none"
        >
          Li e aceito os seguintes documentos:
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pl-7">
        {policyDocuments.map((doc) => (
          <Link
            key={doc.title}
            href={doc.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-300 underline font-medium transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            <span>{doc.title}</span>
          </Link>
        ))}
      </div>

      <p className="text-xs text-zinc-600 dark:text-zinc-400 font-light leading-relaxed pl-7">
        Declaro para os devidos fins que as informações cadastrais fornecidas são
        verdadeiras, e assumo total responsabilidade sobre elas, estando sujeito
        às penalidades previstas em lei (Art. 171 e 299 CP).
      </p>

      {error && <span className="block text-xs text-red-500 pl-7">{error}</span>}
    </div>
  )
}
