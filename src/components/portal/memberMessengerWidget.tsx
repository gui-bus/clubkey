"use client"

import * as React from "react"

import Image from "next/image"
import Link from "next/link"

import { MEMBERS, getInitials, getMemberSlug } from "@/src/data/portalData"
import { usePortalStore } from "@/src/store/usePortalStore"
import {
  ArrowSquareOut,
  CaretDown,
  ChatCircleDots,
  Minus,
  PaperPlaneRight,
  Trash,
  X,
} from "@phosphor-icons/react"
import { parseAsInteger, useQueryState } from "nuqs"

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

import { brandConfig } from "@/src/config/brand.config"

export function MemberMessengerWidget(): React.JSX.Element | null {
  const {
    isAuthenticated,
    chatMessages,
    activeChatMemberId,
    isChatOpen,
    isChatMinimized,
    openChat,
    closeChat,
    minimizeChat,
    sendChatMessage,
    deleteChatConversation,
  } = usePortalStore()

  const [chatParam, setChatParam] = useQueryState(
    "chat",
    parseAsInteger.withOptions({ shallow: true })
  )

  const [inputText, setInputText] = React.useState("")
  const mounted = useMounted()
  const messagesEndRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const conversationsList = React.useMemo(() => {
    const ids = Object.keys(chatMessages).map(Number)
    return MEMBERS.filter((m) => ids.includes(m.id))
  }, [chatMessages])

  const activeMember = React.useMemo(() => {
    if (chatParam !== null) {
      return MEMBERS.find((m) => m.id === chatParam) || null
    }
    if (activeChatMemberId !== null) {
      return MEMBERS.find((m) => m.id === activeChatMemberId) || null
    }
    return conversationsList[0] || null
  }, [chatParam, activeChatMemberId, conversationsList])

  const isWidgetOpen =
    (chatParam !== null || (isChatOpen && !isChatMinimized)) &&
    activeMember !== null

  React.useEffect(() => {
    if (chatParam !== null && chatParam !== activeChatMemberId) {
      openChat(chatParam)
    }
  }, [chatParam, activeChatMemberId, openChat])

  React.useEffect(() => {
    if (
      isChatOpen &&
      !isChatMinimized &&
      activeChatMemberId &&
      chatParam !== activeChatMemberId
    ) {
      setChatParam(activeChatMemberId)
    }
  }, [isChatOpen, isChatMinimized, activeChatMemberId, chatParam, setChatParam])

  const activeThread = React.useMemo(() => {
    if (!activeMember) return []
    return chatMessages[activeMember.id] || []
  }, [chatMessages, activeMember])

  const unreadTotal = React.useMemo(() => {
    let count = 0
    Object.values(chatMessages).forEach((thread) => {
      thread.forEach((msg) => {
        if (!msg.read && msg.senderId !== "user") {
          count += 1
        }
      })
    })
    return count
  }, [chatMessages])

  const memberWithUnread = React.useMemo(() => {
    for (const memberIdStr of Object.keys(chatMessages)) {
      const memberId = Number(memberIdStr)
      const thread = chatMessages[memberId] || []
      const hasUnread = thread.some((m) => !m.read && m.senderId !== "user")
      if (hasUnread) {
        return MEMBERS.find((m) => m.id === memberId) || null
      }
    }
    return activeMember || conversationsList[0] || null
  }, [chatMessages, activeMember, conversationsList])

  React.useEffect(() => {
    if (isWidgetOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      inputRef.current?.focus()
    }
  }, [isWidgetOpen, activeThread])

  if (
    !mounted ||
    !isAuthenticated ||
    (conversationsList.length === 0 && chatParam === null)
  ) {
    return null
  }

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!inputText.trim() || !activeMember) return
    sendChatMessage(activeMember.id, inputText)
    setInputText("")
  }

  const handleToggle = () => {
    if (isWidgetOpen) {
      setChatParam(null)
      closeChat()
    } else {
      const targetId =
        memberWithUnread?.id ?? activeMember?.id ?? conversationsList[0]?.id
      if (targetId) {
        setChatParam(targetId)
        openChat(targetId)
      }
    }
  }

  const handleClose = () => {
    setChatParam(null)
    closeChat()
  }

  const handleMinimize = () => {
    setChatParam(null)
    minimizeChat()
  }

  const handleSelectMember = (id: number) => {
    setChatParam(id)
    openChat(id)
  }

  const handleDeleteConversation = (memberId: number, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation()
      e.preventDefault()
    }
    deleteChatConversation(memberId)
    const remainingList = conversationsList.filter((m) => m.id !== memberId)
    if (chatParam === memberId || activeChatMemberId === memberId) {
      if (remainingList.length > 0) {
        const nextId = remainingList[0].id
        setChatParam(nextId)
        openChat(nextId)
      } else {
        setChatParam(null)
        closeChat()
      }
    }
    toast.success("Conversa excluída")
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 pointer-events-none w-full max-w-440 mx-auto">
      <aside
        aria-label="Chat Flutuante de Membros"
        className="pointer-events-auto flex flex-col items-end p-4 sm:p-6 ml-auto select-none"
      >
        {isWidgetOpen && activeMember && (
          <div className="w-[calc(100vw-32px)] sm:w-[360px] max-w-[380px] h-[480px] max-h-[calc(100vh-100px)] bg-white dark:bg-[#141416] border border-zinc-200 dark:border-zinc-800 rounded-sm shadow-2xl flex flex-col overflow-hidden mb-3 animate-in fade-in-0 zoom-in-95 duration-150">
            <div className="p-3 bg-zinc-50/80 dark:bg-zinc-900/60 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="flex items-center gap-2.5 min-w-0 flex-1 text-left group cursor-pointer outline-none"
                  >
                    <div className="relative shrink-0">
                      <Avatar
                        size="sm"
                        className="rounded-sm overflow-hidden border border-zinc-200 dark:border-zinc-700"
                      >
                        {activeMember.avatar && (
                          <AvatarImage
                            src={activeMember.avatar}
                            alt={`${activeMember.firstName} ${activeMember.lastName}`}
                          />
                        )}
                        <AvatarFallback className="font-bold text-[10px] bg-zinc-900 text-white dark:bg-zinc-800">
                          {getInitials(
                            activeMember.firstName,
                            activeMember.lastName
                          )}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-zinc-900 dark:text-white group-hover:text-brand-primary truncate transition-colors">
                          {activeMember.firstName} {activeMember.lastName}
                        </span>
                        <CaretDown className="w-3 h-3 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-200 shrink-0 transition-colors" />
                      </div>
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate">
                        {activeMember.role} • {activeMember.company}
                      </p>
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="w-64 bg-white dark:bg-[#141416] border border-zinc-200 dark:border-zinc-800 p-1 rounded-sm shadow-xl z-50"
                >
                  <div className="px-2 py-1.5 text-[9px] font-black uppercase tracking-widest text-zinc-400">
                    Conversas ({conversationsList.length})
                  </div>
                  {conversationsList.map((m) => (
                    <div
                      key={m.id}
                      className={cn(
                        "group/item flex items-center justify-between gap-2 px-2 py-1.5 text-xs rounded-xs transition-colors",
                        m.id === activeMember.id
                          ? "bg-brand-primary/10 text-brand-primary font-bold"
                          : "text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => handleSelectMember(m.id)}
                        className="flex items-center gap-2 min-w-0 flex-1 text-left cursor-pointer"
                      >
                        <Avatar size="xs" className="rounded-xs shrink-0">
                          {m.avatar && (
                            <AvatarImage
                              src={m.avatar}
                              alt={`${m.firstName} ${m.lastName}`}
                            />
                          )}
                          <AvatarFallback className="text-[8px] bg-zinc-900 text-white font-bold">
                            {getInitials(m.firstName, m.lastName)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1 truncate">
                          <p className="truncate text-xs font-semibold">
                            {m.firstName} {m.lastName}
                          </p>
                          <p className="truncate text-[10px] text-zinc-400">
                            {m.company}
                          </p>
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleDeleteConversation(m.id, e)}
                        className="p-1 text-zinc-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-xs transition-colors shrink-0 cursor-pointer"
                        title={`Excluir conversa com ${m.firstName} ${m.lastName}`}
                      >
                        <Trash className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="flex items-center gap-1 shrink-0 text-zinc-400">
                <Link
                  href={`/conexoes/${activeMember.id}/${getMemberSlug(activeMember)}`}
                  className="p-1.5 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/60 dark:hover:bg-zinc-800 rounded-sm transition-colors cursor-pointer"
                  title="Ver perfil completo"
                >
                  <ArrowSquareOut className="w-3.5 h-3.5" />
                </Link>
                <button
                  type="button"
                  onClick={handleMinimize}
                  className="p-1.5 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/60 dark:hover:bg-zinc-800 rounded-sm transition-colors cursor-pointer"
                  title="Minimizar conversa"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="p-1.5 hover:text-rose-500 hover:bg-rose-500/10 rounded-sm transition-colors cursor-pointer"
                  title="Fechar conversa"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <ScrollArea className="flex-1 p-3.5 overscroll-contain">
              <div className="space-y-3">
                <div className="p-2.5 rounded-sm bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 text-center space-y-1 my-1">
                  <span className="text-[9px] font-black uppercase tracking-widest text-brand-primary block">
                    Canal Direto do Clube
                  </span>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                    Você e {activeMember.firstName} {activeMember.lastName}{" "}
                    estão conectados no {brandConfig.name}.
                  </p>
                </div>

                {activeThread.map((msg) => {
                  const isMe = msg.senderId === "user"
                  return (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex flex-col space-y-0.5",
                        isMe ? "items-end" : "items-start"
                      )}
                    >
                      <div
                        className={cn(
                          "px-3.5 py-2 text-xs leading-relaxed max-w-[85%] break-words shadow-xs",
                          isMe
                            ? "bg-brand-primary text-white rounded-2xl rounded-br-xs font-medium"
                            : "bg-zinc-100 dark:bg-zinc-800/90 text-zinc-900 dark:text-white rounded-2xl rounded-bl-xs border border-zinc-200/60 dark:border-zinc-700/60"
                        )}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[9px] font-medium text-zinc-400 dark:text-zinc-500 px-1">
                        {msg.timestamp}
                      </span>
                    </div>
                  )
                })}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <form
              onSubmit={handleSendMessage}
              className="p-2.5 border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-[#141416] flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={`Mensagem para ${activeMember.firstName}...`}
                className="flex-1 bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 rounded-sm px-3 py-2 text-xs text-zinc-900 dark:text-white placeholder:text-zinc-400 outline-none focus:border-brand-primary transition-colors"
              />
              <CtaButton
                type="submit"
                variant="primary"
                size="xs"
                disabled={!inputText.trim()}
                className="w-8 h-8 px-0 rounded-sm shrink-0 flex items-center justify-center shadow-none hover:shadow-none"
                title="Enviar mensagem"
              >
                <PaperPlaneRight className="w-3.5 h-3.5" />
              </CtaButton>
            </form>
          </div>
        )}

        <button
          type="button"
          onClick={handleToggle}
          aria-label="Abrir Mensagens"
          className="group relative flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-2xl border-2 border-white dark:border-zinc-900 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
        >
          {memberWithUnread?.avatar ? (
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <Image
                src={memberWithUnread.avatar}
                alt={`${memberWithUnread.firstName} ${memberWithUnread.lastName}`}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <ChatCircleDots className="w-6 h-6 text-white dark:text-zinc-900 group-hover:scale-110 transition-transform" />
          )}

          {unreadTotal > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-brand-primary text-[9px] font-black text-white shadow-md ring-2 ring-white dark:ring-zinc-950 animate-pulse">
              {unreadTotal}
            </span>
          )}
        </button>
      </aside>
    </div>
  )
}
