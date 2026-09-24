"use client"

import * as React from "react"

import Image from "next/image"

import { getInitials } from "@/src/data/portalData"
import type { Member, TierDefinition } from "@/src/types"
import { ArrowSquareOut, Globe, MapPin, Trophy } from "@phosphor-icons/react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar/avatar"

import { formatNumber } from "@/src/lib/formatters"

import { isModuleEnabled } from "@/src/config/brand.config"

interface MemberProfileBioProps {
  member: Member
  memberTier: TierDefinition | null
}

export function MemberProfileBio({
  member,
  memberTier,
}: MemberProfileBioProps): React.JSX.Element {
  return (
    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end gap-5 -mt-20 sm:-mt-24 relative z-20">
          <Avatar
            size="3xl"
            radius="full"
            className="w-28 h-28 sm:w-36 sm:h-36 ring-4 ring-[#F1F1F1] dark:ring-[#161616] shadow-xl shrink-0 border border-zinc-200 dark:border-zinc-700 bg-zinc-900"
          >
            {(member.image || member.avatar) && (
              <AvatarImage
                src={member.image || member.avatar}
                alt={`${member.firstName} ${member.lastName}`}
                className="object-cover object-top"
              />
            )}
            <AvatarFallback className="font-black text-2xl bg-zinc-900 text-white dark:bg-zinc-800">
              {getInitials(member.firstName, member.lastName)}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 pb-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white truncate">
              {member.firstName} {member.lastName}
            </h1>
            <p className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-white mt-0.5 truncate">
              {member.role} na {member.company}
            </p>
          </div>
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-900 dark:text-white pt-1">
            <span className="flex items-center gap-1.5 font-semibold text-zinc-900 dark:text-white">
              <MapPin className="w-3.5 h-3.5 text-brand-primary shrink-0" />
              {member.city}
            </span>
            <span className="text-zinc-300 dark:text-zinc-700 hidden sm:inline">
              •
            </span>
            <span className="font-medium text-zinc-900 dark:text-white">
              Membro desde {member.memberSince || 2021}
            </span>
            {member.socials?.linkedin && (
              <>
                <span className="text-zinc-300 dark:text-zinc-700 hidden sm:inline">
                  •
                </span>
                <a
                  href={member.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-900 dark:text-white hover:text-brand-primary dark:hover:text-brand-primary flex items-center gap-1 font-semibold transition-colors"
                >
                  LinkedIn <ArrowSquareOut className="w-3 h-3" />
                </a>
              </>
            )}
            {member.socials?.website && (
              <>
                <span className="text-zinc-300 dark:text-zinc-700 hidden sm:inline">
                  •
                </span>
                <a
                  href={member.socials.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-900 dark:text-white hover:text-brand-primary dark:hover:text-brand-primary flex items-center gap-1 font-semibold transition-colors"
                >
                  Website <Globe className="w-3 h-3" />
                </a>
              </>
            )}
          </div>
        </div>
      </div>

      {isModuleEnabled("keypass") && memberTier && (
        <div className="w-full sm:w-auto flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 p-3.5 sm:p-4 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xs self-start lg:self-end">
          <div className="flex items-center justify-between sm:justify-start gap-3">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 shrink-0">
                <Image
                  src={memberTier.image}
                  alt={memberTier.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                  Tier Vigente
                </p>
                <p className="text-sm font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white whitespace-nowrap">
                  {memberTier.name}
                </p>
              </div>
            </div>
            {member.rank && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-xs bg-zinc-900 dark:white text-white dark:text-zinc-900 text-[10px] font-black uppercase tracking-wider whitespace-nowrap shrink-0">
                <Trophy className="w-3 h-3 shrink-0" weight="bold" />
                <span>#{member.rank}</span>
              </span>
            )}
          </div>

          <div className="h-px sm:h-8 w-full sm:w-px bg-zinc-100 dark:bg-zinc-800 shrink-0" />

          <div className="flex items-center justify-around sm:justify-start gap-4 sm:gap-6">
            <div className="flex items-center gap-2 shrink-0">
              <div className="relative w-5 h-5 shrink-0">
                <Image
                  src="/utils/gamification/utils/xp.webp"
                  alt="XP"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex items-baseline gap-1 shrink-0 whitespace-nowrap">
                <span className="text-sm font-heading font-black text-zinc-900 dark:text-white tabular-nums">
                  {formatNumber(member.xp ?? 0)}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  XP
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="relative w-5 h-5 shrink-0">
                <Image
                  src="/utils/gamification/utils/RIB.svg"
                  alt="RIB"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex items-baseline gap-1 shrink-0 whitespace-nowrap">
                <span className="text-sm font-heading font-black text-zinc-900 dark:text-white tabular-nums">
                  {member.ribTokens ?? 0}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Tokens RIB
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
