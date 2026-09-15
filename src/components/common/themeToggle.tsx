"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "@phosphor-icons/react"
import { motion, AnimatePresence } from "framer-motion"

import { AnimatedThemeToggler, type TransitionVariant } from "@/src/components/ui/animated-theme-toggler"
import { cn } from "@/src/lib/utils"

export interface ThemeToggleProps {
  className?: string
  variant?: TransitionVariant
  duration?: number
}

const emptySubscribe = () => () => {}

export function ThemeToggle({
  className,
  variant = "circle",
  duration = 500,
}: ThemeToggleProps): React.JSX.Element {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )

  if (!mounted) {
    return (
      <div
        className={cn(
          "h-9 w-9 rounded-sm border border-transparent bg-transparent",
          className
        )}
      />
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <AnimatedThemeToggler
      theme={isDark ? "dark" : "light"}
      onThemeChange={(nextTheme) => setTheme(nextTheme)}
      variant={variant}
      duration={duration}
      title={isDark ? "Mudar para modo claro" : "Mudar para modo escuro"}
      className={cn(
        "group relative flex h-9 w-9 cursor-pointer items-center justify-center p-0",
        "bg-transparent border-0 outline-none",
        "text-zinc-400 hover:text-white dark:text-zinc-400 dark:hover:text-white",
        "transition-colors duration-200",
        className
      )}
    >
      <div className="relative flex items-center justify-center w-full h-full overflow-hidden pointer-events-none">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="dark-sun"
              initial={{ rotate: -90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex items-center justify-center"
            >
              <Sun className="w-4 h-4 transition-transform duration-200 group-hover:rotate-45 stroke-[2]" />
            </motion.div>
          ) : (
            <motion.div
              key="light-moon"
              initial={{ rotate: 90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex items-center justify-center"
            >
              <Moon className="w-4 h-4 transition-transform duration-200 group-hover:-rotate-12 stroke-[2]" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <span className="sr-only">Alternar tema</span>
    </AnimatedThemeToggler>
  )
}
