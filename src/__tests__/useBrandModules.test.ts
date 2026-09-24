import { renderHook } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { useBrandModules } from "@/src/hooks/useBrandModules"

describe("useBrandModules Hook", () => {
  it("provides active modules and enabled modules list", () => {
    const { result } = renderHook(() => useBrandModules())

    expect(result.current.modules).toBeDefined()
    expect(Array.isArray(result.current.enabledModules)).toBe(true)
    expect(result.current.registry).toBeDefined()
  })

  it("checks individual module status via isEnabled", () => {
    const { result } = renderHook(() => useBrandModules())

    const isHome = result.current.isEnabled("home")
    expect(typeof isHome).toBe("boolean")
    expect(isHome).toBe(true)
  })

  it("validates hasAnyModule correctly", () => {
    const { result } = renderHook(() => useBrandModules())

    expect(result.current.hasAnyModule(["home", "stays"])).toBe(true)
    expect(
      result.current.hasAnyModule([
        "events",
        "experiences",
        "benefits",
        "keypass",
      ])
    ).toBe(false)
  })

  it("validates hasAllModules correctly", () => {
    const { result } = renderHook(() => useBrandModules())

    expect(result.current.hasAllModules(["home", "stays", "networking"])).toBe(
      true
    )
    expect(result.current.hasAllModules(["home", "stays", "events"])).toBe(
      false
    )
  })

  it("delegates route permission check via isPathAllowed", () => {
    const { result } = renderHook(() => useBrandModules())

    expect(result.current.isPathAllowed("/hospedagens")).toBe(true)
    expect(result.current.isPathAllowed("/conexoes")).toBe(true)
    expect(result.current.isPathAllowed("/eventos")).toBe(false)
    expect(result.current.isPathAllowed("/keypass")).toBe(false)
  })
})
