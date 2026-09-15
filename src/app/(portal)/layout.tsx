"use client"

import * as React from "react"

import { Navbar } from "@/src/components/landing/Navbar"

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return (
    <div className="min-h-screen w-full bg-[#F1F1F1] dark:bg-[#161616] text-zinc-900 dark:text-white flex flex-col font-sans selection:bg-brand-primary/20 selection:text-brand-primary">
      <Navbar />
      <main className="flex-1 w-full flex flex-col">{children}</main>
    </div>
  )
}
