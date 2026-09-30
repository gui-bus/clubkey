"use client"

import Image from "next/image"
import Link from "next/link"

import { cn } from "@clubkey/utils"

import { brandConfig } from "@/src/config/brand.config"

interface AdminSidebarLogoProps {
  isCollapsed: boolean
}

export function AdminSidebarLogo({ isCollapsed }: AdminSidebarLogoProps) {
  return (
    <Link
      href="/painel"
      className={cn(
        "flex h-16 items-center border-b border-border transition-all duration-300",
        isCollapsed ? "justify-center px-2" : "px-6"
      )}
      aria-label={`${brandConfig.name} Admin`}
    >
      {isCollapsed ? (
        /* Collapsed Compact Icon / Logo */
        <div className="relative flex h-8 w-8 items-center justify-center">
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
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-black text-sm shadow-xs">
              {brandConfig.name.charAt(0)}
            </div>
          )}
        </div>
      ) : (
        /* Expanded Full Brand Logo */
        <div className="relative flex h-8 w-auto items-center">
          {brandConfig.assets.logoMain ? (
            <>
              <Image
                src={
                  brandConfig.assets.logoLight || brandConfig.assets.logoMain
                }
                alt={brandConfig.name}
                width={160}
                height={36}
                priority
                className="h-7 w-auto max-h-7 object-contain object-left block dark:hidden"
              />
              <Image
                src={brandConfig.assets.logoDark || brandConfig.assets.logoMain}
                alt={brandConfig.name}
                width={160}
                height={36}
                priority
                className="h-7 w-auto max-h-7 object-contain object-left hidden dark:block"
              />
            </>
          ) : (
            <span className="font-heading font-black text-lg tracking-wider uppercase text-foreground">
              {brandConfig.assets.logoText || brandConfig.name}
            </span>
          )}
        </div>
      )}
    </Link>
  )
}
