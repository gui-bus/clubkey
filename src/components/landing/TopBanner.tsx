"use client"

import * as React from "react"

export function TopBanner(): React.JSX.Element {
  return (
    <aside
      aria-label="Aviso Promocional"
      className="fixed top-0 left-0 right-0 z-50 w-full bg-[#EBEBEB] dark:bg-[#111111] border-b border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-white py-1.5 sm:py-2 px-4 sm:px-6 md:px-12 transition-colors shadow-xs"
    >
      <div className="w-full max-w-440 mx-auto flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-6 text-center">
        <p className="text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-200">
          Acesso exclusivo a mais de <strong className="text-zinc-950 dark:text-white font-bold">+4.500 hospedagens</strong> com tarifas de membro e até{" "}
          <span className="text-[#FF6847] font-bold">60% OFF</span>
        </p>

        <div className="flex items-center gap-2.5 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/utils/gifs/arrow_right.gif"
            alt=""
            className="w-6 h-6 sm:w-7 sm:h-7 dark:invert dark:brightness-0 shrink-0 select-none pointer-events-none"
          />
          <a
            href="https://clubkey.io/subscription"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center px-4 py-1.5 bg-[#FF6847] hover:bg-[#E85535] text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-xs whitespace-nowrap cursor-pointer"
          >
            Quero ser associado
          </a>
        </div>
      </div>
    </aside>
  )
}

