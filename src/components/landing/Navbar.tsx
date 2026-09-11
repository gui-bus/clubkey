"use client"

import * as React from "react"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Menu, User } from "lucide-react"

import { Container } from "@/src/components/common/container"
import { ThemeToggle } from "@/src/components/common/themeToggle"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/ui/sheet/sheet"

import { brandConfig } from "@/src/config/brand.config"
import { cn } from "@/src/lib/utils/utils"

const isClubKey = brandConfig.id === "clubkey"
const homeHref = isClubKey ? "/" : "/rooms"

const navLinks = isClubKey
  ? [
      { name: `Sobre a ${brandConfig.name}`, href: "/#sobre-a-club-key" },
      { name: "Parceiros", href: "/#parceiros" },
      { name: "Experiência", href: "/#experiencia" },
      { name: "Como Funciona", href: "/#como-funciona" },
      { name: "Catálogo", href: "/rooms" },
      { name: "FAQ", href: "/#faq" },
    ]
  : []

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
    if (!isClubKey || pathname !== "/") return

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
  }, [pathname])

  return (
    <div
      className={cn(
        "z-40 w-full max-w-440 mx-auto transition-colors",
        transparent
          ? "absolute top-0 left-0 right-0 bg-transparent pt-20 sm:pt-14 md:pt-12"
          : "relative bg-[#0c0c0c] border-b border-white/10 pt-20 sm:pt-14 md:pt-12"
      )}
    >
      <header className="w-full bg-transparent py-3 sm:py-4">
        <Container className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
            <Link
              href={homeHref}
              className="flex items-center transition-opacity hover:opacity-90"
              aria-label={`${brandConfig.name} - Início`}
            >
              {brandConfig.assets.logoMain ? (
                <div className="relative h-9 sm:h-10 w-32 sm:w-36">
                  <Image
                    src={brandConfig.assets.logoMain}
                    alt={brandConfig.name}
                    fill
                    priority
                    className="object-contain object-left drop-shadow-xs"
                  />
                </div>
              ) : (
                <span className="font-heading font-black text-xl sm:text-2xl text-white tracking-wider uppercase">
                  {brandConfig.assets.logoText || brandConfig.name}
                </span>
              )}
            </Link>
          </div>

          {navLinks.length > 0 && (
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
                        ? "text-brand-primary font-extrabold"
                        : "text-zinc-300 hover:text-white"
                    )}
                  >
                    <span>{link.name}</span>
                    <span
                      className={cn(
                        "absolute bottom-0 left-3.5 right-3.5 h-0.5 transition-transform duration-300 origin-center bg-brand-primary",
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      )}
                    />
                  </Link>
                )
              })}
            </nav>
          )}

          <div className="flex items-center gap-4 sm:gap-5 flex-shrink-0">
            <ThemeToggle />

            <Link
              href={brandConfig.links.login}
              className={cn(
                "items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-200 hover:text-brand-primary transition-colors",
                navLinks.length > 0 ? "hidden sm:inline-flex" : "inline-flex"
              )}
            >
              <User className="w-3.5 h-3.5" />
              <span>Já sou associado</span>
            </Link>

            {navLinks.length > 0 && (
              <div className="flex xl:hidden">
                <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <button
                      type="button"
                      className="p-2 rounded-full transition-all cursor-pointer flex items-center justify-center bg-white/10 hover:bg-white/20 text-white"
                      aria-label="Abrir Menu"
                    >
                      <Menu className="w-5 h-5" />
                    </button>
                  </SheetTrigger>

                  <SheetContent
                    side="right"
                    backdrop="blur"
                    className="w-full max-w-xs sm:max-w-sm bg-[#141416]/98 border-l border-zinc-800 p-6 flex flex-col justify-between"
                  >
                    <div>
                      <SheetHeader className="pb-6 border-b border-zinc-800/80">
                        <SheetTitle className="text-left font-heading font-black text-xl text-white uppercase tracking-wider">
                          {brandConfig.assets.logoMain ? (
                            <div className="relative h-8 w-28">
                              <Image
                                src={brandConfig.assets.logoMain}
                                alt={brandConfig.name}
                                fill
                                className="object-contain object-left"
                              />
                            </div>
                          ) : (
                            brandConfig.assets.logoText || brandConfig.name
                          )}
                        </SheetTitle>
                      </SheetHeader>

                      <div className="flex flex-col gap-1.5 pt-6">
                        {navLinks.map((link) => {
                          const linkHash = link.href.startsWith("/#")
                            ? link.href.replace("/", "")
                            : link.href
                          const isActive =
                            pathname === "/rooms"
                              ? link.href === "/rooms"
                              : activeSection === linkHash ||
                                activeSection === link.href

                          return (
                            <Link
                              key={link.name}
                              href={link.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className={cn(
                                "px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-all",
                                isActive
                                  ? "text-brand-primary bg-brand-primary/10 border-l-2 border-brand-primary font-black"
                                  : "text-zinc-200 hover:text-brand-primary hover:bg-zinc-800/60"
                              )}
                            >
                              {link.name}
                            </Link>
                          )
                        })}
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 pt-6 border-t border-zinc-800/80">
                      <Link
                        href={brandConfig.links.login}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-sm border border-zinc-700 text-xs font-bold uppercase tracking-wider text-white hover:bg-zinc-800 hover:border-zinc-500 transition-all"
                      >
                        <User className="w-4 h-4" />
                        <span>Já sou associado (Login)</span>
                      </Link>

                      <Link
                        href={brandConfig.links.subscription}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-sm bg-brand-primary hover:bg-brand-primary-hover text-xs font-bold uppercase tracking-wider text-white transition-all shadow-md shadow-brand-primary/20"
                      >
                        <span>Quero ser associado</span>
                      </Link>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            )}
          </div>
        </Container>
      </header>
    </div>
  )
}
