"use client"

import * as React from "react"

import Image from "next/image"
import Link from "next/link"

import { cn } from "@/src/lib/utils/utils"

export function TopBanner(): React.JSX.Element {
  const [isVisible, setIsVisible] = React.useState(true)
  const lastScrollY = React.useRef(0)

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY <= 10) {
        setIsVisible(true)
        lastScrollY.current = currentScrollY
        return
      }

      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight
      if (currentScrollY > maxScroll) {
        return
      }

      const diff = currentScrollY - lastScrollY.current

      if (Math.abs(diff) < 8) {
        return
      }

      if (diff > 0) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <aside
      aria-label="Aviso Promocional"
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full bg-[#F1F1F1] dark:bg-[#161616] border-b border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-white py-1.5 sm:py-2 px-4 sm:px-6 md:px-12 transition-all duration-300 ease-in-out shadow-xs",
        isVisible ? "translate-y-0" : "-translate-y-full pointer-events-none"
      )}
    >
      <div className="w-full max-w-440 mx-auto flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-6 text-center">
        <p className="text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-200">
          Acesso exclusivo a mais de{" "}
          <strong className="text-zinc-950 dark:text-white font-bold">
            +4.500 hospedagens
          </strong>{" "}
          com tarifas de membro e até{" "}
          <span className="text-[#FF6847] font-bold">60% OFF</span>
        </p>

        <div className="flex items-center gap-2.5 shrink-0">
          <Link
            href="https://clubkey.io/subscription"
            target="_blank"
            rel="noreferrer"
            className="group relative inline-flex items-center justify-center px-4 py-1.5 overflow-hidden rounded-sm bg-[#FF6847] text-white text-xs font-bold uppercase tracking-wider shadow-xs whitespace-nowrap cursor-pointer transition-all duration-300"
          >
            <span className="absolute inset-0 w-full h-full bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
            <span className="relative z-10 inline-flex items-center text-white group-hover:text-zinc-950 transition-colors duration-300">
              Quero ser associado
            </span>
          </Link>

          <Image
            src="/utils/gifs/arrow_right.gif"
            width={20}
            height={10}
            alt=""
            className="w-8 sm:w-12  dark:invert dark:brightness-0 shrink-0 select-none pointer-events-none rotate-180"
          />
        </div>
      </div>
    </aside>
  )
}
