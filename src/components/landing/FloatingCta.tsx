"use client"

import * as React from "react"

import Image from "next/image"

import { motion } from "framer-motion"

import { Container } from "@/src/components/common/container"
import { CtaButton } from "@/src/components/common/ctaButton"
import { brandConfig } from "@/src/config/brand.config"
import { usePortalStore } from "@/src/store/usePortalStore"

const emptySubscribe = () => () => {}

export function FloatingCta(): React.JSX.Element | null {
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
  const isAuthenticated = usePortalStore((state) => state.isAuthenticated)

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
          className="w-8 sm:w-12 dark:invert dark:brightness-0 shrink-0 select-none pointer-events-none"
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
