"use client"

import * as React from "react"
import Link from "next/link"
import { Building, MapPin, UserPlus, Check } from "lucide-react"

import { Member, getInitials } from "@/src/data/portalData"
import { usePortalStore } from "@/src/store/usePortalStore"
import { Avatar, AvatarImage, AvatarFallback } from "@/src/components/ui/avatar/avatar"
import { Badge } from "@/src/components/ui/badge/badge"
import { toast } from "@/src/components/ui/toast/toast"

interface MemberCardProps {
  member: Member
}

export function MemberCard({ member }: MemberCardProps): React.JSX.Element {
  const { connectedMembers, toggleConnect } = usePortalStore()
  const isConnected = !!connectedMembers[member.id]

  const handleConnect = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleConnect(member.id)
    if (!isConnected) {
      toast.success(`Solicitação enviada para ${member.name}`, {
        description: "Você será notificado quando houver resposta.",
      })
    } else {
      toast.info(`Conexão com ${member.name} desfeita.`)
    }
  }

  return (
    <Link
      href={`/pessoas/${member.id}`}
      className="group flex flex-col justify-between p-5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] hover:border-brand-primary/60 dark:hover:border-brand-primary/60 transition-all hover:shadow-lg cursor-pointer"
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <Avatar size="lg" radius="sm" className="shrink-0">
              {member.avatar && (
                <AvatarImage src={member.avatar} alt={member.name} />
              )}
              <AvatarFallback className="font-bold text-xs bg-zinc-900 text-white dark:bg-zinc-800">
                {getInitials(member.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-base font-bold uppercase tracking-tight text-zinc-900 dark:text-white group-hover:text-brand-primary transition-colors line-clamp-1">
                {member.name}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
                {member.role}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleConnect}
            className={`p-2 rounded-sm transition-all cursor-pointer ${
              isConnected
                ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-brand-primary hover:text-white dark:hover:bg-brand-primary"
            }`}
            title={isConnected ? "Conexão solicitada" : "Conectar"}
          >
            {isConnected ? (
              <Check className="w-4 h-4" />
            ) : (
              <UserPlus className="w-4 h-4" />
            )}
          </button>
        </div>

        <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
          <span className="flex items-center gap-1 line-clamp-1">
            <Building className="w-3.5 h-3.5 text-brand-primary shrink-0" />
            {member.company}
          </span>
          <span className="text-zinc-300 dark:text-zinc-700">•</span>
          <span className="flex items-center gap-1 shrink-0">
            <MapPin className="w-3.5 h-3.5 text-brand-primary" />
            {member.city}
          </span>
        </div>

        <div className="space-y-2.5 pt-2 border-t border-zinc-100 dark:border-zinc-800/70">
          <div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-brand-primary block mb-1.5">
              Oferece
            </span>
            <div className="flex flex-wrap gap-1.5">
              {member.offering.map((tag) => (
                <Badge
                  key={tag}
                  color="primary"
                  variant="flat"
                  size="sm"
                  radius="sm"
                  className="text-[11px] font-semibold"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-400 block mb-1.5">
              Procura
            </span>
            <div className="flex flex-wrap gap-1.5">
              {member.seeking.map((tag) => (
                <Badge
                  key={tag}
                  color="default"
                  variant="flat"
                  size="sm"
                  radius="sm"
                  className="text-[11px] font-medium"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
