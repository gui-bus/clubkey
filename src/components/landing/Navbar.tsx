"use client"

import * as React from "react"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Menu, User, X } from "lucide-react"

import { ThemeToggle } from "@/src/components/common/themeToggle"

import { cn } from "@/src/lib/utils/utils"

const navLinks = [
  { name: "Sobre a Club Key", href: "/#sobre-a-club-key" },
  { name: "Parceiros", href: "/#parceiros" },
  { name: "Experiência", href: "/#experiencia" },
  { name: "Como Funciona", href: "/#como-funciona" },
  { name: "Catálogo", href: "/rooms" },
  { name: "FAQ", href: "/#faq" },
]

export function Navbar({
  isTransparent,
}: {
  isTransparent?: boolean
} = {}): React.JSX.Element {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState<string>("")

  const isDetailRoute = Boolean(
    pathname?.startsWith("/rooms/") && pathname !== "/rooms"
  )
  const transparent =
    isTransparent !== undefined ? isTransparent : !isDetailRoute

  React.useEffect(() => {
    const sectionIds = [
      "sobre-a-club-key",
      "parceiros",
      "experiencia",
      "como-funciona",
      "catalogo",
      "faq",
    ]

    let ticking = false

    const handleScrollSpy = () => {
      if (ticking) return
      ticking = true

      window.requestAnimationFrame(() => {
        const scrollPosition = window.scrollY + 250
        let currentId = ""

        for (let i = sectionIds.length - 1; i >= 0; i--) {
          const id = sectionIds[i]
          const el = document.getElementById(id)
          if (el) {
            const top = el.offsetTop
            if (scrollPosition >= top) {
              currentId = id
              break
            }
          }
        }

        if (window.scrollY < 150) {
          currentId = ""
        }

        if (currentId) {
          const hashVal = `#${currentId}`
          setActiveSection(hashVal)
          if (window.location.hash !== hashVal || window.location.search) {
            window.history.replaceState(
              null,
              "",
              window.location.pathname + hashVal
            )
          }
        } else {
          setActiveSection("")
          if (window.location.hash || window.location.search) {
            window.history.replaceState(null, "", window.location.pathname)
          }
        }

        ticking = false
      })
    }

    handleScrollSpy()
    window.addEventListener("scroll", handleScrollSpy, { passive: true })
    return () => window.removeEventListener("scroll", handleScrollSpy)
  }, [])

  return (
    <div
      className={cn(
        "z-40 w-full transition-colors",
        transparent
          ? "absolute top-0 left-0 right-0 bg-transparent pt-20 sm:pt-14 md:pt-12"
          : "relative bg-[#0c0c0c] border-b border-white/10 pt-20 sm:pt-14 md:pt-12"
      )}
    >
      <header className="w-full bg-transparent py-3 sm:py-4">
        <div className="w-full max-w-[1720px] mx-auto px-6 md:px-12 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
            <Link
              href="/"
              className="flex items-center transition-opacity hover:opacity-90"
              aria-label="ClubKey - Início"
            >
              <div className="relative h-9 sm:h-10 w-32 sm:w-36">
                <Image
                  src="/logos/logo_white.svg"
                  alt="ClubKey"
                  fill
                  priority
                  className="object-contain object-left drop-shadow-xs"
                />
              </div>
            </Link>
          </div>

          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const linkHash = link.href.startsWith("/#")
                ? link.href.replace("/", "")
                : link.href
              const isActive =
                pathname === "/rooms"
                  ? link.href === "/rooms"
                  : activeSection === linkHash || activeSection === link.href
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "relative px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors duration-200 group whitespace-nowrap",
                    isActive
                      ? "text-[#FF6847] font-extrabold"
                      : "text-zinc-300 hover:text-white"
                  )}
                >
                  <span>{link.name}</span>
                  <span
                    className={cn(
                      "absolute bottom-0 left-3.5 right-3.5 h-0.5 transition-transform duration-300 origin-center bg-[#FF6847]",
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    )}
                  />
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-4 sm:gap-5 flex-shrink-0">
            <ThemeToggle />

            <Link
              href="https://clubkey.io/login"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-200 hover:text-[#FF6847] transition-colors"
            >
              <User className="w-3.5 h-3.5" />
              <span>Já sou associado</span>
            </Link>

            <div className="flex xl:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-full transition-all cursor-pointer flex items-center justify-center bg-white/10 hover:bg-white/20 text-white"
                aria-label="Abrir Menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="w-full bg-[#161616]/95 backdrop-blur-md border-b border-zinc-800 p-6 xl:hidden shadow-2xl transition-all">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 text-sm font-bold uppercase tracking-wider text-zinc-200 hover:text-[#FF6847] hover:bg-zinc-800/60 transition-colors"
              >
                {link.name}
              </Link>
            ))}

            <div className="h-px bg-zinc-800 my-2" />

            <div className="flex flex-col gap-3 pt-2">
              <Link
                href="https://clubkey.io/login"
                target="_blank"
                rel="noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 border border-zinc-700 text-xs font-bold uppercase tracking-wider text-white hover:bg-zinc-800"
              >
                <User className="w-4 h-4" />
                <span>Já sou associado (Login)</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
