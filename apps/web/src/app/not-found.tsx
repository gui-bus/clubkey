"use client"

import * as React from "react"

import { NotFoundView } from "@/src/components/common/notFoundView"
import { Header } from "@/src/components/landing/header"

export default function NotFound(): React.JSX.Element {
  return (
    <div className="flex-1 w-full bg-[#F1F1F1] dark:bg-[#161616] text-zinc-900 dark:text-white flex flex-col font-sans">
      <Header isTransparent={false} />
      <main className="flex-1 w-full flex flex-col">
        <NotFoundView />
      </main>
    </div>
  )
}
