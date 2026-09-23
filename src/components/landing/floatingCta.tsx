"use client"

import * as React from "react"

import Image from "next/image"

import { usePortalStore } from "@/src/store/usePortalStore"
import { motion } from "framer-motion"

import { Container } from "@/src/components/common/container"
import { CtaButton } from "@/src/components/common/ctaButton"

import { cn } from "@/src/lib/utils"

import { brandConfig } from "@/src/config/brand.config"

const emptySubscribe = () => () => {}

export function FloatingCta(): React.JSX.Element | null {
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
  const isAuthenticated = usePortalStore((state) => state.isAuthenticated)
  const [isDarkBg, setIsDarkBg] = React.useState(false)

  React.useEffect(() => {
    if (!mounted) return

    const checkOverlap = () => {
      const ctaTop = window.innerHeight - 80
      const ctaBottom = window.innerHeight - 20

      const darkTargets = [
        document.querySelector("footer"),
        document.getElementById("experiencia"),
      ].filter(Boolean) as HTMLElement[]

      const isOverDark = darkTargets.some((el) => {
        const rect = el.getBoundingClientRect()
        return rect.top <= ctaBottom && rect.bottom >= ctaTop
      })

      setIsDarkBg(isOverDark)
    }

    checkOverlap()

    window.addEventListener("scroll", checkOverlap, { passive: true })
    window.addEventListener("resize", checkOverlap, { passive: true })

    const darkTargets = [
      document.querySelector("footer"),
      document.getElementById("experiencia"),
    ].filter(Boolean) as HTMLElement[]

    let observer: IntersectionObserver | null = null
    if (darkTargets.length > 0 && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        () => {
          checkOverlap()
        },
        {
          rootMargin: "0px 0px -30px 0px",
          threshold: [0, 0.1, 0.5, 1],
        }
      )
      darkTargets.forEach((target) => observer?.observe(target))
    }

    return () => {
      window.removeEventListener("scroll", checkOverlap)
      window.removeEventListener("resize", checkOverlap)
      if (observer) {
        observer.disconnect()
      }
    }
  }, [mounted])

  if (!mounted || isAuthenticated) {
    return null
  }

  return (
    <Container
      as="aside"
      aria-label="Acesso rápido para se associar"
      className="pointer-events-none fixed bottom-6 inset-x-0 z-40 flex justify-end"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="pointer-events-auto flex items-center gap-2"
      >
        <Image
          src="/utils/gifs/arrow_right.gif"
          width={20}
          height={10}
          alt=""
          className={cn(
            "w-8 sm:w-12 shrink-0 select-none pointer-events-none transition-all duration-300",
            isDarkBg ? "brightness-0 invert" : "dark:brightness-0 dark:invert"
          )}
        />
        <CtaButton
          href={brandConfig.links.subscription}
          size="sm"
          className="whitespace-nowrap"
        >
          Quero ser associado
        </CtaButton>
      </motion.div>
    </Container>
  )
}
