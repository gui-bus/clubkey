import type { MemberConnectionStatus } from "@/src/types"
import { StateCreator } from "zustand"

import type { PortalState } from "../usePortalStore"

export interface NetworkingSlice {
  connectedMembers: Record<number, "pending" | "connected">
  receivedPendingInvites: number[]
  toggleConnect: (memberId: number) => MemberConnectionStatus
  getConnectionStatus: (memberId: number) => MemberConnectionStatus
  acceptInvite: (memberId: number) => void
  declineInvite: (memberId: number) => void
  cancelSentInvite: (memberId: number) => void
  removeConnection: (memberId: number) => void
}

export const createNetworkingSlice: StateCreator<
  PortalState,
  [["zustand/persist", unknown]],
  [],
  NetworkingSlice
> = (set, get) => ({
  connectedMembers: {
    0: "connected",
    2: "connected",
    7: "connected",
    10: "connected",
    4: "pending",
    14: "pending",
  },
  receivedPendingInvites: [1, 5, 9],

  getConnectionStatus: (memberId: number): MemberConnectionStatus => {
    return get().connectedMembers[memberId] || "none"
  },

  toggleConnect: (memberId: number): MemberConnectionStatus => {
    const current = get().connectedMembers[memberId]
    if (current === "connected" || current === "pending") {
      set((state) => {
        const copy = { ...state.connectedMembers }
        delete copy[memberId]
        return { connectedMembers: copy }
      })
      return "none"
    } else {
      set((state) => ({
        connectedMembers: {
          ...state.connectedMembers,
          [memberId]: "connected",
        },
      }))
      get().addXP(50, `Nova conexão profissional estabelecida`, "conexao")
      const connectedCount = Object.values(get().connectedMembers).filter(
        (v) => v === "connected"
      ).length
      set((state) => ({
        missions: state.missions.map((m) => {
          if (
            m.id === "connections_5" ||
            m.id === "connections_10" ||
            m.id === "connections_20"
          ) {
            const count = Math.min(m.totalRequired, connectedCount)
            return {
              ...m,
              currentProgress: count,
              isCompleted: count >= m.totalRequired,
            }
          }
          return m
        }),
      }))
      return "connected"
    }
  },

  acceptInvite: (memberId: number) => {
    set((state) => ({
      connectedMembers: {
        ...state.connectedMembers,
        [memberId]: "connected",
      },
      receivedPendingInvites: state.receivedPendingInvites.filter(
        (id) => id !== memberId
      ),
    }))
    get().addXP(50, `Convite de conexão aceito`, "conexao")
    const connectedCount = Object.values(get().connectedMembers).filter(
      (v) => v === "connected"
    ).length
    set((state) => ({
      missions: state.missions.map((m) => {
        if (
          m.id === "connections_5" ||
          m.id === "connections_10" ||
          m.id === "connections_20"
        ) {
          const count = Math.min(m.totalRequired, connectedCount)
          return {
            ...m,
            currentProgress: count,
            isCompleted: count >= m.totalRequired,
          }
        }
        return m
      }),
    }))
  },

  declineInvite: (memberId: number) => {
    set((state) => ({
      receivedPendingInvites: state.receivedPendingInvites.filter(
        (id) => id !== memberId
      ),
    }))
  },

  cancelSentInvite: (memberId: number) => {
    set((state) => {
      const copy = { ...state.connectedMembers }
      delete copy[memberId]
      return { connectedMembers: copy }
    })
  },

  removeConnection: (memberId: number) => {
    set((state) => {
      const copy = { ...state.connectedMembers }
      delete copy[memberId]
      return { connectedMembers: copy }
    })
    const connectedCount = Object.values(get().connectedMembers).filter(
      (v) => v === "connected"
    ).length
    set((state) => ({
      missions: state.missions.map((m) => {
        if (
          m.id === "connections_5" ||
          m.id === "connections_10" ||
          m.id === "connections_20"
        ) {
          const count = Math.min(m.totalRequired, connectedCount)
          return {
            ...m,
            currentProgress: count,
            isCompleted: count >= m.totalRequired,
          }
        }
        return m
      }),
    }))
  },
})
