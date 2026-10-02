import { StateCreator } from "zustand"

import type { PortalState } from "../usePortalStore"

export interface EventsSlice {
  confirmedEvents: Record<number, boolean>
  toggleEventRSVP: (eventId: number) => boolean
}

export const createEventsSlice: StateCreator<
  PortalState,
  [["zustand/persist", unknown]],
  [],
  EventsSlice
> = (set, get) => ({
  confirmedEvents: { 1: true, 5: true },

  toggleEventRSVP: (eventId: number) => {
    const current = !!get().confirmedEvents[eventId]
    const next = !current
    set((state) => ({
      confirmedEvents: {
        ...state.confirmedEvents,
        [eventId]: next,
      },
    }))
    if (next) {
      get().addXP(200, `Presença confirmada no evento #${eventId}`, "evento")
      const confirmedCount = Object.keys(get().confirmedEvents).filter(
        (k) => !!get().confirmedEvents[Number(k)]
      ).length
      set((state) => ({
        missions: state.missions.map((m) => {
          if (m.id === "events_attendee") {
            const count = Math.min(m.totalRequired, confirmedCount)
            return {
              ...m,
              currentProgress: count,
              isCompleted: count >= m.totalRequired,
            }
          }
          return m
        }),
      }))
    }
    return next
  },
})
