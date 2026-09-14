"use client"

import * as React from "react"
import { PortalNavbar } from "@/src/components/portal/PortalNavbar"

export default function PortalLayout({
  children
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return (
    <div className="min-h-screen w-full bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800">
      <PortalNavbar />
      <main className="flex-1 w-full px-6 md:px-12 py-8 md:py-10">
        {children}
      </main>
    </div>
  )
}
