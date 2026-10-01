import * as React from "react"

import type { Metadata } from "next"

import { SinistrosClient } from "@/src/components/admin/sinistros/sinistrosClient"

export const metadata: Metadata = {
  title: "Sinistros | ClubKey Admin",
  description: "Abertura, regulação pericial e liquidação financeira de sinistros e indenizações.",
}

export default function SinistrosPage(): React.JSX.Element {
  return (
    <React.Suspense fallback={<div className="min-h-screen" />}>
      <SinistrosClient />
    </React.Suspense>
  )
}
