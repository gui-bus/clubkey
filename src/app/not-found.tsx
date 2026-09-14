"use client"

import * as React from "react"

import { CtaButton } from "@/src/components/common/ctaButton"

export default function NotFound(): React.JSX.Element {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
        404 - Página não encontrada
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        A página que você está procurando não existe.
      </p>
      <div className="mt-8">
        <CtaButton href="/">
          Voltar ao início
        </CtaButton>
      </div>
    </div>
  )
}
