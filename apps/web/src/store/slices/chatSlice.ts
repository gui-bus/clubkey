import { DEFAULT_CHAT_MESSAGES } from "@/src/data/portalData"
import type { ChatMessage } from "@/src/types"
import { StateCreator } from "zustand"

import type { PortalState } from "../usePortalStore"

export interface ChatSlice {
  chatMessages: Record<number, ChatMessage[]>
  activeChatMemberId: number | null
  isChatOpen: boolean
  isChatMinimized: boolean
  openChat: (memberId?: number) => void
  closeChat: () => void
  minimizeChat: () => void
  maximizeChat: () => void
  toggleChat: (memberId?: number) => void
  sendChatMessage: (memberId: number, text: string) => void
  markChatAsRead: (memberId: number) => void
  deleteChatConversation: (memberId: number) => void
}

export const createChatSlice: StateCreator<
  PortalState,
  [["zustand/persist", unknown]],
  [],
  ChatSlice
> = (set, get) => ({
  chatMessages: DEFAULT_CHAT_MESSAGES,
  activeChatMemberId: 2,
  isChatOpen: false,
  isChatMinimized: false,

  openChat: (memberId?: number) => {
    const targetId = memberId ?? get().activeChatMemberId ?? 2
    set((state) => {
      const currentList = state.chatMessages[targetId] || []
      const updatedList = currentList.map((msg) => ({ ...msg, read: true }))
      return {
        isChatOpen: true,
        isChatMinimized: false,
        activeChatMemberId: targetId,
        chatMessages: {
          ...state.chatMessages,
          [targetId]: updatedList,
        },
      }
    })
  },

  closeChat: () => {
    set({ isChatOpen: false, isChatMinimized: false })
  },

  minimizeChat: () => {
    set({ isChatMinimized: true })
  },

  maximizeChat: () => {
    set({ isChatMinimized: false, isChatOpen: true })
  },

  toggleChat: (memberId?: number) => {
    const currentOpen = get().isChatOpen
    const currentMinimized = get().isChatMinimized
    const currentActive = get().activeChatMemberId
    if (memberId && memberId !== currentActive) {
      get().openChat(memberId)
      return
    }
    if (currentOpen && !currentMinimized) {
      set({ isChatOpen: false })
    } else {
      get().openChat(memberId ?? currentActive ?? 2)
    }
  },

  sendChatMessage: (memberId: number, text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    const now = new Date()
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: "user",
      text: trimmed,
      timestamp: timeStr,
      read: true,
    }
    set((state) => ({
      chatMessages: {
        ...state.chatMessages,
        [memberId]: [...(state.chatMessages[memberId] || []), newMsg],
      },
      isChatOpen: true,
      isChatMinimized: false,
      activeChatMemberId: memberId,
    }))
  },

  markChatAsRead: (memberId: number) => {
    set((state) => {
      const currentList = state.chatMessages[memberId] || []
      return {
        chatMessages: {
          ...state.chatMessages,
          [memberId]: currentList.map((m) => ({ ...m, read: true })),
        },
      }
    })
  },

  deleteChatConversation: (memberId: number) => {
    set((state) => {
      const updated = { ...state.chatMessages }
      delete updated[memberId]
      const remainingIds = Object.keys(updated).map(Number)
      const nextActiveId = remainingIds.length > 0 ? remainingIds[0] : null
      const shouldClose = remainingIds.length === 0
      return {
        chatMessages: updated,
        activeChatMemberId: nextActiveId,
        isChatOpen: shouldClose ? false : state.isChatOpen,
        isChatMinimized: shouldClose ? false : state.isChatMinimized,
      }
    })
  },
})
