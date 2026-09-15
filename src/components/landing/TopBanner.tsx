"use client"

import * as React from "react"

import Image from "next/image"

import { CtaButton } from "@/src/components/common/ctaButton"
import { brandConfig } from "@/src/config/brand.config"
import { cn } from "@/src/lib/utils"

import { usePortalStore } from "@/src/store/usePortalStore"

const emptySubscribe = () => () => {}

export function TopBanner(): React.JSX.Element | null {
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
  const isAuthenticated = usePortalStore((state) => state.isAuthenticated)
  const [isVisible, setIsVisible] = React.useState(true)
  const lastScrollY = React.useRef(0)

  React.useEffect(() => {
    if (!mounted || isAuthenticated) return

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
  }, [mounted, isAuthenticated])

  if (!mounted || isAuthenticated) {
    return null
  }

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
          <span className="text-brand-primary font-bold">60% OFF</span>
        </p>

        <div className="flex items-center gap-2.5 shrink-0">
          <CtaButton
            href={brandConfig.links.subscription}
            size="xs"
            className="shadow-xs whitespace-nowrap"
          >
            Quero ser associado
          </CtaButton>

          <Image
            src="/utils/gifs/arrow_right.gif"
            width={20}
            height={10}
            alt=""
            className="w-8 sm:w-12 dark:invert dark:brightness-0 shrink-0 select-none pointer-events-none rotate-180"
          />
        </div>
      </div>
    </aside>
  )
}
