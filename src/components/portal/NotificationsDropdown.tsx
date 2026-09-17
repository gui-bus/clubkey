"use client"

import * as React from "react"

import Link from "next/link"

import {
  ChatMessage,
  MEMBERS,
  Member,
  getInitials,
  getMemberSlug,
} from "@/src/data/portalData"
import { usePortalStore } from "@/src/store/usePortalStore"
import { Bell, ChatCircleDots, Check, X } from "@phosphor-icons/react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdownMenu/dropdownMenu"
import { ScrollArea } from "@/src/components/ui/scrollArea/scrollArea"
import { toast } from "@/src/components/ui/toast/toast"

import { CtaButton } from "@/src/components/common/ctaButton"

import { cn } from "@/src/lib/utils"

import { useMounted } from "@/src/hooks/useMounted"

export interface NotificationsDropdownProps {
  isDarkBar?: boolean
  className?: string
}

export function NotificationsDropdown({
  isDarkBar = true,
  className,
}: NotificationsDropdownProps): React.JSX.Element {
  const {
    receivedPendingInvites,
    acceptInvite,
    declineInvite,
    chatMessages,
    openChat,
  } = usePortalStore()

  const mounted = useMounted()
  const [isOpen, setIsOpen] = React.useState(false)
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 80)
  }

  const pendingMembers = React.useMemo(() => {
    if (!mounted) return []
    return (receivedPendingInvites || [])
      .map((id) => MEMBERS.find((m) => m.id === id))
      .filter((m): m is Member => Boolean(m))
  }, [receivedPendingInvites, mounted])

  const unreadMessageThreads = React.useMemo(() => {
    if (!mounted) return []
    const results: {
      member: Member
      lastMessage: ChatMessage
      unreadCount: number
    }[] = []
    Object.entries(chatMessages).forEach(([idStr, thread]) => {
      const memberId = Number(idStr)
      const member = MEMBERS.find((m) => m.id === memberId)
      if (!member) return
      const unreadList = thread.filter((m) => !m.read && m.senderId !== "user")
      if (unreadList.length > 0) {
        results.push({
          member,
          lastMessage: unreadList[unreadList.length - 1],
          unreadCount: unreadList.length,
        })
      }
    })
    return results
  }, [chatMessages, mounted])

  const totalCount = pendingMembers.length + unreadMessageThreads.length

  const handleAccept = (member: Member, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    acceptInvite(member.id)
    toast.success(`Conexão aceita com ${member.firstName} ${member.lastName}!`, {
      description: "Você ganhou +50 XP e agora estão conectados diretamente.",
    })
  }

  const handleDecline = (member: Member, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    declineInvite(member.id)
    toast.info(`Convite de ${member.firstName} ${member.lastName} recusado.`)
  }

  const handleOpenConversation = (memberId: number) => {
    setIsOpen(false)
    openChat(memberId)
  }

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <DropdownMenu modal={false} open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            aria-label={`Notificações (${totalCount} novas)`}
            className={cn(
              "relative p-2 rounded-full transition-colors flex items-center justify-center cursor-pointer outline-none",
              isDarkBar
                ? "text-zinc-300 hover:text-white hover:bg-white/10"
                : "text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800",
              className
            )}
          >
            <Bell className="w-5 h-5" />
            {mounted && totalCount > 0 && (
              <span className="absolute top-1 right-1 flex h-3.5 min-w-3.5 px-1 items-center justify-center rounded-full bg-brand-primary text-[8px] font-black text-white shadow-xs leading-none">
                {totalCount}
              </span>
            )}
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          sideOffset={8}
          collisionPadding={16}
          className="w-[calc(100vw-32px)] sm:w-[380px] max-w-[380px] bg-white dark:bg-[#141416] border border-zinc-200 dark:border-zinc-800 p-0 rounded-sm shadow-2xl overflow-hidden z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-98 data-[state=open]:zoom-in-98 data-[side=bottom]:slide-in-from-top-1.5 data-[state=open]:duration-150 data-[state=closed]:duration-100 ease-out"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="p-3.5 border-b border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between bg-zinc-50/70 dark:bg-zinc-900/50">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-zinc-900 dark:text-white">
                Notificações
              </span>
              {mounted && totalCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-xs bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-bold">
                  {totalCount} {totalCount === 1 ? "nova" : "novas"}
                </span>
              )}
            </div>
            {mounted && totalCount > 0 && (
              <span className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                Recentes
              </span>
            )}
          </div>

          <ScrollArea className="h-auto max-h-[360px] w-full">
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
              {!mounted || totalCount === 0 ? (
                <div className="p-8 text-center space-y-2.5">
                  <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto text-zinc-400">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-zinc-900 dark:text-white">
                      Nenhuma notificação nova
                    </p>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 max-w-[240px] mx-auto">
                      Você está em dia com todas as suas mensagens e conexões do
                      clube.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {unreadMessageThreads.map(
                    ({ member, lastMessage, unreadCount }) => (
                      <div
                        key={`chat-${member.id}`}
                        className="p-3.5 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors space-y-2.5 bg-brand-primary/[0.02]"
                      >
                        <div className="flex items-start gap-3">
                          <Avatar
                            size="md"
                            className="shrink-0 mt-0.5 rounded-sm overflow-hidden border border-zinc-200 dark:border-zinc-800"
                          >
                            {member.avatar && (
                              <AvatarImage
                                src={member.avatar}
                                alt={`${member.firstName} ${member.lastName}`}
                              />
                            )}
                            <AvatarFallback className="font-bold text-[10px] bg-zinc-900 text-white dark:bg-zinc-800">
                              {getInitials(member.firstName, member.lastName)}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1 min-w-0 space-y-1">
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-xs font-bold text-zinc-900 dark:text-white truncate">
                                {member.firstName} {member.lastName}
                              </span>
                              <span className="text-[9px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 bg-sky-500/10 px-1.5 py-0.5 rounded-xs shrink-0">
                                Mensagem{" "}
                                {unreadCount > 1 ? `(${unreadCount})` : ""}
                              </span>
                            </div>

                            <p className="text-[11px] text-zinc-600 dark:text-zinc-300 truncate">
                              <span className="font-medium">{member.role}</span>
                              <span className="mx-1 text-zinc-400">•</span>
                              <span className="font-bold text-zinc-900 dark:text-white">
                                {member.company}
                              </span>
                            </p>

                            <p className="text-[11px] text-zinc-800 dark:text-zinc-200 font-medium line-clamp-2 bg-zinc-100/80 dark:bg-zinc-800/80 p-1.5 rounded-xs mt-1 border border-zinc-200/50 dark:border-zinc-700/50">
                              &ldquo;{lastMessage.text}&rdquo;
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-0.5 pl-11">
                          <CtaButton
                            type="button"
                            variant="primary"
                            size="xs"
                            onClick={() => handleOpenConversation(member.id)}
                            className="flex-1 h-7 text-[11px] font-bold shadow-none hover:shadow-none"
                          >
                            <ChatCircleDots className="w-3.5 h-3.5 mr-1" />
                            <span>Responder no Chat</span>
                          </CtaButton>
                        </div>
                      </div>
                    )
                  )}

                  {pendingMembers.map((member) => (
                    <div
                      key={`invite-${member.id}`}
                      className="p-3.5 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors space-y-3"
                    >
                      <div className="flex items-start gap-3">
                        <Avatar
                          size="md"
                          className="shrink-0 mt-0.5 rounded-sm overflow-hidden border border-zinc-200 dark:border-zinc-800"
                        >
                          {member.avatar && (
                            <AvatarImage
                              src={member.avatar}
                              alt={`${member.firstName} ${member.lastName}`}
                            />
                          )}
                          <AvatarFallback className="font-bold text-[10px] bg-zinc-900 text-white dark:bg-zinc-800">
                            {getInitials(member.firstName, member.lastName)}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center justify-between gap-1">
                            <Link
                              href={`/conexoes/${member.id}/${getMemberSlug(member)}`}
                              onClick={() => setIsOpen(false)}
                              className="text-xs font-bold text-zinc-900 dark:text-white hover:text-brand-primary truncate"
                            >
                              {member.firstName} {member.lastName}
                            </Link>
                            <span className="text-[9px] font-bold uppercase tracking-wider text-brand-primary bg-brand-primary/10 px-1.5 py-0.5 rounded-xs shrink-0">
                              Conexão
                            </span>
                          </div>

                          <p className="text-[11px] text-zinc-600 dark:text-zinc-300 truncate">
                            <span className="font-medium">{member.role}</span>
                            <span className="mx-1 text-zinc-400">•</span>
                            <span className="font-bold text-zinc-900 dark:text-white">
                              {member.company}
                            </span>
                          </p>

                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                            Enviou uma solicitação para conectar com você.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-0.5">
                        <CtaButton
                          type="button"
                          variant="primary"
                          size="xs"
                          onClick={(e) => handleAccept(member, e)}
                          className="flex-1 h-7 text-[11px] font-bold shadow-none hover:shadow-none"
                        >
                          <Check className="w-3.5 h-3.5 mr-1" />
                          <span>Aceitar</span>
                        </CtaButton>

                        <CtaButton
                          type="button"
                          variant="secondary"
                          size="xs"
                          onClick={(e) => handleDecline(member, e)}
                          className="h-7 px-3 text-[11px] font-medium shadow-none hover:shadow-none border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white"
                          title="Recusar convite"
                        >
                          <X className="w-3.5 h-3.5 mr-1" />
                          <span>Recusar</span>
                        </CtaButton>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
