"use client"

import * as React from "react"

import { CtaButton } from "@/src/components/common/ctaButton"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ reset }: ErrorProps): React.JSX.Element {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
        Algo deu errado!
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Ocorreu um erro inesperado.
      </p>
      <div className="mt-8">
        <CtaButton onClick={() => reset()}>
          Tentar novamente
        </CtaButton>
      </div>
    </div>
  )
}
