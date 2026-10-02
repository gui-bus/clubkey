"use client"

import Image from "next/image"
import Link from "next/link"

import { AnimatePresence, motion } from "framer-motion"

import { brandConfig } from "@/src/config/brand.config"

interface AdminSidebarLogoProps {
  isCollapsed: boolean
}

export function AdminSidebarLogo({ isCollapsed }: AdminSidebarLogoProps) {
  return (
    <Link
      href="/painel"
      className="flex items-center select-none overflow-hidden h-10"
      aria-label={`${brandConfig.name} Admin`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isCollapsed ? (
          
          <motion.div
            key="collapsed-logo"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className="relative flex h-8 w-8 items-center justify-center shrink-0"
          >
            {brandConfig.assets.iconLight || brandConfig.assets.iconDark ? (
              <>
                <Image
                  src={
                    brandConfig.assets.iconLight ||
                    brandConfig.assets.iconDark ||
                    ""
                  }
                  alt={brandConfig.name}
                  width={32}
                  height={32}
                  priority
                  className="h-7 w-7 object-contain block dark:hidden"
                />
                <Image
                  src={
                    brandConfig.assets.iconDark ||
                    brandConfig.assets.iconWhite ||
                    brandConfig.assets.iconLight ||
                    ""
                  }
                  alt={brandConfig.name}
                  width={32}
                  height={32}
                  priority
                  className="h-7 w-7 object-contain hidden dark:block"
                />
              </>
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary text-primary-foreground font-black text-sm shadow-xs">
                {brandConfig.name.charAt(0)}
              </div>
            )}
          </motion.div>
        ) : (
          
          <motion.div
            key="expanded-logo"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="relative flex h-8 w-auto items-center overflow-hidden whitespace-nowrap"
          >
            {brandConfig.assets.logoMain ? (
              <>
                <Image
                  src={
                    brandConfig.assets.logoLight || brandConfig.assets.logoMain
                  }
                  alt={brandConfig.name}
                  width={140}
                  height={32}
                  priority
                  className="h-7 w-auto max-h-7 object-contain object-left block dark:hidden"
                />
                <Image
                  src={
                    brandConfig.assets.logoDark || brandConfig.assets.logoMain
                  }
                  alt={brandConfig.name}
                  width={140}
                  height={32}
                  priority
                  className="h-7 w-auto max-h-7 object-contain object-left hidden dark:block"
                />
              </>
            ) : (
              <span className="font-heading font-black text-lg tracking-wider uppercase text-zinc-900 dark:text-white">
                {brandConfig.assets.logoText || brandConfig.name}
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Link>
  )
}
