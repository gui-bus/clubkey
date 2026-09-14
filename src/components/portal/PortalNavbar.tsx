"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Menu,
  User as UserIcon,
  LogOut,
  Settings,
  ChevronDown
} from "lucide-react"

import { usePortalStore } from "@/src/store/usePortalStore"
import { getInitials } from "@/src/data/portalData"
import { ThemeToggle } from "@/src/components/common/themeToggle"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/src/components/ui/sheet/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/src/components/ui/dropdownMenu/dropdownMenu"
import { brandConfig } from "@/src/config/brand.config"
import { cn } from "@/src/lib/utils"

const NAV_LINKS = [
  { href: "/home", label: "Home" },
  { href: "/agenda", label: "Agenda" },
  { href: "/experiencias", label: "Experiências" },
  { href: "/pessoas", label: "Pessoas" },
  { href: "/beneficios", label: "Benefícios" },
  { href: "/hospedagens", label: "Hospedagens" }
]

export function PortalNavbar(): React.JSX.Element {
  const pathname = usePathname()
  const router = useRouter()
  const { userProfile, logout } = usePortalStore()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  const userInitials = getInitials(userProfile.name)

  const handleLogout = () => {
    logout()
    router.push("/sign-in")
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-white/95 backdrop-blur-md dark:border-zinc-800/80 dark:bg-[#141416]/95">
      <div className="w-full px-6 md:px-12 h-18 flex items-center justify-between gap-6">
        <div className="flex items-center gap-10">
          <Link href="/home" className="flex items-center gap-2 shrink-0">
            <div className="relative h-8 w-32 sm:h-9 sm:w-36">
              <Image
                src="/logos/logo_black.svg"
                alt={brandConfig.name}
                fill
                priority
                className="object-contain object-left block dark:hidden"
              />
              <Image
                src="/logos/logo_white.svg"
                alt={brandConfig.name}
                fill
                priority
                className="object-contain object-left hidden dark:block"
              />
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/home" && pathname.startsWith(item.href))

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors duration-200 group whitespace-nowrap",
                    isActive
                      ? "text-brand-primary font-black"
                      : "text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
                  )}
                >
                  <span>{item.label}</span>
                  <span
                    className={cn(
                      "absolute bottom-0 left-4 right-4 h-0.5 transition-transform duration-300 origin-center bg-brand-primary",
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    )}
                  />
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-3 pl-2 pr-3.5 py-1.5 rounded-sm border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/90 transition-all cursor-pointer outline-none shadow-xs">
              <div className="w-8 h-8 rounded-sm bg-brand-primary text-white flex items-center justify-center font-black text-xs">
                {userInitials || <UserIcon className="w-4 h-4" />}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold text-zinc-900 dark:text-white line-clamp-1">
                  {userProfile.name}
                </span>
                <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 line-clamp-1">
                  {userProfile.company}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400 hidden sm:block" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-white dark:bg-[#141416] border-zinc-200 dark:border-zinc-800 p-2 rounded-sm shadow-xl"
            >
              <div className="px-3 py-2 border-b border-zinc-100 dark:border-zinc-800 mb-1">
                <p className="text-xs font-bold text-zinc-900 dark:text-white truncate">
                  {userProfile.name}
                </p>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                  {userProfile.role} • {userProfile.company}
                </p>
              </div>
              <DropdownMenuItem asChild>
                <Link
                  href="/perfil"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-sm text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-brand-primary cursor-pointer transition-colors"
                >
                  <Settings className="w-4 h-4 text-zinc-400" />
                  <span>Meu Perfil</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-1.5 bg-zinc-100 dark:bg-zinc-800" />
              <DropdownMenuItem
                onClick={handleLogout}
                className="flex items-center gap-2.5 px-3 py-2 rounded-sm text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 cursor-pointer transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sair da conta</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex lg:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="p-2 rounded-sm transition-all cursor-pointer flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white"
                  aria-label="Abrir Menu"
                >
                  <Menu className="w-5 h-5" />
                </button>
              </SheetTrigger>

              <SheetContent
                side="right"
                backdrop="blur"
                className="w-full max-w-xs sm:max-w-sm bg-white/98 dark:bg-[#141416]/98 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col justify-between"
              >
                <div>
                  <SheetHeader className="pb-6 border-b border-zinc-200 dark:border-zinc-800">
                    <SheetTitle className="text-left font-heading font-black text-xl text-zinc-900 dark:text-white uppercase tracking-wider">
                      <div className="relative h-8 w-28">
                        <Image
                          src="/logos/logo_black.svg"
                          alt={brandConfig.name}
                          fill
                          className="object-contain object-left block dark:hidden"
                        />
                        <Image
                          src="/logos/logo_white.svg"
                          alt={brandConfig.name}
                          fill
                          className="object-contain object-left hidden dark:block"
                        />
                      </div>
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex flex-col gap-1.5 pt-6">
                    {NAV_LINKS.map((link) => {
                      const isActive =
                        pathname === link.href ||
                        (link.href !== "/home" && pathname.startsWith(link.href))

                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            "px-4 py-3 rounded-sm text-sm font-bold uppercase tracking-wider transition-all",
                            isActive
                              ? "text-brand-primary bg-brand-primary/10 border-l-2 border-brand-primary font-black"
                              : "text-zinc-700 dark:text-zinc-200 hover:text-brand-primary hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                          )}
                        >
                          {link.label}
                        </Link>
                      )
                    })}
                  </div>
                </div>

                <div className="flex flex-col gap-3 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center gap-3 p-3 rounded-sm bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                    <div className="w-9 h-9 rounded-sm bg-brand-primary text-white flex items-center justify-center font-black text-xs shrink-0">
                      {userInitials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-zinc-900 dark:text-white truncate">
                        {userProfile.name}
                      </p>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                        {userProfile.role} • {userProfile.company}
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/perfil"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-sm border border-zinc-200 dark:border-zinc-700 text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Meu Perfil</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false)
                      handleLogout()
                    }}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-sm bg-red-500/10 border border-red-500/20 text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400 hover:bg-red-500/20 transition-all cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sair da conta</span>
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
