"use client"

import * as React from "react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  TableStatusBadge,
} from "@clubkey/ui"
import {
  Buildings,
  Crown,
  EnvelopeSimple,
  IdentificationCard,
  PencilSimple,
  Phone,
  ShieldCheck,
  ShieldSlash,
} from "@phosphor-icons/react"

export interface AdminProfileHeaderProps {
  name: string
  role?: string
  department?: string
  email?: string
  phone?: string
  cpf?: string
  avatar?: string
  is2FAEnabled?: boolean
  onOpenAvatarDialog: () => void
}

export function AdminProfileHeader({
  name,
  role = "SUPER ADMIN",
  department = "Governança & Operações",
  email = "admin@clubkey.com.br",
  phone = "(11) 98765-4321",
  cpf = "123.456.789-00",
  avatar,
  is2FAEnabled = true,
  onOpenAvatarDialog,
}: AdminProfileHeaderProps): React.JSX.Element {
  const initials = React.useMemo(() => {
    const parts = name.trim().split(" ")
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
    }
    return (parts[0]?.[0] || "A").toUpperCase()
  }, [name])

  return (
    <div className="w-full py-1">
      <div className="flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-6 min-w-0 flex-1">
        {/* Large Avatar matching admin user detail page */}
        <div className="relative shrink-0">
          <div
            onClick={onOpenAvatarDialog}
            className="relative group/avatar cursor-pointer rounded-full overflow-hidden block"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                onOpenAvatarDialog()
              }
            }}
            aria-label="Alterar foto de perfil"
          >
            <Avatar className="size-24 sm:size-28 md:size-32 shrink-0 rounded-full bg-zinc-900 dark:bg-zinc-800 shadow-sm overflow-hidden">
              {avatar ? (
                <AvatarImage
                  src={avatar}
                  alt={name}
                  className="object-cover object-top"
                />
              ) : null}
              <AvatarFallback className="font-black text-3xl sm:text-4xl md:text-5xl bg-zinc-900 text-white dark:bg-zinc-800 dark:text-zinc-100">
                {initials}
              </AvatarFallback>
            </Avatar>

            {/* Hover overlay indicator */}
            <div className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-1 backdrop-blur-[2px]">
              <PencilSimple className="w-6 h-6" />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Alterar
              </span>
            </div>
          </div>

          {/* Active status indicator dot on corner */}
          <span
            className="absolute bottom-1 right-1 size-4 sm:size-5 rounded-full ring-2 ring-white dark:ring-[#141416] shadow-xs bg-emerald-500"
            title="Conta Ativa"
          />
        </div>

        {/* Identity Details */}
        <div className="space-y-3 min-w-0 flex-1 pt-1">
          {/* Row 1: Name, Tag, Handle */}
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-black font-heading tracking-tight text-zinc-900 dark:text-white uppercase">
                {name}
              </h1>
            </div>

            {/* Row 2: Badges (Role & 2FA using TableStatusBadge) */}
            <div className="flex items-center gap-2.5 flex-wrap">
              {/* Role TableStatusBadge */}
              <TableStatusBadge
                variant="primary"
                size="auto"
                label={role}
                icon={<Crown size={32} weight="fill" />}
                className="h-7 px-3 text-[11px] rounded-sm uppercase tracking-wider font-bold"
              />

              {/* 2FA TableStatusBadge */}
              {is2FAEnabled ? (
                <TableStatusBadge
                  variant="success"
                  size="auto"
                  label="2FA Ativo"
                  icon={<ShieldCheck size={32} weight="fill" />}
                  className="h-7 px-3 text-[11px] rounded-sm uppercase tracking-wider font-bold"
                />
              ) : (
                <TableStatusBadge
                  variant="danger"
                  size="auto"
                  label="2FA Inativo"
                  icon={<ShieldSlash size={32} weight="fill" />}
                  className="h-7 px-3 text-[11px] rounded-sm uppercase tracking-wider font-bold"
                />
              )}
            </div>
          </div>

          {/* Row 3: Meta details with icons */}
          <div className="flex items-center gap-y-1.5 gap-x-4 text-xs text-zinc-600 dark:text-zinc-400 font-medium flex-wrap">
            {/* Email */}
            <div className="inline-flex items-center gap-1.5">
              <EnvelopeSimple
                size={14}
                className="text-zinc-400 shrink-0"
                weight="bold"
              />
              <span className="text-zinc-800 dark:text-zinc-200">{email}</span>
            </div>

            {/* Document / CPF */}
            {cpf && (
              <div className="inline-flex items-center gap-1.5">
                <IdentificationCard
                  size={14}
                  className="text-zinc-400 shrink-0"
                  weight="bold"
                />
                <span>
                  CPF:{" "}
                  <strong className="font-mono text-zinc-900 dark:text-zinc-100 font-bold">
                    {cpf}
                  </strong>
                </span>
              </div>
            )}

            {/* Phone */}
            {phone && (
              <div className="inline-flex items-center gap-1.5">
                <Phone
                  size={14}
                  className="text-zinc-400 shrink-0"
                  weight="bold"
                />
                <span className="font-mono text-zinc-800 dark:text-zinc-200">
                  {phone}
                </span>
              </div>
            )}

            {/* Department */}
            {department && (
              <div className="inline-flex items-center gap-1.5">
                <Buildings
                  size={14}
                  className="text-zinc-400 shrink-0"
                  weight="bold"
                />
                <span>{department}</span>
              </div>
            )}

            {/* Account Status */}
            <div className="inline-flex items-center gap-1.5">
              <ShieldCheck
                size={14}
                className="text-emerald-500 shrink-0"
                weight="bold"
              />
              <span>
                Status:{" "}
                <strong className="text-zinc-900 dark:text-zinc-100 font-bold">
                  Ativo & Autorizado
                </strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
