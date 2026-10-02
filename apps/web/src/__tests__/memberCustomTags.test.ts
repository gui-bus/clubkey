import { DEFAULT_CUSTOM_TAGS } from "@/src/data/portalData"
import { usePortalStore } from "@/src/store/usePortalStore"
import { beforeEach, describe, expect, it } from "vitest"

describe("Member Custom Tags Feature", () => {
  beforeEach(() => {
    usePortalStore.setState({
      customTags: { ...DEFAULT_CUSTOM_TAGS },
    })
  })

  it("initializes with default mock tags for Ana Beatriz Ramos (id: 0)", () => {
    const { customTags } = usePortalStore.getState()
    expect(customTags[0]).toBeDefined()
    expect(customTags[0]).toContain("Frontend developer")
    expect(customTags[0]).toContain("Fintech")
    expect(customTags[0]).toContain("Parceria Estratégica")
  })

  it("allows adding a new custom tag to a member", () => {
    const memberId = 0
    usePortalStore.getState().addCustomTag(memberId, "Startup Founder")
    const tags = usePortalStore.getState().customTags[memberId]
    expect(tags).toContain("Startup Founder")
  })

  it("does not allow adding duplicate tags (case-insensitive)", () => {
    const memberId = 0
    const initialLength = usePortalStore.getState().customTags[memberId].length
    usePortalStore.getState().addCustomTag(memberId, "frontend developer")
    const tags = usePortalStore.getState().customTags[memberId]
    expect(tags.length).toBe(initialLength)
  })

  it("allows removing an existing custom tag from a member", () => {
    const memberId = 0
    usePortalStore.getState().removeCustomTag(memberId, "Parceria Estratégica")
    const tags = usePortalStore.getState().customTags[memberId]
    expect(tags).not.toContain("Parceria Estratégica")
  })

  it("allows reordering custom tags for a member", () => {
    const memberId = 0
    const newOrder = ["Parceria Estratégica", "Fintech", "Frontend developer"]
    usePortalStore.getState().setCustomTags(memberId, newOrder)
    const tags = usePortalStore.getState().customTags[memberId]
    expect(tags).toEqual(newOrder)
  })

  it("returns empty array for members without tags", () => {
    const tags = usePortalStore.getState().getCustomTags(9999)
    expect(tags).toEqual([])
  })
})
