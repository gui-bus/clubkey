"use client"

import * as React from "react"

import Image from "next/image"

import { motion } from "framer-motion"

export function FloatingCta(): React.JSX.Element {
  return (
    <aside
      aria-label="Acesso rápido para se associar"
      className="pointer-events-none fixed bottom-6 inset-x-0 z-40 mx-auto w-full max-w-440 px-6 md:px-12 flex justify-end"
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
        <a
          href="https://clubkey.io/subscription"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2.5 bg-[#FF6847] hover:bg-[#E85535] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 shadow-md whitespace-nowrap cursor-pointer"
        >
          Quero ser associado
        </a>
      </motion.div>
    </aside>
  )
}
